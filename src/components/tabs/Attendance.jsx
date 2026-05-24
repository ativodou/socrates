import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Printer, History, ClipboardList } from 'lucide-react';
import { db } from '../../firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';
import { toast } from '../../toast';

export default function Attendance() {
  const { school, classes, students, isAdultSchool } = useSchool();
  const { t, lang } = useLang();
  const ht = lang === 'ht';
  const adult = isAdultSchool();

  const today = new Date().toISOString().slice(0, 10);

  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState('take');
  const [records, setRecords] = useState({});
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [historyDocs, setHistoryDocs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const classStudents = students
    .filter(s => s.classId === selectedClassId || s.enrolledClasses?.includes(selectedClassId))
    .sort((a, b) => (a.lastName || '').localeCompare(b.lastName || ''));

  // Load existing attendance when class or date changes
  useEffect(() => {
    if (!selectedClassId || !selectedDate || !school?.id) return;
    const docId = `${selectedClassId}_${selectedDate}`;
    getDoc(doc(db, 'schools', school.id, 'attendance', docId)).then(snap => {
      if (snap.exists()) {
        setRecords(snap.data().records || {});
        setAlreadySaved(true);
      } else {
        const defaults = {};
        classStudents.forEach(s => { defaults[s.id] = 'present'; });
        setRecords(defaults);
        setAlreadySaved(false);
      }
    });
  }, [selectedClassId, selectedDate, school?.id, students.length]);

  // Load history when switching to history view
  useEffect(() => {
    if (viewMode !== 'history' || !selectedClassId || !school?.id) return;
    setLoadingHistory(true);
    const q = query(
      collection(db, 'schools', school.id, 'attendance'),
      where('classId', '==', selectedClassId),
      limit(30)
    );
    getDocs(q).then(snap => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      docs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      setHistoryDocs(docs);
      setLoadingHistory(false);
    });
  }, [viewMode, selectedClassId, school?.id]);

  const setStatus = (studentId, status) => setRecords(prev => ({ ...prev, [studentId]: status }));

  const markAll = (status) => {
    const next = {};
    classStudents.forEach(s => { next[s.id] = status; });
    setRecords(next);
  };

  const save = async () => {
    if (!selectedClassId || !selectedDate || classStudents.length === 0) return;
    setSaving(true);
    try {
      const docId = `${selectedClassId}_${selectedDate}`;
      await setDoc(doc(db, 'schools', school.id, 'attendance', docId), {
        classId: selectedClassId,
        date: selectedDate,
        records,
        updatedAt: new Date().toISOString(),
      });
      setAlreadySaved(true);
      toast(ht ? 'Prezans anrejistre!' : 'Présence enregistrée !');
    } catch {
      toast(ht ? 'Erè — eseye ankò' : 'Erreur — réessayez', 'error');
    } finally {
      setSaving(false);
    }
  };

  const printSheet = () => {
    const cls = classes.find(c => c.id === selectedClassId);
    const dateStr = new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-HT', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    const p = classStudents.filter(s => (records[s.id] || 'present') === 'present').length;
    const a = classStudents.filter(s => records[s.id] === 'absent').length;
    const l = classStudents.filter(s => records[s.id] === 'late').length;
    const rows = classStudents.map((s, i) => {
      const status = records[s.id] || 'present';
      const icon = status === 'present' ? '✓' : status === 'absent' ? '✗' : 'R';
      const color = status === 'present' ? '#16a34a' : status === 'absent' ? '#dc2626' : '#d97706';
      const label = ht
        ? (status === 'present' ? 'Prezan' : status === 'absent' ? 'Absan' : 'Reta')
        : (status === 'present' ? 'Présent' : status === 'absent' ? 'Absent' : 'Retard');
      return `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;">${i + 1}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${s.lastName} ${s.firstName}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;font-weight:bold;font-size:1.1em;color:${color};">${icon}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;color:${color};">${label}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">___________________</td></tr>`;
    }).join('');
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ht ? 'Fèy Prezans' : 'Feuille de Présence'}</title></head><body style="font-family:sans-serif;padding:24px;max-width:800px;margin:0 auto;">
      <h1 style="color:#1e3a5f;text-align:center;margin-bottom:4px;">${school?.name || 'SOCRATES'}</h1>
      <h2 style="text-align:center;color:#1e3a5f;margin-top:0;">${ht ? 'Fèy Prezans' : 'Feuille de Présence'}</h2>
      <div style="display:flex;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div><strong>${ht ? 'Klas' : 'Classe'}:</strong> ${cls?.name || ''}</div>
        <div><strong>${ht ? 'Dat' : 'Date'}:</strong> <span style="text-transform:capitalize;">${dateStr}</span></div>
      </div>
      <div style="margin-bottom:16px;padding:10px 16px;background:#f9fafb;border-radius:8px;display:flex;gap:24px;">
        <span style="color:#16a34a;font-weight:bold;">✓ ${ht ? 'Prezan' : 'Présents'}: ${p}</span>
        <span style="color:#dc2626;font-weight:bold;">✗ ${ht ? 'Absan' : 'Absents'}: ${a}</span>
        <span style="color:#d97706;font-weight:bold;">R ${ht ? 'Reta' : 'Retard'}: ${l}</span>
        <span style="color:#6b7280;">Total: ${classStudents.length}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#1e3a5f;color:white;">
          <th style="padding:10px 12px;text-align:left;">#</th>
          <th style="padding:10px 12px;text-align:left;">${ht ? 'Non Elèv' : 'Nom Élève'}</th>
          <th style="padding:10px 12px;text-align:center;">${ht ? 'Estati' : 'Statut'}</th>
          <th style="padding:10px 12px;text-align:left;">${ht ? 'Detay' : 'Détail'}</th>
          <th style="padding:10px 12px;text-align:left;">Signature</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:32px;text-align:right;color:#9ca3af;font-size:0.8em;">${ht ? 'Jenere pa' : 'Généré par'} SOCRATES</p>
      <button onclick="window.print()" style="margin-top:12px;padding:14px;width:100%;font-size:1em;background:#1e3a5f;color:white;border:none;border-radius:8px;cursor:pointer;">
        ${ht ? 'Enprime' : 'Imprimer'}
      </button>
    </body></html>`);
    w.document.close();
  };

  const presentCount = classStudents.filter(s => (records[s.id] || 'present') === 'present').length;
  const absentCount = classStudents.filter(s => records[s.id] === 'absent').length;
  const lateCount = classStudents.filter(s => records[s.id] === 'late').length;

  const sLabel = adult ? (ht ? 'etidyan' : 'étudiants') : (ht ? 'elèv' : 'élèves');

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('attendanceTab')}</h1>
          <p className="text-sm text-gray-500">
            {ht ? 'Pran prezans chak klas chak jou' : 'Enregistrer la présence par classe et par jour'}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('take')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${viewMode === 'take' ? 'bg-socrates-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <ClipboardList size={15} />{ht ? 'Pran Prezans' : 'Prendre'}
          </button>
          <button onClick={() => setViewMode('history')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${viewMode === 'history' ? 'bg-socrates-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <History size={15} />{ht ? 'Istwa' : 'Historique'}
          </button>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{ht ? 'Klas' : 'Classe'}</label>
          <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-socrates-blue">
            <option value="">{ht ? 'Chwazi yon klas...' : 'Choisir une classe...'}</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t('date')}</label>
          <input type="date" value={selectedDate} max={today}
            onChange={e => setSelectedDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-socrates-blue" />
        </div>
      </div>

      {/* Empty state */}
      {!selectedClassId && (
        <div className="text-center py-20 text-gray-400">
          <Calendar size={48} className="mx-auto mb-3 opacity-30" />
          <p>{ht ? 'Chwazi yon klas pou kòmanse' : 'Sélectionnez une classe pour commencer'}</p>
        </div>
      )}

      {/* ── TAKE ATTENDANCE ── */}
      {selectedClassId && viewMode === 'take' && (
        <div>
          {classStudents.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
              <span className="flex items-center gap-1.5 text-green-700 font-bold text-sm">
                <CheckCircle size={15} /> {presentCount} {ht ? 'Prezan' : 'Présents'}
              </span>
              <span className="flex items-center gap-1.5 text-red-600 font-bold text-sm">
                <XCircle size={15} /> {absentCount} {ht ? 'Absan' : 'Absents'}
              </span>
              <span className="flex items-center gap-1.5 text-yellow-600 font-bold text-sm">
                <Clock size={15} /> {lateCount} {ht ? 'Reta' : 'Retard'}
              </span>
              <div className="ml-auto flex gap-2">
                <button onClick={() => markAll('present')}
                  className="text-xs px-3 py-1.5 rounded-lg bg-green-100 text-green-700 font-medium hover:bg-green-200 transition">
                  {ht ? 'Tout prezan' : 'Tous présents'}
                </button>
                <button onClick={() => markAll('absent')}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition">
                  {ht ? 'Tout absan' : 'Tous absents'}
                </button>
              </div>
            </div>
          )}

          {classStudents.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>{ht ? 'Pa gen elèv nan klas sa a' : 'Aucun élève dans cette classe'}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {classStudents.map((student, i) => {
                const status = records[student.id] || 'present';
                return (
                  <div key={student.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition ${
                      status === 'absent' ? 'bg-red-50 border-red-200' :
                      status === 'late'   ? 'bg-yellow-50 border-yellow-200' :
                                           'bg-white border-gray-100'
                    }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-5 text-right shrink-0">{i + 1}</span>
                      <div className="w-8 h-8 rounded-full bg-socrates-blue/10 flex items-center justify-center text-socrates-blue font-bold text-xs shrink-0">
                        {student.firstName?.[0]}{student.lastName?.[0]}
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{student.lastName} {student.firstName}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      {['present', 'absent', 'late'].map(s => (
                        <button key={s} onClick={() => setStatus(student.id, s)}
                          className={`w-10 py-1.5 rounded-lg text-xs font-bold transition ${
                            status === s
                              ? s === 'present' ? 'bg-green-500 text-white'
                                : s === 'absent'  ? 'bg-red-500 text-white'
                                :                   'bg-yellow-500 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}>
                          {s === 'present' ? 'P' : s === 'absent' ? 'A' : 'R'}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {classStudents.length > 0 && (
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={saving}
                className="flex-1 py-3 rounded-xl bg-socrates-blue text-white font-bold text-sm hover:bg-socrates-navy transition disabled:opacity-60">
                {saving ? '...' : alreadySaved ? (ht ? 'Mete ajou' : 'Mettre à jour') : t('saveAttendance')}
              </button>
              <button onClick={printSheet}
                className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition flex items-center gap-2">
                <Printer size={16} />{ht ? 'Enprime' : 'Imprimer'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── HISTORY ── */}
      {selectedClassId && viewMode === 'history' && (
        <div>
          {loadingHistory ? (
            <div className="text-center py-12 text-gray-400">{t('loading')}</div>
          ) : historyDocs.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <History size={48} className="mx-auto mb-3 opacity-30" />
              <p>{ht ? 'Pa gen istwa prezans pou klas sa a' : 'Aucun historique de présence pour cette classe'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historyDocs.map(entry => {
                const recs = entry.records || {};
                const p = classStudents.filter(s => (recs[s.id] || 'present') === 'present').length;
                const a = classStudents.filter(s => recs[s.id] === 'absent').length;
                const l = classStudents.filter(s => recs[s.id] === 'late').length;
                const absentNames = classStudents
                  .filter(s => recs[s.id] === 'absent')
                  .map(s => `${s.firstName} ${s.lastName}`).join(', ');
                const dateStr = new Date(entry.date + 'T12:00:00').toLocaleDateString('fr-HT', {
                  weekday: 'long', day: 'numeric', month: 'long',
                });
                return (
                  <div key={entry.id} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm capitalize">{dateStr}</p>
                        <p className="text-xs text-gray-400">{classStudents.length} {sLabel}</p>
                      </div>
                      <div className="flex gap-4 text-sm font-bold">
                        <span className="text-green-600">{p} ✓</span>
                        <span className="text-red-500">{a} ✗</span>
                        {l > 0 && <span className="text-yellow-500">{l} R</span>}
                      </div>
                    </div>
                    {a > 0 && (
                      <p className="mt-2 pt-2 border-t border-gray-50 text-xs text-red-500">
                        {ht ? 'Absan: ' : 'Absents: '}{absentNames}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

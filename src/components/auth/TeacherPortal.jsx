import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { BookOpen, Users, FileText, Calendar, CheckSquare, DollarSign, LogOut, Plus, Trash2, Edit, ChevronDown, Clock, AlertTriangle, GraduationCap, ClipboardList } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';

export default function TeacherPortal({ school, teacher, allClasses, onLogout }) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [homework, setHomework] = useState([]);
  const [exams, setExams] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [gradingPeriods, setGradingPeriods] = useState([]);
  const [teacherPayments, setTeacherPayments] = useState([]);
  const [showForm, setShowForm] = useState(null); // 'homework' | 'exam' | null
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceClassId, setAttendanceClassId] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [gradeClassId, setGradeClassId] = useState('');
  const [gradePeriodId, setGradePeriodId] = useState('');

  // My classes = classes where I'm the teacher
  const myClasses = allClasses.filter(c => c.teacherId === teacher.id || (c.teacherIds || []).includes(teacher.id));
  const myClassIds = myClasses.map(c => c.id);

  const loadData = async () => {
    try {
      const [studSnap, hwSnap, examSnap, attSnap, gradeSnap, periodSnap, tpSnap] = await Promise.all([
        getDocs(collection(db, 'schools', school.id, 'students')),
        getDocs(collection(db, 'schools', school.id, 'homework')),
        getDocs(collection(db, 'schools', school.id, 'exams')),
        getDocs(collection(db, 'schools', school.id, 'attendance')),
        getDocs(collection(db, 'schools', school.id, 'grades')),
        getDocs(collection(db, 'schools', school.id, 'gradingPeriods')),
        getDocs(query(collection(db, 'schools', school.id, 'teacherPayments'), orderBy('date', 'desc'))),
      ]);
      setStudents(studSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setHomework(hwSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setExams(examSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setAttendance(attSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setGrades(gradeSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setGradingPeriods(periodSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTeacherPayments(tpSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.teacherId === teacher.id));
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadData(); }, []);

  const myStudents = students.filter(s => myClassIds.includes(s.classId));
  const myHomework = homework.filter(h => h.teacherId === teacher.id).sort((a, b) => (b.dueDate || '').localeCompare(a.dueDate || ''));
  const myExams = exams.filter(e => e.teacherId === teacher.id).sort((a, b) => (b.examDate || '').localeCompare(a.examDate || ''));

  const set = (k, v) => setFormData(p => ({ ...p, [k]: v }));
  const annual = parseFloat(teacher.annualSalary) || 0;
  const totalPaid = teacherPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
  const salaryBalance = annual - totalPaid;

  // ── Save Homework ─────────────────────────────
  const onSaveHomework = async () => {
    const payload = {
      classId: formData.classId || '', teacherId: teacher.id,
      title: formData.title || '', description: formData.description || '',
      subject: teacher.subject || formData.subject || '',
      dueDate: formData.dueDate || '', postedDate: new Date().toISOString().split('T')[0],
    };
    if (editItem) await updateDoc(doc(db, 'schools', school.id, 'homework', editItem.id), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'homework'), { ...payload, createdAt: serverTimestamp() });
    setShowForm(null); setEditItem(null); setFormData({});
    loadData();
  };

  // ── Save Exam ──────────────────────────────────
  const onSaveExam = async () => {
    const payload = {
      classId: formData.classId || '', teacherId: teacher.id,
      title: formData.title || '', subject: teacher.subject || formData.subject || '',
      examDate: formData.examDate || '', periodId: formData.periodId || '',
      totalPoints: parseFloat(formData.totalPoints) || 100,
      description: formData.description || '',
    };
    if (editItem) await updateDoc(doc(db, 'schools', school.id, 'exams', editItem.id), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'exams'), { ...payload, createdAt: serverTimestamp() });
    setShowForm(null); setEditItem(null); setFormData({});
    loadData();
  };

  const onDeleteHW = async (id) => { if (confirm('Supprimer?')) { await deleteDoc(doc(db, 'schools', school.id, 'homework', id)); loadData(); } };
  const onDeleteExam = async (id) => { if (confirm('Supprimer?')) { await deleteDoc(doc(db, 'schools', school.id, 'exams', id)); loadData(); } };

  // ── Attendance ─────────────────────────────────
  const loadAttendanceForDate = (classId, date) => {
    setAttendanceClassId(classId);
    setAttendanceDate(date);
    const existing = attendance.find(a => a.classId === classId && a.date === date);
    const classStudents = students.filter(s => s.classId === classId);
    if (existing) {
      setAttendanceRecords(classStudents.map(s => {
        const rec = existing.records?.find(r => r.studentId === s.id);
        return { studentId: s.id, name: `${s.firstName} ${s.lastName}`, status: rec?.status || 'present' };
      }));
    } else {
      setAttendanceRecords(classStudents.map(s => ({ studentId: s.id, name: `${s.firstName} ${s.lastName}`, status: 'present' })));
    }
  };

  const saveAttendanceRecord = async () => {
    const payload = {
      classId: attendanceClassId, teacherId: teacher.id, date: attendanceDate,
      records: attendanceRecords.map(r => ({ studentId: r.studentId, status: r.status })),
    };
    const existing = attendance.find(a => a.classId === attendanceClassId && a.date === attendanceDate);
    if (existing) await updateDoc(doc(db, 'schools', school.id, 'attendance', existing.id), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'attendance'), { ...payload, createdAt: serverTimestamp() });
    loadData();
  };

  const toggleStatus = (idx) => {
    const order = ['present', 'absent', 'late'];
    setAttendanceRecords(prev => prev.map((r, i) => i === idx ? { ...r, status: order[(order.indexOf(r.status) + 1) % 3] } : r));
  };

  // ── Grade Entry ────────────────────────────────
  const classStudentsForGrades = students.filter(s => s.classId === gradeClassId);
  const existingGrades = grades.filter(g => g.classId === gradeClassId && g.periodId === gradePeriodId);

  const saveGradeEntry = async (studentId, score) => {
    const existing = grades.find(g => g.studentId === studentId && g.classId === gradeClassId && g.periodId === gradePeriodId);
    const payload = { studentId, classId: gradeClassId, periodId: gradePeriodId, score: parseFloat(score) || 0, teacherId: teacher.id };
    if (existing) await updateDoc(doc(db, 'schools', school.id, 'grades', existing.id), payload);
    else await addDoc(collection(db, 'schools', school.id, 'grades'), payload);
    loadData();
  };

  // ── Tab Config ─────────────────────────────────
  const tabs = [
    { id: 'dashboard', label: t('tabDashboard'), icon: BookOpen },
    { id: 'homework', label: t('homeworkTab'), icon: FileText },
    { id: 'exams', label: t('examsTab'), icon: ClipboardList },
    { id: 'attendance', label: t('attendanceTab'), icon: CheckSquare },
    { id: 'grades', label: t('gradesTab'), icon: GraduationCap },
    { id: 'salary', label: t('salaryTab'), icon: DollarSign },
  ];

  const inputCls = "w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400";
  const labelCls = "block text-xs text-gray-500 mb-1 font-medium";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {school?.logo && school.logo.length > 10 ? <img src={school.logo} alt="" className="w-10 h-10 rounded-full object-contain bg-white/20" /> : <img src="/owl-icon.svg" alt="" className="w-10 h-10 rounded-full" />}
            <div>
              <h1 className="font-display text-lg">{school?.name || 'SOCRATES'}</h1>
              <p className="text-xs text-blue-200">{t('teacherPortal')} — {teacher.firstName} {teacher.lastName}</p>
            </div>
          </div>
          <button onClick={onLogout} className="bg-white/20 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"><LogOut size={14} />{t('logout')}</button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-4xl mx-auto flex overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition ${activeTab === t.id ? 'border-socrates-blue text-socrates-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <t.icon size={16} />{t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">

        {/* ═══ DASHBOARD ═══ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800">Bonjou, {teacher.firstName}! 👋</h2>
              <p className="text-gray-500 text-sm mt-1">{teacher.subject ? `Matière: ${teacher.subject}` : ''} {teacher.isCoach ? `• Coach: ${teacher.coachActivity || '🏅'}` : ''}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <p className="text-2xl font-bold text-socrates-navy">{myClasses.length}</p>
                <p className="text-xs text-gray-500">{t('myClasses')}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{myStudents.length}</p>
                <p className="text-xs text-gray-500">{t('myStudents')}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">{myHomework.length}</p>
                <p className="text-xs text-gray-500">Devoirs postés</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <p className="text-2xl font-bold text-orange-600">{myExams.length}</p>
                <p className="text-xs text-gray-500">Examens</p>
              </div>
            </div>
            {/* My Classes */}
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-3">📚 Mes Classes</h3>
              {myClasses.length > 0 ? (
                <div className="space-y-2">
                  {myClasses.map(c => {
                    const count = students.filter(s => s.classId === c.id).length;
                    return (
                      <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-sm">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.gradeLevel || ''} • {c.room ? 'Salle ' + c.room : ''}</p>
                        </div>
                        <span className="text-sm font-bold text-socrates-navy">{count} élèves</span>
                      </div>
                    );
                  })}
                </div>
              ) : <p className="text-gray-400 text-sm">Aucune classe assignée</p>}
            </div>
            {/* Quick salary */}
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-3">💰 Mon Salaire</h3>
              <div className="flex gap-3 flex-wrap">
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-center flex-1 min-w-[120px]">
                  <p className="text-xs text-gray-500">Annuel</p>
                  <p className="font-bold text-gray-800">HTG {annual.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-xl px-4 py-3 text-center flex-1 min-w-[120px]">
                  <p className="text-xs text-gray-500">Reçu</p>
                  <p className="font-bold text-green-600">HTG {totalPaid.toLocaleString()}</p>
                </div>
                <div className={`rounded-xl px-4 py-3 text-center flex-1 min-w-[120px] ${salaryBalance > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                  <p className="text-xs text-gray-500">Restant</p>
                  <p className={`font-bold ${salaryBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>{salaryBalance > 0 ? `HTG ${salaryBalance.toLocaleString()}` : 'SOLDÉ'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ HOMEWORK ═══ */}
        {activeTab === 'homework' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">📝 Devoirs</h2>
              <button onClick={() => { setShowForm('homework'); setEditItem(null); setFormData({ subject: teacher.subject || '' }); }} className="bg-socrates-blue text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"><Plus size={16} />{t('newHomework')}</button>
            </div>
            {showForm === 'homework' && (
              <div className="bg-white rounded-2xl shadow-lg p-5 space-y-3 border-2 border-blue-200">
                <h3 className="font-semibold text-gray-800">{editItem ? 'Modifier' : 'Nouveau'} Devoir</h3>
                <div><label className={labelCls}>Classe <span className="text-red-400">*</span></label>
                  <select required value={formData.classId || ''} onChange={e => set('classId', e.target.value)} className={inputCls}>
                    <option value="">Sélectionner</option>
                    {myClasses.map(c => <option key={c.id} value={c.id}>{c.name} ({c.gradeLevel})</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Titre <span className="text-red-400">*</span></label><input required value={formData.title || ''} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="Ex: Exercices page 45" /></div>
                <div><label className={labelCls}>Description / Consignes</label><textarea value={formData.description || ''} onChange={e => set('description', e.target.value)} className={`${inputCls} h-24`} placeholder="Détails du devoir..." /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Matière</label><input value={formData.subject || ''} onChange={e => set('subject', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Date limite</label><input type="date" value={formData.dueDate || ''} onChange={e => set('dueDate', e.target.value)} className={inputCls} /></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={onSaveHomework} className="flex-1 bg-socrates-blue text-white py-3 rounded-xl font-medium">{t("save")}</button>
                  <button onClick={() => { setShowForm(null); setEditItem(null); }} className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600">Annuler</button>
                </div>
              </div>
            )}
            {myHomework.length > 0 ? myHomework.map(hw => {
              const cls = allClasses.find(c => c.id === hw.classId);
              const isPast = hw.dueDate && new Date(hw.dueDate) < new Date();
              return (
                <div key={hw.id} className={`bg-white rounded-2xl shadow-lg p-5 ${isPast ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{hw.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{cls?.name || ''} • {hw.subject || ''}</p>
                      {hw.description && <p className="text-sm text-gray-600 mt-2">{hw.description}</p>}
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button onClick={() => { setShowForm('homework'); setEditItem(hw); setFormData(hw); }} className="p-2 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                      <button onClick={() => onDeleteHW(hw.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  {hw.dueDate && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} /><span>À remettre: {new Date(hw.dueDate).toLocaleDateString('fr-HT', { day: 'numeric', month: 'short' })}</span>
                      {isPast && <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">Passé</span>}
                    </div>
                  )}
                </div>
              );
            }) : <div className="text-center py-12 bg-white rounded-2xl shadow-lg text-gray-400"><FileText size={48} className="mx-auto mb-3 opacity-30" /><p>Aucun devoir posté</p></div>}
          </div>
        )}

        {/* ═══ EXAMS ═══ */}
        {activeTab === 'exams' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">📋 Examens</h2>
              <button onClick={() => { setShowForm('exam'); setEditItem(null); setFormData({ subject: teacher.subject || '', totalPoints: '100' }); }} className="bg-orange-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"><Plus size={16} />{t('newExam')}</button>
            </div>
            {showForm === 'exam' && (
              <div className="bg-white rounded-2xl shadow-lg p-5 space-y-3 border-2 border-orange-200">
                <h3 className="font-semibold text-gray-800">{editItem ? 'Modifier' : 'Nouvel'} Examen</h3>
                <div><label className={labelCls}>Classe <span className="text-red-400">*</span></label>
                  <select required value={formData.classId || ''} onChange={e => set('classId', e.target.value)} className={inputCls}>
                    <option value="">Sélectionner</option>
                    {myClasses.map(c => <option key={c.id} value={c.id}>{c.name} ({c.gradeLevel})</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Titre <span className="text-red-400">*</span></label><input required value={formData.title || ''} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="Ex: Examen Trimestre 1" /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className={labelCls}>Matière</label><input value={formData.subject || ''} onChange={e => set('subject', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Date</label><input type="date" value={formData.examDate || ''} onChange={e => set('examDate', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Total points</label><input type="number" value={formData.totalPoints || ''} onChange={e => set('totalPoints', e.target.value)} className={inputCls} /></div>
                </div>
                {gradingPeriods.length > 0 && (
                  <div><label className={labelCls}>Période</label>
                    <select value={formData.periodId || ''} onChange={e => set('periodId', e.target.value)} className={inputCls}>
                      <option value="">Sélectionner</option>
                      {gradingPeriods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                )}
                <div><label className={labelCls}>Description</label><textarea value={formData.description || ''} onChange={e => set('description', e.target.value)} className={`${inputCls} h-20`} /></div>
                <div className="flex gap-2">
                  <button onClick={onSaveExam} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium">{t("save")}</button>
                  <button onClick={() => { setShowForm(null); setEditItem(null); }} className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600">Annuler</button>
                </div>
              </div>
            )}
            {myExams.length > 0 ? myExams.map(ex => {
              const cls = allClasses.find(c => c.id === ex.classId);
              const isFuture = ex.examDate && new Date(ex.examDate) > new Date();
              return (
                <div key={ex.id} className="bg-white rounded-2xl shadow-lg p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">{ex.title}</p>
                        {isFuture && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">À venir</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{cls?.name || ''} • {ex.subject || ''} • {ex.totalPoints || 100} pts</p>
                      {ex.description && <p className="text-sm text-gray-600 mt-2">{ex.description}</p>}
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button onClick={() => { setShowForm('exam'); setEditItem(ex); setFormData(ex); }} className="p-2 text-gray-400 hover:text-orange-600"><Edit size={16} /></button>
                      <button onClick={() => onDeleteExam(ex.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  {ex.examDate && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} /><span>{new Date(ex.examDate).toLocaleDateString('fr-HT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  )}
                </div>
              );
            }) : <div className="text-center py-12 bg-white rounded-2xl shadow-lg text-gray-400"><ClipboardList size={48} className="mx-auto mb-3 opacity-30" /><p>Aucun examen planifié</p></div>}
          </div>
        )}

        {/* ═══ ATTENDANCE ═══ */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">✅ Présence</h2>
            <div className="bg-white rounded-2xl shadow-lg p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Classe</label>
                  <select value={attendanceClassId} onChange={e => { setAttendanceClassId(e.target.value); if (e.target.value) loadAttendanceForDate(e.target.value, attendanceDate); }} className={inputCls}>
                    <option value="">Sélectionner</option>
                    {myClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Date</label>
                  <input type="date" value={attendanceDate} onChange={e => { setAttendanceDate(e.target.value); if (attendanceClassId) loadAttendanceForDate(attendanceClassId, e.target.value); }} className={inputCls} />
                </div>
              </div>
            </div>
            {attendanceClassId && attendanceRecords.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                  <div className="flex gap-3 text-xs">
                    <span className="text-green-600 font-medium">✅ {attendanceRecords.filter(r => r.status === 'present').length}</span>
                    <span className="text-red-600 font-medium">❌ {attendanceRecords.filter(r => r.status === 'absent').length}</span>
                    <span className="text-yellow-600 font-medium">⏰ {attendanceRecords.filter(r => r.status === 'late').length}</span>
                  </div>
                  <span className="text-xs text-gray-400">{attendanceRecords.length} élèves</span>
                </div>
                <div className="divide-y">
                  {attendanceRecords.map((r, idx) => (
                    <button key={r.studentId} onClick={() => toggleStatus(idx)} className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition">
                      <span className="text-sm">{r.name}</span>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        r.status === 'present' ? 'bg-green-100 text-green-700' :
                        r.status === 'absent' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {r.status === 'present' ? '✅ Présent' : r.status === 'absent' ? '❌ Absent' : '⏰ Retard'}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="p-4">
                  <button onClick={saveAttendanceRecord} className="w-full bg-socrates-blue text-white py-3 rounded-xl font-medium">{t('saveAttendance')}</button>
                </div>
              </div>
            )}
            {attendanceClassId && attendanceRecords.length === 0 && (
              <div className="text-center py-8 bg-white rounded-2xl shadow-lg text-gray-400"><Users size={48} className="mx-auto mb-3 opacity-30" /><p>Aucun élève dans cette classe</p></div>
            )}
          </div>
        )}

        {/* ═══ GRADES ═══ */}
        {activeTab === 'grades' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">🎓 Notes</h2>
            <div className="bg-white rounded-2xl shadow-lg p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Classe</label>
                  <select value={gradeClassId} onChange={e => setGradeClassId(e.target.value)} className={inputCls}>
                    <option value="">Sélectionner</option>
                    {myClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Période</label>
                  <select value={gradePeriodId} onChange={e => setGradePeriodId(e.target.value)} className={inputCls}>
                    <option value="">Sélectionner</option>
                    {gradingPeriods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            {gradeClassId && gradePeriodId && classStudentsForGrades.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <p className="text-sm text-gray-600">{classStudentsForGrades.length} élèves • Entrez les notes sur 100</p>
                </div>
                <div className="divide-y">
                  {classStudentsForGrades.map(s => {
                    const existing = existingGrades.find(g => g.studentId === s.id);
                    return (
                      <div key={s.id} className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm flex-1">{s.firstName} {s.lastName}</span>
                        <input
                          type="number" min="0" max="100"
                          defaultValue={existing?.score ?? ''}
                          onBlur={e => { const v = e.target.value; if (v !== '') saveGradeEntry(s.id, v); }}
                          className="w-20 px-3 py-2 border rounded-xl text-center text-sm font-semibold"
                          placeholder="—"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {gradeClassId && gradePeriodId && classStudentsForGrades.length === 0 && (
              <div className="text-center py-8 bg-white rounded-2xl shadow-lg text-gray-400"><p>Aucun élève dans cette classe</p></div>
            )}
            {(!gradeClassId || !gradePeriodId) && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg text-gray-400"><GraduationCap size={48} className="mx-auto mb-3 opacity-30" /><p>Sélectionnez une classe et une période</p></div>
            )}
          </div>
        )}

        {/* ═══ SALARY ═══ */}
        {activeTab === 'salary' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">💰 Mon Salaire</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <p className="text-xs text-gray-500">Annuel</p>
                <p className="text-xl font-bold text-gray-800">HTG {annual.toLocaleString()}</p>
                <p className="text-xs text-gray-400">HTG {(annual / 10).toLocaleString()} / mois</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <p className="text-xs text-gray-500">Reçu</p>
                <p className="text-xl font-bold text-green-600">HTG {totalPaid.toLocaleString()}</p>
              </div>
              <div className={`bg-white rounded-xl shadow-lg p-4 text-center`}>
                <p className="text-xs text-gray-500">Restant</p>
                <p className={`text-xl font-bold ${salaryBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>{salaryBalance > 0 ? `HTG ${salaryBalance.toLocaleString()}` : 'SOLDÉ'}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b"><h3 className="font-semibold text-gray-800 text-sm">Historique des Versements</h3></div>
              {teacherPayments.length > 0 ? (
                <div className="divide-y">
                  {teacherPayments.map(p => (
                    <div key={p.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-medium">{p.date ? new Date(p.date).toLocaleDateString('fr-HT', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</p>
                        <p className="text-xs text-gray-400">{p.month || ''} • {p.method || 'Espèces'}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">HTG {(parseFloat(p.amount) || 0).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : <div className="p-8 text-center text-gray-400 text-sm">Aucun versement enregistré</div>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

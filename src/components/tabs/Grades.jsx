import React, { useState, useMemo } from 'react';
import { FileText, Printer, Award, CheckCircle, XCircle } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

export default function Grades() {
  const {
    school, classes, students, grades, gradingPeriods, saveGrade, saveStudent,
    isAdultSchool,
  } = useSchool();

  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedPeriodId, setSelectedPeriodId] = useState('');
  const [viewMode, setViewMode] = useState('entry'); // 'entry' | 'summary'

  const adult = isAdultSchool();
  const { t } = useLang();
  const subjects = school?.subjects || [];
  const selectedClass = classes.find(c => c.id === selectedClassId);
  const selectedPeriod = gradingPeriods.find(p => p.id === selectedPeriodId);
  const classStudents = students.filter(s => s.enrolledClasses?.includes(selectedClassId) || s.classId === selectedClassId).sort((a, b) => (a.lastName || '').localeCompare(b.lastName || ''));

  // Calculate averages & ranks for current period
  const studentAverages = useMemo(() => {
    if (!selectedClassId || !selectedPeriodId || subjects.length === 0) return [];
    return classStudents.map(student => {
      let totalWeighted = 0;
      let totalCoeff = 0;
      const subjectGrades = {};
      subjects.forEach(subj => {
        const grade = grades.find(g =>
          g.studentId === student.id && g.classId === selectedClassId &&
          g.periodId === selectedPeriodId && g.subject === subj.name
        );
        const score = grade ? parseFloat(grade.score) : null;
        subjectGrades[subj.name] = score;
        if (score !== null && !isNaN(score)) {
          const coeff = parseInt(subj.coefficient) || 1;
          totalWeighted += score * coeff;
          totalCoeff += coeff;
        }
      });
      const average = totalCoeff > 0 ? totalWeighted / totalCoeff : null;
      return { student, subjectGrades, average, totalCoeff };
    });
  }, [selectedClassId, selectedPeriodId, classStudents, grades, subjects]);

  // Assign ranks
  const rankedStudents = useMemo(() => {
    const withAvg = studentAverages.filter(s => s.average !== null);
    const sorted = [...withAvg].sort((a, b) => b.average - a.average);
    let rank = 0;
    let lastAvg = null;
    sorted.forEach((s, i) => {
      if (s.average !== lastAvg) { rank = i + 1; lastAvg = s.average; }
      s.rank = rank;
    });
    const noAvg = studentAverages.filter(s => s.average === null);
    noAvg.forEach(s => { s.rank = null; });
    return [...sorted, ...noAvg];
  }, [studentAverages]);

  // Annual averages (all periods)
  const getAnnualAverage = (studentId) => {
    if (subjects.length === 0) return null;
    let totalWeighted = 0;
    let totalCoeff = 0;
    subjects.forEach(subj => {
      const coeff = parseInt(subj.coefficient) || 1;
      const periodScores = gradingPeriods.map(period => {
        const g = grades.find(gr => gr.studentId === studentId && gr.classId === selectedClassId && gr.periodId === period.id && gr.subject === subj.name);
        return g ? parseFloat(g.score) : null;
      }).filter(s => s !== null);
      if (periodScores.length > 0) {
        const avg = periodScores.reduce((a, b) => a + b, 0) / periodScores.length;
        totalWeighted += avg * coeff;
        totalCoeff += coeff;
      }
    });
    return totalCoeff > 0 ? totalWeighted / totalCoeff : null;
  };

  // Class stats
  const withAvg = rankedStudents.filter(s => s.average !== null);
  const classAvg = withAvg.length > 0 ? (withAvg.reduce((sum, s) => sum + s.average, 0) / withAvg.length).toFixed(1) : '—';
  const highest = withAvg.length > 0 ? withAvg[0].average.toFixed(1) : '—';
  const lowest = withAvg.length > 0 ? withAvg[withAvg.length - 1].average.toFixed(1) : '—';

  // Generate bulletin
  const generateBulletin = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const sData = rankedStudents.find(s => s.student.id === studentId);
    const annualAvg = getAnnualAverage(studentId);

    const subjectRows = subjects.map(subj => {
      const coeff = parseInt(subj.coefficient) || 1;
      const periodCells = gradingPeriods.map(period => {
        const g = grades.find(gr => gr.studentId === studentId && gr.classId === selectedClassId && gr.periodId === period.id && gr.subject === subj.name);
        return g ? parseFloat(g.score).toFixed(1) : '—';
      }).map(v => `<td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;">${v}</td>`).join('');
      const allScores = gradingPeriods.map(p => {
        const g = grades.find(gr => gr.studentId === studentId && gr.classId === selectedClassId && gr.periodId === p.id && gr.subject === subj.name);
        return g ? parseFloat(g.score) : null;
      }).filter(s => s !== null);
      const subjAvg = allScores.length > 0 ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1) : '—';
      return `<tr>
        <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:500;">${subj.name}</td>
        <td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;">${coeff}</td>
        ${periodCells}
        <td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;font-weight:700;${subjAvg !== '—' && parseFloat(subjAvg) < 50 ? 'color:#dc2626;' : ''}">${subjAvg}</td>
      </tr>`;
    }).join('');

    const periodHeaders = gradingPeriods.map(p => `<th style="padding:8px 12px;background:#1e3a5f;color:white;text-align:center;">${p.name}</th>`).join('');
    const totalRanked = withAvg.length;

    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bulletin — ${student.firstName} ${student.lastName}</title>
    <style>body{font-family:'Inter',sans-serif;padding:20px;max-width:900px;margin:0 auto;color:#1f2937;font-size:14px;}table{width:100%;border-collapse:collapse;}@media print{.no-print{display:none!important;}body{padding:0;}}</style></head><body>
      <div style="text-align:center;margin-bottom:20px;">
        ${school?.logo && school.logo.length > 10 ? `<img src="${school.logo}" style="width:60px;height:60px;object-fit:contain;margin:0 auto 8px;" />` : ''}
        <h1 style="color:#1e3a5f;margin:0;font-size:1.6em;">${school?.name || 'SOCRATES'}</h1>
        ${school?.address ? `<p style="color:#6b7280;margin:4px 0;font-size:0.85em;">${school.address}${school.city ? ', ' + school.city : ''}</p>` : ''}
        ${school?.phone ? `<p style="color:#6b7280;margin:2px 0;font-size:0.85em;">Tél: ${school.phone}</p>` : ''}
      </div>
      <h2 style="text-align:center;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:8px;font-size:1.3em;">BULLETIN SCOLAIRE${selectedPeriod ? ' — ' + selectedPeriod.name : ''}</h2>
      <div style="display:flex;justify-content:space-between;margin:15px 0;flex-wrap:wrap;gap:8px;font-size:0.9em;">
        <div>
          <p style="margin:3px 0;"><strong>${adult ? 'Étudiant(e)' : 'Élève'}:</strong> ${student.firstName} ${student.lastName}</p>
          <p style="margin:3px 0;"><strong>Classe:</strong> ${selectedClass?.name || ''} ${selectedClass?.gradeLevel ? '(' + selectedClass.gradeLevel + ')' : ''}</p>
        </div>
        <div style="text-align:right;">
          <p style="margin:3px 0;"><strong>Année:</strong> ${new Date().getFullYear()}-${new Date().getFullYear() + 1}</p>
          <p style="margin:3px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString('fr-HT', { day:'numeric', month:'long', year:'numeric' })}</p>
        </div>
      </div>
      <table style="margin-top:10px;">
        <thead><tr>
          <th style="padding:8px 12px;background:#1e3a5f;color:white;text-align:left;">Matière</th>
          <th style="padding:8px 12px;background:#1e3a5f;color:white;text-align:center;">Coeff</th>
          ${periodHeaders}
          <th style="padding:8px 12px;background:#1e3a5f;color:white;text-align:center;">Moy. Annuelle</th>
        </tr></thead>
        <tbody>${subjectRows}</tbody>
      </table>
      <div style="display:flex;gap:12px;margin:20px 0;flex-wrap:wrap;">
        <div style="flex:1;min-width:130px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
          <p style="color:#6b7280;font-size:0.8em;margin:0;">Moyenne Générale</p>
          <p style="font-size:1.5em;font-weight:700;color:${sData?.average !== null && sData.average >= 50 ? '#16a34a' : '#dc2626'};margin:4px 0;">${sData?.average !== null ? sData.average.toFixed(2) : '—'}</p>
        </div>
        <div style="flex:1;min-width:130px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
          <p style="color:#6b7280;font-size:0.8em;margin:0;">{t('rank')}</p>
          <p style="font-size:1.5em;font-weight:700;color:#1e3a5f;margin:4px 0;">${sData?.rank ? sData.rank + '/' + totalRanked : '—'}</p>
        </div>
        <div style="flex:1;min-width:130px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
          <p style="color:#6b7280;font-size:0.8em;margin:0;">Moy. Annuelle</p>
          <p style="font-size:1.5em;font-weight:700;color:${annualAvg !== null && annualAvg >= 50 ? '#16a34a' : '#dc2626'};margin:4px 0;">${annualAvg !== null ? annualAvg.toFixed(2) : '—'}</p>
        </div>
        <div style="flex:1;min-width:130px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
          <p style="color:#6b7280;font-size:0.8em;margin:0;">{t('classAverage')}</p>
          <p style="font-size:1.5em;font-weight:700;color:#1e3a5f;margin:4px 0;">${classAvg}</p>
        </div>
      </div>
      <div style="margin:15px 0;border:1px solid #e5e7eb;border-radius:10px;padding:15px;">
        <p style="font-weight:600;margin:0 0 8px;">Appréciation du Directeur:</p>
        <div style="border-bottom:1px dotted #ccc;height:25px;margin-bottom:5px;"></div>
        <div style="border-bottom:1px dotted #ccc;height:25px;"></div>
      </div>
      <div style="margin-top:30px;display:flex;justify-content:space-between;">
        <div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">Cachet de l'école</div>
        <div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">Signature du Directeur</div>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:0.7em;margin-top:25px;">Document généré par SOCRATES — ${new Date().toLocaleString('fr-HT')}</p>
      <button onclick="window.print()" class="no-print" style="margin-top:15px;padding:12px;width:100%;background:#1e3a5f;color:white;border:none;border-radius:8px;cursor:pointer;font-size:1em;">Imprimer</button>
    </body></html>`);
    w.document.close();
  };

  const printAllBulletins = () => {
    classStudents.forEach((s, i) => { setTimeout(() => generateBulletin(s.id), i * 500); });
  };

  const inputCls = "w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400";

  return (
    <div className="space-y-4">
      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className={`${inputCls} flex-1`}>
          <option value="">{`${t('selectClass')}`}</option>
          {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name} {cls.gradeLevel ? `(${cls.gradeLevel})` : ''}</option>)}
        </select>
        <select value={selectedPeriodId} onChange={e => setSelectedPeriodId(e.target.value)} className={`${inputCls} flex-1`}>
          <option value="">{`${t('selectPeriod')}`}</option>
          {gradingPeriods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {selectedClassId && selectedPeriodId && (
          <div className="flex gap-2">
            <button onClick={() => setViewMode('entry')} className={`px-4 py-2.5 rounded-xl text-sm font-medium ${viewMode === 'entry' ? 'bg-socrates-blue text-white' : 'bg-gray-100 text-gray-600'}`}>{`${t('gradeEntry')}`}</button>
            <button onClick={() => setViewMode('summary')} className={`px-4 py-2.5 rounded-xl text-sm font-medium ${viewMode === 'summary' ? 'bg-socrates-blue text-white' : 'bg-gray-100 text-gray-600'}`}>{`${t('gradeResults')}`}</button>
            <button onClick={() => setViewMode('promotion')} className={`px-4 py-2.5 rounded-xl text-sm font-medium ${viewMode === 'promotion' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{`${t('promotion')}`}</button>
          </div>
        )}
      </div>

      {/* No subjects warning */}
      {subjects.length === 0 && selectedClassId && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-sm">
          ⚠️ {t('noSubjectsWarning')}
        </div>
      )}

      {/* Stats bar */}
      {selectedClassId && selectedPeriodId && withAvg.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-2xl font-bold text-socrates-navy">{classStudents.length}</p>
            <p className="text-xs text-gray-500">{adult ? 'Étudiants' : 'Élèves'}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{classAvg}</p>
            <p className="text-xs text-gray-500">{t('classAverage')}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{highest}</p>
            <p className="text-xs text-gray-500">{t('highestAvg')}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{lowest}</p>
            <p className="text-xs text-gray-500">{t('lowestAvg')}</p>
          </div>
        </div>
      )}

      {/* ═══ GRADE ENTRY ═══ */}
      {viewMode === 'entry' && selectedClassId && selectedPeriodId && subjects.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{t('scoresOutOf100')} — {selectedClass?.name} — {selectedPeriod?.name}</p>
          {classStudents.map(student => {
            const sData = rankedStudents.find(s => s.student.id === student.id);
            return (
              <div key={student.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-socrates-navy text-white flex items-center justify-center text-xs font-bold">{student.firstName?.[0]}{student.lastName?.[0]}</div>
                    <p className="font-medium text-sm">{student.firstName} {student.lastName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {sData?.average !== null && sData?.average !== undefined && (
                      <span className={`text-sm font-bold ${sData.average >= 50 ? 'text-green-600' : 'text-red-500'}`}>{sData.average.toFixed(1)}</span>
                    )}
                    {sData?.rank && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">#{sData.rank}</span>}
                  </div>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {subjects.map(subj => {
                    const existing = grades.find(g => g.studentId === student.id && g.classId === selectedClassId && g.periodId === selectedPeriodId && g.subject === subj.name);
                    return (
                      <div key={subj.name} className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 flex-1 truncate" title={subj.name}>{subj.name}</label>
                        <input type="number" min="0" max="100" defaultValue={existing?.score ?? ''} onBlur={e => { const v = e.target.value; if (v !== '') saveGrade(student.id, selectedClassId, selectedPeriodId, v, subj.name); }} className="w-16 px-2 py-1.5 border rounded-lg text-center text-sm font-semibold focus:ring-2 focus:ring-blue-100" placeholder="—" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ RESULTS / SUMMARY ═══ */}
      {viewMode === 'summary' && selectedClassId && selectedPeriodId && subjects.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{t('ranking')} — {selectedClass?.name} — {selectedPeriod?.name}</p>
            <button onClick={printAllBulletins} className="bg-socrates-navy text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"><Printer size={16} />{t('printAllBulletins')}</button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-socrates-navy text-white">
                    <th className="px-3 py-3 text-left">#</th>
                    <th className="px-3 py-3 text-left">{adult ? 'Étudiant(e)' : 'Élève'}</th>
                    {subjects.map(s => <th key={s.name} className="px-2 py-3 text-center text-xs whitespace-nowrap" title={`${s.name} (coeff ${s.coefficient})`}>{s.name.length > 5 ? s.name.substring(0, 4) + '.' : s.name}</th>)}
                    <th className="px-3 py-3 text-center">{t('average')}</th>
                    <th className="px-3 py-3 text-center">{t('rank')}</th>
                    <th className="px-3 py-3 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {rankedStudents.map((row, i) => (
                    <tr key={row.student.id} className={`border-b ${row.average !== null && row.average < 50 ? 'bg-red-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-3 py-2.5 font-bold text-gray-400">{row.rank || '—'}</td>
                      <td className="px-3 py-2.5 font-medium whitespace-nowrap">{row.student.firstName} {row.student.lastName}</td>
                      {subjects.map(s => {
                        const score = row.subjectGrades[s.name];
                        return <td key={s.name} className={`px-2 py-2.5 text-center ${score !== null && score < 50 ? 'text-red-500 font-medium' : ''}`}>{score !== null ? score.toFixed(0) : '—'}</td>;
                      })}
                      <td className={`px-3 py-2.5 text-center font-bold ${row.average !== null && row.average >= 50 ? 'text-green-600' : 'text-red-500'}`}>{row.average !== null ? row.average.toFixed(1) : '—'}</td>
                      <td className="px-3 py-2.5 text-center">
                        {row.rank && <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${row.rank <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{row.rank}</span>}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <button onClick={() => generateBulletin(row.student.id)} className="text-blue-600 hover:text-blue-800 p-1" title="Bulletin"><FileText size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PROMOTION ENGINE ═══ */}
      {viewMode === 'promotion' && selectedClassId && subjects.length > 0 && (() => {
        const threshold = parseFloat(school?.promotionThreshold) || 50;
        const promotionData = classStudents.map(student => {
          const annAvg = getAnnualAverage(student.id);
          const status = annAvg === null ? 'incomplete' : annAvg >= threshold ? 'admis' : 'redoublant';
          return { student, annualAverage: annAvg, status, currentStatus: student.promotionStatus || '' };
        }).sort((a, b) => (b.annualAverage || 0) - (a.annualAverage || 0));

        const admis = promotionData.filter(p => p.status === 'admis').length;
        const redoublants = promotionData.filter(p => p.status === 'redoublant').length;
        const incomplete = promotionData.filter(p => p.status === 'incomplete').length;

        const applyPromotions = async () => {
          if (!window.confirm(`Appliquer les décisions de promotion pour ${classStudents.length} ${adult ? 'étudiants' : 'élèves'}?`)) return;
          for (const p of promotionData) {
            if (p.status !== 'incomplete') {
              await saveStudent({ ...p.student, promotionStatus: p.status, promotionAverage: p.annualAverage?.toFixed(2) || '' }, p.student.id);
            }
          }
          alert(`Promotion appliquée: ${admis} admis, ${redoublants} redoublant${redoublants > 1 ? 's' : ''}`);
        };

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{t('promotion')} — {selectedClass?.name} — {t('promotionThreshold')}: {threshold}/100</p>
              <button onClick={applyPromotions} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"><CheckCircle size={16} />Appliquer les décisions</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 rounded-xl shadow-lg p-4 text-center border border-green-200">
                <p className="text-2xl font-bold text-green-600">{admis}</p>
                <p className="text-xs text-gray-500">Admis</p>
              </div>
              <div className="bg-red-50 rounded-xl shadow-lg p-4 text-center border border-red-200">
                <p className="text-2xl font-bold text-red-500">{redoublants}</p>
                <p className="text-xs text-gray-500">Redoublants</p>
              </div>
              <div className="bg-gray-50 rounded-xl shadow-lg p-4 text-center border border-gray-200">
                <p className="text-2xl font-bold text-gray-400">{incomplete}</p>
                <p className="text-xs text-gray-500">Incomplets</p>
              </div>
            </div>

            {/* Student list */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {promotionData.map((row, i) => (
                <div key={row.student.id} className={`flex items-center gap-4 px-5 py-3.5 border-b ${row.status === 'admis' ? 'bg-green-50/50' : row.status === 'redoublant' ? 'bg-red-50/50' : ''}`}>
                  <span className="text-sm font-bold text-gray-400 w-6">{i + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{row.student.firstName} {row.student.lastName}</p>
                    {row.currentStatus && <p className="text-xs text-gray-400">Statut actuel: {row.currentStatus}</p>}
                  </div>
                  <div className="text-right">
                    {row.annualAverage !== null ? (
                      <p className={`text-lg font-bold ${row.annualAverage >= threshold ? 'text-green-600' : 'text-red-500'}`}>{row.annualAverage.toFixed(1)}</p>
                    ) : (
                      <p className="text-sm text-gray-400">Notes manquantes</p>
                    )}
                  </div>
                  <div className="w-28 text-center">
                    {row.status === 'admis' && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle size={14} />Admis</span>}
                    {row.status === 'redoublant' && <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold"><XCircle size={14} />Redoublant</span>}
                    {row.status === 'incomplete' && <span className="text-xs text-gray-400">—</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Empty states */}
      {(!selectedClassId || !selectedPeriodId) && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" /><p>{t('selectClassAndPeriod')}</p>
        </div>
      )}
      {selectedClassId && selectedPeriodId && subjects.length > 0 && classStudents.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          <p>Aucun {adult ? 'étudiant' : 'élève'} dans cette classe</p>
        </div>
      )}
    </div>
  );
}

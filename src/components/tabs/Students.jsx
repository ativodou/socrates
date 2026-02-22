import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, FileText, Download, CheckCircle, XCircle, Filter, ChevronDown, DollarSign, Flag, AlertTriangle, X } from 'lucide-react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

const FLAG_TYPES_BASE = [
  { value: 'financial', color: 'bg-red-100 text-red-700', icon: '💰' },
  { value: 'disciplinary', color: 'bg-orange-100 text-orange-700', icon: '⚠️' },
  { value: 'attendance', color: 'bg-yellow-100 text-yellow-700', icon: '📅' },
  { value: 'academic', color: 'bg-purple-100 text-purple-700', icon: '📚' },
  { value: 'medical', color: 'bg-blue-100 text-blue-700', icon: '🏥' },
  { value: 'other', color: 'bg-gray-100 text-gray-700', icon: '🚩' },
];

export default function Students({ onOpenModal }) {
  const { students, school, classes, payments, deleteStudent, getStudentBalance, getMonthlyTuition, getStudentTotal, loadAllData, isAdultSchool } = useSchool();
  const { t, lang } = useLang();
  const FLAG_TYPES = FLAG_TYPES_BASE.map(f => ({ ...f, label: t('flagTypes')?.[f.value] || f.value }));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [flaggingId, setFlaggingId] = useState(null);
  const adult = isAdultSchool();

  let filtered = students.filter(s => (s.firstName + ' ' + s.lastName).toLowerCase().includes(searchTerm.toLowerCase()));
  if (filterLevel) filtered = filtered.filter(s => s.gradeLevel === filterLevel);
  if (filterStatus === 'paid') filtered = filtered.filter(s => getStudentBalance(s.id) <= 0);
  if (filterStatus === 'unpaid') filtered = filtered.filter(s => getStudentBalance(s.id) > 0);
  if (filterStatus === 'noDeposit') filtered = filtered.filter(s => !s.depositPaid);
  if (filterStatus === 'flagged') filtered = filtered.filter(s => s.flag);

  const totalStudents = students.length;
  const maleCount = students.filter(s => s.gender === 'M').length;
  const femaleCount = students.filter(s => s.gender === 'F').length;
  const unpaidCount = students.filter(s => getStudentBalance(s.id) > 0).length;
  const flaggedCount = students.filter(s => s.flag).length;
  const totalRevenue = students.reduce((sum, s) => sum + (parseFloat(s.annualTuition) || 0) + (parseFloat(s.fraisDivers) || 0), 0);
  const uniqueLevels = [...new Set(students.map(s => s.gradeLevel).filter(Boolean))].sort();

  const ht = lang === 'ht';
  const PAYMENT_TYPE_LABELS = { scolarite: t('tuition'), inscription: t('inscription'), deposit: t('deposit'), examen: ht?'Egzamen':'Examen', uniforme: ht?'Inifòm':'Uniforme', transport: ht?'Transpò':'Transport', cantine: ht?'Kantin':'Cantine', activite: ht?'Aktivite':'Activité', autre: t('other') };

  const generateContract = (person) => {
    const scolarite = parseFloat(person.annualTuition) || 0;
    const fraisDivers = parseFloat(person.fraisDivers) || 0;
    const annual = scolarite + fraisDivers;
    const monthly = (scolarite / 10).toFixed(2);
    const sLabel = adult ? t('studentAdult') : t('student');
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${t('contract')}</title></head><body style="font-family:sans-serif;padding:20px;max-width:600px;margin:0 auto;"><h1 style="color:#1e3a5f;text-align:center;">${school?.name||'SOCRATES'}</h1><h2 style="text-align:center;">${t('contract')} ${sLabel}</h2><p style="text-align:center;color:#666;">${ht?'Ane Lekòl':'Année Scolaire'} ${new Date().getFullYear()}-${new Date().getFullYear()+1}</p><hr/><h3>${ht?'Enfòmasyon':'Informations'}</h3><p><strong>${t('name')}:</strong> ${person.firstName} ${person.lastName}</p><p><strong>${t('gradeLevel')}:</strong> ${person.gradeLevel||'N/A'}</p>${person.dateOfBirth?`<p><strong>${t('dob')}:</strong> ${person.dateOfBirth}</p>`:''}${person.fatherName?`<p><strong>${t('father')}:</strong> ${person.fatherName}</p>`:''}${person.motherName?`<p><strong>${t('mother')}:</strong> ${person.motherName}</p>`:''}<p><strong>${t('phone')}:</strong> ${person.parentPhone||'N/A'}</p><h3>${ht?'Kondisyon Finansye':'Conditions Financières'}</h3><table style="width:100%;border-collapse:collapse;margin:20px 0;"><tr><td style="padding:10px;border:1px solid #ddd;">${t('tuition')} (10 ${ht?'mwa':'mois'})</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${scolarite.toLocaleString()}</td></tr><tr><td style="padding:10px;border:1px solid #ddd;"><em>${t('monthlyPayment')}</em></td><td style="padding:10px;border:1px solid #ddd;text-align:right;"><em>HTG ${monthly}</em></td></tr><tr><td style="padding:10px;border:1px solid #ddd;">${ht?'Frè enskripsyon':"Frais d'inscription"}</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${fraisDivers.toLocaleString()}</td></tr><tr style="background:#f8f8f8;"><td style="padding:10px;border:1px solid #ddd;"><strong>${ht?'Total Anyèl':'Total Annuel'}</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${annual.toLocaleString()}</td></tr></table><h3>Signatures</h3><div style="display:flex;justify-content:space-between;margin-top:40px;"><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">${ht?'Direktè/Direktris':'Directeur/Directrice'}</div><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">${adult?(ht?'Etidyan':'Étudiant(e)'):(ht?'Paran/Titè':'Parent/Tuteur')}</div></div><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;">${t('print')}</button></body></html>`);
    w.document.close();
  };

  const generateReportCard = (student) => {
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>${t('bulletinTitle')}</title></head><body style="font-family:sans-serif;padding:20px;"><h1>${school?.name||'SOCRATES'}</h1><h2>${t('bulletinTitle')}</h2><p><strong>${adult?t('studentAdult'):t('student')}:</strong> ${student.firstName} ${student.lastName}</p><p><strong>${t('gradeLevel')}:</strong> ${student.gradeLevel||'N/A'}</p><p style="color:#999;">${ht?'Nòt detaye yo disponib nan tab Nòt la.':"Les notes détaillées sont disponibles dans l'onglet Notes."}</p><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;width:100%;">${t('print')}</button></body></html>`);
    w.document.close();
  };

  const generateStatement = (student) => {
    const sp = payments.filter(p => p.studentId === student.id).sort((a, b) => (a.date||'').localeCompare(b.date||''));
    const scolarite = parseFloat(student.annualTuition)||0;
    const fraisDivers = parseFloat(student.fraisDivers)||0;
    const totalOwed = scolarite + fraisDivers;
    const totalPaid = sp.reduce((s, p) => s + (parseFloat(p.amount)||0), 0);
    const balance = totalOwed - totalPaid;
    const cls = classes.find(c => c.id === student.classId);
    let runningPaid = 0;
    const rows = sp.map(p => { const amt = parseFloat(p.amount)||0; runningPaid += amt; const rb = totalOwed - runningPaid; const tl = PAYMENT_TYPE_LABELS[p.paymentType]||(p.isDeposit?t('deposit'):t('tuition')); const ds = p.date?new Date(p.date).toLocaleDateString('fr-HT',{day:'numeric',month:'short',year:'numeric'}):'N/A'; return `<tr><td style="padding:10px;border:1px solid #e5e7eb;">${ds}</td><td style="padding:10px;border:1px solid #e5e7eb;">${tl}${p.month?' — '+p.month:''}</td><td style="padding:10px;border:1px solid #e5e7eb;">${p.method||t('paymentMethods')?.[0]||'Espèces'}</td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;color:#16a34a;font-weight:600;">HTG ${amt.toLocaleString()}</td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;color:${rb>0?'#dc2626':'#16a34a'};font-weight:600;">HTG ${rb.toLocaleString()}</td></tr>`; }).join('');
    const sLabel = adult?t('studentAdult'):t('student');
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${t('accountStatementTitle')}</title><style>body{font-family:'Inter',sans-serif;padding:20px;max-width:800px;margin:0 auto;color:#1f2937;}@media print{.no-print{display:none!important;}body{padding:0;}}</style></head><body>
      <div style="text-align:center;margin-bottom:30px;"><h1 style="color:#1e3a5f;margin:0;font-size:1.8em;">${school?.name||'SOCRATES'}</h1>${school?.address?`<p style="color:#6b7280;margin:4px 0;">${school.address}${school.city?', '+school.city:''}</p>`:''}${school?.phone?`<p style="color:#6b7280;margin:4px 0;">${t('phone')}: ${school.phone}</p>`:''}</div>
      <h2 style="text-align:center;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:10px;">${t('accountStatementTitle')}</h2>
      <div style="display:flex;justify-content:space-between;margin:20px 0;flex-wrap:wrap;gap:10px;"><div><p style="margin:4px 0;"><strong>${sLabel}:</strong> ${student.firstName} ${student.lastName}</p><p style="margin:4px 0;"><strong>${t('gradeLevel')}:</strong> ${student.gradeLevel||'N/A'}</p>${cls?`<p style="margin:4px 0;"><strong>${t('classe')}:</strong> ${cls.name}</p>`:''}</div><div style="text-align:right;"><p style="margin:4px 0;"><strong>${t('date')}:</strong> ${new Date().toLocaleDateString('fr-HT',{day:'numeric',month:'long',year:'numeric'})}</p><p style="margin:4px 0;"><strong>${ht?'Ref':'Réf'}:</strong> ${student.id.slice(0,8).toUpperCase()}</p></div></div>
      <div style="display:flex;gap:15px;margin:20px 0;flex-wrap:wrap;">
        <div style="flex:1;min-width:150px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:15px;text-align:center;"><p style="color:#6b7280;font-size:0.85em;margin:0;">${t('totalDue')}</p><p style="font-size:1.4em;font-weight:700;color:#1f2937;margin:5px 0;">HTG ${totalOwed.toLocaleString()}</p></div>
        <div style="flex:1;min-width:150px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:15px;text-align:center;"><p style="color:#6b7280;font-size:0.85em;margin:0;">${t('totalPaidLabel')}</p><p style="font-size:1.4em;font-weight:700;color:#16a34a;margin:5px 0;">HTG ${totalPaid.toLocaleString()}</p></div>
        <div style="flex:1;min-width:150px;background:${balance>0?'#fef2f2':'#f0fdf4'};border:1px solid ${balance>0?'#fecaca':'#bbf7d0'};border-radius:12px;padding:15px;text-align:center;"><p style="color:#6b7280;font-size:0.85em;margin:0;">${t('balance')}</p><p style="font-size:1.4em;font-weight:700;color:${balance>0?'#dc2626':'#16a34a'};margin:5px 0;">${balance>0?'HTG '+balance.toLocaleString():t('cleared')}</p></div>
      </div>
      <div style="background:#f8fafc;border-radius:8px;padding:12px;margin:15px 0;"><p style="margin:4px 0;font-size:0.9em;"><strong>${t('annualTuition')}:</strong> HTG ${scolarite.toLocaleString()} (HTG ${(scolarite/10).toLocaleString()} / ${ht?'mwa':'mois'} × 10)</p><p style="margin:4px 0;font-size:0.9em;"><strong>${t('miscFees')}:</strong> HTG ${fraisDivers.toLocaleString()}</p></div>
      <h3 style="margin-top:25px;color:#1e3a5f;">${t('paymentHistory')}</h3>
      ${sp.length>0?`<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:0.9em;"><thead><tr style="background:#1e3a5f;color:white;"><th style="padding:10px;text-align:left;">${t('date')}</th><th style="padding:10px;text-align:left;">Type</th><th style="padding:10px;text-align:left;">${t('method')}</th><th style="padding:10px;text-align:right;">${t('amount')}</th><th style="padding:10px;text-align:right;">${t('balance')}</th></tr></thead><tbody><tr style="background:#f8fafc;"><td style="padding:10px;border:1px solid #e5e7eb;" colspan="3"><em>${ht?'Balans inisyal':'Solde initial'}</em></td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;">—</td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;font-weight:600;color:#dc2626;">HTG ${totalOwed.toLocaleString()}</td></tr>${rows}</tbody></table>`:`<p style="text-align:center;color:#9ca3af;padding:20px;">${t('noPayments')}</p>`}
      <div style="margin-top:40px;display:flex;justify-content:space-between;"><div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">${t('schoolStamp')}</div><div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">${t('directorSignature')}</div></div>
      <p style="text-align:center;color:#9ca3af;font-size:0.75em;margin-top:30px;">${t('generatedBy')} — ${new Date().toLocaleString('fr-HT')}</p>
      <button onclick="window.print()" class="no-print" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;background:#1e3a5f;color:white;border:none;border-radius:8px;cursor:pointer;">${t('print')}</button>
    </body></html>`);
    w.document.close();
  };

  const toggleParentAccess = async (student) => { await updateDoc(doc(db, 'schools', school.id, 'students', student.id), { parentAccessEnabled: student.parentAccessEnabled===false?true:false }); loadAllData(); };
  const setStudentFlag = async (studentId, flagType, flagNote = '') => { await updateDoc(doc(db, 'schools', school.id, 'students', studentId), { flag: flagType, flagNote }); setFlaggingId(null); loadAllData(); };
  const clearFlag = async (studentId) => { await updateDoc(doc(db, 'schools', school.id, 'students', studentId), { flag: '', flagNote: '' }); loadAllData(); };
  const getAge = (dob) => { if (!dob) return null; return Math.floor((Date.now() - new Date(dob).getTime()) / (365.25*24*60*60*1000)); };
  const getFlagInfo = (flagValue) => FLAG_TYPES.find(f => f.value === flagValue);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-socrates-navy">{totalStudents}</p><p className="text-xs text-gray-500">{adult?t('studentsAdult'):t('students')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-sm font-bold"><span className="text-blue-600">{maleCount} {t('male')}</span> / <span className="text-pink-600">{femaleCount} {t('female')}</span></p><p className="text-xs text-gray-500">{t('demographics')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-red-500">{unpaidCount}</p><p className="text-xs text-gray-500">{t('unpaid')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center cursor-pointer" onClick={()=>{setShowFilters(true);setFilterStatus('flagged');}}><p className="text-2xl font-bold text-orange-500">{flaggedCount}</p><p className="text-xs text-gray-500">{t('flaggedAlert')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-lg font-bold text-emerald-600">HTG {(totalRevenue/1000).toFixed(0)}K</p><p className="text-xs text-gray-500">{t('expected')}</p></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder={t('search')} value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full text-base" /></div>
          <button onClick={()=>setShowFilters(!showFilters)} className={`px-3 py-3 border rounded-xl flex items-center gap-1 ${showFilters?'bg-socrates-blue text-white':''}`}><Filter size={18} /><ChevronDown size={14} /></button>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>onOpenModal('payment')} className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><DollarSign size={18} />{t('pay')}</button>
          <button onClick={()=>onOpenModal('student')} className="flex-1 sm:flex-none bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18} />{t('add')}</button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow p-3">
          <select value={filterLevel} onChange={e=>setFilterLevel(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="">{t('allLevels')}</option>{uniqueLevels.map(l=><option key={l} value={l}>{l}</option>)}</select>
          <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="">{t('allStatuses')}</option><option value="paid">{t('paid')}</option><option value="unpaid">{t('unpaid')}</option><option value="noDeposit">{t('noDepositAlert')}</option><option value="flagged">🚩 {t('flaggedAlert')}</option></select>
          {(filterLevel||filterStatus)&&<button onClick={()=>{setFilterLevel('');setFilterStatus('');}} className="text-red-500 text-sm font-medium px-3">{t('clear')}</button>}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} {t('results')}</span>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(student => {
          const balance = getStudentBalance(student.id);
          const expanded = expandedId === student.id;
          const age = getAge(student.dateOfBirth);
          const flagInfo = getFlagInfo(student.flag);
          const isFlagging = flaggingId === student.id;
          return (
            <div key={student.id} className={`bg-white rounded-xl shadow-lg overflow-hidden ${student.flag?'ring-2 ring-orange-300':''}`}>
              {flagInfo && (<div className={`px-4 py-2 flex items-center justify-between ${flagInfo.color}`}><span className="text-xs font-medium flex items-center gap-1.5"><span>{flagInfo.icon}</span> {t('flaggedAlert')}: {flagInfo.label}{student.flagNote&&<span className="text-xs opacity-75">— {student.flagNote}</span>}</span><button onClick={()=>clearFlag(student.id)} className="text-xs opacity-60 hover:opacity-100 flex items-center gap-0.5"><X size={12}/>{t('remove')}</button></div>)}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2" onClick={()=>setExpandedId(expanded?null:student.id)}>
                  {student.photo?<img src={student.photo} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0"/>:<div className={`w-12 h-12 rounded-full ${student.gender==='F'?'bg-pink-500':'bg-socrates-blue'} text-white flex items-center justify-center font-bold flex-shrink-0`}>{student.firstName?.[0]}{student.lastName?.[0]}</div>}
                  <div className="flex-1 min-w-0 cursor-pointer">
                    <p className="font-semibold text-gray-800 truncate">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-500 truncate">{student.gradeLevel||'N/A'}{student.gender&&<span className="ml-1">• {student.gender==='M'?'♂':'♀'}</span>}{age&&<span className="ml-1">• {age} {t('age')}</span>}</p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {!student.depositPaid&&<span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">{t('noDepositAlert')}</span>}
                      {!adult&&student.parentAccessEnabled===false&&<span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">{ht?'Pòtay bloke':'Portail bloqué'}</span>}
                      <span className="text-xs text-gray-400">HTG {getMonthlyTuition(student)}/{ht?'mwa':'mois'}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0"><span className={`text-lg font-bold ${balance>0?'text-red-500':'text-green-500'}`}>{Math.abs(balance).toLocaleString()}</span><p className="text-xs text-gray-400">{balance>0?t('owing'):t('paid')}</p></div>
                </div>

                {expanded&&(<div className="mt-3 pt-3 border-t space-y-2"><div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  {student.dateOfBirth&&<p className="text-gray-600"><span className="text-gray-400">{t('dob')}:</span> {student.dateOfBirth}</p>}
                  {student.birthPlace&&<p className="text-gray-600"><span className="text-gray-400">{t('birthPlace')}:</span> {student.birthPlace}</p>}
                  {student.address&&<p className="text-gray-600 col-span-2"><span className="text-gray-400">{t('address')}:</span> {student.address}</p>}
                  {adult?(<>{student.parentEmail&&<p className="text-gray-600"><span className="text-gray-400">{t('email')}:</span> {student.parentEmail}</p>}{student.parentPhone&&<p className="text-gray-600"><span className="text-gray-400">{t('phone')}:</span> {student.parentPhone}</p>}{student.nif&&<p className="text-gray-600"><span className="text-gray-400">NIF:</span> {student.nif}</p>}{student.profession&&<p className="text-gray-600"><span className="text-gray-400">Profession:</span> {student.profession}</p>}</>):(<>{student.fatherName&&<p className="text-gray-600"><span className="text-gray-400">{t('father')}:</span> {student.fatherName}</p>}{student.motherName&&<p className="text-gray-600"><span className="text-gray-400">{t('mother')}:</span> {student.motherName}</p>}{student.parentPhone&&<p className="text-gray-600"><span className="text-gray-400">{t('phone')}:</span> {student.parentPhone}</p>}{student.parentEmail&&<p className="text-gray-600"><span className="text-gray-400">{t('email')}:</span> {student.parentEmail}</p>}{student.bloodType&&<p className="text-gray-600"><span className="text-gray-400">{t('bloodType')}:</span> {student.bloodType}</p>}{student.medicalNotes&&<p className="text-gray-600"><span className="text-gray-400">{t('medicalInfo')}:</span> {student.medicalNotes}</p>}</>)}
                </div></div>)}

                {student.notes&&student.notes.trim()!==''&&(<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm mt-3"><p className="text-yellow-800"><strong>Message:</strong> {student.notes}</p></div>)}

                {isFlagging&&(<div className="mt-3 pt-3 border-t"><p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5"><AlertTriangle size={14} className="text-orange-500"/> {t('flagProblem')}</p><div className="flex flex-wrap gap-2 mb-2">{FLAG_TYPES.map(ft=>(<button key={ft.value} type="button" onClick={()=>{const note=ft.value==='other'?prompt(ht?'Nòt (opsyonèl):':'Note (optionnel):')||'':'';setStudentFlag(student.id,ft.value,note);}} className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${ft.color} hover:ring-2 hover:ring-offset-1 transition`}><span>{ft.icon}</span>{ft.label}</button>))}</div><button onClick={()=>setFlaggingId(null)} className="text-xs text-gray-400">{t('cancel')}</button></div>)}

                <div className="flex gap-2 flex-wrap mt-3">
                  <button onClick={()=>{onOpenModal('payment',null,{studentId:student.id,amount:getMonthlyTuition(student),paymentType:'scolarite'});}} className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><DollarSign size={16}/>{t('pay')}</button>
                  <button onClick={()=>generateStatement(student)} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16}/>{t('accountStatement')}</button>
                  <button onClick={()=>generateContract(student)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16}/>{t('contract')}</button>
                  <button onClick={()=>generateReportCard(student)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Download size={16}/></button>
                  {!adult&&<button onClick={()=>toggleParentAccess(student)} className={`px-3 py-2 rounded-lg text-sm font-medium ${student.parentAccessEnabled===false?'bg-red-100 text-red-600':'bg-green-100 text-green-600'}`}>{student.parentAccessEnabled===false?<XCircle size={16}/>:<CheckCircle size={16}/>}</button>}
                  <button onClick={()=>setFlaggingId(isFlagging?null:student.id)} className={`px-3 py-2 rounded-lg ${student.flag?'bg-orange-100 text-orange-600':'bg-gray-100 text-gray-500'}`}><Flag size={16}/></button>
                  <button onClick={()=>onOpenModal('student',student)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Edit size={16}/></button>
                  <button onClick={()=>deleteStudent(student.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length===0&&(<div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><Users size={48} className="mx-auto mb-4 opacity-50"/><p>{searchTerm||filterLevel||filterStatus?t('noResult'):`${ht?'Pa gen':'Aucun'} ${adult?t('studentAdultPlural'):t('studentPlural')}`}</p></div>)}
      </div>
    </div>
  );
}

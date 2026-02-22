import React, { useState } from 'react';
import { GraduationCap, Search, Plus, Edit, Trash2, FileText, DollarSign, Filter, ChevronDown } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

export default function Teachers({ onOpenModal }) {
  const { teachers, school, classes, teacherPayments, deleteTeacher, getTeacherBalance, getMonthlySalary, isAdultSchool } = useSchool();
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const adult = isAdultSchool();
  const ht = lang === 'ht';

  let filtered = teachers.filter(tc => (tc.firstName + ' ' + tc.lastName + ' ' + (tc.subject || '')).toLowerCase().includes(searchTerm.toLowerCase()));
  if (filterSubject) filtered = filtered.filter(tc => tc.subject === filterSubject);
  if (filterStatus === 'paid') filtered = filtered.filter(tc => getTeacherBalance(tc.id) <= 0);
  if (filterStatus === 'unpaid') filtered = filtered.filter(tc => getTeacherBalance(tc.id) > 0);

  const totalTeachers = teachers.length;
  const totalPayroll = teachers.reduce((sum, tc) => sum + (parseFloat(tc.annualSalary) || 0), 0);
  const unpaidCount = teachers.filter(tc => getTeacherBalance(tc.id) > 0).length;
  const totalOwed = teachers.reduce((sum, tc) => { const b = getTeacherBalance(tc.id); return sum + (b > 0 ? b : 0); }, 0);
  const uniqueSubjects = [...new Set(teachers.map(tc => tc.subject).filter(Boolean))].sort();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const paidThisMonth = teachers.filter(tc => teacherPayments.some(p => p.teacherId === tc.id && (p.date || '').startsWith(currentMonth))).length;
  const totalPaidAllTime = teacherPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const getTeacherClasses = (teacherId) => classes.filter(c => c.teacherId === teacherId || (c.teacherIds || []).includes(teacherId));

  const getTeacherPaymentHistory = (teacherId) => teacherPayments.filter(p => p.teacherId === teacherId).sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  const generateSalaryStatement = (teacher) => {
    const tPayments = getTeacherPaymentHistory(teacher.id);
    const annual = parseFloat(teacher.annualSalary) || 0;
    const monthly = (annual / 10).toFixed(0);
    const totalPaid = tPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    const balance = annual - totalPaid;
    let runningPaid = 0;
    const rows = tPayments.map(p => { const amt = parseFloat(p.amount)||0; runningPaid+=amt; const rem = annual-runningPaid; const ds = p.date?new Date(p.date).toLocaleDateString('fr-HT',{day:'numeric',month:'short',year:'numeric'}):'N/A'; return `<tr><td style="padding:10px;border:1px solid #e5e7eb;">${ds}</td><td style="padding:10px;border:1px solid #e5e7eb;">${p.month||'—'}</td><td style="padding:10px;border:1px solid #e5e7eb;">${p.method||t('paymentMethods')?.[0]||'Espèces'}</td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;color:#16a34a;font-weight:600;">HTG ${amt.toLocaleString()}</td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;color:${rem>0?'#dc2626':'#16a34a'};font-weight:600;">HTG ${rem.toLocaleString()}</td></tr>`; }).join('');
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${t('salaryStatement')}</title><style>body{font-family:sans-serif;padding:20px;max-width:800px;margin:0 auto;}@media print{.no-print{display:none!important;}}</style></head><body>
      <div style="text-align:center;margin-bottom:20px;"><h1 style="color:#1e3a5f;margin:0;">${school?.name||'SOCRATES'}</h1>${school?.address?`<p style="color:#6b7280;margin:4px 0;">${school.address}</p>`:''}${school?.phone?`<p style="color:#6b7280;margin:4px 0;">${t('phone')}: ${school.phone}</p>`:''}</div>
      <h2 style="text-align:center;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:10px;">${t('salaryStatement')}</h2>
      <div style="margin:20px 0;"><p><strong>${t('name')}:</strong> ${teacher.firstName} ${teacher.lastName}</p><p><strong>${t('subject')}:</strong> ${teacher.subject||'N/A'}</p>${teacher.qualification?`<p><strong>${ht?'Kalifikasyon':'Qualification'}:</strong> ${teacher.qualification}</p>`:''}</div>
      <div style="display:flex;gap:15px;margin:20px 0;flex-wrap:wrap;">
        <div style="flex:1;min-width:150px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:15px;text-align:center;"><p style="color:#6b7280;font-size:0.85em;margin:0;">${t('annualSalary')}</p><p style="font-size:1.4em;font-weight:700;margin:5px 0;">HTG ${annual.toLocaleString()}</p><p style="color:#6b7280;font-size:0.8em;margin:0;">HTG ${monthly} / ${ht?'mwa':'mois'}</p></div>
        <div style="flex:1;min-width:150px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:15px;text-align:center;"><p style="color:#6b7280;font-size:0.85em;margin:0;">${t('received')}</p><p style="font-size:1.4em;font-weight:700;color:#16a34a;margin:5px 0;">HTG ${totalPaid.toLocaleString()}</p></div>
        <div style="flex:1;min-width:150px;background:${balance>0?'#fef2f2':'#f0fdf4'};border:1px solid ${balance>0?'#fecaca':'#bbf7d0'};border-radius:12px;padding:15px;text-align:center;"><p style="color:#6b7280;font-size:0.85em;margin:0;">${t('remaining')}</p><p style="font-size:1.4em;font-weight:700;color:${balance>0?'#dc2626':'#16a34a'};margin:5px 0;">${balance>0?'HTG '+balance.toLocaleString():t('cleared')}</p></div>
      </div>
      <h3 style="margin-top:25px;color:#1e3a5f;">${ht?'Istwa Vèsman':'Historique des Versements'}</h3>
      ${tPayments.length>0?`<table style="width:100%;border-collapse:collapse;font-size:0.9em;"><thead><tr style="background:#1e3a5f;color:white;"><th style="padding:10px;text-align:left;">${t('date')}</th><th style="padding:10px;text-align:left;">${t('month')}</th><th style="padding:10px;text-align:left;">${t('method')}</th><th style="padding:10px;text-align:right;">${t('amount')}</th><th style="padding:10px;text-align:right;">${t('remaining')}</th></tr></thead><tbody><tr style="background:#f8fafc;"><td style="padding:10px;border:1px solid #e5e7eb;" colspan="3"><em>${ht?'Salè anyèl':'Salaire annuel dû'}</em></td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;">—</td><td style="padding:10px;border:1px solid #e5e7eb;text-align:right;font-weight:600;color:#dc2626;">HTG ${annual.toLocaleString()}</td></tr>${rows}</tbody></table>`:`<p style="text-align:center;color:#9ca3af;padding:20px;">${ht?'Pa gen vèsman anrejistre':'Aucun versement enregistré'}</p>`}
      <div style="margin-top:40px;display:flex;justify-content:space-between;"><div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">${t('schoolStamp')}</div><div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">${t('directorSignature')}</div></div>
      <p style="text-align:center;color:#9ca3af;font-size:0.75em;margin-top:30px;">${t('generatedBy')} — ${new Date().toLocaleString('fr-HT')}</p>
      <button onclick="window.print()" class="no-print" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;background:#1e3a5f;color:white;border:none;border-radius:8px;cursor:pointer;">${t('print')}</button>
    </body></html>`);
    w.document.close();
  };

  const generateContract = (teacher) => {
    const annual = parseFloat(teacher.annualSalary) || 0;
    const tLabel = adult ? t('teacherAdult') : t('teacher');
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${t('contract')} ${tLabel}</title></head><body style="font-family:sans-serif;padding:20px;max-width:600px;margin:0 auto;"><h1 style="color:#1e3a5f;text-align:center;">${school?.name||'SOCRATES'}</h1><h2 style="text-align:center;">${t('contract')} ${tLabel}</h2><p style="text-align:center;color:#666;">${ht?'Ane Lekòl':'Année Scolaire'} ${new Date().getFullYear()}-${new Date().getFullYear()+1}</p><hr/><h3>${ht?'Enfòmasyon':'Informations'}</h3><p><strong>${t('name')}:</strong> ${teacher.firstName} ${teacher.lastName}</p><p><strong>${t('subject')}:</strong> ${teacher.subject||'N/A'}</p>${teacher.qualification?`<p><strong>${ht?'Kalifikasyon':'Qualification'}:</strong> ${teacher.qualification}</p>`:''}${teacher.nif?`<p><strong>NIF:</strong> ${teacher.nif}</p>`:''}${teacher.hireDate?`<p><strong>${ht?"Dat anbochaj":"Date d'embauche"}:</strong> ${teacher.hireDate}</p>`:''}<h3>${ht?'Kondisyon Finansye':'Conditions Financières'}</h3><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:10px;border:1px solid #ddd;"><strong>${t('annualSalary')}</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${annual.toLocaleString()}</td></tr><tr><td style="padding:10px;border:1px solid #ddd;">${t('monthlyPayment')}</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${(annual/10).toLocaleString()}</td></tr></table><h3>Signatures</h3><div style="display:flex;justify-content:space-between;margin-top:40px;"><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">${ht?'Direktè/Direktris':'Directeur/Directrice'}</div><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">${tLabel}</div></div><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;width:100%;">${t('print')}</button></body></html>`);
    w.document.close();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-green-600">{totalTeachers}</p><p className="text-xs text-gray-500">{adult?t('teachersAdult'):t('teachers')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-lg font-bold text-gray-700">HTG {(totalPayroll/1000).toFixed(0)}K</p><p className="text-xs text-gray-500">{t('payroll')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-green-500">{paidThisMonth}/{totalTeachers}</p><p className="text-xs text-gray-500">{t('paidThisMonthLabel')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-red-500">{unpaidCount}</p><p className="text-xs text-gray-500">{t('unpaidTeachers')}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-lg font-bold text-orange-500">HTG {totalOwed.toLocaleString()}</p><p className="text-xs text-gray-500">{t('totalDue')}</p></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder={t('search')} value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full text-base"/></div>
          <button onClick={()=>setShowFilters(!showFilters)} className={`px-3 py-3 border rounded-xl flex items-center gap-1 ${showFilters?'bg-green-600 text-white':''}`}><Filter size={18}/><ChevronDown size={14}/></button>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>onOpenModal('teacherPayment')} className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><DollarSign size={18}/>{t('pay')}</button>
          <button onClick={()=>onOpenModal('teacher')} className="flex-1 sm:flex-none bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18}/>{t('add')}</button>
        </div>
      </div>

      {showFilters&&(<div className="flex flex-wrap gap-2 bg-white rounded-xl shadow p-3">
        <select value={filterSubject} onChange={e=>setFilterSubject(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="">{t('allSubjects')}</option>{uniqueSubjects.map(s=><option key={s} value={s}>{s}</option>)}</select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="">{t('allStatuses')}</option><option value="paid">{t('paid')}</option><option value="unpaid">{t('unpaidTeachers')}</option></select>
        {(filterSubject||filterStatus)&&<button onClick={()=>{setFilterSubject('');setFilterStatus('');}} className="text-red-500 text-sm font-medium px-3">{t('clear')}</button>}
        <span className="ml-auto text-sm text-gray-400">{filtered.length} {t('results')}</span>
      </div>)}

      <div className="space-y-3">
        {filtered.map(teacher => {
          const balance = getTeacherBalance(teacher.id);
          const expanded = expandedId === teacher.id;
          const tClasses = getTeacherClasses(teacher.id);
          return (
            <div key={teacher.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2 cursor-pointer" onClick={()=>setExpandedId(expanded?null:teacher.id)}>
                  {teacher.photo?<img src={teacher.photo} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0"/>:<div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">{teacher.firstName?.[0]}{teacher.lastName?.[0]}</div>}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{teacher.firstName} {teacher.lastName}</p>
                    <p className="text-sm text-gray-500 truncate">{teacher.subject||'N/A'}{teacher.qualification&&` • ${teacher.qualification}`}</p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs text-gray-400">HTG {getMonthlySalary(teacher)}/{ht?'mwa':'mois'}</span>
                      {tClasses.length>0&&<span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{tClasses.length} {t('teacherClasses')}</span>}
                      {teacher.isCoach&&<span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">🏅 Coach{teacher.coachActivity?`: ${teacher.coachActivity}`:''}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-gray-500">{ht?'Anyèl':'Annuel'}: {(parseFloat(teacher.annualSalary)||0).toLocaleString()}</p>
                    <p className={`font-bold ${balance>0?'text-red-500':'text-green-500'}`}>{balance>0?`${t('owing')}: ${balance.toLocaleString()}`:`✓ ${t('paid')}`}</p>
                  </div>
                </div>

                {expanded&&(<div className="mt-3 pt-3 border-t space-y-2"><div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  {teacher.email&&<p className="text-gray-600"><span className="text-gray-400">{t('email')}:</span> {teacher.email}</p>}
                  {teacher.phone&&<p className="text-gray-600"><span className="text-gray-400">{t('phone')}:</span> {teacher.phone}</p>}
                  {teacher.nif&&<p className="text-gray-600"><span className="text-gray-400">NIF:</span> {teacher.nif}</p>}
                  {teacher.hireDate&&<p className="text-gray-600"><span className="text-gray-400">{ht?'Anboche':'Embauché'}:</span> {teacher.hireDate}</p>}
                  {teacher.address&&<p className="text-gray-600 col-span-2"><span className="text-gray-400">{t('address')}:</span> {teacher.address}</p>}
                  {teacher.isCoach&&<p className="text-gray-600 col-span-2"><span className="text-gray-400">🏅 Coach:</span> {teacher.coachActivity||t('yes')}</p>}
                </div>
                {tClasses.length>0&&(<div className="flex flex-wrap gap-1.5 pt-2"><span className="text-xs text-gray-500 mr-1">{t('classes')}:</span>{tClasses.map(c=><span key={c.id} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{c.name}</span>)}</div>)}
                </div>)}

                <div className="flex gap-2 flex-wrap mt-3">
                  <button onClick={()=>generateContract(teacher)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16}/>{t('contract')}</button>
                  <button onClick={()=>generateSalaryStatement(teacher)} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16}/>{t('paySlip')}</button>
                  <button onClick={()=>{onOpenModal('teacherPayment',null,{teacherId:teacher.id,amount:getMonthlySalary(teacher)});}} className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><DollarSign size={16}/>{t('pay')}</button>
                  <button onClick={()=>onOpenModal('teacher',teacher)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Edit size={16}/></button>
                  <button onClick={()=>deleteTeacher(teacher.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length===0&&(<div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><GraduationCap size={48} className="mx-auto mb-4 opacity-50"/><p>{searchTerm||filterSubject||filterStatus?t('noResult'):`${ht?'Pa gen':'Aucun'} ${adult?t('teacherAdultPlural'):t('teacherPlural')}`}</p></div>)}
      </div>
    </div>
  );
}

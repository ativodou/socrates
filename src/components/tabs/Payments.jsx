import React, { useState, useMemo } from 'react';
import { DollarSign, Plus, Download, Trash2, Search, Filter, ChevronDown, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Receipt, BarChart3, X } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

export default function Payments({ onOpenModal }) {
  const { students, teachers, payments, teacherPayments, expenses, school, deletePayment, deleteTeacherPayment, deleteExpense, getStudentBalance, getTeacherBalance, isAdultSchool } = useSchool();
  const { t, lang } = useLang();
  const ht = lang === 'ht';

  const [view, setView] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showBilan, setShowBilan] = useState(false);
  const [bilanMonth, setBilanMonth] = useState(new Date().toISOString().slice(0, 7));

  const adult = isAdultSchool();
  const studentLabel = adult ? t('studentsAdult') : t('students');
  const teacherLabel = adult ? t('teachersAdult') : t('teachers');

  const PAYMENT_TYPE_LABELS = {
    scolarite: `📚 ${t('tuition')}`, inscription: `📋 ${t('inscription')}`, deposit: `💰 ${t('deposit')}`,
    examen: `📝 ${ht?'Egzamen':'Examen'}`, uniforme: `👔 ${ht?'Inifòm':'Uniforme'}`,
    transport: `🚐 ${ht?'Transpò':'Transport'}`, cantine: `🍽️ ${ht?'Kantin':'Cantine'}`,
    activite: `⚽ ${ht?'Aktivite':'Activité'}`, autre: `📋 ${t('other')}`,
  };

  const EXPENSE_CATEGORIES = {
    staff: { label: ht?'Salè pèsonèl':'Salaire personnel', icon: '👤' },
    coach: { label: ht?'Coach ekstèn':'Coach externe', icon: '🏅' },
    rent: { label: ht?'Lwaye':'Loyer', icon: '🏠' },
    utilities: { label: ht?'Kouran / Dlo':'Électricité / Eau', icon: '💡' },
    supplies: { label: ht?'Founitè':'Fournitures', icon: '📦' },
    maintenance: { label: ht?'Antretyen':'Entretien', icon: '🔧' },
    transport: { label: ht?'Transpò':'Transport', icon: '🚐' },
    food: { label: ht?'Kantin':'Cantine', icon: '🍽️' },
    other: { label: t('other'), icon: '📋' },
  };

  const allEntries = useMemo(() => {
    const entries = [];
    payments.forEach(p => {
      const student = students.find(s => s.id === p.studentId);
      entries.push({ ...p, entryType: 'in', subType: 'student', personName: student ? `${student.firstName} ${student.lastName}` : (ht?'Enkoni':'Inconnu'), label: PAYMENT_TYPE_LABELS[p.paymentType] || (p.isDeposit ? `💰 ${t('deposit')}` : `📚 ${t('tuition')}`) });
    });
    teacherPayments.forEach(p => {
      const teacher = teachers.find(tc => tc.id === p.teacherId);
      entries.push({ ...p, entryType: 'out', subType: 'teacher', personName: teacher ? `${teacher.firstName} ${teacher.lastName}` : (ht?'Enkoni':'Inconnu'), label: t('salary') });
    });
    (expenses || []).forEach(p => {
      const cat = EXPENSE_CATEGORIES[p.category] || EXPENSE_CATEGORIES.other;
      entries.push({ ...p, entryType: 'out', subType: 'expense', personName: p.personName || cat.label, label: `${cat.icon} ${cat.label}` });
    });
    return entries.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [payments, teacherPayments, expenses, students, teachers]);

  const filtered = useMemo(() => {
    let list = allEntries;
    if (view === 'students') list = list.filter(e => e.subType === 'student');
    if (view === 'teachers') list = list.filter(e => e.subType === 'teacher');
    if (view === 'expenses') list = list.filter(e => e.subType === 'expense');
    if (searchTerm) { const q = searchTerm.toLowerCase(); list = list.filter(e => e.personName.toLowerCase().includes(q) || (e.description||'').toLowerCase().includes(q) || (e.label||'').toLowerCase().includes(q)); }
    if (filterMethod) list = list.filter(e => e.method === filterMethod);
    if (filterMonth) list = list.filter(e => (e.date||'').startsWith(filterMonth));
    return list;
  }, [allEntries, view, searchTerm, filterMethod, filterMonth]);

  const entrees = filtered.filter(e => e.entryType === 'in');
  const sorties = filtered.filter(e => e.entryType === 'out');
  const totalIn = entrees.reduce((sum, p) => sum + (parseFloat(p.amount)||0), 0);
  const totalOut = sorties.reduce((sum, p) => sum + (parseFloat(p.amount)||0), 0);
  const net = totalIn - totalOut;
  const totalStudentDue = students.reduce((sum, s) => sum + Math.max(0, getStudentBalance(s.id)), 0);
  const totalTeacherDue = teachers.reduce((sum, tc) => sum + Math.max(0, getTeacherBalance(tc.id)), 0);
  const uniqueMethods = [...new Set(allEntries.map(e => e.method).filter(Boolean))].sort();
  const uniqueMonths = [...new Set(allEntries.map(e => (e.date||'').slice(0,7)).filter(Boolean))].sort().reverse();

  const generateReceipt = (entry) => {
    const isOut = entry.entryType === 'out';
    const receiptLabel = ht ? 'Resi' : 'Reçu';
    const title = entry.isDeposit ? `${receiptLabel} ${t('deposit')}` : entry.subType==='teacher' ? `${receiptLabel} ${t('salary')}` : entry.subType==='expense' ? `${receiptLabel} ${t('expense')}` : `${receiptLabel} ${t('payment')}`;
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${receiptLabel}</title></head><body style="font-family:sans-serif;padding:20px;max-width:400px;margin:0 auto;">
      <h1 style="color:#1e3a5f;font-size:1.5em;text-align:center;">${school?.name||'SOCRATES'}</h1>
      <h3 style="text-align:center;">${title}</h3>
      <p style="text-align:center;color:#666;">${receiptLabel} #${entry.id.slice(0,8).toUpperCase()}</p><hr/>
      <p><strong>${t('date')}:</strong> ${entry.date?new Date(entry.date).toLocaleDateString():'N/A'}</p>
      <p><strong>${isOut?(ht?'Benefisyè':'Bénéficiaire'):(adult?t('studentAdult'):t('student'))}:</strong> ${entry.personName}</p>
      ${entry.personRole?`<p><strong>${ht?'Fonksyon':'Fonction'}:</strong> ${entry.personRole}</p>`:''}
      <p><strong>${t('method')}:</strong> ${entry.method||(ht?'Kach':'Espèces')}</p>
      ${entry.month?`<p><strong>${t('month')}:</strong> ${entry.month}</p>`:''}
      ${entry.category?`<p><strong>${ht?'Kategori':'Catégorie'}:</strong> ${EXPENSE_CATEGORIES[entry.category]?.label||entry.category}</p>`:''}
      ${entry.description?`<p><strong>Description:</strong> ${entry.description}</p>`:''}
      <div style="background:#f0f0f0;padding:20px;text-align:center;margin:20px 0;border-radius:8px;">
        <p style="margin:0;">${isOut?(ht?'Montan Vèse':'Montant Versé'):(ht?'Montan Resevwa':'Montant Reçu')}</p>
        <h1 style="color:${isOut?'#dc2626':'#16a34a'};margin:10px 0;">HTG ${parseFloat(entry.amount).toLocaleString()}</h1>
      </div>
      <p style="text-align:center;color:${isOut?'#dc2626':'#16a34a'};font-weight:bold;font-size:1.2em;">${isOut?(ht?'VÈSE':'VERSÉ'):(ht?'PEYE':'PAYÉ')}</p>
      <button onclick="window.print()" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;">${t('print')}</button>
    </body></html>`);
    w.document.close();
  };

  const handleDelete = (entry) => {
    if (entry.subType === 'student') deletePayment(entry.id);
    else if (entry.subType === 'teacher') deleteTeacherPayment(entry.id);
    else if (entry.subType === 'expense') deleteExpense(entry.id);
  };

  const generateBilan = () => {
    const [year, month] = bilanMonth.split('-');
    const monthNames = ht ? ['Janvye','Fevriye','Mas','Avril','Me','Jen','Jiyè','Out','Septanm','Oktòb','Novanm','Desanm'] : ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const monthName = monthNames[parseInt(month)-1];
    const prevMonth = parseInt(month)===1?`${parseInt(year)-1}-12`:`${year}-${String(parseInt(month)-1).padStart(2,'0')}`;

    const mPayments = payments.filter(p => (p.date||'').startsWith(bilanMonth));
    const mTeacherPay = teacherPayments.filter(p => (p.date||'').startsWith(bilanMonth));
    const mExpenses = (expenses||[]).filter(p => (p.date||'').startsWith(bilanMonth));
    const pmPayments = payments.filter(p => (p.date||'').startsWith(prevMonth));
    const pmTeacherPay = teacherPayments.filter(p => (p.date||'').startsWith(prevMonth));
    const pmExpenses = (expenses||[]).filter(p => (p.date||'').startsWith(prevMonth));

    const revenueByType = {};
    mPayments.forEach(p => { const type = p.paymentType||(p.isDeposit?'deposit':'scolarite'); revenueByType[type]=(revenueByType[type]||0)+(parseFloat(p.amount)||0); });
    const expenseByCategory = {};
    mExpenses.forEach(p => { const cat = p.category||'other'; expenseByCategory[cat]=(expenseByCategory[cat]||0)+(parseFloat(p.amount)||0); });

    const totalRevenue = mPayments.reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    const totalSalaries = mTeacherPay.reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    const totalExpenses = mExpenses.reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    const totalBOut = totalSalaries + totalExpenses;
    const bNet = totalRevenue - totalBOut;
    const prevRevenue = pmPayments.reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    const prevBOut = pmTeacherPay.reduce((s,p)=>s+(parseFloat(p.amount)||0),0)+pmExpenses.reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    const prevNet = prevRevenue - prevBOut;

    const arrow = (current,previous) => { if(previous===0) return ''; const pct=Math.round(((current-previous)/previous)*100); if(pct>0) return `<span style="color:#16a34a;">↑ +${pct}%</span>`; if(pct<0) return `<span style="color:#dc2626;">↓ ${pct}%</span>`; return '<span style="color:#6b7280;">= 0%</span>'; };

    const revenueRows = Object.entries(revenueByType).sort((a,b)=>b[1]-a[1]).map(([type,amount])=>`<tr><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${PAYMENT_TYPE_LABELS[type]||type}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;text-align:right;font-weight:600;color:#16a34a;">HTG ${amount.toLocaleString()}</td></tr>`).join('');
    const salaryRows = mTeacherPay.map(p=>{const tc=teachers.find(x=>x.id===p.teacherId);return `<tr><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${tc?tc.firstName+' '+tc.lastName:(ht?'Enkoni':'Inconnu')}${p.month?' — '+p.month:''}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;text-align:right;font-weight:600;color:#dc2626;">HTG ${(parseFloat(p.amount)||0).toLocaleString()}</td></tr>`;}).join('');
    const expenseRows = Object.entries(expenseByCategory).sort((a,b)=>b[1]-a[1]).map(([cat,amount])=>{const info=EXPENSE_CATEGORIES[cat]||EXPENSE_CATEGORIES.other;return `<tr><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${info.icon} ${info.label}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;text-align:right;font-weight:600;color:#dc2626;">HTG ${amount.toLocaleString()}</td></tr>`;}).join('');

    const bTotalStudentDue = students.reduce((sum,s)=>sum+Math.max(0,getStudentBalance(s.id)),0);
    const bTotalTeacherDue = teachers.reduce((sum,tc)=>sum+Math.max(0,getTeacherBalance(tc.id)),0);
    const unpaidStudents = students.filter(s=>getStudentBalance(s.id)>0);
    const top5 = [...unpaidStudents].sort((a,b)=>getStudentBalance(b.id)-getStudentBalance(a.id)).slice(0,5);
    const debtorRows = top5.map(s=>`<tr><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${s.firstName} ${s.lastName}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">${s.gradeLevel||'N/A'}</td><td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;text-align:right;font-weight:600;color:#dc2626;">HTG ${getStudentBalance(s.id).toLocaleString()}</td></tr>`).join('');

    const _in = ht?'Antre':'Entrées'; const _out = ht?'Sòti':'Sorties'; const _net = ht?'Rezilta Nèt':'Résultat Net';
    const _vsPrev = ht?'vs mwa avan':'vs mois préc.'; const _totalIn = ht?'TOTAL ANTRE':'TOTAL ENTRÉES'; const _totalSal = ht?'TOTAL SALÈ':'TOTAL SALAIRES'; const _totalExp = ht?'TOTAL DEPANS':'TOTAL DÉPENSES';
    const sLabel = adult?t('studentsAdult'):t('students'); const tLabel = adult?t('teachersAdult'):t('teachers');

    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${ht?'Bilan':'Bilan'} ${monthName} ${year}</title>
    <style>body{font-family:'Inter',sans-serif;padding:20px;max-width:800px;margin:0 auto;color:#1f2937;font-size:14px;}@media print{.no-print{display:none!important;}body{padding:0;}}table{width:100%;border-collapse:collapse;}.section{margin:25px 0;}.section h3{color:#1e3a5f;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:10px;}.card{display:inline-block;min-width:150px;padding:15px;border-radius:12px;text-align:center;margin:5px;}</style></head><body>
      <div style="text-align:center;margin-bottom:30px;"><h1 style="color:#1e3a5f;margin:0;font-size:1.8em;">${school?.name||'SOCRATES'}</h1>${school?.address?`<p style="color:#6b7280;margin:4px 0;">${school.address}${school.city?', '+school.city:''}</p>`:''}${school?.phone?`<p style="color:#6b7280;margin:4px 0;">${t('phone')}: ${school.phone}</p>`:''}</div>
      <h2 style="text-align:center;color:#1e3a5f;border-bottom:3px solid #1e3a5f;padding-bottom:10px;">${ht?'BILAN MANSYÈL':'BILAN MENSUEL'} — ${monthName.toUpperCase()} ${year}</h2>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:25px 0;">
        <div class="card" style="background:#f0fdf4;border:1px solid #bbf7d0;"><p style="color:#6b7280;font-size:0.8em;margin:0;">${_in}</p><p style="font-size:1.5em;font-weight:700;color:#16a34a;margin:5px 0;">HTG ${totalRevenue.toLocaleString()}</p><p style="font-size:0.75em;margin:0;">${arrow(totalRevenue,prevRevenue)} ${_vsPrev}</p></div>
        <div class="card" style="background:#fef2f2;border:1px solid #fecaca;"><p style="color:#6b7280;font-size:0.8em;margin:0;">${_out}</p><p style="font-size:1.5em;font-weight:700;color:#dc2626;margin:5px 0;">HTG ${totalBOut.toLocaleString()}</p><p style="font-size:0.75em;margin:0;">${arrow(totalBOut,prevBOut)} ${_vsPrev}</p></div>
        <div class="card" style="background:${bNet>=0?'#f0fdf4':'#fef2f2'};border:1px solid ${bNet>=0?'#bbf7d0':'#fecaca'};"><p style="color:#6b7280;font-size:0.8em;margin:0;">${_net}</p><p style="font-size:1.5em;font-weight:700;color:${bNet>=0?'#16a34a':'#dc2626'};margin:5px 0;">${bNet>=0?'':'-'}HTG ${Math.abs(bNet).toLocaleString()}</p><p style="font-size:0.75em;margin:0;">${arrow(bNet,prevNet)} ${_vsPrev}</p></div>
      </div>
      <div class="section"><h3>📈 ${_in} — ${ht?'Detay pa tip':'Détail par type'}</h3>${revenueRows?`<table>${revenueRows}<tr style="background:#f0fdf4;font-weight:700;"><td style="padding:10px 12px;">${_totalIn}</td><td style="padding:10px 12px;text-align:right;color:#16a34a;">HTG ${totalRevenue.toLocaleString()}</td></tr></table>`:`<p style="color:#9ca3af;">${ht?'Pa gen antre mwa sa a':'Aucune entrée ce mois'}</p>`}<p style="color:#6b7280;font-size:0.85em;margin-top:8px;">${mPayments.length} ${ht?'peman resevwa':'paiement(s) reçu(s)'}</p></div>
      <div class="section"><h3>👥 ${ht?'Salè':'Salaires'} ${tLabel}</h3>${salaryRows?`<table>${salaryRows}<tr style="background:#fef2f2;font-weight:700;"><td style="padding:10px 12px;">${_totalSal}</td><td style="padding:10px 12px;text-align:right;color:#dc2626;">HTG ${totalSalaries.toLocaleString()}</td></tr></table>`:`<p style="color:#9ca3af;">${ht?'Pa gen salè vèse mwa sa a':'Aucun salaire versé ce mois'}</p>`}</div>
      <div class="section"><h3>📋 ${ht?'Depans pa kategori':'Dépenses par catégorie'}</h3>${expenseRows?`<table>${expenseRows}<tr style="background:#fef2f2;font-weight:700;"><td style="padding:10px 12px;">${_totalExp}</td><td style="padding:10px 12px;text-align:right;color:#dc2626;">HTG ${totalExpenses.toLocaleString()}</td></tr></table>`:`<p style="color:#9ca3af;">${ht?'Pa gen depans mwa sa a':'Aucune dépense ce mois'}</p>`}</div>
      <div class="section"><h3>⚠️ ${ht?'Sitiyasyon Enpeye':'Situation des Impayés'}</h3><div style="display:flex;gap:15px;flex-wrap:wrap;margin-bottom:15px;">
        <div style="background:#fff7ed;border:1px solid #fed7aa;padding:12px 20px;border-radius:8px;"><p style="margin:0;font-size:0.8em;color:#6b7280;">${sLabel} ${ht?'ak balans':'avec solde'}</p><p style="margin:4px 0;font-size:1.3em;font-weight:700;color:#ea580c;">${unpaidStudents.length} / ${students.length}</p></div>
        <div style="background:#fff7ed;border:1px solid #fed7aa;padding:12px 20px;border-radius:8px;"><p style="margin:0;font-size:0.8em;color:#6b7280;">${t('totalDue')} ${sLabel.toLowerCase()}</p><p style="margin:4px 0;font-size:1.3em;font-weight:700;color:#ea580c;">HTG ${bTotalStudentDue.toLocaleString()}</p></div>
        <div style="background:#fff7ed;border:1px solid #fed7aa;padding:12px 20px;border-radius:8px;"><p style="margin:0;font-size:0.8em;color:#6b7280;">${ht?'Salè ki rete pou vèse':'Salaires restants à verser'}</p><p style="margin:4px 0;font-size:1.3em;font-weight:700;color:#ea580c;">HTG ${bTotalTeacherDue.toLocaleString()}</p></div>
      </div>${debtorRows?`<p style="font-weight:600;margin-bottom:5px;">Top 5 — ${sLabel} ${ht?'ki dwe plis':'les plus endettés'}:</p><table><thead><tr style="background:#1e3a5f;color:white;"><th style="padding:8px 12px;text-align:left;">${t('name')}</th><th style="padding:8px 12px;text-align:left;">${t('gradeLevel')}</th><th style="padding:8px 12px;text-align:right;">${t('balance')}</th></tr></thead><tbody>${debtorRows}</tbody></table>`:''}</div>
      <div style="margin-top:40px;display:flex;justify-content:space-between;"><div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">${t('schoolStamp')}</div><div style="width:45%;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:0.85em;">${t('directorSignature')}</div></div>
      <p style="text-align:center;color:#9ca3af;font-size:0.75em;margin-top:30px;">${t('generatedBy')} — ${new Date().toLocaleString('fr-HT')}</p>
      <button onclick="window.print()" class="no-print" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;background:#1e3a5f;color:white;border:none;border-radius:8px;cursor:pointer;">${t('print')}</button>
    </body></html>`);
    w.document.close();
    setShowBilan(false);
  };

  const formatDate = (d) => { if(!d) return 'N/A'; try { return new Date(d).toLocaleDateString('fr-HT',{day:'numeric',month:'short',year:'numeric'}); } catch { return d; } };

  const PaymentRow = ({ entry }) => {
    const isOut = entry.entryType === 'out';
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isOut?'bg-red-100 text-red-600':'bg-green-100 text-green-600'}`}>{isOut?<ArrowDownRight size={20}/>:<ArrowUpRight size={20}/>}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-semibold ${isOut?'text-red-600':'text-green-600'}`}>{isOut?'-':'+'}HTG {parseFloat(entry.amount).toLocaleString()}</p>
            {entry.isDeposit&&<span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">{t('deposit')}</span>}
            {entry.month&&<span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{entry.month}</span>}
            {entry.subType==='student'&&entry.paymentType&&entry.paymentType!=='scolarite'&&!entry.isDeposit&&(<span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{PAYMENT_TYPE_LABELS[entry.paymentType]||entry.paymentType}</span>)}
            {entry.subType==='expense'&&entry.category&&(<span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{EXPENSE_CATEGORIES[entry.category]?.icon} {EXPENSE_CATEGORIES[entry.category]?.label}</span>)}
            {entry.subType==='teacher'&&<span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">{t('salary')}</span>}
          </div>
          <p className="text-sm text-gray-700 truncate">{entry.personName}{entry.personRole?` — ${entry.personRole}`:''}</p>
          <div className="flex gap-2 text-xs text-gray-400"><span>{formatDate(entry.date)}</span>{entry.method&&<span>• {entry.method}</span>}{entry.description&&<span>• {entry.description}</span>}</div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={()=>generateReceipt(entry)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700"><Download size={16}/></button>
          <button onClick={()=>handleDelete(entry)} className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
        </div>
      </div>
    );
  };

  const _inLabel = ht?'Antre':'Entrées'; const _outLabel = ht?'Sòti':'Sorties'; const _netLabel = ht?'Balans nèt':'Solde net';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><div className="flex items-center justify-center gap-1 mb-1"><TrendingUp size={16} className="text-green-500"/></div><p className="text-xl font-bold text-green-600">HTG {totalIn.toLocaleString()}</p><p className="text-xs text-gray-500">{_inLabel}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><div className="flex items-center justify-center gap-1 mb-1"><TrendingDown size={16} className="text-red-500"/></div><p className="text-xl font-bold text-red-500">HTG {totalOut.toLocaleString()}</p><p className="text-xs text-gray-500">{_outLabel}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className={`text-xl font-bold ${net>=0?'text-emerald-600':'text-red-600'}`}>HTG {net.toLocaleString()}</p><p className="text-xs text-gray-500">{_netLabel}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-lg font-bold text-orange-500">HTG {totalStudentDue.toLocaleString()}</p><p className="text-xs text-gray-500">{t('owing')} {studentLabel.toLowerCase()}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-lg font-bold text-orange-500">HTG {totalTeacherDue.toLocaleString()}</p><p className="text-xs text-gray-500">{t('owing')} {teacherLabel.toLowerCase()}</p></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1 items-center flex-wrap">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {[{id:'all',label:ht?'Tout':'Tous'},{id:'students',label:studentLabel},{id:'teachers',label:teacherLabel},{id:'expenses',label:t('expenses')}].map(v=>(<button key={v.id} onClick={()=>setView(v.id)} className={`px-3 py-2 rounded-lg text-xs font-medium transition ${view===v.id?'bg-white shadow text-socrates-navy':'text-gray-500'}`}>{v.label}</button>))}
          </div>
          <div className="relative flex-1 sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/><input type="text" placeholder={t('search')} value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2.5 border rounded-xl w-full text-sm"/></div>
          <button onClick={()=>setShowFilters(!showFilters)} className={`px-3 py-2.5 border rounded-xl flex items-center gap-1 ${showFilters?'bg-socrates-blue text-white':''}`}><Filter size={16}/><ChevronDown size={12}/></button>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setShowBilan(true)} className="flex-1 sm:flex-none bg-socrates-navy text-white px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 text-sm"><BarChart3 size={16}/>Bilan</button>
          <button onClick={()=>onOpenModal('expense')} className="flex-1 sm:flex-none bg-orange-500 text-white px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 text-sm"><Receipt size={16}/>{t('expense')}</button>
        </div>
      </div>

      {showFilters&&(<div className="flex flex-wrap gap-2 bg-white rounded-xl shadow p-3">
        <select value={filterMethod} onChange={e=>setFilterMethod(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="">{ht?'Tout metòd':'Toutes méthodes'}</option>{uniqueMethods.map(m=><option key={m} value={m}>{m}</option>)}</select>
        <select value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="">{ht?'Tout mwa':'Tous les mois'}</option>{uniqueMonths.map(m=><option key={m} value={m}>{m}</option>)}</select>
        {(filterMethod||filterMonth)&&<button onClick={()=>{setFilterMethod('');setFilterMonth('');}} className="text-red-500 text-sm font-medium px-3">{t('clear')}</button>}
        <span className="ml-auto text-sm text-gray-400">{filtered.length} {ht?'tranzaksyon':'transaction(s)'}</span>
      </div>)}

      {view==='all'?(
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><ArrowUpRight size={18} className="text-green-600"/></div><h3 className="font-semibold text-gray-800">{_inLabel} <span className="text-sm font-normal text-gray-400">({entrees.length})</span></h3><span className="ml-auto text-sm font-bold text-green-600">HTG {totalIn.toLocaleString()}</span></div>
            {entrees.length>0?(<div className="space-y-2">{entrees.map(e=><PaymentRow key={`in-${e.id}`} entry={e}/>)}</div>):(<div className="text-center py-6 text-gray-400 text-sm bg-white rounded-xl shadow">{ht?'Pa gen antre':'Aucune entrée'}{filterMethod||filterMonth||searchTerm?` ${ht?'pou filtè sa yo':'pour ces filtres'}`:''}</div>)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><ArrowDownRight size={18} className="text-red-600"/></div><h3 className="font-semibold text-gray-800">{_outLabel} <span className="text-sm font-normal text-gray-400">({sorties.length})</span></h3><span className="ml-auto text-sm font-bold text-red-500">HTG {totalOut.toLocaleString()}</span></div>
            {sorties.length>0?(<div className="space-y-2">{sorties.map(e=><PaymentRow key={`out-${e.id}`} entry={e}/>)}</div>):(<div className="text-center py-6 text-gray-400 text-sm bg-white rounded-xl shadow">{ht?'Pa gen sòti':'Aucune sortie'}{filterMethod||filterMonth||searchTerm?` ${ht?'pou filtè sa yo':'pour ces filtres'}`:''}</div>)}
          </div>
        </div>
      ):(
        <div className="space-y-2">
          {filtered.length>0?filtered.map(e=>(<PaymentRow key={`${e.subType}-${e.id}`} entry={e}/>)):(<div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><DollarSign size={48} className="mx-auto mb-4 opacity-50"/><p>{ht?'Pa gen tranzaksyon':'Aucune transaction'}{filterMethod||filterMonth||searchTerm?` ${ht?'pou filtè sa yo':'pour ces filtres'}`:''}</p></div>)}
        </div>
      )}

      {showBilan&&(<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setShowBilan(false)}><div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-socrates-navy">{ht?'Bilan Mansyèl':'Bilan Mensuel'}</h3><button onClick={()=>setShowBilan(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={18}/></button></div>
        <p className="text-sm text-gray-500 mb-4">{ht?'Chwazi mwa a pou jenere rapò finansye a.':'Sélectionnez le mois pour générer le rapport financier.'}</p>
        <input type="month" value={bilanMonth} onChange={e=>setBilanMonth(e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base mb-4 focus:ring-2 focus:ring-socrates-blue/20 focus:border-socrates-blue"/>
        <button onClick={generateBilan} className="w-full bg-socrates-navy text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-900 transition"><BarChart3 size={18}/>{ht?'Jenere Bilan':'Générer le Bilan'}</button>
      </div></div>)}
    </div>
  );
}

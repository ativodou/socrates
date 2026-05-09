import React, { useState } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import { useSchool } from '../../contexts/SchoolContext';

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const icons = {
  expense:   'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  payroll:   'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  report:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  income:    'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  add:       'M12 5v14M5 12h14',
  trash:     'M3 6h18M19 6l-1 14H6L5 6M9 6V4h6v2',
  edit:      'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  print:     'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z',
  check:     'M20 6L9 17l-5-5',
  close:     'M18 6L6 18M6 6l12 12',
  money:     'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 17v-2M12 7v2m0 0v4m0-4h2a2 2 0 0 1 0 4h-4a2 2 0 0 0 0 4h2',
  chart:     'M18 20V10M12 20V4M6 20v-6',
};

// ─── Color palette ────────────────────────────────────────────────────────────
const PALETTE = {
  primary:   '#1565C0',
  accent:    '#0288D1',
  success:   '#2E7D32',
  danger:    '#C62828',
  warning:   '#F57F17',
  muted:     '#546E7A',
  bg:        '#F0F4F8',
  surface:   '#FFFFFF',
  border:    '#CFD8DC',
  text:      '#1C2B36',
  textLight: '#546E7A',
};

// ─── Expense categories (enum keys matching SchoolContext/Payments) ────────────
const EXPENSE_CATEGORY_OPTS = [
  { key: 'staff',       fr: 'Salaires & Indemnités',      ht: 'Salè & Konpansasyon' },
  { key: 'coach',       fr: 'Coach externe',              ht: 'Coach ekstèn' },
  { key: 'rent',        fr: 'Loyer & Charges',            ht: 'Lwaye & Chaj' },
  { key: 'utilities',   fr: 'Eau & Électricité',          ht: 'Dlo & Elektrisite' },
  { key: 'supplies',    fr: 'Fournitures scolaires',      ht: 'Materyèl lekòl' },
  { key: 'maintenance', fr: 'Réparations & Entretien',    ht: 'Reparasyon & Antretyen' },
  { key: 'transport',   fr: 'Transport',                  ht: 'Transpò' },
  { key: 'food',        fr: 'Alimentation (cantine)',     ht: 'Manje (kantèn)' },
  { key: 'other',       fr: 'Autres dépenses',            ht: 'Lòt depans' },
];

const MONTHS = {
  fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  ht: ['Janvye','Fevriye','Mas','Avril','Me','Jen','Jiyè','Out','Septanm','Oktòb','Novanm','Desanm'],
};

const PAYMENT_METHODS = {
  fr: ['Espèces', 'Chèque', 'Virement', 'Mobile Money'],
  ht: ['Kach', 'Chèk', 'Virement', 'Mobil Moni'],
};

// ─── i18n strings ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    title: 'Comptabilité',
    tabs: { expenses: 'Dépenses', payroll: 'Paie du Personnel', income: 'Revenus', report: 'Rapport Mensuel' },
    addExpense: 'Ajouter une Dépense',
    editExpense: 'Modifier la Dépense',
    date: 'Date', category: 'Catégorie', amount: 'Montant (HTG)',
    description: 'Description', personName: 'Payé par', method: 'Méthode',
    save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer',
    noExpenses: 'Aucune dépense enregistrée.',
    totalExpenses: 'Total des Dépenses',
    confirmDelete: 'Supprimer cet enregistrement ?',
    addPayroll: 'Ajouter un Paiement',
    editPayroll: 'Modifier le Paiement',
    employee: 'Employé', role: 'Rôle / Poste', period: 'Période',
    amountHTG: 'Montant (HTG)',
    paid: 'Payé', status: 'Statut',
    generateSlip: 'Fiche de Paie',
    noPayroll: 'Aucun paiement enregistré.',
    totalPayroll: 'Total Paie',
    personType: { teacher: 'Enseignant', staff: 'Personnel admin.' },
    selectPerson: 'Choisir un employé',
    month: 'Mois',
    expectedIncome: 'Revenus Attendus (frais de scolarité)',
    collectedIncome: 'Revenus Collectés',
    pendingBalance: 'Solde Impayé',
    noIncomeData: 'Aucune donnée de paiement disponible.',
    reportTitle: 'Rapport Mensuel', year: 'Année',
    totalIncome: 'Total Revenus', totalExpense: 'Total Dépenses',
    totalPayrollLabel: 'Total Paie', netBalance: 'Solde Net',
    printReport: 'Imprimer le Rapport',
    expenseByCategory: 'Dépenses par Catégorie',
    surplus: 'Surplus', deficit: 'Déficit',
    currency: { htg: 'HTG', usd: 'USD' },
    allMonths: 'Tous les mois',
  },
  ht: {
    title: 'Kontablite',
    tabs: { expenses: 'Depans', payroll: 'Pèman Anplwaye', income: 'Revni', report: 'Rapò Mansyèl' },
    addExpense: 'Ajoute yon Depans',
    editExpense: 'Modifye Depans lan',
    date: 'Dat', category: 'Kategori', amount: 'Montan (HTG)',
    description: 'Deskripsyon', personName: 'Ki moun ki peye', method: 'Metòd',
    save: 'Anrejistre', cancel: 'Anile', delete: 'Efase',
    noExpenses: 'Pa gen depans anrejistre.',
    totalExpenses: 'Total Depans',
    confirmDelete: 'Efase anrejistman sa a ?',
    addPayroll: 'Ajoute yon Pèman',
    editPayroll: 'Modifye Pèman an',
    employee: 'Anplwaye', role: 'Wòl / Pòs', period: 'Peryòd',
    amountHTG: 'Montan (HTG)',
    paid: 'Peye', status: 'Eta',
    generateSlip: 'Fich Pèman',
    noPayroll: 'Pa gen pèman anrejistre.',
    totalPayroll: 'Total Pèman',
    personType: { teacher: 'Pwofesè', staff: 'Pèsonèl admin.' },
    selectPerson: 'Chwazi yon anplwaye',
    month: 'Mwa',
    expectedIncome: 'Revni Prevwa (frè eskolaj)',
    collectedIncome: 'Revni Kolekte',
    pendingBalance: 'Balans Inpeye',
    noIncomeData: 'Pa gen done pèman disponib.',
    reportTitle: 'Rapò Mansyèl', year: 'Ane',
    totalIncome: 'Total Revni', totalExpense: 'Total Depans',
    totalPayrollLabel: 'Total Pèman', netBalance: 'Balans Nèt',
    printReport: 'Enprime Rapò a',
    expenseByCategory: 'Depans pa Kategori',
    surplus: 'Siplis', deficit: 'Defisi',
    currency: { htg: 'HTG', usd: 'USD' },
    allMonths: 'Tout mwa yo',
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => Number(n || 0).toLocaleString('fr-HT', { minimumFractionDigits: 0 });
const today = () => new Date().toISOString().split('T')[0];
const currentMonth = () => new Date().getMonth();
const currentYear = () => new Date().getFullYear();
const currentMonthStr = () => `${currentYear()}-${String(currentMonth() + 1).padStart(2, '0')}`;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Accounting() {
  const {
    school, payments = [], students = [], teachers = [],
    expenses = [], teacherPayments = [], staffPayments = [],
    saveExpense, deleteExpense,
    saveTeacherPayment, deleteTeacherPayment,
    saveStaffPayment, deleteStaffPayment,
  } = useSchool();
  const { lang: language } = useLang();
  const t = T[language] || T.fr;
  const months = MONTHS[language] || MONTHS.fr;
  const methods = PAYMENT_METHODS[language] || PAYMENT_METHODS.fr;
  const adminStaff = school?.adminStaff || [];

  const [tab, setTab] = useState('expenses');

  // ── Expense filter state ───────────────────────────────────────────────────
  const [expenseForm, setExpenseForm] = useState(null);
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState(currentYear());

  // ── Payroll state ─────────────────────────────────────────────────────────
  const [payrollForm, setPayrollForm] = useState(null);
  const [slipTarget, setSlipTarget] = useState(null);

  // ── Report state ──────────────────────────────────────────────────────────
  const [reportMonth, setReportMonth] = useState(currentMonth());
  const [reportYear, setReportYear] = useState(currentYear());
  // ── Category helpers ───────────────────────────────────────────────────────
  const getCatLabel = (key) => {
    const opt = EXPENSE_CATEGORY_OPTS.find(o => o.key === key);
    // Fallback shows raw value for old free-text entries saved before reconciliation
    return opt ? (opt[language] || opt.fr) : key;
  };

  // ── Combined payroll from teacherPayments + staffPayments ──────────────────
  const allPayroll = [
    ...teacherPayments.map(p => {
      const teacher = teachers.find(tc => tc.id === p.teacherId);
      return {
        ...p,
        _type: 'teacher',
        personId: p.teacherId,
        employee: teacher?.name || p.teacherName || '?',
        role: teacher?.subject || '',
        amountHTG: p.amount,
      };
    }),
    ...staffPayments.map(p => {
      const member = adminStaff.find(s => s.id === p.staffId);
      return {
        ...p,
        _type: 'staff',
        personId: p.staffId,
        employee: member?.name || p.staffName || '?',
        role: member?.role || '',
        amountHTG: p.amount,
      };
    }),
  ].sort((a, b) => (b.date || '') > (a.date || '') ? 1 : -1);

  // Format "YYYY-MM" → "Janvier 2025"
  const formatPeriod = (month) => {
    if (!month) return '—';
    const [y, m] = month.split('-');
    return `${months[parseInt(m, 10) - 1] || ''} ${y}`;
  };

  // ── Filtered expenses ──────────────────────────────────────────────────────
  const filteredExpenses = expenses.filter(e => {
    if (filterMonth === 'all') return e.date?.startsWith(String(filterYear));
    const m = String(Number(filterMonth) + 1).padStart(2, '0');
    return e.date?.startsWith(`${filterYear}-${m}`);
  });

  // ── Report data ────────────────────────────────────────────────────────────
  const reportMonthStr = String(reportMonth + 1).padStart(2, '0');
  const reportPrefix = `${reportYear}-${reportMonthStr}`;

  const reportExpenses = expenses.filter(e => e.date?.startsWith(reportPrefix));
  const reportPayroll = allPayroll.filter(p =>
    (p.month || '').startsWith(reportPrefix) || (p.date || '').startsWith(reportPrefix)
  );

  const totalReportExpenses = reportExpenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalReportPayroll = reportPayroll.reduce((s, p) => s + Number(p.amountHTG || 0), 0);

  const collectedIncome = payments
    .filter(p => {
      const d = p.date || (p.createdAt?.seconds ? new Date(p.createdAt.seconds * 1000).toISOString().split('T')[0] : '');
      return (p.date || d || '').startsWith(reportPrefix);
    })
    .reduce((s, p) => s + Number(p.amount || 0), 0);

  const expectedIncome = students.reduce((s, st) => s + (Number(st.annualTuition || 0) + Number(st.fraisDivers || 0)), 0);

  const netBalance = collectedIncome - totalReportExpenses - totalReportPayroll;

  const catBreakdown = EXPENSE_CATEGORY_OPTS.map(opt => ({
    cat: opt[language] || opt.fr,
    key: opt.key,
    total: reportExpenses.filter(e => e.category === opt.key).reduce((s, e) => s + Number(e.amount || 0), 0),
  })).filter(c => c.total > 0);

  const maxCat = Math.max(...catBreakdown.map(c => c.total), 1);

  // ── Print ──────────────────────────────────────────────────────────────────
  const handlePrint = () => {
    const w = window.open('', '_blank');
    w.document.write(`
      <html><head><title>${t.reportTitle} - ${months[reportMonth]} ${reportYear}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; color: #1C2B36; }
        h1 { color: #1565C0; border-bottom: 2px solid #1565C0; padding-bottom: 8px; }
        h2 { color: #0288D1; margin-top: 24px; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th { background: #1565C0; color: white; padding: 8px 12px; text-align: left; }
        td { padding: 7px 12px; border-bottom: 1px solid #CFD8DC; }
        tr:nth-child(even) td { background: #F0F4F8; }
        .summary { display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0; }
        .card { background: #F0F4F8; border-radius: 8px; padding: 14px 20px; min-width: 160px; }
        .card-label { font-size: 12px; color: #546E7A; }
        .card-value { font-size: 22px; font-weight: bold; color: #1565C0; }
        .net-surplus { color: #2E7D32; }
        .net-deficit { color: #C62828; }
        .bar { height: 16px; background: #1565C0; border-radius: 3px; display: inline-block; }
        @media print { button { display: none; } }
      </style>
      </head><body>
      <h1>${school?.name || 'SOCRATES'} — ${t.reportTitle}</h1>
      <p>${months[reportMonth]} ${reportYear}</p>
      <div class="summary">
        <div class="card"><div class="card-label">${t.totalIncome}</div><div class="card-value">${fmt(collectedIncome)} HTG</div></div>
        <div class="card"><div class="card-label">${t.totalExpense}</div><div class="card-value">${fmt(totalReportExpenses)} HTG</div></div>
        <div class="card"><div class="card-label">${t.totalPayrollLabel}</div><div class="card-value">${fmt(totalReportPayroll)} HTG</div></div>
        <div class="card"><div class="card-label">${t.netBalance}</div>
          <div class="card-value ${netBalance >= 0 ? 'net-surplus' : 'net-deficit'}">${fmt(Math.abs(netBalance))} HTG ${netBalance >= 0 ? '▲' : '▼'}</div>
        </div>
      </div>
      ${catBreakdown.length ? `
        <h2>${t.expenseByCategory}</h2>
        <table><thead><tr><th>${t.category}</th><th>${t.amount}</th></tr></thead><tbody>
        ${catBreakdown.map(c => `<tr><td>${c.cat}</td><td>${fmt(c.total)} HTG</td></tr>`).join('')}
        </tbody></table>
      ` : ''}
      ${reportExpenses.length ? `
        <h2>${t.tabs.expenses}</h2>
        <table><thead><tr><th>${t.date}</th><th>${t.category}</th><th>${t.description}</th><th>${t.amount}</th><th>${t.personName}</th></tr></thead><tbody>
        ${reportExpenses.map(e => `<tr><td>${e.date}</td><td>${getCatLabel(e.category)}</td><td>${e.description || '—'}</td><td>${fmt(e.amount)} HTG</td><td>${e.personName || e.paidBy || '—'}</td></tr>`).join('')}
        </tbody></table>
      ` : ''}
      ${reportPayroll.length ? `
        <h2>${t.tabs.payroll}</h2>
        <table><thead><tr><th>${t.employee}</th><th>${t.role}</th><th>${t.period}</th><th>${t.amountHTG}</th><th>${t.method}</th></tr></thead><tbody>
        ${reportPayroll.map(p => `<tr><td>${p.employee}</td><td>${p.role || '—'}</td><td>${formatPeriod(p.month)}</td><td>${fmt(p.amountHTG)} HTG</td><td>${p.method || '—'}</td></tr>`).join('')}
        </tbody></table>
      ` : ''}
      <p style="margin-top:40px;font-size:11px;color:#546E7A;">Généré par SOCRATES — ${new Date().toLocaleDateString('fr-FR')}</p>
      </body></html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  };

  // ─── Styles ────────────────────────────────────────────────────────────────
  const s = {
    container: { fontFamily: "'Segoe UI', Arial, sans-serif", background: PALETTE.bg, minHeight: '100vh', padding: '24px' },
    header: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
    h1: { margin: 0, fontSize: 22, fontWeight: 700, color: PALETTE.primary },
    tabs: { display: 'flex', gap: 4, background: PALETTE.surface, borderRadius: 10, padding: 4, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,.08)' },
    tab: (active) => ({
      flex: 1, padding: '9px 8px', border: 'none', cursor: 'pointer', borderRadius: 7,
      fontSize: 13, fontWeight: active ? 600 : 400, transition: 'all .15s',
      background: active ? PALETTE.primary : 'transparent',
      color: active ? '#fff' : PALETTE.textLight,
    }),
    card: { background: PALETTE.surface, borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,.07)' },
    btn: (variant = 'primary', sm = false) => ({
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: sm ? '6px 12px' : '9px 16px',
      borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
      fontSize: sm ? 12 : 13, transition: 'opacity .15s',
      background: variant === 'primary' ? PALETTE.primary
        : variant === 'success' ? PALETTE.success
        : variant === 'danger' ? PALETTE.danger
        : variant === 'warning' ? PALETTE.warning
        : '#E0E0E0',
      color: variant === 'ghost' ? PALETTE.text : '#fff',
    }),
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 20 },
    summaryCard: (color) => ({
      background: PALETTE.surface, borderRadius: 10, padding: '14px 16px',
      borderLeft: `4px solid ${color}`, boxShadow: '0 1px 4px rgba(0,0,0,.07)'
    }),
    summaryLabel: { fontSize: 11, color: PALETTE.textLight, fontWeight: 500, textTransform: 'uppercase', letterSpacing: .5 },
    summaryValue: (color) => ({ fontSize: 22, fontWeight: 700, color, marginTop: 4 }),
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '10px 12px', background: '#EEF2F7', color: PALETTE.muted, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 },
    td: { padding: '10px 12px', borderBottom: `1px solid ${PALETTE.border}`, fontSize: 13, color: PALETTE.text, verticalAlign: 'middle' },
    badge: (color) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: color + '20', color }),
    input: { width: '100%', padding: '9px 12px', border: `1px solid ${PALETTE.border}`, borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
    label: { display: 'block', fontSize: 12, fontWeight: 600, color: PALETTE.muted, marginBottom: 4 },
    modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    modalBox: { background: '#fff', borderRadius: 14, padding: 28, width: '100%', maxWidth: 520, boxShadow: '0 8px 32px rgba(0,0,0,.18)' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { margin: 0, fontSize: 17, fontWeight: 700, color: PALETTE.primary },
    filterRow: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' },
    select: { padding: '8px 12px', border: `1px solid ${PALETTE.border}`, borderRadius: 8, fontSize: 13, background: '#fff' },
    toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    actionBtns: { display: 'flex', gap: 6 },
    empty: { textAlign: 'center', color: PALETTE.textLight, padding: '40px 0', fontSize: 14 },
    slip: { background: '#fff', borderRadius: 12, padding: 28, maxWidth: 440, margin: '0 auto', border: `1px solid ${PALETTE.border}` },
    slipRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${PALETTE.border}` },
    progressBg: { background: '#EEF2F7', borderRadius: 6, height: 14, overflow: 'hidden', flex: 1, marginLeft: 12 },
    progressBar: (pct, color) => ({ height: '100%', width: `${pct}%`, background: color, borderRadius: 6, transition: 'width .5s' }),
  };

  // ─── Expense Modal ─────────────────────────────────────────────────────────
  const ExpenseModal = ({ form, onClose }) => {
    const [f, setF] = useState({
      date: today(),
      category: EXPENSE_CATEGORY_OPTS[0].key,
      amount: '',
      method: methods[0],
      description: '',
      ...form,
      personName: form?.personName || form?.paidBy || '',
    });

    const handleSave = async () => {
      if (!f.date || !f.category || !f.amount) return;
      const [y, m] = f.date.split('-');
      await saveExpense(
        { date: f.date, category: f.category, amount: Number(f.amount), personName: f.personName || '', method: f.method || '', description: f.description || '', month: `${y}-${m}` },
        form?.id || null
      );
      onClose();
    };

    return (
      <div style={s.modal}>
        <div style={s.modalBox}>
          <div style={s.modalHeader}>
            <h3 style={s.modalTitle}>{form?.id ? t.editExpense : t.addExpense}</h3>
            <button style={{...s.btn('ghost', true), padding: '4px'}} onClick={onClose}><Icon d={icons.close} size={16} /></button>
          </div>
          <div style={s.formGrid}>
            <div>
              <label style={s.label}>{t.date} *</label>
              <input style={s.input} type="date" value={f.date} onChange={e => setF({...f, date: e.target.value})} />
            </div>
            <div>
              <label style={s.label}>{t.category} *</label>
              <select style={s.input} value={f.category} onChange={e => setF({...f, category: e.target.value})}>
                {EXPENSE_CATEGORY_OPTS.map(o => <option key={o.key} value={o.key}>{o[language] || o.fr}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>{t.amount} *</label>
              <input style={s.input} type="number" min="0" value={f.amount} onChange={e => setF({...f, amount: e.target.value})} />
            </div>
            <div>
              <label style={s.label}>{t.method}</label>
              <select style={s.input} value={f.method} onChange={e => setF({...f, method: e.target.value})}>
                {methods.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>{t.personName}</label>
              <input style={s.input} type="text" value={f.personName} onChange={e => setF({...f, personName: e.target.value})} />
            </div>
            <div>
              <label style={s.label}>{t.description}</label>
              <input style={s.input} type="text" value={f.description} onChange={e => setF({...f, description: e.target.value})} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
            <button style={s.btn('ghost')} onClick={onClose}>{t.cancel}</button>
            {form?.id && <button style={s.btn('danger')} onClick={() => { deleteExpense(form.id); onClose(); }}><Icon d={icons.trash} size={14} />{t.delete}</button>}
            <button style={s.btn('primary')} onClick={handleSave}><Icon d={icons.check} size={14} />{t.save}</button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Payroll Modal ─────────────────────────────────────────────────────────
  const PayrollModal = ({ form, onClose }) => {
    const [f, setF] = useState({
      _type: 'teacher',
      personId: '',
      amount: '',
      month: currentMonthStr(),
      date: today(),
      method: methods[0],
      notes: '',
      ...form,
    });

    const people = f._type === 'teacher' ? teachers : adminStaff;
    const selectedPerson = people.find(p => p.id === f.personId);

    const handleSave = async () => {
      if (!f.personId || !f.amount) return;
      const data = {
        amount: Number(f.amount),
        month: f.month,
        date: f.date,
        method: f.method || methods[0],
        notes: f.notes || '',
      };
      const editId = form?.id || null;
      if (f._type === 'teacher') {
        await saveTeacherPayment({ ...data, teacherId: f.personId, teacherName: selectedPerson?.name || '' }, editId);
      } else {
        await saveStaffPayment({ ...data, staffId: f.personId, staffName: selectedPerson?.name || '' }, editId);
      }
      onClose();
    };

    const handleDelete = () => {
      if (form?._type === 'teacher') deleteTeacherPayment(form.id);
      else deleteStaffPayment(form.id);
      onClose();
    };

    return (
      <div style={s.modal}>
        <div style={s.modalBox}>
          <div style={s.modalHeader}>
            <h3 style={s.modalTitle}>{form?.id ? t.editPayroll : t.addPayroll}</h3>
            <button style={{...s.btn('ghost', true), padding: '4px'}} onClick={onClose}><Icon d={icons.close} size={16} /></button>
          </div>
          <div style={s.formGrid}>
            <div>
              <label style={s.label}>{t.role}</label>
              <select style={s.input} value={f._type} onChange={e => setF({...f, _type: e.target.value, personId: ''})}>
                <option value="teacher">{t.personType.teacher}</option>
                <option value="staff">{t.personType.staff}</option>
              </select>
            </div>
            <div>
              <label style={s.label}>{t.employee} *</label>
              <select style={s.input} value={f.personId} onChange={e => setF({...f, personId: e.target.value})}>
                <option value="">{t.selectPerson}</option>
                {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>{t.month}</label>
              <input style={s.input} type="month" value={f.month} onChange={e => setF({...f, month: e.target.value, date: e.target.value ? `${e.target.value}-01` : f.date})} />
            </div>
            <div>
              <label style={s.label}>{t.date}</label>
              <input style={s.input} type="date" value={f.date} onChange={e => setF({...f, date: e.target.value})} />
            </div>
            <div>
              <label style={s.label}>{t.amountHTG} *</label>
              <input style={s.input} type="number" min="0" value={f.amount} onChange={e => setF({...f, amount: e.target.value})} />
            </div>
            <div>
              <label style={s.label}>{t.method}</label>
              <select style={s.input} value={f.method} onChange={e => setF({...f, method: e.target.value})}>
                {methods.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={s.label}>Notes</label>
              <input style={s.input} type="text" value={f.notes} onChange={e => setF({...f, notes: e.target.value})} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
            <button style={s.btn('ghost')} onClick={onClose}>{t.cancel}</button>
            {form?.id && <button style={s.btn('danger')} onClick={handleDelete}><Icon d={icons.trash} size={14} />{t.delete}</button>}
            <button style={s.btn('primary')} onClick={handleSave}><Icon d={icons.check} size={14} />{t.save}</button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Pay Slip Modal ────────────────────────────────────────────────────────
  const PaySlipModal = ({ item, onClose }) => (
    <div style={s.modal} onClick={onClose}>
      <div style={{...s.modalBox, maxWidth: 420}} onClick={e => e.stopPropagation()}>
        <div style={s.modalHeader}>
          <h3 style={s.modalTitle}>{t.generateSlip}</h3>
          <button style={{...s.btn('ghost', true), padding: '4px'}} onClick={onClose}><Icon d={icons.close} size={16} /></button>
        </div>
        <div style={s.slip} id="payslip-content">
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: PALETTE.primary }}>{school?.name || 'SOCRATES'}</div>
            <div style={{ fontSize: 13, color: PALETTE.muted }}>{t.generateSlip} — {formatPeriod(item.month)}</div>
          </div>
          {[
            [t.employee, item.employee],
            [t.role, item.role || (item._type === 'teacher' ? t.personType.teacher : t.personType.staff)],
            [t.period, formatPeriod(item.month)],
            [t.amountHTG, `${fmt(item.amountHTG)} HTG`],
            [t.method, item.method || '—'],
            [t.status, t.paid],
            ...(item.notes ? [['Notes', item.notes]] : []),
          ].map(([k, v]) => (
            <div key={k} style={s.slipRow}><span style={{ fontWeight: 600, fontSize: 13 }}>{k}</span><span style={{ fontSize: 13 }}>{v}</span></div>
          ))}
          <div style={{ marginTop: 16, fontSize: 11, color: PALETTE.textLight, textAlign: 'center' }}>
            Généré par SOCRATES — {new Date().toLocaleDateString('fr-FR')}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
          <button style={s.btn('primary')} onClick={() => {
            const w = window.open('', '_blank');
            w.document.write(`<html><head><title>Fiche de Paie</title><style>body{font-family:Arial;padding:30px;}</style></head><body>${document.getElementById('payslip-content').outerHTML}</body></html>`);
            w.document.close(); w.print();
          }}><Icon d={icons.print} size={14} />{t.printReport}</button>
        </div>
      </div>
    </div>
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  const totalFilteredExpenses = filteredExpenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalPayroll = allPayroll.reduce((s, p) => s + Number(p.amountHTG || 0), 0);

  return (
    <div style={s.container}>
      {expenseForm !== null && <ExpenseModal form={expenseForm} onClose={() => setExpenseForm(null)} />}
      {payrollForm !== null && <PayrollModal form={payrollForm} onClose={() => setPayrollForm(null)} />}
      {slipTarget && <PaySlipModal item={slipTarget} onClose={() => setSlipTarget(null)} />}

      {/* Header */}
      <div style={s.header}>
        <Icon d={icons.money} size={24} color={PALETTE.primary} />
        <h1 style={s.h1}>{t.title}</h1>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {Object.entries(t.tabs).map(([key, label]) => (
          <button key={key} style={s.tab(tab === key)} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* ── EXPENSES TAB ────────────────────────────────────────────────────── */}
      {tab === 'expenses' && (
        <div>
          <div style={s.summaryGrid}>
            <div style={s.summaryCard(PALETTE.danger)}>
              <div style={s.summaryLabel}>{t.totalExpenses}</div>
              <div style={s.summaryValue(PALETTE.danger)}>{fmt(totalFilteredExpenses)}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
            <div style={s.summaryCard(PALETTE.muted)}>
              <div style={s.summaryLabel}>{language === 'fr' ? 'Enregistrements' : 'Anrejistman'}</div>
              <div style={s.summaryValue(PALETTE.muted)}>{filteredExpenses.length}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>{language === 'fr' ? 'dépenses filtrées' : 'depans filtere'}</div>
            </div>
          </div>

          <div style={s.toolbar}>
            <div style={s.filterRow}>
              <select style={s.select} value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
                <option value="all">{t.allMonths}</option>
                {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <select style={s.select} value={filterYear} onChange={e => setFilterYear(Number(e.target.value))}>
                {[2024, 2025, 2026, 2027].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <button style={s.btn()} onClick={() => setExpenseForm({})}>
              <Icon d={icons.add} size={14} />{t.addExpense}
            </button>
          </div>

          <div style={s.card}>
            {filteredExpenses.length === 0 ? (
              <div style={s.empty}>{t.noExpenses}</div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>{t.date}</th>
                    <th style={s.th}>{t.category}</th>
                    <th style={s.th}>{t.description}</th>
                    <th style={s.th}>{t.amount}</th>
                    <th style={s.th}>{t.personName}</th>
                    <th style={s.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map(e => (
                    <tr key={e.id} onMouseEnter={ev => ev.currentTarget.style.background='#F7F9FB'} onMouseLeave={ev => ev.currentTarget.style.background=''}>
                      <td style={s.td}>{e.date}</td>
                      <td style={s.td}><span style={s.badge(PALETTE.accent)}>{getCatLabel(e.category)}</span></td>
                      <td style={s.td}>{e.description || '—'}</td>
                      <td style={{...s.td, fontWeight: 600, color: PALETTE.danger}}>{fmt(e.amount)} HTG</td>
                      <td style={s.td}>{e.personName || e.paidBy || '—'}</td>
                      <td style={s.td}>
                        <div style={s.actionBtns}>
                          <button style={s.btn('ghost', true)} onClick={() => setExpenseForm(e)}><Icon d={icons.edit} size={14} /></button>
                          <button style={s.btn('danger', true)} onClick={() => deleteExpense(e.id)}><Icon d={icons.trash} size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ── PAYROLL TAB ─────────────────────────────────────────────────────── */}
      {tab === 'payroll' && (
        <div>
          <div style={s.summaryGrid}>
            <div style={s.summaryCard(PALETTE.primary)}>
              <div style={s.summaryLabel}>{t.totalPayroll}</div>
              <div style={s.summaryValue(PALETTE.primary)}>{fmt(totalPayroll)}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
            <div style={s.summaryCard(PALETTE.success)}>
              <div style={s.summaryLabel}>{language === 'fr' ? 'Enseignants' : 'Pwofesè'}</div>
              <div style={s.summaryValue(PALETTE.success)}>{teacherPayments.length}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>{language === 'fr' ? 'paiements' : 'pèman'}</div>
            </div>
            <div style={s.summaryCard(PALETTE.accent)}>
              <div style={s.summaryLabel}>{language === 'fr' ? 'Personnel admin.' : 'Pèsonèl admin.'}</div>
              <div style={s.summaryValue(PALETTE.accent)}>{staffPayments.length}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>{language === 'fr' ? 'paiements' : 'pèman'}</div>
            </div>
          </div>

          <div style={s.toolbar}>
            <div />
            <button style={s.btn()} onClick={() => setPayrollForm({})}>
              <Icon d={icons.add} size={14} />{t.addPayroll}
            </button>
          </div>

          <div style={s.card}>
            {allPayroll.length === 0 ? (
              <div style={s.empty}>{t.noPayroll}</div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>{t.employee}</th>
                    <th style={s.th}>{t.role}</th>
                    <th style={s.th}>{t.period}</th>
                    <th style={s.th}>{t.amountHTG}</th>
                    <th style={s.th}>{t.method}</th>
                    <th style={s.th}>{t.status}</th>
                    <th style={s.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {allPayroll.map(p => (
                    <tr key={`${p._type}-${p.id}`} onMouseEnter={ev => ev.currentTarget.style.background='#F7F9FB'} onMouseLeave={ev => ev.currentTarget.style.background=''}>
                      <td style={{...s.td, fontWeight: 600}}>{p.employee}</td>
                      <td style={s.td}><span style={s.badge(p._type === 'teacher' ? PALETTE.primary : PALETTE.accent)}>{p.role || (p._type === 'teacher' ? t.personType.teacher : t.personType.staff)}</span></td>
                      <td style={s.td}>{formatPeriod(p.month)}</td>
                      <td style={{...s.td, fontWeight: 600}}>{fmt(p.amountHTG)} HTG</td>
                      <td style={s.td}>{p.method || '—'}</td>
                      <td style={s.td}><span style={s.badge(PALETTE.success)}>{t.paid}</span></td>
                      <td style={s.td}>
                        <div style={s.actionBtns}>
                          <button style={s.btn('ghost', true)} onClick={() => setSlipTarget(p)} title={t.generateSlip}><Icon d={icons.print} size={13} /></button>
                          <button style={s.btn('ghost', true)} onClick={() => setPayrollForm(p)}><Icon d={icons.edit} size={13} /></button>
                          <button style={s.btn('danger', true)} onClick={() => p._type === 'teacher' ? deleteTeacherPayment(p.id) : deleteStaffPayment(p.id)}><Icon d={icons.trash} size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ── INCOME TAB ──────────────────────────────────────────────────────── */}
      {tab === 'income' && (
        <div>
          <div style={s.summaryGrid}>
            <div style={s.summaryCard(PALETTE.muted)}>
              <div style={s.summaryLabel}>{t.expectedIncome}</div>
              <div style={s.summaryValue(PALETTE.muted)}>{fmt(expectedIncome)}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
            <div style={s.summaryCard(PALETTE.success)}>
              <div style={s.summaryLabel}>{t.collectedIncome}</div>
              <div style={s.summaryValue(PALETTE.success)}>{fmt(payments.reduce((s, p) => s + Number(p.amount || 0), 0))}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
            <div style={s.summaryCard(PALETTE.danger)}>
              <div style={s.summaryLabel}>{t.pendingBalance}</div>
              <div style={s.summaryValue(PALETTE.danger)}>{fmt(Math.max(0, expectedIncome - payments.reduce((s, p) => s + Number(p.amount || 0), 0)))}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
          </div>

          <div style={s.card}>
            {payments.length === 0 ? (
              <div style={s.empty}>{t.noIncomeData}</div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>{language === 'fr' ? 'Élève' : 'Elèv'}</th>
                    <th style={s.th}>{language === 'fr' ? 'Date' : 'Dat'}</th>
                    <th style={s.th}>{language === 'fr' ? 'Montant' : 'Montan'}</th>
                    <th style={s.th}>{language === 'fr' ? 'Mode' : 'Metòd'}</th>
                    <th style={s.th}>{language === 'fr' ? 'Statut' : 'Eta'}</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.slice(0, 50).map(p => (
                    <tr key={p.id} onMouseEnter={ev => ev.currentTarget.style.background='#F7F9FB'} onMouseLeave={ev => ev.currentTarget.style.background=''}>
                      <td style={{...s.td, fontWeight: 600}}>{p.studentName || p.studentId || '—'}</td>
                      <td style={s.td}>{p.date || '—'}</td>
                      <td style={{...s.td, fontWeight: 600, color: PALETTE.success}}>{fmt(p.amount)} HTG</td>
                      <td style={s.td}>{p.method || '—'}</td>
                      <td style={s.td}><span style={s.badge(p.status === 'confirmed' ? PALETTE.success : PALETTE.warning)}>{p.status || 'pending'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ── REPORT TAB ──────────────────────────────────────────────────────── */}
      {tab === 'report' && (
        <div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <select style={s.select} value={reportMonth} onChange={e => setReportMonth(Number(e.target.value))}>
              {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
            </select>
            <select style={s.select} value={reportYear} onChange={e => setReportYear(Number(e.target.value))}>
              {[2024, 2025, 2026, 2027].map(y => <option key={y}>{y}</option>)}
            </select>
            <button style={s.btn()} onClick={handlePrint}>
              <Icon d={icons.print} size={14} />{t.printReport}
            </button>
          </div>

          <div style={s.summaryGrid}>
            <div style={s.summaryCard(PALETTE.success)}>
              <div style={s.summaryLabel}>{t.totalIncome}</div>
              <div style={s.summaryValue(PALETTE.success)}>{fmt(collectedIncome)}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
            <div style={s.summaryCard(PALETTE.danger)}>
              <div style={s.summaryLabel}>{t.totalExpense}</div>
              <div style={s.summaryValue(PALETTE.danger)}>{fmt(totalReportExpenses)}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
            <div style={s.summaryCard(PALETTE.primary)}>
              <div style={s.summaryLabel}>{t.totalPayrollLabel}</div>
              <div style={s.summaryValue(PALETTE.primary)}>{fmt(totalReportPayroll)}</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>HTG</div>
            </div>
            <div style={s.summaryCard(netBalance >= 0 ? PALETTE.success : PALETTE.danger)}>
              <div style={s.summaryLabel}>{t.netBalance}</div>
              <div style={s.summaryValue(netBalance >= 0 ? PALETTE.success : PALETTE.danger)}>
                {netBalance >= 0 ? '+' : '-'}{fmt(Math.abs(netBalance))}
              </div>
              <div style={{ fontSize: 11, color: netBalance >= 0 ? PALETTE.success : PALETTE.danger }}>
                HTG — {netBalance >= 0 ? t.surplus : t.deficit}
              </div>
            </div>
          </div>

          {catBreakdown.length > 0 && (
            <div style={{...s.card, marginTop: 16}}>
              <h3 style={{ margin: '0 0 16px', fontSize: 15, color: PALETTE.primary }}>{t.expenseByCategory}</h3>
              {catBreakdown.sort((a, b) => b.total - a.total).map(c => (
                <div key={c.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ minWidth: 200, fontSize: 12, color: PALETTE.text }}>{c.cat}</div>
                  <div style={s.progressBg}>
                    <div style={s.progressBar(Math.round(c.total / maxCat * 100), PALETTE.primary)} />
                  </div>
                  <div style={{ minWidth: 110, textAlign: 'right', fontSize: 12, fontWeight: 600, color: PALETTE.danger, marginLeft: 12 }}>
                    {fmt(c.total)} HTG
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{...s.card, marginTop: 16}}>
            <h3 style={{ margin: '0 0 14px', fontSize: 15, color: PALETTE.primary }}>P&amp;L — {months[reportMonth]} {reportYear}</h3>
            <table style={s.table}>
              <tbody>
                {[
                  [language === 'fr' ? '(+) Revenus collectés' : '(+) Revni kolekte', collectedIncome, PALETTE.success],
                  [language === 'fr' ? '(-) Dépenses opérationnelles' : '(-) Depans operasyonèl', totalReportExpenses, PALETTE.danger],
                  [language === 'fr' ? '(-) Paie du personnel' : '(-) Pèman pèsonèl', totalReportPayroll, PALETTE.danger],
                  [t.netBalance, netBalance, netBalance >= 0 ? PALETTE.success : PALETTE.danger],
                ].map(([label, val, color], i) => (
                  <tr key={i} style={{ fontWeight: i === 3 ? 700 : 400, borderTop: i === 3 ? `2px solid ${PALETTE.border}` : 'none' }}>
                    <td style={{...s.td, fontSize: i === 3 ? 14 : 13}}>{label}</td>
                    <td style={{...s.td, textAlign: 'right', color, fontWeight: 600, fontSize: i === 3 ? 15 : 13}}>
                      {i === 3 ? (netBalance >= 0 ? '+' : '') : (i > 0 ? '-' : '+')} {fmt(Math.abs(val))} HTG
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

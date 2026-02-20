import React, { useState, useMemo } from 'react';
import { DollarSign, Plus, Download, Trash2, Search, Filter, ChevronDown, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Receipt } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';

const PAYMENT_TYPE_LABELS = {
  scolarite: '📚 Scolarité',
  inscription: '📋 Inscription',
  deposit: '💰 Dépôt',
  examen: '📝 Examen',
  uniforme: '👔 Uniforme',
  transport: '🚐 Transport',
  cantine: '🍽️ Cantine',
  activite: '⚽ Activité',
  autre: '📋 Autre',
};

const EXPENSE_CATEGORIES = {
  staff: { label: 'Salaire personnel', icon: '👤' },
  coach: { label: 'Coach externe', icon: '🏅' },
  rent: { label: 'Loyer', icon: '🏠' },
  utilities: { label: 'Électricité / Eau', icon: '💡' },
  supplies: { label: 'Fournitures', icon: '📦' },
  maintenance: { label: 'Entretien', icon: '🔧' },
  transport: { label: 'Transport', icon: '🚐' },
  food: { label: 'Cantine', icon: '🍽️' },
  other: { label: 'Autre', icon: '📋' },
};

export default function Payments({ onOpenModal }) {
  const {
    students, teachers, payments, teacherPayments, expenses, school,
    deletePayment, deleteTeacherPayment, deleteExpense,
    getStudentBalance, getTeacherBalance,
    isAdultSchool,
  } = useSchool();

  const [view, setView] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const adult = isAdultSchool();
  const studentLabel = adult ? 'Étudiants' : 'Élèves';
  const teacherLabel = adult ? 'Professeurs' : 'Enseignants';

  // Normalize all into unified list
  const allEntries = useMemo(() => {
    const entries = [];
    payments.forEach(p => {
      const student = students.find(s => s.id === p.studentId);
      entries.push({ ...p, entryType: 'in', subType: 'student', personName: student ? `${student.firstName} ${student.lastName}` : 'Inconnu', label: PAYMENT_TYPE_LABELS[p.paymentType] || (p.isDeposit ? '💰 Dépôt' : '📚 Scolarité') });
    });
    teacherPayments.forEach(p => {
      const teacher = teachers.find(t => t.id === p.teacherId);
      entries.push({ ...p, entryType: 'out', subType: 'teacher', personName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Inconnu', label: 'Salaire enseignant' });
    });
    (expenses || []).forEach(p => {
      const cat = EXPENSE_CATEGORIES[p.category] || EXPENSE_CATEGORIES.other;
      entries.push({ ...p, entryType: 'out', subType: 'expense', personName: p.personName || cat.label, label: `${cat.icon} ${cat.label}` });
    });
    return entries.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [payments, teacherPayments, expenses, students, teachers]);

  // Filtered
  const filtered = useMemo(() => {
    let list = allEntries;
    if (view === 'students') list = list.filter(e => e.subType === 'student');
    if (view === 'teachers') list = list.filter(e => e.subType === 'teacher');
    if (view === 'expenses') list = list.filter(e => e.subType === 'expense');
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(e => e.personName.toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q) || (e.label || '').toLowerCase().includes(q));
    }
    if (filterMethod) list = list.filter(e => e.method === filterMethod);
    if (filterMonth) list = list.filter(e => (e.date || '').startsWith(filterMonth));
    return list;
  }, [allEntries, view, searchTerm, filterMethod, filterMonth]);

  const entrees = filtered.filter(e => e.entryType === 'in');
  const sorties = filtered.filter(e => e.entryType === 'out');

  const totalIn = entrees.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const totalOut = sorties.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const net = totalIn - totalOut;
  const totalStudentDue = students.reduce((sum, s) => sum + Math.max(0, getStudentBalance(s.id)), 0);
  const totalTeacherDue = teachers.reduce((sum, t) => sum + Math.max(0, getTeacherBalance(t.id)), 0);

  const uniqueMethods = [...new Set(allEntries.map(e => e.method).filter(Boolean))].sort();
  const uniqueMonths = [...new Set(allEntries.map(e => (e.date || '').slice(0, 7)).filter(Boolean))].sort().reverse();

  const generateReceipt = (entry) => {
    const isOut = entry.entryType === 'out';
    const title = entry.isDeposit ? 'Reçu de Dépôt' : entry.subType === 'teacher' ? 'Reçu de Salaire' : entry.subType === 'expense' ? 'Reçu de Dépense' : `Reçu de Paiement${entry.paymentType ? ' — ' + (PAYMENT_TYPE_LABELS[entry.paymentType] || '').replace(/[^\w\sÀ-ÿ]/g, '').trim() : ''}`;
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Reçu</title></head><body style="font-family:sans-serif;padding:20px;max-width:400px;margin:0 auto;">
      <h1 style="color:#1e3a5f;font-size:1.5em;text-align:center;">${school?.name || 'SOCRATES'}</h1>
      <h3 style="text-align:center;">${title}</h3>
      <p style="text-align:center;color:#666;">Reçu #${entry.id.slice(0, 8).toUpperCase()}</p><hr/>
      <p><strong>Date:</strong> ${entry.date ? new Date(entry.date).toLocaleDateString() : 'N/A'}</p>
      <p><strong>${isOut ? 'Bénéficiaire' : (adult ? 'Étudiant' : 'Élève')}:</strong> ${entry.personName}</p>
      ${entry.personRole ? `<p><strong>Fonction:</strong> ${entry.personRole}</p>` : ''}
      <p><strong>Méthode:</strong> ${entry.method || 'Espèces'}</p>
      ${entry.month ? `<p><strong>Mois:</strong> ${entry.month}</p>` : ''}
      ${entry.category ? `<p><strong>Catégorie:</strong> ${EXPENSE_CATEGORIES[entry.category]?.label || entry.category}</p>` : ''}
      ${entry.description ? `<p><strong>Description:</strong> ${entry.description}</p>` : ''}
      <div style="background:#f0f0f0;padding:20px;text-align:center;margin:20px 0;border-radius:8px;">
        <p style="margin:0;">${isOut ? 'Montant Versé' : 'Montant Reçu'}</p>
        <h1 style="color:${isOut ? '#dc2626' : '#16a34a'};margin:10px 0;">HTG ${parseFloat(entry.amount).toLocaleString()}</h1>
      </div>
      <p style="text-align:center;color:${isOut ? '#dc2626' : '#16a34a'};font-weight:bold;font-size:1.2em;">${isOut ? 'VERSÉ' : 'PAYÉ'}</p>
      <button onclick="window.print()" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;">Imprimer</button>
    </body></html>`);
    w.document.close();
  };

  const handleDelete = (entry) => {
    if (entry.subType === 'student') deletePayment(entry.id);
    else if (entry.subType === 'teacher') deleteTeacherPayment(entry.id);
    else if (entry.subType === 'expense') deleteExpense(entry.id);
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    try { return new Date(d).toLocaleDateString('fr-HT', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return d; }
  };

  const PaymentRow = ({ entry }) => {
    const isOut = entry.entryType === 'out';
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isOut ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {isOut ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-semibold ${isOut ? 'text-red-600' : 'text-green-600'}`}>
              {isOut ? '-' : '+'}HTG {parseFloat(entry.amount).toLocaleString()}
            </p>
            {entry.isDeposit && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Dépôt</span>}
            {entry.month && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{entry.month}</span>}
            {entry.subType === 'student' && entry.paymentType && entry.paymentType !== 'scolarite' && !entry.isDeposit && (
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{PAYMENT_TYPE_LABELS[entry.paymentType] || entry.paymentType}</span>
            )}
            {entry.subType === 'expense' && entry.category && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{EXPENSE_CATEGORIES[entry.category]?.icon} {EXPENSE_CATEGORIES[entry.category]?.label}</span>
            )}
            {entry.subType === 'teacher' && <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">Salaire</span>}
          </div>
          <p className="text-sm text-gray-700 truncate">{entry.personName}{entry.personRole ? ` — ${entry.personRole}` : ''}</p>
          <div className="flex gap-2 text-xs text-gray-400">
            <span>{formatDate(entry.date)}</span>
            {entry.method && <span>• {entry.method}</span>}
            {entry.description && <span>• {entry.description}</span>}
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={() => generateReceipt(entry)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700"><Download size={16} /></button>
          <button onClick={() => handleDelete(entry)} className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1"><TrendingUp size={16} className="text-green-500" /></div>
          <p className="text-xl font-bold text-green-600">HTG {totalIn.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Entrées</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1"><TrendingDown size={16} className="text-red-500" /></div>
          <p className="text-xl font-bold text-red-500">HTG {totalOut.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Sorties</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className={`text-xl font-bold ${net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>HTG {net.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Solde net</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-lg font-bold text-orange-500">HTG {totalStudentDue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Dû {studentLabel.toLowerCase()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-lg font-bold text-orange-500">HTG {totalTeacherDue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Dû {teacherLabel.toLowerCase()}</p>
        </div>
      </div>

      {/* View toggle + actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1 items-center flex-wrap">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {[
              { id: 'all', label: 'Tous' },
              { id: 'students', label: studentLabel },
              { id: 'teachers', label: teacherLabel },
              { id: 'expenses', label: 'Dépenses' },
            ].map(v => (
              <button key={v.id} onClick={() => setView(v.id)} className={`px-3 py-2 rounded-lg text-xs font-medium transition ${view === v.id ? 'bg-white shadow text-socrates-navy' : 'text-gray-500'}`}>{v.label}</button>
            ))}
          </div>
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2.5 border rounded-xl w-full text-sm" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-3 py-2.5 border rounded-xl flex items-center gap-1 ${showFilters ? 'bg-socrates-blue text-white' : ''}`}><Filter size={16} /><ChevronDown size={12} /></button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onOpenModal('expense')} className="flex-1 sm:flex-none bg-orange-500 text-white px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 text-sm"><Receipt size={16} />Dépense</button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow p-3">
          <select value={filterMethod} onChange={e => setFilterMethod(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">Toutes méthodes</option>
            {uniqueMethods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">Tous les mois</option>
            {uniqueMonths.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          {(filterMethod || filterMonth) && (
            <button onClick={() => { setFilterMethod(''); setFilterMonth(''); }} className="text-red-500 text-sm font-medium px-3">Effacer</button>
          )}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* ── Content ── */}
      {view === 'all' ? (
        <div className="space-y-6">
          {/* Entrées */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><ArrowUpRight size={18} className="text-green-600" /></div>
              <h3 className="font-semibold text-gray-800">Entrées <span className="text-sm font-normal text-gray-400">({entrees.length})</span></h3>
              <span className="ml-auto text-sm font-bold text-green-600">HTG {totalIn.toLocaleString()}</span>
            </div>
            {entrees.length > 0 ? (
              <div className="space-y-2">{entrees.map(e => <PaymentRow key={`in-${e.id}`} entry={e} />)}</div>
            ) : (
              <div className="text-center py-6 text-gray-400 text-sm bg-white rounded-xl shadow">Aucune entrée{filterMethod || filterMonth || searchTerm ? ' pour ces filtres' : ''}</div>
            )}
          </div>

          {/* Sorties */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><ArrowDownRight size={18} className="text-red-600" /></div>
              <h3 className="font-semibold text-gray-800">Sorties <span className="text-sm font-normal text-gray-400">({sorties.length})</span></h3>
              <span className="ml-auto text-sm font-bold text-red-500">HTG {totalOut.toLocaleString()}</span>
            </div>
            {sorties.length > 0 ? (
              <div className="space-y-2">{sorties.map(e => <PaymentRow key={`out-${e.id}`} entry={e} />)}</div>
            ) : (
              <div className="text-center py-6 text-gray-400 text-sm bg-white rounded-xl shadow">Aucune sortie{filterMethod || filterMonth || searchTerm ? ' pour ces filtres' : ''}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.length > 0 ? filtered.map(e => (
            <PaymentRow key={`${e.subType}-${e.id}`} entry={e} />
          )) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
              <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
              <p>Aucune transaction{filterMethod || filterMonth || searchTerm ? ' pour ces filtres' : ''}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

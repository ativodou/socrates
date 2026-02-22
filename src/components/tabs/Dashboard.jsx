import React, { useMemo, useState } from 'react';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, TrendingDown, AlertTriangle, Flag, ArrowUpRight, ArrowDownRight, Plus, ChevronRight, Clock, Percent, Wallet, PiggyBank, RefreshCw } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';

const FLAG_LABELS = {
  financial: { label: 'Financier', icon: '💰', color: 'text-red-600' },
  disciplinary: { label: 'Disciplinaire', icon: '⚠️', color: 'text-orange-600' },
  attendance: { label: 'Assiduité', icon: '📅', color: 'text-yellow-600' },
  academic: { label: 'Académique', icon: '📚', color: 'text-purple-600' },
  medical: { label: 'Médical', icon: '🏥', color: 'text-blue-600' },
  other: { label: 'Autre', icon: '🚩', color: 'text-gray-600' },
};

export default function Dashboard({ onOpenModal }) {
  const {
    school, students, teachers, classes, payments, teacherPayments, expenses,
    getStudentBalance, getTeacherBalance,
    isAdultSchool, isPrescolaireOnly,
    setActiveTab, autoFlagOverdue,
  } = useSchool();

  const [flagMessage, setFlagMessage] = useState(null);

  const adult = isAdultSchool();
  const prescoOnly = isPrescolaireOnly();
  const studentLabel = adult ? 'Étudiants' : 'Élèves';
  const teacherLabel = adult ? 'Professeurs' : 'Enseignants';
  const classLabel = prescoOnly ? 'Sections' : 'Classes';

  // ── Financial calculations ──
  const finance = useMemo(() => {
    const totalIn = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const totalTeacherPaid = teacherPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const totalExpenses = (expenses || []).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const totalOut = totalTeacherPaid + totalExpenses;
    const net = totalIn - totalOut;

    const expectedRevenue = students.reduce((sum, s) => sum + (parseFloat(s.annualTuition) || 0) + (parseFloat(s.fraisDivers) || 0), 0);
    const collectionRate = expectedRevenue > 0 ? Math.round((totalIn / expectedRevenue) * 100) : 0;

    const totalStudentDue = students.reduce((sum, s) => sum + Math.max(0, getStudentBalance(s.id)), 0);
    const totalTeacherDue = teachers.reduce((sum, t) => sum + Math.max(0, getTeacherBalance(t.id)), 0);
    const totalAnnualSalary = teachers.reduce((sum, t) => sum + (parseFloat(t.annualSalary) || 0), 0);

    return { totalIn, totalOut, totalTeacherPaid, totalExpenses, net, expectedRevenue, collectionRate, totalStudentDue, totalTeacherDue, totalAnnualSalary };
  }, [payments, teacherPayments, expenses, students, teachers, getStudentBalance, getTeacherBalance]);

  // ── People stats ──
  const maleStudents = students.filter(s => s.gender === 'M').length;
  const femaleStudents = students.filter(s => s.gender === 'F').length;
  const unpaidStudents = students.filter(s => getStudentBalance(s.id) > 0).length;
  const noDeposit = students.filter(s => !s.depositPaid).length;
  const flaggedStudents = students.filter(s => s.flag);
  const unpaidTeachers = teachers.filter(t => getTeacherBalance(t.id) > 0).length;
  const coaches = teachers.filter(t => t.isCoach);

  // ── Recent transactions (last 5) ──
  const recentActivity = useMemo(() => {
    const all = [];
    payments.slice(0, 10).forEach(p => {
      const s = students.find(st => st.id === p.studentId);
      all.push({ type: 'in', amount: parseFloat(p.amount) || 0, name: s ? `${s.firstName} ${s.lastName}` : '?', date: p.date, label: p.paymentType === 'scolarite' ? (p.month ? `Scolarité ${p.month}` : 'Scolarité') : p.paymentType === 'inscription' ? 'Inscription' : p.paymentType === 'deposit' ? 'Dépôt' : p.isDeposit ? 'Dépôt' : (p.paymentType || 'Scolarité') });
    });
    teacherPayments.slice(0, 10).forEach(p => {
      const t = teachers.find(tc => tc.id === p.teacherId);
      all.push({ type: 'out', amount: parseFloat(p.amount) || 0, name: t ? `${t.firstName} ${t.lastName}` : '?', date: p.date, label: 'Salaire' });
    });
    (expenses || []).slice(0, 10).forEach(p => {
      all.push({ type: 'out', amount: parseFloat(p.amount) || 0, name: p.personName || p.category, date: p.date, label: 'Dépense' });
    });
    return all.sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);
  }, [payments, teacherPayments, expenses, students, teachers]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const formatDate = (d) => {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('fr-HT', { day: 'numeric', month: 'short' }); }
    catch { return d; }
  };

  return (
    <div className="space-y-5">

      {/* ── Greeting ── */}
      <div className="bg-gradient-to-r from-socrates-navy to-socrates-blue rounded-2xl p-5 sm:p-6 text-white">
        <p className="text-blue-200 text-sm">{greeting()}</p>
        <h2 className="text-xl sm:text-2xl font-bold mt-1">{school?.name || 'SOCRATES'}</h2>
        <p className="text-blue-200 text-sm mt-1">
          {school?.schoolType || ''}
          {school?.methodePedagogique ? ` • ${school.methodePedagogique}` : ''}
          {school?.city ? ` • ${school.city}` : ''}
        </p>
        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="bg-white/10 rounded-xl px-4 py-2 text-center min-w-[80px]">
            <p className="text-2xl font-bold">{students.length}</p>
            <p className="text-xs text-blue-200">{studentLabel}</p>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-2 text-center min-w-[80px]">
            <p className="text-2xl font-bold">{teachers.length}</p>
            <p className="text-xs text-blue-200">{teacherLabel}</p>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-2 text-center min-w-[80px]">
            <p className="text-2xl font-bold">{classes.length}</p>
            <p className="text-xs text-blue-200">{classLabel}</p>
          </div>
          {coaches.length > 0 && (
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center min-w-[80px]">
              <p className="text-2xl font-bold">{coaches.length}</p>
              <p className="text-xs text-blue-200">Coaches</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Financial Overview ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2 mb-1"><TrendingUp size={16} className="text-green-500" /><span className="text-xs text-gray-500">Entrées</span></div>
          <p className="text-xl font-bold text-green-600">HTG {finance.totalIn.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-400">
          <div className="flex items-center gap-2 mb-1"><TrendingDown size={16} className="text-red-400" /><span className="text-xs text-gray-500">Sorties</span></div>
          <p className="text-xl font-bold text-red-500">HTG {finance.totalOut.toLocaleString()}</p>
        </div>
        <div className={`bg-white rounded-xl shadow-lg p-4 border-l-4 ${finance.net >= 0 ? 'border-emerald-500' : 'border-red-600'}`}>
          <div className="flex items-center gap-2 mb-1"><Wallet size={16} className={finance.net >= 0 ? 'text-emerald-500' : 'text-red-600'} /><span className="text-xs text-gray-500">Solde net</span></div>
          <p className={`text-xl font-bold ${finance.net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>HTG {finance.net.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-400">
          <div className="flex items-center gap-2 mb-1"><Percent size={16} className="text-blue-400" /><span className="text-xs text-gray-500">Taux collecte</span></div>
          <p className="text-xl font-bold text-blue-600">{finance.collectionRate}%</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className={`h-1.5 rounded-full ${finance.collectionRate >= 75 ? 'bg-green-500' : finance.collectionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.min(finance.collectionRate, 100)}%` }} /></div>
        </div>
      </div>

      {/* ── Alerts Row ── */}
      {(unpaidStudents > 0 || unpaidTeachers > 0 || noDeposit > 0 || flaggedStudents.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {unpaidStudents > 0 && (
            <button onClick={() => setActiveTab('students')} className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-100 transition">
              <AlertTriangle size={16} />{unpaidStudents} {adult ? 'étudiant' : 'élève'}{unpaidStudents > 1 ? 's' : ''} impayé{unpaidStudents > 1 ? 's' : ''}
              <ChevronRight size={14} />
            </button>
          )}
          {noDeposit > 0 && (
            <button onClick={() => setActiveTab('students')} className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-yellow-100 transition">
              <DollarSign size={16} />{noDeposit} sans dépôt
              <ChevronRight size={14} />
            </button>
          )}
          {unpaidTeachers > 0 && (
            <button onClick={() => setActiveTab('teachers')} className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-100 transition">
              <AlertTriangle size={16} />{unpaidTeachers} {adult ? 'prof' : 'enseignant'}{unpaidTeachers > 1 ? 's' : ''} à payer
              <ChevronRight size={14} />
            </button>
          )}
          {flaggedStudents.length > 0 && (
            <button onClick={() => setActiveTab('students')} className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-100 transition">
              <Flag size={16} />{flaggedStudents.length} signalé{flaggedStudents.length > 1 ? 's' : ''}
              <ChevronRight size={14} />
            </button>
          )}
          {unpaidStudents > 0 && (
            <button onClick={async () => {
              const count = await autoFlagOverdue();
              setFlagMessage(count > 0 ? `${count} ${adult ? 'étudiant' : 'élève'}${count > 1 ? 's' : ''} signalé${count > 1 ? 's' : ''} automatiquement` : 'Aucun nouveau signalement');
              setTimeout(() => setFlagMessage(null), 4000);
            }} className="flex items-center gap-2 bg-socrates-navy text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-900 transition">
              <RefreshCw size={16} />Signaler impayés
            </button>
          )}
        </div>
      )}
      {flagMessage && (
        <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium animate-pulse">{flagMessage}</div>
      )}

      {/* ── Middle row: Receivables + Payables + Recent Activity ── */}
      <div className="grid sm:grid-cols-3 gap-4">

        {/* Receivables */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3"><PiggyBank size={18} className="text-green-500" /> À recevoir</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Attendu</span><span className="font-bold text-gray-700">HTG {finance.expectedRevenue.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Reçu</span><span className="font-bold text-green-600">HTG {finance.totalIn.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm border-t mt-2 pt-2"><span className="text-gray-500 font-medium">Restant dû</span><span className="font-bold text-red-500">HTG {finance.totalStudentDue.toLocaleString()}</span></div>
            </div>
          </div>
          <button onClick={() => setActiveTab('students')} className="w-full mt-3 text-socrates-blue text-sm font-medium flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-blue-50 transition">
            Voir {studentLabel.toLowerCase()} <ChevronRight size={14} />
          </button>
        </div>

        {/* Payables */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3"><Wallet size={18} className="text-red-400" /> À payer</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Salaires annuels</span><span className="font-bold text-gray-700">HTG {finance.totalAnnualSalary.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Salaires versés</span><span className="font-bold text-green-600">HTG {finance.totalTeacherPaid.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Dépenses</span><span className="font-bold text-orange-500">HTG {finance.totalExpenses.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm border-t mt-2 pt-2"><span className="text-gray-500 font-medium">Salaires dus</span><span className="font-bold text-red-500">HTG {finance.totalTeacherDue.toLocaleString()}</span></div>
            </div>
          </div>
          <button onClick={() => setActiveTab('teachers')} className="w-full mt-3 text-socrates-blue text-sm font-medium flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-blue-50 transition">
            Voir {teacherLabel.toLowerCase()} <ChevronRight size={14} />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3"><Clock size={18} className="text-gray-400" /> Activité récente</h3>
          {recentActivity.length > 0 ? (
            <div className="space-y-2">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${a.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                    {a.type === 'in' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 truncate text-xs">{a.name}</p>
                    <p className="text-gray-400 text-xs">{a.label} • {formatDate(a.date)}</p>
                  </div>
                  <span className={`font-semibold text-xs ${a.type === 'in' ? 'text-green-600' : 'text-red-500'}`}>
                    {a.type === 'in' ? '+' : '-'}{a.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">Aucune transaction</p>
          )}
          <button onClick={() => setActiveTab('payments')} className="w-full mt-3 text-socrates-blue text-sm font-medium flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-blue-50 transition">
            Voir tout <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Flagged Students ── */}
      {flaggedStudents.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3"><Flag size={18} className="text-orange-500" /> {studentLabel} signalés ({flaggedStudents.length})</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {flaggedStudents.slice(0, 6).map(s => {
              const fi = FLAG_LABELS[s.flag] || FLAG_LABELS.other;
              return (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onClick={() => setActiveTab('students')}>
                  {s.photo ? <img src={s.photo} alt="" className="w-9 h-9 rounded-full object-cover" /> : (
                    <div className={`w-9 h-9 rounded-full ${s.gender === 'F' ? 'bg-pink-500' : 'bg-socrates-blue'} text-white flex items-center justify-center text-xs font-bold`}>{s.firstName?.[0]}{s.lastName?.[0]}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{s.firstName} {s.lastName}</p>
                    <p className={`text-xs ${fi.color}`}>{fi.icon} {fi.label}{s.flagNote ? ` — ${s.flagNote}` : ''}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {flaggedStudents.length > 6 && (
            <button onClick={() => setActiveTab('students')} className="w-full mt-3 text-orange-600 text-sm font-medium flex items-center justify-center gap-1 py-2">
              Voir les {flaggedStudents.length - 6} autres <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}

      {/* ── Demographics ── */}
      {students.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Répartition {studentLabel.toLowerCase()}</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
                {maleStudents > 0 && <div className="bg-blue-500 transition-all" style={{ width: `${(maleStudents / students.length) * 100}%` }} />}
                {femaleStudents > 0 && <div className="bg-pink-500 transition-all" style={{ width: `${(femaleStudents / students.length) * 100}%` }} />}
                {(students.length - maleStudents - femaleStudents) > 0 && <div className="bg-gray-400 transition-all" style={{ width: `${((students.length - maleStudents - femaleStudents) / students.length) * 100}%` }} />}
              </div>
            </div>
            <div className="flex gap-4 text-sm flex-shrink-0">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" />{maleStudents} M</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-pink-500" />{femaleStudents} F</span>
              {(students.length - maleStudents - femaleStudents) > 0 && (
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-400" />{students.length - maleStudents - femaleStudents} N/D</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button onClick={() => { setActiveTab('students'); onOpenModal('student'); }} className="bg-socrates-blue text-white p-4 rounded-xl font-medium flex flex-col items-center gap-2 hover:bg-blue-700 transition">
          <Users size={22} /><span className="text-sm">+ {adult ? 'Étudiant' : 'Élève'}</span>
        </button>
        <button onClick={() => { setActiveTab('teachers'); onOpenModal('teacher'); }} className="bg-green-600 text-white p-4 rounded-xl font-medium flex flex-col items-center gap-2 hover:bg-green-700 transition">
          <GraduationCap size={22} /><span className="text-sm">+ {adult ? 'Professeur' : 'Enseignant'}</span>
        </button>
        <button onClick={() => { setActiveTab('classes'); onOpenModal('class'); }} className="bg-purple-600 text-white p-4 rounded-xl font-medium flex flex-col items-center gap-2 hover:bg-purple-700 transition">
          <BookOpen size={22} /><span className="text-sm">+ {classLabel.slice(0, -1)}</span>
        </button>
        <button onClick={() => { setActiveTab('payments'); onOpenModal('expense'); }} className="bg-orange-500 text-white p-4 rounded-xl font-medium flex flex-col items-center gap-2 hover:bg-orange-600 transition">
          <DollarSign size={22} /><span className="text-sm">+ Dépense</span>
        </button>
      </div>

    </div>
  );
}

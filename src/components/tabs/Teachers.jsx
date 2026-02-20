import React, { useState } from 'react';
import { GraduationCap, Search, Plus, Edit, Trash2, FileText, DollarSign, Filter, ChevronDown } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';

export default function Teachers({ onOpenModal }) {
  const { teachers, school, classes, deleteTeacher, getTeacherBalance, getMonthlySalary, isAdultSchool } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const adult = isAdultSchool();

  let filtered = teachers.filter(t => (t.firstName + ' ' + t.lastName + ' ' + (t.subject || '')).toLowerCase().includes(searchTerm.toLowerCase()));
  if (filterSubject) filtered = filtered.filter(t => t.subject === filterSubject);
  if (filterStatus === 'paid') filtered = filtered.filter(t => getTeacherBalance(t.id) <= 0);
  if (filterStatus === 'unpaid') filtered = filtered.filter(t => getTeacherBalance(t.id) > 0);

  const totalTeachers = teachers.length;
  const totalPayroll = teachers.reduce((sum, t) => sum + (parseFloat(t.annualSalary) || 0), 0);
  const unpaidCount = teachers.filter(t => getTeacherBalance(t.id) > 0).length;
  const totalOwed = teachers.reduce((sum, t) => { const b = getTeacherBalance(t.id); return sum + (b > 0 ? b : 0); }, 0);
  const uniqueSubjects = [...new Set(teachers.map(t => t.subject).filter(Boolean))].sort();

  const getTeacherClasses = (teacherId) => classes.filter(c => c.teacherId === teacherId);

  const generateContract = (teacher) => {
    const annual = parseFloat(teacher.annualSalary) || 0;
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Contrat Enseignant</title></head><body style="font-family:sans-serif;padding:20px;max-width:600px;margin:0 auto;"><h1 style="color:#1e3a5f;text-align:center;">${school?.name || 'SOCRATES'}</h1><h2 style="text-align:center;">Contrat Enseignant</h2><p style="text-align:center;color:#666;">Année Scolaire ${new Date().getFullYear()}-${new Date().getFullYear() + 1}</p><hr/><h3>Informations</h3><p><strong>Nom:</strong> ${teacher.firstName} ${teacher.lastName}</p><p><strong>Matière:</strong> ${teacher.subject || 'N/A'}</p>${teacher.qualification ? `<p><strong>Qualification:</strong> ${teacher.qualification}</p>` : ''}${teacher.nif ? `<p><strong>NIF:</strong> ${teacher.nif}</p>` : ''}${teacher.hireDate ? `<p><strong>Date d'embauche:</strong> ${teacher.hireDate}</p>` : ''}<h3>Conditions Financières</h3><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:10px;border:1px solid #ddd;"><strong>Salaire Annuel</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${annual.toLocaleString()}</td></tr><tr><td style="padding:10px;border:1px solid #ddd;">Mensuel (10 mois)</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${(annual / 10).toLocaleString()}</td></tr></table><h3>Signatures</h3><div style="display:flex;justify-content:space-between;margin-top:40px;"><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">Directeur/Directrice</div><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">Enseignant(e)</div></div><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;width:100%;">Imprimer</button></body></html>`);
    w.document.close();
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{totalTeachers}</p>
          <p className="text-xs text-gray-500">{adult ? 'Professeurs' : 'Enseignants'}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-lg font-bold text-gray-700">HTG {(totalPayroll / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-500">Masse salariale</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{unpaidCount}</p>
          <p className="text-xs text-gray-500">En attente</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-lg font-bold text-orange-500">HTG {totalOwed.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total dû</p>
        </div>
      </div>

      {/* Search & actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full text-base" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-3 py-3 border rounded-xl flex items-center gap-1 ${showFilters ? 'bg-green-600 text-white' : ''}`}><Filter size={18} /><ChevronDown size={14} /></button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onOpenModal('teacherPayment')} className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><DollarSign size={18} />Payer</button>
          <button onClick={() => onOpenModal('teacher')} className="flex-1 sm:flex-none bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18} />Ajouter</button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow p-3">
          <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">Toutes matières</option>
            {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">Tous statuts</option>
            <option value="paid">Payé</option>
            <option value="unpaid">En attente</option>
          </select>
          {(filterSubject || filterStatus) && <button onClick={() => { setFilterSubject(''); setFilterStatus(''); }} className="text-red-500 text-sm font-medium px-3">Effacer</button>}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Teacher list */}
      <div className="space-y-3">
        {filtered.map(teacher => {
          const balance = getTeacherBalance(teacher.id);
          const expanded = expandedId === teacher.id;
          const tClasses = getTeacherClasses(teacher.id);
          return (
            <div key={teacher.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2 cursor-pointer" onClick={() => setExpandedId(expanded ? null : teacher.id)}>
                  {teacher.photo ? (
                    <img src={teacher.photo} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      {teacher.firstName?.[0]}{teacher.lastName?.[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{teacher.firstName} {teacher.lastName}</p>
                    <p className="text-sm text-gray-500 truncate">{teacher.subject || 'N/A'}{teacher.qualification && ` • ${teacher.qualification}`}</p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs text-gray-400">HTG {getMonthlySalary(teacher)}/mois</span>
                      {tClasses.length > 0 && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{tClasses.length} classe{tClasses.length > 1 ? 's' : ''}</span>}
                      {teacher.isCoach && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">🏅 Coach{teacher.coachActivity ? `: ${teacher.coachActivity}` : ''}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-gray-500">Annuel: {(parseFloat(teacher.annualSalary) || 0).toLocaleString()}</p>
                    <p className={`font-bold ${balance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {balance > 0 ? `Dû: ${balance.toLocaleString()}` : '✓ Payé'}
                    </p>
                  </div>
                </div>

                {expanded && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      {teacher.email && <p className="text-gray-600"><span className="text-gray-400">Email:</span> {teacher.email}</p>}
                      {teacher.phone && <p className="text-gray-600"><span className="text-gray-400">Tél:</span> {teacher.phone}</p>}
                      {teacher.nif && <p className="text-gray-600"><span className="text-gray-400">NIF:</span> {teacher.nif}</p>}
                      {teacher.hireDate && <p className="text-gray-600"><span className="text-gray-400">Embauché:</span> {teacher.hireDate}</p>}
                      {teacher.address && <p className="text-gray-600 col-span-2"><span className="text-gray-400">Adresse:</span> {teacher.address}</p>}
                      {teacher.isCoach && <p className="text-gray-600 col-span-2"><span className="text-gray-400">🏅 Coach:</span> {teacher.coachActivity || 'Oui'}</p>}
                    </div>
                    {tClasses.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        <span className="text-xs text-gray-500 mr-1">Classes:</span>
                        {tClasses.map(c => <span key={c.id} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{c.name}</span>)}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2 flex-wrap mt-3">
                  <button onClick={() => generateContract(teacher)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16} />Contrat</button>
                  <button onClick={() => { onOpenModal('teacherPayment', null, { teacherId: teacher.id, amount: getMonthlySalary(teacher) }); }} className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><DollarSign size={16} />Payer</button>
                  <button onClick={() => onOpenModal('teacher', teacher)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Edit size={16} /></button>
                  <button onClick={() => deleteTeacher(teacher.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
            <GraduationCap size={48} className="mx-auto mb-4 opacity-50" />
            <p>{searchTerm || filterSubject || filterStatus ? 'Aucun résultat' : `Aucun ${adult ? 'professeur' : 'enseignant'}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, FileText, Download, CheckCircle, XCircle, Filter, ChevronDown, DollarSign, Flag, AlertTriangle, X } from 'lucide-react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSchool } from '../../contexts/SchoolContext';

const FLAG_TYPES = [
  { value: 'financial', label: 'Financier', color: 'bg-red-100 text-red-700', icon: '💰' },
  { value: 'disciplinary', label: 'Disciplinaire', color: 'bg-orange-100 text-orange-700', icon: '⚠️' },
  { value: 'attendance', label: 'Assiduité', color: 'bg-yellow-100 text-yellow-700', icon: '📅' },
  { value: 'academic', label: 'Académique', color: 'bg-purple-100 text-purple-700', icon: '📚' },
  { value: 'medical', label: 'Médical', color: 'bg-blue-100 text-blue-700', icon: '🏥' },
  { value: 'other', label: 'Autre', color: 'bg-gray-100 text-gray-700', icon: '🚩' },
];

export default function Students({ onOpenModal }) {
  const { students, school, classes, deleteStudent, getStudentBalance, getMonthlyTuition, loadAllData, isAdultSchool } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [flaggingId, setFlaggingId] = useState(null);

  const adult = isAdultSchool();

  // Filters
  let filtered = students.filter(s => (s.firstName + ' ' + s.lastName).toLowerCase().includes(searchTerm.toLowerCase()));
  if (filterLevel) filtered = filtered.filter(s => s.gradeLevel === filterLevel);
  if (filterStatus === 'paid') filtered = filtered.filter(s => getStudentBalance(s.id) <= 0);
  if (filterStatus === 'unpaid') filtered = filtered.filter(s => getStudentBalance(s.id) > 0);
  if (filterStatus === 'noDeposit') filtered = filtered.filter(s => !s.depositPaid);
  if (filterStatus === 'flagged') filtered = filtered.filter(s => s.flag);

  // Stats
  const totalStudents = students.length;
  const maleCount = students.filter(s => s.gender === 'M').length;
  const femaleCount = students.filter(s => s.gender === 'F').length;
  const unpaidCount = students.filter(s => getStudentBalance(s.id) > 0).length;
  const flaggedCount = students.filter(s => s.flag).length;
  const totalRevenue = students.reduce((sum, s) => sum + (parseFloat(s.annualTuition) || 0) + (parseFloat(s.fraisDivers) || 0), 0);
  const uniqueLevels = [...new Set(students.map(s => s.gradeLevel).filter(Boolean))].sort();

  const generateContract = (person) => {
    const scolarite = parseFloat(person.annualTuition) || 0;
    const fraisDivers = parseFloat(person.fraisDivers) || 0;
    const annual = scolarite + fraisDivers;
    const monthly = (scolarite / 10).toFixed(2);
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Contrat</title></head><body style="font-family:sans-serif;padding:20px;max-width:600px;margin:0 auto;"><h1 style="color:#1e3a5f;text-align:center;">${school?.name || 'SOCRATES'}</h1><h2 style="text-align:center;">Contrat ${adult ? 'Étudiant' : 'Élève'}</h2><p style="text-align:center;color:#666;">Année Scolaire ${new Date().getFullYear()}-${new Date().getFullYear() + 1}</p><hr/><h3>Informations</h3><p><strong>Nom:</strong> ${person.firstName} ${person.lastName}</p><p><strong>Niveau:</strong> ${person.gradeLevel || 'N/A'}</p>${person.dateOfBirth ? `<p><strong>Date de naissance:</strong> ${person.dateOfBirth}</p>` : ''}${person.fatherName ? `<p><strong>Père:</strong> ${person.fatherName}</p>` : ''}${person.motherName ? `<p><strong>Mère:</strong> ${person.motherName}</p>` : ''}<p><strong>Téléphone:</strong> ${person.parentPhone || 'N/A'}</p><h3>Conditions Financières</h3><table style="width:100%;border-collapse:collapse;margin:20px 0;"><tr><td style="padding:10px;border:1px solid #ddd;">Scolarité (10 mois)</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${scolarite.toLocaleString()}</td></tr><tr><td style="padding:10px;border:1px solid #ddd;"><em>Paiement mensuel</em></td><td style="padding:10px;border:1px solid #ddd;text-align:right;"><em>HTG ${monthly}</em></td></tr><tr><td style="padding:10px;border:1px solid #ddd;">Frais d'inscription</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${fraisDivers.toLocaleString()}</td></tr><tr style="background:#f8f8f8;"><td style="padding:10px;border:1px solid #ddd;"><strong>Total Annuel</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${annual.toLocaleString()}</td></tr></table><h3>Signatures</h3><div style="display:flex;justify-content:space-between;margin-top:40px;"><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">Directeur/Directrice</div><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">${adult ? 'Étudiant(e)' : 'Parent/Tuteur'}</div></div><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;">Imprimer</button></body></html>`);
    w.document.close();
  };

  const generateReportCard = (student) => {
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>Bulletin</title></head><body style="font-family:sans-serif;padding:20px;"><h1>${school?.name || 'SOCRATES'}</h1><h2>Bulletin Scolaire</h2><p><strong>${adult ? 'Étudiant' : 'Élève'}:</strong> ${student.firstName} ${student.lastName}</p><p><strong>Niveau:</strong> ${student.gradeLevel || 'N/A'}</p><p style="color:#999;">Les notes détaillées sont disponibles dans l'onglet Notes.</p><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;width:100%;">Imprimer</button></body></html>`);
    w.document.close();
  };

  const toggleParentAccess = async (student) => {
    await updateDoc(doc(db, 'schools', school.id, 'students', student.id), { parentAccessEnabled: student.parentAccessEnabled === false ? true : false });
    loadAllData();
  };

  const setStudentFlag = async (studentId, flagType, flagNote = '') => {
    await updateDoc(doc(db, 'schools', school.id, 'students', studentId), { flag: flagType, flagNote: flagNote });
    setFlaggingId(null);
    loadAllData();
  };

  const clearFlag = async (studentId) => {
    await updateDoc(doc(db, 'schools', school.id, 'students', studentId), { flag: '', flagNote: '' });
    loadAllData();
  };

  const getAge = (dob) => {
    if (!dob) return null;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  };

  const getFlagInfo = (flagValue) => FLAG_TYPES.find(f => f.value === flagValue);

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-socrates-navy">{totalStudents}</p>
          <p className="text-xs text-gray-500">{adult ? 'Étudiants' : 'Élèves'}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-sm font-bold">
            <span className="text-blue-600">{maleCount} M</span> / <span className="text-pink-600">{femaleCount} F</span>
          </p>
          <p className="text-xs text-gray-500">Répartition</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{unpaidCount}</p>
          <p className="text-xs text-gray-500">Impayés</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center cursor-pointer" onClick={() => { setShowFilters(true); setFilterStatus('flagged'); }}>
          <p className="text-2xl font-bold text-orange-500">{flaggedCount}</p>
          <p className="text-xs text-gray-500">Signalés</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-lg font-bold text-emerald-600">HTG {(totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-500">Revenus attendus</p>
        </div>
      </div>

      {/* Search & actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full text-base" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-3 py-3 border rounded-xl flex items-center gap-1 ${showFilters ? 'bg-socrates-blue text-white' : ''}`}><Filter size={18} /><ChevronDown size={14} /></button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onOpenModal('payment')} className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><DollarSign size={18} />Payer</button>
          <button onClick={() => onOpenModal('student')} className="flex-1 sm:flex-none bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18} />Ajouter</button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow p-3">
          <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">Tous les niveaux</option>
            {uniqueLevels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">Tous statuts</option>
            <option value="paid">Payé</option>
            <option value="unpaid">Impayé</option>
            <option value="noDeposit">Sans dépôt</option>
            <option value="flagged">🚩 Signalés</option>
          </select>
          {(filterLevel || filterStatus) && (
            <button onClick={() => { setFilterLevel(''); setFilterStatus(''); }} className="text-red-500 text-sm font-medium px-3">Effacer</button>
          )}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Student list */}
      <div className="space-y-3">
        {filtered.map(student => {
          const balance = getStudentBalance(student.id);
          const expanded = expandedId === student.id;
          const age = getAge(student.dateOfBirth);
          const flagInfo = getFlagInfo(student.flag);
          const isFlagging = flaggingId === student.id;
          return (
            <div key={student.id} className={`bg-white rounded-xl shadow-lg overflow-hidden ${student.flag ? 'ring-2 ring-orange-300' : ''}`}>
              {/* Flag banner */}
              {flagInfo && (
                <div className={`px-4 py-2 flex items-center justify-between ${flagInfo.color}`}>
                  <span className="text-xs font-medium flex items-center gap-1.5">
                    <span>{flagInfo.icon}</span> Signalé: {flagInfo.label}
                    {student.flagNote && <span className="text-xs opacity-75">— {student.flagNote}</span>}
                  </span>
                  <button onClick={() => clearFlag(student.id)} className="text-xs opacity-60 hover:opacity-100 flex items-center gap-0.5"><X size={12} />Retirer</button>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center gap-3 mb-2" onClick={() => setExpandedId(expanded ? null : student.id)}>
                  {student.photo ? (
                    <img src={student.photo} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className={`w-12 h-12 rounded-full ${student.gender === 'F' ? 'bg-pink-500' : 'bg-socrates-blue'} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                      {student.firstName?.[0]}{student.lastName?.[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0 cursor-pointer">
                    <p className="font-semibold text-gray-800 truncate">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {student.gradeLevel || 'N/A'}
                      {student.gender && <span className="ml-1">• {student.gender === 'M' ? '♂' : '♀'}</span>}
                      {age && <span className="ml-1">• {age} ans</span>}
                    </p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {!student.depositPaid && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Sans dépôt</span>}
                      {!adult && student.parentAccessEnabled === false && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Portail bloqué</span>}
                      <span className="text-xs text-gray-400">HTG {getMonthlyTuition(student)}/mois</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-lg font-bold ${balance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {Math.abs(balance).toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-400">{balance > 0 ? 'HTG dû' : 'payé'}</p>
                  </div>
                </div>

                {/* Expanded details */}
                {expanded && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      {student.dateOfBirth && <p className="text-gray-600"><span className="text-gray-400">Né(e):</span> {student.dateOfBirth}</p>}
                      {student.birthPlace && <p className="text-gray-600"><span className="text-gray-400">Lieu:</span> {student.birthPlace}</p>}
                      {student.address && <p className="text-gray-600 col-span-2"><span className="text-gray-400">Adresse:</span> {student.address}</p>}
                      {adult ? (<>
                        {student.parentEmail && <p className="text-gray-600"><span className="text-gray-400">Email:</span> {student.parentEmail}</p>}
                        {student.parentPhone && <p className="text-gray-600"><span className="text-gray-400">Tél:</span> {student.parentPhone}</p>}
                        {student.nif && <p className="text-gray-600"><span className="text-gray-400">NIF:</span> {student.nif}</p>}
                        {student.profession && <p className="text-gray-600"><span className="text-gray-400">Profession:</span> {student.profession}</p>}
                      </>) : (<>
                        {student.fatherName && <p className="text-gray-600"><span className="text-gray-400">Père:</span> {student.fatherName}</p>}
                        {student.motherName && <p className="text-gray-600"><span className="text-gray-400">Mère:</span> {student.motherName}</p>}
                        {student.parentPhone && <p className="text-gray-600"><span className="text-gray-400">Tél parent:</span> {student.parentPhone}</p>}
                        {student.parentEmail && <p className="text-gray-600"><span className="text-gray-400">Email:</span> {student.parentEmail}</p>}
                        {student.bloodType && <p className="text-gray-600"><span className="text-gray-400">Sang:</span> {student.bloodType}</p>}
                        {student.medicalNotes && <p className="text-gray-600"><span className="text-gray-400">Médical:</span> {student.medicalNotes}</p>}
                      </>)}
                    </div>
                  </div>
                )}

                {student.notes && student.notes.trim() !== '' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm mt-3">
                    <p className="text-yellow-800"><strong>Message:</strong> {student.notes}</p>
                  </div>
                )}

                {/* Flag picker inline */}
                {isFlagging && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5"><AlertTriangle size={14} className="text-orange-500" /> Signaler un problème</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {FLAG_TYPES.map(ft => (
                        <button key={ft.value} type="button" onClick={() => {
                          const note = ft.value === 'other' ? prompt('Note (optionnel):') || '' : '';
                          setStudentFlag(student.id, ft.value, note);
                        }} className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${ft.color} hover:ring-2 hover:ring-offset-1 transition`}>
                          <span>{ft.icon}</span>{ft.label}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setFlaggingId(null)} className="text-xs text-gray-400">Annuler</button>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap mt-3">
                  <button onClick={() => { onOpenModal('payment', null, { studentId: student.id, amount: getMonthlyTuition(student), paymentType: 'scolarite' }); }} className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><DollarSign size={16} />Payer</button>
                  <button onClick={() => generateContract(student)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16} />Contrat</button>
                  <button onClick={() => generateReportCard(student)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Download size={16} /></button>
                  {!adult && (
                    <button onClick={() => toggleParentAccess(student)} className={`px-3 py-2 rounded-lg text-sm font-medium ${student.parentAccessEnabled === false ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {student.parentAccessEnabled === false ? <XCircle size={16} /> : <CheckCircle size={16} />}
                    </button>
                  )}
                  <button onClick={() => setFlaggingId(isFlagging ? null : student.id)} className={`px-3 py-2 rounded-lg ${student.flag ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}><Flag size={16} /></button>
                  <button onClick={() => onOpenModal('student', student)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Edit size={16} /></button>
                  <button onClick={() => deleteStudent(student.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>{searchTerm || filterLevel || filterStatus ? 'Aucun résultat' : `Aucun ${adult ? 'étudiant' : 'élève'}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

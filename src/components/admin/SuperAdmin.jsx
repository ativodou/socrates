import React, { useState } from 'react';
import { Shield, Users, DollarSign, Search, Eye, ToggleLeft, ToggleRight, Plus, Trash2 } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import SchoolDetailView from './SchoolDetailView';

export default function SuperAdmin() {
  const {
    allSchools, subscriptionPayments, handleLogout,
    toggleSchoolStatus, updateSchoolSubscription, extendTrial,
    loadSchoolDetails, saveSubscriptionPayment, deleteSubscriptionPayment,
    getSchoolBalance, isSetupFeePaid, getTotalSubscriptionRevenue,
  } = useSchool();

  const [adminTab, setAdminTab] = useState('schools'); // schools, payments, revenue
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingSchool, setViewingSchool] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({});

  const filtered = allSchools.filter(s => s.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (viewingSchool) {
    return <SchoolDetailView schoolId={viewingSchool} onBack={() => setViewingSchool(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield size={28} />
          <div><h1 className="font-display text-xl">SOCRATES Admin</h1><p className="text-xs text-purple-200">Super Administrateur</p></div>
        </div>
        <button onClick={handleLogout} className="bg-white/20 px-4 py-2 rounded-lg text-sm">Deconnexion</button>
      </header>

      {/* Stats */}
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow p-4"><p className="text-xs text-gray-500">Ecoles</p><p className="text-2xl font-bold text-purple-700">{allSchools.length}</p></div>
        <div className="bg-white rounded-xl shadow p-4"><p className="text-xs text-gray-500">Eleves total</p><p className="text-2xl font-bold text-blue-700">{allSchools.reduce((s, sc) => s + (sc.studentCount || 0), 0)}</p></div>
        <div className="bg-white rounded-xl shadow p-4"><p className="text-xs text-gray-500">Revenus</p><p className="text-2xl font-bold text-green-700">HTG {getTotalSubscriptionRevenue().toFixed(0)}</p></div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          {[
            { id: 'schools', label: 'Ecoles', icon: Users },
            { id: 'payments', label: 'Paiements', icon: DollarSign },
          ].map(tab => (
            <button key={tab.id} onClick={() => setAdminTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${adminTab === tab.id ? 'bg-white shadow text-purple-700' : 'text-gray-500'}`}>
              <tab.icon size={16} />{tab.label}
            </button>
          ))}
        </div>

        {/* Schools Tab */}
        {adminTab === 'schools' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Rechercher ecole..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full text-base" />
            </div>
            {filtered.map(school => (
              <div key={school.id} className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                                    {school.logo && school.logo.length > 10 ? <img src={school.logo} alt="" className="w-12 h-12 rounded-full object-contain bg-gray-100" /> : <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">{school.name?.[0]}</div>}
                  <div className="flex-1">
                    <p className="font-semibold">{school.name}</p>
                    <p className="text-sm text-gray-500">{school.email}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${school.subscription === 'active' ? 'bg-green-100 text-green-700' : school.subscription === 'trial' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{school.subscription || 'trial'}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${school.status === 'disabled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{school.status || 'active'}</span>
                      <span className="text-xs text-gray-400">{school.studentCount || 0} eleves • {school.teacherCount || 0} enseignants</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${getSchoolBalance(school.id) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {getSchoolBalance(school.id) > 0 ? `Du: HTG ${getSchoolBalance(school.id).toFixed(0)}` : 'A jour'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => setViewingSchool(school.id)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Eye size={16} />Details</button>
                  <button onClick={() => toggleSchoolStatus(school.id, school.status)} className={`px-3 py-2 rounded-lg text-sm font-medium ${school.status === 'disabled' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {school.status === 'disabled' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  </button>
                  <button onClick={() => extendTrial(school.id, 30)} className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium">+30j</button>
                  <select value={school.subscription || 'trial'} onChange={e => updateSchoolSubscription(school.id, e.target.value)} className="text-xs border rounded-lg px-2 py-1">
                    <option value="trial">Trial</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payments Tab */}
        {adminTab === 'payments' && (
          <div className="space-y-3">
            <button onClick={() => setShowPaymentForm(!showPaymentForm)} className="bg-purple-600 text-white px-4 py-3 rounded-xl font-medium flex items-center gap-2"><Plus size={18} />Enregistrer Paiement</button>
            {showPaymentForm && (
              <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
                <select value={paymentForm.schoolId || ''} onChange={e => setPaymentForm({ ...paymentForm, schoolId: e.target.value })} className="w-full px-4 py-3 border rounded-xl">
                  <option value="">Selectionnez ecole</option>
                  {allSchools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input type="number" placeholder="Montant (HTG)" value={paymentForm.amount || ''} onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                <input type="date" value={paymentForm.date || new Date().toISOString().split('T')[0]} onChange={e => setPaymentForm({ ...paymentForm, date: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                <label className="flex items-center gap-3"><input type="checkbox" checked={paymentForm.isSetupFee || false} onChange={e => setPaymentForm({ ...paymentForm, isSetupFee: e.target.checked })} className="w-5 h-5" /><span className="text-sm">Frais d'installation</span></label>
                <input type="text" placeholder="Description" value={paymentForm.description || ''} onChange={e => setPaymentForm({ ...paymentForm, description: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                <div className="flex gap-2">
                  <button onClick={async () => {
                    if (!paymentForm.schoolId || !paymentForm.amount) { alert('Ecole et montant requis'); return; }
                    await saveSubscriptionPayment(paymentForm);
                    setPaymentForm({});
                    setShowPaymentForm(false);
                  }} className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium">Enregistrer</button>
                  <button onClick={() => setShowPaymentForm(false)} className="flex-1 bg-gray-100 py-3 rounded-xl">Annuler</button>
                </div>
              </div>
            )}
            {subscriptionPayments.map(p => {
              const school = allSchools.find(s => s.id === p.schoolId);
              return (
                <div key={p.id} className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-green-600">HTG {p.amount} {p.isSetupFee && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2">Installation</span>}</p>
                    <p className="text-sm text-gray-600">{school?.name || 'Ecole inconnue'}</p>
                    <p className="text-xs text-gray-400">{p.date} • {p.description || ''}</p>
                  </div>
                  <button onClick={() => deleteSubscriptionPayment(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, GraduationCap, DollarSign, FileText } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';

export default function SchoolDetailView({ schoolId, onBack }) {
  const { loadSchoolDetails, updateSchoolContract, subscriptionPayments, saveSubscriptionPayment } = useSchool();
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contractForm, setContractForm] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await loadSchoolDetails(schoolId);
      setSchoolData(data);
      setContractForm({ annualFee: data.annualFee || '', setupFee: data.setupFee || '' });
      setLoading(false);
    };
    load();
  }, [schoolId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Chargement...</p></div>;
  if (!schoolData) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Ecole non trouvee</p></div>;

  const schoolPayments = subscriptionPayments.filter(p => p.schoolId === schoolId);
  const totalPaid = schoolPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const generateContract = () => {
    const annualFee = parseFloat(contractForm.annualFee) || 0;
    const setupFee = parseFloat(contractForm.setupFee) || 0;
    const monthlyFee = (annualFee / 12).toFixed(2);
    const setupPaid = schoolPayments.some(p => p.isSetupFee);
    const w = window.open('', '_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Contrat SOCRATES</title></head><body style="font-family:sans-serif;padding:20px;max-width:700px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:30px;"><h1 style="color:#6b21a8;">SOCRATES</h1><p style="color:#666;font-style:italic;">Contrat de Service - Gestion Scolaire</p></div>
      <h2>1. PARTIES</h2><p><strong>Fournisseur:</strong> SOCRATES SaaS<br/><strong>Client:</strong> ${schoolData.name || 'N/A'}<br/><strong>Directeur:</strong> ${schoolData.directorName || 'N/A'}<br/><strong>Email:</strong> ${schoolData.email || 'N/A'}<br/><strong>Telephone:</strong> ${schoolData.phone || 'N/A'}</p>
      <h2>2. SERVICES</h2><p>Acces complet a la plateforme SOCRATES: gestion des eleves, enseignants, classes, notes, paiements, bulletins, portail parent.</p>
      <h2>3. CONDITIONS FINANCIERES</h2>
      <table style="width:100%;border-collapse:collapse;"><tr><td style="padding:12px;border:1px solid #ddd;background:#f8f8f8;"><strong>Depot Initial</strong></td><td style="padding:12px;border:1px solid #ddd;text-align:right;">HTG ${setupFee.toFixed(2)} ${setupPaid ? '<span style="color:green;">(Paye)</span>' : '<span style="color:red;">(Non paye)</span>'}</td></tr>
      <tr><td style="padding:12px;border:1px solid #ddd;">Abonnement Annuel</td><td style="padding:12px;border:1px solid #ddd;text-align:right;">HTG ${annualFee.toFixed(2)}</td></tr>
      <tr><td style="padding:12px;border:1px solid #ddd;">Paiement Mensuel</td><td style="padding:12px;border:1px solid #ddd;text-align:right;">HTG ${monthlyFee}</td></tr>
      <tr style="background:#6b21a8;color:white;"><td style="padding:12px;border:1px solid #ddd;"><strong>Total</strong></td><td style="padding:12px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${(annualFee + setupFee).toFixed(2)}</td></tr></table>
      <h2>4. SIGNATURES</h2><div style="display:flex;justify-content:space-between;margin-top:40px;"><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">SOCRATES</div><div style="width:45%;border-top:1px solid #000;padding-top:5px;text-align:center;">Ecole</div></div>
      <button onclick="window.print()" style="margin-top:20px;padding:15px 30px;width:100%;">Imprimer</button></body></html>`);
    w.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-white p-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white/20 rounded-lg"><ArrowLeft size={20} /></button>
          <div>
            <h1 className="font-bold text-lg">{schoolData.name}</h1>
            <p className="text-xs text-purple-200">{schoolData.email} • {schoolData.phone}</p>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl shadow p-4 text-center"><Users size={24} className="mx-auto mb-2 text-blue-500" /><p className="text-2xl font-bold">{schoolData.students?.length || 0}</p><p className="text-xs text-gray-500">Eleves</p></div>
          <div className="bg-white rounded-xl shadow p-4 text-center"><GraduationCap size={24} className="mx-auto mb-2 text-green-500" /><p className="text-2xl font-bold">{schoolData.teachers?.length || 0}</p><p className="text-xs text-gray-500">Enseignants</p></div>
          <div className="bg-white rounded-xl shadow p-4 text-center"><DollarSign size={24} className="mx-auto mb-2 text-purple-500" /><p className="text-2xl font-bold text-green-600">HTG {totalPaid.toFixed(0)}</p><p className="text-xs text-gray-500">Total paye</p></div>
        </div>

        {/* Contract */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FileText size={20} className="text-purple-600" />Contrat</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div><label className="block text-sm text-gray-600 mb-1">Abonnement annuel (HTG)</label><input type="number" value={contractForm.annualFee || ''} onChange={e => setContractForm({ ...contractForm, annualFee: e.target.value })} className="w-full px-4 py-3 border rounded-xl" /></div>
            <div><label className="block text-sm text-gray-600 mb-1">Frais installation (HTG)</label><input type="number" value={contractForm.setupFee || ''} onChange={e => setContractForm({ ...contractForm, setupFee: e.target.value })} className="w-full px-4 py-3 border rounded-xl" /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={async () => {
              const doc = await updateSchoolContract(schoolId, contractForm.annualFee, contractForm.setupFee);
              setSchoolData({ ...schoolData, ...doc.data() });
              alert('Contrat sauvegarde!');
            }} className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium">Sauvegarder</button>
            <button onClick={generateContract} className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-xl font-medium">Generer Contrat</button>
          </div>
        </div>

        {/* Students list */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Eleves ({schoolData.students?.length || 0})</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {(schoolData.students || []).map(s => (
              <div key={s.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">{s.firstName?.[0]}{s.lastName?.[0]}</div>
                <div className="flex-1"><p className="text-sm font-medium">{s.firstName} {s.lastName}</p><p className="text-xs text-gray-400">{s.gradeLevel}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Paiements Abonnement</h3>
          <div className="space-y-2">
            {schoolPayments.map(p => (
              <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div><p className="font-medium text-green-600">HTG {p.amount}</p><p className="text-xs text-gray-400">{p.date} {p.isSetupFee && '• Installation'}</p></div>
                <span className="text-xs text-gray-500">{p.method || 'Especes'}</span>
              </div>
            ))}
            {schoolPayments.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Aucun paiement</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

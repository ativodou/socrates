import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSchool } from '../../contexts/SchoolContext';
import SchoolPublicProfile from './SchoolPublicProfile';

export default function AuthScreen() {
  const { handleRegister, handleLogin } = useSchool();

  const [authMode, setAuthMode] = useState('login'); // login, register, parent, directory
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});

  // Parent login states
  const [allSchoolsList, setAllSchoolsList] = useState([]);
  const [parentSchoolId, setParentSchoolId] = useState('');
  const [parentView, setParentView] = useState(null); // null | { school, student }
  const [viewingProfile, setViewingProfile] = useState(null); // school public profile

  // Load schools list for parent login & directory
  useEffect(() => {
    const loadSchools = async () => {
      try {
        const snap = await getDocs(collection(db, 'schools'));
        const schools = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(s => s.status !== 'disabled');
        setAllSchoolsList(schools);
      } catch (e) { console.error('Error loading schools:', e); }
    };
    loadSchools();
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    setError('');
    try { await handleLogin(formData.email, formData.password); }
    catch (err) { setError(err.message); }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) { setError('Les mots de passe ne correspondent pas'); return; }
    try { await handleRegister(formData); }
    catch (err) { setError(err.message); }
  };

  const onParentLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!parentSchoolId) { setError("Selectionnez une ecole"); return; }
    try {
      const studentsSnap = await getDocs(collection(db, 'schools', parentSchoolId, 'students'));
      const students = studentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const contact = formData.parentContact?.trim();
      const pin = formData.parentPin?.trim();
      const student = students.find(s =>
        (s.parentEmail === contact || s.parentPhone === contact) && s.parentPin === pin
      );
      if (student) {
        if (student.parentAccessEnabled === false) {
          setError('Accès au portail bloqué. Voir direction.');
          return;
        }
        const school = allSchoolsList.find(s => s.id === parentSchoolId);
        const allMatching = students.filter(s => s.parentEmail === contact || s.parentPhone === contact);
        const accessible = allMatching.filter(s => s.parentAccessEnabled !== false);
        if (accessible.length === 0) { setError('Accès au portail bloqué. Voir direction.'); return; }
        setParentView({ school, student: accessible[0], allStudents: accessible });
      } else { setError('Identifiants invalides.'); }
    } catch (err) { setError(err.message); }
  };

  // ── Parent Portal View ────────────────────────────────────────────
  if (parentView) {
    const { school, allStudents } = parentView;
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-4">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {school?.logo && school.logo.length > 10 ? <img src={school.logo} alt="" className="w-10 h-10 rounded-full object-contain bg-white/20" /> : <img src="/owl-icon.svg" alt="" className="w-10 h-10 rounded-full" />}
              <div>
                <h1 className="font-display text-xl">{school?.name || 'SOCRATES'}</h1>
                <p className="text-xs text-blue-200">Portail Parent</p>
              </div>
            </div>
            <button onClick={() => setParentView(null)} className="bg-white/20 px-3 py-1.5 rounded-lg text-sm">Deconnexion</button>
          </div>
        </header>
        <div className="max-w-lg mx-auto p-4 space-y-4">
          {allStudents.map(student => {
            const scolarite = parseFloat(student.annualTuition) || 0;
            const frais = parseFloat(student.fraisDivers) || 0;
            const total = scolarite + frais;
            return (
              <div key={student.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-socrates-navy text-white p-4 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">{student.firstName?.[0]}{student.lastName?.[0]}</div>
                  <div><p className="font-bold text-lg">{student.firstName} {student.lastName}</p><p className="text-blue-200 text-sm">{student.gradeLevel || 'N/A'}</p></div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-gray-500">Scolarite annuelle</p><p className="text-lg font-bold text-blue-700">HTG {scolarite.toFixed(0)}</p></div>
                    <div className="bg-orange-50 rounded-xl p-3"><p className="text-xs text-gray-500">Frais divers</p><p className="text-lg font-bold text-orange-700">HTG {frais.toFixed(0)}</p></div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-gray-600">Total annuel</span>
                    <span className="text-xl font-bold text-socrates-navy">HTG {total.toFixed(0)}</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-gray-600">Mensuel (10 mois)</span>
                    <span className="font-bold text-socrates-blue">HTG {(scolarite / 10).toFixed(0)}</span>
                  </div>
                  {student.notes && student.notes.trim() !== '' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                      <p className="text-sm text-yellow-800"><strong>Message de l'ecole:</strong> {student.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {/* School info */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Informations de l'ecole</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Adresse:</span> {school?.address || 'N/A'}</p>
              <p><span className="text-gray-500">Telephone:</span> {school?.phone || 'N/A'}</p>
              <p><span className="text-gray-500">Directeur:</span> {school?.directorName || 'N/A'}</p>
              {school?.website && <p><span className="text-gray-500">Site:</span> <a href={school.website} className="text-socrates-blue underline">{school.website}</a></p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── School Public Profile View ────────────────────────────────────
  if (viewingProfile) {
    return <SchoolPublicProfile school={viewingProfile} onBack={() => setViewingProfile(null)} />;
  }

  // ── Directory View ────────────────────────────────────────────────
  if (authMode === 'directory') {
    const listedSchools = allSchoolsList.filter(s => s.name);
    const isComplete = (s) => s.schoolType && s.address && s.phone && s.directorName;
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-6 text-center">
          <img src="/owl-icon.svg" alt="SOCRATES" className="w-12 h-12 rounded-full mx-auto mb-2" />
          <h1 className="font-display text-3xl mb-1">SOCRATES</h1>
          <p className="text-blue-200">Annuaire des Ecoles</p>
        </header>
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          <button onClick={() => setAuthMode('login')} className="text-socrates-blue font-medium text-sm">← Retour</button>
          {listedSchools.length === 0 && <p className="text-gray-500 text-center py-12">Aucune ecole dans l'annuaire pour le moment.</p>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listedSchools.map(school => (
              <div key={school.id} className="bg-white rounded-xl shadow-lg p-5 cursor-pointer hover:shadow-xl transition" onClick={() => setViewingProfile(school)}>
                <div className="flex items-center gap-3 mb-3">
                  {school.logo && school.logo.length > 10 ? <img src={school.logo} alt="" className="w-12 h-12 rounded-full object-contain bg-gray-100" /> : <div className="w-12 h-12 rounded-full bg-socrates-navy text-white flex items-center justify-center font-bold">{school.name?.[0]}</div>}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{school.name}</h3>
                    <p className="text-xs text-gray-500">{school.schoolType || 'Type non defini'}</p>
                  </div>
                  {isComplete(school) ? <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✅ Verifie</span> : <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Profil incomplet</span>}
                </div>
                <p className="text-sm text-gray-600">{school.address || 'Adresse non renseignee'}</p>
                <p className="text-sm text-gray-500">{school.phone || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Auth Forms ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-socrates-navy via-socrates-blue to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8 text-center bg-gradient-to-r from-socrates-navy to-socrates-blue text-white">
          <div className="w-20 h-20 rounded-full mx-auto mb-4">
            <img src="/owl-icon.svg" alt="SOCRATES" className="w-full h-full rounded-full object-contain" />
          </div>
          <h1 className="text-3xl font-display">SOCRATES</h1>
          <p className="text-blue-200 text-sm italic mt-1">Vers la lumiere</p>
        </div>

        <div className="p-6">
          {/* Mode switcher */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { id: 'login', label: 'Connexion' },
              { id: 'register', label: 'Inscription' },
              { id: 'parent', label: 'Parent' },
            ].map(mode => (
              <button key={mode.id} onClick={() => { setAuthMode(mode.id); setError(''); }} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${authMode === mode.id ? 'bg-white shadow text-socrates-navy' : 'text-gray-500'}`}>{mode.label}</button>
            ))}
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}

          {/* Login Form */}
          {authMode === 'login' && (
            <form onSubmit={onLogin} className="space-y-4">
              <input type="email" placeholder="Email" required value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <input type="password" placeholder="Mot de passe" required value={formData.password || ''} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <button type="submit" className="w-full bg-socrates-blue text-white py-3 rounded-xl font-semibold">Se connecter</button>
            </form>
          )}

          {/* Register Form */}
          {authMode === 'register' && (
            <form onSubmit={onRegister} className="space-y-4">
              <input type="text" placeholder="Nom de l'ecole" required value={formData.schoolName || ''} onChange={e => setFormData({ ...formData, schoolName: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <input type="email" placeholder="Email" required value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <input type="tel" placeholder="Telephone" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <input type="password" placeholder="Mot de passe" required value={formData.password || ''} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <input type="password" placeholder="Confirmer mot de passe" required value={formData.confirmPassword || ''} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">Creer le compte</button>
            </form>
          )}

          {/* Parent Login */}
          {authMode === 'parent' && (
            <form onSubmit={onParentLogin} className="space-y-4">
              <select value={parentSchoolId} onChange={e => setParentSchoolId(e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base">
                <option value="">Selectionnez l'ecole</option>
                {allSchoolsList.filter(s => !['Technique', 'Universitaire'].includes(s.schoolType)).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input type="text" placeholder="Email ou Telephone" required value={formData.parentContact || ''} onChange={e => setFormData({ ...formData, parentContact: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <input type="text" placeholder="PIN" required maxLength={6} value={formData.parentPin || ''} onChange={e => setFormData({ ...formData, parentPin: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base text-center text-xl tracking-widest" />
              <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold">Acceder au portail</button>
            </form>
          )}

          {/* Directory link */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button onClick={() => setAuthMode('directory')} className="w-full bg-gradient-to-r from-socrates-navy to-socrates-blue text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
              📚 Voir l'Annuaire des Ecoles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

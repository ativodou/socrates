import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSchool } from '../../contexts/SchoolContext';
import SchoolPublicProfile from './SchoolPublicProfile';
import TeacherPortal from './TeacherPortal';

export default function AuthScreen() {
  const { handleRegister, handleLogin } = useSchool();

  const [authMode, setAuthMode] = useState('login'); // login, register, parent, directory
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});

  // Parent login states
  const [allSchoolsList, setAllSchoolsList] = useState([]);
  const [parentSchoolId, setParentSchoolId] = useState('');
  const [parentView, setParentView] = useState(null); // null | { school, student }
  const [teacherView, setTeacherView] = useState(null); // null | { school, teacher, classes }
  const [viewingProfile, setViewingProfile] = useState(null); // school public profile
  const [parentLang, setParentLang] = useState('fr'); // 'fr' | 'ht'

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
        // Load homework, exams & payments for parent view
        const [hwSnap, examSnap, paymentsSnap] = await Promise.all([
          getDocs(collection(db, 'schools', parentSchoolId, 'homework')),
          getDocs(collection(db, 'schools', parentSchoolId, 'exams')),
          getDocs(collection(db, 'schools', parentSchoolId, 'payments')),
        ]);
        const hw = hwSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const ex = examSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const pay = paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setParentView({ school, student: accessible[0], allStudents: accessible, homework: hw, exams: ex, payments: pay });
      } else { setError('Identifiants invalides.'); }
    } catch (err) { setError(err.message); }
  };

  const onTeacherLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!parentSchoolId) { setError("Selectionnez une ecole"); return; }
    try {
      const teachersSnap = await getDocs(collection(db, 'schools', parentSchoolId, 'teachers'));
      const allTeachers = teachersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const contact = formData.teacherContact?.trim();
      const pin = formData.teacherPin?.trim();
      const found = allTeachers.find(t =>
        (t.email === contact || t.phone === contact) && t.teacherPin === pin
      );
      if (found) {
        const classesSnap = await getDocs(collection(db, 'schools', parentSchoolId, 'classes'));
        const allClasses = classesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const school = allSchoolsList.find(s => s.id === parentSchoolId);
        setTeacherView({ school, teacher: found, classes: allClasses });
      } else { setError('Identifiants invalides.'); }
    } catch (err) { setError(err.message); }
  };

  // ── Teacher Portal View ─────────────────────────────────────────────
  if (teacherView) {
    return <TeacherPortal school={teacherView.school} teacher={teacherView.teacher} allClasses={teacherView.classes} onLogout={() => setTeacherView(null)} />;
  }

  // ── Parent Portal View ────────────────────────────────────────────
  const t = {
    fr: {
      portalTitle: 'Portail Parent',
      logout: 'Déconnexion',
      owes: 'Doit',
      paidUp: 'À jour ✓',
      totalDue: 'Total dû',
      paid: 'Payé',
      remaining: 'Reste',
      cleared: 'SOLDÉ',
      homework: '📝 Devoirs à faire',
      moreHW: (n) => `+ ${n} autre${n > 1 ? 's' : ''} devoir${n > 1 ? 's' : ''}`,
      exams: '📋 Examens à venir',
      moreExams: (n) => `+ ${n} autre${n > 1 ? 's' : ''} examen${n > 1 ? 's' : ''}`,
      schoolMessage: "Message de l'école:",
      schoolInfo: "Informations de l'école",
      address: 'Adresse',
      phone: 'Téléphone',
      director: 'Directeur',
      website: 'Site',
      annualTuition: 'Scolarité annuelle',
      fees: 'Frais divers',
    },
    ht: {
      portalTitle: 'Pòtay Paran',
      logout: 'Dekonekte',
      owes: 'Dwe',
      paidUp: 'Ajou ✓',
      totalDue: 'Total pou peye',
      paid: 'Peye',
      remaining: 'Rès',
      cleared: 'PEYE NET',
      homework: '📝 Devwa pou fè',
      moreHW: (n) => `+ ${n} lòt devwa`,
      exams: '📋 Egzamen k ap vini',
      moreExams: (n) => `+ ${n} lòt egzamen`,
      schoolMessage: 'Mesaj lekòl la:',
      schoolInfo: 'Enfòmasyon lekòl la',
      address: 'Adrès',
      phone: 'Telefòn',
      director: 'Direktè',
      website: 'Sit wèb',
      annualTuition: 'Lajan lekòl pou ane a',
      fees: 'Lòt frè',
    },
  };

  if (parentView) {
    const { school, allStudents, homework: parentHW = [], exams: parentExams = [], payments: parentPayments = [] } = parentView;
    const L = t[parentLang];
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-4">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {school?.logo && school.logo.length > 10 ? <img src={school.logo} alt="" className="w-10 h-10 rounded-full object-contain bg-white/20" /> : <img src="/owl-icon.svg" alt="" className="w-10 h-10 rounded-full" />}
              <div>
                <h1 className="font-display text-xl">{school?.name || 'SOCRATES'}</h1>
                <p className="text-xs text-blue-200">{L.portalTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setParentLang(parentLang === 'fr' ? 'ht' : 'fr')} className="bg-white/20 px-2.5 py-1.5 rounded-lg text-xs font-bold">{parentLang === 'fr' ? 'KR' : 'FR'}</button>
              <button onClick={() => setParentView(null)} className="bg-white/20 px-3 py-1.5 rounded-lg text-sm">{L.logout}</button>
            </div>
          </div>
        </header>
        <div className="max-w-lg mx-auto p-4 space-y-4">
          {allStudents.map(student => {
            const scolarite = parseFloat(student.annualTuition) || 0;
            const frais = parseFloat(student.fraisDivers) || 0;
            const total = scolarite + frais;
            const paid = parentPayments.filter(p => p.studentId === student.id && !p.isDeposit).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
            const balance = total - paid;
            const studentHW = parentHW.filter(h => h.classId === student.classId && (!h.dueDate || new Date(h.dueDate) >= new Date())).sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));
            const studentExams = parentExams.filter(e => e.classId === student.classId && (!e.examDate || new Date(e.examDate) >= new Date())).sort((a, b) => (a.examDate || '').localeCompare(b.examDate || ''));
            return (
              <div key={student.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-socrates-navy text-white p-4 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">{student.firstName?.[0]}{student.lastName?.[0]}</div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{student.firstName} {student.lastName}</p>
                    <p className="text-blue-200 text-sm">{student.gradeLevel || 'N/A'}</p>
                  </div>
                  {balance > 0 && <div className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold">{L.owes} HTG {balance.toLocaleString()}</div>}
                  {balance <= 0 && <div className="bg-green-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold">{L.paidUp}</div>}
                </div>
                <div className="p-4 space-y-4">
                  {/* Balance summary */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500">{L.totalDue}</p>
                      <p className="text-sm font-bold text-gray-800">HTG {total.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500">{L.paid}</p>
                      <p className="text-sm font-bold text-green-600">HTG {paid.toLocaleString()}</p>
                    </div>
                    <div className={`rounded-xl p-3 text-center ${balance > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                      <p className="text-xs text-gray-500">{L.remaining}</p>
                      <p className={`text-sm font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>{balance > 0 ? `HTG ${balance.toLocaleString()}` : L.cleared}</p>
                    </div>
                  </div>
                  {/* Homework for this student */}
                  {studentHW.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">{L.homework}</h4>
                      <div className="space-y-2">
                        {studentHW.slice(0, 5).map(hw => (
                          <div key={hw.id} className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800">{hw.title}</p>
                                {hw.subject && <p className="text-xs text-gray-500">{hw.subject}</p>}
                                {hw.description && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{hw.description}</p>}
                              </div>
                              {hw.dueDate && (
                                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full whitespace-nowrap ml-2 flex-shrink-0">
                                  {new Date(hw.dueDate).toLocaleDateString('fr-HT', { day: 'numeric', month: 'short' })}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        {studentHW.length > 5 && <p className="text-xs text-gray-400 text-center">{L.moreHW(studentHW.length - 5)}</p>}
                      </div>
                    </div>
                  )}
                  {/* Exams for this student */}
                  {studentExams.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">{L.exams}</h4>
                      <div className="space-y-2">
                        {studentExams.slice(0, 5).map(ex => (
                          <div key={ex.id} className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800">{ex.title}</p>
                                {ex.subject && <p className="text-xs text-gray-500">{ex.subject}{ex.totalPoints ? ` • ${ex.totalPoints} pts` : ''}</p>}
                                {ex.description && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ex.description}</p>}
                              </div>
                              {ex.examDate && (
                                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full whitespace-nowrap ml-2 flex-shrink-0">
                                  {new Date(ex.examDate).toLocaleDateString('fr-HT', { day: 'numeric', month: 'short' })}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        {studentExams.length > 5 && <p className="text-xs text-gray-400 text-center">{L.moreExams(studentExams.length - 5)}</p>}
                      </div>
                    </div>
                  )}
                  {student.notes && student.notes.trim() !== '' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                      <p className="text-sm text-yellow-800"><strong>{L.schoolMessage}</strong> {student.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {/* School info */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">{L.schoolInfo}</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">{L.address}:</span> {school?.address || 'N/A'}</p>
              <p><span className="text-gray-500">{L.phone}:</span> {school?.phone || 'N/A'}</p>
              <p><span className="text-gray-500">{L.director}:</span> {school?.directorName || 'N/A'}</p>
              {school?.website && <p><span className="text-gray-500">{L.website}:</span> <a href={school.website} className="text-socrates-blue underline">{school.website}</a></p>}
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
              { id: 'teacher', label: 'Enseignant' },
            ].map(mode => (
              <button key={mode.id} onClick={() => { setAuthMode(mode.id); setError(''); }} className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${authMode === mode.id ? 'bg-white shadow text-socrates-navy' : 'text-gray-500'}`}>{mode.label}</button>
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

          {/* Teacher Login */}
          {authMode === 'teacher' && (
            <form onSubmit={onTeacherLogin} className="space-y-4">
              <select value={parentSchoolId} onChange={e => setParentSchoolId(e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base">
                <option value="">Selectionnez l'ecole</option>
                {allSchoolsList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input type="text" placeholder="Email ou Telephone" required value={formData.teacherContact || ''} onChange={e => setFormData({ ...formData, teacherContact: e.target.value })} className="w-full px-4 py-3 border rounded-xl text-base" />
              <input type="text" placeholder="PIN" required maxLength={6} value={formData.teacherPin || ''} onChange={e => setFormData({ ...formData, teacherPin: e.target.value.replace(/\D/g, '') })} className="w-full px-4 py-3 border rounded-xl text-base text-center text-xl tracking-widest" />
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">Acceder au portail enseignant</button>
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

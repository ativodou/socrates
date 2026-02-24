import React, { useState } from 'react';
import { Plus, X, Check, ChevronRight, MapPin, Phone, User, School, BookOpen, Users, GraduationCap, Briefcase, Heart, DollarSign, ClipboardCheck, FileText } from 'lucide-react';
import { db } from '../../firebase';
import { doc, updateDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

const SECTIONS = [
  { id: 'checklist', label: 'Annuaire', icon: ClipboardCheck, color: 'text-green-600' },
  { id: 'identite', label: 'Identité', icon: School, color: 'text-blue-600' },
  { id: 'directeur', label: 'Directeur', icon: User, color: 'text-purple-600' },
  { id: 'structure', label: 'Structure', icon: BookOpen, color: 'text-indigo-600' },
  { id: 'enseignants', label: 'Enseignants', icon: GraduationCap, color: 'text-teal-600' },
  { id: 'classes', label: 'Classes', icon: Users, color: 'text-cyan-600' },
  { id: 'matieres', label: 'Matières', icon: FileText, color: 'text-amber-600' },
  { id: 'eleves', label: 'Élèves', icon: Users, color: 'text-sky-600' },
  { id: 'personnel', label: 'Personnel', icon: Briefcase, color: 'text-violet-600' },
  { id: 'viescolaire', label: 'Vie Scolaire', icon: Heart, color: 'text-orange-600' },
  { id: 'finances', label: 'Finances', icon: DollarSign, color: 'text-emerald-600' },
];

export default function Parametres() {
  const {
    school, setSchool, user, teachers, classes, students,
    loadAllData, getGradeLevels, isCustomGradeType,
    FEE_CYCLES, HAITI_DEPARTEMENTS_COMMUNES, updateSchoolSettings,
  } = useSchool();
  const { t, lang } = useLang();
  const ht = lang === 'ht';
  const SECTION_LABELS = ht ? {
    checklist: 'Anyè', identite: 'Idantite', directeur: 'Direktè', structure: 'Estrikti',
    enseignants: 'Anseyan', classes: 'Klas', matieres: 'Matyè', eleves: 'Elèv',
    personnel: 'Pèsonèl', viescolaire: 'Lavi Lekòl', finances: 'Finans',
  } : {};
  const getSectionLabel = (s) => SECTION_LABELS[s.id] || s.label;

  const [activeSection, setActiveSection] = useState('checklist');
  const [formData, setFormData] = useState({});

  const val = (formKey, schoolKey, fallback = '') => formData[formKey] ?? school?.[schoolKey] ?? fallback;
  const set = (key, value) => setFormData(f => ({ ...f, [key]: value }));

  // ─── Save ─────────────────────────────────────────────────────────
  const saveSettings = async () => {
    try {
      const updateData = {
        name: val('schoolName', 'name'), address: val('address', 'address'),
        gpsLat: val('gpsLat', 'gpsLat', ''), gpsLng: val('gpsLng', 'gpsLng', ''),
        phone: val('schoolPhone', 'phone'), email: val('schoolEmail', 'email', user?.email || ''),
        directorName: val('directorName', 'directorName'), directorTitle: val('directorTitle', 'directorTitle'),
        directorPhone: val('directorPhone', 'directorPhone'), directorEmail: val('directorEmail', 'directorEmail'),
        blockParentOnDebt: val('blockParentOnDebt', 'blockParentOnDebt', false),
        schoolType: val('schoolType', 'schoolType', ''), typeEcole: val('typeEcole', 'typeEcole', ''),
        foundedYear: val('foundedYear', 'foundedYear', ''),
        slogan: val('slogan', 'slogan', ''), mission: val('mission', 'mission', ''),
        website: val('website', 'website', ''), facebook: val('facebook', 'facebook', ''),
        instagram: val('instagram', 'instagram', ''), whatsapp: val('whatsapp', 'whatsapp', ''),
        sige: val('sige', 'sige', ''), departement: val('departement', 'departement', ''),
        commune: val('commune', 'commune', ''),
        methodePedagogique: val('methodePedagogique', 'methodePedagogique', ''),
        defaultAnnualTuition: parseFloat(val('defaultAnnualTuition', 'defaultAnnualTuition', 0)) || 0,
        defaultFraisDivers: parseFloat(val('defaultFraisDivers', 'defaultFraisDivers', 0)) || 0,
        defaultDeposit: parseFloat(val('defaultDeposit', 'defaultDeposit', 0)) || 0,
        customGradeLevels: val('customGradeLevels', 'customGradeLevels', []),
        secondarySystem: val('secondarySystem', 'secondarySystem', 'NS'),
        levelFees: val('levelFees', 'levelFees', {}),
        adminStaff: val('adminStaff', 'adminStaff', []),
        capacity: val('capacity', 'capacity', ''), accreditation: val('accreditation', 'accreditation', ''),
        languages: val('languages', 'languages', []),
        yearStart: val('yearStart', 'yearStart', ''), yearEnd: val('yearEnd', 'yearEnd', ''),
        hasUniform: val('hasUniform', 'hasUniform', false), uniformDesc: val('uniformDesc', 'uniformDesc', ''),
        hasCafeteria: val('hasCafeteria', 'hasCafeteria', false),
        hasTransport: val('hasTransport', 'hasTransport', false),
        hasInternet: val('hasInternet', 'hasInternet', false),
        activities: val('activities', 'activities', []), programs: val('programs', 'programs', []),
        subjects: val('subjects', 'subjects', []),
        promotionThreshold: parseInt(val('promotionThreshold', 'promotionThreshold', 50)) || 50,
      };
      await updateSchoolSettings(updateData);
      alert(ht ? 'Anrejistre!' : 'Sauvegardé !');
    } catch (err) { alert((ht?'Erè: ':'Erreur: ') + err.message); }
  };

  // ─── Checklist ────────────────────────────────────────────────────
  const checks = [
    { label: ht ? "Non lekòl la" : "Nom de l'école", done: !!val('schoolName', 'name'), section: 'identite' },
    { label: ht ? 'Logo telechaje' : 'Logo téléchargé', done: !!(school?.logo && school.logo.length > 10), section: 'identite' },
    { label: ht ? 'Depatman & Komun' : 'Département & Commune', done: !!val('departement', 'departement') && !!val('commune', 'commune'), section: 'identite' },
    { label: ht ? 'Adrès' : 'Adresse', done: !!val('address', 'address'), section: 'identite' },
    { label: ht ? 'Kowòdone GPS' : 'Coordonnées GPS', done: !!val('gpsLat', 'gpsLat'), section: 'identite' },
    { label: ht ? 'Telefòn' : 'Téléphone', done: !!val('schoolPhone', 'phone'), section: 'identite' },
    { label: ht?'Omwen 1 sik akademik':'Au moins 1 cycle académique', done: !!val('schoolType', 'schoolType'), section: 'structure' },
    { label: ht?'Omwen 1 klas kreye':'Au moins 1 classe créée', done: classes.length > 0, section: 'classes' },
    { label: ht?'Direktè ranseye':'Directeur renseigné', done: !!val('directorName', 'directorName'), section: 'directeur' },
    { label: 'No. SIGE', done: !!val('sige', 'sige'), optional: true, section: 'identite' },
  ];
  const requiredChecks = checks.filter(c => !c.optional);
  const completed = requiredChecks.filter(c => c.done).length;
  const total = requiredChecks.length;
  const percent = Math.round((completed / total) * 100);
  const getMessage = () => {
    if (ht) {
      if (percent === 100) return "✅ Lekòl ou pibliye nan Anyè a!";
      if (percent >= 75) return "Ekselan! Fini dènye detay yo.";
      if (percent >= 50) return "Ou prèske rive! Kèk etap ankò...";
      if (percent >= 25) return "Bon kòmansman! Kontinye pou lekòl ou vizib.";
      return "Kòmanse ranpli pwofil ou pou rejwenn Anyè a!";
    }
    if (percent === 100) return "✅ Votre école est publiée dans l'Annuaire !";
    if (percent >= 75) return "Excellent ! Finalisez les derniers détails.";
    if (percent >= 50) return "Vous y êtes presque ! Quelques étapes de plus...";
    if (percent >= 25) return "Bon début ! Continuez pour rendre votre école visible.";
    return "Commencez à remplir votre profil pour rejoindre l'Annuaire !";
  };

  const selectedDept = val('departement', 'departement', '');
  const communes = selectedDept && HAITI_DEPARTEMENTS_COMMUNES ? HAITI_DEPARTEMENTS_COMMUNES[selectedDept] || [] : [];

  // ─── Render ───────────────────────────────────────────────────────
  return (
    <div className="flex gap-0 lg:gap-6 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 min-h-[calc(100vh-120px)]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 flex-shrink-0 bg-white border-r pl-4 sm:pl-6 pt-4 sm:pt-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Paramètres</p>
        <nav className="space-y-1">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${activeSection === s.id ? 'bg-blue-50 text-socrates-blue' : 'text-gray-600 hover:bg-gray-50'}`}>
              <s.icon size={18} className={activeSection === s.id ? 'text-socrates-blue' : s.color} />
              {getSectionLabel(s)}
              {s.id === 'checklist' && <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${percent === 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{percent === 100 ? '✓' : `${percent}%`}</span>}
            </button>
          ))}
        </nav>
      </div>
      {/* Mobile top nav */}
      <div className="lg:hidden fixed top-[64px] left-0 right-0 z-30 bg-white border-b overflow-x-auto">
        <div className="flex px-4 py-2 gap-1 min-w-max">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${activeSection === s.id ? 'bg-socrates-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
              <s.icon size={14} />{getSectionLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-4 sm:pt-6 pr-4 sm:pr-6 pl-4 lg:pl-0 pb-6 lg:mt-0 mt-12 max-w-2xl">

        {/* ═══ 1. ANNUAIRE CHECKLIST ═══ */}
        {activeSection === 'checklist' && (<div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Annuaire des Écoles</h2>
          <p className="text-sm text-gray-500">Complétez votre profil pour apparaître dans l'annuaire public.</p>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={percent === 100 ? '#22c55e' : percent >= 50 ? '#3b82f6' : '#f59e0b'} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${percent * 2.64} ${264 - percent * 2.64}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center"><span className={`text-xl font-bold ${percent === 100 ? 'text-green-600' : 'text-gray-800'}`}>{percent}%</span></div>
            </div>
            <div><p className={`font-semibold ${percent === 100 ? 'text-green-700' : 'text-gray-800'}`}>{getMessage()}</p><p className="text-sm text-gray-500 mt-1">{completed}/{total} complétés</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-2">
            {checks.map((c, i) => (
              <button key={i} onClick={() => setActiveSection(c.section)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${c.done ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${c.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{c.done ? <Check size={14} /> : <span className="text-xs font-bold">{i + 1}</span>}</div>
                <span className={`flex-1 text-sm font-medium ${c.done ? 'text-green-700' : 'text-gray-700'}`}>{c.label}</span>
                {c.optional && !c.done && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Optionnel</span>}
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
          {!val('sige', 'sige') && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <div><p className="font-medium text-orange-800 text-sm">SIGE non renseigné</p><p className="text-xs text-orange-600 mt-1">Le numéro SIGE facilite la reconnaissance officielle par le Ministère de l'Éducation Nationale.</p></div>
            </div>
          )}
        </div>)}

        {/* ═══ 2. IDENTITÉ ═══ */}
        {activeSection === 'identite' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Identité de l'École</h2>
          {/* Logo */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Logo</h3>
            <div className="flex items-center gap-5">
              <div className="w-28 h-28 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                {school?.logo && school.logo.length > 10 ? <img src={school.logo} alt="Logo" className="w-full h-full object-contain" /> : <span className="text-3xl font-bold text-gray-300">{school?.name?.[0] || '?'}</span>}
              </div>
              <div>
                <label className="bg-socrates-blue text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium inline-block">
                  Changer le logo
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files[0]; if (!file) return;
                    if (file.size > 500 * 1024) { alert('Max 500KB.'); return; }
                    const reader = new FileReader();
                    reader.onloadend = async () => { try { await updateDoc(doc(db, 'schools', school.id), { logo: reader.result }); setSchool({ ...school, logo: reader.result }); alert('Logo sauvegardé !'); } catch (err) { alert('Erreur: ' + err.message); } };
                    reader.readAsDataURL(file);
                  }} />
                </label>
                <p className="text-xs text-gray-400 mt-2">JPG, PNG — max 500KB</p>
              </div>
            </div>
          </div>
          {/* Infos Générales */}
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Informations Générales</h3>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht ? "Non lekòl la" : "Nom de l'école"} <span className="text-red-400">*</span></label><input type="text" value={val('schoolName', 'name')} onChange={e => set('schoolName', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Devise / Slogan</label><input type="text" value={val('slogan', 'slogan')} onChange={e => set('slogan', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Savoir, Discipline, Excellence" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Mission</label><textarea value={val('mission', 'mission')} onChange={e => set('mission', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base h-24 resize-none" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Année de fondation</label><input type="number" min="1800" max={new Date().getFullYear()} value={val('foundedYear', 'foundedYear')} onChange={e => set('foundedYear', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="1985" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Tip lekòl":"Type d'école"}</label>
                <select value={val('typeEcole', 'typeEcole')} onChange={e => set('typeEcole', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base">
                  <option value="">Sélectionner</option>
                  {['Publique', 'Privée Laïque', 'Privée Religieuse', 'Congréganiste', 'Communautaire'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Metòd pedagojik":"Méthode pédagogique"}</label>
              <select value={val('methodePedagogique', 'methodePedagogique')} onChange={e => set('methodePedagogique', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base">
                <option value="">Sélectionner</option>
                {['Traditionnelle', 'Montessori', 'Mixte (Montessori + Traditionnelle)', 'Bilingue', 'Autre'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">No. SIGE {!val('sige', 'sige') && <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Non renseigné</span>}</label><input type="text" value={val('sige', 'sige')} onChange={e => set('sige', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Numéro SIGE (optionnel)" /><p className="text-xs text-gray-400 mt-1">Système d'Information de Gestion de l'Éducation</p></div>
          </div>
          {/* Localisation */}
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><MapPin size={18} className="text-blue-500" />Localisation</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Depatman":"Département"} <span className="text-red-400">*</span></label>
                <select value={selectedDept} onChange={e => { set('departement', e.target.value); set('commune', ''); }} className="w-full px-4 py-3 border rounded-xl text-base">
                  <option value="">Sélectionner</option>
                  {HAITI_DEPARTEMENTS_COMMUNES && Object.keys(HAITI_DEPARTEMENTS_COMMUNES).sort().map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Komun":"Commune"} <span className="text-red-400">*</span></label>
                <select value={val('commune', 'commune')} onChange={e => set('commune', e.target.value)} disabled={!selectedDept} className="w-full px-4 py-3 border rounded-xl text-base disabled:bg-gray-100">
                  <option value="">{selectedDept ? (ht ? 'Chwazi' : 'Sélectionner') : (ht ? 'Depatman an premye' : "Département d'abord")}</option>
                  {communes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Adrès":"Adresse"} <span className="text-red-400">*</span></label><input type="text" value={val('address', 'address')} onChange={e => set('address', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Rue, quartier, repère" /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coordonnées GPS</label>
              <div className="flex items-center gap-2 flex-wrap">
                <button type="button" onClick={() => {
                  if (!navigator.geolocation) { alert('Non supporté.'); return; }
                  set('gpsLoading', true);
                  navigator.geolocation.getCurrentPosition(pos => {
                    const { latitude: lat, longitude: lng } = pos.coords;
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`).then(r => r.json()).then(data => {
                      if (!val('address', 'address')) set('address', data.display_name || '');
                      setFormData(f => ({ ...f, gpsLat: lat.toFixed(6), gpsLng: lng.toFixed(6), gpsLoading: false }));
                    }).catch(() => setFormData(f => ({ ...f, gpsLat: lat.toFixed(6), gpsLng: lng.toFixed(6), gpsLoading: false })));
                  }, () => { set('gpsLoading', false); alert("Position impossible."); });
                }} className="flex items-center gap-2 text-sm bg-blue-50 text-socrates-blue border border-blue-200 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition font-medium">
                  <MapPin size={16} /> {formData.gpsLoading ? 'Localisation...' : "📍 Localiser l'école"}
                </button>
                {val('gpsLat', 'gpsLat') && <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-xl flex items-center gap-1"><Check size={14} /> {val('gpsLat', 'gpsLat')}, {val('gpsLng', 'gpsLng')}</span>}
              </div>
              {val('gpsLat', 'gpsLat') && (
                <div className="mt-3 rounded-xl overflow-hidden border h-40">
                  <iframe title="map" width="100%" height="100%" frameBorder="0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(val('gpsLng', 'gpsLng')) - 0.005}%2C${parseFloat(val('gpsLat', 'gpsLat')) - 0.003}%2C${parseFloat(val('gpsLng', 'gpsLng')) + 0.005}%2C${parseFloat(val('gpsLat', 'gpsLat')) + 0.003}&layer=mapnik&marker=${val('gpsLat', 'gpsLat')}%2C${val('gpsLng', 'gpsLng')}`} />
                </div>
              )}
            </div>
          </div>
          {/* Contact & Réseaux */}
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Phone size={18} className="text-green-500" />Contact & Réseaux</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Telefòn":"Téléphone"} <span className="text-red-400">*</span></label><input type="tel" value={val('schoolPhone', 'phone')} onChange={e => set('schoolPhone', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="+509 XXXX XXXX" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={val('schoolEmail', 'email', user?.email || '')} onChange={e => set('schoolEmail', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label><input type="tel" value={val('whatsapp', 'whatsapp')} onChange={e => set('whatsapp', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="+509 XXXX XXXX" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Sit entènèt":"Site web"}</label><input type="url" value={val('website', 'website')} onChange={e => set('website', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="https://" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label><input type="text" value={val('facebook', 'facebook')} onChange={e => set('facebook', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="@monecole" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label><input type="text" value={val('instagram', 'instagram')} onChange={e => set('instagram', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="@monecole" /></div>
            </div>
          </div>
          <button onClick={saveSettings} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">{ht?'Anrejistre':'Sauvegarder'}</button>
        </div>)}

        {/* ═══ 3. DIRECTEUR ═══ */}
        {activeSection === 'directeur' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Directeur / Directrice</h2>
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom complet <span className="text-red-400">*</span></label><input type="text" value={val('directorName', 'directorName')} onChange={e => set('directorName', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Jean Baptiste" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <select value={val('directorTitle', 'directorTitle')} onChange={e => set('directorTitle', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base">
                  <option value="">Sélectionner</option>
                  {['Directeur', 'Directrice', 'Directeur Général', 'Pasteur-Directeur'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{ht?"Telefòn":"Téléphone"}</label><input type="tel" value={val('directorPhone', 'directorPhone')} onChange={e => set('directorPhone', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="+509 XXXX XXXX" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={val('directorEmail', 'directorEmail')} onChange={e => set('directorEmail', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>
            </div>
          </div>
          <button onClick={saveSettings} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">{ht?'Anrejistre':'Sauvegarder'}</button>
        </div>)}

        {/* ═══ 4. STRUCTURE ACADÉMIQUE ═══ */}
        {activeSection === 'structure' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Structure Académique</h2>
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Catégorie d'école</label>
                <select value={val('schoolType', 'schoolType')} onChange={e => set('schoolType', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base">
                  <option value="">Sélectionner</option>
                  {['Préscolaire', 'Primaire', 'Secondaire', 'Préscolaire-Primaire', 'Primaire-Secondaire', 'Complète', 'Technique', 'Universitaire'].map(t => <option key={t} value={t}>{t === 'Complète' ? 'École Complète' : t === 'Technique' ? 'Technique / Professionnel' : t}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Système secondaire</label>
                {['Secondaire', 'Primaire-Secondaire', 'Complète'].includes(val('schoolType', 'schoolType')) ? (
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    {['NS', 'Traditionnel'].map(sys => (
                      <button key={sys} type="button" onClick={() => set('secondarySystem', sys)} className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition ${val('secondarySystem', 'secondarySystem', 'NS') === sys ? 'bg-white shadow text-socrates-navy' : 'text-gray-500'}`}>
                        {sys === 'NS' ? 'NS (NS1-NS4)' : 'Trad. (Rhéto-Philo)'}
                      </button>
                    ))}
                  </div>
                ) : <p className="text-sm text-gray-400 px-4 py-3">Choisir catégorie avec secondaire</p>}
              </div>
            </div>
            {val('schoolType', 'schoolType') && !isCustomGradeType(val('schoolType', 'schoolType')) && (
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm font-medium text-blue-800 mb-2">Niveaux disponibles :</p>
                <div className="flex flex-wrap gap-2">{getGradeLevels(val('schoolType', 'schoolType')).map(g => (
                  <span key={g} className={`px-3 py-1 rounded-full text-sm border ${g === 'Philo' || g === 'NS4' ? 'bg-purple-100 text-purple-700 border-purple-200 font-medium' : 'bg-white text-blue-700 border-blue-200'}`}>{g}</span>
                ))}</div>
              </div>
            )}
            {isCustomGradeType(val('schoolType', 'schoolType')) && (<div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Programmes offerts</p>
              {val('programs', 'programs', []).length === 0 && <p className="text-gray-400 text-sm text-center py-3">Aucun programme.</p>}
              {val('programs', 'programs', []).map((p, i) => (
                <div key={i} className="border rounded-xl p-3 bg-gray-50 flex items-start justify-between gap-2">
                  <div><p className="font-medium text-sm">{p.name}</p><p className="text-xs text-gray-500">{p.duration} an{p.duration > 1 ? 's' : ''} • {p.domain || 'N/A'}</p></div>
                  <button type="button" onClick={() => { const l = [...val('programs', 'programs', [])]; l.splice(i, 1); set('programs', l); }} className="text-red-400 hover:text-red-600 p-1"><X size={16} /></button>
                </div>
              ))}
              {formData.showAddProgram ? (
                <div className="border border-blue-200 rounded-xl p-4 bg-blue-50 space-y-3">
                  <input type="text" placeholder="Nom du programme" value={formData.newProgName || ''} onChange={e => set('newProgName', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Domaine" value={formData.newProgDomain || ''} onChange={e => set('newProgDomain', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                    <select value={formData.newProgDuration || '1'} onChange={e => set('newProgDuration', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm">{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} an{n>1?'s':''}</option>)}</select>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { if (!formData.newProgName) { alert('Nom requis.'); return; } setFormData({...formData, programs: [...val('programs','programs',[]), {name:formData.newProgName,domain:formData.newProgDomain||'',duration:parseInt(formData.newProgDuration||1)}], showAddProgram:false, newProgName:'', newProgDomain:'', newProgDuration:'1'}); }} className="flex-1 bg-socrates-blue text-white py-2 rounded-xl text-sm font-medium">{ht?"Ajoute":"Ajouter"}</button>
                    <button type="button" onClick={() => set('showAddProgram', false)} className="flex-1 bg-gray-200 py-2 rounded-xl text-sm">Annuler</button>
                  </div>
                </div>
              ) : <button type="button" onClick={() => set('showAddProgram', true)} className="w-full border-2 border-dashed border-blue-200 text-socrates-blue py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"><Plus size={16} />{ht?"Ajoute yon pwogram":"Ajouter un programme"}</button>}
            </div>)}
          </div>
          <button onClick={saveSettings} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">{ht?'Anrejistre':'Sauvegarder'}</button>
        </div>)}

        {/* ═══ 5. ENSEIGNANTS ═══ */}
        {activeSection === 'enseignants' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Corps Enseignant</h2>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="space-y-2 mb-3">
              {teachers.length === 0 && <p className="text-gray-400 text-sm text-center py-6">Aucun enseignant.</p>}
              {teachers.map(t => (
                <div key={t.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">{t.firstName?.[0]}{t.lastName?.[0]}</div>
                  <div className="flex-1 min-w-0"><p className="font-medium text-sm">{t.firstName} {t.lastName}</p><p className="text-xs text-gray-500">{t.subject || 'N/A'}</p></div>
                  <button type="button" onClick={async () => { if (window.confirm('Supprimer ?')) { await deleteDoc(doc(db, 'schools', school.id, 'teachers', t.id)); loadAllData(); }}} className="text-red-400 hover:text-red-600 p-1"><X size={16} /></button>
                </div>
              ))}
            </div>
            {formData.showAddTeacher ? (
              <div className="border border-teal-200 rounded-xl p-4 bg-teal-50 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Prénom" value={formData.newTeacherFirst || ''} onChange={e => set('newTeacherFirst', e.target.value)} className="px-3 py-2 border rounded-xl text-sm" />
                  <input type="text" placeholder="Nom" value={formData.newTeacherLast || ''} onChange={e => set('newTeacherLast', e.target.value)} className="px-3 py-2 border rounded-xl text-sm" />
                </div>
                <input type="text" placeholder="Matière" value={formData.newTeacherSubject || ''} onChange={e => set('newTeacherSubject', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                <div className="flex gap-2">
                  <button type="button" onClick={async () => { if (!formData.newTeacherFirst||!formData.newTeacherLast) {alert('Requis.');return;} await addDoc(collection(db,'schools',school.id,'teachers'),{firstName:formData.newTeacherFirst,lastName:formData.newTeacherLast,subject:formData.newTeacherSubject||''}); setFormData({...formData,showAddTeacher:false,newTeacherFirst:'',newTeacherLast:'',newTeacherSubject:''}); loadAllData(); }} className="flex-1 bg-teal-600 text-white py-2 rounded-xl text-sm font-medium">{ht?"Ajoute":"Ajouter"}</button>
                  <button type="button" onClick={() => set('showAddTeacher', false)} className="flex-1 bg-gray-200 py-2 rounded-xl text-sm">Annuler</button>
                </div>
              </div>
            ) : <button type="button" onClick={() => set('showAddTeacher', true)} className="w-full border-2 border-dashed border-teal-200 text-teal-600 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"><Plus size={16} />Ajouter un enseignant</button>}
          </div>
        </div>)}

        {/* ═══ 6. CLASSES ═══ */}
        {activeSection === 'classes' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Classes</h2>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="space-y-2 mb-3">
              {classes.length === 0 && <p className="text-gray-400 text-sm text-center py-6">Aucune classe.</p>}
              {classes.map(c => (
                <div key={c.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-sm font-bold">{c.name?.[0]}</div>
                  <div className="flex-1"><p className="font-medium text-sm">{c.name}</p><p className="text-xs text-gray-500">{teachers.find(t => t.id === c.teacherId)?.firstName || 'Sans enseignant'}{(c.teacherIds || []).length > 1 ? ` + ${(c.teacherIds || []).length - 1}` : ''} • {c.room || ''}</p></div>
                  <button type="button" onClick={async () => { if (window.confirm('Supprimer ?')) { await deleteDoc(doc(db, 'schools', school.id, 'classes', c.id)); loadAllData(); }}} className="text-red-400 hover:text-red-600 p-1"><X size={16} /></button>
                </div>
              ))}
            </div>
            {formData.showAddClass ? (
              <div className="border border-cyan-200 rounded-xl p-4 bg-cyan-50 space-y-3">
                <input type="text" placeholder="Nom de la classe" value={formData.newClassName || ''} onChange={e => set('newClassName', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <select value={formData.newClassGrade || ''} onChange={e => set('newClassGrade', e.target.value)} className="px-3 py-2 border rounded-xl text-sm"><option value="">Niveau</option>{val('schoolType','schoolType') && !isCustomGradeType(val('schoolType','schoolType')) && getGradeLevels(val('schoolType','schoolType')).map(g => <option key={g} value={g}>{g}</option>)}</select>
                  <select value={formData.newClassTeacher || ''} onChange={e => set('newClassTeacher', e.target.value)} className="px-3 py-2 border rounded-xl text-sm"><option value="">Enseignant</option>{teachers.map(t => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}</select>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={async () => { if (!formData.newClassName) {alert('Nom requis.');return;} await addDoc(collection(db,'schools',school.id,'classes'),{name:formData.newClassName,gradeLevel:formData.newClassGrade||'',teacherId:formData.newClassTeacher||'',room:''}); setFormData({...formData,showAddClass:false,newClassName:'',newClassGrade:'',newClassTeacher:''}); loadAllData(); }} className="flex-1 bg-cyan-600 text-white py-2 rounded-xl text-sm font-medium">{ht?"Ajoute":"Ajouter"}</button>
                  <button type="button" onClick={() => set('showAddClass', false)} className="flex-1 bg-gray-200 py-2 rounded-xl text-sm">Annuler</button>
                </div>
              </div>
            ) : <button type="button" onClick={() => set('showAddClass', true)} className="w-full border-2 border-dashed border-cyan-200 text-cyan-600 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"><Plus size={16} />Ajouter une classe</button>}
          </div>
        </div>)}

        {/* ═══ MATIÈRES ═══ */}
        {activeSection === 'matieres' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Matières & {ht?"Koefisyan":"Coefficient"}s</h2>
          <p className="text-sm text-gray-500">Définissez les matières enseignées et leur poids pour le calcul des moyennes et bulletins.</p>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="space-y-2">
              {(val('subjects','subjects',[]) || []).length === 0 && <p className="text-gray-400 text-sm text-center py-6">Aucune matière configurée. Utilisez les boutons ci-dessous pour ajouter.</p>}
              {(val('subjects','subjects',[]) || []).map((subj, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm font-bold">{subj.coefficient || 1}</div>
                  <div className="flex-1"><p className="font-medium text-sm">{subj.name}</p><p className="text-xs text-gray-400">{ht?"Koefisyan":"Coefficient"}: {subj.coefficient || 1}</p></div>
                  <input type="number" min="1" max="10" value={subj.coefficient || 1} onChange={e => { const subs = [...(val('subjects','subjects',[]) || [])]; subs[i] = { ...subs[i], coefficient: parseInt(e.target.value) || 1 }; set('subjects', subs); }} className="w-16 px-2 py-1.5 border rounded-lg text-center text-sm font-bold" />
                  <button type="button" onClick={() => { const subs = [...(val('subjects','subjects',[]) || [])]; subs.splice(i, 1); set('subjects', subs); }} className="text-red-400 hover:text-red-600 p-1"><X size={16} /></button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3">📚 Matières courantes — Ajouter rapidement</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Français', coefficient: 4 }, { name: 'Mathématiques', coefficient: 4 },
                { name: 'Sciences Expérimentales', coefficient: 3 }, { name: 'Sciences Sociales', coefficient: 3 },
                { name: 'Anglais', coefficient: 2 }, { name: 'Espagnol', coefficient: 2 },
                { name: 'Créole', coefficient: 2 }, { name: 'Éducation Physique', coefficient: 1 },
                { name: 'Musique / Art', coefficient: 1 }, { name: 'Informatique', coefficient: 2 },
                { name: 'Éducation Civique', coefficient: 1 }, { name: 'Religion / Morale', coefficient: 1 },
                { name: 'Philosophie', coefficient: 3 }, { name: 'Physique', coefficient: 3 },
                { name: 'Chimie', coefficient: 3 }, { name: 'Biologie', coefficient: 3 },
              ].filter(d => !(val('subjects','subjects',[]) || []).some(s => s.name === d.name)).map(d => (
                <button key={d.name} type="button" onClick={() => { const subs = [...(val('subjects','subjects',[]) || []), d]; set('subjects', subs); }} className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-medium hover:bg-amber-100 transition">
                  + {d.name} ({d.coefficient})
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3">➕ {ht?"Ajoute yon matyè":"Ajouter une matière"} personnalisée</h3>
            <div className="flex gap-2">
              <input type="text" value={formData.newSubjectName || ''} onChange={e => set('newSubjectName', e.target.value)} className="flex-1 px-3 py-2.5 border rounded-xl text-sm" placeholder={ht ? "Non matyè a" : "Nom de la matière"} />
              <input type="number" min="1" max="10" value={formData.newSubjectCoeff || ''} onChange={e => set('newSubjectCoeff', e.target.value)} className="w-20 px-3 py-2.5 border rounded-xl text-sm text-center" placeholder="Coeff" />
              <button type="button" onClick={() => { if (!formData.newSubjectName?.trim()) return; const subs = [...(val('subjects','subjects',[]) || []), { name: formData.newSubjectName.trim(), coefficient: parseInt(formData.newSubjectCoeff) || 1 }]; set('subjects', subs); set('newSubjectName', ''); set('newSubjectCoeff', ''); }} className="px-4 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-medium"><Plus size={16} /></button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3">🎓 {ht?"Sèy pwomosyon":"Seuil de promotion"}</h3>
            <p className="text-xs text-gray-400 mb-3">Moyenne annuelle minimum pour passer à la classe supérieure</p>
            <div className="flex items-center gap-3">
              <input type="number" min="0" max="100" value={val('promotionThreshold', 'promotionThreshold', 50)} onChange={e => set('promotionThreshold', parseInt(e.target.value) || 50)} className="w-24 px-3 py-2.5 border rounded-xl text-center text-lg font-bold" />
              <span className="text-gray-500">/ 100</span>
            </div>
          </div>
          <button onClick={saveSettings} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">{ht?'Anrejistre':'Sauvegarder'}</button>
        </div>)}

        {/* ═══ 7. ÉLÈVES ═══ */}
        {activeSection === 'eleves' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Élèves</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">La gestion des élèves se fait dans l'onglet <strong>Élèves</strong> du menu principal.</p>
            <p className="text-sm text-gray-400">{students.length} élève{students.length !== 1 ? 's' : ''} inscrit{students.length !== 1 ? 's' : ''}</p>
          </div>
        </div>)}

        {/* ═══ 8. PERSONNEL ═══ */}
        {activeSection === 'personnel' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Personnel Administratif</h2>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="space-y-2 mb-3">
              {val('adminStaff','adminStaff',[]).length === 0 && <p className="text-gray-400 text-sm text-center py-6">Aucun personnel.</p>}
              {val('adminStaff','adminStaff',[]).map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold">{s.firstName?.[0]}{s.lastName?.[0]}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{s.firstName} {s.lastName}</p>
                    <p className="text-xs text-violet-600">{s.role}</p>
                    {/* ── CHANGE 1: show salary if set ── */}
                    {s.annualSalary > 0 && (
                      <p className="text-xs text-green-600 font-medium">
                        HTG {parseFloat(s.annualSalary).toLocaleString()} / {ht ? 'an' : 'an'}
                        <span className="text-gray-400 font-normal"> • HTG {(parseFloat(s.annualSalary)/10).toLocaleString()} / {ht ? 'mwa' : 'mois'}</span>
                      </p>
                    )}
                  </div>
                  <button type="button" onClick={() => { const l = [...val('adminStaff','adminStaff',[])]; l.splice(i,1); set('adminStaff',l); }} className="text-red-400 hover:text-red-600 p-1"><X size={16} /></button>
                </div>
              ))}
            </div>
            {formData.showAddStaff ? (
              <div className="border border-violet-200 rounded-xl p-4 bg-violet-50 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Prénom" value={formData.newStaffFirst || ''} onChange={e => set('newStaffFirst', e.target.value)} className="px-3 py-2 border rounded-xl text-sm" />
                  <input type="text" placeholder="Nom" value={formData.newStaffLast || ''} onChange={e => set('newStaffLast', e.target.value)} className="px-3 py-2 border rounded-xl text-sm" />
                </div>
                <select value={formData.newStaffRole || ''} onChange={e => set('newStaffRole', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm">
                  <option value="">Fonction</option>
                  {['Secrétaire','Comptable','Surveillant(e)','Agent de sécurité',"Personnel d'entretien",'Bibliothécaire','Infirmier(ère)','Chauffeur','Autre'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {/* ── CHANGE 2: salary input ── */}
                <input
                  type="number"
                  min="0"
                  placeholder={ht ? "Salè anyèl HTG (opsyonèl)" : "Salaire annuel HTG (optionnel)"}
                  value={formData.newStaffSalary || ''}
                  onChange={e => set('newStaffSalary', e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
                {formData.newStaffSalary > 0 && (
                  <p className="text-xs text-green-600 text-center">
                    HTG {(parseFloat(formData.newStaffSalary)/10).toLocaleString()} / {ht ? 'mwa' : 'mois'}
                  </p>
                )}
                <div className="flex gap-2">
                  {/* ── CHANGE 3: save with id + annualSalary ── */}
                  <button type="button" onClick={() => {
                    if (!formData.newStaffFirst || !formData.newStaffLast || !formData.newStaffRole) { alert('Requis.'); return; }
                    const newMember = {
                      id: `staff_${Date.now()}`,
                      firstName: formData.newStaffFirst,
                      lastName: formData.newStaffLast,
                      role: formData.newStaffRole,
                      annualSalary: parseFloat(formData.newStaffSalary) || 0,
                    };
                    setFormData({...formData,
                      adminStaff: [...val('adminStaff','adminStaff',[]), newMember],
                      showAddStaff: false, newStaffFirst: '', newStaffLast: '', newStaffRole: '', newStaffSalary: ''
                    });
                  }} className="flex-1 bg-violet-600 text-white py-2 rounded-xl text-sm font-medium">{ht?"Ajoute":"Ajouter"}</button>
                  <button type="button" onClick={() => set('showAddStaff', false)} className="flex-1 bg-gray-200 py-2 rounded-xl text-sm">Annuler</button>
                </div>
              </div>
            ) : <button type="button" onClick={() => set('showAddStaff', true)} className="w-full border-2 border-dashed border-violet-200 text-violet-600 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"><Plus size={16} />{ht?"Ajoute":"Ajouter"}</button>}
          </div>
          <button onClick={saveSettings} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">{ht?'Anrejistre':'Sauvegarder'}</button>
        </div>)}

        {/* ═══ 9. VIE SCOLAIRE ═══ */}
        {activeSection === 'viescolaire' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Vie Scolaire & Services</h2>
          <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Infos Pratiques</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Capacité / classe</label><input type="number" min="0" value={val('capacity','capacity')} onChange={e => set('capacity', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Accréditation</label><input type="text" value={val('accreditation','accreditation')} onChange={e => set('accreditation', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Langues</label>
              <div className="flex flex-wrap gap-2">{['Français','Créole','Anglais','Espagnol'].map(lng => { const langs = val('languages','languages',[]); const sel = langs.includes(lng); return (<button key={lng} type="button" onClick={() => set('languages', sel ? langs.filter(l=>l!==lng) : [...langs,lng])} className={`px-4 py-2 rounded-full text-sm font-medium border transition ${sel ? 'bg-socrates-blue text-white border-socrates-blue' : 'bg-white text-gray-600 border-gray-300'}`}>{lng}</button>); })}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Début année</label><input type="date" value={val('yearStart','yearStart')} onChange={e => set('yearStart', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Fin année</label><input type="date" value={val('yearEnd','yearEnd')} onChange={e => set('yearEnd', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Services</h3>
            <div className="grid grid-cols-2 gap-3">
              {[{key:'hasUniform',label:'Uniforme',icon:'👔'},{key:'hasCafeteria',label:'Cantine',icon:'🍽️'},{key:'hasTransport',label:'Transport',icon:'🚌'},{key:'hasInternet',label:'Internet',icon:'📶'}].map(({key,label,icon}) => (
                <label key={key} onClick={() => set(key, !val(key,key,false))} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${val(key,key,false) ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}>
                  <span className="text-xl">{icon}</span><span className="text-sm font-medium text-gray-700 flex-1">{label}</span>
                  <div className={`w-10 h-6 rounded-full transition flex-shrink-0 ${val(key,key,false) ? 'bg-socrates-blue' : 'bg-gray-300'}`}><div className={`w-6 h-6 bg-white rounded-full shadow transition transform ${val(key,key,false) ? 'translate-x-4' : 'translate-x-0'}`} /></div>
                </label>
              ))}
            </div>
            {val('hasUniform','hasUniform',false) && <div className="mt-3"><input type="text" placeholder="Description uniforme" value={val('uniformDesc','uniformDesc')} onChange={e => set('uniformDesc', e.target.value)} className="w-full px-4 py-3 border rounded-xl text-base" /></div>}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Activités Parascolaires</h3>
            <div className="space-y-2 mb-3">
              {val('activities','activities',[]).length === 0 && <p className="text-gray-400 text-sm text-center py-4">Aucune activité.</p>}
              {val('activities','activities',[]).map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm font-bold">{a.name?.[0]}</div>
                  <div className="flex-1"><p className="font-medium text-sm">{a.name}</p><p className="text-xs text-gray-500">{a.description||''}</p></div>
                  <button type="button" onClick={() => { const l = [...val('activities','activities',[])]; l.splice(i,1); set('activities',l); }} className="text-red-400 hover:text-red-600 p-1"><X size={16} /></button>
                </div>
              ))}
            </div>
            {formData.showAddActivity ? (
              <div className="border border-orange-200 rounded-xl p-4 bg-orange-50 space-y-3">
                <input type="text" placeholder="Nom" value={formData.newActivityName||''} onChange={e => set('newActivityName', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                <input type="text" placeholder="Description" value={formData.newActivityDesc||''} onChange={e => set('newActivityDesc', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                <div className="flex gap-2">
                  <button type="button" onClick={() => { if (!formData.newActivityName) {alert('Nom requis.');return;} setFormData({...formData, activities:[...val('activities','activities',[]),{name:formData.newActivityName,description:formData.newActivityDesc||''}], showAddActivity:false, newActivityName:'', newActivityDesc:''}); }} className="flex-1 bg-orange-500 text-white py-2 rounded-xl text-sm font-medium">{ht?"Ajoute":"Ajouter"}</button>
                  <button type="button" onClick={() => set('showAddActivity', false)} className="flex-1 bg-gray-200 py-2 rounded-xl text-sm">Annuler</button>
                </div>
              </div>
            ) : <button type="button" onClick={() => set('showAddActivity', true)} className="w-full border-2 border-dashed border-orange-200 text-orange-500 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"><Plus size={16} />{ht?"Ajoute":"Ajouter"}</button>}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Contrôle Accès Parent</h3>
            <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50" onClick={() => set('blockParentOnDebt', !val('blockParentOnDebt','blockParentOnDebt',false))}>
              <div><p className="font-medium text-gray-800">Bloquer si solde impayé</p><p className="text-sm text-gray-500">Les parents ne pourront pas accéder au portail</p></div>
              <div className={`w-14 h-7 rounded-full transition ${val('blockParentOnDebt','blockParentOnDebt',false) ? 'bg-red-500' : 'bg-gray-300'}`}><div className={`w-7 h-7 bg-white rounded-full shadow transition transform ${val('blockParentOnDebt','blockParentOnDebt',false) ? 'translate-x-7' : 'translate-x-0'}`} /></div>
            </label>
          </div>
          <button onClick={saveSettings} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">{ht?'Anrejistre':'Sauvegarder'}</button>
        </div>)}

        {/* ═══ 10. FINANCES ═══ */}
        {activeSection === 'finances' && (<div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">Finances — Frais de Scolarité</h2>
          {val('schoolType','schoolType') && !isCustomGradeType(val('schoolType','schoolType')) && (<div className="space-y-3">
            {FEE_CYCLES.filter(cycle => { const levels = getGradeLevels(val('schoolType','schoolType')); return cycle.levels.some(l => levels.includes(l)); }).map(cycle => {
              const fees = val('levelFees','levelFees',{}); const tuition = fees[cycle.key]?.tuition ?? ''; const frais = fees[cycle.key]?.frais ?? '';
              return (<div key={cycle.key} className={`bg-white rounded-2xl shadow-lg p-5 ${cycle.key === 'philo' ? 'border-2 border-purple-200' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div><p className={`font-semibold text-sm ${cycle.key === 'philo' ? 'text-purple-800' : 'text-gray-800'}`}>📘 {cycle.label}</p><p className="text-xs text-gray-400 mt-0.5">{cycle.levels.filter(l => getGradeLevels(val('schoolType','schoolType')).includes(l)).join(', ')}</p></div>
                  {cycle.key === 'philo' && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Tarif spécial</span>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-gray-500 mb-1">Scolarité annuelle (HTG)</label><input type="number" min="0" value={tuition} onChange={e => { const lf={...val('levelFees','levelFees',{})}; lf[cycle.key]={...(lf[cycle.key]||{}),tuition:e.target.value}; set('levelFees',lf); }} className="w-full px-3 py-2.5 border rounded-xl text-sm" placeholder="0" /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">Frais divers (HTG)</label><input type="number" min="0" value={frais} onChange={e => { const lf={...val('levelFees','levelFees',{})}; lf[cycle.key]={...(lf[cycle.key]||{}),frais:e.target.value}; set('levelFees',lf); }} className="w-full px-3 py-2.5 border rounded-xl text-sm" placeholder="0" /></div>
                </div>
                {tuition > 0 && <div className="flex justify-between items-center mt-3 bg-gray-50 rounded-lg px-3 py-2 text-sm"><span className="text-gray-500">Total</span><span className="font-bold">HTG {(parseFloat(tuition)+parseFloat(frais||0)).toFixed(0)}</span><span className="text-gray-500">Mensuel</span><span className="font-bold text-socrates-blue">HTG {(parseFloat(tuition)/10).toFixed(0)}</span></div>}
              </div>);
            })}
          </div>)}
          {isCustomGradeType(val('schoolType','schoolType')) && val('programs','programs',[]).length > 0 && (<div className="space-y-4">
            {val('programs','programs',[]).map((p, pi) => (
              <div key={pi} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-socrates-navy text-white px-5 py-3"><p className="font-semibold">{p.name}</p><p className="text-xs opacity-75">{p.domain||''} • {p.duration} an{p.duration>1?'s':''}</p></div>
                <div className="divide-y">{Array.from({length:parseInt(p.duration)||1},(_,y) => { const feeKey=`prog_${pi}_y${y}`; const fees=val('levelFees','levelFees',{}); return (
                  <div key={y} className="p-4"><p className="text-sm font-medium text-gray-700 mb-2">Année {y+1}</p><div className="grid grid-cols-2 gap-2">
                    <div><label className="block text-xs text-gray-500 mb-1">Scolarité (HTG)</label><input type="number" min="0" value={fees[feeKey]?.tuition??''} onChange={e => { const lf={...fees}; lf[feeKey]={...(lf[feeKey]||{}),tuition:e.target.value}; set('levelFees',lf); }} className="w-full px-3 py-2 border rounded-xl text-sm" /></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Frais (HTG)</label><input type="number" min="0" value={fees[feeKey]?.frais??''} onChange={e => { const lf={...fees}; lf[feeKey]={...(lf[feeKey]||{}),frais:e.target.value}; set('levelFees',lf); }} className="w-full px-3 py-2 border rounded-xl text-sm" /></div>
                  </div></div>
                ); })}</div>
              </div>
            ))}
          </div>)}
          {!val('schoolType','schoolType') && (<div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <DollarSign size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Définissez d'abord la <strong>Structure Académique</strong> pour configurer les frais.</p>
          </div>)}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-1">⚠️ Signalement automatique — Impayés</h3>
            <p className="text-xs text-gray-400 mb-3">Signaler automatiquement les élèves en retard de paiement.</p>
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Seuil :</label>
              <select value={val('overdueThreshold','overdueThreshold','2')} onChange={e => set('overdueThreshold', e.target.value)} className="px-3 py-2.5 border rounded-xl text-sm flex-1">
                <option value="1">1 mois de retard</option>
                <option value="2">2 mois de retard</option>
                <option value="3">3 mois de retard</option>
                <option value="4">4 mois de retard</option>
                <option value="5">5 mois de retard</option>
              </select>
            </div>
          </div>
          <button onClick={saveSettings} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">{ht?'Anrejistre':'Sauvegarder'}</button>
        </div>)}

      </div>
    </div>
  );
}
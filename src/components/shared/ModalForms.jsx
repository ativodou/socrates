import React, { useState, useEffect } from 'react';
import { X, Plus, User, BookOpen, DollarSign, Users as UsersIcon, Camera, Phone } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';
import Modal from '../shared/Modal';

export default function ModalForms({ modalType, editItem, onClose, initialData }) {
  const {
    school, students, teachers, classes,
    saveStudent, saveTeacher, saveClass, savePeriod,
    savePayment, saveTeacherPayment, saveExpense,
    getStudentBalance, getTeacherBalance, getMonthlySalary,
    getGradeLevels, isCustomGradeType, isUpperCycle, FEE_CYCLES,
    isAdultSchool, isPrescolaireOnly,
  } = useSchool();
  const { t, lang } = useLang();
  const ht = lang === 'ht';

  const [formData, setFormData] = useState({});
  const [studentTab, setStudentTab] = useState('info');

  const adult = isAdultSchool();
  const prescoOnly = isPrescolaireOnly();
  const programs = school?.programs || [];

  useEffect(() => {
    if (editItem) setFormData({ ...editItem });
    else if (initialData) setFormData({ ...initialData });
    else if (modalType === 'student') setFormData({ gender: '', parentAccessEnabled: true });
    else setFormData({});
    setStudentTab('info');
  }, [editItem, modalType, initialData]);

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (modalType) {
        case 'student': await saveStudent(formData, editItem?.id); break;
        case 'teacher': await saveTeacher(formData, editItem?.id); break;
        case 'class': await saveClass(formData, editItem?.id); break;
        case 'period': await savePeriod(formData, editItem?.id); break;
        case 'payment': await savePayment(formData, editItem?.id); break;
        case 'teacherPayment': await saveTeacherPayment(formData, editItem?.id); break;
        case 'expense': await saveExpense(formData, editItem?.id); break;
      }
      onClose();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  // Auto-fill fees: cycle-based for standard, program-based for Technique/Universitaire
  const handleGradeLevelChange = (level) => {
    const lf = school?.levelFees || {};
    const cycle = FEE_CYCLES.find(c => c.levels.includes(level));
    const cycleFees = cycle ? lf[cycle.key] : null;
    if (!editItem || !formData.annualTuition) {
      setFormData(prev => ({ ...prev, gradeLevel: level, annualTuition: cycleFees?.tuition || school?.defaultAnnualTuition || '', fraisDivers: cycleFees?.frais || school?.defaultFraisDivers || '' }));
    } else { set('gradeLevel', level); }
  };

  const handleProgramChange = (progIndex, year) => {
    const lf = school?.levelFees || {};
    const feeKey = `prog_${progIndex}_y${year}`;
    const fees = lf[feeKey] || {};
    const prog = programs[progIndex];
    const label = `${prog?.name || ''} — Année ${parseInt(year) + 1}`;
    setFormData(prev => ({
      ...prev,
      programIndex: progIndex,
      programYear: year,
      gradeLevel: label,
      annualTuition: fees.tuition || prev.annualTuition || '',
      fraisDivers: fees.frais || prev.fraisDivers || '',
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500000) { alert('Photo trop volumineuse (max 500KB)'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => set('photo', ev.target.result);
    reader.readAsDataURL(file);
  };

  const addBook = () => set('books', [...(formData.books || []), { title: '', author: '', isbn: '' }]);
  const updateBook = (i, field, value) => { const books = [...(formData.books || [])]; books[i] = { ...books[i], [field]: value }; set('books', books); };
  const removeBook = (i) => { const books = [...(formData.books || [])]; books.splice(i, 1); set('books', books); };

  const entityLabel = adult ? 'Étudiant' : 'Élève';
  const title = `${editItem ? (ht?'Modifye':'Modifier') : (ht?'Ajoute':'Ajouter')} ${
    modalType === 'student' ? entityLabel :
    modalType === 'teacher' ? (adult ? 'Professeur' : 'Enseignant') :
    modalType === 'class' ? (prescoOnly ? 'Section' : 'Classe') :
    modalType === 'period' ? 'Période' :
    modalType === 'payment' ? 'Paiement' :
    modalType === 'teacherPayment' ? `Paiement ${adult ? 'Professeur' : 'Enseignant'}` :
    modalType === 'expense' ? 'Dépense' : ''
  }`;

  const inputCls = "w-full px-4 py-3 border rounded-xl text-base focus:ring-2 focus:ring-socrates-blue/20 focus:border-socrates-blue transition";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";

  // Student tabs: adapt for adult schools
  const studentTabs = adult
    ? [
        { id: 'info', label: 'Identité', icon: User },
        { id: 'academic', label: 'Programme', icon: BookOpen },
        { id: 'financial', label: 'Finances', icon: DollarSign },
        { id: 'contact', label: 'Contact', icon: Phone },
      ]
    : [
        { id: 'info', label: 'Identité', icon: User },
        { id: 'academic', label: 'Académique', icon: BookOpen },
        { id: 'financial', label: 'Finances', icon: DollarSign },
        { id: 'parent', label: 'Parent', icon: UsersIcon },
      ];

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ═══ STUDENT ═══ */}
        {modalType === 'student' && (<>
          <div className="flex bg-gray-100 rounded-xl p-1 -mt-1">
            {studentTabs.map(tab => (
              <button key={tab.id} type="button" onClick={() => setStudentTab(tab.id)} className={`flex-1 py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${studentTab === tab.id ? 'bg-white shadow text-socrates-navy' : 'text-gray-500'}`}>
                <tab.icon size={14} />{tab.label}
              </button>
            ))}
          </div>

          {/* ── Identité ── */}
          {studentTab === 'info' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  {formData.photo ? <img src={formData.photo} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                    : <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center"><Camera size={24} className="text-gray-300" /></div>}
                  <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-socrates-blue text-white rounded-full flex items-center justify-center cursor-pointer shadow"><Camera size={14} /><input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" /></label>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>{ht?'Prenon ':'Prénom '}<span className="text-red-400">*</span></label><input type="text" required value={formData.firstName || ''} onChange={e => set('firstName', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Nom <span className="text-red-400">*</span></label><input type="text" required value={formData.lastName || ''} onChange={e => set('lastName', e.target.value)} className={inputCls} /></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Sexe</label><select value={formData.gender || ''} onChange={e => set('gender', e.target.value)} className={inputCls}><option value="">Sélectionner</option><option value="M">Masculin</option><option value="F">Féminin</option></select></div>
                <div><label className={labelCls}>{ht?'Dat nesans':'Date de naissance'}</label><input type="date" value={formData.dateOfBirth || ''} onChange={e => set('dateOfBirth', e.target.value)} className={inputCls} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>{ht?'Kote ou fèt':'Lieu de naissance'}</label><input type="text" value={formData.birthPlace || ''} onChange={e => set('birthPlace', e.target.value)} className={inputCls} placeholder="Port-au-Prince" /></div>
                <div><label className={labelCls}>{ht?'Nasyonalite':'Nationalité'}</label><input type="text" value={formData.nationality || ''} onChange={e => set('nationality', e.target.value)} className={inputCls} placeholder="Haïtienne" /></div>
              </div>
              <div><label className={labelCls}>Adresse</label><input type="text" value={formData.address || ''} onChange={e => set('address', e.target.value)} className={inputCls} /></div>
              {!adult && (
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>{ht?'Gwoup sangen':'Groupe sanguin'}</label><select value={formData.bloodType || ''} onChange={e => set('bloodType', e.target.value)} className={inputCls}><option value="">—</option>{['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                  <div><label className={labelCls}>{ht?'Alèji / Kondisyon':'Allergies / Conditions'}</label><input type="text" value={formData.medicalNotes || ''} onChange={e => set('medicalNotes', e.target.value)} className={inputCls} placeholder="Aucune" /></div>
                </div>
              )}
              {adult && (
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>NIF</label><input type="text" value={formData.nif || ''} onChange={e => set('nif', e.target.value)} className={inputCls} placeholder="ID fiscale" /></div>
                  <div><label className={labelCls}>Profession</label><input type="text" value={formData.profession || ''} onChange={e => set('profession', e.target.value)} className={inputCls} /></div>
                </div>
              )}
            </div>
          )}

          {/* ── Académique / Programme ── */}
          {(studentTab === 'academic') && (
            <div className="space-y-4">
              {/* Technique/Universitaire: program + year selector */}
              {adult && programs.length > 0 ? (<>
                <div><label className={labelCls}>Programme <span className="text-red-400">*</span></label>
                  <select value={formData.programIndex ?? ''} onChange={e => {
                    const pi = e.target.value;
                    set('programIndex', pi);
                    set('programYear', '');
                    set('gradeLevel', programs[pi]?.name || '');
                  }} className={inputCls}>
                    <option value="">Sélectionner un programme</option>
                    {programs.map((p, i) => <option key={i} value={i}>{p.name} — {p.domain || ''} ({p.duration} an{p.duration > 1 ? 's' : ''})</option>)}
                  </select>
                </div>
                {formData.programIndex !== '' && formData.programIndex !== undefined && (
                  <div><label className={labelCls}>Année d'études</label>
                    <select value={formData.programYear ?? ''} onChange={e => handleProgramChange(formData.programIndex, e.target.value)} className={inputCls}>
                      <option value="">Sélectionner</option>
                      {Array.from({ length: parseInt(programs[formData.programIndex]?.duration || 1) }, (_, y) => (
                        <option key={y} value={y}>Année {y + 1}</option>
                      ))}
                    </select>
                  </div>
                )}
                {formData.programYear !== '' && formData.programYear !== undefined && (
                  <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-blue-700 font-medium">💡 Frais pré-remplis pour <strong>{formData.gradeLevel}</strong>. Ajustez dans l'onglet Finances si nécessaire.</p></div>
                )}
              </>) : adult && programs.length === 0 ? (
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-orange-700">Aucun programme défini. Configurez vos programmes dans <strong>Paramètres → Structure</strong>.</p>
                </div>
              ) : (
                /* Standard schools: grade level selector */
                <>
                  <div><label className={labelCls}>Niveau <span className="text-red-400">*</span></label>
                    <select value={formData.gradeLevel || ''} onChange={e => handleGradeLevelChange(e.target.value)} className={inputCls}>
                      <option value="">Sélectionner</option>
                      {getGradeLevels(school?.schoolType).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  {formData.gradeLevel && <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-blue-700 font-medium">💡 Frais pré-remplis selon le cycle <strong>{FEE_CYCLES.find(c => c.levels.includes(formData.gradeLevel))?.label || formData.gradeLevel}</strong>. Ajustez dans l'onglet Finances si nécessaire.</p></div>}
                </>
              )}

              <div><label className={labelCls}>{prescoOnly ? 'Sections' : 'Classes'}</label>
                <div className="border rounded-xl p-3 max-h-40 overflow-y-auto space-y-1">
                  {classes.length > 0 ? classes.map(cls => (
                    <label key={cls.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" checked={formData.enrolledClasses?.includes(cls.id) || false} onChange={e => { const c = formData.enrolledClasses || []; set('enrolledClasses', e.target.checked ? [...c, cls.id] : c.filter(id => id !== cls.id)); }} className="w-5 h-5 rounded" />
                      <span className="text-sm">{cls.name}</span>{cls.gradeLevel && <span className="text-xs text-gray-400 ml-auto">{cls.gradeLevel}</span>}
                    </label>
                  )) : <p className="text-sm text-gray-400 py-2 text-center">Aucune {prescoOnly ? 'section' : 'classe'} créée</p>}
                </div>
              </div>

              <div><label className={labelCls}>{ht?'Ane enskripsyon':'Année d\'inscription'}</label><input type="text" value={formData.enrollmentYear || ''} onChange={e => set('enrollmentYear', e.target.value)} className={inputCls} placeholder={`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`} /></div>

              {!adult && (
                <div><label className={labelCls}>{ht?'Mesaj pou paran':'Message aux parents'}</label><textarea value={formData.notes || ''} onChange={e => set('notes', e.target.value)} className={`${inputCls} h-20 resize-none`} placeholder="ht?'Vizib nan pòtay paran':'Visible dans le portail parent'" /></div>
              )}
            </div>
          )}

          {/* ── Finances ── */}
          {studentTab === 'financial' && (
            <div className="space-y-4">
              {formData.gradeLevel && <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-2"><BookOpen size={16} className="text-blue-500" /><p className="text-sm text-blue-700">{adult ? 'Programme' : 'Niveau'}: <strong>{formData.gradeLevel}</strong></p></div>}
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>{ht?'Ekolaj anyèl (HTG)':'Scolarité annuelle (HTG)'}</label><input type="number" min="0" value={formData.annualTuition || ''} onChange={e => set('annualTuition', e.target.value)} className={`${inputCls} text-lg font-semibold`} /></div>
                <div><label className={labelCls}>Mensuel (÷10)</label><div className="px-4 py-3 border rounded-xl bg-gray-50 text-lg font-semibold text-gray-600">{(parseFloat(formData.annualTuition) || 0) > 0 ? `HTG ${((parseFloat(formData.annualTuition) || 0) / 10).toLocaleString()}` : '—'}</div></div>
              </div>
              <div><label className={labelCls}>Frais d'inscription (HTG)</label><input type="number" min="0" value={formData.fraisDivers || ''} onChange={e => set('fraisDivers', e.target.value)} className={inputCls} /></div>
              {((parseFloat(formData.annualTuition) || 0) + (parseFloat(formData.fraisDivers) || 0)) > 0 && (
                <div className="bg-socrates-navy text-white rounded-xl p-4"><div className="flex justify-between items-center"><span className="text-sm text-blue-200">Total annuel</span><span className="text-xl font-bold">HTG {((parseFloat(formData.annualTuition) || 0) + (parseFloat(formData.fraisDivers) || 0)).toLocaleString()}</span></div></div>
              )}
              <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">Dépôt de réservation</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm text-gray-600 mb-1">Montant (HTG)</label><input type="number" min="0" value={formData.depositAmount || ''} onChange={e => set('depositAmount', e.target.value)} className={inputCls} /></div>
                  <div className="flex items-end"><label className="flex items-center gap-3 p-3 border rounded-xl w-full cursor-pointer hover:bg-gray-50"><input type="checkbox" checked={formData.depositPaid || false} onChange={e => set('depositPaid', e.target.checked)} className="w-5 h-5 rounded" /><span className="text-sm font-medium">Dépôt payé</span></label></div>
                </div>
              </div>
            </div>
          )}

          {/* ── Parent (standard schools) ── */}
          {studentTab === 'parent' && !adult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>{ht?'Non papa':'Nom du père'}</label><input type="text" value={formData.fatherName || ''} onChange={e => set('fatherName', e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>{ht?'Non manman':'Nom de la mère'}</label><input type="text" value={formData.motherName || ''} onChange={e => set('motherName', e.target.value)} className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>{ht?'Titè / Responsab':'Tuteur / Responsable'}</label><input type="text" value={formData.guardianName || ''} onChange={e => set('guardianName', e.target.value)} className={inputCls} placeholder="Si différent des parents" /></div>
              <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">Accès Portail Parent</p>
                <div className="space-y-3">
                  <div><label className={labelCls}>Email parent</label><input type="email" value={formData.parentEmail || ''} onChange={e => set('parentEmail', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Téléphone parent</label><input type="tel" value={formData.parentPhone || ''} onChange={e => set('parentPhone', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>{ht?'Kòd PIN (aksè pòtay)':'Code PIN (accès portail)'}</label><input type="text" maxLength={6} value={formData.parentPin || ''} onChange={e => set('parentPin', e.target.value)} className={`${inputCls} text-center text-xl tracking-widest`} placeholder="• • • • • •" /></div>
                </div>
              </div>
              <div className="border-t pt-4"><label className={labelCls}>Contact d'urgence</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={formData.emergencyContact || ''} onChange={e => set('emergencyContact', e.target.value)} className={inputCls} placeholder="Nom" />
                  <input type="tel" value={formData.emergencyPhone || ''} onChange={e => set('emergencyPhone', e.target.value)} className={inputCls} placeholder="Téléphone" />
                </div>
              </div>
            </div>
          )}

          {/* ── Contact (adult schools — student IS their own contact) ── */}
          {studentTab === 'contact' && adult && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-700">L'étudiant(e) est son propre responsable. Ces informations servent de contact direct.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Email</label><input type="email" value={formData.parentEmail || ''} onChange={e => set('parentEmail', e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>Téléphone</label><input type="tel" value={formData.parentPhone || ''} onChange={e => set('parentPhone', e.target.value)} className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>WhatsApp</label><input type="tel" value={formData.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} className={inputCls} /></div>
              <div className="border-t pt-4"><label className={labelCls}>Contact d'urgence</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={formData.emergencyContact || ''} onChange={e => set('emergencyContact', e.target.value)} className={inputCls} placeholder="Nom" />
                  <input type="tel" value={formData.emergencyPhone || ''} onChange={e => set('emergencyPhone', e.target.value)} className={inputCls} placeholder="Téléphone" />
                </div>
              </div>
              <div><label className={labelCls}>Notes</label><textarea value={formData.notes || ''} onChange={e => set('notes', e.target.value)} className={`${inputCls} h-20 resize-none`} /></div>
            </div>
          )}
        </>)}

        {/* ═══ TEACHER ═══ */}
        {modalType === 'teacher' && (<>
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              {formData.photo ? <img src={formData.photo} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                : <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center"><Camera size={24} className="text-gray-300" /></div>}
              <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow"><Camera size={14} /><input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" /></label>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div><label className={labelCls}>{ht?'Prenon ':'Prénom '}<span className="text-red-400">*</span></label><input type="text" required value={formData.firstName || ''} onChange={e => set('firstName', e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Nom <span className="text-red-400">*</span></label><input type="text" required value={formData.lastName || ''} onChange={e => set('lastName', e.target.value)} className={inputCls} /></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Sexe</label><select value={formData.gender || ''} onChange={e => set('gender', e.target.value)} className={inputCls}><option value="">Sélectionner</option><option value="M">Masculin</option><option value="F">Féminin</option></select></div>
            <div><label className={labelCls}>{ht?'Dat nesans':'Date de naissance'}</label><input type="date" value={formData.dateOfBirth || ''} onChange={e => set('dateOfBirth', e.target.value)} className={inputCls} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Matière</label><input type="text" value={formData.subject || ''} onChange={e => set('subject', e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Qualification</label>
              <select value={formData.qualification || ''} onChange={e => set('qualification', e.target.value)} className={inputCls}><option value="">Sélectionner</option>{['Normalien(ne)','Licencié(e)','Maîtrise','Doctorat','Certificat','Autre'].map(q => <option key={q} value={q}>{q}</option>)}</select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Email</label><input type="email" value={formData.email || ''} onChange={e => set('email', e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Téléphone</label><input type="tel" value={formData.phone || ''} onChange={e => set('phone', e.target.value)} className={inputCls} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>NIF</label><input type="text" value={formData.nif || ''} onChange={e => set('nif', e.target.value)} className={inputCls} placeholder="ID fiscale" /></div>
            <div><label className={labelCls}>Date d'embauche</label><input type="date" value={formData.hireDate || ''} onChange={e => set('hireDate', e.target.value)} className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Adresse</label><input type="text" value={formData.address || ''} onChange={e => set('address', e.target.value)} className={inputCls} /></div>
          <div className="border-t pt-4">
            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
              <input type="checkbox" checked={formData.isCoach || false} onChange={e => set('isCoach', e.target.checked)} className="w-5 h-5 rounded" />
              <div><span className="text-sm font-medium">Également coach / moniteur</span><p className="text-xs text-gray-400">Supervise une activité parascolaire</p></div>
            </label>
            {formData.isCoach && (
              <div className="mt-3"><label className={labelCls}>{ht?'Aktivite koache':'Activité coachée'}</label><input type="text" value={formData.coachActivity || ''} onChange={e => set('coachActivity', e.target.value)} className={inputCls} placeholder="Ex: Football, Musique, Danse..." /></div>
            )}
          </div>
          <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">Rémunération</p>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm text-gray-600 mb-1">Salaire annuel (HTG)</label><input type="number" min="0" value={formData.annualSalary || ''} onChange={e => set('annualSalary', e.target.value)} className={`${inputCls} text-lg font-semibold`} /></div>
              <div><label className="block text-sm text-gray-600 mb-1">Mensuel (÷10)</label><div className="px-4 py-3 border rounded-xl bg-gray-50 text-lg font-semibold text-gray-600">{formData.annualSalary ? `HTG ${(parseFloat(formData.annualSalary) / 10).toLocaleString()}` : '—'}</div></div>
            </div>
          </div>
          <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">🔐 Accès Portail Enseignant</p>
            <div><label className={labelCls}>{ht?'Kòd PIN (aksè pòtay)':'Code PIN (accès portail)'}</label><input type="text" maxLength={6} value={formData.teacherPin || ''} onChange={e => set('teacherPin', e.target.value.replace(/\D/g, ''))} className={`${inputCls} text-center text-xl tracking-widest`} placeholder="• • • • • •" /></div>
            <p className="text-xs text-gray-400 mt-1">L'enseignant utilisera ce PIN pour accéder au portail et gérer ses classes, devoirs, et notes.</p>
          </div>
        </>)}

        {/* ═══ CLASS ═══ */}
        {modalType === 'class' && (<>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Nom {prescoOnly ? 'de la section' : 'de la classe'} <span className="text-red-400">*</span></label><input type="text" required value={formData.name || ''} onChange={e => set('name', e.target.value)} className={inputCls} placeholder={prescoOnly ? 'Ex: Papillon' : 'Ex: 3ème AF A'} /></div>
            <div><label className={labelCls}>Niveau</label>
              {isCustomGradeType(school?.schoolType) ? <input type="text" value={formData.gradeLevel || ''} onChange={e => set('gradeLevel', e.target.value)} className={inputCls} />
                : <select value={formData.gradeLevel || ''} onChange={e => set('gradeLevel', e.target.value)} className={inputCls}><option value="">Sélectionner</option>{getGradeLevels(school?.schoolType).map(g => <option key={g} value={g}>{g}</option>)}</select>}
            </div>
          </div>

          {/* Teacher assignment — depends on cycle */}
          {(!formData.gradeLevel || !isUpperCycle(formData.gradeLevel)) && !isCustomGradeType(school?.schoolType) ? (
            /* Lower cycle: single titulaire does everything */
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>{adult ? 'Professeur' : 'Enseignant(e)'} titulaire</label><select value={formData.teacherId || ''} onChange={e => { set('teacherId', e.target.value); set('teacherIds', e.target.value ? [e.target.value] : []); }} className={inputCls}><option value="">Sélectionner</option>{teachers.map(t => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}</select></div>
              <div><label className={labelCls}>Salle</label><input type="text" value={formData.room || ''} onChange={e => set('room', e.target.value)} className={inputCls} placeholder="Salle 3" /></div>
            </div>
          ) : (
            /* Upper cycle / custom: titulaire + multiple subject teachers */
            <>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Titulaire (responsable de classe)</label><select value={formData.teacherId || ''} onChange={e => {
                  set('teacherId', e.target.value);
                  const ids = formData.teacherIds || [];
                  if (e.target.value && !ids.includes(e.target.value)) set('teacherIds', [e.target.value, ...ids.filter(id => id !== formData.teacherId)]);
                }} className={inputCls}><option value="">Sélectionner</option>{teachers.map(t => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}{t.subject ? ` (${t.subject})` : ''}</option>)}</select></div>
                <div><label className={labelCls}>Salle</label><input type="text" value={formData.room || ''} onChange={e => set('room', e.target.value)} className={inputCls} placeholder="Salle 3" /></div>
              </div>
              <div className="border rounded-xl p-3">
                <label className={labelCls}>{adult ? 'Professeurs' : 'Enseignants'} de matière</label>
                <p className="text-xs text-gray-400 mb-2">Cochez tous les {adult ? 'professeurs' : 'enseignants'} qui donnent cours dans cette classe</p>
                <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                  {teachers.map(t => {
                    const ids = formData.teacherIds || [];
                    const checked = ids.includes(t.id);
                    return (
                      <label key={t.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm ${checked ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}>
                        <input type="checkbox" checked={checked} onChange={e => {
                          let newIds = [...ids];
                          if (e.target.checked) newIds.push(t.id);
                          else newIds = newIds.filter(id => id !== t.id);
                          set('teacherIds', newIds);
                        }} className="w-4 h-4 rounded" />
                        <span>{t.firstName} {t.lastName}</span>
                        {t.subject && <span className="text-xs text-gray-400">({t.subject})</span>}
                      </label>
                    );
                  })}
                </div>
                {(formData.teacherIds || []).length > 0 && <p className="text-xs text-blue-600 mt-2 font-medium">{(formData.teacherIds || []).length} {adult ? 'professeur' : 'enseignant'}{(formData.teacherIds || []).length > 1 ? 's' : ''} assigné{(formData.teacherIds || []).length > 1 ? 's' : ''}</p>}
              </div>
            </>
          )}

          <div><label className={labelCls}>{ht?'Kapasite maksimòm':'Capacité maximale'}</label><input type="number" min="1" value={formData.maxCapacity || ''} onChange={e => set('maxCapacity', e.target.value)} className={inputCls} placeholder="45" /></div>
          <div><label className={labelCls}>Programme / Curriculum</label><textarea value={formData.curriculum || ''} onChange={e => set('curriculum', e.target.value)} className={`${inputCls} h-24 resize-none`} /></div>
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3"><label className="text-sm font-medium text-gray-700">Livres requis</label><button type="button" onClick={addBook} className="text-socrates-blue text-sm font-medium flex items-center gap-1"><Plus size={16} />Ajouter</button></div>
            {(formData.books || []).map((book, i) => (
              <div key={i} className="p-3 border rounded-xl space-y-2 mb-2">
                <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Livre {i + 1}</span><button type="button" onClick={() => removeBook(i)} className="text-red-500"><X size={16} /></button></div>
                <input type="text" value={book.title || ''} onChange={e => updateBook(i, 'title', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Titre" />
                <input type="text" value={book.author || ''} onChange={e => updateBook(i, 'author', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Auteur" />
              </div>
            ))}
          </div>
        </>)}

        {/* ═══ PERIOD ═══ */}
        {modalType === 'period' && (<>
          <div><label className={labelCls}>Nom</label><input type="text" required value={formData.name || ''} onChange={e => set('name', e.target.value)} className={inputCls} placeholder="Trimestre 1" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Début</label><input type="date" value={formData.startDate || ''} onChange={e => set('startDate', e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Fin</label><input type="date" value={formData.endDate || ''} onChange={e => set('endDate', e.target.value)} className={inputCls} /></div>
          </div>
        </>)}

        {/* ═══ PAYMENT ═══ */}
        {modalType === 'payment' && (<>
          <div><label className={labelCls}>{adult ? 'Étudiant' : 'Élève'}</label><select required value={formData.studentId || ''} onChange={e => set('studentId', e.target.value)} className={inputCls}><option value="">Sélectionner</option>{students.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName} — Dû: HTG {getStudentBalance(s.id).toFixed(0)}</option>)}</select></div>
          <div><label className={labelCls}>Type de paiement</label>
            <select value={formData.paymentType || 'scolarite'} onChange={e => set('paymentType', e.target.value)} className={inputCls}>
              <option value="scolarite">📚 Scolarité (mensualité)</option>
              <option value="inscription">📋 Frais d'inscription</option>
              <option value="deposit">💰 Dépôt de réservation</option>
              <option value="examen">📝 Frais d'examen</option>
              <option value="uniforme">👔 Uniforme</option>
              <option value="transport">🚐 Transport</option>
              <option value="cantine">🍽️ Cantine</option>
              <option value="activite">⚽ Activité</option>
              <option value="autre">📋 Autre</option>
            </select>
          </div>
          {formData.paymentType === 'scolarite' && (
            <div><label className={labelCls}>Mois concerné</label>
              <select value={formData.month || ''} onChange={e => set('month', e.target.value)} className={inputCls}>
                <option value="">Sélectionner</option>
                {['Octobre','Novembre','Décembre','Janvier','Février','Mars','Avril','Mai','Juin','Juillet'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          )}
          <div><label className={labelCls}>Montant (HTG)</label><input type="number" required min="0" value={formData.amount || ''} onChange={e => set('amount', e.target.value)} className={`${inputCls} text-xl`} /></div>
          <div><label className={labelCls}>Date</label><input type="date" value={formData.date || new Date().toISOString().split('T')[0]} onChange={e => set('date', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Méthode</label><select value={formData.method || 'Espèces'} onChange={e => set('method', e.target.value)} className={inputCls}>{['Espèces','Chèque','Virement','Mobile','MonCash','Natcash'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
          <div><label className={labelCls}>Description</label><input type="text" value={formData.description || ''} onChange={e => set('description', e.target.value)} className={inputCls} /></div>
        </>)}

        {/* ═══ TEACHER PAYMENT ═══ */}
        {modalType === 'teacherPayment' && (<>
          <div><label className={labelCls}>{adult ? 'Professeur' : 'Enseignant'}</label><select required value={formData.teacherId || ''} onChange={e => set('teacherId', e.target.value)} className={inputCls}><option value="">Sélectionner</option>{teachers.map(t => <option key={t.id} value={t.id}>{t.firstName} {t.lastName} — Dû: HTG {getTeacherBalance(t.id).toFixed(0)}</option>)}</select></div>
          <div><label className={labelCls}>Mois</label><input type="month" value={formData.month || new Date().toISOString().slice(0, 7)} onChange={e => set('month', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Montant (HTG)</label><input type="number" required min="0" value={formData.amount || ''} onChange={e => set('amount', e.target.value)} className={`${inputCls} text-xl`} /></div>
          <div><label className={labelCls}>Date</label><input type="date" value={formData.date || new Date().toISOString().split('T')[0]} onChange={e => set('date', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Méthode</label><select value={formData.method || 'Espèces'} onChange={e => set('method', e.target.value)} className={inputCls}>{['Espèces','Chèque','Virement','Mobile','MonCash','Natcash'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
        </>)}

        {/* ═══ EXPENSE ═══ */}
        {modalType === 'expense' && (<>
          <div><label className={labelCls}>Catégorie</label>
            <select required value={formData.category || ''} onChange={e => set('category', e.target.value)} className={inputCls}>
              <option value="">Sélectionner</option>
              <option value="staff">👤 Salaire personnel</option>
              <option value="coach">🏅 Paiement coach externe</option>
              <option value="rent">🏠 Loyer</option>
              <option value="utilities">💡 Électricité / Eau</option>
              <option value="supplies">📦 Fournitures</option>
              <option value="maintenance">🔧 Entretien / Réparations</option>
              <option value="transport">🚐 Transport</option>
              <option value="food">🍽️ Cantine / Nourriture</option>
              <option value="other">📋 Autre</option>
            </select>
          </div>
          {(formData.category === 'staff' || formData.category === 'coach') && (
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Nom</label><input type="text" value={formData.personName || ''} onChange={e => set('personName', e.target.value)} className={inputCls} placeholder="Nom complet" /></div>
              <div><label className={labelCls}>Rôle / Fonction</label><input type="text" value={formData.personRole || ''} onChange={e => set('personRole', e.target.value)} className={inputCls} placeholder={formData.category === 'coach' ? 'Ex: Coach football' : 'Ex: Secrétaire'} /></div>
            </div>
          )}
          {formData.category === 'staff' && (
            <div><label className={labelCls}>Mois</label><input type="month" value={formData.month || new Date().toISOString().slice(0, 7)} onChange={e => set('month', e.target.value)} className={inputCls} /></div>
          )}
          <div><label className={labelCls}>Montant (HTG)</label><input type="number" required min="0" value={formData.amount || ''} onChange={e => set('amount', e.target.value)} className={`${inputCls} text-xl`} /></div>
          <div><label className={labelCls}>Date</label><input type="date" value={formData.date || new Date().toISOString().split('T')[0]} onChange={e => set('date', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Méthode</label><select value={formData.method || 'Espèces'} onChange={e => set('method', e.target.value)} className={inputCls}>{['Espèces','Chèque','Virement','Mobile','MonCash','Natcash'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
          <div><label className={labelCls}>Description</label><input type="text" value={formData.description || ''} onChange={e => set('description', e.target.value)} className={inputCls} placeholder="Détails supplémentaires" /></div>
        </>)}

        <div className="flex gap-3 pt-4 pb-4">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-4 border rounded-xl font-medium text-base hover:bg-gray-50 transition">Annuler</button>
          <button type="submit" className="flex-1 bg-socrates-blue text-white px-4 py-4 rounded-xl font-medium text-base hover:bg-blue-700 transition">{editItem ? 'Modifier' : 'Enregistrer'}</button>
        </div>
      </form>
    </Modal>
  );
}

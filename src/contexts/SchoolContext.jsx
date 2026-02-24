import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db, auth } from '../firebase';
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const SUPER_ADMIN_EMAIL = 'anbyanssa@gmail.com';

// ─── Official Haitian Grade Structure ───────────────────────────────────
const PRESCOLAIRE_LEVELS = ['Pépinière', 'Maternelle 1', 'Maternelle 2', 'Maternelle 3'];
const PRIMAIRE_LEVELS    = ['1ère AF', '2ème AF', '3ème AF', '4ème AF', '5ème AF', '6ème AF'];
const TROISIEME_CYCLE    = ['7ème AF', '8ème AF', '9ème AF'];
const SECONDAIRE_NS      = ['NS1', 'NS2', 'NS3'];
const SECONDAIRE_TRAD    = ['Seconde', 'Rhéto'];
const PHILO_LEVEL        = ['Philo'];

const FEE_CYCLES = [
  { key: 'prescolaire',    label: 'Préscolaire',           levels: PRESCOLAIRE_LEVELS },
  { key: 'premier_cycle',  label: '1er Cycle Fondamental',  levels: ['1ère AF', '2ème AF', '3ème AF'] },
  { key: 'deuxieme_cycle', label: '2ème Cycle Fondamental', levels: ['4ème AF', '5ème AF', '6ème AF'] },
  { key: 'troisieme_cycle',label: '3ème Cycle Fondamental', levels: TROISIEME_CYCLE },
  { key: 'secondaire',     label: 'Secondaire',             levels: [...SECONDAIRE_NS, ...SECONDAIRE_TRAD] },
  { key: 'philo',          label: 'Philo / NS4',            levels: PHILO_LEVEL },
];

const GRADE_LEVELS_BY_TYPE = (secondSystem = 'NS') => ({
  'Préscolaire':          [...PRESCOLAIRE_LEVELS],
  'Primaire':             [...PRIMAIRE_LEVELS],
  'Secondaire':           [...TROISIEME_CYCLE, ...(secondSystem==='NS'?SECONDAIRE_NS:SECONDAIRE_TRAD), ...PHILO_LEVEL],
  'Préscolaire-Primaire': [...PRESCOLAIRE_LEVELS, ...PRIMAIRE_LEVELS],
  'Primaire-Secondaire':  [...PRIMAIRE_LEVELS, ...TROISIEME_CYCLE, ...(secondSystem==='NS'?SECONDAIRE_NS:SECONDAIRE_TRAD), ...PHILO_LEVEL],
  'Complète':             [...PRESCOLAIRE_LEVELS, ...PRIMAIRE_LEVELS, ...TROISIEME_CYCLE, ...(secondSystem==='NS'?SECONDAIRE_NS:SECONDAIRE_TRAD), ...PHILO_LEVEL],
});

const CUSTOM_GRADE_TYPES = ['Technique', 'Universitaire'];

// ─── Haiti Départements & Communes ──────────────────────────────────────
const HAITI_DEPARTEMENTS_COMMUNES = {
  "Artibonite": [
    "Dessalines", "Gonaïves", "Gros-Morne", "Ennery", "L'Estère",
    "Marmelade", "Saint-Marc", "Saint-Michel-de-l'Attalaye", "Terre-Neuve",
    "Verrettes", "La Chapelle", "Petite-Rivière-de-l'Artibonite", "Desdunes"
  ],
  "Centre": [
    "Hinche", "Belladère", "Cerca-Carvajal", "Cerca-la-Source",
    "Lascahobas", "Maïssade", "Mirebalais", "Saut-d'Eau", "Thomonde",
    "Boucan-Carré", "Savanette", "Thomassique"
  ],
  "Grand'Anse": [
    "Jérémie", "Abricots", "Anse-d'Hainault", "Beaumont",
    "Corail", "Dame-Marie", "Irois", "Moron", "Pestel",
    "Roseaux", "Chambellan", "Marfranc"
  ],
  "Nippes": [
    "Miragoâne", "Anse-à-Veau", "Arnaud", "Baradères",
    "Fonds-des-Nègres", "L'Asile", "Petite-Rivière-de-Nippes",
    "Plaisance-du-Sud", "Paillant", "Grand-Boucan", "Petit-Trou-de-Nippes"
  ],
  "Nord": [
    "Cap-Haïtien", "Acul-du-Nord", "Bahon", "Borgne",
    "Grande-Rivière-du-Nord", "Limonade", "Limbé", "Milot",
    "Plaine-du-Nord", "Plaisance", "Pilate", "Port-Margot",
    "Quartier-Morin", "Ranquitte", "Saint-Raphaël", "Dondon",
    "Bas-Limbé", "La Victoire"
  ],
  "Nord-Est": [
    "Fort-Liberté", "Caracol", "Carice", "Ferrier",
    "Mombin-Crochu", "Ouanaminthe", "Perches", "Sainte-Suzanne",
    "Trou-du-Nord", "Terrier-Rouge", "Vallières", "Mont-Organisé", "Capotille"
  ],
  "Nord-Ouest": [
    "Port-de-Paix", "Anse-à-Foleur", "Bassin-Bleu", "Baie-de-Henne",
    "Bombardopolis", "Jean-Rabel", "La Tortue", "Môle-Saint-Nicolas",
    "Saint-Louis-du-Nord", "Chansolme"
  ],
  "Ouest": [
    "Port-au-Prince", "Carrefour", "Delmas", "Pétion-Ville",
    "Kenscoff", "Tabarre", "Cité Soleil", "Gressier",
    "Léogâne", "Petit-Goâve", "Grand-Goâve", "Cabaret",
    "Arcahaie", "Croix-des-Bouquets", "Thomazeau", "Ganthier",
    "Cornillon", "Fonds-Verrettes", "Belle-Anse", "Anse-à-Galets (La Gonâve)"
  ],
  "Sud": [
    "Les Cayes", "Aquin", "Camp-Perrin", "Chardonnières",
    "Coteaux", "Île-à-Vache", "Jérémie", "Maniche",
    "Port-à-Piment", "Port-Salut", "Roche-à-Bateau",
    "Saint-Jean-du-Sud", "Saint-Louis-du-Sud", "Torbeck", "Arniquet"
  ],
  "Sud-Est": [
    "Jacmel", "Bainet", "Belle-Anse", "Côtes-de-Fer",
    "Cayes-Jacmel", "La Vallée-de-Jacmel", "Marigot",
    "Thiotte", "Anse-à-Pitres", "Grand-Gosier"
  ]
};

// ─── New Official Academic Structure ────────────────────────────────────
const STRUCTURE_ACADEMIQUE_HAITI = {
  "Préscolaire": {
    niveaux: ["1ère Année", "2ème Année", "3ème Année"],
    examens: []
  },
  "1er Cycle Fondamental": {
    niveaux: ["1ère AF", "2ème AF", "3ème AF", "4ème AF"],
    examens: []
  },
  "2ème Cycle Fondamental": {
    niveaux: ["5ème AF", "6ème AF"],
    examens: []
  },
  "3ème Cycle Fondamental": {
    niveaux: ["7ème AF", "8ème AF", "9ème AF"],
    examens: ["9ème AF (Brevet)"]
  },
  "Secondaire (Nouveau Secondaire)": {
    niveaux: ["NS1", "NS2", "NS3", "NS4 (Philo)"],
    examens: ["NS4/Philo (Baccalauréat)"]
  }
};

// ─── Context ────────────────────────────────────────────────────────────
const SchoolContext = createContext(null);

export function SchoolProvider({ children }) {
  // Auth state
  const [user, setUser] = useState(null);
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // School data
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [payments, setPayments] = useState([]);
  const [teacherPayments, setTeacherPayments] = useState([]);
  const [staffPayments, setStaffPayments] = useState([]);  // ← NEW
  const [expenses, setExpenses] = useState([]);
  const [gradingPeriods, setGradingPeriods] = useState([]);
  const [homework, setHomework] = useState([]);
  const [exams, setExams] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Super admin data
  const [allSchools, setAllSchools] = useState([]);
  const [subscriptionPayments, setSubscriptionPayments] = useState([]);

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNewRegistration, setIsNewRegistration] = useState(false);

  // ── Auth listener ──────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          if (currentUser.email === SUPER_ADMIN_EMAIL) {
            setIsSuperAdmin(true);
            await reloadAllSchools();
            await reloadSubscriptionPayments();
          } else {
            setIsSuperAdmin(false);
            const schoolDoc = await getDoc(doc(db, 'schools', currentUser.uid));
            if (schoolDoc.exists()) {
              const schoolData = { id: schoolDoc.id, ...schoolDoc.data() };
              if (schoolData.status === 'disabled') {
                alert("Votre compte est desactive. Contactez l'administrateur.");
                await signOut(auth);
                return;
              }
              setSchool(schoolData);
            }
          }
        } else {
          setUser(null);
          setSchool(null);
          setIsSuperAdmin(false);
          setAllSchools([]);
        }
      } catch (error) {
        console.error('Auth listener error:', error);
        setUser(null);
        setSchool(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // ── Load school data when school changes ───────────────────────────
  useEffect(() => {
    if (school) {
      loadAllData();
      if (isNewRegistration) {
        setActiveTab('settings');
        setIsNewRegistration(false);
      }
    }
  }, [school]);

  const loadAllData = useCallback(async () => {
    if (!school) return;
    try {
      const [
        studentsSnap, teachersSnap, classesSnap, periodsSnap, gradesSnap,
        paymentsSnap, tpSnap, expSnap, hwSnap, examSnap, attSnap, spSnap  // ← spSnap added
      ] = await Promise.all([
        getDocs(query(collection(db, 'schools', school.id, 'students'), orderBy('lastName'))),
        getDocs(collection(db, 'schools', school.id, 'teachers')),
        getDocs(collection(db, 'schools', school.id, 'classes')),
        getDocs(collection(db, 'schools', school.id, 'gradingPeriods')),
        getDocs(collection(db, 'schools', school.id, 'grades')),
        getDocs(query(collection(db, 'schools', school.id, 'payments'), orderBy('date', 'desc'))),
        getDocs(query(collection(db, 'schools', school.id, 'teacherPayments'), orderBy('date', 'desc'))),
        getDocs(query(collection(db, 'schools', school.id, 'expenses'), orderBy('date', 'desc'))),
        getDocs(collection(db, 'schools', school.id, 'homework')),
        getDocs(collection(db, 'schools', school.id, 'exams')),
        getDocs(collection(db, 'schools', school.id, 'attendance')),
        getDocs(query(collection(db, 'schools', school.id, 'staffPayments'), orderBy('date', 'desc'))),  // ← NEW
      ]);
      setStudents(studentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTeachers(teachersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setClasses(classesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setGradingPeriods(periodsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setGrades(gradesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setPayments(paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTeacherPayments(tpSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setExpenses(expSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setHomework(hwSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setExams(examSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setAttendance(attSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setStaffPayments(spSnap.docs.map(d => ({ id: d.id, ...d.data() })));  // ← NEW
    } catch (error) { console.error('Error loading data:', error); }
  }, [school]);

  // ── Super Admin Functions ──────────────────────────────────────────
  const reloadAllSchools = async () => {
    const schoolsSnap = await getDocs(collection(db, 'schools'));
    const schoolsData = await Promise.all(schoolsSnap.docs.map(async (schoolDoc) => {
      const schoolData = { id: schoolDoc.id, ...schoolDoc.data() };
      if (schoolData.email === SUPER_ADMIN_EMAIL) return null;
      const studentsSnap = await getDocs(collection(db, 'schools', schoolDoc.id, 'students'));
      const teachersSnap = await getDocs(collection(db, 'schools', schoolDoc.id, 'teachers'));
      schoolData.studentCount = studentsSnap.size;
      schoolData.teacherCount = teachersSnap.size;
      return schoolData;
    }));
    setAllSchools(schoolsData.filter(s => s !== null));
  };

  const reloadSubscriptionPayments = async () => {
    const subPaymentsSnap = await getDocs(query(collection(db, 'subscriptionPayments'), orderBy('date', 'desc')));
    setSubscriptionPayments(subPaymentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const toggleSchoolStatus = async (schoolId, currentStatus) => {
    const newStatus = currentStatus === 'disabled' ? 'active' : 'disabled';
    await updateDoc(doc(db, 'schools', schoolId), { status: newStatus });
    reloadAllSchools();
  };

  const updateSchoolSubscription = async (schoolId, subscription) => {
    await updateDoc(doc(db, 'schools', schoolId), { subscription });
    reloadAllSchools();
  };

  const extendTrial = async (schoolId, days) => {
    const newDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    await updateDoc(doc(db, 'schools', schoolId), { trialEndsAt: newDate, subscription: 'trial' });
    reloadAllSchools();
  };

  const loadSchoolDetails = async (schoolId) => {
    const [studentsSnap, teachersSnap, paymentsSnap, schoolDoc] = await Promise.all([
      getDocs(collection(db, 'schools', schoolId, 'students')),
      getDocs(collection(db, 'schools', schoolId, 'teachers')),
      getDocs(collection(db, 'schools', schoolId, 'payments')),
      getDoc(doc(db, 'schools', schoolId)),
    ]);
    return {
      ...schoolDoc.data(),
      id: schoolId,
      students: studentsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      teachers: teachersSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      payments: paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }))
    };
  };

  const saveSubscriptionPayment = async (data) => {
    await addDoc(collection(db, 'subscriptionPayments'), {
      ...data,
      amount: parseFloat(data.amount),
      date: data.date || new Date().toISOString().split('T')[0],
      method: data.method || 'Especes',
      description: data.description || (data.isSetupFee ? 'Frais installation' : 'Abonnement'),
      isSetupFee: data.isSetupFee || false,
      createdAt: serverTimestamp()
    });
    reloadSubscriptionPayments();
  };

  const deleteSubscriptionPayment = async (id) => {
    if (!confirm('Supprimer ce paiement?')) return;
    await deleteDoc(doc(db, 'subscriptionPayments', id));
    reloadSubscriptionPayments();
  };

  const updateSchoolContract = async (schoolId, annualFee, setupFee) => {
    await updateDoc(doc(db, 'schools', schoolId), {
      annualFee: parseFloat(annualFee) || 0,
      setupFee: parseFloat(setupFee) || 0
    });
    await reloadAllSchools();
    return await getDoc(doc(db, 'schools', schoolId));
  };

  const getSchoolBalance = (schoolId) => {
    const s = allSchools.find(s => s.id === schoolId);
    const annualFee = parseFloat(s?.annualFee) || 0;
    const monthlyFee = annualFee / 12;
    const createdAt = s?.createdAt?.toDate?.() || new Date(s?.createdAt);
    const now = new Date();
    const monthsSinceCreation = Math.max(1, Math.floor((now - createdAt) / (30 * 24 * 60 * 60 * 1000)));
    const totalDue = monthlyFee * monthsSinceCreation;
    const totalPaid = subscriptionPayments.filter(p => p.schoolId === schoolId && !p.isSetupFee).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    return totalDue - totalPaid;
  };

  const isSetupFeePaid = (schoolId) => {
    return subscriptionPayments.some(p => p.schoolId === schoolId && p.isSetupFee);
  };

  const getTotalSubscriptionRevenue = () => {
    return subscriptionPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  };

  // ── Auth actions ───────────────────────────────────────────────────
  const handleRegister = async (formData) => {
    const { email, password, schoolName, phone, address, schoolType, directorName, directorTitle } = formData;
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await setDoc(doc(db, 'schools', userCred.user.uid), {
        name: schoolName, email, phone,
        address: address || '',
        schoolType: schoolType || '',
        directorName: directorName || '',
        directorTitle: directorTitle || 'Directeur',
        createdAt: serverTimestamp(),
        subscription: 'trial',
        status: 'active',
        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
      setIsNewRegistration(true);
    } catch (firestoreError) {
      await userCred.user.delete();
      throw new Error("Erreur sauvegarde: " + firestoreError.message);
    }
  };

  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setSchool(null);
    setIsSuperAdmin(false);
    setAllSchools([]);
  };

  // ── CRUD Functions ─────────────────────────────────────────────────
  const saveStudent = async (data, editId = null) => {
    const payload = {
      ...data,
      annualTuition: parseFloat(data.annualTuition) || 0,
      fraisDivers: parseFloat(data.fraisDivers) || 0,
      depositAmount: parseFloat(data.depositAmount) || 0,
      depositPaid: data.depositPaid || false,
      parentAccessEnabled: data.parentAccessEnabled !== false,
      address: data.address || '',
      notes: data.notes || '',
      gender: data.gender || '',
      dateOfBirth: data.dateOfBirth || '',
      birthPlace: data.birthPlace || '',
      nationality: data.nationality || '',
      bloodType: data.bloodType || '',
      medicalNotes: data.medicalNotes || '',
      fatherName: data.fatherName || '',
      motherName: data.motherName || '',
      guardianName: data.guardianName || '',
      emergencyContact: data.emergencyContact || '',
      emergencyPhone: data.emergencyPhone || '',
      enrollmentYear: data.enrollmentYear || '',
      photo: data.photo || '',
      updatedAt: serverTimestamp()
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'students', editId), payload);
    else await addDoc(collection(db, 'schools', school.id, 'students'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteStudent = async (id) => {
    if (!confirm('Supprimer cet eleve?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'students', id));
    loadAllData();
  };

  const saveTeacher = async (data, editId = null) => {
    const payload = {
      ...data,
      annualSalary: parseFloat(data.annualSalary) || 0,
      gender: data.gender || '',
      dateOfBirth: data.dateOfBirth || '',
      qualification: data.qualification || '',
      nif: data.nif || '',
      hireDate: data.hireDate || '',
      address: data.address || '',
      photo: data.photo || '',
      isCoach: data.isCoach || false,
      coachActivity: data.coachActivity || '',
      teacherPin: data.teacherPin || '',
      updatedAt: serverTimestamp()
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'teachers', editId), payload);
    else await addDoc(collection(db, 'schools', school.id, 'teachers'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteTeacher = async (id) => {
    if (!confirm('Supprimer cet enseignant?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'teachers', id));
    loadAllData();
  };

  const saveClass = async (data, editId = null) => {
    const teacherIds = data.teacherIds || (data.teacherId ? [data.teacherId] : []);
    const payload = {
      ...data,
      books: data.books || [],
      gradeLevel: data.gradeLevel || '',
      maxCapacity: data.maxCapacity || '',
      room: data.room || '',
      teacherId: data.teacherId || teacherIds[0] || '',
      teacherIds,
      updatedAt: serverTimestamp(),
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'classes', editId), payload);
    else await addDoc(collection(db, 'schools', school.id, 'classes'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteClass = async (id) => {
    if (!confirm('Supprimer cette classe?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'classes', id));
    loadAllData();
  };

  const savePeriod = async (data, editId = null) => {
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'gradingPeriods', editId), data);
    else await addDoc(collection(db, 'schools', school.id, 'gradingPeriods'), data);
    loadAllData();
  };

  const saveGrade = async (studentId, classId, periodId, score, subject = '') => {
    const existingGrade = grades.find(g => g.studentId === studentId && g.classId === classId && g.periodId === periodId && (g.subject || '') === subject);
    if (existingGrade) await updateDoc(doc(db, 'schools', school.id, 'grades', existingGrade.id), { score: parseFloat(score) || 0, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'grades'), { studentId, classId, periodId, subject, score: parseFloat(score) || 0, createdAt: serverTimestamp() });
    loadAllData();
  };

  const savePayment = async (data, editId = null) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
      paymentType: data.paymentType || 'scolarite',
      month: data.month || '',
      isDeposit: data.paymentType === 'deposit' || data.isDeposit || false,
      date: data.date || new Date().toISOString().split('T')[0]
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'payments', editId), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'payments'), { ...payload, createdAt: serverTimestamp() });
    if (payload.isDeposit && payload.studentId) {
      await updateDoc(doc(db, 'schools', school.id, 'students', payload.studentId), { depositPaid: true });
    }
    loadAllData();
  };

  const deletePayment = async (id) => {
    if (!confirm('Supprimer ce paiement?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'payments', id));
    loadAllData();
  };

  const saveTeacherPayment = async (data, editId = null) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
      month: data.month || new Date().toISOString().slice(0, 7),
      date: data.date || new Date().toISOString().split('T')[0]
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'teacherPayments', editId), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'teacherPayments'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteTeacherPayment = async (id) => {
    if (!confirm('Supprimer ce paiement?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'teacherPayments', id));
    loadAllData();
  };

  // ── Staff Payment CRUD ─────────────────────────────────────────────  ← NEW
  const saveStaffPayment = async (data, editId = null) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
      month: data.month || new Date().toISOString().slice(0, 7),
      date: data.date || new Date().toISOString().split('T')[0]
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'staffPayments', editId), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'staffPayments'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteStaffPayment = async (id) => {
    if (!confirm('Supprimer ce paiement?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'staffPayments', id));
    loadAllData();
  };

  const saveExpense = async (data, editId = null) => {
    const payload = {
      category: data.category || 'other',
      personName: data.personName || '',
      personRole: data.personRole || '',
      amount: parseFloat(data.amount) || 0,
      method: data.method || 'Espèces',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      month: data.month || '',
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'expenses', editId), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'expenses'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteExpense = async (id) => {
    if (!confirm('Supprimer cette dépense?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'expenses', id));
    loadAllData();
  };

  // ── Homework CRUD ──────────────────────────────────────────────────
  const saveHomework = async (data, editId = null) => {
    const payload = {
      classId: data.classId || '',
      teacherId: data.teacherId || '',
      title: data.title || '',
      description: data.description || '',
      subject: data.subject || '',
      dueDate: data.dueDate || '',
      postedDate: data.postedDate || new Date().toISOString().split('T')[0],
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'homework', editId), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'homework'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteHomework = async (id) => {
    if (!confirm('Supprimer ce devoir?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'homework', id));
    loadAllData();
  };

  // ── Exams CRUD ─────────────────────────────────────────────────────
  const saveExam = async (data, editId = null) => {
    const payload = {
      classId: data.classId || '',
      teacherId: data.teacherId || '',
      title: data.title || '',
      subject: data.subject || '',
      examDate: data.examDate || '',
      periodId: data.periodId || '',
      totalPoints: parseFloat(data.totalPoints) || 100,
      description: data.description || '',
    };
    if (editId) await updateDoc(doc(db, 'schools', school.id, 'exams', editId), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'exams'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const deleteExam = async (id) => {
    if (!confirm('Supprimer cet examen?')) return;
    await deleteDoc(doc(db, 'schools', school.id, 'exams', id));
    loadAllData();
  };

  // ── Attendance CRUD ────────────────────────────────────────────────
  const saveAttendance = async (data) => {
    const existing = attendance.find(a => a.classId === data.classId && a.date === data.date);
    const payload = {
      classId: data.classId,
      teacherId: data.teacherId || '',
      date: data.date,
      records: data.records || [],
    };
    if (existing) await updateDoc(doc(db, 'schools', school.id, 'attendance', existing.id), { ...payload, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, 'schools', school.id, 'attendance'), { ...payload, createdAt: serverTimestamp() });
    loadAllData();
  };

  const updateSchoolSettings = async (updateData) => {
    await updateDoc(doc(db, 'schools', school.id), updateData);
    setSchool({ ...school, ...updateData });
  };

  const autoFlagOverdue = async () => {
    const threshold = parseInt(school?.overdueThreshold) || 2;
    let flagged = 0;
    for (const student of students) {
      const monthly = (parseFloat(student.annualTuition) || 0) / 10;
      if (monthly <= 0) continue;
      const balance = getStudentBalance(student.id);
      const monthsBehind = Math.floor(balance / monthly);
      if (monthsBehind >= threshold && student.flag !== 'financial') {
        await updateDoc(doc(db, 'schools', school.id, 'students', student.id), {
          flag: 'financial',
          flagNote: `Retard de ${monthsBehind} mois (auto)`
        });
        flagged++;
      }
    }
    if (flagged > 0) loadAllData();
    return flagged;
  };

  // ── Computed helpers ───────────────────────────────────────────────
  const getStudentBalance = (studentId) => {
    const student = students.find(s => s.id === studentId);
    const annual = (parseFloat(student?.annualTuition) || 0) + (parseFloat(student?.fraisDivers) || 0);
    const paid = payments.filter(p => p.studentId === studentId && !p.isDeposit).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    return annual - paid;
  };

  const getMonthlyTuition = (student) => {
    const scolarite = parseFloat(student?.annualTuition) || 0;
    return (scolarite / 10).toFixed(2);
  };

  const getStudentTotal = (student) => {
    return (parseFloat(student?.annualTuition) || 0) + (parseFloat(student?.fraisDivers) || 0);
  };

  const getTeacherBalance = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    const annual = parseFloat(teacher?.annualSalary) || 0;
    const paid = teacherPayments.filter(p => p.teacherId === teacherId).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    return annual - paid;
  };

  const getMonthlySalary = (teacher) => {
    const annual = parseFloat(teacher?.annualSalary) || 0;
    return (annual / 10).toFixed(2);
  };

  // ── Staff helpers ──────────────────────────────────────────────────  ← NEW
  const getStaffBalance = (staffId) => {
    const staffList = school?.adminStaff || [];
    const member = staffList.find(s => s.id === staffId);
    const annual = parseFloat(member?.annualSalary) || 0;
    const paid = staffPayments.filter(p => p.staffId === staffId).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    return annual - paid;
  };

  const getStaffMonthlySalary = (member) => {
    const annual = parseFloat(member?.annualSalary) || 0;
    return (annual / 10).toFixed(2);
  };

  const getLetterGrade = (score) => {
    const num = parseFloat(score);
    if (num >= 90) return 'A';
    if (num >= 80) return 'B';
    if (num >= 70) return 'C';
    if (num >= 60) return 'D';
    return 'F';
  };

  const getGradeLevels = (schoolType) => {
    if (!schoolType) return [...PRESCOLAIRE_LEVELS, ...PRIMAIRE_LEVELS, ...TROISIEME_CYCLE, ...SECONDAIRE_NS, ...PHILO_LEVEL];
    if (CUSTOM_GRADE_TYPES.includes(schoolType)) return school?.customGradeLevels || [];
    const secondSystem = school?.secondarySystem || 'NS';
    return GRADE_LEVELS_BY_TYPE(secondSystem)[schoolType] || [];
  };

  const isCustomGradeType = (schoolType) => CUSTOM_GRADE_TYPES.includes(schoolType);

  const UPPER_CYCLE_LEVELS = [...TROISIEME_CYCLE, ...SECONDAIRE_NS, ...SECONDAIRE_TRAD, ...PHILO_LEVEL];
  const isUpperCycle = (gradeLevel) => UPPER_CYCLE_LEVELS.includes(gradeLevel);

  const isPrescolaireOnly = () => school?.schoolType === 'Préscolaire';
  const hasPrescolaire = () => ['Préscolaire', 'Préscolaire-Primaire', 'Complète'].includes(school?.schoolType);
  const isAdultSchool = () => CUSTOM_GRADE_TYPES.includes(school?.schoolType);

  const isListedInDirectory = (s) =>
    s.schoolType && s.address && s.phone && s.directorName &&
    Object.keys(s.levelFees || {}).length > 0 && (s.teacherCount || 0) > 0;

  // ── Context value ──────────────────────────────────────────────────
  const value = {
    // Auth
    user, school, setSchool, loading, isSuperAdmin,
    handleRegister, handleLogin, handleLogout,
    isNewRegistration,

    // School data
    students, teachers, classes, grades, payments, teacherPayments, staffPayments,  // ← staffPayments added
    expenses, gradingPeriods, homework, exams, attendance,
    loadAllData,

    // CRUD
    saveStudent, deleteStudent,
    saveTeacher, deleteTeacher,
    saveClass, deleteClass,
    savePeriod,
    saveGrade,
    savePayment, deletePayment,
    saveTeacherPayment, deleteTeacherPayment,
    saveStaffPayment, deleteStaffPayment,  // ← NEW
    saveExpense, deleteExpense,
    saveHomework, deleteHomework,
    saveExam, deleteExam,
    saveAttendance,
    updateSchoolSettings,
    autoFlagOverdue,

    // Super admin
    allSchools, subscriptionPayments,
    reloadAllSchools, reloadSubscriptionPayments,
    toggleSchoolStatus, updateSchoolSubscription, extendTrial,
    loadSchoolDetails,
    saveSubscriptionPayment, deleteSubscriptionPayment,
    updateSchoolContract,
    getSchoolBalance, isSetupFeePaid, getTotalSubscriptionRevenue,

    // Computed
    getStudentBalance, getMonthlyTuition, getStudentTotal,
    getTeacherBalance, getMonthlySalary,
    getStaffBalance, getStaffMonthlySalary,  // ← NEW
    getLetterGrade, getGradeLevels, isCustomGradeType, isUpperCycle,
    isPrescolaireOnly, hasPrescolaire, isAdultSchool,
    isListedInDirectory,

    // UI state
    activeTab, setActiveTab,

    // Constants
    SUPER_ADMIN_EMAIL,
    FEE_CYCLES, CUSTOM_GRADE_TYPES,
    HAITI_DEPARTEMENTS_COMMUNES,
    STRUCTURE_ACADEMIQUE_HAITI,
    PRESCOLAIRE_LEVELS, PRIMAIRE_LEVELS, TROISIEME_CYCLE,
    SECONDAIRE_NS, SECONDAIRE_TRAD, PHILO_LEVEL,
  };

  return <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>;
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within SchoolProvider');
  return ctx;
}

export default SchoolContext;
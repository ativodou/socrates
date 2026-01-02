import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Users, BookOpen, DollarSign, FileText, Settings, LogOut, Plus, Edit, Trash2, Search, Download, X, Calendar, Menu, BarChart3, CreditCard, GraduationCap, Book, ClipboardList, Shield, CheckCircle, XCircle, Eye } from 'lucide-react';

const SUPER_ADMIN_EMAIL = 'anbyanssa@gmail.com';

export default function App() {
  const [user, setUser] = useState(null);
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [payments, setPayments] = useState([]);
  const [teacherPayments, setTeacherPayments] = useState([]);
  const [gradingPeriods, setGradingPeriods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [formData, setFormData] = useState({});
  const [parentAccess, setParentAccess] = useState(false);
  const [parentStudent, setParentStudent] = useState(null);
  const [parentChildren, setParentChildren] = useState([]);
  const [parentSchools, setParentSchools] = useState([]);
  const [parentSchoolStudents, setParentSchoolStudents] = useState([]);
  const [viewClass, setViewClass] = useState(null);
  // Super Admin states
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [allSchools, setAllSchools] = useState([]);
  const [viewingSchool, setViewingSchool] = useState(null);
  const [adminTab, setAdminTab] = useState('schools');
  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [subscriptionPayments, setSubscriptionPayments] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminModalType, setAdminModalType] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if super admin
        if (currentUser.email === SUPER_ADMIN_EMAIL) {
          setIsSuperAdmin(true);
          // Load all schools for super admin
          const schoolsSnap = await getDocs(collection(db, 'schools'));
          const schoolsData = await Promise.all(schoolsSnap.docs.map(async (schoolDoc) => {
            const schoolData = { id: schoolDoc.id, ...schoolDoc.data() };
            // Skip super admin account
            if (schoolData.email === SUPER_ADMIN_EMAIL) return null;
            // Count students and teachers for each school
            const studentsSnap = await getDocs(collection(db, 'schools', schoolDoc.id, 'students'));
            const teachersSnap = await getDocs(collection(db, 'schools', schoolDoc.id, 'teachers'));
            schoolData.studentCount = studentsSnap.size;
            schoolData.teacherCount = teachersSnap.size;
            return schoolData;
          }));
          setAllSchools(schoolsData.filter(s => s !== null));
          // Load subscription payments
          const subPaymentsSnap = await getDocs(query(collection(db, 'subscriptionPayments'), orderBy('date', 'desc')));
          setSubscriptionPayments(subPaymentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } else {
          setIsSuperAdmin(false);
          const schoolDoc = await getDoc(doc(db, 'schools', currentUser.uid));
          if (schoolDoc.exists()) {
            const schoolData = { id: schoolDoc.id, ...schoolDoc.data() };
            // Check if subscription is active
            if (schoolData.status === 'disabled') {
              alert('Votre compte est desactive. Contactez l\'administrateur.');
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
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => { if (school) loadAllData(); }, [school]);

  const loadAllData = async () => {
    if (!school) return;
    try {
      const studentsSnap = await getDocs(query(collection(db, 'schools', school.id, 'students'), orderBy('lastName')));
      setStudents(studentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const teachersSnap = await getDocs(collection(db, 'schools', school.id, 'teachers'));
      setTeachers(teachersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const classesSnap = await getDocs(collection(db, 'schools', school.id, 'classes'));
      setClasses(classesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const periodsSnap = await getDocs(collection(db, 'schools', school.id, 'gradingPeriods'));
      setGradingPeriods(periodsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const gradesSnap = await getDocs(collection(db, 'schools', school.id, 'grades'));
      setGrades(gradesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const paymentsSnap = await getDocs(query(collection(db, 'schools', school.id, 'payments'), orderBy('date', 'desc')));
      setPayments(paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const teacherPaymentsSnap = await getDocs(query(collection(db, 'schools', school.id, 'teacherPayments'), orderBy('date', 'desc')));
      setTeacherPayments(teacherPaymentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) { console.error('Error:', error); }
  };

  // Super Admin Functions
  const reloadAllSchools = async () => {
    const schoolsSnap = await getDocs(collection(db, 'schools'));
    const schoolsData = await Promise.all(schoolsSnap.docs.map(async (schoolDoc) => {
      const schoolData = { id: schoolDoc.id, ...schoolDoc.data() };
      // Skip super admin account
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

  const saveSubscriptionPayment = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'subscriptionPayments'), {
        schoolId: formData.schoolId,
        amount: parseFloat(formData.amount),
        date: formData.date || new Date().toISOString().split('T')[0],
        method: formData.method || 'Especes',
        description: formData.description || (formData.isSetupFee ? 'Frais installation' : 'Abonnement'),
        isSetupFee: formData.isSetupFee || false,
        createdAt: serverTimestamp()
      });
      setShowAdminModal(false);
      setFormData({});
      reloadSubscriptionPayments();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const deleteSubscriptionPayment = async (id) => {
    if (!confirm('Supprimer ce paiement?')) return;
    await deleteDoc(doc(db, 'subscriptionPayments', id));
    reloadSubscriptionPayments();
  };

  const updateSchoolContract = async (schoolId, annualFee, setupFee) => {
    try {
      await updateDoc(doc(db, 'schools', schoolId), { 
        annualFee: parseFloat(annualFee) || 0,
        setupFee: parseFloat(setupFee) || 0
      });
      await reloadAllSchools();
      // Reload viewingSchool data
      const schoolDoc = await getDoc(doc(db, 'schools', schoolId));
      if (schoolDoc.exists()) {
        setViewingSchool(prev => ({ ...prev, ...schoolDoc.data() }));
      }
      alert('Sauvegarde!');
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  const getSchoolBalance = (schoolId) => {
    const school = allSchools.find(s => s.id === schoolId);
    const annualFee = parseFloat(school?.annualFee) || 0;
    const monthlyFee = annualFee / 12;
    // Calculate months since creation
    const createdAt = school?.createdAt?.toDate?.() || new Date(school?.createdAt);
    const now = new Date();
    const monthsSinceCreation = Math.max(1, Math.floor((now - createdAt) / (30 * 24 * 60 * 60 * 1000)));
    const totalDue = monthlyFee * monthsSinceCreation;
    const totalPaid = subscriptionPayments.filter(p => p.schoolId === schoolId && !p.isSetupFee).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    return totalDue - totalPaid;
  };

  const isSetupFeePaid = (schoolId) => {
    return subscriptionPayments.some(p => p.schoolId === schoolId && p.isSetupFee);
  };

  const getSchoolMonthlyFee = (schoolId) => {
    const school = allSchools.find(s => s.id === schoolId);
    const annualFee = parseFloat(school?.annualFee) || 0;
    return (annualFee / 12).toFixed(0);
  };

  const openContractModal = (school) => {
    setFormData({
      contractSchoolName: school.name || '',
      contractEmail: school.email || '',
      contractPhone: school.phone || '',
      contractAddress: school.address || '',
      contractSetupFee: school.setupFee || 0,
      contractAnnualFee: school.annualFee || 0,
      contractSchoolId: school.id,
      contractLogo: school.logo || '',
      contractDirectorName: school.directorName || '',
      contractDirectorTitle: school.directorTitle || 'Directeur'
    });
    setAdminModalType('editContract');
    setShowAdminModal(true);
  };

  const generateSchoolContract = () => {
    const annualFee = parseFloat(formData.contractAnnualFee) || 0;
    const monthlyFee = (annualFee / 12).toFixed(2);
    const setupFee = parseFloat(formData.contractSetupFee) || 0;
    const logoHtml = formData.contractLogo ? `<img src="${formData.contractLogo}" style="max-height:80px;max-width:150px;object-fit:contain;"/>` : '';
    const w = window.open('','_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Contrat Abonnement</title></head><body style="font-family:sans-serif;padding:20px;max-width:700px;margin:0 auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;border-bottom:2px solid #6b21a8;padding-bottom:20px;">
        <div>
          <h1 style="color:#6b21a8;margin:0;">SOCRATES</h1>
          <p style="color:#666;font-style:italic;margin:5px 0 0 0;">Systeme de Gestion Scolaire</p>
        </div>
        ${logoHtml}
      </div>
      <h2 style="text-align:center;margin-bottom:10px;">CONTRAT D'ABONNEMENT</h2>
      <p style="text-align:center;color:#666;">Annee ${new Date().getFullYear()}-${new Date().getFullYear()+1}</p>
      
      <h3 style="color:#6b21a8;">1. PARTIES</h3>
      <p><strong>Le Fournisseur:</strong> SOCRATES - Plateforme de Gestion Scolaire</p>
      <div style="background:#f9f9f9;padding:15px;border-radius:8px;margin:10px 0;">
        <p style="margin:5px 0;"><strong>Le Client:</strong> ${formData.contractSchoolName}</p>
        ${formData.contractDirectorName ? `<p style="margin:5px 0;"><strong>Represente par:</strong> ${formData.contractDirectorName}, ${formData.contractDirectorTitle || 'Directeur'}</p>` : ''}
        ${formData.contractAddress ? `<p style="margin:5px 0;"><strong>Adresse:</strong> ${formData.contractAddress}</p>` : ''}
        <p style="margin:5px 0;"><strong>Email:</strong> ${formData.contractEmail || 'N/A'}</p>
        <p style="margin:5px 0;"><strong>Telephone:</strong> ${formData.contractPhone || 'N/A'}</p>
      </div>
      
      <h3 style="color:#6b21a8;">2. OBJET DU CONTRAT</h3>
      <p>Le present contrat definit les conditions d'utilisation de la plateforme SOCRATES pour la gestion scolaire, incluant:</p>
      <ul>
        <li>Gestion des eleves et enseignants</li>
        <li>Suivi des notes et bulletins</li>
        <li>Gestion des paiements</li>
        <li>Portail parents</li>
        <li>Support technique</li>
      </ul>
      
      <h3 style="color:#6b21a8;">3. CONDITIONS FINANCIERES</h3>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr><td style="padding:12px;border:1px solid #ddd;background:#f8f8f8;"><strong>Frais d'Installation</strong> <span style="color:#666;font-size:0.85em;">(une seule fois)</span></td><td style="padding:12px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${setupFee.toFixed(2)}</td></tr>
        <tr><td style="padding:12px;border:1px solid #ddd;">Abonnement Annuel</td><td style="padding:12px;border:1px solid #ddd;text-align:right;">HTG ${annualFee.toFixed(2)}</td></tr>
        <tr><td style="padding:12px;border:1px solid #ddd;"><em>Paiement Mensuel (x12)</em></td><td style="padding:12px;border:1px solid #ddd;text-align:right;"><em>HTG ${monthlyFee}</em></td></tr>
      </table>
      
      <h3 style="color:#6b21a8;">4. MODALITES DE PAIEMENT</h3>
      <p>Les frais d'installation sont dus avant l'activation du compte. Les paiements mensuels sont dus le 1er de chaque mois.</p>
      <p><strong>Methodes acceptees:</strong> Especes, MonCash, Virement bancaire, Cheque</p>
      
      <h3 style="color:#6b21a8;">5. DUREE</h3>
      <p>Ce contrat est valide pour une duree de 12 mois a partir de la date de signature. Il sera renouvele automatiquement sauf avis contraire.</p>
      
      <h3 style="color:#6b21a8;">6. SIGNATURES</h3>
      <div style="display:flex;justify-content:space-between;margin-top:50px;">
        <div style="width:45%;text-align:center;">
          <div style="border-top:1px solid #000;padding-top:10px;">SOCRATES<br/><span style="font-size:0.9em;color:#666;">Le Fournisseur</span></div>
        </div>
        <div style="width:45%;text-align:center;">
          <div style="border-top:1px solid #000;padding-top:10px;">${formData.contractDirectorName || formData.contractSchoolName}<br/><span style="font-size:0.9em;color:#666;">${formData.contractDirectorTitle || 'Le Client'}</span></div>
        </div>
      </div>
      <p style="text-align:center;margin-top:40px;color:#666;">Date: _______________________</p>
      <button onclick="window.print()" style="margin-top:30px;padding:15px 30px;font-size:1em;width:100%;background:#6b21a8;color:white;border:none;border-radius:8px;cursor:pointer;">Imprimer</button>
    </body></html>`);
    w.document.close();
    setShowAdminModal(false);
    setFormData({});
  };

  const getTotalSubscriptionRevenue = () => {
    return subscriptionPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
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
    const studentsSnap = await getDocs(collection(db, 'schools', schoolId, 'students'));
    const teachersSnap = await getDocs(collection(db, 'schools', schoolId, 'teachers'));
    const paymentsSnap = await getDocs(collection(db, 'schools', schoolId, 'payments'));
    const schoolDoc = await getDoc(doc(db, 'schools', schoolId));
    setViewingSchool({
      ...schoolDoc.data(),
      id: schoolId,
      students: studentsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      teachers: teachersSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      payments: paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }))
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { email, password, schoolName, phone } = formData;
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'schools', userCred.user.uid), { name: schoolName, email, phone, createdAt: serverTimestamp(), subscription: 'trial', status: 'active', trialEndsAt: new Date(Date.now() + 30*24*60*60*1000) });
      setFormData({});
    } catch (error) { alert("Echec inscription: " + error.message); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, formData.email, formData.password); setFormData({}); }
    catch (error) { alert('Echec connexion: ' + error.message); }
  };

  const handleLogout = async () => { await signOut(auth); setParentAccess(false); setParentStudent(null); setParentChildren([]); setIsSuperAdmin(false); setAllSchools([]); setViewingSchool(null); setParentSchools([]); setSchool(null); };

  const loadParentSchools = async () => {
    const schoolsSnap = await getDocs(collection(db, 'schools'));
    const schoolsList = schoolsSnap.docs
      .map(d => ({ id: d.id, name: d.data().name, email: d.data().email }))
      .filter(s => s.email !== SUPER_ADMIN_EMAIL && s.name);
    setParentSchools(schoolsList);
  };

  const loadParentSchoolStudents = async (schoolId) => {
    if (!schoolId) { setParentSchoolStudents([]); return; }
    const studentsSnap = await getDocs(collection(db, 'schools', schoolId, 'students'));
    setParentSchoolStudents(studentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const handleParentLogin = async (e) => {
    e.preventDefault();
    if (!formData.parentSchoolId) {
      alert('Veuillez selectionner une ecole.');
      return;
    }
    // Load students from selected school
    const studentsSnap = await getDocs(collection(db, 'schools', formData.parentSchoolId, 'students'));
    const schoolStudents = studentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    
    // Find first student with matching contact AND PIN (for verification)
    const verifiedStudent = schoolStudents.find(s => 
      (s.parentEmail?.toLowerCase() === formData.parentContact?.toLowerCase() || s.parentPhone === formData.parentContact) && 
      s.parentPin === formData.parentPin
    );
    
    if (verifiedStudent) {
      // Check if parent access is manually disabled
      if (verifiedStudent.parentAccessEnabled === false) {
        alert('Acces au portail parent desactive.\n\nVeuillez contacter l\'administration de l\'ecole pour plus d\'informations.');
        return;
      }
      
      // Load payments to check balance
      const paymentsSnap = await getDocs(collection(db, 'schools', formData.parentSchoolId, 'payments'));
      const allPayments = paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Check if auto-block for non-payment is enabled and student has balance
      const schoolDoc = await getDoc(doc(db, 'schools', formData.parentSchoolId));
      const schoolData = schoolDoc.data();
      
      if (schoolData?.blockParentOnDebt) {
        const studentPayments = allPayments.filter(p => p.studentId === verifiedStudent.id);
        const totalPaid = studentPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        const totalDue = (parseFloat(verifiedStudent.annualTuition) || 0) + (parseFloat(verifiedStudent.fraisDivers) || 0);
        const balance = totalDue - totalPaid;
        
        if (balance > 0) {
          alert(`Acces au portail bloque pour solde impaye.\n\nMontant du: HTG ${balance.toFixed(2)}\n\nVeuillez regulariser votre situation aupres de l'administration de l'ecole.`);
          return;
        }
      }
      
      // Find ALL children with same contact (same parent)
      const allChildren = schoolStudents.filter(s => 
        s.parentEmail?.toLowerCase() === formData.parentContact?.toLowerCase() || 
        s.parentPhone === formData.parentContact
      );
      
      setSchool({ id: formData.parentSchoolId, ...schoolData });
      // Load all related data
      const classesSnap = await getDocs(collection(db, 'schools', formData.parentSchoolId, 'classes'));
      setClasses(classesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const gradesSnap = await getDocs(collection(db, 'schools', formData.parentSchoolId, 'grades'));
      setGrades(gradesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setPayments(allPayments);
      
      setParentChildren(allChildren);
      setParentStudent(allChildren[0]);
      setParentAccess(true);
      setFormData({});
    } else {
      alert('Identifiants invalides.');
    }
  };

  const saveStudent = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        annualTuition: parseFloat(formData.annualTuition) || 0,
        fraisDivers: parseFloat(formData.fraisDivers) || 0,
        depositAmount: parseFloat(formData.depositAmount) || 0,
        depositPaid: formData.depositPaid || false,
        parentAccessEnabled: formData.parentAccessEnabled !== false,
        address: formData.address || '',
        notes: formData.notes || '',
        updatedAt: serverTimestamp()
      };
      if (editItem) await updateDoc(doc(db, 'schools', school.id, 'students', editItem.id), data);
      else await addDoc(collection(db, 'schools', school.id, 'students'), {...data, createdAt: serverTimestamp()});
      setShowModal(false); setEditItem(null); setFormData({}); loadAllData();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const deleteStudent = async (id) => { if (!confirm('Supprimer cet eleve?')) return; try { await deleteDoc(doc(db, 'schools', school.id, 'students', id)); loadAllData(); } catch (error) { alert('Erreur: ' + error.message); } };

  const saveTeacher = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        annualSalary: parseFloat(formData.annualSalary) || 0,
        updatedAt: serverTimestamp()
      };
      if (editItem) await updateDoc(doc(db, 'schools', school.id, 'teachers', editItem.id), data);
      else await addDoc(collection(db, 'schools', school.id, 'teachers'), {...data, createdAt: serverTimestamp()});
      setShowModal(false); setEditItem(null); setFormData({}); loadAllData();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const deleteTeacher = async (id) => { if (!confirm('Supprimer cet enseignant?')) return; try { await deleteDoc(doc(db, 'schools', school.id, 'teachers', id)); loadAllData(); } catch (error) { alert('Erreur: ' + error.message); } };

  const saveClass = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        books: formData.books || [],
        updatedAt: serverTimestamp()
      };
      if (editItem) await updateDoc(doc(db, 'schools', school.id, 'classes', editItem.id), data);
      else await addDoc(collection(db, 'schools', school.id, 'classes'), {...data, createdAt: serverTimestamp()});
      setShowModal(false); setEditItem(null); setFormData({}); loadAllData();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const deleteClass = async (id) => { if (!confirm('Supprimer cette classe?')) return; try { await deleteDoc(doc(db, 'schools', school.id, 'classes', id)); loadAllData(); } catch (error) { alert('Erreur: ' + error.message); } };

  const savePeriod = async (e) => {
    e.preventDefault();
    try {
      if (editItem) await updateDoc(doc(db, 'schools', school.id, 'gradingPeriods', editItem.id), formData);
      else await addDoc(collection(db, 'schools', school.id, 'gradingPeriods'), formData);
      setShowModal(false); setEditItem(null); setFormData({}); loadAllData();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const saveGrade = async (studentId, classId, periodId, score) => {
    try {
      const existingGrade = grades.find(g => g.studentId === studentId && g.classId === classId && g.periodId === periodId);
      if (existingGrade) await updateDoc(doc(db, 'schools', school.id, 'grades', existingGrade.id), {score, updatedAt: serverTimestamp()});
      else await addDoc(collection(db, 'schools', school.id, 'grades'), {studentId, classId, periodId, score, createdAt: serverTimestamp()});
      loadAllData();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const savePayment = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
        isDeposit: formData.isDeposit || false,
        date: formData.date || new Date().toISOString().split('T')[0]
      };
      if (editItem) await updateDoc(doc(db, 'schools', school.id, 'payments', editItem.id), {...data, updatedAt: serverTimestamp()});
      else await addDoc(collection(db, 'schools', school.id, 'payments'), {...data, createdAt: serverTimestamp()});
      
      // If deposit payment, mark student deposit as paid
      if (data.isDeposit && data.studentId) {
        await updateDoc(doc(db, 'schools', school.id, 'students', data.studentId), { depositPaid: true });
      }
      
      setShowModal(false); setEditItem(null); setFormData({}); loadAllData();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const deletePayment = async (id) => { if (!confirm('Supprimer ce paiement?')) return; try { await deleteDoc(doc(db, 'schools', school.id, 'payments', id)); loadAllData(); } catch (error) { alert('Erreur: ' + error.message); } };

  const saveTeacherPayment = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
        month: formData.month || new Date().toISOString().slice(0,7),
        date: formData.date || new Date().toISOString().split('T')[0]
      };
      if (editItem) await updateDoc(doc(db, 'schools', school.id, 'teacherPayments', editItem.id), {...data, updatedAt: serverTimestamp()});
      else await addDoc(collection(db, 'schools', school.id, 'teacherPayments'), {...data, createdAt: serverTimestamp()});
      setShowModal(false); setEditItem(null); setFormData({}); loadAllData();
    } catch (error) { alert('Erreur: ' + error.message); }
  };

  const deleteTeacherPayment = async (id) => { if (!confirm('Supprimer ce paiement?')) return; try { await deleteDoc(doc(db, 'schools', school.id, 'teacherPayments', id)); loadAllData(); } catch (error) { alert('Erreur: ' + error.message); } };

  const openModal = (type, item = null) => { setModalType(type); setEditItem(item); setFormData(item || {}); setShowModal(true); };
  
  // Calculate student balance (annual tuition + frais divers - all payments except deposits)
  const getStudentBalance = (studentId) => { 
    const student = students.find(s => s.id === studentId); 
    const annual = (parseFloat(student?.annualTuition) || 0) + (parseFloat(student?.fraisDivers) || 0);
    const paid = payments.filter(p => p.studentId === studentId && !p.isDeposit).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0); 
    return annual - paid; 
  };

  // Calculate monthly payment for student (scolarite only / 10 months)
  const getMonthlyTuition = (student) => {
    const scolarite = parseFloat(student?.annualTuition) || 0;
    return (scolarite / 10).toFixed(2);
  };

  // Get total annual for student
  const getStudentTotal = (student) => {
    return (parseFloat(student?.annualTuition) || 0) + (parseFloat(student?.fraisDivers) || 0);
  };

  // Calculate teacher balance (annual salary - all payments)
  const getTeacherBalance = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    const annual = parseFloat(teacher?.annualSalary) || 0;
    const paid = teacherPayments.filter(p => p.teacherId === teacherId).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    return annual - paid;
  };

  // Calculate monthly salary for teacher
  const getMonthlySalary = (teacher) => {
    const annual = parseFloat(teacher?.annualSalary) || 0;
    return (annual / 10).toFixed(2); // 10 months school year
  };

  const getLetterGrade = (score) => { const num = parseFloat(score); if (num >= 90) return 'A'; if (num >= 80) return 'B'; if (num >= 70) return 'C'; if (num >= 60) return 'D'; return 'F'; };

  const generateReportCard = (student) => {
    const studentGrades = grades.filter(g => g.studentId === student.id);
    const studentClasses = classes.filter(c => student.enrolledClasses?.includes(c.id));
    const gradesHTML = studentClasses.map(cls => {
      const periodGrades = gradingPeriods.map(period => {
        const grade = studentGrades.find(g => g.classId === cls.id && g.periodId === period.id);
        return '<td style="border:1px solid #e5e7eb;padding:8px;text-align:center;">' + (grade?.score || '-') + '</td>';
      }).join('');
      const clsGrades = studentGrades.filter(g => g.classId === cls.id).map(g => parseFloat(g.score) || 0);
      const avg = clsGrades.length > 0 ? (clsGrades.reduce((a,b)=>a+b,0)/clsGrades.length).toFixed(1) : '-';
      return '<tr><td style="border:1px solid #e5e7eb;padding:8px;font-weight:500;">'+cls.name+'</td>'+periodGrades+'<td style="border:1px solid #e5e7eb;padding:8px;text-align:center;font-weight:bold;">'+avg+'</td></tr>';
    }).join('');
    const periodHeaders = gradingPeriods.map(p=>'<th style="border:1px solid #e5e7eb;padding:8px;background:#f8fafc;">'+p.name+'</th>').join('');
    const allScores = studentGrades.map(g=>parseFloat(g.score)||0).filter(s=>s>0);
    const gpa = allScores.length>0?(allScores.reduce((a,b)=>a+b,0)/allScores.length).toFixed(2):'N/A';
    const w = window.open('','_blank');
    w.document.write('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Bulletin</title></head><body style="font-family:sans-serif;padding:20px;max-width:100%;"><h1 style="color:#1e3a5f;font-size:1.5em;">'+(school?.name||'SOCRATES')+'</h1><h2 style="font-size:1.2em;">Bulletin Scolaire</h2><p><strong>Eleve:</strong> '+student.firstName+' '+student.lastName+'</p><p><strong>Niveau:</strong> '+(student.gradeLevel||'N/A')+'</p><div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:0.9em;"><thead><tr><th style="border:1px solid #e5e7eb;padding:8px;background:#1e3a5f;color:white;">Matiere</th>'+periodHeaders+'<th style="border:1px solid #e5e7eb;padding:8px;background:#f8fafc;">Moy.</th></tr></thead><tbody>'+gradesHTML+'</tbody></table></div><div style="background:#1e3a5f;color:white;padding:20px;text-align:center;border-radius:8px;"><p style="margin:0;">Moyenne Generale</p><h1 style="margin:10px 0;">'+gpa+'</h1></div><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;">Imprimer</button></body></html>');
    w.document.close();
  };

  const generateReceipt = (payment, isTeacher = false) => {
    const person = isTeacher ? teachers.find(t=>t.id===payment.teacherId) : students.find(s=>s.id===payment.studentId);
    const title = isTeacher ? 'Paiement Enseignant' : (payment.isDeposit ? 'Recu de Depot' : 'Recu de Paiement');
    const w = window.open('','_blank');
    w.document.write('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Recu</title></head><body style="font-family:sans-serif;padding:20px;max-width:400px;margin:0 auto;"><h1 style="color:#1e3a5f;font-size:1.5em;text-align:center;">'+(school?.name||'SOCRATES')+'</h1><h3 style="text-align:center;">'+title+'</h3><p style="text-align:center;color:#666;">Recu #'+payment.id.slice(0,8).toUpperCase()+'</p><hr/><p><strong>Date:</strong> '+new Date(payment.date).toLocaleDateString()+'</p><p><strong>'+(isTeacher?'Enseignant':'Eleve')+':</strong> '+(person?person.firstName+' '+person.lastName:'N/A')+'</p><p><strong>Description:</strong> '+(payment.description||(payment.isDeposit?'Depot de reservation':(isTeacher?'Salaire':'Frais de scolarite')))+'</p><p><strong>Methode:</strong> '+(payment.method||'Especes')+'</p><div style="background:#f0f0f0;padding:20px;text-align:center;margin:20px 0;border-radius:8px;"><p style="margin:0;">Montant Paye</p><h1 style="color:#1e3a5f;margin:10px 0;">HTG '+payment.amount.toFixed(2)+'</h1></div><p style="text-align:center;color:green;font-weight:bold;font-size:1.2em;">PAYE</p><button onclick="window.print()" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;">Imprimer</button></body></html>');
    w.document.close();
  };

  const generateContract = (person, isTeacher = false) => {
    const scolarite = parseFloat(person.annualTuition) || 0;
    const fraisDivers = parseFloat(person.fraisDivers) || 0;
    const annual = isTeacher ? (parseFloat(person.annualSalary)||0) : (scolarite + fraisDivers);
    const monthly = (scolarite / 10).toFixed(2);
    const title = isTeacher ? 'Contrat Enseignant' : 'Contrat Eleve';
    const w = window.open('','_blank');
    w.document.write(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head><body style="font-family:sans-serif;padding:20px;max-width:600px;margin:0 auto;">
      <h1 style="color:#1e3a5f;text-align:center;">${school?.name||'SOCRATES'}</h1>
      <h2 style="text-align:center;">${title}</h2>
      <p style="text-align:center;color:#666;">Annee Scolaire ${new Date().getFullYear()}-${new Date().getFullYear()+1}</p>
      <hr/>
      <h3>Informations</h3>
      <p><strong>Nom:</strong> ${person.firstName} ${person.lastName}</p>
      ${!isTeacher ? `<p><strong>Niveau:</strong> ${person.gradeLevel || 'N/A'}</p>` : `<p><strong>Matiere:</strong> ${person.subject || 'N/A'}</p>`}
      <p><strong>Telephone:</strong> ${person.phone || person.parentPhone || 'N/A'}</p>
      <p><strong>Email:</strong> ${person.email || person.parentEmail || 'N/A'}</p>
      
      <h3>Conditions Financieres</h3>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        ${isTeacher ? `
        <tr><td style="padding:10px;border:1px solid #ddd;"><strong>Salaire Annuel</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${parseFloat(person.annualSalary||0).toFixed(2)}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;"><strong>Paiement Mensuel (10 mois)</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${(parseFloat(person.annualSalary||0)/10).toFixed(2)}</td></tr>
        ` : `
        <tr><td style="padding:10px;border:1px solid #ddd;">Scolarite (10 mois)</td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${scolarite.toFixed(2)}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;"><em>Paiement mensuel</em></td><td style="padding:10px;border:1px solid #ddd;text-align:right;"><em>HTG ${monthly}</em></td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;">Frais divers <span style="color:#c65;font-size:0.85em;">(paye d'avance)</span></td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${fraisDivers.toFixed(2)}</td></tr>
        <tr style="background:#f8f8f8;"><td style="padding:10px;border:1px solid #ddd;"><strong>Total Annuel</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:bold;">HTG ${annual.toFixed(2)}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;"><strong>Depot de Reservation</strong></td><td style="padding:10px;border:1px solid #ddd;text-align:right;">HTG ${parseFloat(person.depositAmount||0).toFixed(2)} ${person.depositPaid ? '(Paye)' : '(Non paye)'}</td></tr>
        `}
      </table>
      
      <h3>Signatures</h3>
      <div style="display:flex;justify-content:space-between;margin-top:40px;">
        <div style="width:45%;"><div style="border-top:1px solid #000;padding-top:5px;text-align:center;">Directeur/Directrice</div></div>
        <div style="width:45%;"><div style="border-top:1px solid #000;padding-top:5px;text-align:center;">${isTeacher ? 'Enseignant(e)' : 'Parent/Tuteur'}</div></div>
      </div>
      <p style="text-align:center;margin-top:30px;color:#666;">Date: _________________</p>
      <button onclick="window.print()" style="margin-top:20px;padding:15px 30px;font-size:1em;width:100%;">Imprimer</button>
    </body></html>`);
    w.document.close();
  };

  // Add book to form
  const addBook = () => {
    const books = formData.books || [];
    setFormData({...formData, books: [...books, {title: '', author: '', isbn: ''}]});
  };

  const updateBook = (index, field, value) => {
    const books = [...(formData.books || [])];
    books[index] = {...books[index], [field]: value};
    setFormData({...formData, books});
  };

  const removeBook = (index) => {
    const books = [...(formData.books || [])];
    books.splice(index, 1);
    setFormData({...formData, books});
  };

  const filteredStudents = students.filter(s=>(s.firstName+' '+s.lastName).toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredTeachers = teachers.filter(t=>(t.firstName+' '+t.lastName).toLowerCase().includes(searchTerm.toLowerCase()));
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalRevenue = payments.reduce((sum,p)=>sum+(parseFloat(p.amount)||0),0);
  const totalTeacherPayments = teacherPayments.reduce((sum,p)=>sum+(parseFloat(p.amount)||0),0);
  const studentsWithoutDeposit = students.filter(s=>!s.depositPaid).length;
  const pendingTeacherPayments = teachers.filter(t=>getTeacherBalance(t.id)>0).length;

  if (loading) return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-socrates-navy to-socrates-blue"><div className="text-center text-white"><div className="text-5xl mb-4">S</div><h1 className="font-display text-2xl mb-2">SOCRATES</h1><p className="text-blue-200">Chargement...</p></div></div>);

  // SUPER ADMIN PANEL
  if (isSuperAdmin && user) {
    const filteredSchools = allSchools.filter(s => 
      (s.name?.toLowerCase() || '').includes(schoolSearchTerm.toLowerCase()) ||
      (s.email?.toLowerCase() || '').includes(schoolSearchTerm.toLowerCase())
    );
    const activeSchools = allSchools.filter(s => s.status !== 'disabled').length;
    const totalStudents = allSchools.reduce((sum, s) => sum + (s.studentCount || 0), 0);
    const totalTeachers = allSchools.reduce((sum, s) => sum + (s.teacherCount || 0), 0);
    const trialSchools = allSchools.filter(s => s.subscription === 'trial').length;

    // Viewing a specific school
    if (viewingSchool) {
      const schoolRevenue = viewingSchool.payments?.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0) || 0;
      const schoolSubPayments = subscriptionPayments.filter(p => p.schoolId === viewingSchool.id);
      const schoolBalance = getSchoolBalance(viewingSchool.id);
      return (
        <div className="min-h-screen bg-gray-100">
          <header className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setViewingSchool(null)} className="p-2 bg-white/20 rounded-lg"><X size={20}/></button>
                <div><h1 className="font-bold text-lg">{viewingSchool.name}</h1><p className="text-xs text-purple-200">{viewingSchool.email}</p></div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${viewingSchool.status === 'disabled' ? 'bg-red-500' : viewingSchool.subscription === 'trial' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                {viewingSchool.status === 'disabled' ? 'Desactive' : viewingSchool.subscription === 'trial' ? 'Essai' : 'Actif'}
              </span>
            </div>
          </header>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl shadow p-4 text-center"><p className="text-2xl font-bold text-purple-700">{viewingSchool.students?.length || 0}</p><p className="text-xs text-gray-500">Eleves</p></div>
              <div className="bg-white rounded-xl shadow p-4 text-center"><p className="text-2xl font-bold text-purple-700">{viewingSchool.teachers?.length || 0}</p><p className="text-xs text-gray-500">Enseignants</p></div>
            </div>

            {/* Balance Card */}
            <div className={`rounded-xl shadow p-4 ${schoolBalance > 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Balance</p>
                  <p className="text-3xl font-bold">HTG {Math.abs(schoolBalance).toFixed(0)}</p>
                  <p className="text-sm opacity-90">{schoolBalance > 0 ? 'Du' : 'A jour'}</p>
                </div>
                <button onClick={() => { setFormData({schoolId: viewingSchool.id}); setAdminModalType('subscriptionPayment'); setShowAdminModal(true); }} className="bg-white/20 p-3 rounded-xl"><Plus size={24}/></button>
              </div>
            </div>

            {/* Contract Settings */}
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-gray-800 mb-3">Contrat Annuel</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Frais d'installation (HTG) <span className="text-xs text-orange-600">une seule fois</span></label>
                  <input type="number" placeholder="Ex: 10000" value={viewingSchool.setupFee || ''} onChange={e => setViewingSchool({...viewingSchool, setupFee: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-lg"/>
                  {isSetupFeePaid(viewingSchool.id) ? <span className="text-xs text-green-600">✓ Payé</span> : <span className="text-xs text-red-500">Non payé</span>}
                </div>
                <div>
                  <label className="text-sm text-gray-600">Abonnement annuel (HTG)</label>
                  <input type="number" placeholder="Ex: 60000" value={viewingSchool.annualFee || ''} onChange={e => setViewingSchool({...viewingSchool, annualFee: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-lg"/>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Mensuel (÷12)</span>
                  <span className="font-bold">HTG {((parseFloat(viewingSchool.annualFee) || 0) / 12).toFixed(0)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateSchoolContract(viewingSchool.id, viewingSchool.annualFee, viewingSchool.setupFee)} className="bg-purple-600 text-white px-4 py-3 rounded-xl font-medium">Sauvegarder</button>
                  <button onClick={() => openContractModal(viewingSchool)} className="bg-purple-100 text-purple-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><FileText size={18}/>Contrat</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-gray-800 mb-3">Informations</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> {viewingSchool.email}</p>
                <p><strong>Tel:</strong> {viewingSchool.phone || 'N/A'}</p>
                <p><strong>Inscription:</strong> {viewingSchool.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</p>
                <p><strong>Abonnement:</strong> {viewingSchool.subscription || 'trial'}</p>
                {viewingSchool.subscription === 'trial' && <p><strong>Fin essai:</strong> {viewingSchool.trialEndsAt?.toDate?.()?.toLocaleDateString() || new Date(viewingSchool.trialEndsAt).toLocaleDateString()}</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-gray-800 mb-3">Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { toggleSchoolStatus(viewingSchool.id, viewingSchool.status); setViewingSchool(null); }} className={`p-3 rounded-xl font-medium ${viewingSchool.status === 'disabled' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {viewingSchool.status === 'disabled' ? 'Activer' : 'Desactiver'}
                </button>
                <button onClick={() => { extendTrial(viewingSchool.id, 30); setViewingSchool(null); }} className="p-3 rounded-xl font-medium bg-yellow-100 text-yellow-700">+30 jours essai</button>
                <button onClick={() => { updateSchoolSubscription(viewingSchool.id, 'monthly'); setViewingSchool(null); }} className="p-3 rounded-xl font-medium bg-blue-100 text-blue-700">Abo Mensuel</button>
                <button onClick={() => { updateSchoolSubscription(viewingSchool.id, 'yearly'); setViewingSchool(null); }} className="p-3 rounded-xl font-medium bg-purple-100 text-purple-700">Abo Annuel</button>
              </div>
            </div>

            {/* Subscription Payment History */}
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-gray-800 mb-3">Paiements Abonnement</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {schoolSubPayments.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-bold text-green-600">HTG {parseFloat(p.amount).toFixed(0)} {p.isSetupFee && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded ml-1">Installation</span>}</p>
                      <p className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()} - {p.method}</p>
                    </div>
                    <button onClick={() => deleteSubscriptionPayment(p.id)} className="text-red-500 p-2"><Trash2 size={16}/></button>
                  </div>
                ))}
                {schoolSubPayments.length === 0 && <p className="text-gray-400 text-center py-4">Aucun paiement</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-gray-800 mb-3">Eleves ({viewingSchool.students?.length || 0})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {viewingSchool.students?.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm">
                    <span>{s.firstName} {s.lastName}</span>
                    <span className="text-gray-500">{s.gradeLevel}</span>
                  </div>
                ))}
                {(!viewingSchool.students || viewingSchool.students.length === 0) && <p className="text-gray-400 text-center py-4">Aucun eleve</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-gray-800 mb-3">Enseignants ({viewingSchool.teachers?.length || 0})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {viewingSchool.teachers?.map(t => (
                  <div key={t.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm">
                    <span>{t.firstName} {t.lastName}</span>
                    <span className="text-gray-500">{t.subject || 'N/A'}</span>
                  </div>
                ))}
                {(!viewingSchool.teachers || viewingSchool.teachers.length === 0) && <p className="text-gray-400 text-center py-4">Aucun enseignant</p>}
              </div>
            </div>
          </div>

          {/* Edit Contract Modal */}
          {showAdminModal && adminModalType === 'editContract' && (
            <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
              <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-5 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Editer Contrat</h3>
                  <button onClick={() => { setShowAdminModal(false); setFormData({}); }} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><X size={20}/></button>
                </div>
                <div className="p-5 space-y-4">
                  {formData.contractLogo && <div className="flex justify-center"><img src={formData.contractLogo} alt="Logo" className="h-16 object-contain"/></div>}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'ecole</label>
                    <input type="text" value={formData.contractSchoolName || ''} onChange={e => setFormData({...formData, contractSchoolName: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input type="text" value={formData.contractAddress || ''} onChange={e => setFormData({...formData, contractAddress: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={formData.contractEmail || ''} onChange={e => setFormData({...formData, contractEmail: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                      <input type="tel" value={formData.contractPhone || ''} onChange={e => setFormData({...formData, contractPhone: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Directeur / Representant</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Nom</label>
                        <input type="text" value={formData.contractDirectorName || ''} onChange={e => setFormData({...formData, contractDirectorName: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Jean Baptiste"/>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Titre</label>
                        <input type="text" value={formData.contractDirectorTitle || ''} onChange={e => setFormData({...formData, contractDirectorTitle: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Directeur"/>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Tarification</p>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Frais d'installation (HTG)</label>
                      <input type="number" min="0" value={formData.contractSetupFee || ''} onChange={e => setFormData({...formData, contractSetupFee: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm text-gray-600 mb-1">Abonnement annuel (HTG)</label>
                      <input type="number" min="0" value={formData.contractAnnualFee || ''} onChange={e => setFormData({...formData, contractAnnualFee: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl mt-3">
                      <span className="text-gray-600">Mensuel (÷12)</span>
                      <span className="font-bold">HTG {((parseFloat(formData.contractAnnualFee) || 0) / 12).toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => { setShowAdminModal(false); setFormData({}); }} className="flex-1 px-4 py-4 border rounded-xl font-medium">Annuler</button>
                    <button type="button" onClick={generateSchoolContract} className="flex-1 bg-purple-600 text-white px-4 py-4 rounded-xl font-medium flex items-center justify-center gap-2"><FileText size={18}/>Imprimer</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Main super admin dashboard
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Shield size={20}/></div>
              <div><h1 className="font-bold text-lg">SOCRATES Admin</h1><p className="text-xs text-purple-200">Super Administrateur</p></div>
            </div>
            <button onClick={handleLogout} className="p-2 bg-white/20 rounded-lg"><LogOut size={20}/></button>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => { setAdminModalType('subscriptionPayment'); setShowAdminModal(true); }} className="flex-1 bg-white/20 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Plus size={16}/>Enregistrer Paiement</button>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-white rounded-xl shadow-lg p-4"><p className="text-xs text-gray-500">Ecoles</p><p className="text-2xl font-bold text-purple-700">{allSchools.length}</p><p className="text-xs text-green-600">{activeSchools} actives</p></div>
            <div className="bg-white rounded-xl shadow-lg p-4"><p className="text-xs text-gray-500">Eleves</p><p className="text-2xl font-bold text-purple-700">{totalStudents}</p></div>
            <div className="bg-white rounded-xl shadow-lg p-4"><p className="text-xs text-gray-500">Enseignants</p><p className="text-2xl font-bold text-purple-700">{totalTeachers}</p></div>
            <div className="bg-white rounded-xl shadow-lg p-4"><p className="text-xs text-gray-500">En essai</p><p className="text-2xl font-bold text-yellow-600">{trialSchools}</p></div>
            <div className="bg-white rounded-xl shadow-lg p-4"><p className="text-xs text-gray-500">Revenus</p><p className="text-2xl font-bold text-green-600">HTG {getTotalSubscriptionRevenue().toFixed(0)}</p></div>
          </div>

          {/* Schools List */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Toutes les ecoles ({allSchools.length})</h3>
              <button onClick={reloadAllSchools} className="text-purple-600 text-sm font-medium">Actualiser</button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
              <input type="text" placeholder="Rechercher ecole..." value={schoolSearchTerm} onChange={e=>setSchoolSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full text-base"/>
            </div>
            <div className="space-y-3">
              {filteredSchools.map(school => {
                const balance = getSchoolBalance(school.id);
                return (
                <div key={school.id} className="border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{school.name}</h4>
                      <p className="text-sm text-gray-500">{school.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${school.status === 'disabled' ? 'bg-red-100 text-red-700' : school.subscription === 'trial' ? 'bg-yellow-100 text-yellow-700' : school.subscription === 'monthly' ? 'bg-blue-100 text-blue-700' : school.subscription === 'yearly' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {school.status === 'disabled' ? 'Desactive' : school.subscription === 'trial' ? 'Essai' : school.subscription === 'monthly' ? 'Mensuel' : school.subscription === 'yearly' ? 'Annuel' : 'Actif'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>{school.studentCount || 0} eleves</span>
                    <span>{school.teacherCount || 0} enseignants</span>
                    {school.subscription === 'trial' && school.trialEndsAt && (
                      <span className="text-yellow-600">Expire: {new Date(school.trialEndsAt?.toDate?.() || school.trialEndsAt).toLocaleDateString()}</span>
                    )}
                  </div>
                  {school.annualFee > 0 && (
                    <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">HTG {(school.annualFee/12).toFixed(0)}/mois</span>
                      <span className={`font-bold ${balance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {balance > 0 ? `Du: HTG ${balance.toFixed(0)}` : 'A jour'}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => loadSchoolDetails(school.id)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Eye size={16}/>Voir</button>
                    <button onClick={() => toggleSchoolStatus(school.id, school.status)} className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 ${school.status === 'disabled' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {school.status === 'disabled' ? <><CheckCircle size={16}/>Activer</> : <><XCircle size={16}/>Desactiver</>}
                    </button>
                  </div>
                </div>
              )})}
              {filteredSchools.length === 0 && <p className="text-center text-gray-400 py-8">{schoolSearchTerm ? 'Aucun resultat' : 'Aucune ecole inscrite'}</p>}
            </div>
          </div>
        </div>

        {/* Admin Modal for Subscription Payment */}
        {showAdminModal && adminModalType === 'subscriptionPayment' && (
          <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md">
              <div className="p-5 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Enregistrer Paiement</h3>
                <button onClick={() => { setShowAdminModal(false); setFormData({}); }} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><X size={20}/></button>
              </div>
              <form onSubmit={saveSubscriptionPayment} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ecole</label>
                  <select value={formData.schoolId || ''} onChange={e => setFormData({...formData, schoolId: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" required>
                    <option value="">Selectionner</option>
                    {allSchools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montant (HTG)</label>
                  <input type="number" required min="0" value={formData.amount || ''} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base text-xl"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" value={formData.date || new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Methode</label>
                  <select value={formData.method || 'Especes'} onChange={e => setFormData({...formData, method: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base">
                    <option value="Especes">Especes</option>
                    <option value="MonCash">MonCash</option>
                    <option value="Virement">Virement</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input type="text" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Abonnement mensuel"/>
                </div>
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-orange-50">
                  <input type="checkbox" checked={formData.isSetupFee || false} onChange={e => setFormData({...formData, isSetupFee: e.target.checked})} className="w-5 h-5 rounded"/>
                  <span className="text-sm font-medium text-orange-700">Frais d'installation (une seule fois)</span>
                </label>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => { setShowAdminModal(false); setFormData({}); }} className="flex-1 px-4 py-4 border rounded-xl font-medium">Annuler</button>
                  <button type="submit" className="flex-1 bg-purple-600 text-white px-4 py-4 rounded-xl font-medium">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Contract Modal */}
        {showAdminModal && adminModalType === 'editContract' && (
          <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-5 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Editer Contrat</h3>
                <button onClick={() => { setShowAdminModal(false); setFormData({}); }} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><X size={20}/></button>
              </div>
              <div className="p-5 space-y-4">
                {formData.contractLogo && <div className="flex justify-center"><img src={formData.contractLogo} alt="Logo" className="h-16 object-contain"/></div>}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'ecole</label>
                  <input type="text" value={formData.contractSchoolName || ''} onChange={e => setFormData({...formData, contractSchoolName: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input type="text" value={formData.contractAddress || ''} onChange={e => setFormData({...formData, contractAddress: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={formData.contractEmail || ''} onChange={e => setFormData({...formData, contractEmail: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                    <input type="tel" value={formData.contractPhone || ''} onChange={e => setFormData({...formData, contractPhone: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Directeur / Representant</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Nom</label>
                      <input type="text" value={formData.contractDirectorName || ''} onChange={e => setFormData({...formData, contractDirectorName: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Jean Baptiste"/>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Titre</label>
                      <input type="text" value={formData.contractDirectorTitle || ''} onChange={e => setFormData({...formData, contractDirectorTitle: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Directeur"/>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Tarification</p>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Frais d'installation (HTG)</label>
                    <input type="number" min="0" value={formData.contractSetupFee || ''} onChange={e => setFormData({...formData, contractSetupFee: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm text-gray-600 mb-1">Abonnement annuel (HTG)</label>
                    <input type="number" min="0" value={formData.contractAnnualFee || ''} onChange={e => setFormData({...formData, contractAnnualFee: e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl mt-3">
                    <span className="text-gray-600">Mensuel (÷12)</span>
                    <span className="font-bold">HTG {((parseFloat(formData.contractAnnualFee) || 0) / 12).toFixed(0)}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => { setShowAdminModal(false); setFormData({}); }} className="flex-1 px-4 py-4 border rounded-xl font-medium">Annuler</button>
                  <button type="button" onClick={generateSchoolContract} className="flex-1 bg-purple-600 text-white px-4 py-4 rounded-xl font-medium flex items-center justify-center gap-2"><FileText size={18}/>Imprimer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // PARENT PORTAL
  if (parentAccess && parentStudent) {
    const studentGrades = grades.filter(g => g.studentId === parentStudent.id);
    const studentPayments = payments.filter(p => p.studentId === parentStudent.id);
    const balance = getStudentBalance(parentStudent.id);
    const studentClasses = classes.filter(c => parentStudent.enrolledClasses?.includes(c.id));
    
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">S</div>
              <div><h1 className="font-bold text-lg">SOCRATES</h1><p className="text-xs text-blue-200">Portail Parent</p></div>
            </div>
            <button onClick={()=>{setParentAccess(false);setParentStudent(null);setParentChildren([]);}} className="bg-white/20 hover:bg-white/30 p-3 rounded-full"><LogOut size={20}/></button>
          </div>
          {/* Child Selector - show if multiple children */}
          {parentChildren.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {parentChildren.map(child => (
                <button 
                  key={child.id} 
                  onClick={() => setParentStudent(child)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${parentStudent.id === child.id ? 'bg-white text-socrates-navy' : 'bg-white/20 text-white'}`}
                >
                  {child.firstName}
                </button>
              ))}
            </div>
          )}
        </header>
        <div className="p-4 space-y-4">
          {/* Student Info */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-socrates-navy to-socrates-blue text-white flex items-center justify-center text-2xl font-bold">{parentStudent.firstName?.[0]}{parentStudent.lastName?.[0]}</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{parentStudent.firstName} {parentStudent.lastName}</h2>
                <p className="text-gray-500">{parentStudent.gradeLevel || 'N/A'}</p>
                {parentStudent.address && <p className="text-sm text-gray-400">{parentStudent.address}</p>}
                {parentChildren.length > 1 && <p className="text-xs text-blue-600">{parentChildren.length} enfants inscrits</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button onClick={()=>generateContract(parentStudent)} className="bg-purple-100 text-purple-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><FileText size={20}/>Contrat</button>
              <button onClick={()=>generateReportCard(parentStudent)} className="bg-socrates-blue text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><Download size={20}/>Bulletin</button>
            </div>
          </div>

          {/* Notes from School */}
          {parentStudent.notes && parentStudent.notes.trim() !== '' && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-5">
              <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center gap-2"><ClipboardList size={20}/>Message de l'ecole</h3>
              <p className="text-blue-700">{parentStudent.notes}</p>
            </div>
          )}

          {/* Balance */}
          <div className={`rounded-2xl shadow-lg p-5 ${balance <= 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            <p className="text-sm opacity-90">Solde annuel</p>
            <p className="text-4xl font-bold mt-1">HTG {Math.abs(balance).toFixed(2)}</p>
            <p className="text-sm mt-1 opacity-90">{balance <= 0 ? 'Tout est paye!' : 'Montant du'}</p>
            <p className="text-xs mt-2 opacity-75">Paiement mensuel: HTG {getMonthlyTuition(parentStudent)}</p>
          </div>

          {/* Deposit Status */}
          {!parentStudent.depositPaid && (
            <div className="bg-yellow-500 rounded-2xl shadow-lg p-5 text-white">
              <p className="font-bold">Depot non paye</p>
              <p className="text-sm opacity-90">Montant: HTG {parseFloat(parentStudent.depositAmount||0).toFixed(2)}</p>
            </div>
          )}

          {/* Classes with Books & Curriculum */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={20} className="text-socrates-blue"/>Classes & Livres</h3>
            <div className="space-y-4">
              {studentClasses.map(cls=>(
                <div key={cls.id} className="border rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800">{cls.name}</h4>
                  {cls.curriculum && <p className="text-sm text-gray-600 mt-2"><strong>Programme:</strong> {cls.curriculum}</p>}
                  {cls.books?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">Livres requis:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                        {cls.books.map((book, i) => <li key={i}>{book.title} {book.author && `- ${book.author}`}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              {studentClasses.length===0&&<p className="text-gray-500 text-center py-4">Aucune classe inscrite</p>}
            </div>
          </div>

          {/* Grades */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><GraduationCap size={20} className="text-socrates-blue"/>Resultats Academiques</h3>
            <div className="space-y-3">
              {studentClasses.map(cls=>{
                const clsGrades=studentGrades.filter(g=>g.classId===cls.id);
                const avg=clsGrades.length>0?(clsGrades.reduce((sum,g)=>sum+(parseFloat(g.score)||0),0)/clsGrades.length).toFixed(1):'-';
                return(<div key={cls.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"><span className="font-medium text-gray-800">{cls.name}</span><div className="flex items-center gap-3"><span className="text-2xl font-bold text-socrates-navy">{avg}</span>{avg!=='-'&&<span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${parseFloat(avg)>=90?'bg-green-100 text-green-700':parseFloat(avg)>=80?'bg-blue-100 text-blue-700':parseFloat(avg)>=70?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}`}>{getLetterGrade(avg)}</span>}</div></div>);
              })}
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><DollarSign size={20} className="text-socrates-blue"/>Paiements</h3>
            <div className="space-y-3">
              {studentPayments.map(payment=>(<div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"><div><p className="font-bold text-lg text-green-600">HTG {payment.amount.toFixed(2)}</p><p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()} {payment.isDeposit && <span className="text-yellow-600">(Depot)</span>}</p></div><button onClick={()=>generateReceipt(payment)} className="w-12 h-12 rounded-full bg-socrates-blue text-white flex items-center justify-center"><Download size={20}/></button></div>))}
              {studentPayments.length===0&&<p className="text-gray-500 text-center py-6">Aucun paiement enregistre</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTH SCREEN
  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-socrates-navy via-socrates-blue to-socrates-light flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-socrates-navy to-socrates-blue flex items-center justify-center text-white text-3xl font-bold">S</div>
          <h1 className="font-display text-2xl sm:text-3xl text-socrates-navy">SOCRATES</h1>
          <p className="text-gray-500 italic text-sm">Vers la lumiere</p>
        </div>
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button onClick={()=>setAuthMode('login')} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${authMode==='login'?'bg-white shadow text-socrates-navy':'text-gray-500'}`}>Connexion</button>
          <button onClick={()=>setAuthMode('register')} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${authMode==='register'?'bg-white shadow text-socrates-navy':'text-gray-500'}`}>Inscription</button>
          <button onClick={()=>{setAuthMode('parent');loadParentSchools();}} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${authMode==='parent'?'bg-white shadow text-socrates-navy':'text-gray-500'}`}>Parent</button>
        </div>
        {authMode==='login'&&(<form onSubmit={handleLogin} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required value={formData.email||''} onChange={e=>setFormData({...formData,email:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base" placeholder="ecole@exemple.com"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label><input type="password" required value={formData.password||''} onChange={e=>setFormData({...formData,password:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base" placeholder="********"/></div>
          <button type="submit" className="w-full bg-gradient-to-r from-socrates-navy to-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">Se connecter</button>
        </form>)}
        {authMode==='register'&&(<form onSubmit={handleRegister} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'ecole</label><input type="text" required value={formData.schoolName||''} onChange={e=>setFormData({...formData,schoolName:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base" placeholder="Academie Excellence"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required value={formData.email||''} onChange={e=>setFormData({...formData,email:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base" placeholder="admin@ecole.com"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label><input type="tel" value={formData.phone||''} onChange={e=>setFormData({...formData,phone:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base" placeholder="+509 1234 5678"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label><input type="password" required minLength={6} value={formData.password||''} onChange={e=>setFormData({...formData,password:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base" placeholder="Min 6 caracteres"/></div>
          <button type="submit" className="w-full bg-gradient-to-r from-socrates-navy to-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">Creer un compte</button>
        </form>)}
        {authMode==='parent'&&(<form onSubmit={handleParentLogin} className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4"><p className="text-sm text-blue-800">Selectionnez l'ecole de votre enfant, puis entrez votre email/telephone et PIN.</p></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Ecole</label>
            <input type="text" placeholder="Tapez pour rechercher..." value={formData.schoolSearch||''} onChange={e=>{setFormData({...formData,schoolSearch:e.target.value,parentSchoolId:''});}} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base mb-2"/>
            <div className="max-h-40 overflow-y-auto border rounded-xl">
              {parentSchools.filter(s=>!formData.schoolSearch || s.name?.toLowerCase().includes(formData.schoolSearch.toLowerCase())).map(s=>(
                <button type="button" key={s.id} onClick={()=>setFormData({...formData,parentSchoolId:s.id,schoolSearch:s.name})} className={`w-full text-left px-4 py-3 border-b last:border-b-0 ${formData.parentSchoolId===s.id?'bg-blue-50 text-socrates-blue font-medium':'hover:bg-gray-50'}`}>{s.name}</button>
              ))}
              {parentSchools.filter(s=>!formData.schoolSearch || s.name?.toLowerCase().includes(formData.schoolSearch.toLowerCase())).length===0 && <p className="px-4 py-3 text-gray-400 text-center">Aucune ecole trouvee</p>}
            </div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email ou Telephone</label><input type="text" required value={formData.parentContact||''} onChange={e=>setFormData({...formData,parentContact:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-base" placeholder="parent@email.com"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">PIN</label><input type="password" required maxLength={6} value={formData.parentPin||''} onChange={e=>setFormData({...formData,parentPin:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-socrates-blue text-center text-3xl tracking-widest" placeholder="******"/></div>
          <button type="submit" className="w-full bg-gradient-to-r from-socrates-navy to-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">Acceder au portail</button>
        </form>)}
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-white/70 text-sm">
        <p>SOCRATES - Systeme de Gestion Scolaire</p>
        <p className="mt-1">Contact: anbyanssa@gmail.com | +1 305-504-0143</p>
        <p className="mt-2 text-xs text-white/50">© {new Date().getFullYear()} Tous droits reserves</p>
      </div>
    </div>
  );

  // VIEW CLASS DETAILS
  if (viewClass) {
    const classStudents = students.filter(s => s.enrolledClasses?.includes(viewClass.id));
    const teacher = teachers.find(t => t.id === viewClass.teacherId);
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={()=>setViewClass(null)} className="p-2 bg-white/20 rounded-lg"><X size={20}/></button>
            <div><h1 className="font-bold text-lg">{viewClass.name}</h1><p className="text-xs text-blue-200">{teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Aucun enseignant'}</p></div>
          </div>
        </header>
        <div className="p-4 space-y-4">
          {/* Curriculum */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><ClipboardList size={20} className="text-socrates-blue"/>Programme / Curriculum</h3>
            {viewClass.curriculum ? (
              <p className="text-gray-700 whitespace-pre-wrap">{viewClass.curriculum}</p>
            ) : (
              <p className="text-gray-400 italic">Aucun programme defini</p>
            )}
            <button onClick={()=>openModal('class', viewClass)} className="mt-4 text-socrates-blue font-medium">Modifier</button>
          </div>

          {/* Books */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><Book size={20} className="text-socrates-blue"/>Livres Requis</h3>
            {viewClass.books?.length > 0 ? (
              <div className="space-y-3">
                {viewClass.books.map((book, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl">
                    <p className="font-semibold text-gray-800">{book.title}</p>
                    {book.author && <p className="text-sm text-gray-600">Auteur: {book.author}</p>}
                    {book.isbn && <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Aucun livre defini</p>
            )}
            <button onClick={()=>openModal('class', viewClass)} className="mt-4 text-socrates-blue font-medium">Modifier</button>
          </div>

          {/* Students */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><Users size={20} className="text-socrates-blue"/>Eleves ({classStudents.length})</h3>
            <div className="space-y-2">
              {classStudents.map(student => (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-socrates-blue text-white flex items-center justify-center font-bold text-sm">{student.firstName?.[0]}{student.lastName?.[0]}</div>
                  <div className="flex-1">
                    <p className="font-medium">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-500">{student.gradeLevel}</p>
                  </div>
                </div>
              ))}
              {classStudents.length === 0 && <p className="text-gray-400 text-center py-4">Aucun eleve inscrit</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={()=>setSidebarOpen(false)}/>}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-socrates-navy to-socrates-blue text-white transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">S</div>
            <div><h1 className="font-display text-xl">SOCRATES</h1><p className="text-xs text-blue-200 italic">Vers la lumiere</p></div>
          </div>
        </div>
        <nav className="flex-1 p-4"><ul className="space-y-2">
          {[
            {id:'dashboard',icon:BarChart3,label:'Tableau de bord'},
            {id:'students',icon:Users,label:'Eleves'},
            {id:'teachers',icon:GraduationCap,label:'Enseignants'},
            {id:'classes',icon:BookOpen,label:'Classes'},
            {id:'grades',icon:FileText,label:'Notes'},
            {id:'payments',icon:DollarSign,label:'Paiements'},
            {id:'settings',icon:Settings,label:'Parametres'}
          ].map(item=>(
            <li key={item.id}><button onClick={()=>{setActiveTab(item.id);setSidebarOpen(false);setSearchTerm('');}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab===item.id?'bg-white/20 text-white':'text-blue-100 hover:bg-white/10'}`}><item.icon size={20}/><span>{item.label}</span></button></li>
          ))}
        </ul></nav>
        <div className="p-4 border-t border-white/10"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 rounded-lg transition"><LogOut size={20}/><span>Deconnexion</span></button></div>
      </aside>

      <main className="flex-1 overflow-auto w-full">
        <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 lg:hidden p-2"><Menu size={24}/></button>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{activeTab==='dashboard'?'Tableau de bord':activeTab==='students'?'Eleves':activeTab==='teachers'?'Enseignants':activeTab==='classes'?'Classes':activeTab==='grades'?'Notes':activeTab==='payments'?'Paiements':'Parametres'}</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{school?.name}</span>
            <div className="w-10 h-10 rounded-full bg-socrates-navy text-white flex items-center justify-center font-bold">{school?.name?.[0]||'S'}</div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* DASHBOARD */}
          {activeTab==='dashboard'&&(
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6"><p className="text-xs sm:text-sm text-gray-500">Eleves</p><p className="text-2xl sm:text-3xl font-bold text-socrates-navy">{totalStudents}</p></div>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6"><p className="text-xs sm:text-sm text-gray-500">Enseignants</p><p className="text-2xl sm:text-3xl font-bold text-socrates-navy">{totalTeachers}</p></div>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6"><p className="text-xs sm:text-sm text-gray-500">Revenus</p><p className="text-2xl sm:text-3xl font-bold text-green-600">HTG {totalRevenue.toFixed(0)}</p></div>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6"><p className="text-xs sm:text-sm text-gray-500">Salaires payes</p><p className="text-2xl sm:text-3xl font-bold text-orange-500">HTG {totalTeacherPayments.toFixed(0)}</p></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Eleves</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-gray-500">Sans depot</span><span className="text-yellow-500 font-bold">{studentsWithoutDeposit}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-500">Total frais annuels</span><span className="text-gray-800 font-bold">HTG {students.reduce((sum,s)=>sum+(parseFloat(s.annualTuition)||0)+(parseFloat(s.fraisDivers)||0),0).toFixed(0)}</span></div>
                  </div>
                  <button onClick={()=>{setActiveTab('students');openModal('student');}} className="w-full mt-4 bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18}/>Ajouter Eleve</button>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Enseignants</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-gray-500">Salaires dus</span><span className="text-red-500 font-bold">{pendingTeacherPayments}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-500">Total salaires annuels</span><span className="text-gray-800 font-bold">HTG {teachers.reduce((sum,t)=>sum+(parseFloat(t.annualSalary)||0),0).toFixed(0)}</span></div>
                  </div>
                  <button onClick={()=>{setActiveTab('teachers');openModal('teacher');}} className="w-full mt-4 bg-green-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18}/>Ajouter Enseignant</button>
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS */}
          {activeTab==='students'&&(
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full sm:w-64 text-base"/></div>
                <button onClick={()=>openModal('student')} className="bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18}/>Ajouter Eleve</button>
              </div>
              <div className="space-y-3">
                {filteredStudents.map(student=>(
                  <div key={student.id} className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-socrates-blue text-white flex items-center justify-center font-bold">{student.firstName?.[0]}{student.lastName?.[0]}</div>
                      <div className="flex-1">
                        <p className="font-semibold">{student.firstName} {student.lastName}</p>
                        <p className="text-sm text-gray-500">{student.gradeLevel||'N/A'}{student.address && ` • ${student.address}`}</p>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {!student.depositPaid && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Sans depot</span>}
                          {student.parentAccessEnabled===false && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Portail bloque</span>}
                          <span className="text-xs text-gray-400">HTG {getMonthlyTuition(student)}/mois</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${getStudentBalance(student.id)>0?'text-red-500':'text-green-500'}`}>HTG {Math.abs(getStudentBalance(student.id)).toFixed(0)}</span>
                        <p className="text-xs text-gray-400">{getStudentBalance(student.id)>0?'du':'paye'}</p>
                      </div>
                    </div>
                    {/* Notes */}
                    {student.notes && student.notes.trim() !== '' && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm"><p className="text-yellow-800"><strong>Message:</strong> {student.notes}</p></div>}
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={()=>generateContract(student)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16}/>Contrat</button>
                      <button onClick={()=>generateReportCard(student)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Download size={16}/>Bulletin</button>
                      <button onClick={async()=>{await updateDoc(doc(db,'schools',school.id,'students',student.id),{parentAccessEnabled:student.parentAccessEnabled===false?true:false});loadAllData();}} className={`px-3 py-2 rounded-lg text-sm font-medium ${student.parentAccessEnabled===false?'bg-red-100 text-red-600':'bg-green-100 text-green-600'}`} title={student.parentAccessEnabled===false?'Activer portail parent':'Desactiver portail parent'}>{student.parentAccessEnabled===false?<XCircle size={16}/>:<CheckCircle size={16}/>}</button>
                      <button onClick={()=>openModal('student',student)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Edit size={16}/></button>
                      <button onClick={()=>deleteStudent(student.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
                {filteredStudents.length===0&&<div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><Users size={48} className="mx-auto mb-4 opacity-50"/><p>Aucun eleve</p></div>}
              </div>
            </div>
          )}

          {/* TEACHERS */}
          {activeTab==='teachers'&&(
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full sm:w-64 text-base"/></div>
                <div className="flex gap-2">
                  <button onClick={()=>openModal('teacherPayment')} className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><DollarSign size={18}/>Payer</button>
                  <button onClick={()=>openModal('teacher')} className="flex-1 sm:flex-none bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18}/>Ajouter</button>
                </div>
              </div>
              <div className="space-y-3">
                {filteredTeachers.map(teacher=>(
                  <div key={teacher.id} className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">{teacher.firstName?.[0]}{teacher.lastName?.[0]}</div>
                      <div className="flex-1">
                        <p className="font-semibold">{teacher.firstName} {teacher.lastName}</p>
                        <p className="text-sm text-gray-500">{teacher.subject||'N/A'}</p>
                        <p className="text-xs text-gray-400">${getMonthlySalary(teacher)}/mois</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Annuel: ${teacher.annualSalary||0}</p>
                        <p className={`font-bold ${getTeacherBalance(teacher.id)>0?'text-red-500':'text-green-500'}`}>
                          {getTeacherBalance(teacher.id)>0?`Du: HTG {getTeacherBalance(teacher.id).toFixed(0)}`:'Paye'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={()=>generateContract(teacher, true)} className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><FileText size={16}/>Contrat</button>
                      <button onClick={()=>{setFormData({teacherId:teacher.id,amount:getMonthlySalary(teacher)});openModal('teacherPayment');}} className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><DollarSign size={16}/>Payer</button>
                      <button onClick={()=>openModal('teacher',teacher)} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"><Edit size={16}/></button>
                      <button onClick={()=>deleteTeacher(teacher.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
                {filteredTeachers.length===0&&<div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><GraduationCap size={48} className="mx-auto mb-4 opacity-50"/><p>Aucun enseignant</p></div>}
              </div>
            </div>
          )}

          {/* CLASSES */}
          {activeTab==='classes'&&(
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Classes</h3>
                <div className="flex gap-2">
                  <button onClick={()=>openModal('period')} className="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Calendar size={18}/>Periodes</button>
                  <button onClick={()=>openModal('class')} className="flex-1 sm:flex-none bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18}/>Ajouter</button>
                </div>
              </div>
              {gradingPeriods.length>0&&<div className="bg-white rounded-xl shadow-lg p-4"><h4 className="font-medium text-gray-700 mb-3">Periodes</h4><div className="flex flex-wrap gap-2">{gradingPeriods.map(period=>(<span key={period.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{period.name}</span>))}</div></div>}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map(cls=>{
                  const teacher = teachers.find(t=>t.id===cls.teacherId);
                  const studentCount = students.filter(s=>s.enrolledClasses?.includes(cls.id)).length;
                  return(
                    <div key={cls.id} className="bg-white rounded-xl shadow-lg p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-socrates-navy to-socrates-blue text-white flex items-center justify-center"><BookOpen size={24}/></div>
                        <div className="flex gap-1">
                          <button onClick={()=>openModal('class',cls)} className="p-2 text-gray-400 hover:text-yellow-600 rounded-lg"><Edit size={18}/></button>
                          <button onClick={()=>deleteClass(cls.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 size={18}/></button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-lg">{cls.name}</h3>
                      <p className="text-sm text-gray-500">{teacher?`${teacher.firstName} ${teacher.lastName}`:'Aucun enseignant'}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <span>{studentCount} eleves</span>
                        {cls.books?.length > 0 && <span>• {cls.books.length} livres</span>}
                      </div>
                      <button onClick={()=>setViewClass(cls)} className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"><ClipboardList size={16}/>Voir details</button>
                    </div>
                  );
                })}
                {classes.length===0&&<div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><BookOpen size={48} className="mx-auto mb-4 opacity-50"/><p>Aucune classe</p></div>}
              </div>
            </div>
          )}

          {/* GRADES */}
          {activeTab==='grades'&&(
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <select value={selectedClass?.id||''} onChange={e=>setSelectedClass(classes.find(c=>c.id===e.target.value))} className="px-4 py-3 border rounded-xl text-base flex-1"><option value="">Selectionner classe</option>{classes.map(cls=>(<option key={cls.id} value={cls.id}>{cls.name}</option>))}</select>
                <select value={selectedPeriod?.id||''} onChange={e=>setSelectedPeriod(gradingPeriods.find(p=>p.id===e.target.value))} className="px-4 py-3 border rounded-xl text-base flex-1"><option value="">Selectionner periode</option>{gradingPeriods.map(period=>(<option key={period.id} value={period.id}>{period.name}</option>))}</select>
              </div>
              {selectedClass&&selectedPeriod?(
                <div className="space-y-3">
                  <div className="bg-white rounded-xl shadow-lg p-4"><h3 className="font-semibold">{selectedClass.name} - {selectedPeriod.name}</h3></div>
                  {students.filter(s=>s.enrolledClasses?.includes(selectedClass.id)).map(student=>{
                    const grade=grades.find(g=>g.studentId===student.id&&g.classId===selectedClass.id&&g.periodId===selectedPeriod.id);
                    return(
                      <div key={student.id} className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4">
                        <div className="flex-1"><p className="font-medium">{student.firstName} {student.lastName}</p></div>
                        <input type="number" min="0" max="100" value={grade?.score||''} onChange={e=>saveGrade(student.id,selectedClass.id,selectedPeriod.id,e.target.value)} className="w-20 px-3 py-2 border rounded-xl text-center text-lg font-bold" placeholder="--"/>
                        {grade?.score&&<span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${parseFloat(grade.score)>=90?'bg-green-100 text-green-700':parseFloat(grade.score)>=80?'bg-blue-100 text-blue-700':parseFloat(grade.score)>=70?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}`}>{getLetterGrade(grade.score)}</span>}
                      </div>
                    );
                  })}
                </div>
              ):(<div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500"><FileText size={48} className="mx-auto mb-4 opacity-50"/><p>Selectionnez classe et periode</p></div>)}
            </div>
          )}

          {/* PAYMENTS */}
          {activeTab==='payments'&&(
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl shadow px-4 py-3"><span className="text-xs text-gray-500">Revenus</span><p className="text-xl font-bold text-green-600">HTG {totalRevenue.toFixed(0)}</p></div>
                  <div className="bg-white rounded-xl shadow px-4 py-3"><span className="text-xs text-gray-500">Du par eleves</span><p className="text-xl font-bold text-red-500">HTG {students.reduce((sum,s)=>sum+Math.max(0,getStudentBalance(s.id)),0).toFixed(0)}</p></div>
                </div>
                <button onClick={()=>openModal('payment')} className="bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18}/>Enregistrer Paiement</button>
              </div>
              <div className="space-y-3">
                {payments.map(payment=>{const student=students.find(s=>s.id===payment.studentId);return(
                  <div key={payment.id} className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-green-600">HTG {payment.amount.toFixed(2)} {payment.isDeposit && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded ml-2">Depot</span>}</p>
                      <p className="text-sm text-gray-600">{student?`${student.firstName} ${student.lastName}`:'Inconnu'}</p>
                      <p className="text-xs text-gray-400">{new Date(payment.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>generateReceipt(payment)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><Download size={18}/></button>
                      <button onClick={()=>deletePayment(payment.id)} className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600"><Trash2 size={18}/></button>
                    </div>
                  </div>
                );})}
                {payments.length===0&&<div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><DollarSign size={48} className="mx-auto mb-4 opacity-50"/><p>Aucun paiement</p></div>}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab==='settings'&&(
            <div className="max-w-2xl space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de l'Ecole</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                      {school?.logo ? <img src={school.logo} alt="Logo" className="w-full h-full object-contain"/> : <span className="text-gray-400 text-xs text-center">Logo</span>}
                    </div>
                    <div>
                      <label className="bg-socrates-blue text-white px-4 py-2 rounded-lg cursor-pointer text-sm font-medium">
                        Changer Logo
                        <input type="file" accept="image/*" className="hidden" onChange={async(e)=>{
                          const file = e.target.files[0];
                          if(file){
                            const reader = new FileReader();
                            reader.onloadend = async() => {
                              await updateDoc(doc(db,'schools',school.id),{logo:reader.result});
                              setSchool({...school,logo:reader.result});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}/>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG (max 500KB)</p>
                    </div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'ecole</label><input type="text" value={formData.schoolName??school?.name??''} onChange={e=>setFormData({...formData,schoolName:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label><input type="text" value={formData.address??school?.address??''} onChange={e=>setFormData({...formData,address:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Rue, Ville"/></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label><input type="tel" value={formData.schoolPhone??school?.phone??''} onChange={e=>setFormData({...formData,schoolPhone:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={school?.email||user?.email||''} className="w-full px-4 py-3 border rounded-xl bg-gray-50 text-base" readOnly/></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Directeur / Directrice</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label><input type="text" value={formData.directorName??school?.directorName??''} onChange={e=>setFormData({...formData,directorName:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Jean Baptiste"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Titre</label><input type="text" value={formData.directorTitle??school?.directorTitle??''} onChange={e=>setFormData({...formData,directorTitle:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Directeur"/></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label><input type="tel" value={formData.directorPhone??school?.directorPhone??''} onChange={e=>setFormData({...formData,directorPhone:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={formData.directorEmail??school?.directorEmail??''} onChange={e=>setFormData({...formData,directorEmail:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Controle Acces Parent</h3>
                <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">Bloquer automatiquement si solde impaye</p>
                    <p className="text-sm text-gray-500">Les parents ne pourront pas acceder au portail si l'eleve a un solde</p>
                  </div>
                  <div className={`w-14 h-7 rounded-full transition ${(formData.blockParentOnDebt??school?.blockParentOnDebt)?'bg-red-500':'bg-gray-300'}`} onClick={()=>setFormData({...formData,blockParentOnDebt:!(formData.blockParentOnDebt??school?.blockParentOnDebt)})}>
                    <div className={`w-7 h-7 bg-white rounded-full shadow transition transform ${(formData.blockParentOnDebt??school?.blockParentOnDebt)?'translate-x-7':'translate-x-0'}`}/>
                  </div>
                </label>
              </div>

              <button onClick={async()=>{
                try{
                  await updateDoc(doc(db,'schools',school.id),{
                    name: formData.schoolName??school?.name,
                    address: formData.address??school?.address,
                    phone: formData.schoolPhone??school?.phone,
                    directorName: formData.directorName??school?.directorName,
                    directorTitle: formData.directorTitle??school?.directorTitle,
                    directorPhone: formData.directorPhone??school?.directorPhone,
                    directorEmail: formData.directorEmail??school?.directorEmail,
                    blockParentOnDebt: formData.blockParentOnDebt??school?.blockParentOnDebt??false
                  });
                  setSchool({...school,
                    name: formData.schoolName??school?.name,
                    address: formData.address??school?.address,
                    phone: formData.schoolPhone??school?.phone,
                    directorName: formData.directorName??school?.directorName,
                    directorTitle: formData.directorTitle??school?.directorTitle,
                    directorPhone: formData.directorPhone??school?.directorPhone,
                    directorEmail: formData.directorEmail??school?.directorEmail,
                    blockParentOnDebt: formData.blockParentOnDebt??school?.blockParentOnDebt??false
                  });
                  alert('Sauvegarde!');
                }catch(err){alert('Erreur: '+err.message);}
              }} className="w-full bg-socrates-blue text-white py-4 rounded-xl font-semibold text-lg">Sauvegarder</button>
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {showModal&&(
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-lg font-semibold text-gray-800">
                {editItem?'Modifier':'Ajouter'} {modalType==='student'?'Eleve':modalType==='teacher'?'Enseignant':modalType==='class'?'Classe':modalType==='period'?'Periode':modalType==='payment'?'Paiement':modalType==='teacherPayment'?'Paiement Enseignant':''}
              </h3>
              <button onClick={()=>{setShowModal(false);setEditItem(null);setFormData({});}} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><X size={20}/></button>
            </div>
            <form onSubmit={modalType==='student'?saveStudent:modalType==='teacher'?saveTeacher:modalType==='class'?saveClass:modalType==='period'?savePeriod:modalType==='payment'?savePayment:modalType==='teacherPayment'?saveTeacherPayment:e=>e.preventDefault()} className="p-5 space-y-4">
              
              {/* STUDENT FORM */}
              {modalType==='student'&&(<>
                <div className="grid grid-cols-2 gap-3"><div><label className="block text-sm font-medium text-gray-700 mb-1">Prenom</label><input type="text" required value={formData.firstName||''} onChange={e=>setFormData({...formData,firstName:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input type="text" required value={formData.lastName||''} onChange={e=>setFormData({...formData,lastName:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label><input type="text" value={formData.address||''} onChange={e=>setFormData({...formData,address:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Rue, Quartier, Ville"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label><select value={formData.gradeLevel||''} onChange={e=>setFormData({...formData,gradeLevel:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"><option value="">Selectionner</option>{['Prescolaire','Maternelle','1ere','2eme','3eme','4eme','5eme','6eme','7eme','8eme','9eme','NS1','NS2','NS3','Philo'].map(g=>(<option key={g} value={g}>{g}</option>))}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Classes</label><div className="border rounded-xl p-3 max-h-32 overflow-y-auto space-y-2">{classes.map(cls=>(<label key={cls.id} className="flex items-center gap-3 p-2"><input type="checkbox" checked={formData.enrolledClasses?.includes(cls.id)||false} onChange={e=>{const current=formData.enrolledClasses||[];setFormData({...formData,enrolledClasses:e.target.checked?[...current,cls.id]:current.filter(id=>id!==cls.id)});}} className="w-5 h-5 rounded"/><span>{cls.name}</span></label>))}{classes.length===0&&<p className="text-sm text-gray-500">Aucune classe</p>}</div></div>
                
                <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">Message aux parents (academique/comportement)</p>
                  <textarea value={formData.notes||''} onChange={e=>setFormData({...formData,notes:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base h-24 resize-none" placeholder="Observations, commentaires sur l'eleve..."/>
                </div>
                
                <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">Contrat Annuel</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm text-gray-600 mb-1">Scolarite annuelle (HTG)</label><input type="number" min="0" step="0.01" value={formData.annualTuition||''} onChange={e=>setFormData({...formData,annualTuition:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Mensuel (10 mois)</label><input type="text" value={(parseFloat(formData.annualTuition)||0) > 0 ? 'HTG '+((parseFloat(formData.annualTuition)||0)/10).toFixed(2) : '-'} className="w-full px-4 py-3 border rounded-xl text-base bg-gray-50" readOnly/></div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm text-gray-600 mb-1">Frais divers - uniformes, livres (HTG) <span className="text-xs text-orange-600">paye d'avance</span></label>
                    <input type="number" min="0" step="0.01" value={formData.fraisDivers||''} onChange={e=>setFormData({...formData,fraisDivers:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex justify-between"><span className="text-gray-600">Total annuel:</span><span className="font-bold">HTG {((parseFloat(formData.annualTuition)||0)+(parseFloat(formData.fraisDivers)||0)).toFixed(2)}</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div><label className="block text-sm text-gray-600 mb-1">Depot requis (HTG)</label><input type="number" min="0" step="0.01" value={formData.depositAmount||''} onChange={e=>setFormData({...formData,depositAmount:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                    <div className="flex items-end"><label className="flex items-center gap-3 p-3 border rounded-xl w-full cursor-pointer"><input type="checkbox" checked={formData.depositPaid||false} onChange={e=>setFormData({...formData,depositPaid:e.target.checked})} className="w-5 h-5 rounded"/><span className="text-sm">Depot paye</span></label></div>
                  </div>
                </div>

                <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">Acces Parent</p><div className="space-y-3"><input type="email" value={formData.parentEmail||''} onChange={e=>setFormData({...formData,parentEmail:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Email parent"/><input type="tel" value={formData.parentPhone||''} onChange={e=>setFormData({...formData,parentPhone:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Tel parent"/><input type="text" maxLength={6} value={formData.parentPin||''} onChange={e=>setFormData({...formData,parentPin:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base text-center text-xl tracking-widest" placeholder="PIN 6 chiffres"/></div></div>
              </>)}

              {/* TEACHER FORM */}
              {modalType==='teacher'&&(<>
                <div className="grid grid-cols-2 gap-3"><div><label className="block text-sm font-medium text-gray-700 mb-1">Prenom</label><input type="text" required value={formData.firstName||''} onChange={e=>setFormData({...formData,firstName:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input type="text" required value={formData.lastName||''} onChange={e=>setFormData({...formData,lastName:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label><input type="text" value={formData.address||''} onChange={e=>setFormData({...formData,address:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Rue, Quartier, Ville"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Matiere/Sujet</label><input type="text" value={formData.subject||''} onChange={e=>setFormData({...formData,subject:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Mathematiques, Francais..."/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={formData.email||''} onChange={e=>setFormData({...formData,email:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label><input type="tel" value={formData.phone||''} onChange={e=>setFormData({...formData,phone:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                <div className="border-t pt-4"><p className="text-sm font-medium text-gray-700 mb-3">Contrat Annuel</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm text-gray-600 mb-1">Salaire annuel (HTG)</label><input type="number" min="0" step="0.01" value={formData.annualSalary||''} onChange={e=>setFormData({...formData,annualSalary:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base text-xl"/></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Mensuel (10 mois)</label><input type="text" value={formData.annualSalary ? 'HTG '+(parseFloat(formData.annualSalary)/10).toFixed(2) : '-'} className="w-full px-4 py-3 border rounded-xl text-base bg-gray-50" readOnly/></div>
                  </div>
                </div>
              </>)}

              {/* CLASS FORM */}
              {modalType==='class'&&(<>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom classe</label><input type="text" required value={formData.name||''} onChange={e=>setFormData({...formData,name:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Mathematiques"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label><select value={formData.teacherId||''} onChange={e=>setFormData({...formData,teacherId:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"><option value="">Selectionner</option>{teachers.map(t=>(<option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>))}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Salle</label><input type="text" value={formData.room||''} onChange={e=>setFormData({...formData,room:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Programme / Curriculum</label>
                  <textarea value={formData.curriculum||''} onChange={e=>setFormData({...formData,curriculum:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base h-24 resize-none" placeholder="Description du programme, objectifs, etc."/>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Livres Requis</label>
                    <button type="button" onClick={addBook} className="text-socrates-blue text-sm font-medium flex items-center gap-1"><Plus size={16}/>Ajouter livre</button>
                  </div>
                  <div className="space-y-3">
                    {(formData.books||[]).map((book, i) => (
                      <div key={i} className="p-3 border rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Livre {i+1}</span>
                          <button type="button" onClick={()=>removeBook(i)} className="text-red-500"><X size={16}/></button>
                        </div>
                        <input type="text" value={book.title||''} onChange={e=>updateBook(i,'title',e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Titre du livre"/>
                        <input type="text" value={book.author||''} onChange={e=>updateBook(i,'author',e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Auteur (optionnel)"/>
                        <input type="text" value={book.isbn||''} onChange={e=>updateBook(i,'isbn',e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="ISBN (optionnel)"/>
                      </div>
                    ))}
                    {(!formData.books || formData.books.length === 0) && <p className="text-sm text-gray-400 text-center py-2">Aucun livre ajoute</p>}
                  </div>
                </div>
              </>)}

              {/* PERIOD FORM */}
              {modalType==='period'&&(<>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom periode</label><input type="text" required value={formData.name||''} onChange={e=>setFormData({...formData,name:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Trimestre 1"/></div>
                <div className="grid grid-cols-2 gap-3"><div><label className="block text-sm font-medium text-gray-700 mb-1">Debut</label><input type="date" value={formData.startDate||''} onChange={e=>setFormData({...formData,startDate:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Fin</label><input type="date" value={formData.endDate||''} onChange={e=>setFormData({...formData,endDate:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div></div>
              </>)}

              {/* STUDENT PAYMENT FORM */}
              {modalType==='payment'&&(<>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Eleve</label><select required value={formData.studentId||''} onChange={e=>setFormData({...formData,studentId:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"><option value="">Selectionner</option>{students.map(s=>(<option key={s.id} value={s.id}>{s.firstName} {s.lastName} - Du: HTG {getStudentBalance(s.id).toFixed(0)}</option>))}</select></div>
                <div className="flex items-center gap-3 p-3 border rounded-xl"><input type="checkbox" checked={formData.isDeposit||false} onChange={e=>setFormData({...formData,isDeposit:e.target.checked})} className="w-5 h-5 rounded"/><span className="text-sm font-medium">C'est un depot de reservation</span></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Montant (HTG)</label><input type="number" required min="0" step="0.01" value={formData.amount||''} onChange={e=>setFormData({...formData,amount:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base text-xl"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={formData.date||new Date().toISOString().split('T')[0]} onChange={e=>setFormData({...formData,date:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Methode</label><select value={formData.method||'Especes'} onChange={e=>setFormData({...formData,method:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"><option value="Especes">Especes</option><option value="Cheque">Cheque</option><option value="Virement">Virement</option><option value="Mobile">Mobile</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><input type="text" value={formData.description||''} onChange={e=>setFormData({...formData,description:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Frais scolarite"/></div>
              </>)}

              {/* TEACHER PAYMENT FORM */}
              {modalType==='teacherPayment'&&(<>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label><select required value={formData.teacherId||''} onChange={e=>setFormData({...formData,teacherId:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"><option value="">Selectionner</option>{teachers.map(t=>(<option key={t.id} value={t.id}>{t.firstName} {t.lastName} - Du: HTG {getTeacherBalance(t.id).toFixed(0)}</option>))}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Mois</label><input type="month" value={formData.month||new Date().toISOString().slice(0,7)} onChange={e=>setFormData({...formData,month:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Montant (HTG)</label><input type="number" required min="0" step="0.01" value={formData.amount||''} onChange={e=>setFormData({...formData,amount:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base text-xl"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={formData.date||new Date().toISOString().split('T')[0]} onChange={e=>setFormData({...formData,date:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Methode</label><select value={formData.method||'Especes'} onChange={e=>setFormData({...formData,method:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base"><option value="Especes">Especes</option><option value="Cheque">Cheque</option><option value="Virement">Virement</option><option value="Mobile">Mobile</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><input type="text" value={formData.description||''} onChange={e=>setFormData({...formData,description:e.target.value})} className="w-full px-4 py-3 border rounded-xl text-base" placeholder="Salaire"/></div>
              </>)}

              <div className="flex gap-3 pt-4 pb-4">
                <button type="button" onClick={()=>{setShowModal(false);setEditItem(null);setFormData({});}} className="flex-1 px-4 py-4 border rounded-xl font-medium text-base">Annuler</button>
                <button type="submit" className="flex-1 bg-socrates-blue text-white px-4 py-4 rounded-xl font-medium text-base">{editItem?'Modifier':'Enregistrer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './contexts/SchoolContext';
import { LanguageProvider } from './i18n/LanguageContext';

// Layout
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Auth
import AuthScreen from './components/auth/AuthScreen';

// Admin
import SuperAdmin from './components/admin/SuperAdmin';

// Tabs
import Dashboard from './components/tabs/Dashboard';
import Students from './components/tabs/Students';
import Teachers from './components/tabs/Teachers';
import Classes from './components/tabs/Classes';
import ClassDetail from './components/tabs/ClassDetail';
import Grades from './components/tabs/Grades';
import Payments from './components/tabs/Payments';
import Parametres from './components/parametres/Parametres';
import Accounting from './components/tabs/Accounting';

// Shared
import ModalForms from './components/shared/ModalForms';

// ─── Inner App (uses context) ───────────────────────────────────────
function AppContent() {
  const { user, school, loading, isSuperAdmin, activeTab } = useSchool();

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [modalInitialData, setModalInitialData] = useState(null);
  const [viewClass, setViewClass] = useState(null);

  const openModal = (type, item = null, initialData = null) => {
    setModalType(type);
    setEditItem(item);
    setModalInitialData(initialData);
  };

  const closeModal = () => {
    setModalType(null);
    setEditItem(null);
    setModalInitialData(null);
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-socrates-navy to-socrates-blue flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4 animate-pulse">
            <span className="text-3xl font-display">S</span>
          </div>
          <p className="text-blue-200">Chargement...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) return <AuthScreen />;

  // Super Admin
  if (isSuperAdmin) return <SuperAdmin />;

  // No school doc yet
  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Chargement de votre ecole...</p>
          <div className="w-8 h-8 border-4 border-socrates-blue border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Class detail view (fullscreen)
  if (viewClass) {
    return <ClassDetail viewClass={viewClass} onClose={() => setViewClass(null)} onOpenModal={openModal} />;
  }

  // ── Main School Dashboard ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'dashboard'  && <Dashboard onOpenModal={openModal} />}
          {activeTab === 'students'   && <Students onOpenModal={openModal} />}
          {activeTab === 'teachers'   && <Teachers onOpenModal={openModal} />}
          {activeTab === 'classes'    && <Classes onOpenModal={openModal} onViewClass={setViewClass} />}
          {activeTab === 'grades'     && <Grades />}
          {activeTab === 'payments'   && <Payments onOpenModal={openModal} />}
          {activeTab === 'accounting' && <Accounting />}
          {activeTab === 'settings'   && <Parametres />}
        </main>
      </div>

      {/* Modal */}
      {modalType && (
        <ModalForms
          modalType={modalType}
          editItem={editItem}
          onClose={closeModal}
          initialData={modalInitialData}
        />
      )}
    </div>
  );
}

// ─── Root App (wraps providers) ──────────────────────────────────────
export default function App() {
  return (
    <LanguageProvider>
      <SchoolProvider>
        <AppContent />
      </SchoolProvider>
    </LanguageProvider>
  );
}
import React from 'react';
import { BarChart3, Users, GraduationCap, BookOpen, FileText, DollarSign, Settings, LogOut } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';

export default function Sidebar({ isOpen, onClose }) {
  const { activeTab, setActiveTab, handleLogout, isPrescolaireOnly, isAdultSchool } = useSchool();

  const adult = isAdultSchool();
  const prescoOnly = isPrescolaireOnly();

  const NAV_ITEMS = [
    { id: 'dashboard', icon: BarChart3,     label: 'Tableau de bord' },
    { id: 'students',  icon: Users,         label: adult ? 'Étudiants' : 'Élèves' },
    { id: 'teachers',  icon: GraduationCap, label: adult ? 'Professeurs' : 'Enseignants' },
    { id: 'classes',   icon: BookOpen,       label: prescoOnly ? 'Sections' : 'Classes' },
    ...(!prescoOnly ? [{ id: 'grades', icon: FileText, label: 'Notes' }] : []),
    { id: 'payments',  icon: DollarSign,     label: 'Paiements' },
    { id: 'settings',  icon: Settings,       label: 'Paramètres' },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-socrates-navy to-socrates-blue text-white transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/owl-icon.svg" alt="SOCRATES" className="w-10 h-10 rounded-full object-contain" />
            <div>
              <h1 className="font-display text-xl">SOCRATES</h1>
              <p className="text-xs text-blue-200 italic">Vers la lumiere</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => { setActiveTab(item.id); onClose(); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === item.id ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'}`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 rounded-lg transition">
            <LogOut size={20} />
            <span>Deconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}

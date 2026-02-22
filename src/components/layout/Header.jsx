import React from 'react';
import { Menu, Globe } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

export default function Header({ onToggleSidebar }) {
  const { activeTab, school } = useSchool();
  const { lang, t, toggleLang } = useLang();

  const TAB_LABELS = {
    dashboard: t('tabDashboard'),
    students: t('tabStudents'),
    teachers: t('tabTeachers'),
    classes: t('tabClasses'),
    grades: t('tabGrades'),
    payments: t('tabPayments'),
    settings: t('tabSettings'),
  };

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="text-gray-500 hover:text-gray-700 lg:hidden p-2">
          <Menu size={24} />
        </button>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {TAB_LABELS[activeTab] || 'SOCRATES'}
        </h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleLang} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-bold text-gray-600 transition" title={lang === 'fr' ? 'Chanje an Kreyòl' : 'Changer en Français'}>
          <Globe size={16} />
          {t('langToggle')}
        </button>
        <span className="text-sm text-gray-500 hidden sm:block">{school?.name}</span>
        {school?.logo && school.logo.length > 10
          ? <img src={school.logo} alt="" className="w-10 h-10 rounded-full object-contain bg-gray-100" />
          : <div className="w-10 h-10 rounded-full bg-socrates-navy text-white flex items-center justify-center font-bold">{school?.name?.[0] || 'S'}</div>
        }
      </div>
    </header>
  );
}

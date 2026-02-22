import React from 'react';
import { BookOpen, Plus, Edit, Trash2, Calendar, ClipboardList, Users, GraduationCap } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

export default function Classes({ onOpenModal, onViewClass }) {
  const { classes, teachers, students, gradingPeriods, deleteClass, isPrescolaireOnly, isAdultSchool, isUpperCycle } = useSchool();
  const { t, lang } = useLang();
  const ht = lang === 'ht';
  const prescoOnly = isPrescolaireOnly();
  const adult = isAdultSchool();
  const entityLabel = prescoOnly ? t('sections') : t('classes');
  const studentLabel = adult ? t('studentsAdult') : t('students');
  const teacherLabel = adult ? t('teachersAdult') : t('teachers');
  const periodsLabel = ht ? 'Peryòd' : 'Périodes';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-indigo-600">{classes.length}</p><p className="text-xs text-gray-500">{entityLabel}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-gray-700">{students.length}</p><p className="text-xs text-gray-500">{studentLabel}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-green-600">{teachers.length}</p><p className="text-xs text-gray-500">{teacherLabel}</p></div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center"><p className="text-2xl font-bold text-purple-600">{gradingPeriods.length}</p><p className="text-xs text-gray-500">{periodsLabel}</p></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{entityLabel}</h3>
        <div className="flex gap-2">
          {!prescoOnly && <button onClick={() => onOpenModal('period')} className="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Calendar size={18} />{periodsLabel}</button>}
          <button onClick={() => onOpenModal('class')} className="flex-1 sm:flex-none bg-socrates-blue text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"><Plus size={18} />{t('add')}</button>
        </div>
      </div>

      {gradingPeriods.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2"><Calendar size={16} className="text-purple-500" /> {periodsLabel}</h4>
          <div className="flex flex-wrap gap-2">
            {gradingPeriods.map(period => (
              <span key={period.id} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                {period.name}
                {period.startDate && <span className="text-purple-400 ml-1 text-xs">({period.startDate} → {period.endDate})</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => {
          const teacher = teachers.find(tc => tc.id === cls.teacherId);
          const allTeacherIds = cls.teacherIds || (cls.teacherId ? [cls.teacherId] : []);
          const assignedTeachers = teachers.filter(tc => allTeacherIds.includes(tc.id));
          const isUpper = isUpperCycle(cls.gradeLevel);
          const studentCount = students.filter(s => s.enrolledClasses?.includes(cls.id)).length;
          const capacityPct = cls.maxCapacity ? Math.round((studentCount / parseInt(cls.maxCapacity)) * 100) : null;
          return (
            <div key={cls.id} className="bg-white rounded-xl shadow-lg p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-socrates-navy to-socrates-blue text-white flex items-center justify-center"><BookOpen size={24} /></div>
                <div className="flex gap-1">
                  <button onClick={() => onOpenModal('class', cls)} className="p-2 text-gray-400 hover:text-yellow-600 rounded-lg"><Edit size={18} /></button>
                  <button onClick={() => deleteClass(cls.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 size={18} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">{cls.name}</h3>
              {cls.gradeLevel && <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full mt-1 w-fit">{cls.gradeLevel}</span>}
              <div className="mt-2 space-y-1 flex-1">
                {isUpper && assignedTeachers.length > 1 ? (<>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5"><GraduationCap size={14} className="text-gray-400" /><span className="font-medium">{teacher ? `${teacher.firstName} ${teacher.lastName}` : 'N/A'}</span><span className="text-xs text-gray-400">({ht ? 'titilè' : 'titulaire'})</span></p>
                  <p className="text-xs text-gray-400 ml-5">+ {assignedTeachers.length - 1} {ht ? 'lòt' : 'autre(s)'} {adult ? (ht?'pwof':'prof') : (ht?'anseyan':'enseignant(s)')}</p>
                </>) : (
                  <p className="text-sm text-gray-500 flex items-center gap-1.5"><GraduationCap size={14} className="text-gray-400" />{teacher ? `${teacher.firstName} ${teacher.lastName}` : <span className="text-orange-500">{ht ? 'Pa gen' : 'Aucun'} {adult ? (ht?'pwofesè':'professeur') : (ht?'anseyan':'enseignant')}</span>}</p>
                )}
                {cls.room && <p className="text-sm text-gray-400">📍 {cls.room}</p>}
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1"><Users size={14} /> {studentCount} {adult ? (ht?'etidyan':'étudiant(s)') : (ht?'elèv':'élève(s)')}</span>
                  {cls.books?.length > 0 && <span className="text-gray-400">{cls.books.length} {ht?'liv':'livre(s)'}</span>}
                </div>
                {capacityPct !== null && (<div className="mt-2">
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{ht?'Kapasite':'Capacité'}</span><span className={capacityPct>=90?'text-red-500 font-medium':capacityPct>=70?'text-orange-500':'text-gray-500'}>{studentCount}/{cls.maxCapacity}</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full transition-all ${capacityPct>=90?'bg-red-500':capacityPct>=70?'bg-orange-400':'bg-socrates-blue'}`} style={{width:`${Math.min(capacityPct,100)}%`}}/></div>
                </div>)}
              </div>
              <button onClick={() => onViewClass(cls)} className="w-full mt-4 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition"><ClipboardList size={16}/>{ht?'Wè detay':'Voir détails'}</button>
            </div>
          );
        })}
        {classes.length === 0 && (<div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg"><BookOpen size={48} className="mx-auto mb-4 opacity-50"/><p>{ht?'Pa gen':'Aucune'} {prescoOnly?(ht?'seksyon':'section'):(ht?'klas':'classe')}</p></div>)}
      </div>
    </div>
  );
}

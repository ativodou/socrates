import React from 'react';
import { X, Users, ClipboardList, Book, GraduationCap, MapPin } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useLang } from '../../i18n/LanguageContext';

export default function ClassDetail({ viewClass, onClose, onOpenModal }) {
  const { students, teachers, getStudentBalance, isAdultSchool, isPrescolaireOnly, isUpperCycle } = useSchool();
  const { t, lang } = useLang();
  const ht = lang === 'ht';
  const adult = isAdultSchool();
  const prescoOnly = isPrescolaireOnly();
  const classStudents = students.filter(s => s.enrolledClasses?.includes(viewClass.id));
  const teacher = teachers.find(t => t.id === viewClass.teacherId);
  const allTeacherIds = viewClass.teacherIds || (viewClass.teacherId ? [viewClass.teacherId] : []);
  const assignedTeachers = teachers.filter(t => allTeacherIds.includes(t.id));
  const isUpper = isUpperCycle(viewClass.gradeLevel);
  const capacityPct = viewClass.maxCapacity ? Math.round((classStudents.length / parseInt(viewClass.maxCapacity)) * 100) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"><X size={20} /></button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">{viewClass.name}</h1>
            <p className="text-xs text-blue-200">
              {teacher ? `${teacher.firstName} ${teacher.lastName}` : `${ht?'Pa gen':'Aucun'} ${adult ? (ht?'pwofesè':'professeur') : (ht?'anseyan':'enseignant')}`}
              {isUpper && assignedTeachers.length > 1 ? ` + ${assignedTeachers.length - 1}` : ''}
              {viewClass.gradeLevel && ` • ${viewClass.gradeLevel}`}
              {viewClass.room && ` • ${viewClass.room}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{classStudents.length}</p>
            <p className="text-xs text-blue-200">{adult ? (ht?'etidyan':'étudiants') : (ht?'elèv':'élèves')}</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4 max-w-3xl mx-auto">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-xl font-bold text-socrates-navy">{classStudents.length}</p>
            <p className="text-xs text-gray-500">{adult ? (ht?'Etidyan':t('studentsAdult')) : (ht?'Elèv':t('students'))}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-xl font-bold text-green-600">{classStudents.filter(s => getStudentBalance(s.id) <= 0).length}</p>
            <p className="text-xs text-gray-500">{ht?'Ajou':'À jour'}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-xl font-bold text-red-500">{classStudents.filter(s => getStudentBalance(s.id) > 0).length}</p>
            <p className="text-xs text-gray-500">{ht?'Pa peye':'Impayés'}</p>
          </div>
        </div>

        {/* Capacity */}
        {capacityPct !== null && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{ht?'Kapasite':'Capacité'}</span>
              <span className={`text-sm font-bold ${capacityPct >= 90 ? 'text-red-500' : capacityPct >= 70 ? 'text-orange-500' : 'text-green-600'}`}>{classStudents.length}/{viewClass.maxCapacity} ({capacityPct}%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className={`h-3 rounded-full transition-all ${capacityPct >= 90 ? 'bg-red-500' : capacityPct >= 70 ? 'bg-orange-400' : 'bg-green-500'}`} style={{ width: `${Math.min(capacityPct, 100)}%` }} />
            </div>
          </div>
        )}

        {/* Assigned Teachers (upper cycles) */}
        {isUpper && assignedTeachers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><GraduationCap size={18} />{adult ? (ht?'Pwofesè asiye':'Professeurs assignés') : (ht?'Anseyan asiye':'Enseignants assignés')}</h3>
            <div className="space-y-2">
              {assignedTeachers.map(t => (
                <div key={t.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {t.photo ? <img src={t.photo} alt="" className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-socrates-navy text-white flex items-center justify-center text-xs font-bold">{t.firstName?.[0]}{t.lastName?.[0]}</div>}
                    <div>
                      <p className="text-sm font-medium">{t.firstName} {t.lastName}</p>
                      <p className="text-xs text-gray-400">{t.subject || ''}</p>
                    </div>
                  </div>
                  {t.id === viewClass.teacherId && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{ht?'Titilè':'Titulaire'}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teacher info */}
        {teacher && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><GraduationCap size={18} className="text-green-500" /> {adult ? (ht?'Pwofesè titilè':'Professeur titulaire') : (ht?'Anseyan titilè':'Enseignant titulaire')}</h3>
            <div className="flex items-center gap-3">
              {teacher.photo ? (
                <img src={teacher.photo} alt="" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">{teacher.firstName?.[0]}{teacher.lastName?.[0]}</div>
              )}
              <div>
                <p className="font-semibold">{teacher.firstName} {teacher.lastName}</p>
                <p className="text-sm text-gray-500">{teacher.subject || 'N/A'}{teacher.qualification && ` • ${teacher.qualification}`}</p>
              </div>
            </div>
          </div>
        )}

        {/* Curriculum */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><ClipboardList size={18} className="text-socrates-blue" /> {ht?'Pwogram / Kourikoulòm':'Programme / Curriculum'}</h3>
          {viewClass.curriculum ? <p className="text-gray-700 whitespace-pre-wrap text-sm">{viewClass.curriculum}</p> : <p className="text-gray-400 italic text-sm">{ht?'Pa gen pwogram defini':'Aucun programme défini'}</p>}
          <button onClick={() => onOpenModal('class', viewClass)} className="mt-3 text-socrates-blue font-medium text-sm">{ht?'Modifye':'Modifier'}</button>
        </div>

        {/* Books */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><Book size={18} className="text-purple-500" /> {ht?'Liv Obligatwa':'Livres Requis'}</h3>
          {viewClass.books?.length > 0 ? (
            <div className="space-y-2">
              {viewClass.books.map((book, i) => (
                <div key={i} className="p-3 bg-purple-50 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{book.title}</p>
                    {book.author && <p className="text-xs text-gray-500">{ht?'Otè':'Auteur'}: {book.author}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400 italic text-sm">{ht?'Pa gen liv defini':'Aucun livre défini'}</p>}
          <button onClick={() => onOpenModal('class', viewClass)} className="mt-3 text-socrates-blue font-medium text-sm">{ht?'Modifye':'Modifier'}</button>
        </div>

        {/* Students */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><Users size={18} className="text-socrates-blue" /> {adult ? (ht?'Etidyan':t('studentsAdult')) : (ht?'Elèv':t('students'))} ({classStudents.length})</h3>
          <div className="space-y-2">
            {classStudents.map(student => {
              const balance = getStudentBalance(student.id);
              return (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  {student.photo ? (
                    <img src={student.photo} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className={`w-10 h-10 rounded-full ${student.gender === 'F' ? 'bg-pink-500' : 'bg-socrates-blue'} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                      {student.firstName?.[0]}{student.lastName?.[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{student.firstName} {student.lastName}</p>
                    <p className="text-xs text-gray-500">{student.gradeLevel}{student.gender && ` • ${student.gender === 'M' ? '♂' : '♀'}`}</p>
                  </div>
                  <span className={`text-sm font-bold ${balance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {balance > 0 ? `${balance.toLocaleString()} ${ht?'dwe':'dû'}` : '✓'}
                  </span>
                </div>
              );
            })}
            {classStudents.length === 0 && <p className="text-gray-400 text-center py-4 text-sm">{ht?'Pa gen':'Aucun'} {adult ? (ht?'etidyan':'étudiant') : (ht?'elèv':'élève')} {ht?'enskri':'inscrit'}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

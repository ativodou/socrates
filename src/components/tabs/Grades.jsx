import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';

export default function Grades() {
  const { classes, students, grades, gradingPeriods, saveGrade, getLetterGrade } = useSchool();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <select value={selectedClass?.id || ''} onChange={e => setSelectedClass(classes.find(c => c.id === e.target.value))} className="px-4 py-3 border rounded-xl text-base flex-1">
          <option value="">Selectionner classe</option>
          {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
        </select>
        <select value={selectedPeriod?.id || ''} onChange={e => setSelectedPeriod(gradingPeriods.find(p => p.id === e.target.value))} className="px-4 py-3 border rounded-xl text-base flex-1">
          <option value="">Selectionner periode</option>
          {gradingPeriods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      {selectedClass && selectedPeriod ? (
        <div className="space-y-3">
          <div className="bg-white rounded-xl shadow-lg p-4"><h3 className="font-semibold">{selectedClass.name} - {selectedPeriod.name}</h3></div>
          {students.filter(s => s.enrolledClasses?.includes(selectedClass.id)).map(student => {
            const grade = grades.find(g => g.studentId === student.id && g.classId === selectedClass.id && g.periodId === selectedPeriod.id);
            return (
              <div key={student.id} className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4">
                <div className="flex-1"><p className="font-medium">{student.firstName} {student.lastName}</p></div>
                <input type="number" min="0" max="100" value={grade?.score || ''} onChange={e => saveGrade(student.id, selectedClass.id, selectedPeriod.id, e.target.value)} className="w-20 px-3 py-2 border rounded-xl text-center text-lg font-bold" placeholder="--" />
                {grade?.score && (
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${parseFloat(grade.score) >= 90 ? 'bg-green-100 text-green-700' : parseFloat(grade.score) >= 80 ? 'bg-blue-100 text-blue-700' : parseFloat(grade.score) >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {getLetterGrade(grade.score)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" /><p>Selectionnez classe et periode</p>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, Globe, MapPin, Users, GraduationCap, BookOpen, DollarSign, Heart } from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLang } from '../../i18n/LanguageContext';

const FEE_LABELS = {
  prescolaire: 'Préscolaire',
  premier_cycle: '1er Cycle Fondamental',
  deuxieme_cycle: '2ème Cycle Fondamental',
  troisieme_cycle: '3ème Cycle Fondamental',
  secondaire: 'Secondaire',
  philo: 'Philo / NS4',
};

export default function SchoolPublicProfile({ school, onBack }) {
  const { t, lang } = useLang();
  const ht = lang === 'ht';
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  // Load teachers and classes from subcollections
  useEffect(() => {
    const load = async () => {
      try {
        const [teacherSnap, classSnap] = await Promise.all([
          getDocs(collection(db, 'schools', school.id, 'teachers')),
          getDocs(collection(db, 'schools', school.id, 'classes')),
        ]);
        setTeachers(teacherSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setClasses(classSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error('Error loading school details:', e); }
      setLoadingExtra(false);
    };
    if (school?.id) load();
  }, [school?.id]);

  const hasContact = school.phone || school.email || school.website || school.whatsapp || school.facebook || school.instagram;
  const hasFees = school.levelFees && Object.keys(school.levelFees).length > 0;
  const hasServices = school.hasUniform || school.hasCafeteria || school.hasTransport || school.hasInternet || school.languages?.length > 0;
  const hasActivities = school.activities?.length > 0;
  const hasPrograms = school.programs?.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="bg-gradient-to-r from-socrates-navy to-socrates-blue text-white">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-200 mb-4 hover:text-white text-sm">
            <ArrowLeft size={18} /> ${ht?'Retounen nan anyè a':"Retour à l'annuaire"}
          </button>
          <div className="flex items-center gap-4">
            {school.logo && school.logo.length > 10
              ? <img src={school.logo} alt="" className="w-20 h-20 rounded-2xl object-contain bg-white/10 flex-shrink-0" />
              : <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold flex-shrink-0">{school.name?.[0]}</div>
            }
            <div>
              <h1 className="text-2xl font-bold">{school.name}</h1>
              {school.slogan && <p className="text-blue-200 italic text-sm mt-1">{school.slogan}</p>}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {school.schoolType && <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{school.schoolType}</span>}
                {school.typeEcole && <span className="bg-white/10 text-blue-200 text-xs px-3 py-1 rounded-full">{school.typeEcole}</span>}
                {school.foundedYear && <span className="text-blue-200 text-xs">${ht?'Fonde an ':'Fondée en '}{school.foundedYear}</span>}
              </div>
              {(school.sige || school.methodePedagogique) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {school.methodePedagogique && <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">🎓 {school.methodePedagogique}</span>}
                  {school.sige && <span className="bg-white/15 text-blue-100 text-xs px-3 py-1 rounded-full">SIGE: {school.sige}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="bg-white/10 border-t border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-around text-center">
            <div>
              <p className="text-xl font-bold">{teachers.length}</p>
              <p className="text-xs text-blue-200">{ht?'Anseyan':'Enseignants'}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xl font-bold">{classes.length}</p>
              <p className="text-xs text-blue-200">{ht?'Klas':'Classes'}</p>
            </div>
            {school.capacity && <>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-xl font-bold">{school.capacity}</p>
                <p className="text-xs text-blue-200">Élèves/classe</p>
              </div>
            </>}
            {school.accreditation && <>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-sm font-bold">✅</p>
                <p className="text-xs text-blue-200">{school.accreditation}</p>
              </div>
            </>}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-4">

        {/* ── Localisation ── */}
        {(school.departement || school.address) && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><MapPin size={18} className="text-blue-500" /> Localisation</h3>
            <div className="space-y-1">
              {(school.departement || school.commune) && (
                <p className="text-sm text-gray-700 font-medium">{school.departement}{school.commune ? `, ${school.commune}` : ''}</p>
              )}
              {school.address && <p className="text-sm text-gray-600">{school.address}</p>}
            </div>
            {school.gpsLat && school.gpsLng && (
              <div className="mt-3 rounded-xl overflow-hidden border h-40">
                <iframe title="map" width="100%" height="100%" frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(school.gpsLng) - 0.005}%2C${parseFloat(school.gpsLat) - 0.003}%2C${parseFloat(school.gpsLng) + 0.005}%2C${parseFloat(school.gpsLat) + 0.003}&layer=mapnik&marker=${school.gpsLat}%2C${school.gpsLng}`}
                />
              </div>
            )}
          </div>
        )}

        {/* ── Contact & Réseaux ── */}
        {hasContact && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Phone size={18} className="text-green-500" />{ht?' Kontak':' Contact'}</h3>
            <div className="space-y-2">
              {school.phone && <p className="flex items-center gap-2 text-sm text-gray-700"><Phone size={15} className="text-gray-400" /> {school.phone}</p>}
              {school.whatsapp && <p className="flex items-center gap-2 text-sm text-gray-700"><span className="text-gray-400">💬</span> WhatsApp: {school.whatsapp}</p>}
              {school.email && <p className="flex items-center gap-2 text-sm text-gray-700"><Mail size={15} className="text-gray-400" /> {school.email}</p>}
              {school.website && <p className="flex items-center gap-2 text-sm text-gray-700"><Globe size={15} className="text-gray-400" /> <a href={school.website} target="_blank" rel="noreferrer" className="text-socrates-blue underline">{school.website}</a></p>}
            </div>
            {(school.facebook || school.instagram) && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
                {school.facebook && <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">📘 {school.facebook}</span>}
                {school.instagram && <span className="bg-pink-50 text-pink-700 px-3 py-1.5 rounded-full text-xs font-medium">📷 {school.instagram}</span>}
              </div>
            )}
          </div>
        )}

        {/* ── Direction ── */}
        {school.directorName && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">👤 Direction</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {school.directorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{school.directorName}</p>
                <p className="text-xs text-gray-500">{school.directorTitle || ht?'Direktè':'Directeur'}</p>
              </div>
            </div>
            {(school.directorPhone || school.directorEmail) && (
              <div className="mt-3 pt-3 border-t space-y-1">
                {school.directorPhone && <p className="text-xs text-gray-500 flex items-center gap-2"><Phone size={12} className="text-gray-400" /> {school.directorPhone}</p>}
                {school.directorEmail && <p className="text-xs text-gray-500 flex items-center gap-2"><Mail size={12} className="text-gray-400" /> {school.directorEmail}</p>}
              </div>
            )}
          </div>
        )}

        {/* ── Mission ── */}
        {school.mission && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">🎯 Mission</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{school.mission}</p>
          </div>
        )}

        {/* ── Structure Académique ── */}
        {(school.schoolType || hasPrograms) && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><BookOpen size={18} className="text-indigo-500" /> Structure Académique</h3>
            {school.schoolType && (
              <div className="mb-3">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium">{school.schoolType}</span>
                {school.secondarySystem && ['Secondaire', 'Primaire-Secondaire', 'Complète'].includes(school.schoolType) && (
                  <span className="ml-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs">{school.secondarySystem === 'NS' ? 'Nouveau Système (NS)' : 'Traditionnel'}</span>
                )}
                {school.methodePedagogique && (
                  <span className="ml-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium">🎓 {school.methodePedagogique}</span>
                )}
              </div>
            )}
            {hasPrograms && (
              <div className="space-y-2 mt-3">
                <p className="text-sm font-medium text-gray-600">Programmes :</p>
                {school.programs.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.domain || ''} • {p.duration} an{p.duration > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── {ht?'Kò Anseyan':'Corps Enseignant'} ── */}
        {teachers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><GraduationCap size={18} className="text-teal-500" /> {ht?'Kò Anseyan':'Corps Enseignant'} <span className="ml-auto text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">{teachers.length} ht?'anseyan':'enseignant' + (teachers.length > 1 ? 's' : '')</span></h3>
            <div className="grid grid-cols-2 gap-2">
              {teachers.map(tc => (
                <div key={tc.id} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {tc.firstName?.[0]}{tc.lastName?.[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{tc.firstName} {tc.lastName}</p>
                    <p className="text-xs text-gray-500 truncate">{tc.subject || (ht?'Anseyan':'Enseignant')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Classes ── */}
        {classes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Users size={18} className="text-cyan-500" />{ht?' Klas ':' Classes '}<span className="ml-auto text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">{classes.length} ht?'klas':'classe' + (classes.length > 1 ? 's' : '')</span></h3>
            <div className="flex flex-wrap gap-2">
              {classes.map(c => (
                <span key={c.id} className="bg-cyan-50 text-cyan-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  {c.name}{c.gradeLevel ? ` (${c.gradeLevel})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Frais de Scolarité ── */}
        {hasFees && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><DollarSign size={18} className="text-emerald-500" /> Frais de Scolarité</h3>
            <div className="space-y-2">
              {Object.entries(school.levelFees)
                .filter(([_, fees]) => fees.tuition > 0)
                .map(([key, fees]) => {
                const isPhilo = key === 'philo';
                const isProg = key.startsWith('prog_');
                // For program fees, find matching program name
                let label = FEE_LABELS[key] || key.replace(/_/g, ' ');
                if (isProg && school.programs) {
                  const parts = key.split('_');
                  const progIdx = parseInt(parts[1]);
                  const yearIdx = parseInt(parts[2]?.replace('y', ''));
                  const prog = school.programs[progIdx];
                  if (prog) label = `${prog.name} — Année ${yearIdx + 1}`;
                }
                const tuition = parseInt(fees.tuition) || 0;
                const frais = parseInt(fees.frais) || 0;
                const total = tuition + frais;
                const monthly = Math.round(tuition / 10);
                return (
                  <div key={key} className={`p-3.5 rounded-xl ${isPhilo ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${isPhilo ? 'text-purple-800' : 'text-gray-700'}`}>{label}</span>
                      {isPhilo && <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">Tarif spécial</span>}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">HTG {tuition.toLocaleString()}</span>
                        {frais > 0 && <span className="text-xs text-gray-500 ml-2">+ {frais.toLocaleString()} frais</span>}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Total: <span className="font-semibold text-gray-700">{total.toLocaleString()}</span></p>
                        <p className="text-xs text-socrates-blue font-medium">{monthly.toLocaleString()} HTG/mois</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Services & Infos Pratiques ── */}
        {hasServices && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">🏫 Services & Infos</h3>
            {/* Languages */}
            {school.languages?.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Langues d'enseignement</p>
                <div className="flex flex-wrap gap-2">
                  {school.languages.map(l => <span key={l} className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">{l}</span>)}
                </div>
              </div>
            )}
            {/* Services grid */}
            <div className="grid grid-cols-2 gap-2">
              {school.hasUniform && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <span className="text-lg">👔</span>
                  <div><p className="text-sm font-medium text-gray-700">Uniforme requis</p>{school.uniformDesc && <p className="text-xs text-gray-500">{school.uniformDesc}</p>}</div>
                </div>
              )}
              {school.hasCafeteria && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <span className="text-lg">🍽️</span>
                  <p className="text-sm font-medium text-gray-700">Cantine</p>
                </div>
              )}
              {school.hasTransport && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <span className="text-lg">🚌</span>
                  <p className="text-sm font-medium text-gray-700">Transport scolaire</p>
                </div>
              )}
              {school.hasInternet && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <span className="text-lg">📶</span>
                  <p className="text-sm font-medium text-gray-700">Internet</p>
                </div>
              )}
            </div>
            {/* Academic year */}
            {(school.yearStart || school.yearEnd) && (
              <p className="text-xs text-gray-500 mt-3">📅 Année scolaire : {school.yearStart || '?'} → {school.yearEnd || '?'}</p>
            )}
          </div>
        )}

        {/* ── Activités Parascolaires ── */}
        {hasActivities && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Heart size={18} className="text-orange-500" /> Activités Parascolaires</h3>
            <div className="space-y-2">
              {school.activities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{a.name?.[0]}</div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{a.name}</p>
                    {a.description && <p className="text-xs text-gray-500">{a.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Personnel Administratif ── */}
        {school.adminStaff?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">🏢 Personnel Administratif</h3>
            <div className="grid grid-cols-2 gap-2">
              {school.adminStaff.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{s.firstName?.[0]}{s.lastName?.[0]}</div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{s.firstName} {s.lastName}</p>
                    <p className="text-xs text-violet-600 truncate">{s.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading indicator for subcollection data */}
        {loadingExtra && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-400">Chargement des détails...</p>
          </div>
        )}

        <div className="h-6" />
      </div>
    </div>
  );
}

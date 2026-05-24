'use client';
import React, { useState } from 'react';

const content = {
  fr: {
    tag: 'Pour les Écoles Haïtiennes',
    hero: 'Tout ce qu\'il faut pour gérer votre école, simplement.',
    sub: 'SOCRATES est la plateforme de gestion scolaire conçue pour les écoles haïtiennes — élèves, notes, paiements, bulletins et communication avec les parents, en un seul endroit.',
    cta: 'Créer un compte',
    back: 'Retour',
    closing: 'Prêt à moderniser votre école ?',
    closingSub: 'Rejoignez les écoles qui utilisent SOCRATES pour gérer plus facilement et plus efficacement.',
    sections: [
      {
        icon: '🎓',
        title: 'Gestion des Élèves',
        bullets: [
          'Inscription et profil complet de chaque élève',
          'Organisation par classes et sections',
          'Historique scolaire et progression par année',
          'Recherche rapide par nom, classe ou matricule',
        ],
      },
      {
        icon: '📊',
        title: 'Notes & Bulletins',
        bullets: [
          'Saisie des notes par matière et par période',
          'Calcul automatique des moyennes et classements',
          'Bulletins PDF générés en un clic',
          'Mentions : Très Bien, Bien, Passable, Échec',
          'Configuration des périodes et matières par école',
        ],
      },
      {
        icon: '💰',
        title: 'Paiements & Comptabilité',
        bullets: [
          'Enregistrement des paiements de frais scolaires',
          'Suivi du solde dû par élève',
          'Reçus PDF générés automatiquement',
          'Module comptable : revenus, dépenses, paie du personnel',
          'Rapport mensuel complet',
        ],
      },
      {
        icon: '👨‍👩‍👧',
        title: 'Portail Parents & Sponsors',
        bullets: [
          'Accès aux notes et bulletins sans compte école',
          'Suivi des paiements et solde restant',
          'Paiement en ligne : MonCash, Natcash, carte',
          'Soumission de devoirs en photo depuis le téléphone',
        ],
      },
      {
        icon: '👨‍🏫',
        title: 'Portail Enseignants',
        bullets: [
          'Accès dédié pour les enseignants',
          'Saisie des notes et devoirs par classe',
          'Consultation des élèves assignés',
          'Sans accès aux données financières',
        ],
      },
      {
        icon: '📅',
        title: 'Présence & Devoirs',
        bullets: [
          'Présence quotidienne par classe — Présent, Absent, Retard',
          'Historique des 30 derniers jours par classe',
          'Feuille de présence imprimable',
          'Publication de devoirs avec date limite',
          'Soumission des devoirs par les élèves/parents',
        ],
      },
      {
        icon: '🌐',
        title: 'Conçu pour Haïti',
        bullets: [
          'Interface en Français et Kreyòl',
          'Paiements MonCash et Natcash intégrés',
          'Fonctionne sur téléphone, tablette et ordinateur',
          'Adapté aux réalités des écoles haïtiennes',
        ],
      },
      {
        icon: '🔒',
        title: 'Sécurité & Fiabilité',
        bullets: [
          'Données hébergées dans le cloud — disponibles 24h/24',
          'Accès sécurisé par rôle : directeur, enseignant, parent',
          'Sauvegarde automatique de toutes les données',
          'Compatible avec tous les navigateurs modernes',
        ],
      },
    ],
  },
  ht: {
    tag: 'Pou Lekòl Ayisyen yo',
    hero: 'Tout sa ou bezwen pou jere lekòl ou a, fasil.',
    sub: 'SOCRATES se platfòm jestyon lekòl ki fèt pou lekòl ayisyen — elèv, nòt, peman, bilten ak kominikasyon ak paran, tout nan yon sèl kote.',
    cta: 'Kreye yon kont',
    back: 'Retounen',
    closing: 'Pare pou modènize lekòl ou a?',
    closingSub: 'Antre nan lekòl ki deja ap itilize SOCRATES pou jere pi fasil ak pi efikas.',
    sections: [
      {
        icon: '🎓',
        title: 'Jestyon Elèv',
        bullets: [
          'Enskripsyon ak pwofil konplè pou chak elèv',
          'Òganize pa klas ak seksyon',
          'Istwa lekòl ak pwogresyon pa ane',
          'Rechèch rapid pa non, klas oswa matrikil',
        ],
      },
      {
        icon: '📊',
        title: 'Nòt ak Bilten',
        bullets: [
          'Antre nòt pa matyè ak pa peryòd',
          'Kalkil otomatik mwayèn ak klasman',
          'Bilten PDF jenere ak yon sèl klik',
          'Mansyon: Trè Byen, Byen, Pasab, Echèk',
          'Konfigire peryòd ak matyè pou chak lekòl',
        ],
      },
      {
        icon: '💰',
        title: 'Peman ak Kontabilite',
        bullets: [
          'Anrejistre peman frè lekòl',
          'Suiv balans chak elèv',
          'Resi PDF jenere otomatikman',
          'Modil kontab: revni, depans, salè pèsonèl',
          'Rapò mansyèl konplè',
        ],
      },
      {
        icon: '👨‍👩‍👧',
        title: 'Pòtal Paran ak Sponsò',
        bullets: [
          'Aksè nòt ak bilten san kont lekòl',
          'Suiv peman ak balans ki rete',
          'Peman anliy: MonCash, Natcash, kat',
          'Voye foto devwa depi telefòn',
        ],
      },
      {
        icon: '👨‍🏫',
        title: 'Pòtal Pwofesè',
        bullets: [
          'Aksè dedye pou pwofesè yo',
          'Antre nòt ak devwa pa klas',
          'Wè elèv ki asiye ba yo',
          'Pa gen aksè nan done finansyè',
        ],
      },
      {
        icon: '📅',
        title: 'Prezans ak Devwa',
        bullets: [
          'Prezans chak jou pa klas — Prezan, Absan, Reta',
          'Istwa 30 dènye jou pa klas',
          'Fèy prezans pou enprime',
          'Pibliye devwa ak dat limit',
          'Elèv/paran voye devwa yo',
        ],
      },
      {
        icon: '🌐',
        title: 'Fèt pou Ayiti',
        bullets: [
          'Entèfas an Fransè ak Kreyòl',
          'MonCash ak Natcash entegre',
          'Mache sou telefòn, tablèt ak òdinatè',
          'Adapte pou reyalite lekòl ayisyen',
        ],
      },
      {
        icon: '🔒',
        title: 'Sekirite ak Fiabilite',
        bullets: [
          'Done nan cloud — disponib 24/7',
          'Aksè sekirize pa wòl: direktè, pwofesè, paran',
          'Sovgad otomatik pou tout done',
          'Mache sou tout navigatè modèn',
        ],
      },
    ],
  },
};

export default function FeaturesPage({ onBack, onGetStarted, initialLang = 'fr' }) {
  const [lang, setLang] = useState(initialLang);
  const c = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-socrates-navy via-socrates-blue to-blue-400">

      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-socrates-navy/90 backdrop-blur border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/80 hover:text-white text-sm font-medium transition">
          ← {c.back}
        </button>
        <span className="font-display text-white text-lg">SOCRATES</span>
        <div className="flex items-center gap-2">
          {(['fr', 'ht']).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition uppercase ${lang === l ? 'bg-white text-socrates-navy' : 'text-white/60 hover:text-white'}`}>
              {l === 'fr' ? 'FR' : 'KR'}
            </button>
          ))}
          <button onClick={onGetStarted}
            className="ml-2 px-4 py-2 rounded-xl bg-white text-socrates-navy text-xs font-bold hover:bg-blue-50 transition">
            {c.cta} →
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
            {c.tag}
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
            {c.hero}
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            {c.sub}
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {c.sections.map(s => (
            <div key={s.title} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{s.icon}</span>
                <h2 className="font-bold text-lg text-white">{s.title}</h2>
              </div>
              <ul className="space-y-2">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-blue-100">
                    <span className="text-yellow-300 mt-0.5 flex-shrink-0">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="text-center py-12 border-t border-white/20">
          <h2 className="font-display text-3xl text-white mb-3">{c.closing}</h2>
          <p className="text-blue-200 mb-8">{c.closingSub}</p>
          <button onClick={onGetStarted}
            className="px-8 py-3.5 rounded-xl bg-white text-socrates-navy font-bold hover:bg-blue-50 transition text-sm">
            {c.cta} →
          </button>
        </div>

      </div>
    </div>
  );
}

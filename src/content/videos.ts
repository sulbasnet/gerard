/**
 * Featured videos for the home page.
 *
 * `youtubeId` is used to build the thumbnail URL and the embed. The embed is
 * only created when the viewer clicks — no YouTube iframe loads on page view.
 * That is both a speed win and a GDPR one: no third-party cookies are set
 * before the visitor asks for the video.
 *
 * Add a video only when its official YouTube ID has been verified. `thumb`
 * overrides the YouTube thumbnail when a custom still is preferred.
 */
export type Video = {
  youtubeId: string;
  title: Record<'fr' | 'es' | 'en', string>;
  thumb?: string;
};

/**
 * Press articles and podcast appearances for the Videos page.
 * Empty until real links are supplied — the section hides itself rather than
 * showing invented outlets.
 */
export type PressItem = {
  mark: string;
  outlet: string;
  byline: string;
  format: Record<'fr' | 'es' | 'en', string>;
  title: Record<'fr' | 'es' | 'en', string>;
  url: string;
  date: string;
};

export const pressItems: PressItem[] = [
  {
    mark: 'FI',
    outlet: 'France Inter',
    byline: 'Benoît Collombat',
    format: { fr: 'Entretien radio · 8 min', es: 'Entrevista de radio · 8 min', en: 'Radio interview · 8 min' },
    title: {
      fr: 'Gérard Fauré : « L’argent des braquages allait dans les caisses du Parti gaulliste »',
      es: 'Gérard Fauré: «El dinero de los atracos iba a las arcas del partido gaullista»',
      en: 'Gérard Fauré: “The money from robberies went into the Gaullist party’s coffers”',
    },
    url: 'https://www.radiofrance.fr/franceinter/podcasts/l-interview/gerard-faure-l-argent-des-braquages-allait-dans-les-caisses-du-parti-gaulliste-5530435',
    date: '2018-10-27',
  },
  {
    mark: 'LP',
    outlet: 'Le Point',
    byline: 'Baudouin Eschapasse',
    format: { fr: 'Portrait vidéo', es: 'Perfil en vídeo', en: 'Video profile' },
    title: {
      fr: 'Gérard Fauré, confessions du prince de la coke',
      es: 'Gérard Fauré, confesiones del príncipe de la cocaína',
      en: 'Gérard Fauré, confessions of the prince of cocaine',
    },
    url: 'https://www.lepoint.fr/societe/gerard-faure-confessions-du-prince-de-la-coke-01-02-2020-2360790_23.php',
    date: '2020-02-01',
  },
  {
    mark: 'L',
    outlet: 'Libération',
    byline: 'Renaud Lecadre',
    format: { fr: 'Portrait', es: 'Perfil', en: 'Profile' },
    title: {
      fr: 'Gérard Fauré, une clientèle haut de came',
      es: 'Gérard Fauré, una clientela de alta gama',
      en: 'Gérard Fauré, a high-end clientele',
    },
    url: 'https://www.liberation.fr/france/2018/10/25/gerard-faure-une-clientele-haut-de-came_1687887/',
    date: '2018-10-25',
  },
];

export const featuredVideos: Video[] = [
  {
    youtubeId: 'pD-EuGJSdIo',
    title: {
      fr: 'Gérard Fauré, ex-baron de la drogue : assassinats politiques, cocaïne et mafia | Entretien',
      es: 'Gérard Fauré, ex-baron de la drogue : assassinats politiques, cocaïne et mafia | Entretien',
      en: 'Gérard Fauré, ex-baron de la drogue : assassinats politiques, cocaïne et mafia | Entretien',
    },
  },
  {
    youtubeId: 'oYvUZKpnhrE',
    title: {
      fr: 'Gérard Fauré : « Je fournissais de la drogue à Jacques Chirac »',
      es: 'Gérard Fauré : « Je fournissais de la drogue à Jacques Chirac »',
      en: 'Gérard Fauré : « Je fournissais de la drogue à Jacques Chirac »',
    },
  },
  {
    youtubeId: 'EWykj3R4qWE',
    title: {
      fr: 'Gérard Fauré : le dealer des stars dit tout sur TV Libertés !',
      es: 'Gérard Fauré : le dealer des stars dit tout sur TV Libertés !',
      en: 'Gérard Fauré : le dealer des stars dit tout sur TV Libertés !',
    },
  },
  {
    youtubeId: 'r5cMfR8qkCM',
    title: {
      fr: 'Gérard Fauré Partage son Avis sur la Situation Actuelle de la France',
      es: 'Gérard Fauré Partage son Avis sur la Situation Actuelle de la France',
      en: 'Gérard Fauré Partage son Avis sur la Situation Actuelle de la France',
    },
  },
  {
    youtubeId: 'EBiu1dmqEZo',
    title: {
      fr: 'LA VOIX DES BANDITS #1 GERARD FAURE, PERSONA NON GRATA 1/2',
      es: 'LA VOIX DES BANDITS #1 GERARD FAURE, PERSONA NON GRATA 1/2',
      en: 'LA VOIX DES BANDITS #1 GERARD FAURE, PERSONA NON GRATA 1/2',
    },
  },
  {
    youtubeId: 'oerRDDPMFD0',
    title: {
      fr: 'Gérard Fauré répond à toutes nos questions',
      es: 'Gérard Fauré répond à toutes nos questions',
      en: 'Gérard Fauré répond à toutes nos questions',
    },
  },
];

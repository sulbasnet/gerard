import type { Locale } from '@/i18n/config';

/**
 * Book titles stay in French in every locale — they are the actual product
 * name. Synopses are translated (OUTLINE.md §10.1). No purchase links
 * anywhere: no digital editions exist yet (§10.4).
 *
 * Bibliographic facts are linked to the publisher or the BnF record used to
 * verify them. Synopses stay editorial and are localized for the site.
 */
export type Book = {
  slug: string;
  title: string;
  year: number;
  readingOrder: number;
  cover: string;
  /** Editorial synopses, localized for each site language. */
  synopsis: Record<Locale, string[]>;
  publisher: string;
  pages: string;
  isbn: string;
  sourceName: string;
  sourceUrl: string;
  buyOptions: { name: string; url: string }[];
  /** Must be genuine text from the book. Leave undefined until supplied. */
  excerpt?: Record<Locale, string>;
};

export const books: Book[] = [
  {
    slug: 'dealer-du-tout-paris',
    title: 'Dealer du Tout-Paris',
    year: 2018,
    readingOrder: 2,
    cover: '/images/books/dealer-du-tout-paris.jpg',
    synopsis: {
      fr: [
        "Le récit d'une époque et d'un milieu que peu ont connus de l'intérieur, raconté par celui qui s'y trouvait.",
        'Un témoignage direct, sans mise en scène ni justification.',
      ],
      es: [
        'El relato de una época y de un ambiente que pocos conocieron desde dentro, contado por quien estuvo allí.',
        'Un testimonio directo, sin escenificación ni justificaciones.',
      ],
      en: [
        'The account of an era and a milieu few knew from the inside, told by the man who was there.',
        'A direct testimony, without staging or self-justification.',
      ],
    },
    publisher: 'Nouveau Monde Éditions',
    pages: '214 + 6 p. de planches',
    isbn: '9782369427285',
    sourceName: 'Bibliothèque nationale de France',
    sourceUrl: 'https://catalogue.bnf.fr/ark:/12148/cb45610782h',
    buyOptions: [
      { name: 'Nouveau Monde Éditions', url: 'https://www.nouveau-monde.net/catalogue/dealer-du-tout-paris/' },
      { name: 'Fnac', url: 'https://www.fnac.com/a12344245/Gerard-Faure-Dealer-du-Tout-Paris' },
    ],
  },
  {
    slug: 'le-prince-de-la-coke',
    title: 'Le Prince de la Coke',
    year: 2020,
    readingOrder: 3,
    cover: '/images/books/le-prince-de-la-coke.jpg',
    synopsis: {
      fr: [
        'La suite du parcours, entre les nuits parisiennes et les mondes qui se croisaient sans jamais se reconnaître.',
        'Des rencontres, des lieux, et une mécanique que Gérard Fauré décrit de près.',
      ],
      es: [
        'La continuación del recorrido, entre las noches parisinas y los mundos que se cruzaban sin reconocerse nunca.',
        'Encuentros, lugares y una mecánica que Gérard Fauré describe de cerca.',
      ],
      en: [
        'The next stage of the journey, between the Paris nights and worlds that crossed without ever acknowledging one another.',
        'Encounters, places, and a machinery Gérard Fauré describes at close range.',
      ],
    },
    publisher: 'Nouveau Monde Éditions',
    pages: '224',
    isbn: '9782369428770',
    sourceName: 'Nouveau Monde Éditions',
    sourceUrl: 'https://www.nouveau-monde.net/catalogue/le-prince-de-la-coke/',
    buyOptions: [
      { name: 'Nouveau Monde Éditions', url: 'https://www.nouveau-monde.net/catalogue/le-prince-de-la-coke/' },
      { name: 'Fnac', url: 'https://www.fnac.com/a13866919/Gerard-Faure-Le-Prince-de-la-coke' },
    ],
  },
  {
    slug: 'l-education-d-un-voyou',
    title: "L'Éducation d'un Voyou",
    year: 2021,
    readingOrder: 1,
    cover: '/images/books/l-education-d-un-voyou.jpg',
    synopsis: {
      fr: [
        'Le retour aux origines : ce qui précède, ce qui forme, et ce qui décide d\'une trajectoire.',
        "Un livre sur l'apprentissage, plus que sur la faute.",
      ],
      es: [
        'La vuelta a los orígenes: lo que precede, lo que forma y lo que decide una trayectoria.',
        'Un libro sobre el aprendizaje, más que sobre la culpa.',
      ],
      en: [
        'A return to the beginnings: what came before, what shapes a person, and what decides a trajectory.',
        'A book about apprenticeship more than about guilt.',
      ],
    },
    publisher: 'Nouveau Monde Éditions',
    pages: '300',
    isbn: '9782380941982',
    sourceName: 'Nouveau Monde Éditions',
    sourceUrl: 'https://www.nouveau-monde.net/catalogue/leducation-dun-voyou/',
    buyOptions: [
      { name: 'Nouveau Monde Éditions', url: 'https://www.nouveau-monde.net/catalogue/leducation-dun-voyou/' },
      { name: 'Fnac', url: 'https://www.fnac.com/a15701434/Gerard-Faure-L-education-d-un-voyou' },
    ],
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

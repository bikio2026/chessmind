/**
 * Curated opening database for the Opening Trainer.
 * Each opening has a main line, key variations, and educational content.
 */

export const OPENING_CATEGORIES = [
  { id: 'open', name: 'Aperturas abiertas', description: '1.e4 e5 — Juego táctico y abierto' },
  { id: 'semiopen', name: 'Defensas semiabiertas', description: '1.e4 (sin ...e5) — Asimétrico, lucha por el centro' },
  { id: 'closed', name: 'Aperturas cerradas', description: '1.d4 d5 — Juego posicional, maniobras' },
  { id: 'indian', name: 'Defensas indias', description: '1.d4 Nf6 — Hipermoderno, flexible' },
  { id: 'flank', name: 'Aperturas de flanco', description: '1.c4, 1.Nf3 — Control indirecto del centro' },
]

export const OPENINGS = [
  // === APERTURAS ABIERTAS (user plays white) ===
  {
    id: 'italian-giuoco-piano',
    name: 'Italiana (Giuoco Piano)',
    eco: 'C50',
    category: 'open',
    color: 'white',
    mainLine: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'd3', 'Nf6', 'O-O', 'O-O', 'c3', 'd6'],
    variations: [
      { name: 'Ataque Evans', branchAt: 6, moves: ['b4', 'Bxb4', 'c3', 'Ba5', 'd4'] },
      { name: 'Línea con d4 directo', branchAt: 6, moves: ['d4', 'exd4', 'c3', 'dxc3', 'Nxc3'] },
    ],
    description: 'Una de las aperturas más antiguas. Las blancas desarrollan el alfil a c4 apuntando al punto débil f7, buscando un juego de desarrollo rápido con presión central.',
    pawnStructure: 'Centro simétrico con peones en e4/e5. Si blancas juegan c3+d4, se abre la posición. La estructura es flexible y permite planes en ambos flancos.',
    keyIdeas: {
      white: ['Desarrollar rápido: Bc4, O-O, d3/d4', 'Preparar c3+d4 para romper el centro', 'Presionar f7 con alfil y dama'],
      black: ['Desarrollo simétrico con Bc5, Nf6, O-O', 'Mantener peón en e5 como ancla central', 'Contrajuego con ...d5 en el momento justo'],
    },
  },
  {
    id: 'ruy-lopez',
    name: 'Ruy López',
    eco: 'C78',
    category: 'open',
    color: 'white',
    mainLine: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'b5', 'Bb3', 'd6', 'c3', 'O-O'],
    variations: [
      { name: 'Defensa Berlinesa', branchAt: 6, moves: ['Nf6', 'O-O', 'Nxe4', 'd4'] },
      { name: 'Variante del cambio', branchAt: 6, moves: ['Bxc6', 'dxc6', 'O-O', 'f6'] },
    ],
    description: 'La apertura reina del ajedrez clásico. Las blancas presionan indirectamente el peón e5 a través del caballo c6, planteando una lucha estratégica profunda desde las primeras jugadas.',
    pawnStructure: 'Las blancas buscan mantener e4 como base central. Las negras defienden e5 mientras preparan ...d5. La tensión central puede resolverse de muchas formas.',
    keyIdeas: {
      white: ['Presión a largo plazo sobre e5 vía Bb5-a4-b3', 'Plan Breyer: Re1, d4, Nbd2-f1-g3', 'Ataque en el flanco de rey con piezas'],
      black: ['Sistema Morphy: ...a6, ...b5, ...d6, ...O-O', 'Ruptura liberadora con ...d5', 'Contrajuego en el flanco de dama con ...c5'],
    },
  },
  {
    id: 'scotch',
    name: 'Escocesa',
    eco: 'C45',
    category: 'open',
    color: 'white',
    mainLine: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bc5', 'Be3', 'Qf6', 'c3', 'Nge7'],
    variations: [
      { name: 'Escocesa con Nb3', branchAt: 8, moves: ['Nb3', 'Bb6'] },
      { name: 'Gambito Escocés', branchAt: 6, moves: ['Bc4', 'Bc5', 'c3'] },
    ],
    description: 'Apertura directa donde las blancas abren el centro inmediatamente con 3.d4. Genera posiciones abiertas con mucha actividad de piezas desde temprano.',
    pawnStructure: 'Tras 3.d4 exd4 4.Nxd4, las blancas tienen un peón central (e4) contra ninguno de negras. El centro abierto favorece el desarrollo rápido.',
    keyIdeas: {
      white: ['Apertura inmediata del centro con d4', 'Desarrollo rápido: Bc4, Be3, O-O', 'Actividad de piezas desde jugada 3'],
      black: ['Desarrollo rápido: Bc5/Bb4, Nf6', 'Atacar el caballo d4 para ganar tiempos', 'Contrajuego con ...d5 en el momento justo'],
    },
  },

  // === DEFENSAS SEMIABIERTAS (user plays black) ===
  {
    id: 'sicilian-najdorf',
    name: 'Siciliana Najdorf',
    eco: 'B90',
    category: 'semiopen',
    color: 'black',
    mainLine: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    variations: [
      { name: '6.Bg5 (Ataque Inglés)', branchAt: 10, moves: ['Bg5', 'e6', 'f4', 'Be7', 'Qf3'] },
      { name: '6.Be2 (Clásica)', branchAt: 10, moves: ['Be2', 'e5', 'Nb3', 'Be7', 'O-O'] },
      { name: '6.f3 (Inglesa)', branchAt: 10, moves: ['f3', 'e5', 'Nb3', 'Be6', 'Be3'] },
    ],
    description: 'La defensa más combativa contra 1.e4. Con 5...a6 las negras preparan la expansión en el flanco de dama con ...b5, manteniendo máxima flexibilidad sobre cómo desarrollar el juego.',
    pawnStructure: 'Peones asimétricos: e4 vs d6, con la columna c semiabierta para las negras. La estructura Maroczy (e4+c4) es un tema si blancas juegan c4.',
    keyIdeas: {
      white: ['Ataque en el flanco de rey con f3-g4-h4 o Bg5-f4', 'Control del centro con e4-Nc3-Be2', 'Presión en la columna d'],
      black: ['Expansión con ...b5 en el flanco de dama', 'Ruptura central con ...e5 o ...d5', 'El caballo en d7→c5→e6 es muy activo'],
    },
  },
  {
    id: 'sicilian-dragon',
    name: 'Siciliana Dragón',
    eco: 'B70',
    category: 'semiopen',
    color: 'black',
    mainLine: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O'],
    variations: [
      { name: 'Ataque Yugoslavo', branchAt: 14, moves: ['Qd2', 'Nc6', 'Bc4', 'Bd7', 'O-O-O'] },
      { name: 'Dragón Clásico', branchAt: 10, moves: ['Be2', 'Bg7', 'O-O', 'O-O', 'Nb3'] },
    ],
    description: 'Una de las defensas más agudas del ajedrez. Las negras fianchetan el alfil en g7 creando una diagonal devastadora, mientras las blancas lanzan un ataque directo en el flanco de rey.',
    pawnStructure: 'Similar a la Najdorf pero con g6: el alfil de g7 controla las casillas oscuras centrales. La estructura invita al ataque mutuo en flancos opuestos.',
    keyIdeas: {
      white: ['Ataque Yugoslavo: Qd2, Bc4, O-O-O, h4-h5', 'Sacrificio en h5 para abrir la columna h', 'Presión sobre el enroque negro'],
      black: ['Presión en la columna c contra c2/c3', 'Alfil de g7 como pieza más fuerte', 'Contrataque en el flanco de dama: ...Rc8, ...a5-a4'],
    },
  },
  {
    id: 'caro-kann',
    name: 'Caro-Kann',
    eco: 'B12',
    category: 'semiopen',
    color: 'black',
    mainLine: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Nf3', 'Nd7'],
    variations: [
      { name: 'Variante del Avance', branchAt: 4, moves: ['e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5'] },
      { name: 'Variante Tartakower', branchAt: 8, moves: ['Nf6', 'Nxf6+', 'exf6'] },
    ],
    description: 'Defensa sólida y posicional contra 1.e4. Las negras aseguran el punto d5 con c6 antes de jugar ...d5, obteniendo una posición sólida con buen desarrollo del alfil de casillas claras.',
    pawnStructure: 'Simétrica: d4 vs d5 con c6 apoyando. Si desaparece el centro (dxe4, Nxe4), la estructura se abre. La clave es que el alfil de c8 sale activo a f5.',
    keyIdeas: {
      white: ['Ocupar el centro con e4-d4', 'Ataque con Ng3-h4 buscando debilidades en el flanco de rey', 'Aprovechar la ventaja de espacio'],
      black: ['Desarrollar el alfil a f5 ANTES de jugar ...e6', 'Estructura sólida con ...Nd7, ...Ngf6, ...e6', 'Contrajuego con ...c5 rompiendo el centro'],
    },
  },
  {
    id: 'french-winawer',
    name: 'Francesa (Winawer)',
    eco: 'C15',
    category: 'semiopen',
    color: 'black',
    mainLine: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7'],
    variations: [
      { name: 'Variante Clásica (3...Nf6)', branchAt: 4, moves: ['Nf6', 'e5', 'Nfd7', 'f4'] },
      { name: 'Variante Tarrasch (3.Nd2)', branchAt: 4, moves: ['Nf6', 'e5', 'Nfd7', 'Bd3'] },
    ],
    description: 'Defensa estratégica donde las negras aceptan un alfil de casillas claras encerrado a cambio de una estructura de peones sólida y contrajuego en el flanco de dama.',
    pawnStructure: 'Cadena de peones: las blancas tienen e5-d4, las negras d5-e6. La lucha es por romper la cadena: las negras atacan la base con ...c5, las blancas empujan con f4-f5.',
    keyIdeas: {
      white: ['Mantener la cadena e5-d4', 'Ataque en el flanco de rey con f4-f5', 'Aprovechar el alfil malo de negras en c8'],
      black: ['Ruptura con ...c5 atacando d4', 'Maniobra Nb8-d7-b6 apuntando a c4/a4', 'Juego en el flanco de dama: ...a5, ...Ba6, ...Qc7'],
    },
  },

  // === APERTURAS CERRADAS (user plays white) ===
  {
    id: 'queens-gambit-declined',
    name: 'Gambito de Dama Declinado',
    eco: 'D37',
    category: 'closed',
    color: 'white',
    mainLine: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'Be7', 'Bf4', 'O-O', 'e3', 'Nbd7'],
    variations: [
      { name: 'Sistema Carlsbad', branchAt: 4, moves: ['cxd5', 'exd5', 'Bg5', 'c6', 'e3'] },
      { name: 'Variante del cambio', branchAt: 4, moves: ['cxd5', 'exd5', 'Bg5', 'Be7'] },
    ],
    description: 'Las negras declinan el gambito manteniendo el peón en d5. Produce posiciones clásicas donde las blancas presionan el centro y las negras buscan igualar gradualmente.',
    pawnStructure: 'Centro clásico: d4/c4 vs d5/e6. La tensión central se resuelve con dxc4 o cxd5. La columna c y la diagonal a2-g8 son campos de batalla.',
    keyIdeas: {
      white: ['Presionar d5 con Nc3, Bg5, cxd5', 'Ataque de minorías: a4-b4-b5 en el flanco de dama', 'Control del centro con e3-Bd3'],
      black: ['Liberar con ...c5 o ...dxc4 + ...e5', 'Desarrollo sólido: Be7, O-O, Nbd7', 'Contrajuego por la columna c tras ...c5'],
    },
  },
  {
    id: 'queens-gambit-accepted',
    name: 'Gambito de Dama Aceptado',
    eco: 'D20',
    category: 'closed',
    color: 'white',
    mainLine: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6'],
    variations: [
      { name: 'Con ...a6 temprano', branchAt: 6, moves: ['a6', 'e3', 'e6', 'Bxc4'] },
      { name: 'Defensa clásica', branchAt: 8, moves: ['Bg4', 'Bxc4', 'e6', 'Qb3'] },
    ],
    description: 'Las negras aceptan el peón y buscan mantenerlo temporalmente mientras desarrollan. Las blancas recuperan el peón con ventaja de desarrollo y centro fuerte.',
    pawnStructure: 'Tras la recuperación del peón, las blancas tienen centro (d4) y las negras juegan ...c5 para desafiarlo. Posiciones abiertas con mucho juego de piezas.',
    keyIdeas: {
      white: ['Recuperar el peón con Bxc4 o e3+Bxc4', 'Centro fuerte con d4: pilar del juego', 'Desarrollo rápido y presión en columnas abiertas'],
      black: ['Desarrollo activo: Nf6, e6, c5', 'Desafiar d4 con ...c5', 'Buscar igualdad táctica con buen desarrollo'],
    },
  },

  // === DEFENSAS INDIAS (user plays black) ===
  {
    id: 'kings-indian',
    name: 'India de Rey',
    eco: 'E60',
    category: 'indian',
    color: 'black',
    mainLine: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5'],
    variations: [
      { name: 'Variante Sämisch', branchAt: 8, moves: ['f3', 'O-O', 'Be3', 'e5'] },
      { name: 'Ataque de los cuatro peones', branchAt: 8, moves: ['f4', 'O-O', 'Nf3', 'c5'] },
    ],
    description: 'Defensa hipermoderna donde las negras permiten que las blancas ocupen el centro y luego lo atacan. Genera posiciones extremadamente combativas con ataques en flancos opuestos.',
    pawnStructure: 'Blancas: d4+e4+c4 vs Negras: d6+e5. Tras ...e5 se forma una cadena. Blancas atacan en el flanco de dama (c5, d5), negras en el de rey (f5, g5, h5).',
    keyIdeas: {
      white: ['Avance en el flanco de dama: c5, b4-b5', 'Bloquear el flanco de rey si negras juegan ...f5', 'Aprovechar la ventaja de espacio'],
      black: ['Ataque en el flanco de rey: ...f5, ...f4, ...g5, ...h5', 'El alfil de g7 es la pieza clave', 'Sacrificio temático ...Nf6-h5-f4'],
    },
  },
  {
    id: 'nimzo-indian',
    name: 'Nimzo-India',
    eco: 'E20',
    category: 'indian',
    color: 'black',
    mainLine: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Qc2', 'O-O', 'a3', 'Bxc3+', 'Qxc3', 'd5'],
    variations: [
      { name: 'Variante Rubinstein (4.e3)', branchAt: 6, moves: ['e3', 'O-O', 'Bd3', 'd5'] },
      { name: 'Variante Sämisch (4.a3)', branchAt: 6, moves: ['a3', 'Bxc3+', 'bxc3', 'c5'] },
    ],
    description: 'Defensa flexible y estratégica. Las negras clavan el caballo c3 con Bb4, controlando e4 indirectamente. Si las blancas capturan, quedan con peones doblados en c.',
    pawnStructure: 'Si bxc3: blancas tienen peones doblados en c pero par de alfiles y centro fuerte. La lucha gira alrededor de si las blancas pueden abrir la posición para los alfiles.',
    keyIdeas: {
      white: ['Usar el par de alfiles en posición abierta', 'Centro con e4 (si logran jugarlo)', 'Evitar posiciones cerradas donde los peones doblados pesan'],
      black: ['Provocar peones doblados: ...Bxc3', 'Bloquear el centro para minimizar los alfiles', 'Control de e4: si blancas no juegan e4, negras tienen ventaja estructural'],
    },
  },
  {
    id: 'slav',
    name: 'Eslava',
    eco: 'D10',
    category: 'closed',
    color: 'black',
    mainLine: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6'],
    variations: [
      { name: 'Semi-Eslava', branchAt: 6, moves: ['e6', 'Nc3', 'Nbd7', 'Bd3', 'dxc4', 'Bxc4'] },
      { name: 'Eslava del cambio', branchAt: 4, moves: ['cxd5', 'cxd5', 'Nc3', 'Nf6'] },
    ],
    description: 'Defensa sólida contra el Gambito de Dama. Las negras apoyan d5 con c6 (en vez de e6), permitiendo el desarrollo activo del alfil de casillas claras antes de jugar ...e6.',
    pawnStructure: 'Centro clásico d4/c4 vs d5/c6. La ventaja de la Eslava sobre el GDD es que el alfil de c8 no queda encerrado detrás de e6.',
    keyIdeas: {
      white: ['Presión central con Nc3, e3, Bd3', 'Recuperar el peón c4 si negras lo capturan', 'Ataque de minorías en el flanco de dama'],
      black: ['Alfil activo en f5 (la idea clave de la Eslava)', 'Estructura sólida con ...e6, ...Nbd7, ...Be7', 'Contrajuego central con ...dxc4 seguido de ...e5'],
    },
  },

  // === FLANCOS (user plays white) ===
  {
    id: 'english',
    name: 'Inglesa',
    eco: 'A20',
    category: 'flank',
    color: 'white',
    mainLine: ['c4', 'e5', 'Nc3', 'Nf6', 'g3', 'd5', 'cxd5', 'Nxd5', 'Bg2', 'Nb6', 'Nf3', 'Nc6'],
    variations: [
      { name: 'Siciliana invertida', branchAt: 2, moves: ['Nc3', 'Nc6', 'g3', 'g6', 'Bg2'] },
      { name: 'Sistema cerrado', branchAt: 2, moves: ['g3', 'Nc6', 'Bg2', 'g6', 'Nc3'] },
    ],
    description: 'Apertura de flanco donde las blancas controlan el centro indirectamente con c4 y el fianchetto del alfil de rey. Posiciones flexibles que pueden transponer a muchos sistemas.',
    pawnStructure: 'Asimétrica: c4 vs e5. Las blancas controlan d5 sin comprometer el centro con e4. Puede transponer a India de Rey invertida o Siciliana invertida.',
    keyIdeas: {
      white: ['Fianchetto del alfil en g2: control de la diagonal larga', 'Presión sobre d5 con c4+Nc3', 'Flexibilidad: decidir tarde si d3 o d4'],
      black: ['Ocupar el centro con ...d5', 'Desarrollo natural: Nf6, Bc5/Be7, O-O', 'Aprovechar la ausencia de e4 para tomar espacio'],
    },
  },
]

/**
 * Get openings grouped by category.
 */
export function getOpeningsByCategory() {
  const grouped = {}
  for (const cat of OPENING_CATEGORIES) {
    grouped[cat.id] = {
      ...cat,
      openings: OPENINGS.filter(o => o.category === cat.id),
    }
  }
  return grouped
}

/**
 * Find an opening by its id.
 */
export function getOpeningById(id) {
  return OPENINGS.find(o => o.id === id) || null
}

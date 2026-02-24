# Catalogo de Aperturas

## Categorias

| ID | Nombre | Descripcion |
|----|--------|-------------|
| `open` | Aperturas abiertas | 1.e4 e5 — Juego tactico y abierto |
| `semiopen` | Defensas semiabiertas | 1.e4 (sin ...e5) — Asimetrico, lucha por el centro |
| `closed` | Aperturas cerradas | 1.d4 d5 — Juego posicional, maniobras |
| `indian` | Defensas indias | 1.d4 Nf6 — Hipermoderno, flexible |
| `flank` | Aperturas de flanco | 1.c4, 1.Nf3 — Control indirecto del centro |

---

## Aperturas (13)

### Abiertas (1.e4 e5)

| # | Nombre | ECO | Color | Jugadas de teoria |
|---|--------|-----|-------|-------------------|
| 1 | Italiana (Giuoco Piano) | C50 | Blancas | e4 e5 Nf3 Nc6 Bc4 Bc5 d3 Nf6 O-O O-O c3 d6 |
| 2 | Ruy Lopez | C78 | Blancas | e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O b5 Bb3 d6 c3 O-O |
| 3 | Escocesa | C45 | Blancas | e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 |

### Semiabiertas (1.e4, sin ...e5)

| # | Nombre | ECO | Color | Jugadas de teoria |
|---|--------|-----|-------|-------------------|
| 4 | Siciliana Najdorf | B90 | Negras | e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 |
| 5 | Siciliana Dragon | B70 | Negras | e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 |
| 6 | Caro-Kann | B12 | Negras | e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 |
| 7 | Francesa (Winawer) | C15 | Negras | e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 |

### Cerradas (1.d4 d5)

| # | Nombre | ECO | Color | Jugadas de teoria |
|---|--------|-----|-------|-------------------|
| 8 | Gambito de Dama Declinado | D37 | Blancas | d4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bf4 O-O e3 |
| 9 | Gambito de Dama Aceptado | D20 | Blancas | d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O |
| 10 | Eslava | D10 | Negras | d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 |

### Indias (1.d4 Nf6)

| # | Nombre | ECO | Color | Jugadas de teoria |
|---|--------|-----|-------|-------------------|
| 11 | India de Rey | E60 | Negras | d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 |
| 12 | Nimzo-India | E20 | Negras | d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3 |

### Flancos

| # | Nombre | ECO | Color | Jugadas de teoria |
|---|--------|-----|-------|-------------------|
| 13 | Inglesa | A20 | Blancas | c4 e5 Nc3 Nf6 Nf3 Nc6 g3 d5 cxd5 Nxd5 Bg2 |

---

## Estructura de datos

Cada apertura en `src/data/openings.js`:

```js
{
  id: 'caro-kann',              // ID unico (slug)
  name: 'Caro-Kann',            // Nombre para display
  eco: 'B12',                   // Codigo ECO
  category: 'semiopen',         // Referencia a OPENING_CATEGORIES
  color: 'black',               // Color que juega el usuario
  mainLine: ['e4', 'c6', ...],  // Movimientos SAN de la linea principal
  variations: [                  // Variantes conocidas
    {
      name: 'Variante del Avance',
      branchAt: 4,               // Indice donde se separa de la mainLine
      moves: ['e5', 'Bf5', ...]  // Movimientos de la variante
    }
  ],
  description: '...',           // Explicacion de la apertura
  pawnStructure: '...',         // Descripcion de la estructura de peones
  keyIdeas: {
    white: ['...', '...'],      // Ideas principales para blancas
    black: ['...', '...']       // Ideas principales para negras
  }
}
```

---

## Agregar una apertura nueva

1. Agregar el objeto al array `OPENINGS` en `src/data/openings.js`
2. Asegurar que:
   - `id` es unico (slug, sin espacios)
   - `category` coincide con un ID de `OPENING_CATEGORIES`
   - `color` es `'white'` o `'black'` segun el lado del usuario
   - `mainLine` usa notacion SAN valida (chess.js la parsea)
   - Las variantes tienen `branchAt` correcto (indice 0-based en mainLine)
3. La apertura aparece automaticamente en el selector, agrupada por categoria

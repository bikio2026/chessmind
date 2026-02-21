/**
 * Piece theme configurations for react-chessboard.
 * Each theme is a function that returns the customPieces object.
 * Keys: wP, wN, wB, wR, wQ, wK, bP, bN, bB, bR, bQ, bK
 */

// ─── PIXEL ART THEME (16x16 grid) ──────────────────────
// High-detail pixel art rendered as SVG rects

function pixelGridSvg(pixels, colors) {
  const gridSize = pixels.length
  const rects = []
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const val = pixels[y]?.[x]
      if (val > 0 && colors[val]) {
        rects.push(`<rect x="${x}" y="${y}" width="1.05" height="1.05" fill="${colors[val]}"/>`)
      }
    }
  }
  return rects.join('')
}

// 16x16 pixel patterns  (0=empty, 1=fill, 2=outline, 3=highlight/detail)
const PIXEL_16 = {
  p: [ // Pawn
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,1,3,3,1,2,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  n: [ // Knight
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,1,3,1,2,2,0,0,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,2,3,1,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,2,1,1,2,2,1,1,1,2,0,0,0,0,0],
    [0,0,0,2,2,0,2,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  b: [ // Bishop
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,3,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,2,1,2,0,0,0,0,0],
    [0,0,0,0,0,2,1,2,1,1,2,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  r: [ // Rook
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,2,0,2,2,2,0,2,2,0,0,0,0],
    [0,0,0,2,1,2,1,1,1,2,1,2,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,3,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  q: [ // Queen
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,2,2,0,0,2,0,0,0,0,0],
    [0,0,2,1,2,0,2,3,2,2,1,2,0,0,0,0],
    [0,0,0,2,1,2,1,1,1,2,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,2,0,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  k: [ // King
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,3,3,2,0,0,0,0,0,0],
    [0,0,0,0,0,2,2,1,1,2,2,0,0,0,0,0],
    [0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0],
    [0,0,0,2,2,2,1,1,1,1,2,2,2,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,0,2,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
}

const PIXEL_COLORS = {
  white: { 1: '#f5f5f0', 2: '#555555', 3: '#e0e0d8' },
  black: { 1: '#2a2a2a', 2: '#111111', 3: '#444444' },
}

function createPixelPiece(pieceType, isWhite) {
  const colors = isWhite ? PIXEL_COLORS.white : PIXEL_COLORS.black
  const pattern = PIXEL_16[pieceType]
  if (!pattern) return null

  const gridSize = pattern.length
  const svgContent = pixelGridSvg(pattern, colors)
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gridSize} ${gridSize}">${svgContent}</svg>`
  const dataUri = `data:image/svg+xml,${encodeURIComponent(svgString)}`

  // v5 PieceRenderObject: (props?: { fill?, square?, svgStyle? }) => JSX.Element
  return () => (
    <img
      src={dataUri}
      alt=""
      style={{ width: '90%', height: '90%', imageRendering: 'pixelated' }}
      draggable={false}
    />
  )
}

function getPixelPieces() {
  return {
    wP: createPixelPiece('p', true),
    wN: createPixelPiece('n', true),
    wB: createPixelPiece('b', true),
    wR: createPixelPiece('r', true),
    wQ: createPixelPiece('q', true),
    wK: createPixelPiece('k', true),
    bP: createPixelPiece('p', false),
    bN: createPixelPiece('n', false),
    bB: createPixelPiece('b', false),
    bR: createPixelPiece('r', false),
    bQ: createPixelPiece('q', false),
    bK: createPixelPiece('k', false),
  }
}

// ─── NEO THEME (clean minimalist SVG) ──────────────────

const NEO_SVGS = {
  wP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#333" stroke-width="1.5" stroke-linecap="round"><circle cx="22.5" cy="13" r="5"/><path d="M17 26c0-4 3-7.5 5.5-7.5S28 22 28 26" fill="#fff"/><path d="M11.5 37c0-6 6-10.5 11-10.5s11 4.5 11 10.5" fill="#fff"/><path d="M10 37h25" fill="none"/></g></svg>`,
  wN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#fff"/><circle cx="12" cy="25" r="1" fill="#333" stroke="none"/><path d="M14.5 15.5s-1 0-2.5-1 0-2.5 3-1 2.5 3 2.5 3" fill="#fff"/></g></svg>`,
  wB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><circle cx="22.5" cy="8" r="2.5"/></g><path d="M17.5 26h10M15 30h15" fill="none" stroke-linejoin="miter"/></g></svg>`,
  wR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3.5-7l1.5-2.5h17l1.5 2.5h-20zm-.5 4v-4h21v4H12z" stroke-linecap="butt"/><path d="M14 29.5v-13h17v13H14z" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" stroke-linecap="butt"/></g></svg>`,
  wQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-3.5-7-5 6.5-5-6.5-3.5 7-7.5-11L9 26z" stroke-linecap="butt"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/></g></svg>`,
  wK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="#fff"/><path d="M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0" fill="none"/></g></svg>`,
  bP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#333" stroke-width="1.5" stroke-linecap="round"><circle cx="22.5" cy="13" r="5"/><path d="M17 26c0-4 3-7.5 5.5-7.5S28 22 28 26"/><path d="M11.5 37c0-6 6-10.5 11-10.5s11 4.5 11 10.5"/><path d="M10 37h25" fill="none"/></g></svg>`,
  bN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#333"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#333"/><circle cx="12" cy="25" r="1" fill="#fff" stroke="none"/><path d="M14.5 15.5s-1 0-2.5-1 0-2.5 3-1 2.5 3 2.5 3" fill="#333" stroke="#fff"/></g></svg>`,
  bB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><circle cx="22.5" cy="8" r="2.5"/></g><path d="M17.5 26h10M15 30h15" fill="none" stroke="#fff" stroke-linejoin="miter"/></g></svg>`,
  bR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3.5-7l1.5-2.5h17l1.5 2.5h-20zm-.5 4v-4h21v4H12z" stroke-linecap="butt"/><path d="M14 29.5v-13h17v13H14z" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" stroke-linecap="butt"/><path d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23" fill="none" stroke="#fff" stroke-width="1" stroke-linejoin="miter"/></g></svg>`,
  bQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-3.5-7-5 6.5-5-6.5-3.5 7-7.5-11L9 26z" stroke-linecap="butt"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" stroke="#fff"/></g></svg>`,
  bK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#333" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"/><path d="M20 8h5" stroke-linejoin="miter"/><path d="M32 29.5s8.5-4 6.03-9.65C34.15 14 25 18 22.5 24.5v2.1-2.1C20 18 10.85 14 6.97 19.85 4.5 25.5 13 29.5 13 29.5" fill="none" stroke="#fff"/><path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0" fill="none" stroke="#fff"/></g></svg>`,
}

function createNeoSvgPiece(svgString) {
  const dataUri = `data:image/svg+xml,${encodeURIComponent(svgString)}`
  // v5 PieceRenderObject: (props?: { fill?, square?, svgStyle? }) => JSX.Element
  return () => (
    <img
      src={dataUri}
      alt=""
      style={{ width: '90%', height: '90%' }}
      draggable={false}
    />
  )
}

function getNeoPieces() {
  const pieces = {}
  for (const [key, svg] of Object.entries(NEO_SVGS)) {
    pieces[key] = createNeoSvgPiece(svg)
  }
  return pieces
}

// ─── THEMES REGISTRY ───────────────────────────────────

export const THEMES = {
  classic: {
    name: 'Clásico',
    description: 'Piezas estándar de react-chessboard',
    getPieces: () => undefined, // Use react-chessboard default
  },
  neo: {
    name: 'Neo Staunton',
    description: 'SVG vectoriales estilo Staunton',
    getPieces: getNeoPieces,
  },
  pixel: {
    name: 'Pixel Art',
    description: 'Estilo retro 8-bit',
    getPieces: getPixelPieces,
  },
}

export const THEME_NAMES = Object.keys(THEMES)
export const DEFAULT_THEME = 'classic'

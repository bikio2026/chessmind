import { batch1 } from './_batch1'
import { batch2 } from './_batch2'
import { batch3 } from './_batch3'
import { batch4 } from './_batch4'

const _curated = [
  // ═══════════════════════════════════════════
  // ERA ROMÁNTICA (1850-1900)
  // ═══════════════════════════════════════════
  {
    id: 'immortal-1851', name: 'La Inmortal', white: 'Anderssen', black: 'Kieseritzky',
    year: 1851, result: '1-0', eco: 'C33', opening: "King's Gambit", event: 'London',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['sacrificio', 'ataque', 'inmortal'],
    pgn: `[Event "London"]\n[White "Anderssen"]\n[Black "Kieseritzky"]\n[Result "1-0"]\n\n1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7# 1-0`,
  },
  {
    id: 'evergreen-1852', name: 'La Siempreviva', white: 'Anderssen', black: 'Dufresne',
    year: 1852, result: '1-0', eco: 'C52', opening: 'Evans Gambit', event: 'Berlin',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['sacrificio', 'ataque', 'brillante'],
    pgn: `[Event "Berlin"]\n[White "Anderssen"]\n[Black "Dufresne"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O d3 8. Qb3 Qf6 9. e5 Qg6 10. Re1 Nge7 11. Ba3 b5 12. Qxb5 Rb8 13. Qa4 Bb6 14. Nbd2 Bb7 15. Ne4 Qf5 16. Bxd3 Qh5 17. Nf6+ gxf6 18. exf6 Rg8 19. Rad1 Qxf3 20. Rxe7+ Nxe7 21. Qxd7+ Kxd7 22. Bf5+ Ke8 23. Bd7+ Kf8 24. Bxe7# 1-0`,
  },
  {
    id: 'opera-1858', name: 'Opera Game', white: 'Morphy', black: 'Duke/Count',
    year: 1858, result: '1-0', eco: 'C41', opening: "Philidor's Defense", event: 'Paris Opera',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['desarrollo', 'miniatura', 'ataque'],
    pgn: `[Event "Paris Opera"]\n[White "Morphy"]\n[Black "Duke/Count"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`,
  },
  {
    id: 'morphy-paulsen-1857', name: 'Morphy vs Paulsen', white: 'Morphy', black: 'Paulsen',
    year: 1857, result: '1-0', eco: 'C48', opening: 'Four Knights', event: 'New York',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['sacrificio', 'ataque', 'combinacion'],
    pgn: `[Event "New York"]\n[White "Morphy"]\n[Black "Paulsen"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bc5 5. O-O O-O 6. Nxe5 Re8 7. Nxc6 dxc6 8. Bc4 b5 9. Be2 Nxe4 10. Nxe4 Rxe4 11. Bf3 Re6 12. c3 Qd3 13. b4 Bb6 14. a4 bxa4 15. Qxa4 Bd7 16. Ra2 Rae8 17. Qa6 Qxf3 18. gxf3 Rg6+ 19. Kh1 Bh3 20. Rd1 Bg2+ 21. Kg1 Bxf3+ 22. Kf1 Bg2+ 23. Kg1 Bh3+ 24. Kh1 Bxf2 25. Qf1 Bxf1 26. Rxf1 Re2 27. Ra1 Rh6 28. d4 Be3 1-0`,
  },
  {
    id: 'steinitz-zukertort-1886', name: 'Steinitz vs Zukertort WCh G1', white: 'Steinitz', black: 'Zukertort',
    year: 1886, result: '1-0', eco: 'D26', opening: 'QGA', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['campeonato mundial', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Steinitz"]\n[Black "Zukertort"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 dxc4 5. e3 c5 6. Bxc4 cxd4 7. exd4 Be7 8. O-O O-O 9. Qe2 Nbd7 10. Bb3 Nb6 11. Bf4 Nbd5 12. Bg3 Qa5 13. Rac1 Bd7 14. Ne5 Rfd8 15. Qf3 Be8 16. Rfe1 Rac8 17. Bh4 Nxc3 18. bxc3 Qa3 19. Bf5 Rc7 20. Qh3 h6 21. Bxf6 Bxf6 22. Bxe6 fxe6 23. Qxe6+ Kh8 24. Qxf6 Kg8 25. Re3 Qb2 26. Rg3 1-0`,
  },
  {
    id: 'pillsbury-lasker-1895', name: 'Pillsbury vs Lasker', white: 'Pillsbury', black: 'Lasker',
    year: 1895, result: '0-1', eco: 'D50', opening: 'QGD', event: 'St Petersburg',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['defensa', 'final', 'posicional'],
    pgn: `[Event "St Petersburg"]\n[White "Pillsbury"]\n[Black "Lasker"]\n[Result "0-1"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Be7 5. Bg5 O-O 6. e3 b6 7. Rc1 Bb7 8. cxd5 exd5 9. Bb5 a6 10. Ba4 Nbd7 11. O-O c5 12. dxc5 bxc5 13. Qe2 Qb6 14. Bxd7 Nxd7 15. Bxe7 Rfe8 16. Ba3 c4 17. Nd4 Qg6 18. f3 Rac8 19. Rfd1 Ne5 20. Bb4 Nd3 21. Rc2 Re5 22. Ba3 Rh5 23. h3 Rc5 24. Rcd2 Qe8 25. Kf1 Qe5 26. g4 Qh2 27. Ke2 Qg3 28. Nf5 Nf4+ 0-1`,
  },
  // ═══════════════════════════════════════════
  // ERA CLÁSICA (1900-1930)
  // ═══════════════════════════════════════════
  {
    id: 'capablanca-marshall-1918', name: 'Gambito Marshall', white: 'Capablanca', black: 'Marshall',
    year: 1918, result: '1-0', eco: 'C89', opening: 'Ruy Lopez Marshall', event: 'New York',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['defensa', 'apertura', 'brillante'],
    pgn: `[Event "New York"]\n[White "Capablanca"]\n[Black "Marshall"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 Nf6 12. Re1 Bd6 13. h3 Ng4 14. Qf3 Qh4 15. d4 Nxf2 16. Re2 Bg4 17. hxg4 Bh2+ 18. Kf1 Bg3 19. Rxf2 Qh1+ 20. Ke2 Bxf2 21. Bd2 Bh4 22. Qh3 Rae8+ 23. Kd3 Qf1+ 24. Kc2 Bf2 25. Qf3 Qg1 26. Bd5 c5 27. dxc5 Bxc5 28. b4 Bd6 29. a4 a5 30. axb5 axb4 31. Ra6 bxc3 32. Nxc3 Bb4 33. b6 Bxc3 34. Bxc3 h6 35. b7 Re3 36. Bxf7+ 1-0`,
  },
  {
    id: 'alekhine-reti-1925', name: 'Alekhine vs Reti', white: 'Alekhine', black: 'Reti',
    year: 1925, result: '1-0', eco: 'B03', opening: 'Alekhine Defense', event: 'Baden-Baden',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['miniatura', 'ataque'],
    pgn: `[Event "Baden-Baden"]\n[White "Alekhine"]\n[Black "Reti"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 Nf6 3. e5 Nd5 4. Nc3 e6 5. Nxd5 exd5 6. d4 Nc6 7. dxc5 Bxc5 8. Qxd5 Qb6 9. Bc4 Bxf2+ 10. Ke2 O-O 11. Rf1 Bc5 12. Ng5 Re8 13. Qxf7+ Kh8 14. Bf4 Nd4+ 15. Kd2 b5 16. Qg8+ Rxg8 17. Bf7# 1-0`,
  },
  {
    id: 'rubinstein-rotlewi-1907', name: 'Rubinstein Immortal', white: 'Rotlewi', black: 'Rubinstein',
    year: 1907, result: '0-1', eco: 'D32', opening: 'QGD Tarrasch', event: 'Lodz',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['sacrificio', 'combinacion', 'brillante'],
    pgn: `[Event "Lodz"]\n[White "Rotlewi"]\n[Black "Rubinstein"]\n[Result "0-1"]\n\n1. d4 d5 2. Nf3 e6 3. e3 c5 4. c4 Nc6 5. Nc3 Nf6 6. dxc5 Bxc5 7. a3 a6 8. b4 Bd6 9. Bb2 O-O 10. Qd2 Qe7 11. Bd3 dxc4 12. Bxc4 b5 13. Bd3 Rd8 14. Qe2 Bb7 15. O-O Ne5 16. Nxe5 Bxe5 17. f4 Bc7 18. e4 Rac8 19. e5 Bb6+ 20. Kh1 Ng4 21. Be4 Qh4 22. g3 Rxc3 23. gxh4 Rd2 24. Qxd2 Bxe4+ 25. Qg2 Rh3 0-1`,
  },
  {
    id: 'lasker-capablanca-1921', name: 'Lasker vs Capablanca WCh', white: 'Lasker', black: 'Capablanca',
    year: 1921, result: '0-1', eco: 'D61', opening: 'QGD Orthodox', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['campeonato mundial', 'final', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Lasker"]\n[Black "Capablanca"]\n[Result "0-1"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Qc2 c5 8. Rd1 Qa5 9. Bd3 h6 10. Bh4 cxd4 11. exd4 dxc4 12. Bxc4 Nb6 13. Bb3 Bd7 14. O-O Rac8 15. Ne5 Bb5 16. Rfe1 Nbd5 17. Bxf6 Nxf6 18. Bxe6 fxe6 19. Nxb5 Qxb5 20. Rxe6 Rc7 21. Rde1 Kf8 22. Nf3 Rd7 23. d5 Rf5 24. d6 Rxd6 25. Re8+ Kf7 26. R1e6 Rd1+ 27. Nxd1 Rf1# 0-1`,
  },
  {
    id: 'capablanca-lasker-1914', name: 'Capablanca vs Lasker SPb', white: 'Capablanca', black: 'Lasker',
    year: 1914, result: '1-0', eco: 'C68', opening: 'Ruy Lopez Exchange', event: 'St Petersburg',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['final', 'posicional', 'tecnico'],
    pgn: `[Event "St Petersburg"]\n[White "Capablanca"]\n[Black "Lasker"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. d4 exd4 6. Qxd4 Qxd4 7. Nxd4 Bd6 8. Nc3 Ne7 9. O-O O-O 10. f4 Re8 11. Nb3 f6 12. f5 b6 13. Bf4 Bb7 14. Bxd6 cxd6 15. Nd4 Rad8 16. Ne6 Rd7 17. Rad1 Nc8 18. Rf2 b5 19. Rfd2 Rde7 20. b4 Kf7 21. a3 Ba8 22. Kf2 Ra7 23. g4 h6 24. Rd3 a5 25. h4 axb4 26. axb4 Rae7 27. Kf3 Rg8 28. Kf4 g6 29. Rg3 g5+ 30. Kf3 Nb6 31. hxg5 hxg5 32. Rh3 Rd7 33. Kg3 Ke8 34. Rdh1 Bb7 35. e5 dxe5 36. Nxg5 Nd5 37. Nxf6+ 1-0`,
  },
  {
    id: 'alekhine-capablanca-1927-34', name: 'Alekhine vs Capablanca WCh G34', white: 'Alekhine', black: 'Capablanca',
    year: 1927, result: '1-0', eco: 'D51', opening: 'QGD Cambridge Springs', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['campeonato mundial', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Alekhine"]\n[Black "Capablanca"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 Be7 6. Nf3 O-O 7. Rc1 a6 8. a3 h6 9. Bh4 dxc4 10. Bxc4 b5 11. Be2 Bb7 12. O-O c5 13. dxc5 Nxc5 14. Nd4 Rc8 15. b4 Nce4 16. Nxe4 Nxe4 17. Bf3 Nd6 18. Nb3 Rxc1 19. Qxc1 Qb8 20. Nd4 Rc8 21. Qb2 Bf6 22. Rc1 Ne4 23. Rxc8+ Qxc8 24. Bxf6 Nxf6 25. Qc3 Qxc3 26. Nxe6 Kf8 27. Nd4 Bd5 28. Bxd5 Nxd5 29. Kf1 Ke7 30. Ke2 Kd6 31. Kd3 Nc7 32. f4 f5 33. g4 fxg4 34. f5 Ke5 35. Nc6+ Kxf5 36. Nd4+ Ke5 37. Ne2 g3 38. hxg3 Kd5 39. Nf4+ Ke5 40. Ng6+ Kd5 41. Kc3 1-0`,
  },
  {
    id: 'nimzowitsch-tarrasch-1914', name: 'Nimzowitsch vs Tarrasch', white: 'Nimzowitsch', black: 'Tarrasch',
    year: 1914, result: '0-1', eco: 'D30', opening: 'QGD', event: 'St Petersburg',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['posicional', 'final'],
    pgn: `[Event "St Petersburg"]\n[White "Nimzowitsch"]\n[Black "Tarrasch"]\n[Result "0-1"]\n\n1. d4 d5 2. Nf3 c5 3. c4 e6 4. e3 Nf6 5. Bd3 Nc6 6. O-O Bd6 7. b3 O-O 8. Bb2 b6 9. Nbd2 Bb7 10. Rc1 Qe7 11. cxd5 exd5 12. Nh4 g6 13. Nhf3 Rad8 14. dxc5 bxc5 15. Bb5 Ne4 16. Bxc6 Bxc6 17. Qc2 Nxd2 18. Nxd2 d4 19. exd4 Bxg2 20. Kxg2 Qg5+ 21. Kf1 Qxd2 22. Qxd2 Bh2 23. Rc2 cxd4 24. Qe1 d3 0-1`,
  },
  // ═══════════════════════════════════════════
  // ERA SOVIÉTICA (1945-1975)
  // ═══════════════════════════════════════════
  {
    id: 'tal-larsen-1965', name: 'Tal vs Larsen', white: 'Tal', black: 'Larsen',
    year: 1965, result: '1-0', eco: 'B82', opening: 'Sicilian Scheveningen', event: 'Candidates',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['sacrificio', 'ataque', 'candidatos'],
    pgn: `[Event "Candidates"]\n[White "Tal"]\n[Black "Larsen"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 e6 5. Nc3 d6 6. Be3 Nf6 7. f4 Be7 8. Qf3 O-O 9. O-O-O Qc7 10. Ndb5 Qb8 11. g4 a6 12. Nd4 Nxd4 13. Bxd4 b5 14. g5 Nd7 15. Bd3 b4 16. Nd5 exd5 17. exd5 f5 18. gxf6 Nxf6 19. Bxf6 Bxf6 20. Bxh7+ Kxh7 21. Qh5+ Kg8 22. Rdg1 Qe8 23. Qh7+ Kf7 24. Rg6 Qe3+ 25. Kb1 Be7 26. Rhg1 Rf6 27. Rxf6+ Bxf6 28. Qh5+ Ke7 29. Qg6 Qe1+ 30. Ka2 Qa5+ 31. Kb1 Qe1+ 32. Ka2 Qa5+ 33. Kb3 a5 34. Qf7+ Kd8 35. Qxf6+ gxf6 36. Rg8+ 1-0`,
  },
  {
    id: 'tal-botvinnik-1960-g6', name: 'Tal vs Botvinnik WCh G6', white: 'Tal', black: 'Botvinnik',
    year: 1960, result: '1-0', eco: 'E69', opening: "King's Indian", event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'ataque', 'sacrificio'],
    pgn: `[Event "World Championship"]\n[White "Tal"]\n[Black "Botvinnik"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 O-O 5. g3 d6 6. Bg2 Nbd7 7. O-O e5 8. e4 c6 9. h3 Qb6 10. d5 cxd5 11. cxd5 Nc5 12. Ne1 Bd7 13. Nd3 Nxd3 14. Qxd3 Rc8 15. Rb1 Nh5 16. Be3 Qb4 17. Qe2 Nf4 18. Bxf4 exf4 19. f3 Bxc3 20. bxc3 Qxc3 21. gxf4 Qxa1 22. Rxa1 fxe4 23. Qxe4 Rc2 24. Qe7 Bc6 25. Bf1 Rxa2 26. Rxa2 1-0`,
  },
  {
    id: 'petrosian-spassky-1966-g10', name: 'Petrosian vs Spassky WCh G10', white: 'Petrosian', black: 'Spassky',
    year: 1966, result: '1-0', eco: 'E63', opening: "King's Indian", event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'posicional', 'sacrificio'],
    pgn: `[Event "World Championship"]\n[White "Petrosian"]\n[Black "Spassky"]\n[Result "1-0"]\n\n1. Nf3 Nf6 2. g3 g6 3. c4 Bg7 4. Bg2 O-O 5. d4 d6 6. Nc3 Nbd7 7. O-O e5 8. e4 c6 9. h3 Qb6 10. Re1 exd4 11. Nxd4 Re8 12. Nc2 Nc5 13. Ne3 a5 14. b3 Nfd7 15. Bb2 a4 16. Rb1 axb3 17. axb3 Qc7 18. Nd5 cxd5 19. cxd5 Nb6 20. Bxg7 Kxg7 21. b4 Na6 22. Nd4 Bd7 23. Qb3 Rec8 24. Rec1 Qd8 25. Nc6 bxc6 26. dxc6 Bc8 27. e5 dxe5 28. c7 Qe8 29. Bd5 1-0`,
  },
  {
    id: 'spassky-fischer-1972-g1', name: 'Spassky vs Fischer WCh G1', white: 'Spassky', black: 'Fischer',
    year: 1972, result: '1-0', eco: 'E56', opening: 'Nimzo-Indian', event: 'World Championship',
    whiteElo: 2660, blackElo: 2785, era: 'soviet', tags: ['campeonato mundial', 'final'],
    pgn: `[Event "World Championship"]\n[White "Spassky"]\n[Black "Fischer"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Nc3 Bb4 5. e3 O-O 6. Bd3 c5 7. O-O Nc6 8. a3 Ba5 9. Ne2 dxc4 10. Bxc4 Bb6 11. dxc5 Qxd1 12. Rxd1 Bxc5 13. b4 Be7 14. Bb2 Bd7 15. Rac1 Rfd8 16. Ned4 Nxd4 17. Nxd4 Ba4 18. Bb3 Bxb3 19. Nxb3 Rxd1+ 20. Rxd1 Rc8 21. Kf1 Kf8 22. Ke2 Ne4 23. Rc1 Rxc1 24. Bxc1 f6 25. Na5 Nd6 26. Kd3 Bd8 27. Nc4 Bc7 28. Nxd6 Bxd6 29. b5 Bxh2 30. g3 h5 31. Ke2 h4 32. Kf3 Ke7 33. Kg2 hxg3 34. fxg3 Bxg3 35. Kxg3 Kd6 36. a4 Kd5 37. Ba3 Ke4 38. Bc5 a6 39. b6 f5 40. Kh4 f4 41. exf4 Kxf4 42. Kh5 Kf5 43. Be3 Ke4 44. Bf2 Kf5 45. Bh4 e5 46. Bg5 e4 47. Be3 Kf6 48. Kg4 Ke5 49. Kg5 Kd5 50. Kf5 a5 51. Bf2 g5 52. Kxg5 Kc4 53. Kf5 Kb4 54. Kxe4 Kxa4 55. Kd5 Kb5 56. Kd6 1-0`,
  },
  {
    id: 'bronstein-najdorf-1953', name: 'Bronstein vs Najdorf', white: 'Bronstein', black: 'Najdorf',
    year: 1953, result: '1-0', eco: 'E70', opening: "King's Indian", event: 'Zurich Candidates',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['candidatos', 'ataque', 'sacrificio'],
    pgn: `[Event "Zurich Candidates"]\n[White "Bronstein"]\n[Black "Najdorf"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. d5 Nh5 8. Qd2 Qh4+ 9. g3 Nxg3 10. Qf2 Nxf1 11. Qxh4 Nxe3 12. Ke2 Nxc4 13. Rc1 Nb6 14. Nb5 Na6 15. Nxa7 Bd7 16. Nxc8 Raxc8 17. b3 f5 18. Nh3 f4 19. Ng5 Nc5 20. Ne6 Nxe6 21. dxe6 Bc6 22. Rc3 c5 23. Rd3 d5 24. Kf2 dxe4 25. fxe4 Rd8 26. Rxd8 Rxd8 27. Rg1 Kf8 28. h4 Ke7 29. h5 gxh5 30. Rg5 Rd2+ 31. Kf3 Rxa2 32. Rxh5 1-0`,
  },
  {
    id: 'smyslov-reshevsky-1945', name: 'Smyslov vs Reshevsky', white: 'Smyslov', black: 'Reshevsky',
    year: 1945, result: '1-0', eco: 'C77', opening: 'Ruy Lopez', event: 'USSR vs USA',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['ataque', 'posicional'],
    pgn: `[Event "USSR vs USA"]\n[White "Smyslov"]\n[Black "Reshevsky"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Na5 10. Bc2 c5 11. d4 Qc7 12. Nbd2 cxd4 13. cxd4 Bd7 14. Nf1 Rac8 15. Ne3 Nc6 16. d5 Nb4 17. Bb1 a5 18. a3 Na6 19. b4 g6 20. Bd2 Nh5 21. Rc1 Qb8 22. Bb3 Nc7 23. Nd4 Bd8 24. Nc6 Bxc6 25. dxc6 axb4 26. axb4 Nf6 27. Bd5 Nxd5 28. Nxd5 Ne6 29. Qg4 Kh8 30. Bg5 f6 31. Be3 Nc7 32. Nxc7 Rxc7 33. Bd4 1-0`,
  },
  // ═══════════════════════════════════════════
  // FISCHER (1956-1972)
  // ═══════════════════════════════════════════
  {
    id: 'game-of-century-1956', name: 'Game of the Century', white: 'Byrne', black: 'Fischer',
    year: 1956, result: '0-1', eco: 'D97', opening: 'Grunfeld', event: 'New York',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['sacrificio', 'combinacion', 'brillante'],
    pgn: `[Event "New York"]\n[White "Byrne"]\n[Black "Fischer"]\n[Result "0-1"]\n\n1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4 7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 Na4 12. Qa3 Nxc3 13. bxc3 Nxe4 14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+ 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4 Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1 29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1 Ng3+ 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+ 41. Kc1 Rc2# 0-1`,
  },
  {
    id: 'fischer-spassky-1972-g6', name: 'Fischer vs Spassky WCh G6', white: 'Fischer', black: 'Spassky',
    year: 1972, result: '1-0', eco: 'D59', opening: 'QGD Tartakower', event: 'World Championship',
    whiteElo: 2785, blackElo: 2660, era: 'fischer', tags: ['campeonato mundial', 'posicional', 'brillante'],
    pgn: `[Event "World Championship"]\n[White "Fischer"]\n[Black "Spassky"]\n[Result "1-0"]\n\n1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7 17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7 22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5 27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7 32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8 37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0`,
  },
  {
    id: 'fischer-spassky-1972-g13', name: 'Fischer vs Spassky WCh G13', white: 'Fischer', black: 'Spassky',
    year: 1972, result: '1-0', eco: 'B04', opening: 'Alekhine Defense', event: 'World Championship',
    whiteElo: 2785, blackElo: 2660, era: 'fischer', tags: ['campeonato mundial', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Fischer"]\n[Black "Spassky"]\n[Result "1-0"]\n\n1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 g6 5. Bc4 Nb6 6. Bb3 Bg7 7. Nbd2 O-O 8. h3 a5 9. a4 dxe5 10. dxe5 Na6 11. O-O Nc5 12. Qe2 Qe8 13. Ne4 Nbxa4 14. Bxa4 Nxa4 15. Re1 Nb6 16. Bd2 a4 17. Bg5 h6 18. Bh4 Bf5 19. g4 Be6 20. Nd4 Bc4 21. Qd2 Qd7 22. Rad1 Rfe8 23. f4 Bd5 24. Nc5 Qc8 25. Qc3 e6 26. Kh2 Nd7 27. Nd3 c5 28. Ndxe5 Nxe5 29. Nxe5 Bxe5 30. fxe5 Qc6 31. Bxd8 Rxd8 32. Qc3 f5 33. Rf1 Kh7 34. Qf3 fxg4 35. hxg4 Rf8 36. Qh3 Rxf1 37. Rxf1 Qe8 38. Rf6 Be4 39. Qe3 Qd8 40. Rxe6 Qd2+ 41. Kh3 Bc6 42. Re7+ Kg8 43. Rc7 1-0`,
  },
  {
    id: 'fischer-najdorf-1961', name: 'Fischer vs Najdorf', white: 'Fischer', black: 'Najdorf',
    year: 1961, result: '1-0', eco: 'B90', opening: 'Sicilian Najdorf', event: 'Varna Olympiad',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['ataque', 'miniatura'],
    pgn: `[Event "Varna Olympiad"]\n[White "Fischer"]\n[Black "Najdorf"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. h3 b5 7. Nd5 Bb7 8. Nxf6+ gxf6 9. c4 bxc4 10. Bxc4 Bxe4 11. O-O d5 12. Re1 e5 13. Qa4+ Nd7 14. Rxe4 dxe4 15. Nf5 Bc5 16. Ng7+ Ke7 17. Nf5+ Ke8 18. Be3 Bxe3 19. fxe3 Qb6 20. Rd1 Ra7 21. Rd6 1-0`,
  },
  // ═══════════════════════════════════════════
  // ERA MODERNA (1975-2000)
  // ═══════════════════════════════════════════
  {
    id: 'kasparov-topalov-1999', name: 'Kasparov vs Topalov', white: 'Kasparov', black: 'Topalov',
    year: 1999, result: '1-0', eco: 'B06', opening: 'Pirc Defense', event: 'Wijk aan Zee',
    whiteElo: 2812, blackElo: 2700, era: 'modern', tags: ['sacrificio', 'ataque', 'brillante'],
    pgn: `[Event "Wijk aan Zee"]\n[White "Kasparov"]\n[Black "Topalov"]\n[Result "1-0"]\n\n1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3 b5 7. Nge2 Nbd7 8. Bh6 Bxh6 9. Qxh6 Bb7 10. a3 e5 11. O-O-O Qe7 12. Kb1 a6 13. Nc1 O-O-O 14. Nb3 exd4 15. Rxd4 c5 16. Rd1 Nb6 17. g3 Kb8 18. Na5 Ba8 19. Bh3 d5 20. Qf4+ Ka7 21. Re1 d4 22. Nd5 Nbxd5 23. exd5 Qd6 24. Rxd4 cxd4 25. Re7+ Kb6 26. Qxd4+ Kxa5 27. b4+ Ka4 28. Qc3 Qxd5 29. Ra7 Bb7 30. Rxb7 Qc4 31. Qxf6 Kxa3 32. Qxa6+ Kxb4 33. c3+ Kxc3 34. Qa1+ Kd2 35. Qb2+ Kd1 36. Bf1 Rd2 37. Rd7 Rxd7 38. Bxc4 bxc4 39. Qxh8 Rd3 40. Qa8 c3 41. Qa4+ Ke1 42. f4 f5 43. Kc1 Rd2 44. Qa7 1-0`,
  },
  {
    id: 'kasparov-karpov-1985-g16', name: 'Kasparov vs Karpov WCh G16', white: 'Kasparov', black: 'Karpov',
    year: 1985, result: '1-0', eco: 'B44', opening: 'Sicilian', event: 'World Championship',
    whiteElo: 2715, blackElo: 2720, era: 'modern', tags: ['campeonato mundial', 'táctico'],
    pgn: `[Event "World Championship"]\n[White "Kasparov"]\n[Black "Karpov"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5 d6 6. c4 Nf6 7. N1c3 a6 8. Na3 d5 9. cxd5 exd5 10. exd5 Nb4 11. Be2 Bc5 12. O-O O-O 13. Bf3 Bf5 14. Bg5 Re8 15. Qd2 b5 16. Rad1 Nd3 17. Nab1 h6 18. Bh4 b4 19. Na4 Bd6 20. Bg3 Rc8 21. b3 g5 22. Bxd6 Qxd6 23. g3 Nd7 24. Bg2 Qf6 25. a3 a5 26. axb4 axb4 27. Qa2 Bg6 28. d6 g4 29. Qd2 Kg7 30. f3 Qxd6 31. fxg4 Qd4+ 32. Kh1 Nf6 33. Rf4 Ne4 34. Qxd3 Nf2+ 35. Rxf2 Bxd3 36. Rfd2 Qe3 37. Rxd3 Rc1 38. Nb2 Qf2 39. Nd2 Rxd1+ 40. Nxd1 Re1+ 1-0`,
  },
  {
    id: 'karpov-kasparov-1985-g9', name: 'Karpov vs Kasparov WCh G9', white: 'Karpov', black: 'Kasparov',
    year: 1985, result: '0-1', eco: 'D55', opening: 'QGD', event: 'World Championship',
    whiteElo: 2720, blackElo: 2715, era: 'modern', tags: ['campeonato mundial', 'táctico'],
    pgn: `[Event "World Championship"]\n[White "Karpov"]\n[Black "Kasparov"]\n[Result "0-1"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 c5 8. Ne2 Nc6 9. Be3 O-O 10. O-O Bg4 11. f3 Na5 12. Bxf7+ Rxf7 13. fxg4 Rxf1+ 14. Kxf1 Qd6 15. Kg1 Qe6 16. Qd3 Qxg4 17. d5 Rd8 18. Rd1 Nc4 19. Bc1 c4 20. Qf3 Qxf3 21. gxf3 Bxc3 22. Ng3 Bd4+ 23. Kf1 e5 24. dxe6 Rxd1+ 25. Ke2 Rd2+ 26. Ke1 Rxa2 27. e7 Nd2 0-1`,
  },
  {
    id: 'kasparov-deep-blue-1996-g1', name: 'Kasparov vs Deep Blue G1', white: 'Kasparov', black: 'Deep Blue',
    year: 1996, result: '1-0', eco: 'B22', opening: 'Sicilian Alapin', event: 'Philadelphia',
    whiteElo: 2795, blackElo: null, era: 'modern', tags: ['computadora', 'ataque'],
    pgn: `[Event "Philadelphia"]\n[White "Kasparov"]\n[Black "Deep Blue"]\n[Result "1-0"]\n\n1. e4 c5 2. c3 d5 3. exd5 Qxd5 4. d4 Nf6 5. Nf3 Bg4 6. Be2 e6 7. h3 Bh5 8. O-O Nc6 9. Be3 cxd4 10. cxd4 Bb4 11. a3 Ba5 12. Nc3 Qd6 13. Nb5 Qe7 14. Ne5 Bxe2 15. Qxe2 O-O 16. Rac1 Rac8 17. Bg5 Bb6 18. Bxf6 gxf6 19. Nc4 Rfd8 20. Nxb6 axb6 21. Rfd1 f5 22. Qe3 Qf6 23. d5 Rxd5 24. Rxd5 exd5 25. b3 Kh8 26. Qxb6 Rg8 27. Qc5 d4 28. Nd6 f4 29. Nxb7 Ne5 30. Qd5 f3 31. g3 Nd3 32. Rc7 Re8 33. Nd6 Re1+ 34. Kh2 Nxf2 35. Nxf7+ Kg7 36. Ng5+ Kh6 37. Rxh7+ 1-0`,
  },
  {
    id: 'shirov-topalov-1998', name: 'Shirov vs Topalov', white: 'Shirov', black: 'Topalov',
    year: 1998, result: '1-0', eco: 'D85', opening: 'Grunfeld', event: 'Linares',
    whiteElo: 2710, blackElo: 2740, era: 'modern', tags: ['sacrificio', 'final', 'brillante'],
    pgn: `[Event "Linares"]\n[White "Shirov"]\n[Black "Topalov"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Rb1 O-O 9. Be2 cxd4 10. cxd4 Qa5+ 11. Bd2 Qxa2 12. O-O Bg4 13. Bg5 h6 14. Bh4 Nc6 15. d5 Na5 16. Bc4 Qa4 17. Bd3 Bxf3 18. gxf3 Nxd5 19. e5 Bxe5 20. Bxe7 Nxe7 21. Qd2 Bf6 22. Bxg6 fxg6 23. Qxh6 Qf4 24. Qxg6+ Qg5+ 25. Qxg5+ Bxg5 26. Rb5 Bf6 27. Rd5 Rfe8 28. Rd7 Nd5 29. Rxb7 Re2 30. Rxa7 Rxa7 31. Rb1 Kf8 32. Rb8+ Ke7 33. Rb7+ Ke6 34. Rxa7 Nc3 35. Ra6+ Ke5 36. Ra5+ Kd4 37. Ra4+ Kc5 38. Rf4 Bd8 39. h4 Nd5 40. Rg4 Nb6 41. f4 Re6 42. f5 Rf6 43. Rg6 Rxf5 44. Rg8 Bf6 45. Rc8+ 1-0`,
  },
  {
    id: 'anand-kasparov-1995', name: 'Anand vs Kasparov WCh G10', white: 'Anand', black: 'Kasparov',
    year: 1995, result: '1-0', eco: 'B90', opening: 'Sicilian Najdorf', event: 'World Championship',
    whiteElo: 2725, blackElo: 2795, era: 'modern', tags: ['campeonato mundial', 'ataque'],
    pgn: `[Event "World Championship"]\n[White "Anand"]\n[Black "Kasparov"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2 e5 7. Nb3 Be7 8. O-O O-O 9. Kh1 Bd7 10. Be3 Bc6 11. Bf3 Nbd7 12. a4 b6 13. Qd2 Bb7 14. Qe2 Rc8 15. Rfd1 Qc7 16. Rd2 Qb8 17. Rad1 Nc5 18. Nxc5 bxc5 19. Bg5 Be7 20. Nd5 Nxd5 21. Bxe7 Nf4 22. Qe3 Rfe8 23. Bxb7 Qxb7 24. Bd6 Ne6 25. Qg3 f6 26. c4 Kh8 27. Rd5 Nd4 28. Qd3 Re6 29. b3 Rf8 30. Qg3 Ne2 31. Qg4 Nd4 32. R5xd4 cxd4 33. Qxe6 Qc7 34. Qd5 Qc6 35. Qxd4 Qxc4 36. Qxc4 Rc8 37. Qd5 Rc2 38. h3 Ra2 39. Rd4 1-0`,
  },
  {
    id: 'kramnik-kasparov-2000-g2', name: 'Kramnik vs Kasparov WCh G2', white: 'Kramnik', black: 'Kasparov',
    year: 2000, result: '1-0', eco: 'D27', opening: 'QGA', event: 'World Championship',
    whiteElo: 2770, blackElo: 2849, era: 'modern', tags: ['campeonato mundial', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Kramnik"]\n[Black "Kasparov"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 dxc4 3. Nf3 e6 4. e3 c5 5. Bxc4 a6 6. O-O Nf6 7. Bb3 cxd4 8. exd4 Nc6 9. Nc3 Be7 10. Re1 O-O 11. Bf4 Na5 12. d5 Nxb3 13. Qxb3 exd5 14. Rad1 Be6 15. Bg5 Bxb3 16. Bxd8 Bxa2 17. Bxe7 Rfe8 18. Ba3 Bb1 19. Nxd5 Nxd5 20. Rxd5 Bxf5 21. Rxf5 Rxe1+ 22. Nxe1 Rc8 23. Bd6 b5 24. f3 b4 25. Kf2 a5 26. Nd3 a4 27. Ra5 Ra8 28. Nb2 a3 29. Nc4 Rc8 30. Nb6 Rc3 31. Nd5 Rc2+ 32. Ke3 Rxg2 33. Ra7 f6 34. Nxb4 Rxb2 35. Rxg7+ 1-0`,
  },
  {
    id: 'ivanchuk-kasparov-1991', name: 'Ivanchuk vs Kasparov', white: 'Ivanchuk', black: 'Kasparov',
    year: 1991, result: '1-0', eco: 'E87', opening: "King's Indian", event: 'Linares',
    whiteElo: 2735, blackElo: 2800, era: 'modern', tags: ['ataque', 'táctico'],
    pgn: `[Event "Linares"]\n[White "Ivanchuk"]\n[Black "Kasparov"]\n[Result "1-0"]\n\n1. c4 g6 2. d4 Bg7 3. Nc3 d6 4. e4 Nf6 5. f3 O-O 6. Be3 e5 7. d5 Nh5 8. Qd2 Qh4+ 9. g3 Nxg3 10. Qf2 Nxf1 11. Qxh4 Nxe3 12. Ke2 Nxc4 13. Rc1 Nb6 14. Nb5 Na6 15. Nxa7 Bd7 16. Nxc8 Rfxc8 17. b3 c6 18. Nh3 cxd5 19. exd5 f5 20. Nf2 e4 21. f4 Nc5 22. Qg3 Kh8 23. Nd1 e3 24. Rxc5 dxc5 25. Nxe3 Nd7 26. Qf3 Ne5 27. Qe2 c4 28. bxc4 Rac8 29. Rc1 Rc5 30. Kd1 Nc6 31. Qd3 Nb4 32. Qd2 Rcc8 33. a3 Na2 34. Rc2 Nc3+ 35. Ke1 Bf6 36. Qc1 Na2 37. Qd2 Nc3 38. Kf2 Na2 39. Kg2 Nc3 40. Qe1 Na4 41. Qd1 Bc3 42. Nf1 Bf6 43. Qe2 Nc3 44. Qf3 Nb1 45. Ne3 Kg7 46. Rb2 Nxa3 47. Rb7+ Kg8 48. Ng2 Re8 49. Nf4 Re1 50. Nh5 Rg1+ 51. Kh3 Nc2 52. d6 Nd4 53. Qd5+ Kh8 54. d7 1-0`,
  },
  // ═══════════════════════════════════════════
  // ERA CONTEMPORÁNEA (2000+)
  // ═══════════════════════════════════════════
  {
    id: 'carlsen-anand-2013-g6', name: 'Carlsen vs Anand WCh G6', white: 'Carlsen', black: 'Anand',
    year: 2013, result: '1-0', eco: 'C65', opening: 'Ruy Lopez Berlin', event: 'World Championship',
    whiteElo: 2870, blackElo: 2775, era: 'contemporary', tags: ['campeonato mundial', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Carlsen"]\n[Black "Anand"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Bc5 5. O-O d6 6. Re1 O-O 7. Bxc6 bxc6 8. h3 Re8 9. Nbd2 Nd7 10. Nc4 Bb6 11. a4 a5 12. Nxb6 cxb6 13. d4 f6 14. Be3 Bb7 15. c4 Re7 16. Rc1 Qf8 17. d5 c5 18. b4 axb4 19. a5 bxa5 20. Nh2 Bc8 21. Nf1 Bd7 22. Ng3 g6 23. Bd2 Ra6 24. Qf3 Qg7 25. Be3 Kh8 26. Nf1 Nf8 27. Nd2 Ne6 28. Nb3 Kg8 29. Re2 Nf4 30. Bxf4 exf4 31. e5 fxe5 32. Rxe5 Rxe5 33. Qxf4 Rf5 34. Qd2 Rf6 35. Qxa5 Qa7 36. Qc3 Qb7 37. Nd2 Bf5 38. Ne4 Rf7 39. Rb1 Bxe4 40. Qxe4 b3 41. Rxb3 Ra1+ 42. Kh2 Qa6 43. Rb6 Qa7 44. Rb3 Ra2 45. f3 Qa4 46. Rb4 Qa6 47. Qe2 Qc6 48. Rb6 Qd7 49. Qd3 Ra5 50. Qd1 Ra2 51. Qb1 Ra5 52. g4 g5 53. Qb4 Ra1 54. Rb8+ Kg7 55. Rb7 Rf8 56. Qd2 Ra7 57. Rxa7 Qxa7 58. Qxg5+ Kh8 59. Qe5+ Kg8 60. g5 Qb7 61. g6 1-0`,
  },
  {
    id: 'aronian-carlsen-2008', name: 'Aronian vs Carlsen', white: 'Aronian', black: 'Carlsen',
    year: 2008, result: '0-1', eco: 'D37', opening: 'QGD', event: 'Wijk aan Zee',
    whiteElo: 2739, blackElo: 2733, era: 'contemporary', tags: ['táctico', 'ataque'],
    pgn: `[Event "Wijk aan Zee"]\n[White "Aronian"]\n[Black "Carlsen"]\n[Result "0-1"]\n\n1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. Bg5 h6 6. Bh4 dxc4 7. e4 g5 8. Bg3 b5 9. Be2 Bb7 10. O-O Nbd7 11. Ne5 Bg7 12. Nxd7 Nxd7 13. Bd6 a6 14. a4 e5 15. d5 Qf6 16. dxc6 Bxc6 17. axb5 axb5 18. Rxa8+ Bxa8 19. Nxb5 O-O 20. Nc7 Bc6 21. Nd5 Bxd5 22. exd5 Qd4 23. d6 e4 24. Bg4 Ne5 25. Be6 fxe6 26. Qd1 Rf6 27. d7 Nxd7 28. Bc7 Qf2+ 29. Kh1 Qe3 30. Qa4 Nc5 31. Qa8+ Kh7 32. Qa2 Bd4 33. Qe2 Qd3 34. Qxd3 exd3 35. Rd1 Rf3 36. Be5 Bxe5 37. Rxd3 Rxf2 38. Re3 Bf4 39. Re7+ Kg6 40. b3 cxb3 41. Rb7 Nd3 42. h3 Be5 0-1`,
  },
  {
    id: 'carlsen-caruana-2018-g6', name: 'Carlsen vs Caruana WCh G6', white: 'Carlsen', black: 'Caruana',
    year: 2018, result: '1/2-1/2', eco: 'B33', opening: 'Sicilian Sveshnikov', event: 'World Championship',
    whiteElo: 2835, blackElo: 2832, era: 'contemporary', tags: ['campeonato mundial', 'táctico'],
    pgn: `[Event "World Championship"]\n[White "Carlsen"]\n[Black "Caruana"]\n[Result "1/2-1/2"]\n\n1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Nd5 Nxd5 8. exd5 Nb8 9. a4 Be7 10. Be2 O-O 11. O-O Nd7 12. b4 a6 13. Na3 a5 14. bxa5 Rxa5 15. Nc4 Ra8 16. Be3 f5 17. a5 f4 18. Bb6 Qe8 19. Ra3 Qg6 20. Bc7 e4 21. Kh1 b5 22. Nb6 Nxb6 23. Bxb6 Qg5 24. g3 Bh3 25. Rg1 f3 26. Bf1 Bxf1 27. Rxf1 Bg5 28. a6 Qd2 29. Ra1 Qxc2 30. a7 Qb3 31. Bc7 Qb7 32. Bxd6 Ra8 33. Qb1 Qxb1 34. Raxb1 b4 35. Be5 Bf6 36. d6 Bxe5 37. d7 Bd4 38. Rb3 Ra6 39. gxf4 Rd6 40. Rg1 Kf7 41. Rg4 e3 42. fxe3 Bxe3 43. Rxb4 Rxd7 44. Re4 Bd2 45. Re2 Bc3 46. Rf2+ Ke6 47. Kh2 Kd6 48. Rc4 Bd4 49. Ra2 Rf6 50. Rd2 Ke6 51. Ra2 Kd5 52. Ra5+ Ke4 53. Rc1 Rf5 54. Rb1 Kxf4 55. Rb4 Kf3 56. Rb3+ Ke4 57. Rb4 Ke3 58. Ra3+ Kd2 59. Ra2+ Kd1 60. Rb1+ Bc1 61. Ra1 Rd5 62. Rxc1+ Kxc1 63. Rxf5 Rxf5 64. h4 h5 65. Kg3 Kd2 66. Kf4 Rc5 67. Ke4 Ke2 68. Kf4 Kf2 69. Ke4 Rc4+ 70. Ke5 Kg3 71. Kf5 Re4 72. Kg5 Re5+ 73. Kf6 Kxh4 74. Kxg7 Kg5 75. Kf7 h4 76. Kg7 h3 77. Kf7 h2 78. Kg7 h1=Q 79. Kf7 Qf3+ 80. Kg7 Re7+ 1/2-1/2`,
  },
  {
    id: 'ding-nepomniachtchi-2023-g12', name: 'Ding vs Nepo WCh G12', white: 'Ding Liren', black: 'Nepomniachtchi',
    year: 2023, result: '1-0', eco: 'D17', opening: 'Slav', event: 'World Championship',
    whiteElo: 2788, blackElo: 2795, era: 'contemporary', tags: ['campeonato mundial', 'táctico'],
    pgn: `[Event "World Championship"]\n[White "Ding Liren"]\n[Black "Nepomniachtchi"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 e6 6. e3 c5 7. Bxc4 cxd4 8. exd4 Be7 9. O-O O-O 10. Be3 Nc6 11. Qd3 Nb4 12. Qe2 b6 13. Rfd1 Bb7 14. Rac1 Rc8 15. Ne5 Nbd5 16. Bd2 Nd7 17. Nxd7 Qxd7 18. Bg5 Bxg5 19. Nxd5 Bxd5 20. Bxd5 exd5 21. Rxc8 Rxc8 22. Qd3 Be7 23. h3 Qd6 24. Rc1 Rxc1+ 25. Qxc1 g6 26. Qc8+ Kg7 27. Qb7 Qd8 28. a5 bxa5 29. Qa6 Qb8 30. Qxa5 Qb1+ 31. Kh2 Qb7 32. Qd2 Qb5 33. g4 a5 34. Qa2 Qb6 35. Qd2 Qe6 36. Kg3 h5 37. Qa2 hxg4 38. hxg4 Qb6 39. Qxd5 Qxb2 40. Qxa5 Qb3+ 41. f3 Bd8 42. Qa8 Qd3 43. Qe4 Qd2 44. d5 Bb6 45. Qe5+ Kh7 46. Qf4 Qd3 47. Kf2 Bd4+ 48. Ke1 Qb1+ 49. Kd2 Qa2+ 50. Kc1 Qa1+ 51. Kd2 Qa2+ 52. Ke1 Qb1+ 53. Kf2 Qc2+ 54. Kg3 Qd3 55. Qf6 Qe3 56. g5 Kg8 57. d6 Qd3 58. Qe6+ Kh8 59. Qe8+ Kg7 60. d7 1-0`,
  },
  {
    id: 'nakamura-carlsen-2010', name: 'Nakamura vs Carlsen', white: 'Nakamura', black: 'Carlsen',
    year: 2010, result: '1-0', eco: 'E97', opening: "King's Indian", event: 'London Classic',
    whiteElo: 2741, blackElo: 2802, era: 'contemporary', tags: ['ataque', 'brillante'],
    pgn: `[Event "London Classic"]\n[White "Nakamura"]\n[Black "Carlsen"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. b4 Nh5 10. Re1 f5 11. Ng5 Nf6 12. f3 f4 13. b5 h6 14. Ne6 Bxe6 15. dxe6 d5 16. Nb1 Nxe4 17. fxe4 dxc4 18. Be3 Qxd1 19. Rxd1 fxe3 20. Bc4 Nd5 21. Nc3 c6 22. bxc6 bxc6 23. Nxd5 cxd5 24. Rxd5 Rad8 25. Rad1 Rxd5 26. Rxd5 Bf6 27. Kf1 Kf8 28. Ra5 Rb8 29. Rxa7 Rb1+ 30. Ke2 Rb2+ 31. Kd3 Rxg2 32. Bxe3 Be7 33. Bd5 Rxh2 34. Ra8+ Kf8 35. Bxc4 Rh3+ 36. Ke4 Bb4 37. Bb5 h5 38. Ra7 Rh1 39. Rc7 Re1+ 40. Kf5 Rd1 41. Ke6 Rd6+ 42. Kf5 Rd5 43. Rc8+ Kg7 44. Ke6 Rxb5 45. Kf7 Rf5+ 46. Ke8 1-0`,
  },
  {
    id: 'firouzja-carlsen-2022', name: 'Firouzja vs Carlsen', white: 'Firouzja', black: 'Carlsen',
    year: 2022, result: '0-1', eco: 'C48', opening: 'Four Knights', event: 'Candidates',
    whiteElo: 2793, blackElo: 2864, era: 'contemporary', tags: ['candidatos', 'posicional'],
    pgn: `[Event "Candidates"]\n[White "Firouzja"]\n[Black "Carlsen"]\n[Result "0-1"]\n\n1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Nd4 5. Ba4 Bc5 6. Nxe5 O-O 7. Nd3 Bb6 8. e5 Ne8 9. Nd5 d6 10. Nxb6 axb6 11. exd6 Nxd6 12. O-O Bg4 13. Qe1 Nf5 14. f3 Bd7 15. Bb3 Nd4 16. Qf2 Nxb3 17. axb3 Qh4 18. Qxh4 Nxh4 19. Nf4 Bc6 20. Nd5 Nf5 21. d3 Nd4 22. Ra4 Rfe8 23. Bd2 Re6 24. Nf4 Rd6 25. Bc3 Ne2+ 26. Nxe2 Bxf3 27. Rf2 Bxe2 28. Rxe2 Rad8 29. Kf2 Rd5 30. Ke3 c5 31. Ra1 R8d7 32. Rf1 Kf8 33. Rff2 Ke7 34. Ra2 b5 35. Rf1 f6 36. Ra1 Rd4 37. Ke2 Kd6 38. Rf1 Ke6 39. Ke3 R4d5 40. Ra1 g5 41. Ra6 Rd4 42. Ke2 f5 43. Ra1 R7d5 44. Rf1 Rd7 45. Ra1 b4 46. Bd2 f4 47. Be1 Kf5 48. Ra5 Ke6 49. Ra6+ Kf5 50. Ra5 R7d5 0-1`,
  },
  {
    id: 'gukesh-ding-2024', name: 'Gukesh vs Ding Liren WCh G14', white: 'Gukesh', black: 'Ding Liren',
    year: 2024, result: '1-0', eco: 'D27', opening: 'QGA', event: 'World Championship',
    whiteElo: 2783, blackElo: 2764, era: 'contemporary', tags: ['campeonato mundial', 'táctico'],
    pgn: `[Event "World Championship"]\n[White "Gukesh"]\n[Black "Ding Liren"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Bb3 b5 8. a4 b4 9. Nbd2 Bb7 10. a5 Nc6 11. Nc4 cxd4 12. Qxd4 Qxd4 13. Nxd4 Nxa5 14. Nxa5 Bxa5 15. Bd2 Bb6 16. Nxe6 fxe6 17. Bxe6 Ke7 18. Bc4 Rhd8 19. Rfd1 Rac8 20. Be1 Ne4 21. Bb3 Rxd1 22. Rxd1 Bc7 23. g3 Kf6 24. Rd7 Bb8 25. Bd5 Bc6 26. Bxe4 Bxd7 27. Bxc6 Ba4 28. Bxa4 Rxc6 29. Bb3 Bd6 30. Kf1 Be5 31. Ke2 Rc1 32. Bd4 Bxd4 33. exd4 Rg1 34. Kf3 Rb1 35. Bd5 a5 36. Ke4 g5 37. h3 Rb2 38. d5 Rxf2 39. d6 Ke6 40. Bc4+ Kd7 41. d3 a4 42. Kd5 Rf1 43. Be6+ Kc8 44. Kc6 Rf6 45. d7+ Kd8 46. Bd5 Rf1 47. Be6 Rf6 48. Kd6 Rf2 49. Bd5 Rf6+ 50. Be6 Rf2 51. Ke5 Re2+ 52. Kf6 Rf2+ 53. Bf5 g4 54. Ke6 gxh3 55. d8=Q+ 1-0`,
  },
  // ═══════════════════════════════════════════
  // PARTIDAS INSTRUCTIVAS
  // ═══════════════════════════════════════════
  {
    id: 'sicilian-najdorf-model', name: 'Siciliana Najdorf modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'B90', opening: 'Sicilian Najdorf', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'siciliana'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 Qc7 9. O-O-O Nbd7 10. g4 b5 11. Bxf6 Nxf6 12. g5 Nd7 13. f5 Nc5 14. f6 gxf6 15. gxf6 Bf8 *`,
  },
  {
    id: 'fried-liver', name: 'Fried Liver Attack', white: 'White', black: 'Black',
    year: null, result: '1-0', eco: 'C57', opening: 'Two Knights Fried Liver', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'miniatura', 'táctico'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3 Nb4 9. a3 Nxc2+ 10. Kd1 Nxa1 11. Nxd5 Kd6 12. d4 Be6 13. dxe5+ Kd7 14. Bf4 Qf6 15. Bxe6+ Kc6 16. Rc1+ Kb6 17. e6+ Ka6 18. Qa8# 1-0`,
  },
  {
    id: 'scholars-mate', name: 'Mate Pastor', white: 'White', black: 'Black',
    year: null, result: '1-0', eco: 'C20', opening: "Scholar's Mate", event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'miniatura'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "1-0"]\n\n1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7# 1-0`,
  },
  {
    id: 'ruy-lopez-exchange-model', name: 'Ruy Lopez Exchange modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'C68', opening: 'Ruy Lopez Exchange', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'final', 'posicional'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O f6 6. d4 exd4 7. Nxd4 c5 8. Nb3 Qxd1 9. Rxd1 Bg4 10. f3 Be6 11. Nc3 Bd6 12. Be3 b6 13. a4 Ne7 14. Nd2 O-O *`,
  },
  {
    id: 'queens-gambit-declined-model', name: 'Gambito Dama Declinado modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'D37', opening: 'QGD', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'posicional'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Be7 5. Bf4 O-O 6. e3 Nbd7 7. c5 c6 8. Bd3 b6 9. b4 a5 10. a3 Ba6 11. Bxa6 Rxa6 12. O-O Qa8 13. Qb3 Ne4 *`,
  },
  {
    id: 'kings-indian-model', name: 'India de Rey modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'E97', opening: "King's Indian", event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'ataque'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. f3 f5 11. Be3 f4 12. Bf2 g5 13. Nd3 Ng6 14. c5 Nf6 15. Rc1 Rf7 *`,
  },
  {
    id: 'french-defense-model', name: 'Defensa Francesa modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'C11', opening: 'French Defense', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'posicional'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. Nf3 Nc6 7. Be3 cxd4 8. Nxd4 Bc5 9. Qd2 O-O 10. O-O-O a6 11. h4 Nxd4 12. Bxd4 b5 *`,
  },
  {
    id: 'caro-kann-model', name: 'Caro-Kann modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'B12', opening: 'Caro-Kann', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'posicional'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nf3 e6 5. Be2 c5 6. Be3 Nd7 7. O-O Ne7 8. c4 dxc4 9. Bxc4 cxd4 10. Nxd4 Bg6 11. Nc3 Nc5 12. f4 a6 *`,
  },
  {
    id: 'italian-game-model', name: 'Giuoco Piano modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'C54', opening: 'Italian Game', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'posicional'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5 10. Qb3 Na5 11. Qa4+ Nc6 12. Qb3 Na5 13. Qa4+ Nc6 *`,
  },
  {
    id: 'english-opening-model', name: 'Inglesa modelo', white: 'White', black: 'Black',
    year: null, result: '*', eco: 'A20', opening: 'English Opening', event: 'Example',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['apertura', 'posicional'],
    pgn: `[Event "Example"]\n[White "White"]\n[Black "Black"]\n[Result "*"]\n\n1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3 d5 5. cxd5 Nxd5 6. Bg2 Nb6 7. O-O Be7 8. d3 O-O 9. a3 Be6 10. b4 f6 11. Bb2 a5 12. b5 Nd4 *`,
  },
  {
    id: 'lucena-position', name: 'Posición Lucena', white: 'White', black: 'Black',
    year: null, result: '1-0', eco: null, opening: 'Rook Endgame', event: 'Study',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['final', 'torres', 'tecnico'],
    pgn: `[Event "Study"]\n[White "White"]\n[Black "Black"]\n[Result "1-0"]\n[FEN "1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1"]\n\n1. Rd1+ Ke7 2. Rd4 Rb2 3. Kc7 Rc2+ 4. Kb6 Rb2+ 5. Kc6 Rc2+ 6. Kb5 Rb2+ 7. Rb4 Rxb4+ 8. Kxb4 Kd7 9. Kc5 Kc7 10. b8=Q+ 1-0`,
  },
  {
    id: 'philidor-position', name: 'Posición Philidor', white: 'White', black: 'Black',
    year: null, result: '1/2-1/2', eco: null, opening: 'Rook Endgame', event: 'Study',
    whiteElo: null, blackElo: null, era: 'instructive', tags: ['final', 'torres', 'defensa'],
    pgn: `[Event "Study"]\n[White "White"]\n[Black "Black"]\n[Result "1/2-1/2"]\n[FEN "4k3/8/4KP2/8/8/8/8/r4R2 b - - 0 1"]\n\n1... Ra6+ 2. Ke5 Ra5+ 3. Ke4 Ra4+ 4. Ke3 Ra3+ 5. Kd4 Ra4+ 6. Kc5 Ra5+ 7. Kb6 Ra1 8. f7 Rf1 9. Kg7 Rg1+ 10. Kf8 Rf1 1/2-1/2`,
  },
]

export const sampleGames = [
  ..._curated,
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
]

// ═══════════════════════════════════════════
// Filter helper constants
// ═══════════════════════════════════════════

export const ERAS = [
  { id: 'romantic', name: 'Romántica (1850-1900)' },
  { id: 'classical', name: 'Clásica (1900-1930)' },
  { id: 'soviet', name: 'Soviética (1945-1975)' },
  { id: 'fischer', name: 'Fischer (1956-1972)' },
  { id: 'modern', name: 'Moderna (1975-2000)' },
  { id: 'contemporary', name: 'Contemporánea (2000+)' },
  { id: 'instructive', name: 'Instructivas' },
]

export const ECO_GROUPS = [
  { id: 'A', name: 'Flancos (A00-A99)' },
  { id: 'B', name: 'Semi-abiertas (B00-B99)' },
  { id: 'C', name: 'Abiertas (C00-C99)' },
  { id: 'D', name: 'Cerradas (D00-D99)' },
  { id: 'E', name: 'Indias (E00-E99)' },
]

export const batch1 = [
  // ═══════════════════════════════════════════
  // ERA ROMÁNTICA (1850-1900) — 6 games
  // ═══════════════════════════════════════════
  {
    id: 'morphy-consultants-1858', name: 'Morphy vs Consultants', white: 'Morphy', black: 'Consultants',
    year: 1858, result: '1-0', eco: 'C51', opening: 'Italian Game Evans Gambit', event: 'Paris',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['sacrificio', 'ataque', 'miniatura'],
    pgn: `[Event "Paris"]\n[White "Morphy"]\n[Black "Consultants"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Bb6 8. cxd4 d6 9. d5 Ne5 10. Nxe5 dxe5 11. Ba3 Be6 12. Bb5+ Bc5 13. Qa4+ Qd7 14. Qxd7+ Kxd7 15. Bxc5 Bxd5 16. exd5 Re8 17. d6 cxd6 18. Bxd6 Kxd6 19. Rd1+ Ke6 20. Nc3 Nf6 21. Nd5 Nxd5 22. Rxd5 f6 23. Rad1 Rac8 24. Rd6+ Kf7 25. R1d5 Re6 26. Rxe6 Kxe6 27. Rxe5+ Kd6 28. Re7 1-0`,
  },
  {
    id: 'schulten-morphy-1857', name: 'Schulten vs Morphy', white: 'Schulten', black: 'Morphy',
    year: 1857, result: '0-1', eco: 'C31', opening: "King's Gambit Declined", event: 'New York casual',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['ataque', 'miniatura', 'brillante'],
    pgn: `[Event "New York casual"]\n[White "Schulten"]\n[Black "Morphy"]\n[Result "0-1"]\n\n1. e4 e5 2. f4 d5 3. exd5 e4 4. Nc3 Nf6 5. d3 Bb4 6. Bd2 e3 7. Bxe3 O-O 8. Bd2 Bxc3 9. bxc3 Re8+ 10. Be2 Bg4 11. c4 c6 12. dxc6 Nxc6 13. Kf1 Rxe2 14. Nxe2 Nd4 15. Qa4 Bxe2+ 16. Kf2 Ng4+ 17. Kg1 Nf3+ 18. gxf3 Qd4+ 19. Kg2 Qf2+ 20. Kh3 Qxf3+ 21. Kh4 Nh2 22. Qxe2 Qxe2 0-1`,
  },
  {
    id: 'bird-morphy-1858', name: 'Bird vs Morphy', white: 'Bird', black: 'Morphy',
    year: 1858, result: '0-1', eco: 'C41', opening: 'Philidor Defense', event: 'London',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['sacrificio', 'ataque', 'brillante'],
    pgn: `[Event "London"]\n[White "Bird"]\n[Black "Morphy"]\n[Result "0-1"]\n\n1. e4 e5 2. Nf3 d6 3. d4 f5 4. Nc3 fxe4 5. Nxe4 d5 6. Ng3 e4 7. Ne5 Nf6 8. Bg5 Bd6 9. Nh5 O-O 10. Qd2 Qe8 11. g4 Nxg4 12. Nxg4 Qxh5 13. Ne5 Bxe5 14. dxe5 Nc6 15. f4 d4 16. Bc4+ Kh8 17. O-O-O Bg4 18. Be2 Bxe2 19. Qxe2 Qxe2 0-1`,
  },
  {
    id: 'steinitz-bardeleben-1895', name: 'Steinitz vs Von Bardeleben', white: 'Steinitz', black: 'Von Bardeleben',
    year: 1895, result: '1-0', eco: 'C54', opening: 'Italian Game Giuoco Piano', event: 'Hastings',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['sacrificio', 'ataque', 'brillante'],
    pgn: `[Event "Hastings"]\n[White "Steinitz"]\n[Black "Von Bardeleben"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 d5 8. exd5 Nxd5 9. O-O Be6 10. Bg5 Be7 11. Bxd5 Bxd5 12. Nxd5 Qxd5 13. Bxe7 Nxe7 14. Re1 f6 15. Qe2 Qd7 16. Rac1 c6 17. d5 cxd5 18. Nd4 Kf7 19. Ne6 Rhc8 20. Qg4 g6 21. Ng5+ Ke8 22. Rxe7+ Kf8 23. Rf7+ Kg8 24. Rg7+ Kh8 25. Rxh7+ 1-0`,
  },
  {
    id: 'charousek-wollner-1893', name: 'Charousek vs Wollner', white: 'Charousek', black: 'Wollner',
    year: 1893, result: '1-0', eco: 'C21', opening: 'Danish Gambit', event: 'Budapest',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['gambito', 'ataque', 'miniatura'],
    pgn: `[Event "Budapest"]\n[White "Charousek"]\n[Black "Wollner"]\n[Result "1-0"]\n\n1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 d6 6. Nf3 Nc6 7. O-O Be7 8. Nc3 Na5 9. Bd3 Bg4 10. Nd5 Bxf3 11. Qxf3 c6 12. Nxe7 Qxe7 13. Rae1 Nf6 14. e5 dxe5 15. Bxe5 O-O 16. Bc4 Nxc4 17. Bxf6 gxf6 18. Qg3+ Kh8 19. Re4 Nd6 20. Rh4 f5 21. Qg5 f6 22. Qxf5 Qe2 23. Qxh7+ 1-0`,
  },
  {
    id: 'zukertort-blackburne-1883', name: 'Zukertort vs Blackburne', white: 'Zukertort', black: 'Blackburne',
    year: 1883, result: '1-0', eco: 'A13', opening: 'English Opening', event: 'London',
    whiteElo: null, blackElo: null, era: 'romantic', tags: ['sacrificio', 'ataque', 'brillante'],
    pgn: `[Event "London"]\n[White "Zukertort"]\n[Black "Blackburne"]\n[Result "1-0"]\n\n1. c4 e6 2. e3 Nf6 3. Nf3 b6 4. Be2 Bb7 5. O-O d5 6. d4 Bd6 7. Nc3 O-O 8. b3 Nbd7 9. Bb2 Qe7 10. Nb5 Ne4 11. Nxd6 cxd6 12. Nd2 Ndf6 13. f3 Nxd2 14. Qxd2 dxc4 15. Bxc4 d5 16. Bd3 Rfc8 17. Rae1 Rc7 18. e4 Rac8 19. e5 Ne8 20. f4 g6 21. Re3 f5 22. exf6 Nxf6 23. f5 Ne4 24. Bxe4 dxe4 25. fxg6 Rc2 26. gxh7+ Kh8 27. d5+ e5 28. Qb4 R8c5 29. Rf8+ Kxh7 30. Qxe4+ Kg7 31. Bxe5+ Kxf8 32. Bg7+ Kg8 33. Qxe7 1-0`,
  },

  // ═══════════════════════════════════════════
  // ERA CLÁSICA (1900-1930) — 19 games
  // ═══════════════════════════════════════════
  {
    id: 'alekhine-bogoljubov-1922', name: 'Alekhine vs Bogoljubov', white: 'Alekhine', black: 'Bogoljubov',
    year: 1922, result: '1-0', eco: 'D18', opening: 'QGD Slav', event: 'Hastings',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['ataque', 'sacrificio', 'brillante'],
    pgn: `[Event "Hastings"]\n[White "Alekhine"]\n[Black "Bogoljubov"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O O-O 9. Qe2 Ne4 10. Nxe4 Bxe4 11. a5 Nd7 12. Nd2 Bg6 13. e4 e5 14. f4 exd4 15. f5 Bh5 16. Qe1 d3 17. e5 Qxa5 18. f6 g6 19. Nf3 Bg4 20. Bh6 Rfe8 21. e6 Nxf6 22. exf7+ Kh8 23. fxe8=Q+ Rxe8 24. Qf2 d2 25. Ng5 Qd8 26. Qf7 1-0`,
  },
  {
    id: 'capablanca-bernstein-1914', name: 'Capablanca vs Bernstein', white: 'Capablanca', black: 'Bernstein',
    year: 1914, result: '1-0', eco: 'D63', opening: 'QGD Orthodox', event: 'St Petersburg',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['final', 'posicional', 'tecnico'],
    pgn: `[Event "St Petersburg"]\n[White "Capablanca"]\n[Black "Bernstein"]\n[Result "1-0"]\n\n1. d4 d5 2. Nf3 Nf6 3. c4 e6 4. Nc3 Be7 5. Bg5 O-O 6. e3 Nbd7 7. Rc1 b6 8. cxd5 exd5 9. Qa4 Bb7 10. Ba6 Bxa6 11. Qxa6 c5 12. Bxf6 Nxf6 13. dxc5 bxc5 14. O-O Qb6 15. Qe2 c4 16. Rfd1 Rfd8 17. Nd4 Bb4 18. b3 Rac8 19. bxc4 dxc4 20. Rc2 Bxc3 21. Rxc3 Nd5 22. Rc2 c3 23. Rdc1 Rc5 24. Nb3 Rc6 25. Nd4 Rc7 26. Nb5 Rc5 27. Nxc3 Nxc3 28. Rxc3 Rxc3 29. Rxc3 Rd1+ 30. Kh2 1-0`,
  },
  {
    id: 'lasker-napier-1904', name: 'Lasker vs Napier', white: 'Lasker', black: 'Napier',
    year: 1904, result: '1-0', eco: 'C49', opening: 'Four Knights', event: 'Cambridge Springs',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['sacrificio', 'ataque', 'brillante'],
    pgn: `[Event "Cambridge Springs"]\n[White "Lasker"]\n[Black "Napier"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Bg5 Bxc3 8. bxc3 Ne7 9. Nh4 c6 10. Bc4 Be6 11. Bxf6 gxf6 12. Bxe6 fxe6 13. Qg4+ Kh8 14. f4 Qc7 15. f5 exf5 16. Nxf5 Nxf5 17. exf5 Qd7 18. Qh5 Qxf5 19. Rxf5 Rxf5 20. Qxf5 Rf8 21. Qe6 Kg7 22. Rf1 d5 23. Qxc6 Rf7 24. Qxd5 1-0`,
  },
  {
    id: 'marshall-lasker-1907', name: 'Marshall vs Lasker', white: 'Marshall', black: 'Lasker',
    year: 1907, result: '0-1', eco: 'D55', opening: 'QGD', event: 'Match G1',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['campeonato mundial', 'defensa', 'posicional'],
    pgn: `[Event "Match G1"]\n[White "Marshall"]\n[Black "Lasker"]\n[Result "0-1"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 Ne4 6. Bxe7 Qxe7 7. Bd3 Nxc3 8. bxc3 Nd7 9. Nf3 O-O 10. Qc2 f5 11. O-O b6 12. a4 Bb7 13. a5 c5 14. Nd2 Rac8 15. f3 cxd4 16. exd4 bxa5 17. cxd5 exd5 18. Rfe1 Qd6 19. Nf1 Nf6 20. Ne3 Rc3 21. Bb5 a6 22. Bd3 Ne4 23. Bxe4 fxe4 24. fxe4 Rxf1+ 25. Kxf1 Qf4+ 26. Nf3 Rxc2 0-1`,
  },
  {
    id: 'tartakower-reti-1923', name: 'Tartakower vs Reti', white: 'Tartakower', black: 'Reti',
    year: 1923, result: '0-1', eco: 'A07', opening: 'Reti Opening', event: 'Vienna',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['hipermoderno', 'posicional', 'final'],
    pgn: `[Event "Vienna"]\n[White "Tartakower"]\n[Black "Reti"]\n[Result "0-1"]\n\n1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Be2 e6 6. O-O Be7 7. c4 Nb6 8. Nc3 O-O 9. Be3 d5 10. c5 Bxf3 11. gxf3 Nc8 12. f4 f6 13. Kh1 Nc6 14. Rg1 fxe5 15. fxe5 Rf5 16. Bd3 Rh5 17. Rg2 N8e7 18. Qe2 Qd7 19. Rag1 Nf5 20. Bf4 Rf8 21. Be4 Nce7 22. Bg5 Bxg5 23. Rxg5 Rxg5 24. Rxg5 Ng6 25. Bxd5 exd5 26. e6 Qe7 27. Nxd5 Qd6 0-1`,
  },
  {
    id: 'rubinstein-lasker-1909', name: 'Rubinstein vs Lasker', white: 'Rubinstein', black: 'Lasker',
    year: 1909, result: '1-0', eco: 'D32', opening: 'QGD Tarrasch', event: 'St Petersburg',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['final', 'posicional', 'tecnico'],
    pgn: `[Event "St Petersburg"]\n[White "Rubinstein"]\n[Black "Lasker"]\n[Result "1-0"]\n\n1. d4 d5 2. Nf3 Nf6 3. c4 e6 4. Bg5 c5 5. cxd5 exd5 6. Nc3 cxd4 7. Nxd4 Be7 8. e3 O-O 9. Bd3 Nc6 10. Nxc6 bxc6 11. O-O Bd6 12. Rc1 Re8 13. Qa4 Bb7 14. Ba6 Bxa6 15. Qxa6 c5 16. Bxf6 Qxf6 17. Nd5 Qd8 18. Nf4 Rb8 19. Rc2 Rb6 20. Qa4 g6 21. Rd1 Re5 22. Rcd2 Qf6 23. Nd3 Re4 24. Nxc5 Rxe3 25. fxe3 Qxe3+ 26. Kh1 Bc7 27. Nd3 Qe4 28. Nf2 Qe3 29. Re2 Qd4 30. Nd3 f5 31. Red2 Qa1+ 32. Qe8+ 1-0`,
  },
  {
    id: 'capablanca-tartakower-1924', name: 'Capablanca vs Tartakower', white: 'Capablanca', black: 'Tartakower',
    year: 1924, result: '1-0', eco: 'A80', opening: 'Dutch Defense', event: 'New York',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['posicional', 'final', 'tecnico'],
    pgn: `[Event "New York"]\n[White "Capablanca"]\n[Black "Tartakower"]\n[Result "1-0"]\n\n1. d4 e6 2. Nf3 f5 3. c4 Nf6 4. Bg5 Be7 5. Nc3 O-O 6. e3 b6 7. Bd3 Bb7 8. O-O Qe8 9. Qe2 Ne4 10. Bxe7 Nxc3 11. bxc3 Qxe7 12. a4 Bxf3 13. Qxf3 Nc6 14. Rfb1 Rae8 15. Qh3 Rf6 16. f4 Na5 17. Qf3 d6 18. Re1 Qd7 19. e4 fxe4 20. Qxe4 g6 21. g3 Kf8 22. Kg2 Rf7 23. h4 d5 24. cxd5 exd5 25. Qe5 Nc4 26. Bxc4 dxc4 27. Re3 Ref8 28. Rae1 Qd5+ 29. Qxd5 1-0`,
  },
  {
    id: 'alekhine-nimzowitsch-1930', name: 'Alekhine vs Nimzowitsch', white: 'Alekhine', black: 'Nimzowitsch',
    year: 1930, result: '1-0', eco: 'C15', opening: 'French Winawer', event: 'San Remo',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['ataque', 'posicional', 'brillante'],
    pgn: `[Event "San Remo"]\n[White "Alekhine"]\n[Black "Nimzowitsch"]\n[Result "1-0"]\n\n1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. Ne2 dxe4 5. a3 Bxc3+ 6. Nxc3 f5 7. f3 exf3 8. Qxf3 Qh4+ 9. g3 Qd8 10. Qf2 Nf6 11. Bg2 O-O 12. O-O Nc6 13. b4 e5 14. dxe5 Nxe5 15. Bb2 Ng6 16. Rad1 Qe7 17. Nd5 Nxd5 18. Rxd5 c6 19. Rd2 Be6 20. Qb6 Bd5 21. Bxd5+ cxd5 22. Rxd5 Rae8 23. Rd7 Qe2 24. Rf2 Qe4 25. Qxb7 Rf7 26. Rxf7 Kxf7 27. Bd4 f4 28. Qxa7+ Re7 29. Qd7 1-0`,
  },
  {
    id: 'nimzowitsch-capablanca-1927', name: 'Nimzowitsch vs Capablanca', white: 'Nimzowitsch', black: 'Capablanca',
    year: 1927, result: '0-1', eco: 'E34', opening: 'Nimzo-Indian', event: 'New York',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['posicional', 'final', 'tecnico'],
    pgn: `[Event "New York"]\n[White "Nimzowitsch"]\n[Black "Capablanca"]\n[Result "0-1"]\n\n1. c4 Nf6 2. d4 e6 3. Nc3 Bb4 4. Qc2 d5 5. cxd5 exd5 6. Bg5 h6 7. Bh4 c5 8. O-O-O Bxc3 9. Qxc3 g5 10. Bg3 cxd4 11. Qxd4 Nc6 12. Qd2 Be6 13. e3 Qa5 14. Kb1 O-O-O 15. Ka1 d4 16. e4 Nd5 17. exd5 Bxd5 18. Nf3 d3 19. Bd6 Rhe8 20. Bc5 Re2 21. Qd1 Bf3 22. gxf3 Rxf2 0-1`,
  },
  {
    id: 'reti-alekhine-1925', name: 'Reti vs Alekhine', white: 'Reti', black: 'Alekhine',
    year: 1925, result: '0-1', eco: 'A00', opening: 'King\'s Indian Attack', event: 'Baden-Baden',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['brillante', 'ataque', 'sacrificio'],
    pgn: `[Event "Baden-Baden"]\n[White "Reti"]\n[Black "Alekhine"]\n[Result "0-1"]\n\n1. g3 e5 2. Nf3 e4 3. Nd4 d5 4. d3 exd3 5. Qxd3 Nf6 6. Bg2 Bb4+ 7. Bd2 Bxd2+ 8. Nxd2 O-O 9. c4 Na6 10. cxd5 Nb4 11. Qc4 Nbxd5 12. N2b3 c6 13. O-O Re8 14. Rfd1 Bg4 15. Rd2 Qc8 16. Nc5 Bh3 17. Bf3 Bg4 18. Bg2 Bh3 19. Bf3 Bg4 20. Bh1 h5 21. b4 a6 22. Rc1 h4 23. a4 hxg3 24. hxg3 Qc7 25. b5 axb5 26. axb5 Re3 27. Nf3 cxb5 28. Qxb5 Nc3 29. Qxb7 Qxb7 30. Nxb7 Nxe2+ 31. Kh2 Ne4 32. Rc4 Nxf2 33. Bg2 Be6 34. Rcc2 Ng4+ 35. Kh3 Ne5+ 36. Kh2 Rxf3 37. Rxe2 Ng4+ 38. Kh3 Ne3+ 39. Kh2 Nxc2 40. Bxf3 Nd4 0-1`,
  },
  {
    id: 'bogoljubov-alekhine-1929', name: 'Bogoljubov vs Alekhine', white: 'Bogoljubov', black: 'Alekhine',
    year: 1929, result: '0-1', eco: 'E16', opening: "Queen's Indian", event: 'WCh Match',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['campeonato mundial', 'ataque', 'brillante'],
    pgn: `[Event "WCh Match"]\n[White "Bogoljubov"]\n[Black "Alekhine"]\n[Result "0-1"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Bb4+ 6. Bd2 Bxd2+ 7. Qxd2 O-O 8. Nc3 d6 9. O-O Nbd7 10. Qc2 Qe7 11. e4 e5 12. d5 Nc5 13. Ne1 a5 14. Nd3 Nxd3 15. Qxd3 Nh5 16. f3 f5 17. b3 Bc8 18. Rae1 Bd7 19. Kh1 Rf7 20. Nd1 Raf8 21. Nf2 g5 22. Nd3 Nf4 23. Nxf4 gxf4 24. g4 fxe4 25. fxe4 f3 26. Bh3 Bxg4 27. Bxg4 f2 28. Rxf2 Rxf2 29. Qg3+ Kh8 30. Be6 R8f3 0-1`,
  },
  {
    id: 'capablanca-spielmann-1927', name: 'Capablanca vs Spielmann', white: 'Capablanca', black: 'Spielmann',
    year: 1927, result: '1-0', eco: 'D17', opening: 'Slav Defense', event: 'New York',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['posicional', 'tecnico', 'final'],
    pgn: `[Event "New York"]\n[White "Capablanca"]\n[Black "Spielmann"]\n[Result "1-0"]\n\n1. d4 d5 2. Nf3 Nf6 3. c4 c6 4. Nc3 dxc4 5. a4 Bf5 6. Ne5 e6 7. f3 Bb4 8. e4 Bxe4 9. fxe4 Nxe4 10. Bd2 Qxd4 11. Nxe4 Qxe4+ 12. Qe2 Bxd2+ 13. Kxd2 Qd5+ 14. Kc2 Na6 15. Nxc4 O-O 16. Qe5 Qxe5 17. Nxe5 Nb4+ 18. Kb3 Nd5 19. Bc4 Nf6 20. Rad1 Rfd8 21. Rxd8+ Rxd8 22. Rd1 Rc8 23. Rd7 b5 24. axb5 cxb5 25. Bd3 a5 26. Rxf7 1-0`,
  },
  {
    id: 'reti-bogoljubov-1924', name: 'Reti vs Bogoljubov', white: 'Reti', black: 'Bogoljubov',
    year: 1924, result: '1-0', eco: 'A15', opening: 'English Opening', event: 'New York',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['hipermoderno', 'posicional', 'brillante'],
    pgn: `[Event "New York"]\n[White "Reti"]\n[Black "Bogoljubov"]\n[Result "1-0"]\n\n1. Nf3 d5 2. c4 e6 3. g3 Nf6 4. Bg2 Bd6 5. O-O O-O 6. b3 Re8 7. Bb2 Nbd7 8. d4 c6 9. Nbd2 Ne4 10. Nxe4 dxe4 11. Ne5 f5 12. f3 exf3 13. Bxf3 Qc7 14. Nxd7 Bxd7 15. e4 e5 16. c5 Bf8 17. Qc2 exd4 18. exf5 Rac8 19. f6 gxf6 20. Bh5 Re5 21. Bxd4 Rxh5 22. Qg6+ Kh8 23. Qxh5 1-0`,
  },
  {
    id: 'lasker-tarrasch-1908', name: 'Lasker vs Tarrasch', white: 'Lasker', black: 'Tarrasch',
    year: 1908, result: '1-0', eco: 'C80', opening: 'Ruy Lopez Open', event: 'Match G3',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['campeonato mundial', 'ataque', 'posicional'],
    pgn: `[Event "Match G3"]\n[White "Lasker"]\n[Black "Tarrasch"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Bc5 10. Nbd2 O-O 11. Bc2 Nxd2 12. Bxd2 f6 13. exf6 Qxf6 14. Bg5 Qf7 15. Nd4 Nxd4 16. cxd4 Bb6 17. f4 c5 18. Be3 c4 19. f5 Bd7 20. Qh5 Qf6 21. Rf3 a5 22. Raf1 Be8 23. Qg4 Bf7 24. f6 gxf6 25. Rxf6 Qg7 26. Qg5 1-0`,
  },
  {
    id: 'tarrasch-teichmann-1912', name: 'Tarrasch vs Teichmann', white: 'Tarrasch', black: 'Teichmann',
    year: 1912, result: '1-0', eco: 'C83', opening: 'Ruy Lopez Open', event: 'San Sebastian',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['ataque', 'posicional', 'tecnico'],
    pgn: `[Event "San Sebastian"]\n[White "Tarrasch"]\n[Black "Teichmann"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Be7 10. Nbd2 Nc5 11. Bc2 d4 12. Nb3 d3 13. Bb1 Ne6 14. Nbd4 Nxd4 15. cxd4 O-O 16. Be3 c5 17. dxc5 Bxc5 18. Bxc5 Qd5 19. Nd4 Qxc5 20. Bxd3 Rad8 21. Qb3 Nd4 22. Qa3 Qxa3 23. bxa3 Nc2 24. Bxc2 Rxd4 25. Rfd1 Rfd8 26. Rxd4 Rxd4 27. Bb3 Bxb3 28. axb3 Rd2 29. Kf1 Rb2 30. Rc1 Rxb3 31. Rc8+ 1-0`,
  },
  {
    id: 'schlechter-lasker-1910', name: 'Schlechter vs Lasker', white: 'Schlechter', black: 'Lasker',
    year: 1910, result: '1/2-1/2', eco: 'C66', opening: 'Ruy Lopez', event: 'WCh G1',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['campeonato mundial', 'posicional', 'defensa'],
    pgn: `[Event "WCh G1"]\n[White "Schlechter"]\n[Black "Lasker"]\n[Result "1/2-1/2"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6 5. d4 Bd7 6. Nc3 Be7 7. Re1 exd4 8. Nxd4 O-O 9. Bxc6 bxc6 10. Bg5 Re8 11. Qd3 h6 12. Bh4 Nh5 13. Bxe7 Qxe7 14. Nd1 Qg5 15. Ne3 Nf4 16. Qd2 Qxd2 17. Nxd2 Ne6 18. Nxe6 Bxe6 19. Nf3 Rab8 20. b3 Rb4 21. Rad1 Reb8 22. Rd3 a5 23. Kf1 Kf8 24. Ke2 Ke7 25. Kd2 f6 26. Kc3 Rd4 27. Rxd4 1/2-1/2`,
  },
  {
    id: 'maroczy-chigorin-1903', name: 'Maroczy vs Chigorin', white: 'Maroczy', black: 'Chigorin',
    year: 1903, result: '1-0', eco: 'C77', opening: 'Ruy Lopez', event: 'Monte Carlo',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['posicional', 'tecnico', 'final'],
    pgn: `[Event "Monte Carlo"]\n[White "Maroczy"]\n[Black "Chigorin"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. d3 d6 6. c3 Be7 7. Nbd2 O-O 8. Nf1 b5 9. Bc2 d5 10. Qe2 dxe4 11. dxe4 Bg4 12. Ne3 Bh5 13. Nf5 Bg6 14. Nxe7+ Qxe7 15. O-O Rfd8 16. Re1 Nd7 17. Be3 Nc5 18. Nd2 Ne6 19. Nf1 Nd4 20. Qd3 Nxc2 21. Qxc2 Nd4 22. Bxd4 Rxd4 23. Ne3 Rad8 24. Rad1 f6 25. Rxd4 Rxd4 26. Rd1 Rxd1+ 27. Nxd1 Qd7 28. Ne3 Qd2 29. Qc1 Qxc1+ 30. Nxc1 1-0`,
  },
  {
    id: 'capablanca-marshall-1909', name: 'Capablanca vs Marshall', white: 'Capablanca', black: 'Marshall',
    year: 1909, result: '1-0', eco: 'D55', opening: 'QGD', event: 'Match G23',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['final', 'posicional', 'tecnico'],
    pgn: `[Event "Match G23"]\n[White "Capablanca"]\n[Black "Marshall"]\n[Result "1-0"]\n\n1. d4 d5 2. Nf3 Nf6 3. c4 e6 4. Bg5 Nbd7 5. e3 Be7 6. Nc3 O-O 7. Rc1 b6 8. cxd5 exd5 9. Bb5 Bb7 10. Qa4 a6 11. Bxd7 Qxd7 12. Qc2 c5 13. dxc5 bxc5 14. O-O Rac8 15. Bxf6 Bxf6 16. Nd2 Qe6 17. Rfe1 c4 18. e4 dxe4 19. Ndxe4 Be7 20. Nd6 Bxd6 21. Qxh7+ Kf8 22. Rcd1 Ke7 23. Rxd6 Qf5 24. Qh4+ f6 25. Red1 1-0`,
  },
  {
    id: 'alekhine-lasker-1924', name: 'Alekhine vs Lasker', white: 'Alekhine', black: 'Lasker',
    year: 1924, result: '1-0', eco: 'D61', opening: 'QGD Orthodox', event: 'New York',
    whiteElo: null, blackElo: null, era: 'classical', tags: ['ataque', 'posicional', 'brillante'],
    pgn: `[Event "New York"]\n[White "Alekhine"]\n[Black "Lasker"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 Ne4 6. Bxe7 Qxe7 7. Bd3 Nxc3 8. bxc3 Nd7 9. Nf3 O-O 10. Qc2 f5 11. O-O b6 12. Rab1 Bb7 13. cxd5 exd5 14. c4 c5 15. cxd5 Bxd5 16. dxc5 bxc5 17. Be4 Bxe4 18. Qxe4 Rf6 19. Rfc1 Rc8 20. Qe2 Nf8 21. Nd2 Ng6 22. Ne4 Rf5 23. Qb2 Ne5 24. Nd6 Rf6 25. Nxc8 Qd7 26. Nd6 Rxd6 27. Rc3 Rf6 28. Rbc1 c4 29. Qb7 Qxb7 30. Rxc4 1-0`,
  },
];

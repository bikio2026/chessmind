export const batch3 = [
  // ═══════════════════════════════════════════
  // ERA MODERN (1974-2005)
  // ═══════════════════════════════════════════
  {
    id: 'karpov-kasparov-1984-g48', name: 'Karpov vs Kasparov WCh G48', white: 'Karpov', black: 'Kasparov',
    year: 1984, result: '0-1', eco: 'B44', opening: 'Sicilian', event: 'World Championship',
    whiteElo: 2700, blackElo: 2710, era: 'modern', tags: ['campeonato mundial', 'siciliana'],
    pgn: `[Event "World Championship"]\n[White "Karpov"]\n[Black "Kasparov"]\n[Result "0-1"]\n\n1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5 d6 6. c4 Nf6 7. N1c3 a6 8. Na3 d5 9. cxd5 exd5 10. exd5 Nb4 11. Be2 Bc5 12. O-O O-O 13. Bf3 Bf5 14. Bg5 Re8 15. Qd2 b5 16. Rad1 Nd3 17. Nab1 h6 18. Bh4 b4 19. Na4 Bd6 20. Bg3 Rc8 21. b3 g5 22. Bxd6 Qxd6 23. g3 Nd7 24. Bg2 Qf6 25. a3 a5 26. axb4 axb4 27. Qa2 Bg6 28. d6 g4 29. Qd2 Kg7 30. f3 Qxd6 31. fxg4 Qd4+ 32. Kh1 Nf6 33. Rf4 Ne4 34. Qxd3 Nf2+ 35. Rxf2 Bxd3 36. Rfd2 Qe3 37. Rxd3 Rc1 38. Nb2 Qf2 39. Nd2 Rxd1+ 40. Nxd1 Re1+ 0-1`,
  },
  {
    id: 'kasparov-portisch-1983', name: 'Kasparov vs Portisch', white: 'Kasparov', black: 'Portisch',
    year: 1983, result: '1-0', eco: 'E12', opening: "Queen's Indian", event: 'Niksic',
    whiteElo: 2690, blackElo: 2640, era: 'modern', tags: ['ataque', 'sacrificio', 'brillante'],
    pgn: `[Event "Niksic"]\n[White "Kasparov"]\n[Black "Portisch"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. Nc3 Bb7 5. a3 d5 6. cxd5 Nxd5 7. Qc2 Nxc3 8. bxc3 Be7 9. e4 O-O 10. Bd3 c5 11. O-O Qc8 12. Qe2 Ba6 13. Rd1 Rd8 14. e5 cxd4 15. Bxh7+ Kxh7 16. Ng5+ Kg8 17. Qh5 Rd5 18. Qxf7+ Kh8 19. Qh5+ Kg8 20. Qxd5 exd5 21. cxd4 Nc6 22. Be3 Qe6 23. Nxe6 Bxe6 24. Rac1 Rc8 25. Rc3 Bf8 26. Rdc1 Ne7 27. Rc7 Rxc7 28. Rxc7 Nf5 29. Bf4 a5 30. g4 Nh4 31. Rxa7 b5 32. f3 Ng6 33. Be3 b4 34. axb4 axb4 35. Kf2 1-0`,
  },
  {
    id: 'kasparov-karpov-1990-g20', name: 'Kasparov vs Karpov WCh G20', white: 'Kasparov', black: 'Karpov',
    year: 1990, result: '1-0', eco: 'C92', opening: 'Ruy Lopez', event: 'World Championship',
    whiteElo: 2800, blackElo: 2730, era: 'modern', tags: ['campeonato mundial', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Kasparov"]\n[Black "Karpov"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nd7 10. d4 Bf6 11. a4 Bb7 12. Na3 exd4 13. cxd4 Nb4 14. Bg5 bxa4 15. Bxa4 a5 16. Bc2 Bxg5 17. Nxg5 Qf6 18. Ne2 Nf8 19. Ng3 Ng6 20. Qd3 Rfe8 21. Re3 h6 22. Nf3 Re7 23. Rae1 Rae8 24. h4 Bc8 25. h5 Nf8 26. Nf5 Bxf5 27. exf5 Rxe3 28. Rxe3 Rxe3 29. fxe3 Qd8 30. Nc1 Qe8 31. Nd3 Nxd3 32. Bxd3 Qe7 33. g4 g6 34. fxg6 Nxg6 35. hxg6 fxg6 36. g5 hxg5 37. Qe4 Kf7 38. Qd5+ Kf8 39. Kf2 Qe8 40. Qxa5 1-0`,
  },
  {
    id: 'karpov-spassky-1974-g11', name: 'Karpov vs Spassky Candidates G11', white: 'Karpov', black: 'Spassky',
    year: 1974, result: '1-0', eco: 'D41', opening: 'QGD Semi-Tarrasch', event: 'Candidates Final',
    whiteElo: 2700, blackElo: 2650, era: 'modern', tags: ['candidatos', 'posicional', 'final'],
    pgn: `[Event "Candidates Final"]\n[White "Karpov"]\n[Black "Spassky"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Nc3 c5 5. cxd5 Nxd5 6. e4 Nxc3 7. bxc3 cxd4 8. cxd4 Bb4+ 9. Bd2 Bxd2+ 10. Qxd2 O-O 11. Bc4 Nd7 12. O-O b6 13. Rad1 Bb7 14. Rfe1 Rc8 15. Bd3 Re8 16. d5 exd5 17. e5 Nc5 18. Qf4 Qd7 19. Re3 Ne6 20. Qh4 Rc5 21. Nd4 Nxd4 22. Rg3 g6 23. Qxd4 Rxe5 24. Bxg6 hxg6 25. Qxe5 Qd6 26. Qe2 Rc8 27. h3 Rc2 28. Qe8+ Kg7 29. Rxg6+ fxg6 30. Qe5+ Kh7 31. Qxd6 1-0`,
  },
  {
    id: 'topalov-shirov-1998', name: 'Topalov vs Shirov', white: 'Topalov', black: 'Shirov',
    year: 1998, result: '0-1', eco: 'D85', opening: 'Grünfeld', event: 'Linares',
    whiteElo: 2740, blackElo: 2710, era: 'modern', tags: ['sacrificio', 'brillante'],
    pgn: `[Event "Linares"]\n[White "Topalov"]\n[Black "Shirov"]\n[Result "0-1"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Be3 Qa5 9. Qd2 Nc6 10. Rc1 cxd4 11. cxd4 Qxd2+ 12. Kxd2 O-O 13. d5 Rd8 14. Nd4 Na5 15. Nb5 a6 16. Na7 Bd7 17. Nc6 Nxc6 18. dxc6 Bc8 19. Bd4 e5 20. Bc5 Be6 21. Bc4 Bxc4 22. Rxc4 Rac8 23. Ba3 b5 24. Rc2 b4 25. Bb2 a5 26. Rhc1 f5 27. f3 fxe4 28. fxe4 Rf8 29. Ke2 Rf4 30. Ba1 Rxe4+ 31. Kd3 Rd4+ 32. Ke2 e4 33. c7 Rxc7 34. Rxc7 Rd2+ 35. Ke1 Rxa2 36. R1c2 Ra1+ 37. Rc1 Bh6 38. Ke2 Rxc1 39. Rxc1 Bf4 40. g3 Be5 41. Rc8+ Kg7 42. Rc5 Bd4 43. Rc2 a4 44. Ra2 b3 45. Rxa4 Bxa1 0-1`,
  },
  {
    id: 'polgar-kasparov-2002', name: 'Polgar vs Kasparov', white: 'Polgar', black: 'Kasparov',
    year: 2002, result: '1-0', eco: 'C67', opening: 'Ruy Lopez Berlin', event: 'Russia vs Rest of the World',
    whiteElo: 2681, blackElo: 2838, era: 'modern', tags: ['sorpresa', 'ataque'],
    pgn: `[Event "Russia vs Rest"]\n[White "Polgar"]\n[Black "Kasparov"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Nd6 6. Bxc6 dxc6 7. dxe5 Nf5 8. Qxd8+ Kxd8 9. Nc3 Ke8 10. h3 Be7 11. b3 Nh4 12. Nxh4 Bxh4 13. Bb2 Bf5 14. Rad1 Be7 15. Ne2 h5 16. Nd4 Bg6 17. g4 hxg4 18. hxg4 Rh6 19. Kg2 Bd8 20. Nf5 Bxf5 21. gxf5 Rh5 22. f4 Bc7 23. Rh1 Rxh1 24. Rxh1 Bxe5 25. Bxe5 Kd7 26. Rh7 Rf8 27. Bf6 g6 28. fxg6 fxg6 29. f5 gxf5 30. Bxc6+ Kd6 31. Be4+ Ke5 32. Bxf5 Rxf6 33. Rxb7 a5 34. Be6 Kf4 35. Bd7 c5 36. Ra7 Rd6 37. Bc8 Rd2+ 38. Kf1 Ke3 39. Rxa5 Rxc2 40. Ra3+ Kd4 41. Bf5 c4 42. bxc4 Kxc4 43. a4 1-0`,
  },
  {
    id: 'leko-kramnik-2004', name: 'Leko vs Kramnik WCh G8', white: 'Leko', black: 'Kramnik',
    year: 2004, result: '1-0', eco: 'C42', opening: 'Petrov Defense', event: 'World Championship',
    whiteElo: 2741, blackElo: 2770, era: 'modern', tags: ['campeonato mundial', 'petrov'],
    pgn: `[Event "World Championship"]\n[White "Leko"]\n[Black "Kramnik"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Nc6 7. O-O Be7 8. c4 Nb4 9. Be2 O-O 10. Nc3 Bf5 11. a3 Nxc3 12. bxc3 Nc6 13. Re1 Re8 14. cxd5 Qxd5 15. Bf4 Rac8 16. Nd2 Qd7 17. Bf3 Na5 18. Qb1 Be4 19. c4 Bg6 20. Qb4 c5 21. Qxb7 Qxb7 22. Bxb7 Nxb7 23. dxc5 Bxc5 24. Nb3 Bf8 25. Rad1 Red8 26. Rxd8 Rxd8 27. Re7 Nd6 28. Rxa7 Nxc4 29. a4 Rd1+ 30. Nd4 Rb1 31. Nc6 Bc5 32. Ra8+ Bf8 33. Nb8 Na5 34. Nc6 Nc4 35. Nd8 Na5 36. Nxf7 Bh5 37. Nh6+ gxh6 38. Ra5 1-0`,
  },
  {
    id: 'anand-topalov-2005', name: 'Anand vs Topalov', white: 'Anand', black: 'Topalov',
    year: 2005, result: '1-0', eco: 'E15', opening: "Queen's Indian", event: 'Sofia',
    whiteElo: 2785, blackElo: 2788, era: 'modern', tags: ['ataque', 'sacrificio', 'brillante'],
    pgn: `[Event "Sofia"]\n[White "Anand"]\n[Black "Topalov"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6 5. b3 Bb4+ 6. Bd2 Be7 7. Nc3 O-O 8. Bg2 c6 9. e4 d5 10. e5 Ne8 11. O-O Nc7 12. Re1 Bb7 13. Nd1 a5 14. Ne3 Ba6 15. cxd5 cxd5 16. Rc1 Na8 17. Bh3 Nd7 18. Nd2 Nb8 19. Nf3 Nc6 20. Bf4 Nb4 21. Nd2 Nc7 22. Qg4 Kh8 23. h4 a4 24. Ndc4 dxc4 25. Nf5 exf5 26. Qxf5 Nd5 27. e6 fxe6 28. Qxe6 Bf6 29. Bg2 Nc3 30. Re3 Qe7 31. Qxe7 Bxe7 32. Bf1 axb3 33. axb3 cxb3 34. d5 Ra1 35. Bg5 Bf6 36. Bxf6 gxf6 37. Rxa1 1-0`,
  },
  {
    id: 'kramnik-topalov-2006-g2', name: 'Kramnik vs Topalov WCh G2', white: 'Kramnik', black: 'Topalov',
    year: 2006, result: '1-0', eco: 'D19', opening: 'Slav', event: 'World Championship',
    whiteElo: 2743, blackElo: 2813, era: 'modern', tags: ['campeonato mundial', 'posicional'],
    pgn: `[Event "World Championship"]\n[White "Kramnik"]\n[Black "Topalov"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O Nbd7 9. Qe2 Bg6 10. e4 O-O 11. Bd3 Bh5 12. e5 Nd5 13. Nxd5 cxd5 14. Qe3 Re8 15. Ne1 Bg6 16. Bxg6 hxg6 17. Nd3 Bd6 18. Bd2 Qb8 19. f4 a5 20. Rf3 b5 21. Rh3 Nf8 22. axb5 Qxb5 23. Nf2 Rab8 24. Ng4 Qd7 25. Rg3 f5 26. exf6 Qf7 27. Qf3 Rxb2 28. Bc3 Rxg2+ 29. Rxg2 e5 30. fxe5 Be7 31. Qf4 Bxf6 32. exf6 Ne6 33. Qe5 Qxf6 34. Qxf6 gxf6 35. Kf2 Kf7 36. Ke3 Re7+ 37. Kd3 Rd7 38. Bd2 Nc7 39. Re1 Nb5 40. Bc1 Re7 41. Rge2 Rxe2 42. Rxe2 Nc7 43. Bg5 Ke6 44. Bxf6 1-0`,
  },
  {
    id: 'kasparov-short-1993-g10', name: 'Kasparov vs Short PCA WCh G10', white: 'Kasparov', black: 'Short',
    year: 1993, result: '1-0', eco: 'B12', opening: 'Caro-Kann Advance', event: 'PCA World Championship',
    whiteElo: 2815, blackElo: 2660, era: 'modern', tags: ['campeonato mundial', 'ataque'],
    pgn: `[Event "PCA World Championship"]\n[White "Kasparov"]\n[Black "Short"]\n[Result "1-0"]\n\n1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nc3 e6 5. g4 Bg6 6. Nge2 c5 7. h4 h5 8. Nf4 Bh7 9. Nxh5 Nc6 10. dxc5 Bxc5 11. Bg5 Qb6 12. Qd2 Qxb2 13. Rb1 Qa3 14. Nf4 Nge7 15. Bb5 O-O 16. Bxe7 Nxe7 17. Bxe7 Bxe7 18. Nd3 a6 19. Be2 Bg6 20. Qd1 Rfd8 21. Rb3 Qa5+ 22. Kf1 b5 23. g5 Rac8 24. Rg1 Qd2 25. g6 fxg6 26. Qxd2 Rxd2 27. Nxb5 Rxc2 28. Nd6 Rc1+ 29. Rxc1 Rxc1+ 30. Kg2 Bh5 31. Rb8+ Kh7 32. Nf4 Bxe2 33. Nxe2 1-0`,
  },
  {
    id: 'karpov-miles-1980', name: 'Karpov vs Miles', white: 'Karpov', black: 'Miles',
    year: 1980, result: '0-1', eco: 'B00', opening: 'St George Defense', event: 'Skara',
    whiteElo: 2725, blackElo: 2545, era: 'modern', tags: ['sorpresa', 'apertura'],
    pgn: `[Event "Skara"]\n[White "Karpov"]\n[Black "Miles"]\n[Result "0-1"]\n\n1. e4 a6 2. d4 b5 3. Nf3 Bb7 4. Bd3 Nf6 5. Qe2 e6 6. a4 c5 7. dxc5 Bxc5 8. Nbd2 b4 9. e5 Nd5 10. Ne4 Be7 11. O-O Nc6 12. Bd2 Qc7 13. c4 bxc3 14. Nxc3 Nxc3 15. Bxc3 Nb4 16. Bxb4 Bxb4 17. Rac1 Qb6 18. Be4 O-O 19. Ng5 h6 20. Bh7+ Kh8 21. Bb1 Be7 22. Ne4 Rac8 23. Qd3 f5 24. exf6 Bxf6 25. Nxf6 Rxf6 26. Rxc8+ Bxc8 27. Qc4 Bb7 28. Qc7 Qxc7 0-1`,
  },
  {
    id: 'nunn-portisch-1982', name: 'Nunn vs Portisch', white: 'Nunn', black: 'Portisch',
    year: 1982, result: '1-0', eco: 'B33', opening: 'Sicilian', event: 'Toluca',
    whiteElo: 2595, blackElo: 2625, era: 'modern', tags: ['ataque', 'sacrificio'],
    pgn: `[Event "Toluca"]\n[White "Nunn"]\n[Black "Portisch"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Ndb5 d6 7. Bf4 e5 8. Bg5 a6 9. Na3 b5 10. Nd5 Be7 11. Bxf6 Bxf6 12. c3 Bg5 13. Nc2 Rb8 14. h4 Bh6 15. g3 O-O 16. Nce3 Be6 17. Bg2 f5 18. exf5 Bxd5 19. Nxd5 Nd4 20. Qg4 Nf3+ 21. Ke2 Nd4+ 22. Kd1 e4 23. cxd4 Qxd5 24. Kc1 Qxa2 25. Rd1 Qa1+ 26. Kc2 Qa4+ 27. Kc1 Rbc8+ 28. Kb1 Qa2+ 29. Kg1 Rc2 30. Qxe4 Rxf5 31. Rd2 Qa1+ 32. Kh2 Rcxd2 33. Qe8+ Rf8 34. Qe6+ Kh8 35. Qxd6 1-0`,
  },
  {
    id: 'kamsky-karpov-1996-g6', name: 'Kamsky vs Karpov Candidates G6', white: 'Kamsky', black: 'Karpov',
    year: 1996, result: '0-1', eco: 'A29', opening: 'English Four Knights', event: 'Candidates Final',
    whiteElo: 2735, blackElo: 2775, era: 'modern', tags: ['candidatos', 'posicional'],
    pgn: `[Event "Candidates Final"]\n[White "Kamsky"]\n[Black "Karpov"]\n[Result "0-1"]\n\n1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3 Bb4 5. Bg2 O-O 6. O-O e4 7. Ng5 Bxc3 8. bxc3 Re8 9. f3 exf3 10. Nxf3 d5 11. cxd5 Qxd5 12. d3 Bg4 13. Nd4 Rad8 14. Qc2 Nxd4 15. cxd4 Qb5 16. Rb1 Qa6 17. Bf4 c6 18. e4 Nd7 19. e5 Qxa2 20. d5 cxd5 21. Bxd5 Nc5 22. Rfc1 Nd3 23. Rc7 Nxf4 24. gxf4 b6 25. Qe4 Qd2 26. Rd1 Qg2# 0-1`,
  },
  {
    id: 'adams-kasparov-2005', name: 'Adams vs Kasparov', white: 'Adams', black: 'Kasparov',
    year: 2005, result: '0-1', eco: 'B90', opening: 'Sicilian Najdorf', event: 'Linares',
    whiteElo: 2741, blackElo: 2804, era: 'modern', tags: ['najdorf', 'ataque'],
    pgn: `[Event "Linares"]\n[White "Adams"]\n[Black "Kasparov"]\n[Result "0-1"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 Be7 9. Qd2 O-O 10. O-O-O Nbd7 11. g4 b5 12. g5 Nh5 13. Nd5 Bxd5 14. exd5 f5 15. gxf6 Nhxf6 16. Rg1 Kh8 17. Bd3 Nc5 18. Nxc5 dxc5 19. Be4 Bd6 20. Kb1 Qe7 21. Bc1 Rab8 22. h4 Rb6 23. h5 Nxe4 24. fxe4 Rf1 25. Rxf1 Qg5 26. Qxg5 hxg5 27. h6 g6 28. Rg1 Rxb2+ 29. Ka1 Re2 30. Rd3 Bf4 31. Ra3 Rxe4 32. Rxa6 e4 0-1`,
  },
  {
    id: 'kasparov-piket-2000', name: 'Kasparov vs Piket', white: 'Kasparov', black: 'Piket',
    year: 2000, result: '1-0', eco: 'E97', opening: "King's Indian", event: 'Wijk aan Zee',
    whiteElo: 2849, blackElo: 2571, era: 'modern', tags: ['ataque', 'india de rey'],
    pgn: `[Event "Wijk aan Zee"]\n[White "Kasparov"]\n[Black "Piket"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. b4 Nh5 10. Re1 f5 11. Ng5 Nf6 12. f3 f4 13. b5 h6 14. Ne6 Bxe6 15. dxe6 g5 16. Nd5 Nexd5 17. Qxd5 Qe8 18. c5 dxc5 19. Bc4 Qe7 20. Bb2 Rf6 21. Rad1 Kh8 22. Qe4 a6 23. Rd7 Qe8 24. a4 axb5 25. axb5 Ra2 26. Bc3 Rc2 27. Bd2 Nd5 28. Qf5 Ne3 29. Bxe3 fxe3 30. Qg4 Rg6 31. Qxe6 Rc1 32. Rxc1 1-0`,
  },
  {
    id: 'kasparov-bareev-2001', name: 'Kasparov vs Bareev', white: 'Kasparov', black: 'Bareev',
    year: 2001, result: '1-0', eco: 'D85', opening: 'Grünfeld', event: 'Astana',
    whiteElo: 2849, blackElo: 2719, era: 'modern', tags: ['grunfeld', 'ataque'],
    pgn: `[Event "Astana"]\n[White "Kasparov"]\n[Black "Bareev"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Rb1 O-O 9. Be2 cxd4 10. cxd4 Qa5+ 11. Bd2 Qxa2 12. O-O Bg4 13. Bg5 h6 14. Be3 Nc6 15. d5 Na5 16. Bc5 Rfe8 17. Re1 Bxf3 18. Bxf3 e6 19. d6 Qe2 20. Rxe2 Bxb1 21. e5 Rac8 22. Re1 Bf5 23. Bb5 Rc6 24. d7 Rd8 25. Bxc6 Nxc6 26. Rd1 Bg4 27. Rd6 Nxe5 28. Bb6 Rxd7 29. Rxd7 Nxd7 30. Bc7 Bf8 31. Kf1 Nc5 32. Ke2 Kg7 33. Kd2 Kf6 34. Kc3 Ke5 35. Bf4+ Kd5 36. Kb4 1-0`,
  },
  {
    id: 'svidler-kasparov-1999', name: 'Svidler vs Kasparov', white: 'Svidler', black: 'Kasparov',
    year: 1999, result: '0-1', eco: 'B33', opening: 'Sicilian Sveshnikov', event: 'Tilburg',
    whiteElo: 2713, blackElo: 2851, era: 'modern', tags: ['sveshnikov', 'ataque'],
    pgn: `[Event "Tilburg"]\n[White "Svidler"]\n[Black "Kasparov"]\n[Result "0-1"]\n\n1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Nd5 Be7 10. Bxf6 Bxf6 11. c3 Bg5 12. Nc2 Rb8 13. h4 Bh6 14. a4 bxa4 15. Ncb4 Nxb4 16. cxb4 O-O 17. Rxa4 a5 18. bxa5 Qa8 19. b4 Bd7 20. Ra1 Qb7 21. Bc4 Bb5 22. Bxb5 Qxb5 23. Qd3 Qxd3 24. Nf6+ gxf6 25. Kd2 Rfd8 26. Rhb1 d5 27. exd5 Qxd5 28. Ke1 e4 29. Ra4 Bg7 30. Kf1 Rb5 31. a6 Rd6 32. a7 Ra6 33. Ra5 Rxa7 34. Rxa7 Bd4 35. Ra2 Qb3 0-1`,
  },
  // ═══════════════════════════════════════════
  // ERA CONTEMPORARY (2014-2024)
  // ═══════════════════════════════════════════
  {
    id: 'carlsen-anand-2014-g6', name: 'Carlsen vs Anand WCh G6', white: 'Carlsen', black: 'Anand',
    year: 2014, result: '1-0', eco: 'B40', opening: 'Sicilian', event: 'World Championship',
    whiteElo: 2863, blackElo: 2792, era: 'contemporary', tags: ['campeonato mundial', 'final'],
    pgn: `[Event "World Championship"]\n[White "Carlsen"]\n[Black "Anand"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Bd3 Nf6 6. O-O e5 7. Nf5 d5 8. exd5 Bxf5 9. Bxf5 Nxd5 10. Be4 Be7 11. c4 Nb4 12. Qa4+ N8c6 13. a3 Nd3 14. Bxd3 Qxd3 15. Nc3 O-O 16. Rd1 Qg6 17. Be3 Rfd8 18. Rxd8+ Rxd8 19. Nb5 a5 20. Nc7 e4 21. Rd1 Rc8 22. Nd5 Bf8 23. Qb5 b6 24. Nf4 Qf5 25. Qd7 Re8 26. Qd5 Re5 27. Qd8 Qe6 28. Bc1 Nd4 29. Qd7 Qxd7 30. Rxd7 Nf3+ 31. gxf3 exf3 32. Nd3 Re1+ 33. Kg2 Re2 34. Bf4 Rxb2 35. Rd8 g6 36. Bg5 Kg7 37. Rd7 Be7 38. Bxe7 1-0`,
  },
  {
    id: 'caruana-carlsen-2014', name: 'Caruana vs Carlsen', white: 'Caruana', black: 'Carlsen',
    year: 2014, result: '1-0', eco: 'C67', opening: 'Ruy Lopez Berlin', event: 'Sinquefield Cup',
    whiteElo: 2801, blackElo: 2877, era: 'contemporary', tags: ['berlin', 'posicional'],
    pgn: `[Event "Sinquefield Cup"]\n[White "Caruana"]\n[Black "Carlsen"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Nd6 6. Bxc6 dxc6 7. dxe5 Nf5 8. Qxd8+ Kxd8 9. h3 Bd7 10. Rd1 Be7 11. Nc3 Kc8 12. Bg5 h6 13. Bxe7 Nxe7 14. Rd2 c5 15. Rad1 Be6 16. Ne1 Ng6 17. Nd3 b6 18. Ne4 Kb7 19. Nef2 Rhd8 20. Nd3 Ne7 21. Nf4 Rxd2 22. Rxd2 Bd5 23. c4 Bc6 24. Re2 Nd5 25. Nxd5 Bxd5 26. Rd2 Bc6 27. f4 Re8 28. Kf2 Rd8 29. Ke3 Rd7 30. g4 f6 31. e6 Re7 32. Kf3 f5 33. g5 hxg5 34. fxg5 Re8 35. h4 Rh8 36. Kg3 Rh5 37. Nf4 Rh8 38. Rd3 Be8 39. Ra3 a5 40. Ra4 Bc6 41. Ra3 Ra8 42. Nd3 g6 43. Ne5 Be8 44. Ra4 Bc6 45. Ra3 Be8 46. Rd3 1-0`,
  },
  {
    id: 'so-carlsen-2016', name: 'So vs Carlsen', white: 'So', black: 'Carlsen',
    year: 2016, result: '1-0', eco: 'D37', opening: 'QGD', event: 'Leuven Blitz',
    whiteElo: 2770, blackElo: 2855, era: 'contemporary', tags: ['blitz', 'posicional'],
    pgn: `[Event "Leuven Blitz"]\n[White "So"]\n[Black "Carlsen"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Nc3 Be7 5. Bf4 O-O 6. e3 Nbd7 7. c5 Nh5 8. Bd3 Nxf4 9. exf4 b6 10. b4 a5 11. a3 Ba6 12. Bxa6 Rxa6 13. Qb3 axb4 14. axb4 Ra3 15. Qc2 bxc5 16. bxc5 Qa8 17. O-O Rb8 18. Rfb1 Rxb1+ 19. Nxb1 Ra2 20. Qd3 g6 21. Nbd2 Qa5 22. Nb3 Qa3 23. Nfd2 Bf6 24. Qe3 Nf8 25. Na5 Nd7 26. Ndc4 dxc4 27. Nxc4 Qa8 28. Nd6 cxd6 29. cxd6 Qa4 30. Rb1 Bg7 31. Qe1 Qd7 32. Rb7 Qd8 33. d5 exd5 34. Qe7 1-0`,
  },
  {
    id: 'nepomniachtchi-carlsen-2021-g6', name: 'Nepomniachtchi vs Carlsen WCh G6', white: 'Nepomniachtchi', black: 'Carlsen',
    year: 2021, result: '0-1', eco: 'D02', opening: "Queen's Pawn", event: 'World Championship',
    whiteElo: 2782, blackElo: 2855, era: 'contemporary', tags: ['marathon', 'campeonato mundial'],
    pgn: `[Event "World Championship"]\n[White "Nepomniachtchi"]\n[Black "Carlsen"]\n[Result "0-1"]\n\n1. d4 Nf6 2. Nf3 d5 3. g3 e6 4. Bg2 Be7 5. O-O O-O 6. b3 c5 7. dxc5 Bxc5 8. c4 dxc4 9. Qc2 Qe7 10. Nbd2 Nc6 11. Nxc4 b5 12. Nce5 Nb4 13. Qb2 Bb7 14. a3 Nc6 15. Nd3 Bb6 16. Bg5 Rfd8 17. Bxf6 Qxf6 18. Rac1 Nd4 19. Nxd4 Bxd4 20. Qa2 Bxg2 21. Kxg2 Qd6 22. Rc2 a5 23. Rfc1 Rab8 24. Nf4 e5 25. Nd5 Rb7 26. b4 axb4 27. axb4 Re7 28. e3 Bf6 29. Qb3 g6 30. Rc6 Qd7 31. R1c4 Re6 32. Rxe6 fxe6 33. Nc3 e4 34. Rc6 Qd3 35. Qxd3 Rxd3 36. Na2 Rd2 37. Rc8+ Kg7 38. Nc1 Bd4 39. Rc6 Rxa2 40. Ne2 Bb2 41. Rxe6 Kf7 42. Re5 Bd4 43. Rxb5 Rxe2 44. Rb7+ Ke6 45. Rb6+ Kd5 46. Rb5+ Kc4 47. Rb1 Kd3 48. b5 Bxe3 49. fxe3 Rxe3 50. b6 Re2+ 51. Kf1 Rb2 52. Rxb2 exb2 53. b7 Kc2 54. Ke2 b1=Q 55. Kd2+ Kb3 56. Kc1 Ka2 0-1`,
  },
  {
    id: 'carlsen-caruana-2018-g1', name: 'Carlsen vs Caruana WCh G1', white: 'Carlsen', black: 'Caruana',
    year: 2018, result: '1/2-1/2', eco: 'B31', opening: 'Sicilian Rossolimo', event: 'World Championship',
    whiteElo: 2835, blackElo: 2832, era: 'contemporary', tags: ['campeonato mundial', 'tablas'],
    pgn: `[Event "World Championship"]\n[White "Carlsen"]\n[Black "Caruana"]\n[Result "1/2-1/2"]\n\n1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3 d5 5. cxd5 Nxd5 6. Bg2 Bc5 7. O-O O-O 8. d3 Re8 9. Bg5 Nxc3 10. bxc3 f6 11. Bc1 Be6 12. Bb2 Bb6 13. d4 Bd5 14. Qc2 e4 15. Nd2 Qe7 16. e3 Rad8 17. Rfd1 Qf7 18. Nf1 Ba5 19. Rac1 Bb6 20. Ba1 Rd7 21. Qb2 Qg6 22. Qb5 Bxg2 23. Kxg2 a6 24. Qb3+ Kh8 25. c4 Bc7 26. Rc3 e3 27. fxe3 Nd4 28. Qd3 Nf3 29. d5 Qf5 30. Qxf5 Rxe3 31. Rf1 Rxf5 32. Rxf3 Rxf3 33. Kxf3 Rd2 34. d6 Bxd6 35. a4 Rxa2 36. c5 Be5 37. Bxe5 fxe5 38. c6 bxc6 39. Rxc6 Ra3+ 40. Kg2 a5 41. Rc5 Ra2+ 42. Kf3 Ra3+ 43. Kf2 Kg8 44. Rxe5 a4 45. Ra5 Kf7 46. Ke2 Ke6 47. Kd2 Kd6 48. Kc2 Kc6 49. Kb2 Ra2+ 50. Kb1 Ra3 51. Kb2 Rg3 52. Rxa4 Rxg3 53. Ra6+ Kb5 54. Ra8 Rg2+ 55. Kc3 Rxh2 56. Rb8+ Ka4 57. Ra8+ Kb5 58. Rb8+ Kc6 59. Ra8 Kb7 60. Ra1 Rh5 61. Kd4 Kc6 62. Ke4 Kd6 63. Kf4 Ke6 64. Ra6+ Kf7 65. Kg4 Rb5 66. Ra7+ Kf6 67. Ra6+ Kf7 68. Ra7+ Kf6 69. Ra6+ 1/2-1/2`,
  },
  {
    id: 'gukesh-caruana-2024', name: 'Gukesh vs Caruana', white: 'Gukesh', black: 'Caruana',
    year: 2024, result: '1-0', eco: 'D35', opening: 'QGD Exchange', event: 'Candidates',
    whiteElo: 2743, blackElo: 2803, era: 'contemporary', tags: ['candidatos', 'joven'],
    pgn: `[Event "Candidates"]\n[White "Gukesh"]\n[Black "Caruana"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nc3 d5 4. cxd5 exd5 5. Bg5 c6 6. e3 h6 7. Bh4 Be7 8. Bd3 O-O 9. Qc2 Re8 10. Nge2 Nbd7 11. O-O Nf8 12. f3 Be6 13. Rad1 N8h7 14. Bf2 Rc8 15. Kh1 Nf8 16. e4 dxe4 17. fxe4 Ng6 18. e5 Nd5 19. Nxd5 cxd5 20. Ng3 Rc4 21. Nh5 Bf8 22. Qf5 Qb6 23. Nf4 Nxf4 24. Qxf4 Bg4 25. Rde1 Rec8 26. h3 Be6 27. Be3 R4c7 28. Qg3 Bd7 29. Bf5 Bxf5 30. Qxf5 Rc2 31. Rf2 R8c4 32. Rxc2 Rxc2 33. Qf3 Qxb2 34. Rf1 Rc7 35. Qxd5 Qa3 36. Bc1 Qxa2 37. Qe4 g6 38. d5 Bg7 39. d6 Rd7 40. Qd5 Qb1 41. Be3 b6 42. Qf3 Qe4 43. Qxe4 1-0`,
  },
  {
    id: 'pragg-carlsen-2022', name: 'Praggnanandhaa vs Carlsen', white: 'Praggnanandhaa', black: 'Carlsen',
    year: 2022, result: '1-0', eco: 'C48', opening: 'Four Knights', event: 'Airthings Masters',
    whiteElo: 2612, blackElo: 2855, era: 'contemporary', tags: ['sorpresa', 'joven'],
    pgn: `[Event "Airthings Masters"]\n[White "Praggnanandhaa"]\n[Black "Carlsen"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nf6 3. Nc3 Nc6 4. Bb5 Nd4 5. Bc4 d6 6. d3 Be7 7. Nxd4 exd4 8. Ne2 c5 9. O-O O-O 10. f4 a5 11. a4 Nd7 12. Ng3 Bf6 13. f5 Ne5 14. Bb5 Be7 15. Qh5 g6 16. fxg6 fxg6 17. Qh3 Rf6 18. Bg5 Bxg5 19. Rxf6 Be3+ 20. Kh1 Qxf6 21. Rf1 Qg5 22. Qg4 Qd2 23. Nf5 Bxf5 24. Rxf5 Qe1+ 25. Rf1 Qg3 26. Qe6+ Kg7 27. Qe7+ Kh6 28. Rf7 Rg8 29. Bd7 Ng4 30. h3 Nf2+ 31. Kh2 Qg5 32. Qf6 1-0`,
  },
  {
    id: 'abdusattorov-carlsen-2022', name: 'Abdusattorov vs Carlsen', white: 'Abdusattorov', black: 'Carlsen',
    year: 2022, result: '1-0', eco: 'D02', opening: 'London System', event: 'Rapid World Championship',
    whiteElo: 2634, blackElo: 2842, era: 'contemporary', tags: ['rapid', 'sorpresa'],
    pgn: `[Event "Rapid World Championship"]\n[White "Abdusattorov"]\n[Black "Carlsen"]\n[Result "1-0"]\n\n1. d4 Nf6 2. Nf3 d5 3. Bf4 c5 4. e3 Nc6 5. Nbd2 cxd4 6. exd4 Bf5 7. c3 e6 8. Nh4 Bg4 9. Qb3 Qc8 10. h3 Bh5 11. g4 Bg6 12. Nxg6 hxg6 13. Bg2 Be7 14. Qb5 Qd7 15. Nf3 a6 16. Qa4 b5 17. Qd1 Nd8 18. Ne5 Qb7 19. O-O O-O 20. Re1 Nd7 21. Nxd7 Qxd7 22. Bg5 Bxg5 23. Qxd5 Qxd5 24. Bxd5 exd5 25. Rxe8 Bf6 26. Rae1 Nc6 27. R1e6 Nxd4 28. Rxa8 Nxe6 29. Rxa6 Nc5 30. Rc6 Nd3 31. b4 Ne1 32. Kf1 Nd3 33. Rc8+ Kh7 34. Ke2 Nf4+ 35. Kf3 Ne6 36. a4 bxa4 37. b5 Nd4+ 38. Ke4 Nxb5 39. cxb5 d4 40. b6 d3 41. b7 d2 42. b8=Q d1=Q 43. Qf4 Qd7 44. Rc4 Qe6+ 45. Kd3 Qd5+ 46. Ke2 1-0`,
  },
];

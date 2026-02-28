export const batch2 = [
  // ═══════════════════════════════════════════
  // ERA SOVIET (16 games)
  // ═══════════════════════════════════════════
  {
    id: 'tal-fischer-1959', name: 'Tal vs Fischer', white: 'Tal', black: 'Fischer',
    year: 1959, result: '1-0', eco: 'B87', opening: 'Sicilian Najdorf', event: 'Candidates',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['candidatos', 'ataque', 'sacrificio'],
    pgn: `[Event "Candidates"]\n[White "Tal"]\n[Black "Fischer"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bc4 e6 7. Bb3 b5 8. f4 b4 9. Na4 Nxe4 10. O-O g6 11. f5 gxf5 12. Nxf5 Rg8 13. Bd5 Ra7 14. Bxe4 exf5 15. Bxf5 Re7 16. Bxc8 Qxc8 17. Bf4 Rg6 18. Nb6 Qc6 19. Nd5 Re2 20. Bxd6 Bxd6 21. Qxd6 Qxd6 22. Nf6+ Kf8 23. Nxe2 Nd7 24. Nd4 Ke7 25. Rae1+ Kd8 26. Nf5 Qg3 27. Re8+ Kc7 28. Re7 1-0`,
  },
  {
    id: 'botvinnik-capablanca-1938', name: 'Botvinnik vs Capablanca', white: 'Botvinnik', black: 'Capablanca',
    year: 1938, result: '1-0', eco: 'E40', opening: 'Nimzo-Indian', event: 'AVRO',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['estrategia', 'pieza menor'],
    pgn: `[Event "AVRO"]\n[White "Botvinnik"]\n[Black "Capablanca"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 d5 5. a3 Bxc3+ 6. bxc3 c5 7. cxd5 exd5 8. Bd3 O-O 9. Ne2 b6 10. O-O Ba6 11. Bxa6 Nxa6 12. Bb2 Qd7 13. a4 Rfe8 14. Qd3 c4 15. Qc2 Nb8 16. Rae1 Nc6 17. Ng3 Na5 18. f3 Nb3 19. e4 Qxa4 20. e5 Nd7 21. Qf2 g6 22. f4 f5 23. exf6 Nxf6 24. f5 Rxe1 25. Rxe1 Re8 26. Re6 Rxe6 27. fxe6 Kg7 28. Qf4 Qe8 29. Qe5 Qe7 30. Ba3 Qxa3 31. Nh5+ gxh5 32. Qg5+ Kf8 33. Qxf6+ Kg8 34. e7 Qc1+ 35. Kf2 Qc2+ 36. Kg3 Qd3+ 37. Kh4 Qe4+ 38. Kxh5 Qe2+ 39. Kh4 Qe4+ 40. g4 Qe1+ 41. Kh5 1-0`,
  },
  {
    id: 'keres-spassky-1965', name: 'Keres vs Spassky', white: 'Keres', black: 'Spassky',
    year: 1965, result: '1-0', eco: 'B17', opening: 'Caro-Kann', event: 'Candidates',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['candidatos', 'ataque'],
    pgn: `[Event "Candidates"]\n[White "Keres"]\n[Black "Spassky"]\n[Result "1-0"]\n\n1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Nf3 Ngf6 6. Nxf6+ Nxf6 7. Bc4 Bf5 8. Qe2 e6 9. Bg5 Be7 10. O-O-O O-O 11. h4 h6 12. Bxf6 Bxf6 13. g4 Bh7 14. Ne5 Bxe5 15. Qxe5 Qa5 16. Kb1 Rad8 17. Rd2 Rd5 18. Qe2 Rfd8 19. f4 b5 20. Bb3 a5 21. f5 exf5 22. gxf5 a4 23. Bc2 R5d6 24. f6 Qb4 25. fxg7 Qe4 26. Qxe4 Bxe4 27. Bxe4 Re6 28. Bf5 Re5 29. Bg4 Re4 30. Bf3 Rxd4 31. Rxd4 Rxd4 32. Re1 1-0`,
  },
  {
    id: 'korchnoi-karpov-1974', name: 'Korchnoi vs Karpov', white: 'Korchnoi', black: 'Karpov',
    year: 1974, result: '0-1', eco: 'E17', opening: "Queen's Indian", event: 'Candidates Final',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['candidatos', 'posicional'],
    pgn: `[Event "Candidates Final"]\n[White "Korchnoi"]\n[Black "Karpov"]\n[Result "0-1"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. Nc3 Ne4 8. Qc2 Nxc3 9. Qxc3 d6 10. Qc2 f5 11. b3 Bf6 12. Bb2 Qe7 13. Rad1 Nd7 14. Ne1 Bxg2 15. Nxg2 c5 16. d5 e5 17. e4 g6 18. f4 Bg7 19. Bc3 Rae8 20. Qd2 Kh8 21. Rf2 Nf6 22. fxe5 dxe5 23. exf5 gxf5 24. d6 Qd7 25. Nf4 e4 26. Nd5 Nxd5 27. cxd5 Bxc3 28. Qxc3+ Rf6 29. Rdf1 Rxd6 30. Rxf5 Rg8 31. Kh1 Rd3 32. Qc2 Qd6 33. R5f4 Qxg3 34. Rxe4 Rd2 0-1`,
  },
  {
    id: 'geller-euwe-1953', name: 'Geller vs Euwe', white: 'Geller', black: 'Euwe',
    year: 1953, result: '1-0', eco: 'E26', opening: 'Nimzo-Indian', event: 'Candidates',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['candidatos', 'ataque', 'sacrificio'],
    pgn: `[Event "Candidates"]\n[White "Geller"]\n[Black "Euwe"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. a3 Bxc3+ 6. bxc3 c5 7. Bd3 Nc6 8. Ne2 b6 9. e4 Ne8 10. O-O Ba6 11. f4 f5 12. Ng3 fxe4 13. Nxe4 d5 14. cxd5 exd5 15. Ng5 Qe7 16. Bc2 Nf6 17. Ba4 h6 18. Bxc6 Rac8 19. Nf3 hxg5 20. fxg5 Ne4 21. Bxe4 dxe4 22. Ng3 Qe6 23. Nxe4 cxd4 24. cxd4 Bb7 25. Nc5 Qd5 26. Nxb7 Qxb7 27. Bf4 Rc2 28. Qg4 Qd5 29. Rae1 Rc4 30. Qh5 Rxd4 31. Re7 Rd1 32. g6 Rxf1+ 33. Kxf1 1-0`,
  },
  {
    id: 'smyslov-botvinnik-1954', name: 'Smyslov vs Botvinnik WCh G15', white: 'Smyslov', black: 'Botvinnik',
    year: 1954, result: '1-0', eco: 'D45', opening: 'Semi-Slav', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'posicional', 'final'],
    pgn: `[Event "World Championship"]\n[White "Smyslov"]\n[Black "Botvinnik"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. e3 Nbd7 6. Qc2 Bd6 7. Bd3 O-O 8. O-O dxc4 9. Bxc4 a6 10. Rd1 b5 11. Bd3 Qc7 12. e4 e5 13. dxe5 Nxe5 14. Nxe5 Bxe5 15. h3 Bb7 16. Be3 Rad8 17. f4 Bd4 18. Bxd4 Rxd4 19. e5 Nd5 20. Be4 Rxd1+ 21. Rxd1 Nxc3 22. bxc3 Qc8 23. Bxh7+ Kxh7 24. Qe4+ Kg8 25. Rd7 Ba8 26. Qd4 f6 27. Qd6 Qe8 28. Rd8 Qxd8 29. Qxd8 Rxd8 30. exf6 gxf6 31. Kf2 Rd2+ 32. Kf3 Rxa2 33. g4 Kf7 34. Ke4 Ke6 35. h4 Ra4+ 36. Kf3 Ra3 37. h5 Rxc3+ 38. Kg2 Kf7 39. h6 Rc4 40. g5 fxg5 41. fxg5 Kg6 42. Kf3 Rc3+ 43. Ke4 Rc4+ 44. Kd5 Rc1 45. Kd6 Rd1+ 46. Kc7 1-0`,
  },
  {
    id: 'petrosian-fischer-1959', name: 'Petrosian vs Fischer', white: 'Petrosian', black: 'Fischer',
    year: 1959, result: '1-0', eco: 'E63', opening: "King's Indian", event: 'Candidates',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['candidatos', 'posicional', 'profilaxis'],
    pgn: `[Event "Candidates"]\n[White "Petrosian"]\n[Black "Fischer"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. g3 Bg7 4. Bg2 O-O 5. Nc3 d6 6. Nf3 Nbd7 7. O-O e5 8. e4 c6 9. h3 Qb6 10. d5 cxd5 11. cxd5 Nc5 12. Ne1 Bd7 13. Nd3 Nxd3 14. Qxd3 Rfc8 15. Rb1 Nh5 16. Be3 Qb4 17. Qe2 f5 18. f4 Nf6 19. fxe5 dxe5 20. Bd2 Qd6 21. exf5 gxf5 22. Nb5 Qe7 23. d6 Qe6 24. Bf4 a6 25. Nc7 Qd5 26. Nxa8 exf4 27. Bxd5+ Nxd5 28. Qf3 fxg3 29. Qxd5+ Kh8 30. Nc7 Be6 31. Qxb7 Rc7 32. dxc7 1-0`,
  },
  {
    id: 'tal-botvinnik-1960-g1', name: 'Tal vs Botvinnik WCh G1', white: 'Tal', black: 'Botvinnik',
    year: 1960, result: '1-0', eco: 'C18', opening: 'French Winawer', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'ataque', 'sacrificio'],
    pgn: `[Event "World Championship"]\n[White "Tal"]\n[Black "Botvinnik"]\n[Result "1-0"]\n\n1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Qc7 7. Nf3 Ne7 8. a4 Nbc6 9. Bd3 Bd7 10. O-O c4 11. Be2 f6 12. Re1 Ng6 13. Ba3 fxe5 14. dxe5 Ncxe5 15. Nxe5 Nxe5 16. Qd4 Ng6 17. Bf3 O-O 18. Bf8 Rxf8 19. Rxe6 Bc6 20. Rae1 Rae8 21. Rxe8 Rxe8 22. Rxe8+ Bxe8 23. Qd2 Qf4 24. Qxf4 Nxf4 25. g3 Nd3 26. Bxd5+ Kf8 27. Bxc4 Nc1 28. Kf1 Nxa2 29. Bd3 Bc6 30. Ke2 Ke7 31. Kd2 Kd6 32. Kc2 Kc5 33. Kb3 Nc1+ 34. Ka3 Nd3 35. f4 Nf2 36. Bc4 Nd1 37. c4 Nc3 38. Kb3 Ne4 39. Ka4 1-0`,
  },
  {
    id: 'botvinnik-tal-1961-g5', name: 'Botvinnik vs Tal WCh Return G5', white: 'Botvinnik', black: 'Tal',
    year: 1961, result: '1-0', eco: 'E69', opening: "King's Indian", event: 'World Championship Return',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'estrategia', 'posicional'],
    pgn: `[Event "World Championship Return"]\n[White "Botvinnik"]\n[Black "Tal"]\n[Result "1-0"]\n\n1. c4 Nf6 2. Nf3 g6 3. g3 Bg7 4. Bg2 O-O 5. d4 d6 6. Nc3 Nbd7 7. O-O e5 8. e4 c6 9. h3 Qb6 10. Re1 exd4 11. Nxd4 Re8 12. Rb1 Nc5 13. b4 Ncd7 14. Qc2 a5 15. b5 Nc5 16. Ba3 Nfd7 17. Nf3 cxb5 18. cxb5 Ne5 19. Nxe5 Bxe5 20. Bxc5 dxc5 21. Nd5 Qd8 22. Rbd1 Be6 23. Qc4 Bg7 24. e5 Bxd5 25. Rxd5 Qe7 26. Rd7 Qe6 27. Qxe6 Rxe6 28. Rd5 Rc8 29. Rxa5 c4 30. Rc5 c3 31. Rxc3 Rxc3 32. e6 fxe6 33. Rxe6 Rxe6 34. Bxb7 Rc2 35. a4 Ra2 36. a5 Rd6 37. a6 Rd8 38. b6 1-0`,
  },
  {
    id: 'spassky-petrosian-1969-g19', name: 'Spassky vs Petrosian WCh G19', white: 'Spassky', black: 'Petrosian',
    year: 1969, result: '1-0', eco: 'B44', opening: 'Sicilian', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'ataque', 'sacrificio'],
    pgn: `[Event "World Championship"]\n[White "Spassky"]\n[Black "Petrosian"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5 d6 6. Bf4 e5 7. Be3 Nf6 8. Bg5 Be6 9. N1c3 a6 10. Bxf6 gxf6 11. Na3 Nd4 12. Nc4 b5 13. Ne3 Be7 14. Bd3 f5 15. O-O f4 16. Nc2 Nxc2 17. Qxc2 Bg5 18. Nd5 Bxd5 19. exd5 Qb6 20. c4 bxc4 21. Bxc4 O-O 22. Kh1 Kh8 23. f3 Rg8 24. Rae1 Rg6 25. Re4 Rag8 26. Qe2 Bf6 27. Qf2 Bg5 28. h4 Bf6 29. Qxa6 Qxa6 30. Bxa6 Bxh4 31. Bc4 Bg3 32. Rfe1 h5 33. Rxf4 exf4 34. Re8 Rxe8 35. Bxf7 1-0`,
  },
  {
    id: 'bronstein-botvinnik-1951-g6', name: 'Bronstein vs Botvinnik WCh G6', white: 'Bronstein', black: 'Botvinnik',
    year: 1951, result: '1-0', eco: 'D44', opening: 'Semi-Slav', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'ataque', 'gambito'],
    pgn: `[Event "World Championship"]\n[White "Bronstein"]\n[Black "Botvinnik"]\n[Result "1-0"]\n\n1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. Nxg5 hxg5 10. Bxg5 Nbd7 11. exf6 Bb7 12. g3 c5 13. d5 Qb6 14. Bg2 O-O-O 15. O-O b4 16. Na4 Qb5 17. a3 exd5 18. axb4 cxb4 19. Be3 Nc5 20. Qg4+ Rd7 21. Qg7 Bxg7 22. fxg7 Rg8 23. Nxc5 Rxg7 24. Rxa7 d4 25. Rxb7 Qxb7 26. Nxb7 Kxb7 27. Bxd4 Rd5 28. Be3 Rf5 29. Rc1 c3 30. bxc3 bxc3 31. Rxc3 1-0`,
  },
  {
    id: 'polugaevsky-nezhmetdinov-1958', name: 'Polugaevsky vs Nezhmetdinov', white: 'Polugaevsky', black: 'Nezhmetdinov',
    year: 1958, result: '0-1', eco: 'B35', opening: 'Sicilian', event: 'Russian Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['sacrificio', 'ataque', 'brillante'],
    pgn: `[Event "Russian Championship"]\n[White "Polugaevsky"]\n[Black "Nezhmetdinov"]\n[Result "0-1"]\n\n1. d4 Nf6 2. c4 d6 3. Nc3 e5 4. e4 exd4 5. Qxd4 Nc6 6. Qd2 g6 7. b3 Bg7 8. Bb2 O-O 9. Bd3 Ng4 10. Nce2 Qh4 11. Ng3 Nge5 12. O-O-O f5 13. Be2 Bh6 14. f4 Nd3+ 15. Bxd3 fxe4 16. Bxe4 Bf5 17. Nf3 Qxf4 18. Bxf5 Qxf5 19. Rhf1 Rae8 20. Nh4 Qe6 21. Bxg7 Kxg7 22. Qd4+ Kh8 23. Qd5 Re5 24. Qxa8 Rxh4 25. Rf3 Nd4 26. Rd3 Nf5 27. Rd1 Bg5+ 28. Kb1 Qe4+ 29. Ka1 Nd4 30. Rd2 Nc2+ 31. Rxc2 Qxc2 32. Nf1 Bf4 33. Qd8 Rh1 34. Qd5 Qxd1 0-1`,
  },
  {
    id: 'boleslavsky-ufimtsev-1944', name: 'Boleslavsky vs Ufimtsev', white: 'Boleslavsky', black: 'Ufimtsev',
    year: 1944, result: '1-0', eco: 'C11', opening: 'French Defense', event: 'USSR Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['ataque', 'apertura'],
    pgn: `[Event "USSR Championship"]\n[White "Boleslavsky"]\n[Black "Ufimtsev"]\n[Result "1-0"]\n\n1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 dxe4 5. Nxe4 Be7 6. Bxf6 gxf6 7. Nf3 f5 8. Nc3 a6 9. g3 b5 10. Bg2 Bb7 11. O-O Nd7 12. Qe2 Bf6 13. Rad1 Qe7 14. Rfe1 O-O-O 15. d5 exd5 16. Nxd5 Bxd5 17. Rxd5 Nb6 18. Rd3 Kb8 19. Nd4 Rhg8 20. Nc6+ Ka8 21. Nxd8 Qxd8 22. Red1 Qe7 23. Qd2 Rd8 24. Bxb7+ Kxb7 25. Qd5+ Nc4 26. Rxd8 Qxd8 27. Qxf5 Qd2 28. Rxd2 Nxd2 29. Qd5+ Kb6 30. Qd4+ Kc6 31. Qxa7 1-0`,
  },
  {
    id: 'kholmov-bronstein-1964', name: 'Kholmov vs Bronstein', white: 'Kholmov', black: 'Bronstein',
    year: 1964, result: '1-0', eco: 'B33', opening: 'Sicilian', event: 'USSR Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['ataque', 'combinacion'],
    pgn: `[Event "USSR Championship"]\n[White "Kholmov"]\n[Black "Bronstein"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Nd5 Be7 10. Bxf6 Bxf6 11. c3 O-O 12. Nc2 Bg5 13. a4 bxa4 14. Rxa4 a5 15. Bc4 Rb8 16. b3 Kh8 17. O-O f5 18. Nce3 fxe4 19. Nf5 Bxf5 20. Rxe4 Bg6 21. Rg4 Bh6 22. Nf6 Rf7 23. Qd5 Nd8 24. Rd1 Qc7 25. h4 Bf4 26. Rxf4 exf4 27. Qd4 Rb6 28. Nxh7 1-0`,
  },
  {
    id: 'lilienthal-capablanca-1936', name: 'Lilienthal vs Capablanca', white: 'Lilienthal', black: 'Capablanca',
    year: 1936, result: '1-0', eco: 'E24', opening: 'Nimzo-Indian', event: 'Moscow',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['sacrificio', 'brillante', 'dama'],
    pgn: `[Event "Moscow"]\n[White "Lilienthal"]\n[Black "Capablanca"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 b6 6. f3 d5 7. Bg5 h6 8. Bh4 Ba6 9. e4 Bxc4 10. Bxc4 dxc4 11. Qa4+ Qd7 12. Qxc4 Qc6 13. Qd3 Nbd7 14. Ne2 Rd8 15. O-O e5 16. Qb1 Qe6 17. dxe5 Nxe5 18. Nd4 Qe7 19. f4 Neg4 20. e5 Nd5 21. h3 Nh2 22. Re1 Nf3+ 23. gxf3 Qg5+ 24. Kxh2 Qxh4 25. Nf5 Kf8 26. Qe4 g6 27. Qf3 Nxc3 28. Re3 Rd2+ 29. Kg1 Qg5+ 30. Kf1 gxf5 31. Rg3 Qd5 32. Qxd5 Nxd5 33. Rg8+ Ke7 34. Rxh8 Rd1+ 35. Ke2 Rxa1 36. Rxh6 c5 37. Rh7 Nc3+ 38. Kd3 Na4 39. Rxa7 Ra3+ 40. Ke2 1-0`,
  },
  {
    id: 'botvinnik-smyslov-1954-g13', name: 'Botvinnik vs Smyslov WCh G13', white: 'Botvinnik', black: 'Smyslov',
    year: 1954, result: '1-0', eco: 'D87', opening: 'Grunfeld', event: 'World Championship',
    whiteElo: null, blackElo: null, era: 'soviet', tags: ['campeonato mundial', 'ataque', 'centro'],
    pgn: `[Event "World Championship"]\n[White "Botvinnik"]\n[Black "Smyslov"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 c5 8. Ne2 Nc6 9. Be3 O-O 10. O-O Qc7 11. Rc1 Rd8 12. Qe1 b6 13. f4 e6 14. Qf2 Na5 15. Bd3 f5 16. e5 Bb7 17. g4 Nc4 18. Bc1 Be4 19. gxf5 Bxd3 20. f6 Bf8 21. Ng3 Bxf1 22. Qxf1 cxd4 23. cxd4 Nd2 24. Qf2 Ne4 25. Nxe4 Qc4 26. Nd6 Qxd4 27. Qxd4 Rxd4 28. Nc8 Ra4 29. f5 gxf5 30. Nxa7 Rxa2 31. Bb2 Be7 32. Nc6 Bf8 33. e6 Bd6 34. Ne5 Bxe5 35. Rc8+ Kg7 36. f7 1-0`,
  },
  // ═══════════════════════════════════════════
  // ERA FISCHER (6 games)
  // ═══════════════════════════════════════════
  {
    id: 'fischer-larsen-1971', name: 'Fischer vs Larsen', white: 'Fischer', black: 'Larsen',
    year: 1971, result: '1-0', eco: 'B88', opening: 'Sicilian', event: 'Candidates',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['6-0', 'candidatos'],
    pgn: `[Event "Candidates"]\n[White "Fischer"]\n[Black "Larsen"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bc4 e6 7. Bb3 Be7 8. Be3 O-O 9. Qe2 Qa5 10. O-O-O a6 11. g4 Nxd4 12. Bxd4 b5 13. g5 Nd7 14. h4 b4 15. Na4 Bb7 16. Qh5 Nc5 17. Nxc5 dxc5 18. Bf6 Bxf6 19. gxf6 g6 20. Qh6 Qd8 21. h5 Qxf6 22. hxg6 Qxg6 23. Rdg1 Qf6 24. Rh5 Rfe8 25. Rf5 Qe7 26. Rg5+ Kf8 27. Rf5 f6 28. Rxf6+ Ke8 29. Qg7 1-0`,
  },
  {
    id: 'fischer-taimanov-1971', name: 'Fischer vs Taimanov', white: 'Fischer', black: 'Taimanov',
    year: 1971, result: '1-0', eco: 'B44', opening: 'Sicilian', event: 'Candidates',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['6-0', 'candidatos'],
    pgn: `[Event "Candidates"]\n[White "Fischer"]\n[Black "Taimanov"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 e6 5. Nb5 d6 6. Bf4 e5 7. Be3 Nf6 8. Bg5 Be6 9. N1c3 a6 10. Bxf6 gxf6 11. Na3 b5 12. Nd5 f5 13. Bd3 Be7 14. Qh5 Rxg8 15. O-O fxe4 16. Bxe4 Bf5 17. c3 Rc8 18. Nb4 Nxb4 19. cxb4 Bxe4 20. Nc2 d5 21. Ne3 Bd6 22. Rfc1 Ke7 23. Rxc8 Qxc8 24. Rc1 Qd7 25. Nxd5+ Kf8 26. Rc7 Qd8 27. Ne3 Bf5 28. Nxf5 Qb8 29. Ra7 Qd8 30. Nd4 exd4 31. Qxd5 1-0`,
  },
  {
    id: 'fischer-petrosian-1971-g1', name: 'Fischer vs Petrosian CF G1', white: 'Fischer', black: 'Petrosian',
    year: 1971, result: '1-0', eco: 'A05', opening: 'Reti', event: 'Candidates Final',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['candidatos', 'apertura'],
    pgn: `[Event "Candidates Final"]\n[White "Fischer"]\n[Black "Petrosian"]\n[Result "1-0"]\n\n1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3 Nc6 5. c3 Nf6 6. Bf4 Bg4 7. Qb3 Na5 8. Qa4+ Bd7 9. Qc2 e6 10. Nf3 Qb6 11. a4 Rc8 12. Nbd2 Nc6 13. Qb1 Nh5 14. Be3 h6 15. Ne5 Nf6 16. h3 Bd6 17. O-O Bxe5 18. dxe5 Nd5 19. Nf3 f6 20. exf6 Nxf6 21. Bd4 Qc7 22. Ne5 Nxe5 23. Bxe5 Qc5 24. Qd1 O-O 25. Bf4 Bc6 26. Qe2 Nd7 27. Be4 e5 28. Bxc6 bxc6 29. Be3 Qb6 30. f4 exf4 31. Bxf4 Rxf4 32. Rxf4 Nf6 33. Raf1 Rf8 34. Qf3 Qe6 35. b3 Nd7 36. c4 dxc4 37. Qxc6 Qxc6 38. Rxf8+ Nxf8 39. Rxf8+ Kxf8 40. bxc4+ 1-0`,
  },
  {
    id: 'fischer-unzicker-1970', name: 'Fischer vs Unzicker', white: 'Fischer', black: 'Unzicker',
    year: 1970, result: '1-0', eco: 'B92', opening: 'Sicilian Najdorf', event: 'Siegen Olympiad',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['olimpiada', 'ataque'],
    pgn: `[Event "Siegen Olympiad"]\n[White "Fischer"]\n[Black "Unzicker"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2 e5 7. Nb3 Be7 8. O-O O-O 9. Be3 Qc7 10. a4 b6 11. f4 Bb7 12. Bf3 Nbd7 13. f5 Nc5 14. Nxc5 bxc5 15. Qd3 Bc6 16. Nd5 Bxd5 17. exd5 Nd7 18. a5 Bf6 19. Bd2 Rfb8 20. b3 Qc8 21. Be4 Nb6 22. Bc3 Nd7 23. g4 Rb4 24. g5 Be7 25. f6 gxf6 26. gxf6 Bd8 27. Kh1 Kh8 28. Rg1 Rg8 29. Rxg8+ Qxg8 30. Rg1 Qf8 31. Qg3 Rb8 32. Qg7+ Qxg7 33. Rxg7 1-0`,
  },
  {
    id: 'fischer-reshevsky-1961', name: 'Fischer vs Reshevsky', white: 'Fischer', black: 'Reshevsky',
    year: 1961, result: '1-0', eco: 'B35', opening: 'Sicilian', event: 'US Championship',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['ataque', 'final'],
    pgn: `[Event "US Championship"]\n[White "Fischer"]\n[Black "Reshevsky"]\n[Result "1-0"]\n\n1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Be3 Nf6 7. Bc4 O-O 8. Bb3 Na5 9. e5 Ne8 10. Bxf7+ Rxf7 11. Nf5 d5 12. Qf3 Rxf5 13. Qxf5 gxf5 14. exd5+ Be6 15. dxe6 Qd6 16. Bf4 Qd4 17. Rd1 Qxb2 18. O-O Nc4 19. Nd5 Ncd6 20. c4 Nxf5 21. Nf6+ Nxf6 22. Rxd8+ Nxd8 23. e7 Nc6 24. Bxd6 exd6 25. e8=Q+ 1-0`,
  },
  {
    id: 'fischer-benko-1963', name: 'Fischer vs Benko', white: 'Fischer', black: 'Benko',
    year: 1963, result: '1-0', eco: 'B09', opening: 'Pirc', event: 'US Championship',
    whiteElo: null, blackElo: null, era: 'fischer', tags: ['miniatura', 'ataque'],
    pgn: `[Event "US Championship"]\n[White "Fischer"]\n[Black "Benko"]\n[Result "1-0"]\n\n1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. f4 Nf6 5. Nf3 O-O 6. Bd3 Na6 7. O-O c5 8. d5 Nc7 9. a4 Rb8 10. a5 a6 11. Qe1 e5 12. dxe6 fxe6 13. fxe5 dxe5 14. Be3 b5 15. axb6 Rxb6 16. Na4 Rb4 17. b3 Ncd5 18. exd5 Nxd5 19. Bc4 Be6 20. Qh4 Bf6 21. Qxb4 cxb4 22. Bxd5 exd5 23. Nc5 Re8 24. Nxe6 Rxe6 25. Ng5 Re7 26. Nf3 1-0`,
  },
  // ═══════════════════════════════════════════
  // ERA MODERN (3 games)
  // ═══════════════════════════════════════════
  {
    id: 'karpov-unzicker-1974', name: 'Karpov vs Unzicker', white: 'Karpov', black: 'Unzicker',
    year: 1974, result: '1-0', eco: 'E15', opening: "Queen's Indian", event: 'Nice Olympiad',
    whiteElo: null, blackElo: null, era: 'modern', tags: ['posicional', 'presion'],
    pgn: `[Event "Nice Olympiad"]\n[White "Karpov"]\n[Black "Unzicker"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6 5. b3 Bb4+ 6. Bd2 Be7 7. Bg2 c6 8. Bc3 d5 9. Ne5 Nfd7 10. Nxd7 Nxd7 11. Nd2 O-O 12. O-O Rc8 13. e4 c5 14. exd5 exd5 15. dxc5 dxc4 16. c6 cxb3 17. Bxa8 Qxa8 18. cxd7 Rd8 19. Nxb3 Rxd7 20. Qe2 Bf8 21. Rfd1 Rxd1+ 22. Rxd1 Bb7 23. Nd4 Bd5 24. Nc6 Bxc6 25. Qe8 Qd5 26. Rxd5 1-0`,
  },
  {
    id: 'kasparov-kramnik-1994', name: 'Kasparov vs Kramnik', white: 'Kasparov', black: 'Kramnik',
    year: 1994, result: '1-0', eco: 'E97', opening: "King's Indian", event: 'Linares',
    whiteElo: 2805, blackElo: 2710, era: 'modern', tags: ['ataque', 'dinamico'],
    pgn: `[Event "Linares"]\n[White "Kasparov"]\n[Black "Kramnik"]\n[Result "1-0"]\n\n1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. f3 f5 11. Be3 f4 12. Bf2 g5 13. Nd3 Ng6 14. c5 Nf6 15. Rc1 Rf7 16. cxd6 cxd6 17. Nb5 g4 18. Nxa7 g3 19. Bg1 gxh2+ 20. Kxh2 Nh5 21. Nc6 bxc6 22. dxc6 Rg7 23. c7 Qf8 24. Nb4 Nf6 25. Nd5 Nxd5 26. exd5 Bh3 27. Kxh3 Nf4+ 28. Kh2 Nxe2 29. Qxe2 Qh6+ 30. Kg2 Qd2 31. Qxd2 1-0`,
  },
  {
    id: 'kasparov-anand-1995-g9', name: 'Kasparov vs Anand PCA WCh G9', white: 'Kasparov', black: 'Anand',
    year: 1995, result: '1-0', eco: 'C80', opening: 'Ruy Lopez', event: 'PCA World Championship',
    whiteElo: 2795, blackElo: 2725, era: 'modern', tags: ['campeonato mundial', 'apertura', 'ataque'],
    pgn: `[Event "PCA World Championship"]\n[White "Kasparov"]\n[Black "Anand"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. Nbd2 Nc5 10. c3 d4 11. Ng5 Bd5 12. Nge4 Nxe4 13. Nxe4 Be7 14. cxd4 Qxd4 15. Qxd4 Nxd4 16. Bd1 O-O 17. f3 f5 18. exf6 Bxf6 19. Nxf6+ gxf6 20. Be3 Nc2 21. Bxc2 Bxf3 22. Rxf3 Rxf3 23. Bd3 Rd8 24. Be2 Rf5 25. Rc1 Rd5 26. Bf3 R5d6 27. Kf2 Rb6 28. b3 Rd2+ 29. Ke1 Rd7 30. Rc8+ Kg7 31. Ke2 Rd6 32. Bxb6 Rxb6 33. Rc7+ Kh6 34. Bd5 Rb8 35. Be4 a5 36. a4 bxa4 37. bxa4 Re8 38. Kd3 Re5 39. Bf3 Kg5 40. Rc5 Kf4 41. Rxe5 Kxe5 42. Kc4 1-0`,
  },
];

export const sampleGames = [
  // === ÉPOCA ROMÁNTICA ===
  {
    name: 'La Inmortal — Anderssen vs Kieseritzky (1851)',
    pgn: `[Event "London"]
[White "Anderssen"]
[Black "Kieseritzky"]
[Result "1-0"]

1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7# 1-0`,
  },
  {
    name: 'La Siempreviva — Anderssen vs Dufresne (1852)',
    pgn: `[Event "Berlin"]
[White "Anderssen"]
[Black "Dufresne"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O d3 8. Qb3 Qf6 9. e5 Qg6 10. Re1 Nge7 11. Ba3 b5 12. Qxb5 Rb8 13. Qa4 Bb6 14. Nbd2 Bb7 15. Ne4 Qf5 16. Bxd3 Qh5 17. Nf6+ gxf6 18. exf6 Rg8 19. Rad1 Qxf3 20. Rxe7+ Nxe7 21. Qxd7+ Kxd7 22. Bf5+ Ke8 23. Bd7+ Kf8 24. Bxe7# 1-0`,
  },
  {
    name: 'Opera Game — Morphy vs Duques (1858)',
    pgn: `[Event "Paris Opera"]
[White "Morphy"]
[Black "Duke/Count"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`,
  },

  // === FISCHER Y LA ERA MODERNA ===
  {
    name: 'Game of the Century — Byrne vs Fischer (1956)',
    pgn: `[Event "New York"]
[White "Byrne"]
[Black "Fischer"]
[Result "0-1"]

1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4 7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 Na4 12. Qa3 Nxc3 13. bxc3 Nxe4 14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+ 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4 Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1 29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1 Ng3+ 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+ 41. Kc1 Rc2# 0-1`,
  },
  {
    name: 'Fischer vs Spassky — Match del Siglo, Partida 6 (1972)',
    pgn: `[Event "World Championship"]
[White "Fischer"]
[Black "Spassky"]
[Result "1-0"]

1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7 17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7 22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5 27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7 32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8 37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0`,
  },

  // === KASPAROV ===
  {
    name: 'Kasparov vs Topalov — Wijk aan Zee (1999)',
    pgn: `[Event "Wijk aan Zee"]
[White "Kasparov"]
[Black "Topalov"]
[Result "1-0"]

1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3 b5 7. Nge2 Nbd7 8. Bh6 Bxh6 9. Qxh6 Bb7 10. a3 e5 11. O-O-O Qe7 12. Kb1 a6 13. Nc1 O-O-O 14. Nb3 exd4 15. Rxd4 c5 16. Rd1 Nb6 17. g3 Kb8 18. Na5 Ba8 19. Bh3 d5 20. Qf4+ Ka7 21. Re1 d4 22. Nd5 Nbxd5 23. exd5 Qd6 24. Rxd4 cxd4 25. Re7+ Kb6 26. Qxd4+ Kxa5 27. b4+ Ka4 28. Qc3 Qxd5 29. Ra7 Bb7 30. Rxb7 Qc4 31. Qxf6 Kxa3 32. Qxa6+ Kxb4 33. c3+ Kxc3 34. Qa1+ Kd2 35. Qb2+ Kd1 36. Bf1 Rd2 37. Rd7 Rxd7 38. Bxc4 bxc4 39. Qxh8 Rd3 40. Qa8 c3 41. Qa4+ Ke1 42. f4 f5 43. Kc1 Rd2 44. Qa7 1-0`,
  },
  {
    name: 'Kasparov vs Karpov — Campeonato Mundial, P16 (1985)',
    pgn: `[Event "World Championship"]
[White "Kasparov"]
[Black "Karpov"]
[Result "1-0"]

1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5 d6 6. c4 Nf6 7. N1c3 a6 8. Na3 d5 9. cxd5 exd5 10. exd5 Nb4 11. Be2 Bc5 12. O-O O-O 13. Bf3 Bf5 14. Bg5 Re8 15. Qd2 b5 16. Rad1 Nd3 17. Nab1 h6 18. Bh4 b4 19. Na4 Bd6 20. Bg3 Rc8 21. b3 g5 22. Bxd6 Qxd6 23. g3 Nd7 24. Bg2 Qf6 25. a3 a5 26. axb4 axb4 27. Qa2 Bg6 28. d6 g4 29. Qd2 Kg7 30. f3 Qxd6 31. fxg4 Qd4+ 32. Kh1 Nf6 33. Rf4 Ne4 34. Qxd3 Nf2+ 35. Rxf2 Bxd3 36. Rfd2 Qe3 37. Rxd3 Rc1 38. Nb2 Qf2 39. Nd2 Rxd1+ 40. Nxd1 Re1+ 1-0`,
  },

  // === KARPOV ===
  {
    name: 'Karpov vs Kasparov — Campeonato Mundial, P9 (1985)',
    pgn: `[Event "World Championship"]
[White "Karpov"]
[Black "Kasparov"]
[Result "0-1"]

1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 c5 8. Ne2 Nc6 9. Be3 O-O 10. O-O Bg4 11. f3 Na5 12. Bxf7+ Rxf7 13. fxg4 Rxf1+ 14. Kxf1 Qd6 15. Kg1 Qe6 16. Qd3 Qxg4 17. d5 Rd8 18. Rd1 Nc4 19. Bc1 c4 20. Qf3 Qxf3 21. gxf3 Bxc3 22. Ng3 Bd4+ 23. Kf1 e5 24. dxe6 Rxd1+ 25. Ke2 Rd2+ 26. Ke1 Rxa2 27. e7 Nd2 0-1`,
  },

  // === TAL ===
  {
    name: 'Tal vs Larsen — Candidatos (1965)',
    pgn: `[Event "Candidates"]
[White "Tal"]
[Black "Larsen"]
[Result "1-0"]

1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 e6 5. Nc3 d6 6. Be3 Nf6 7. f4 Be7 8. Qf3 O-O 9. O-O-O Qc7 10. Ndb5 Qb8 11. g4 a6 12. Nd4 Nxd4 13. Bxd4 b5 14. g5 Nd7 15. Bd3 b4 16. Nd5 exd5 17. exd5 f5 18. gxf6 Nxf6 19. Bxf6 Bxf6 20. Bxh7+ Kxh7 21. Qh5+ Kg8 22. Rdg1 Qe8 23. Qh7+ Kf7 24. Rg6 Qe3+ 25. Kb1 Be7 26. Rhg1 Rf6 27. Rxf6+ Bxf6 28. Qh5+ Ke7 29. Qg6 Qe1+ 30. Ka2 Qa5+ 31. Kb1 Qe1+ 32. Ka2 Qa5+ 33. Kb3 a5 34. Qf7+ Kd8 35. Qxf6+ gxf6 36. Rg8+ 1-0`,
  },

  // === CAPABLANCA ===
  {
    name: 'Capablanca vs Marshall — Gambito Marshall (1918)',
    pgn: `[Event "New York"]
[White "Capablanca"]
[Black "Marshall"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 Nf6 12. Re1 Bd6 13. h3 Ng4 14. Qf3 Qh4 15. d4 Nxf2 16. Re2 Bg4 17. hxg4 Bh2+ 18. Kf1 Bg3 19. Rxf2 Qh1+ 20. Ke2 Bxf2 21. Bd2 Bh4 22. Qh3 Rae8+ 23. Kd3 Qf1+ 24. Kc2 Bf2 25. Qf3 Qg1 26. Bd5 c5 27. dxc5 Bxc5 28. b4 Bd6 29. a4 a5 30. axb5 axb4 31. Ra6 bxc3 32. Nxc3 Bb4 33. b6 Bxc3 34. Bxc3 h6 35. b7 Re3 36. Bxf7+ 1-0`,
  },

  // === ALEKHINE ===
  {
    name: 'Alekhine vs Reti — Baden-Baden (1925)',
    pgn: `[Event "Baden-Baden"]
[White "Alekhine"]
[Black "Reti"]
[Result "1-0"]

1. e4 c5 2. Nf3 Nf6 3. e5 Nd5 4. Nc3 e6 5. Nxd5 exd5 6. d4 Nc6 7. dxc5 Bxc5 8. Qxd5 Qb6 9. Bc4 Bxf2+ 10. Ke2 O-O 11. Rf1 Bc5 12. Ng5 Re8 13. Qxf7+ Kh8 14. Bf4 Nd4+ 15. Kd2 b5 16. Qg8+ Rxg8 17. Bf7# 1-0`,
  },

  // === CARLSEN ===
  {
    name: 'Carlsen vs Anand — Campeonato Mundial, P6 (2013)',
    pgn: `[Event "World Championship"]
[White "Carlsen"]
[Black "Anand"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Bc5 5. O-O d6 6. Re1 O-O 7. Bxc6 bxc6 8. h3 Re8 9. Nbd2 Nd7 10. Nc4 Bb6 11. a4 a5 12. Nxb6 cxb6 13. d4 f6 14. Be3 Bb7 15. c4 Re7 16. Rc1 Qf8 17. d5 c5 18. b4 axb4 19. a5 bxa5 20. Nh2 Bc8 21. Nf1 Bd7 22. Ng3 g6 23. Bd2 Ra6 24. Qf3 Qg7 25. Be3 Kh8 26. Nf1 Nf8 27. Nd2 Ne6 28. Nb3 Kg8 29. Re2 Nf4 30. Bxf4 exf4 31. e5 fxe5 32. Rxe5 Rxe5 33. Qxf4 Rf5 34. Qd2 Rf6 35. Qxa5 Qa7 36. Qc3 Qb7 37. Nd2 Bf5 38. Ne4 Rf7 39. Rb1 Bxe4 40. Qxe4 b3 41. Rxb3 Ra1+ 42. Kh2 Qa6 43. Rb6 Qa7 44. Rb3 Ra2 45. f3 Qa4 46. Rb4 Qa6 47. Qe2 Qc6 48. Rb6 Qd7 49. Qd3 Ra5 50. Qd1 Ra2 51. Qb1 Ra5 52. g4 g5 53. Qb4 Ra1 54. Rb8+ Kg7 55. Rb7 Rf8 56. Qd2 Ra7 57. Rxa7 Qxa7 58. Qxg5+ Kh8 59. Qe5+ Kg8 60. g5 Qb7 61. g6 1-0`,
  },
  {
    name: 'Aronian vs Carlsen — Wijk aan Zee (2008)',
    pgn: `[Event "Wijk aan Zee"]
[White "Aronian"]
[Black "Carlsen"]
[Result "0-1"]

1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 e6 5. Bg5 h6 6. Bh4 dxc4 7. e4 g5 8. Bg3 b5 9. Be2 Bb7 10. O-O Nbd7 11. Ne5 Bg7 12. Nxd7 Nxd7 13. Bd6 a6 14. a4 e5 15. d5 Qf6 16. dxc6 Bxc6 17. axb5 axb5 18. Rxa8+ Bxa8 19. Nxb5 O-O 20. Nc7 Bc6 21. Nd5 Bxd5 22. exd5 Qd4 23. d6 e4 24. Bg4 Ne5 25. Be6 fxe6 26. Qd1 Rf6 27. d7 Nxd7 28. Bc7 Qf2+ 29. Kh1 Qe3 30. Qa4 Nc5 31. Qa8+ Kh7 32. Qa2 Bd4 33. Qe2 Qd3 34. Qxd3 exd3 35. Rd1 Rf3 36. Be5 Bxe5 37. Rxd3 Rxf2 38. Re3 Bf4 39. Re7+ Kg6 40. b3 cxb3 41. Rb7 Nd3 42. h3 Be5 0-1`,
  },

  // === PARTIDAS INSTRUCTIVAS ===
  {
    name: 'Siciliana Najdorf — partida modelo',
    pgn: `[Event "Example"]
[White "White"]
[Black "Black"]
[Result "*"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 Qc7 9. O-O-O Nbd7 10. g4 b5 11. Bxf6 Nxf6 12. g5 Nd7 13. f5 Nc5 14. f6 gxf6 15. gxf6 Bf8 *`,
  },
  {
    name: 'Miniatura Fried Liver — Fegatello Attack',
    pgn: `[Event "Example"]
[White "White"]
[Black "Black"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3 Nb4 9. a3 Nxc2+ 10. Kd1 Nxa1 11. Nxd5 Kd6 12. d4 Be6 13. dxe5+ Kd7 14. Bf4 Qf6 15. Bxe6+ Kc6 16. Rc1+ Kb6 17. e6+ Ka6 18. Qa8# 1-0`,
  },
  {
    name: 'Mate Pastor — Scholar\'s Mate',
    pgn: `[Event "Example"]
[White "White"]
[Black "Black"]
[Result "1-0"]

1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7# 1-0`,
  },
]

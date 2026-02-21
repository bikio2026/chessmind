import { useMemo } from 'react'
import { Chess } from 'chess.js'
import { formatScore, pvToSan } from '../lib/stockfishParser'
import { Cpu, Loader2, Crown, Handshake } from 'lucide-react'

export function EnginePanel({ lines, isAnalyzing, isReady, currentFen, isGameOver, turn, engineLabel }) {
  // Convert PV lines from UCI to SAN
  const displayLines = useMemo(() => {
    return lines.map(line => {
      const sanMoves = pvToSan(Chess, currentFen, line.pv, 8)
      return {
        ...line,
        sanMoves,
        displayScore: formatScore(line.score),
      }
    })
  }, [lines, currentFen])

  if (!isReady) {
    return (
      <div className="bg-surface-alt rounded-lg p-4">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Cpu size={14} />
          Motor de Análisis
        </h2>
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Loader2 size={14} className="animate-spin" />
          Cargando Stockfish... (puede tardar unos segundos)
        </div>
        <p className="text-xs text-text-muted mt-1 opacity-60">
          Si tarda más de 15s, se intentará con la versión lite
        </p>
      </div>
    )
  }

  return (
    <div className="bg-surface-alt rounded-lg p-3">
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Cpu size={14} />
        {engineLabel || 'Motor de Análisis'}
        {isAnalyzing && (
          <Loader2 size={12} className="animate-spin text-accent" />
        )}
        {displayLines[0]?.depth > 0 && (
          <span className="ml-auto text-text-muted font-normal">
            d={displayLines[0].depth}
          </span>
        )}
      </h2>

      {isGameOver ? (
        <div className="flex items-center gap-2 text-sm">
          {(() => {
            // In checkmate: turn indicates who must move (the loser)
            // If turn is 'w', white is checkmated → black wins
            try {
              const game = new Chess(currentFen)
              if (game.isCheckmate()) {
                const winner = turn === 'w' ? 'Negras' : 'Blancas'
                return (
                  <>
                    <Crown size={16} className="text-accent" />
                    <span className="font-semibold text-text">Jaque mate — Ganan las {winner}</span>
                  </>
                )
              }
              if (game.isStalemate()) {
                return (
                  <>
                    <Handshake size={16} className="text-text-dim" />
                    <span className="font-semibold text-text">Ahogado — Tablas</span>
                  </>
                )
              }
              if (game.isDraw()) {
                return (
                  <>
                    <Handshake size={16} className="text-text-dim" />
                    <span className="font-semibold text-text">Tablas</span>
                  </>
                )
              }
            } catch {
              // fallback
            }
            return <span className="text-text">Partida terminada</span>
          })()}
        </div>
      ) : displayLines.length === 0 ? (
        <p className="text-text-muted text-sm italic">
          {isAnalyzing ? 'Analizando...' : 'Mové una pieza para iniciar el análisis'}
        </p>
      ) : (
        <div className="space-y-1.5">
          {displayLines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className={`shrink-0 w-12 text-right font-mono text-sm font-bold ${
                  line.score?.value > 0 ? 'text-move-good' :
                  line.score?.value < 0 ? 'text-move-bad' :
                  'text-text-dim'
                }`}
              >
                {line.displayScore}
              </span>
              <span className="font-mono text-sm text-text-dim leading-relaxed break-all">
                {line.sanMoves.join(' ')}
              </span>
            </div>
          ))}

          {/* WDL display for first line */}
          {displayLines[0]?.wdl && (
            <div className="flex gap-3 mt-2 pt-2 border-t border-surface-light text-xs text-text-muted">
              <span>Win: <span className="text-move-good">{(displayLines[0].wdl.win / 10).toFixed(1)}%</span></span>
              <span>Draw: <span className="text-text-dim">{(displayLines[0].wdl.draw / 10).toFixed(1)}%</span></span>
              <span>Loss: <span className="text-move-bad">{(displayLines[0].wdl.loss / 10).toFixed(1)}%</span></span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

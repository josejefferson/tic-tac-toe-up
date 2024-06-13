import { Button, Grid, Text } from '@chakra-ui/react'
import { GameSymbol } from '../../../shared/game/types'
import { Game } from '../../utils/game'
import { ImCross, ImRadioUnchecked } from 'react-icons/im'
import { ReactNode } from 'react'

interface BoardProps {
  game: Game
  me: GameSymbol
  onPlace: (position: number) => void
}

const SYMBOLS: Record<GameSymbol, ReactNode> = {
  X: <ImCross size={36} />,
  O: <ImRadioUnchecked size={36} />
}

export function Board({ game, me, onPlace }: BoardProps) {
  const isOld = (position: number) => {
    const cell = game.board[position]
    if (cell.order === -1) return false
    return cell.order < game.order - (Game.MAX_SYMBOLS - 1)
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(3, 1fr)" gap={2} bg="black" w={300} h={300}>
      {game.board.map((cell, i) => (
        <Button
          h="full"
          rounded={0}
          bg="white"
          key={i}
          onClick={() => onPlace(i)}
          isDisabled={game.turn !== me || !!cell.symbol}
          fontSize="5xl"
          _disabled={{ bg: 'white', pointerEvents: 'none' }}
          color={cell.symbol === 'X' ? 'red.500' : 'blue.500'}
          className={game.winnerPattern?.includes(i) ? 'win-pattern' : undefined}
        >
          <Text fontWeight="bold" opacity={isOld(i) ? 0.5 : 1}>
            {SYMBOLS[cell.symbol!]}
          </Text>
        </Button>
      ))}
    </Grid>
  )
}

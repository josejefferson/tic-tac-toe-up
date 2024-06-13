import { Box, Button, Collapse, Flex, Text } from '@chakra-ui/react'
import { useSocket } from '@josejefferson/socket.io-react-hook'
import { useImmer } from 'use-immer'
import { SocketEventGameInit, SocketEventPlace, SocketEventStarted } from '../../types/socket'
import { Game } from '../../utils/game'
import { useSocketEvent } from '../../utils/socket'
import { Board } from './board'
import { useEffect } from 'react'

interface GameProps {
  data: SocketEventStarted[0]
}

export function GameView({ data }: GameProps) {
  const { socket } = useSocket()
  const [game, setGame] = useImmer<Game>(Object.assign(new Game(), data.game))
  useEffect(() => setGame(Object.assign(new Game(), data.game)), [data, setGame])

  const myTurn = data.player.symbol === game.turn

  const sendPlace = useSocketEvent<SocketEventPlace>('place', onPlace)
  useSocketEvent<SocketEventGameInit>('gameInit', onInit)

  function onInit(newGame: Game) {
    setGame(Object.assign(new Game(), newGame))
  }

  function onPlace(position: number) {
    setGame((game) => {
      game.place(position)
    })
  }

  function handlePlace(position: number) {
    void sendPlace(position)
    onPlace(position)
  }

  return (
    <Flex w="full" align="center" direction="column" gap={6} textAlign="center">
      <Collapse animateOpacity in={!game.winner}>
        <Text fontSize="3xl" fontStyle="italic" color="gray.500" hidden={myTurn}>
          Waiting for the other player...
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="primary.500" hidden={!myTurn}>
          YOUR TURN!
        </Text>
      </Collapse>

      <Board game={game} me={data.player.symbol} onPlace={handlePlace} />

      <Collapse animateOpacity in={!!game.winner}>
        <Box textAlign="center">
          {game.winner === data.player.symbol ? (
            <Text fontSize="4xl" color="green.500">
              You won! Congratulations!
            </Text>
          ) : (
            <Text fontSize="4xl" color="red.500">
              You lost! Better luck next time!
            </Text>
          )}

          <Button mt={2} onClick={() => socket.emit('restart')} colorScheme="blue" variant="outline">
            {game.winner === data.player.symbol ? 'New Match' : 'Rematch'}
          </Button>
        </Box>
      </Collapse>
    </Flex>
  )
}

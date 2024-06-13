import { IoProvider } from '@josejefferson/socket.io-react-hook'
import { useAtom } from 'jotai'
import { ConnectionModal } from '../../../components/game/connection-modal'
import { useSocketException } from '../../../components/game/exception'
import { stateAtom } from '../../../components/game/state'
import { GameView } from '../../../components/game/view'
import { SocketEventStarted } from '../../../types/socket'
import { useSocketEvent } from '../../../utils/socket'

export default function Page() {
  return (
    <IoProvider>
      <GameProvider />
      <Modals />
    </IoProvider>
  )
}

function GameProvider() {
  const [state, setState] = useAtom(stateAtom)
  useSocketException()

  useSocketEvent<SocketEventStarted>('started', (event) => {
    setState(event)
  })
  return <GameView data={state} />
}

function Modals() {
  return <ConnectionModal />
}

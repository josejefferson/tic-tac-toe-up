import { immerable } from 'immer'
import { Game as GameOriginal } from '../../shared/game/game'

export class Game extends GameOriginal {
  [immerable] = true
}

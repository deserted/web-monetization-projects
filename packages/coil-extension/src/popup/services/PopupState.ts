import { LocalStorageProxy } from '../../types/storage'
import { User } from '../../types/user'
import { StorageService } from '../../services/storage'
import { PlayOrPauseState, StickyState } from '../../types/streamControls'

const STORAGE_KEYS = [
  'adapted',
  'coilSite',
  'monetized',
  'monetizedFavicon',
  'monetizedTotal',
  'isPaying',
  'stickyState',
  'playState',
  'user',
  'validToken',
  'extensionBuildString'
]

export type PopupStateType = Omit<LocalStorageProxy, 'token'>

// TODO: replace this stupid thing with a Proxy that doesn't require maintenance
// of STORAGE_KEYS lists etc
export class PopupState implements PopupStateType {
  readonly adapted!: boolean
  readonly stickyState!: StickyState
  readonly playState!: PlayOrPauseState
  readonly coilSite!: string
  readonly monetized!: boolean
  readonly monetizedFavicon!: string
  readonly monetizedTotal!: number
  readonly isPaying!: boolean
  readonly user!: User
  readonly validToken!: boolean
  readonly extensionBuildString!: string

  constructor(private storage: Pick<StorageService, 'get'>) {}

  get loggedIn() {
    return Boolean(this.validToken)
  }

  sync(keys = STORAGE_KEYS) {
    const thisAny = this as any
    keys.forEach(key => {
      thisAny[key] = this.storage.get(key)
    })
  }
}

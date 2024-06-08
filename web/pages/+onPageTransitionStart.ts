import type { OnPageTransitionStartAsync } from 'vike/types'
import NProgress from 'nprogress'

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  NProgress.start()
}

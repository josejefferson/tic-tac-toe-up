import type { OnPageTransitionEndAsync } from 'vike/types'
import NProgress from 'nprogress'

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  NProgress.done(false)
}

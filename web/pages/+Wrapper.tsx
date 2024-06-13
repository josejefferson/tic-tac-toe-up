import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)
dayjs.extend(utc)

import { ChakraProvider } from '@chakra-ui/react'
import { useMemo, type PropsWithChildren } from 'react'
import { CookiesProvider } from 'react-cookie'
import { ErrorBoundary } from 'react-error-boundary'
import { IconContext } from 'react-icons'
import { SWRConfig } from 'swr'
import { ForceTheme } from '../components/common/force-theme'
import { PageErrorDev } from '../components/common/page-error-dev'
import { PageErrorProd } from '../components/common/page-error-prod'
import { swrOptions } from '../config/swr'
import { theme } from '../config/theme'

export function Wrapper({ children }: PropsWithChildren) {
  const isDev = import.meta.env.MODE === 'development'
  const PageError = isDev ? PageErrorDev : PageErrorProd

  return (
    <IconContext.Provider value={useMemo(() => ({ size: '24' }), [])}>
      <CookiesProvider>
        <ChakraProvider theme={theme}>
          <ErrorBoundary FallbackComponent={PageError}>
            <SWRConfig value={swrOptions}>
              <ForceTheme />
              {children}
            </SWRConfig>
          </ErrorBoundary>
        </ChakraProvider>
      </CookiesProvider>
    </IconContext.Provider>
  )
}

import { useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'

export function ForceTheme() {
  const { colorMode, setColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode === 'dark') setColorMode('light')
  }, [colorMode, setColorMode])

  return null
}

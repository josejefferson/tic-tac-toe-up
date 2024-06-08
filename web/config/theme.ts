import { Tooltip, baseTheme, extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/rubik'

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    body: '"Rubik Variable", Roboto, Arial, sans-serif',
    heading: '"Rubik Variable", Roboto, Arial, sans-serif'
  },
  colors: {
    primary: baseTheme.colors.red,
    secondary: baseTheme.colors.blue
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: '400'
      }
    },
    Button: {
      baseStyle: {
        variant: 'ghost',
        fontWeight: '400'
      }
    },
    Link: {
      baseStyle: {
        '&:hover': {
          textDecoration: 'none'
        }
      }
    },
    FormLabel: {
      baseStyle: {
        fontWeight: 'normal'
      }
    }
  }
})

Tooltip.defaultProps = { hasArrow: true }

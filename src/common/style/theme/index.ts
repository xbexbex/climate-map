import { createTheme, PaletteColor, PaletteColorOptions } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import { Roboto, Raleway } from '@next/font/google'
import '@mui/material/styles/createPalette'

//extending palette to add background color

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    grays: PaletteColor
  }
  interface PaletteOptions {
    grays: PaletteColorOptions
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    buttonSmall: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    buttonSmall?: React.CSSProperties
  }

  interface ZIndex {
    popup: number
  }

  interface ThemeOptions {
    zIndex?: Partial<ZIndex> | undefined
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    buttonSmall: true
  }
}

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: [
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
  ],
})

export const raleway = Raleway({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: [
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
  ],
})

const palette = {
  primary: { main: '#C7C9B8', dark: '#AFB29A', light: '#D7D9CC', lighter: '#EBECE6' },
  secondary: { dark: '#274AFF', main: '#5d77ff', light: '#b3bfff' },
  grays: {
    main: '#D9D9D9',
    light: '#F6F4F4',
    dark: '#A0A0A0',
    darker: '#000000',
    lighter: '#FFFFFF',
  },
  info: { dark: '#EA7101', main: '#F09C4D' },
  warning: { main: '#EA7101' },
}

const shape = {
  borderRadius: 0,
}

const zIndex = {
  modal: 1200,
  snackbar: 1400,
  drawer: 1100,
  appBar: 1300,
  mobileStepper: 1000,
  popup: 1350,
  tooltip: 1500,
}

const fonts = {
  0: roboto.style.fontFamily,
  1: raleway.style.fontFamily,
}

const typography: TypographyOptions = {
  body1: {
    fontFamily: fonts[0],
  },
  body2: {
    fontFamily: fonts[1],
  },
  h1: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    lineHeight: '1.35417em',
    fontSize: '1.5rem',
    fontWeight: 400,
  },
  button: {
    textTransform: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    fontSize: '1rem',
    fontWeight: 500,
  },
  buttonSmall: {
    textTransform: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    fontSize: '1rem',
    fontWeight: 500,
  },
  caption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontFamily: fonts[0],
    lineHeight: '1.375em',
    fontSize: '0.75rem',
    fontWeight: 400,
  },
  h2: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    lineHeight: '1.16667em',
    fontSize: '1.3125rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  h3: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    lineHeight: '1.16667em',
    fontSize: '1.3125rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },

  h4: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    lineHeight: '1.5em',
    fontSize: '1.2rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },

  h5: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    lineHeight: '1.5em',
    fontSize: '1.1rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
  },

  h6: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: fonts[0],
    lineHeight: '1.5em',
    fontSize: '1.0rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  fontFamily: fonts[0],
}

const components = {
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:last-child td': {
          borderBottom: 0,
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
        },
        '&:hover': {
          scrollbarColor: 'darkgray lightgray',
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'darkgray',
          },
        },
      },
    },
  },
}

export default createTheme({ palette, components, typography, zIndex, shape })

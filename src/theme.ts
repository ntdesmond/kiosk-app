import {
  extendTheme,
  withDefaultColorScheme,
  type Colors,
  type ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Base colors from https://innopolisu.notion.site/53c82d022bec45caa9d56dc93ab7e18f
// Palettes generated with https://smart-swatch.netlify.app
const colors: Colors = {
  green: {
    main: '#40BA21',
    50: '#e7fde1',
    100: '#c6f4ba',
    200: '#a3ec91',
    300: '#80e466',
    400: '#5ddc3c',
    500: '#43c323',
    600: '#329819',
    700: '#226c10',
    800: '#114207',
    900: '#001800',
  },
  teal: {
    main: '#17B69C',
    50: '#dafffa',
    100: '#b3f8ed',
    200: '#89f2e1',
    300: '#5eebd4',
    400: '#33e5c8',
    500: '#1accaf',
    600: '#0a9e88',
    700: '#007161',
    800: '#00453a',
    900: '#001913',
  },
  gray: {
    main: '#91A3B0',
    50: '#e5f5fb',
    100: '#cedbe3',
    200: '#b4c1cb',
    300: '#97a8b4',
    400: '#7a8f9e',
    500: '#617685',
    600: '#4b5c68',
    700: '#34414b',
    800: '#1d2730',
    900: '#030e17',
  },
  blue: {
    main: '#0071CE',
    50: '#dbf4ff',
    100: '#adddff',
    200: '#7cc5ff',
    300: '#4aaeff',
    400: '#1a97ff',
    500: '#007ee6',
    600: '#0062b4',
    700: '#004682',
    800: '#002a51',
    900: '#000f21',
  },
  purple: {
    main: '#826BE9',
    50: '#ece8ff',
    100: '#c7bbf9',
    200: '#a190f0',
    300: '#7c64e8',
    400: '#5637e0',
    500: '#3e1fc7',
    600: '#2f179b',
    700: '#221070',
    800: '#130945',
    900: '#08021c',
  },
  yellow: {
    main: '#FFE302',
    50: '#fffcda',
    100: '#fff7ad',
    200: '#fff17d',
    300: '#ffeb4b',
    400: '#ffe61a',
    500: '#e6cc00',
    600: '#b39f00',
    700: '#807100',
    800: '#4d4400',
    900: '#1c1700',
  },
  darkblue: '#194288',
  lightpurple: '#9681F2',
  lightgray: '#EDF1F5',
  black: '#000000',
  deepblue: '#12152A',
  lightblue: '#C5D9E7',
  darkgray: '#333333',
};

const fonts = {
  heading: "'Montserrat Variable', sans-serif",
  body: "'IBM Plex Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

const theme = extendTheme(
  {
    config,
    colors,
    fonts,
  },
  withDefaultColorScheme({ colorScheme: 'green', components: ['Button'] }),
);

export default theme;

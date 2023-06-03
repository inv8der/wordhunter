import baseColors from 'tailwindcss/colors'

// console.log(baseColors)

const colors = {
  /** Base colors copied from the default Chakra-UI theme */
  initial: 'initial',
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000000',
  white: '#ffffff',
  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },
  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },
  gray: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#a0aec0',
    500: '#718096',
    600: '#4a5568',
    700: '#2d3748',
    800: '#1a202c',
    900: '#171923',
  },
  red: {
    50: '#fff5f5',
    100: '#fed7d7',
    200: '#feb2b2',
    300: '#fc8181',
    400: '#f56565',
    500: '#e53e3e',
    600: '#c53030',
    700: '#9b2c2c',
    800: '#822727',
    900: '#63171b',
  },
  orange: {
    50: '#fffaf0',
    100: '#feebc8',
    200: '#fbd38d',
    300: '#f6ad55',
    400: '#ed8936',
    500: '#dd6b20',
    600: '#c05621',
    700: '#9c4221',
    800: '#7b341e',
    900: '#652b19',
  },
  yellow: {
    50: '#fffff0',
    100: '#fefcbf',
    200: '#faf089',
    300: '#f6e05e',
    400: '#ecc94b',
    500: '#d69e2e',
    600: '#b7791f',
    700: '#975a16',
    800: '#744210',
    900: '#5f370e',
  },
  green: {
    50: '#f0fff4',
    100: '#c6f6d5',
    200: '#9ae6b4',
    300: '#68d391',
    400: '#48bb78',
    500: '#38a169',
    600: '#2f855a',
    700: '#276749',
    800: '#22543d',
    900: '#1c4532',
  },
  teal: {
    50: '#e6fffa',
    100: '#b2f5ea',
    200: '#81e6d9',
    300: '#4fd1c5',
    400: '#38b2ac',
    500: '#319795',
    600: '#2c7a7b',
    700: '#285e61',
    800: '#234e52',
    900: '#1d4044',
  },
  blue: {
    50: '#ebf8ff',
    100: '#bee3f8',
    200: '#90cdf4',
    300: '#63b3ed',
    400: '#4299e1',
    500: '#3182ce',
    600: '#2b6cb0',
    700: '#2c5282',
    800: '#2a4365',
    900: '#1a365d',
  },
  cyan: {
    50: '#edfdfd',
    100: '#c4f1f9',
    200: '#9decf9',
    300: '#76e4f7',
    400: '#0bc5ea',
    500: '#00b5d8',
    600: '#00a3c4',
    700: '#0987a0',
    800: '#086f83',
    900: '#065666',
  },
  purple: {
    50: '#faf5ff',
    100: '#e9d8fd',
    200: '#d6bcfa',
    300: '#b794f4',
    400: '#9f7aea',
    500: '#805ad5',
    600: '#6b46c1',
    700: '#553c9a',
    800: '#44337a',
    900: '#322659',
  },
  pink: {
    50: '#fff5f7',
    100: '#fed7e2',
    200: '#fbb6ce',
    300: '#f687b3',
    400: '#ed64a6',
    500: '#d53f8c',
    600: '#b83280',
    700: '#97266d',
    800: '#702459',
    900: '#521b41',
  },
  /** Custom colors created using https://themera.vercel.app and https://www.color-name.com */
  lightMint: {
    50: '#e5fff4',
    100: '#b8ffdf',
    200: '#8affca',
    300: '#5cffb6',
    400: '#2effa1',
    500: '#00ff8d',
    600: '#00cc70',
    700: '#009954',
    800: '#006638',
    900: '#00331c',
  },
  mint: {
    50: '#ecf8f4',
    100: '#caede0',
    200: '#a8e1CC',
    300: '#86d5b8',
    400: '#63c9a4',
    500: '#41be90',
    600: '#349873',
    700: '#277257',
    800: '#1a4c3a',
    900: '#0d261d',
  },
  seaGreen: {
    50: '#e9fbfa',
    100: '#c2f4f1',
    200: '#9cede9',
    300: '#75e6e0',
    400: '#4edfd7',
    500: '#27d8ce',
    600: '#1fada5',
    700: '#17827c',
    800: '#105653',
    900: '#082b29',
  },
  spiroDiscoBall: {
    50: '#e6f8ff',
    100: '#b8ecfe',
    200: '#8be1fe',
    300: '#5ed5fd',
    400: '#30c9fc',
    500: '#03bdfc',
    600: '#0397c9',
    700: '#027197',
    800: '#014c65',
    900: '#012632',
  },
  metallicYellow: {
    50: '#fffae6',
    100: '#fff0b8',
    200: '#ffe78a',
    300: '#fedd5c',
    400: '#fed42f',
    500: '#fecb01',
    600: '#cba201',
    700: '#987a01',
    800: '#665100',
    900: '#332900',
  },
  mikadoYellow: {
    50: '#fff9e6',
    100: '#feedb8',
    200: '#fee28b',
    300: '#fdd65e',
    400: '#fccb30',
    500: '#fcbf03',
    600: '#c99903',
    700: '#977302',
    800: '#654c01',
    900: '#322601',
  },
}

type C = keyof typeof colors

export default colors

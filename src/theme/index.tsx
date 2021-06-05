import React, { useMemo } from 'react'
import { Text, TextProps } from 'rebass'
import styled, {
    DefaultTheme,
    ThemeProvider as StyledComponentsThemeProvider,
    createGlobalStyle,
    css
} from 'styled-components'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
    upToExtra2Small: 320,
    upToExtraSmall: 500,
    upToSmall: 720,
    upToMedium: 960,
    upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
    (accumulator, size) => {
        ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
            @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
                ${css(a, b, c)}
            }
        `
        return accumulator
    },
    {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
    return {
        // base
        white,
        black,

        // text
        text1: darkMode ? '#1a1a1a' : '#000000',
        text2: darkMode ? '#262626' : '#565A69',
        text3: darkMode ? '#333333' : '#888D9B',
        text4: darkMode ? '#404040' : '#636363',
        text5: darkMode ? '#4d4d4d' : '#EDEEF2',

        // backgrounds / greys
        bg1: darkMode ? '#f9f9f9' : '#FFFFFF',
        bg2: darkMode ? '#f2f2f2' : '#F7F8FA',
        bg3: darkMode ? '#e6e6e6' : '#EDEEF2',
        bg4: darkMode ? '#d9d9d9' : '#CED0D9',
        bg5: darkMode ? '#cccccc    ' : '#888D9B',

        //specialty colors
        modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
        advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

        //primary colors
        primary1: darkMode ? '#ff9999' : '#0e0e23',
        primary2: darkMode ? '#ff8080' : '#FF8CC3',
        primary3: darkMode ? '#ff4d4d' : '#FF99C9',
        primary4: darkMode ? '#ff1a1a' : '#F6DDE8',
        primary5: darkMode ? '#e63636' : '#ebebeb',

        // color text
        primaryText1: darkMode ? '#382016' : '#0e0e23',

        // secondary colors
        secondary1: darkMode ? '#8cd9b3' : '#ff007a',
        secondary2: darkMode ? '#66cc99' : '#F6DDE8',
        secondary3: darkMode ? '#40bf80' : '#ebebeb',

        // other
        red1: '#FD4040',
        red2: '#F82D3A',
        red3: '#D60000',
        green1: '#27AE60',
        yellow1: '#FFE270',
        yellow2: '#F3841E',
        blue1: '#0094ec',

        borderRadius: '10px'

        // dont wanna forget these blue yet
        // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
        // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
    }
}

export function theme(darkMode: boolean): DefaultTheme {
    return {
        ...colors(darkMode),

        grids: {
            sm: 8,
            md: 12,
            lg: 24
        },

        //shadows
        shadow1: darkMode ? '#000' : '#2F80ED',

        // media queries
        mediaWidth: mediaWidthTemplates,

        // css snippets
        flexColumnNoWrap: css`
            display: flex;
            flex-flow: column nowrap;
        `,
        flexRowNoWrap: css`
            display: flex;
            flex-flow: row nowrap;
        `
    }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    //const darkMode = useIsDarkMode()
    const darkMode = true

    const themeObject = useMemo(() => theme(darkMode), [darkMode])

    return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
    color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
    main(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text2'} {...props} />
    },
    link(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
    },
    black(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text1'} {...props} />
    },
    white(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'white'} {...props} />
    },
    body(props: TextProps) {
        return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
    },
    mediumHeader(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={20} {...props} />
    },
    subHeader(props: TextProps) {
        return <TextWrapper fontWeight={400} fontSize={14} {...props} />
    },
    small(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={11} {...props} />
    },
    blue(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
    },
    darkGray(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text3'} {...props} />
    },
    italic(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
    },
    error({ error, ...props }: { error: boolean } & TextProps) {
        return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
    }
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: #505050;
  background-color: #fcfcfc;
}

input, textarea {
    font-family: "DM Sans", sans-serif;
    font-display: fallback;
  }

body {
  min-height: 100vh;
`

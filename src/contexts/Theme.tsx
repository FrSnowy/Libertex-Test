import React from "react";
import { ThemeProvider as Provider, css } from "styled-components";

export const theme = {
  colors: {
    text: {
      main: '#232426',
      light: '#909294',
      disabled: '#ccc',
      contrastLight: '#efefef',
      contrast: '#fff',
    },
    border: {
      main: '#c0c2c4',
      disabled: '#efefef',
    },
    controllers: {
      self: '#fff',
      input: '#fff',
      other: 'linear-gradient(90deg, #f0f2f4, #fff)',
    },
    error: {
      light: '#f26666',
      main: '#e64545',
    },
    success: {
      light: '#53a642'
    },
  },
  border: (color: string, size = 1, style: string = 'solid') => `${size}px ${style} ${color}`,
  triangle: (color: string, size: number, direction: 'top' | 'bottom') => css`
    width: 0; 
    height: 0; 
    border-left: ${size}px solid transparent;
    border-right: ${size}px solid transparent;
    ${direction === 'bottom' && css`
      border-top: ${size}px solid ${color};    
    `};

    ${direction === 'top' && css`
      border-bottom: ${size}px solid ${color};      
    `}; 
  `,
} as const;

export type ThemeT = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeT {}
} 

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider theme={theme}>
    {children}
  </Provider>
);

export default ThemeProvider;
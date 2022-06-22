import React from "react";
import { ThemeProvider as Provider } from "styled-components";

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
    controllerBg: 'linear-gradient(90deg, #f0f2f4, #fff)',
    error: '#f26666',
    success: '#53a642',
  },
  border: (color: string, size = 1, style: string = 'solid') => `${size}px ${style} ${color}`,
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
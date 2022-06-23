import styled, { css, keyframes } from 'styled-components';

const shake = keyframes`
  0% {
    transform: translateX(0);
  }
  35% {
    transform: translate(-8px);
  }
  70% {
    transform: translateX(8px);
  }
  100% {
    transform: translateX(0);
  };
`;

export const Container = styled.div<{ shaking?: boolean }>`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  position: relative;
  top: 0;
  left: 0;
  margin-bottom: 6px;

  ${p => css`
    background-color: ${p.theme.colors.error.main};
    color: ${p.theme.colors.text.contrast};
  `};

  ${p => p.shaking && css`
    animation: ${shake} 250ms linear forwards;  
  `};

  &::after {
    position: absolute;
    content: '';
    display: block;
    bottom: -4px;
    left: 8px;
    ${p => p.theme.triangle(p.theme.colors.error.main, 4, 'bottom')};
  }
`;
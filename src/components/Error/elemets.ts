import styled, { css } from 'styled-components';

export const Container = styled.div`
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

  &::after {
    position: absolute;
    content: '';
    display: block;
    bottom: -4px;
    left: 8px;
    ${p => p.theme.triangle(p.theme.colors.error.main, 4, 'bottom')};
  }
`;
import styled, { css } from 'styled-components';

export const ArrowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: ${p => p.theme.border(p.theme.colors.border.main)};
`;

export const ArrowBlock = styled.div`
  display: flex;
  height: 50%;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 8px;
  line-height: 16px;
  user-select: none;

  ${p => css`
    color: ${p.theme.colors.text.main};
    background: ${p.theme.colors.controllers.other};
    &:not(:last-of-type) {
      border-bottom: ${p => p.theme.border(p.theme.colors.border.main)}
    }
  `};
`;
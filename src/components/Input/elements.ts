import styled, { css } from 'styled-components';
import { ArrowBlock, ArrowsWrapper } from './WithArrow/elements';

export const Presymbol = styled.span`
  padding: 4px 4px 4px 8px;
  display: flex;
  align-items: center;
  ${p => css`
    color: ${p => p.theme.colors.border.main};
    background-color: ${p.theme.colors.controllers.input};
  `};
`;

export const Input = styled.input`
  width: 100%;
  display: flex;
  padding: 0;
  border: 0;
  outline: 0;
  text-align: right;
  padding: 4px 8px 4px 0;
  ${p => css`
    color: ${p.theme.colors.text.main};
    background-color: ${p.theme.colors.controllers.input};
  `};
`;

export const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  max-height: 32px;
  overflow: hidden;
  border-radius: 4px;
  border: ${p => p.theme.border(p.theme.colors.border.main)};

  ${p => p.disabled && css`
    pointer-events: none;
    border: ${p.theme.border(p.theme.colors.border.disabled)};

    ${Presymbol} {
      user-select: none;
      color: ${p.theme.colors.border.disabled};
    }

    ${ArrowsWrapper} {
      border-left: ${p.theme.border(p.theme.colors.border.disabled)};
    }

    ${ArrowBlock} {
      color: ${p.theme.colors.text.light};
      &:not(:last-child) {
        border-bottom: ${p.theme.border(p.theme.colors.border.disabled)};
      } 
    }
  `};
`;
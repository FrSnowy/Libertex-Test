import styled, { css } from 'styled-components';
import { ArrowBlock, ArrowsWrapper } from './WithArrow/elements';

export const Presymbol = styled.span`
  color: #c0c2c4;
  padding: 4px 4px 4px 8px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  display: flex;
  padding: 0;
  border: 0;
  outline: 0;
  text-align: right;
  padding: 4px 8px 4px 0;
`;


export const Wrapper = styled.div<{ disabled?: boolean }>`
  border: 1px solid #c0c2c4;
  border-radius: 4px;
  display: flex;
  max-height: 32px;
  overflow: hidden;
  pointer-events: none;

  ${props => props.disabled && css`
    border: 1px solid #dfe0e1;

    ${Presymbol} {
      color: #dfe0e1;
      user-select: none;
    }

    ${ArrowsWrapper} {
      border-left: 1px solid #dfe0e1;
    }

    ${ArrowBlock} {
      color: #919292;
      &:not(:last-child) {
        border-bottom: 1px solid #dfe0e1;
      } 
    }
  `};
`;
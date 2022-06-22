import styled, { css } from 'styled-components';
import { Wrapper as Button, Pre as PreContainer } from 'components/Button/elements';
import { Direction } from '.';

export const ButtonWrapper = styled.div<{ direction: Direction }>`
  width: calc(50% - 4px);

  &:not(:last-of-type) {
    margin-right: 8px;
  }

  ${props => props.direction === 'growth' && css`
    ${Button} {
      background-color: #53a642;
    }
  `};

  ${props => props.direction === 'reduction' && css`
    ${Button} {  
      background-color: #f26666;
    }
  `};

  ${Button} {
    color: #eee;
    height: 44px;
    ${PreContainer} {
      opacity: 0.7;
    }

    &:hover {
      color: #fff;
      ${PreContainer} {
        opacity: 1;
      }
    }
  }
`;

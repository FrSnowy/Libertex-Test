import styled, { css } from 'styled-components';
import { Wrapper as Button, Pre as PreContainer } from 'components/Button/elements';
import { Direction } from '.';

export const ButtonWrapper = styled.div<{ direction: Direction }>`
  width: calc(50% - 4px);

  &:not(:last-of-type) {
    margin-right: 8px;
  }

  ${Button} {
    height: 44px;

    ${PreContainer} {
      opacity: 0.7;
    }

    &:hover {
      ${PreContainer} {
        opacity: 1;
      }
    }

    ${p => css`
      background-color: ${p.direction === 'growth' ? p.theme.colors.success : p.theme.colors.error};
      color: ${p.theme.colors.text.contrastLight};

      &:hover {
        color: ${p.theme.colors.text.contrast};
      }
    `};
  }
`;

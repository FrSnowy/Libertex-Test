import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const GroupWrapper = styled(Container)`
  margin-right: 12px;
  cursor: pointer;
`;

export const RadioBtn = styled.div<{ checked?: boolean }>`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;

  ${p => css`
    background: ${p.theme.colors.controllerBg};
    border: ${p.theme.border(p.theme.colors.border.main)};

    & + span {
      color: ${p.theme.colors.text.main};
    }
  `};

  ${p => p.checked && css`
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      width: 50%;
      height: 50%;
      transform: translate(-50%, -50%);
      content: '';
      display: block;
      background: ${p.theme.colors.text.main}
    }
  `};
`;

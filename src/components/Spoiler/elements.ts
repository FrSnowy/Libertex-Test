import styled, { css } from 'styled-components';

export const SpoilerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  margin-bottom: 20px;
  margin-top: 36px;
  color: #909294;
  cursor: pointer;
  user-select: none;
`;

export const Icon = styled.div<{ isOpen?: boolean }>`
  position: absolute;
  top: calc(50% - 1px);
  left: -14px;
  transform: translateY(-50%);

  ${p => p.isOpen && css`
    transform: translateY(-50%) rotate(90deg);
  `}
`;
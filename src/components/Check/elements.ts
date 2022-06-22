import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  & > * {
    cursor: pointer;
  }
`;

export const Checkbox = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  top: 0;
  left: 0;
  border-radius: 4px;
  border: 1px solid #c0c2c4;
  background: linear-gradient(90deg, #f0f2f4, #fff);
  margin-right: 8px;

  & > svg {
    position: absolute;
    top: -1px;
    left: 0;
  }
`;

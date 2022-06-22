import styled from 'styled-components';

export const ArrowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #c0c2c4;
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
  color: #000;
  background: linear-gradient(90deg, #f0f2f4, #fff);
  user-select: none;
  &:not(:last-of-type) {
    border-bottom: 1px solid #c0c2c4;
  }
`;
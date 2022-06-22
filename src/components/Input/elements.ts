import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #c0c2c4;
  border-radius: 4px;
  display: flex;
  max-height: 32px;
  overflow: hidden;
`;

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
  background: linear-gradient(90deg, #f0f2f4, #fff);
  //user-select: none;
  &:not(:last-of-type) {
    border-bottom: 1px solid #c0c2c4;
  }
`;
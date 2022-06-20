import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 8px;
  border: 1px solid #c0c2c4;
  border-radius: 4px;
  display: flex;
`;

export const Presymbol = styled.span`
  color: #c0c2c4;
  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Input = styled.input`
  width: 100%;
  display: flex;
  padding: 0;
  border: 0;
  outline: 0;
  text-align: right;
`;

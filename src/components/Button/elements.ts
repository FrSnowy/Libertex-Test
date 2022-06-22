import styled from 'styled-components';

export const Wrapper = styled.button`
  width: 100%;
  border-radius: 4px;
  display: flex;
  cursor: pointer;
  outline: none;
  border: 0;
  padding: 0;
  text-shadow: 0 -1px 8px rgb(0, 0, 0, .2);
`;

export const Pre = styled.div`
  display: inline-flex;
  flex: none;
  height: 100%;
  padding: 0 8px;
  background-color: rgba(0, 0, 0, .1);
  align-items: center;
  position: relative;
`;

export const ButtonContainer = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
import styled from 'styled-components';

export const Container = styled.div`
  width: 280px;
  margin-top: 8px;
  margin-left: -152px;
  background: black;
  padding: 12px 24px 30px;
  border-radius: 4px;
  background-color: #3a3b3c;
  position: relative;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: -4px;
    left: 182px;
    ${p => p.theme.triangle("#3a3b3c", 4, "top")}
  }
`;
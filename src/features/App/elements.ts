import styled from 'styled-components';

export const Container = styled.div`
  width: 324px;
  font-family: Arial, sans-serif;
  font-size: 13px;
  background: ${p => p.theme.colors.controllers.self};
`;

export const Title = styled.div`
  padding: 16px 24px;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
`;

export const Content = styled.div`
  border-top: ${p => p.theme.border(p.theme.colors.border.main)};
  padding: 20px 24px;
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 12px;
`;
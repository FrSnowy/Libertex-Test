import styled from 'styled-components';

export const FinalSum = styled.span`
  margin-left: 5px;
  display: inline-flex;
  flex: none;
  color: ${p => p.theme.colors.text.light};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  width: 60px;
  min-width: 44px;
  display: flex;
`;

export const ErrorLine = styled.span`
  white-space: nowrap;
`;
import styled from 'styled-components';

export const WithLabelWrapper = styled.div`
  display: 'flex';
  align-items: center;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  display: inline-flex;
  width: 50%;
  padding-right: 12px;
  color: ${p => p.theme.colors.text.main};
`;

export const ChildrenWrapper = styled.div`
  display: inline-flex;
  width: 50%;
  padding-left: 12px;
  align-items: center;
`;
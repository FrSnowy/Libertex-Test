import styled, { css } from 'styled-components';

export const WithLabelWrapper = styled.div<{ zIndex?: number }>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${p => p.zIndex && css`
    position: relative;
    top: 0;
    left: 0;
    z-index: ${p.zIndex};
  `};
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
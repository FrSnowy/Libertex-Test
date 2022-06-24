import React from 'react';
import * as Elements from './elements';

type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'children' | 'type' | 'onCopy' | 'align' | 'ref' | 'as'> & {
  pre?: string | JSX.Element | null,
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  pre,
  children,
  ...rest
}) => {
  const preView = React.useMemo(() => {
    if (!pre) return null;
    return <Elements.Pre>{pre}</Elements.Pre>
  }, [pre]);

  const contentView = React.useMemo(() => {
    if (!children) return null;
    return (
      <Elements.ButtonContainer>
        {children}
      </Elements.ButtonContainer>      
    )
  }, [children])

  return (
    <Elements.Wrapper {...rest}>
      {preView}
      {contentView}
    </Elements.Wrapper>
  )
}

export default Button;
import React from 'react';
import * as Elements from './elements';
import { ReactComponent as SpoilerIcon } from '../../assets/arrow-right.svg';

type SpoilerProps = {
  children: React.ReactNode;
  title: string | JSX.Element;
  isOpen?: boolean;
}

const Spoiler: React.FC<SpoilerProps> = ({ children, title, isOpen: isOpenByDefault = true }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenByDefault);

  React.useEffect(() => {
    setIsOpen(isOpenByDefault);
  }, [isOpenByDefault]);

  return (
    <Elements.SpoilerContainer>
      <Elements.Title onClick={() => children && setIsOpen(v => !v)}>
        {children && (
          <Elements.Icon isOpen={isOpen}>
            <SpoilerIcon height={9} width={9} />
          </Elements.Icon>
        )}
        {title}
      </Elements.Title>
      {isOpen && children}
    </Elements.SpoilerContainer>
  )
}

export default Spoiler;

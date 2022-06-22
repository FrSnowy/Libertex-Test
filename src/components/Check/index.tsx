import React from 'react';
import * as Elements from './elements';
import { ReactComponent as CheckIcon } from 'assets/check.svg';

type CheckProps = {
  checked?: boolean;
  onChange?: (v: boolean) => void,
  children?: string | JSX.Element,
}

const Check: React.FC<CheckProps> = ({ checked: checkedByDefault, children, onChange }) => {
  const [checked, setChecked] = React.useState<boolean>(!!checkedByDefault);

  const toggleCheck = React.useCallback(() => {
    setChecked(v => !v);
  }, []);

  React.useEffect(() => {
    onChange && onChange(checked);
  }, [checked, onChange]);
  
  return (
    <Elements.Wrapper onClick={toggleCheck}>
      <Elements.Checkbox>
        {checked && <CheckIcon width="12" height="12" />}
      </Elements.Checkbox>
      {typeof children === 'string' ? <label>{children}</label> : children}
    </Elements.Wrapper>
  )
}

export default Check;
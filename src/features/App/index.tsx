import React from 'react';
import * as Elements from './elements';
import Spoiler from 'components/Spoiler';
import Multiplicator from 'features/Multiplicator';
import InvestSum from 'features/InvsetSum';
import Limit from 'features/Limit';
import LimitType from 'features/LimitType';
import { FormContext } from 'contexts/Form';

const App = () => {
  const { incomeLimit, lossLimit, set } = React.useContext(FormContext);
  const {
    incomeLimitValue: setIncomeLimitValue,
    incomeLimitActive: setIncomeLimitActive,
    lossLimitValue: setLossLimitValue,
    lossLimitActive: setLossLimitActive,
  } = set;

  return (
    <Elements.Wrapper>
      <InvestSum />
      <Multiplicator />
      <Spoiler title='Ограничить прибыль и убыток'>
        <LimitType />
        <Limit
          limit={incomeLimit}
          setActive={setIncomeLimitActive}
          setValue={setIncomeLimitValue}
        >
          Прибыль
        </Limit>
        <Limit
          limit={lossLimit}
          setActive={setLossLimitActive}
          setValue={setLossLimitValue}
        >
          Убыток
        </Limit>
      </Spoiler>
    </Elements.Wrapper>
  )
}

export default App;
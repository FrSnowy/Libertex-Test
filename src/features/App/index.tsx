import React from 'react';
import * as Elements from './elements';
import Spoiler from 'components/Spoiler';
import Multiplicator from 'features/Multiplicator';
import InvestSum from 'features/InvsetSum';
import Limit from 'features/Limit';
import LimitType from 'features/LimitType';
import { FormContext } from 'contexts/Form';
import SendButton from 'features/SendButton';

const App = () => {
  const { takeProfit, stopLoss } = React.useContext(FormContext);

  return (
    <Elements.Wrapper>
      <InvestSum />
      <Multiplicator />
      <Spoiler title='Ограничить прибыль и убыток'>
        <LimitType />
        <Limit limit={takeProfit}>
          Прибыль
        </Limit>
        <Limit limit={stopLoss}>
          Убыток
        </Limit>
      </Spoiler>
      <Elements.ButtonsWrapper>
        <SendButton direction='reduction' />
        <SendButton direction='growth' />
      </Elements.ButtonsWrapper>
    </Elements.Wrapper>
  )
}

export default App;
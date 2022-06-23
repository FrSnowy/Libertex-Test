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
  const { takeProfit, stopLoss, setFormRef } = React.useContext(FormContext);

  return (
    <Elements.Container ref={r => setFormRef(r)}>
      <Elements.Title>Инвестировать сейчас</Elements.Title>
      <Elements.Content>
        <InvestSum />
        <Multiplicator />
        <Spoiler title='Ограничить прибыль и убыток'>
          <LimitType />
          <Limit limit={takeProfit}>Прибыль</Limit>
          <Limit limit={stopLoss}>Убыток</Limit>
        </Spoiler>
        <Elements.Buttons>
          <SendButton direction='reduction' />
          <SendButton direction='growth' />
        </Elements.Buttons>
      </Elements.Content>
    </Elements.Container>
  )
}

export default App;
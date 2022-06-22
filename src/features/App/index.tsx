import React from 'react';
import * as Elements from './elements';
import Spoiler from 'components/Spoiler';
import Multiplicator from 'features/Multiplicator';
import InvestSum from 'features/InvsetSum';
import Limit from 'features/IncomeLimit';
import LimitType from 'features/LimitType';

const App = () => {
  return (
    <Elements.Wrapper>
      <InvestSum />
      <Multiplicator />
      <Spoiler title='Ограничить прибыль и убыток'>
        <LimitType />
        <Limit />
      </Spoiler>
    </Elements.Wrapper>
  )
}

export default App;
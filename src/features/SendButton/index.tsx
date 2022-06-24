import Button from 'components/Button';
import React from 'react';
import * as Elements  from './elements';
import { ReactComponent as ArrowLongTop } from 'assets/arrow-long-bottom.svg';
import { FormController, FormContext, FormT } from 'contexts/Form';
import { ErrorsContext } from 'contexts/Errors';
import { ReactComponent as Preloader } from 'assets/preloader.svg';

export type Direction = 'growth' | 'reduction';

type SendButtonProps = {
  direction: Direction,
}

const BUTTON_NAME: Record<Direction, string> = {
  'growth': 'В рост',
  'reduction': 'В снижение',
}

const SendButton: React.FC<SendButtonProps> = ({ direction }) => {
  const [isSending, setSending] = React.useState<boolean>(false);
  const { makeShakeOneTime } = React.useContext(ErrorsContext);
  const { sumInv, mult, takeProfit, stopLoss, limitType } = React.useContext(FormContext);

  const registerInvestment = React.useCallback(async () => {
    if (isSending) return;
    const data: FormT.RegisterInvestmentProps = { sumInv, mult, takeProfit, stopLoss };
    const isAllValid = FormController.isAllValid(data, limitType);
    if (!isAllValid) return makeShakeOneTime();
    setSending(true);
    await FormController.registerInvestment(direction, { sumInv, mult, takeProfit, stopLoss });
    setSending(false);
  }, [direction, sumInv, mult, takeProfit, stopLoss, limitType, makeShakeOneTime, isSending]);

  const ArrowView = React.useMemo(() => {
    const transform = `rotate(${direction === 'growth'  ? '180deg' : 0})`;
    const style = { transform };

    return <ArrowLongTop width={10} height={11} style={style} />
  }, [direction]);

  return React.useMemo(() => (
    <Elements.ButtonWrapper direction={direction}>
      <Button pre={ArrowView} onClick={registerInvestment}>
        {isSending ? <Preloader width={40} height={40} /> : BUTTON_NAME[direction]}
      </Button>
    </Elements.ButtonWrapper>
  ), [direction, ArrowView, registerInvestment]);
}

export default SendButton;
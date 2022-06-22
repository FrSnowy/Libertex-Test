import { Direction } from "features/SendButton"

export type RegisterInvestmentData = {
  sumInv: number,
  mult: number,
  takeProfit?: number,
  stopLoss?: number,
  direction: Direction,
};

export const registerInvestment = async (data: RegisterInvestmentData) => {
  //Using this public postman echo API because there's no API provided within the task
  const TARGET_URL = 'https://postman-echo.com/post';

  const response = await window.fetch(
    TARGET_URL, {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}
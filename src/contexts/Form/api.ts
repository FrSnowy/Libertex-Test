import { RegisterInvestmentDataProps } from "./types";

export const registerInvestment = async (data: RegisterInvestmentDataProps) => {
  //Using this public postman echo API because there's no API provided within the task
  const TARGET_URL = 'https://postman-echo.com/post';

  const response = await window.fetch(
    TARGET_URL, {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  try {
    return await response.json();
  } catch {
    return {};
  }
}
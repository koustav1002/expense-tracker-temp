export const maskAccount = (number) => {
  let maskedNum = "";
  let len = number.length;
  for (let i = 0; i < len; i++) {
    if (i < 3 || i >= len - 3) maskedNum += number[i];
    else maskedNum += "*";
  }
  return maskedNum;
};

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const generateAccountNumber = () => {
  let accNum = "";

  while (accNum.length < 13) {
    accNum += getRandomNumber(0, 9).toString();
  }
  return accNum;
};

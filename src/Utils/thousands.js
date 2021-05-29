const toThousands = (num) => {
  let number = (num || 0).toString();
  let result = "";
  while (number.length > 3) {
    result = `,${number.slice(-3)}${result}`;
    number = number.slice(0, number.length - 3);
  }
  if (number) {
    result = number + result;
  }
  return result;
};

export default toThousands;

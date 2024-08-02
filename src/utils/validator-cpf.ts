const BLACKLIST_CPF: Array<string> = [
  "00000000000",
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999",
  "12345678909",
];

function verifierCPFDigit(digits: string) {
  const numbers: Array<number> = digits
    .split("")
    .map((digit) => parseInt(digit, 10));

  const modulus: number = numbers.length + 1;
  const multiplied: Array<number> = numbers.map(
    (current, index) => current * (modulus - index)
  );
  const mod: number =
    multiplied.reduce((current, number) => current + number) % 11;

  return mod < 2 ? 0 : 11 - mod;
}

export const validateCPF = (digits: string) => {
  if (!digits) return false;

  if (digits.length !== 11) return false;

  if (BLACKLIST_CPF.includes(digits)) return false;

  let numbers: string = digits.substring(0, 9);
  numbers += verifierCPFDigit(numbers);
  numbers += verifierCPFDigit(numbers);

  return numbers.substring(-2) === digits.substring(-2);
};

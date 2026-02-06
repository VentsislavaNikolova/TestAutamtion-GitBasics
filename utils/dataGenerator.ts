export const uniqueUsername = (
  base: string,
  maxLength = 15
): string => {
  const uniquePart = Date.now().toString().slice(-5); // последните 5 цифри
  const separator = '_';

  const availableLength =
    maxLength - base.length - separator.length;

  const finalUniquePart =
    availableLength > 0
      ? uniquePart.slice(0, availableLength)
      : '';

  return `${base}${separator}${finalUniquePart}`;
};

export const randomBirthDateWithin100Years = () => {
  const currentYear = new Date().getFullYear();

  const minYear = currentYear - 100;
  const maxYear = currentYear - 18; // 👈 ако има age restriction (по избор)

  const year =
    Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

  const month =
    Math.floor(Math.random() * 12) + 1;

  const day =
    Math.floor(Math.random() * 28) + 1; // 1–28 → винаги валидна дата

  return {
    birthYear: year.toString(),
    birthMonth: month.toString().padStart(2, '0'),
    birthDay: day.toString().padStart(2, '0'),
  };
};

export const randomPhoneNumber = (): string => {
  // първата цифра е 5
  const firstDigit = '5';

  // още 9 произволни цифри
  const remainingDigits = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join('');

  return `${firstDigit}${remainingDigits}`;
};


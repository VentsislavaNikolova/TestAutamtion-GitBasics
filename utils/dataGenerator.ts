export const uniqueUsername = (
  base: string,
  maxLength = 15
): string => {
  const uniquePart = Date.now().toString().slice(-5); 
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
  const maxYear = currentYear - 18; 

  const year =
    Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

  const month =
    Math.floor(Math.random() * 12) + 1;

  const day =
    Math.floor(Math.random() * 28) + 1; 

  return {
    birthYear: year.toString(),
    birthMonth: month.toString().padStart(2, '0'),
    birthDay: day.toString().padStart(2, '0'),
  };
};

export const randomPhoneNumber = (): string => {

  const firstDigit = '5';


  const remainingDigits = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join('');

  return `${firstDigit}${remainingDigits}`;
};


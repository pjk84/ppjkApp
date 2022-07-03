export const getRandomNumber = (min: number, max: number) => {
  let r = Math.ceil(Math.random() * max);
  return r < min ? min : r;
};

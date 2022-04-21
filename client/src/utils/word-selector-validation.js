export const valdiateWord = (
  prevSelectedI,
  prevSelectedJ,
  currSelectedI,
  currSelectedJ
) => {
  // horizontal
  if (prevSelectedI === currSelectedI) {
    return {
      valid: true,
      direction: "H",
    };
  }

  // vertical
  if (prevSelectedJ === currSelectedJ) {
    return {
      valid: true,
      direction: "V",
    };
  }

  // diagonal cancel +
  if (
    prevSelectedI - prevSelectedJ === currSelectedI - currSelectedJ ||
    prevSelectedI + prevSelectedJ === currSelectedI + currSelectedJ
  ) {
    return {
      valid: true,
      direction: "D",
    };
  }
  return null;
};

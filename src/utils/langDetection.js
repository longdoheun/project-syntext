const patternNum = /[0-9]/; // num
const patternEng = /[a-zA-Z]/; // eng
const patternKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // ko
const patternSpecialChars = /[~!@#\#$%<>^&*]/; // special characters

export const returnMarginalWidth = (letters) => {
  const lastWord = letters.slice(-1);
  if (patternNum.test(lastWord))
    return 6;
  if (patternEng.test(lastWord))
    return 11;
  if (patternKo.test(lastWord))
    return 17;
    //return 14;
  if (patternSpecialChars.test(lastWord))
    return 6;
  if (lastWord)
    return 0;
};

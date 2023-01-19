const pattern1 = /[0-9]/; //숫자
const pattern2 = /[a-zA-Z]/; //영어
const pattern3 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글
const pattern4 = /[~!@#\#$%<>^&*]/; //특수문자

export const returnMarginalWidth = (letter) => {
  const lastWord = letter.slice(-1);
  if (pattern1.test(lastWord)) return 6;
  if (pattern2.test(lastWord)) return 11;
  if (pattern3.test(lastWord)) return 14;
  if (pattern4.test(lastWord)) return 6;
  if (lastWord) return 0;
};

// export const returnMarginalWidth = (letter) => {
//   const lastWord = letter.slice(-1);
//   if (pattern1.test(lastWord)) return console.log(6);
//   if (pattern2.test(lastWord)) return console.log(11);
//   if (pattern3.test(lastWord)) return console.log(14);
//   if (pattern4.test(lastWord)) return console.log(6);
// };

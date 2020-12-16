const demo = `0,3,6`;
const input = `5,2,8,16,18,0,1`;

const res = input.split(",").map(x => parseInt(x, 10));

const speak = arr => {
  const last = arr[arr.length - 1];
  const lastIndex = arr.slice(0, arr.length - 1).lastIndexOf(last);
  const spokenBefore = lastIndex !== -1;
  if (spokenBefore) {
    return [...arr, arr.length - 1 - lastIndex];
  }
  return [...arr, 0];
};

let tmp = res.slice();
for (var i = res.length + 1; i <= 2020; i++) {
  tmp = speak(tmp);
}

console.log(tmp.pop());

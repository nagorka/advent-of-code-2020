const demo = `0,3,6`;
const input = `5,2,8,16,18,0,1`;

const data = input.split(",").map(x => parseInt(x, 10));

const res = data.reduce((m, x, i) => {
  return {
    ...m,
    [x]: [i + 1, null]
  };
}, {});

res.last = data[data.length - 1];

const speak = turn => {
  const lastNum = res.last;
  const spoken = res[lastNum];
  const spokenBefore = spoken[1] !== null;
  let n = 0;
  if (spokenBefore) {
    n = spoken[0] - spoken[1];
  }
  res.last = n;
  res[n] = [turn, res[n] ? res[n][0] : null];
};

const t1 = new Date().getTime();
for (var i = data.length + 1; i <= 2020; i++) {
  speak(i);
}
const t2 = new Date().getTime();

console.log("seconds", (t2 - t1) / 1000);
console.log(res.last);

const demo = `939
7,13,x,x,59,x,31,19`;

const input = `1000303
41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,541,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,983,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`;

const rows = input.split("\n");

const min = parseInt(rows[0], 10);

const ids = rows[1]
  .split(",")
  .filter(x => x !== "x")
  .map(x => parseInt(x, 10));

const res = ids
  .map(x => {
    return {
      id: x,
      wait: x - (min % x)
    };
  })
  .sort((a, b) => a.wait - b.wait)[0];

console.log(res.id * res.wait);

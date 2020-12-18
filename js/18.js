const ex1 = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

const fs = require("fs");

const input = fs.readFileSync("../data/18.txt", "UTF-8");

const tokensList = input
  .split("\n")
  .map(l => l.split("").filter(t => t !== " "));

const parse = (tokens, start, prio) => {
  const ret = [];
  let i = start;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token === ")") {
      return [ret, i];
    }
    if (token === "(") {
      const [reslist, resindex] = parse(tokens, i + 1, prio);
      i = resindex;
      ret.push(reslist);
    } else if (/[0-9]/.test(token)) {
      ret.push(+token);
    } else {
      ret.push(token);
    }
    if (prio && prio === ret[ret.length - 2]) {
      const removed = ret.splice(ret.length - 3, 3);
      ret.push(removed);
    }
    i += 1;
  }
  return ret;
};

const evaluate = list => {
  return list.reduce(
    (m, x) => {
      if (x === "*" || x === "+") {
        return { ...m, nextOp: x };
      }
      const n = Array.isArray(x) ? evaluate(x) : x;
      if (m.nextOp === null) {
        return { ...m, res: n };
      }
      if (m.nextOp === "+") {
        return { res: m.res + n, nextOp: null };
      }
      return { res: m.res * n, nextOp: null };
    },
    { res: 0, nextOp: null }
  ).res;
};

const part1 = () => {
  return tokensList.reduce((m, tokens) => {
    const list = parse(tokens, 0, null);
    const res = evaluate(list);
    return m + res;
  }, 0);
};

const part2 = () => {
  return tokensList.reduce((m, tokens) => {
    const list = parse(tokens, 0, "+");
    const res = evaluate(list);
    return m + res;
  }, 0);
};

console.log(part2());

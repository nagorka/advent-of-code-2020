const fs = require("fs");
const input = fs.readFileSync("../data/17.txt", "UTF-8");

const s0 = [input.split("\n").map(r => r.split(""))];

const log = state => {
  const message = state
    .map((plane, i) => {
      return (
        "z=" +
        (-(state.length - 1) / 2 + i) +
        "\n" +
        plane
          .reduce((m, row) => {
            return [...m, row.reduce((r, col) => r + col, "")];
          }, [])
          .join("\n")
      );
    })
    .join("\n\n");
  console.log(message);
};

const nextState = state => {
  const emptyRow = ".".repeat(state[0].length + 2).split("");
  const emptyPlane = [
    emptyRow.slice(),
    ...state[0].map(_ => emptyRow.slice()),
    emptyRow.slice()
  ];

  return [
    emptyPlane.slice(),
    ...state.map(plane => {
      return [
        emptyRow.slice(),
        ...plane.map(row => [".", ...row.slice(), "."]),
        emptyRow.slice()
      ];
    }),
    emptyPlane.slice()
  ];
};

const getNeighbourCount = (state, x0, y0, z0) => {
  const ret = {
    active: 0,
    inactive: 0
  };
  const zMin = Math.max(0, z0 - 1);
  const zMax = Math.min(state.length - 1, z0 + 1);
  for (let z = zMin; z <= zMax; z++) {
    const yMin = Math.max(0, y0 - 1);
    const yMax = Math.min(state[z].length - 1, y0 + 1);
    for (let y = yMin; y <= yMax; y++) {
      const xMin = Math.max(0, x0 - 1);
      const xMax = Math.min(state[z][y].length - 1, x0 + 1);
      for (let x = xMin; x <= xMax; x++) {
        if (x === x0 && y === y0 && z === z0) {
          continue;
        }
        if (state[z][y][x] === "#") {
          ret.active++;
        } else {
          ret.inactive++;
        }
      }
    }
  }
  return ret;
};

const count = state => {
  let ret = 0;
  state.forEach(plane => {
    plane.forEach(row => {
      row.forEach(cell => {
        if (cell === "#") {
          ret++;
        }
      });
    });
  });
  return ret;
};

const cycle = state => {
  const newState = nextState(state);
  return newState.map((plane, z) => {
    return plane.map((row, y) => {
      return row.map((cell, x) => {
        const count = getNeighbourCount(newState, x, y, z);
        if (cell === "#") {
          if (count.active === 2 || count.active === 3) {
            return cell;
          }
          return ".";
        } else {
          if (count.active === 3) {
            return "#";
          }
          return cell;
        }
      });
    });
  });
};

const s1 = cycle(s0);
const s2 = cycle(s1);
const s3 = cycle(s2);
const s4 = cycle(s3);
const s5 = cycle(s4);
const s6 = cycle(s5);

console.log(count(s6));

const demo = `939
7,13,x,x,59,x,31,19`;

const demo2 = `a
17,x,13,19`;

const input = `1000303
41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,541,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,983,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`;

const rows = input.split("\n");

/**
 * Skapa en lista av { k: ?, p: ? } där p är offset (negativ) och k är
 * tiden ett varv tar. Anledningen är att vi vill ställa upp ett ekvationssystem.
 * Om man tar 17,x,13,19 som exempel så blir listan [{k:17,p:0},{k:13,p:-2},{k:19,p:-3}]
 *
 * Ekvationerna vi kan ställa upp blir
 *
 * 17*a = 13*b - 2 = 19*c - 3
 */
const data = rows[1]
  .split(",")
  .map((x, i) => {
    if (x === "x") return null;
    return {
      k: parseInt(x, 10),
      p: -i
    };
  })
  .filter(x => x);

/**
 * Funktion för att hitta heltalslösning på ekvationen
 * x = (a*y + b) / c
 *
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} i
 */
const findSol = (a, b, c, i) => {
  const res = (a * i + b) / c;
  if (res === Math.floor(res)) {
    return { p: (res + a) % a, k: a };
  }
  return findSol(a, b, c, i + 1);
};

/**
 * Funktion för att summera/multiplicera ihop en lista (arr) av {k,p}
 * med ett startvärde (n)
 * @param {*} arr
 * @param {*} n
 */
const findSum = (arr, n) => {
  console.log(arr);
  return arr.reduce((m, x) => {
    return x.k * m + x.p;
  }, n);
};

/**
 * Rekursiv funktion för att hitta alla lösningar av lista av
 * {k,p} i.e. data med en accumulator acc
 *
 * Om vi tar exemplet [{k:17,p:0},{k:13,p:-2},{k:19,p:-3}]
 * så kommer vi först att hitta en lösning på de två ekvationerna
 *
 * 17a = 13b - 2
 * 17a = 19b - 2
 *
 * Detta ger lösningarna
 * a = 6 + 13c
 * a = 11 + 19d
 *
 * Rekursivt kallas funktionen igen med acc = [{k:17,p:0}]
 *
 * Nytt varv när vi ska hitta lösningen på
 *
 * 13a + 6 = 19b + 11
 *
 * Detta ger en lösning
 *
 * a = 15 + 19b
 *
 * Nytt varv igen med acc = [{k:13,p:6},{k:17,p:0}] och
 * bara en ekvation listan
 *
 * Vi kommer anropa findSum ovan med startvärdet 15
 * vilket ger 17*(13*15+6)+0 = 3417
 * @param {*} data
 * @param {*} acc
 */
const findAll = (data, acc) => {
  const copy = data.slice();
  const f = copy.shift();
  const res = copy.map(x => findSol(x.k, x.p - f.p, f.k, 1));
  if (res.length > 0) {
    console.log(res);
    return findAll(res, [f, ...acc]);
  }
  return findSum(acc, f.p);
};

console.log(findAll(data, []));

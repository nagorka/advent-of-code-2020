const demo1 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const input = `71
183
111
89
92
142
25
101
52
86
18
22
70
2
135
163
34
143
153
35
144
24
23
94
100
102
17
57
76
182
134
38
7
103
66
31
11
121
77
113
128
82
99
148
137
41
32
48
131
60
127
138
73
28
10
84
180
63
125
53
176
165
114
145
152
72
107
167
59
164
78
126
118
136
83
79
58
14
106
69
51
39
157
42
177
173
93
141
3
33
13
19
45
154
95
170
54
181
6
151
1
112
96
115
85
108
166
160
40
122
12`;

const demo2 = `16
10
15
5
1
11
7
19
6
12
4`;

const simple = `1
2
3
4
5`;

const demo3 = `1
2
3`;

const jolts = simple
  .split("\n")
  .map(x => parseInt(x, 10))
  .sort((a, b) => a - b);

const keys = ["one", "two", "three"];

const getPossible = (jolts, acc) => {
  const res = acc.map(x => {
    const last = x[x.length - 1];
    let i = last.i;
    const ret = [];
    if (i === jolts.length) {
      return [x];
    }
    while (jolts[i] - last.v <= 3) {
      ret.push({ v: jolts[i], i: i + 1 });
      i++;
    }
    const next = getPossible(
      jolts,
      ret.map(r => [...x, r])
    );

    return next;
  });

  return res.reduce((m, x) => [...m, ...x], []);
};

const data = getPossible(jolts, [[{ v: 0, i: 0 }]]);
console.log(
  "data\n" +
    data
      .reduce((m, x) => {
        return [...m, x.map(y => y.v).join(", ")];
      }, [])
      .join("\n")
);

console.log(JSON.stringify(jolts));

const res = jolts.reduce(
  (m, x, i) => {
    let k = keys[x - m.prev - 1] || "invalid";
    let variants = 0;
    let j = i;
    while (jolts[j] - m.prev <= 3) {
      variants++;
      j++;
    }
    return {
      ...m,
      prev: x,
      [k]: m[k] + 1,
      variants: [...m.variants, variants]
    };
  },
  { prev: 0, one: 0, two: 0, three: 0, invalid: 0, variants: [] }
);

console.log(JSON.stringify(res));

const multiplier = (m, x) => {
  if (x === 1) {
    return 1;
  }

  if (m.prev === 1) {
    return x;
  }

  if (m.prev === 3 && x === 3) {
    return 7 / 4;
  }

  if (m.prev === 3 && x === 2) {
    return 4 / 3;
  }

  return x;
};

/**
 * 1 4
 * 1 2 4
 * 1 3 4
 * 1 4
 * 2 3 4
 * 2 4
 * 3 4
 */

console.log(
  res.variants.reduce(
    (m, x, i) => {
      return {
        acc: m.acc * multiplier(m, x),
        prev: x
      };
    },
    {
      acc: 1,
      prev: 1
    }
  )
);

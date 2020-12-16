const demo = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const demo2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

const fs = require("fs");

const input = fs.readFileSync("../data/16.txt", "UTF-8");

const sections = input.split("\n\n");

const rules = sections[0].split("\n").map(row => {
  const name = row.replace(/(.*):.*/, "$1");
  const data = row.replace(/.*:\s*/, "").split(" or ");
  return {
    name,
    rules: data.map(x => {
      return x.split("-").map(n => parseInt(n, 10));
    })
  };
});

const your_ticket = sections[1]
  .split("\n")
  .slice(1)
  .map(x => x.split(",").map(y => parseInt(y, 10)))[0];

const tickets = sections[2]
  .split("\n")
  .slice(1)
  .map(x => x.split(",").map(y => parseInt(y, 10)))
  .concat([your_ticket]);

const ticket_status = tickets.map(nums => {
  return {
    ticket: nums,
    invalid_fields: nums.filter(n => {
      return !rules.some(rule => {
        return rule.rules.some(([min, max]) => {
          return min <= n && n <= max;
        });
      });
    })
  };
});

const part1 = () => {
  const flatten = ticket_status.reduce((m, x) => {
    return [...m, ...x.invalid_fields];
  }, []);

  return flatten.reduce((m, x) => m + x, 0);
};

const part2 = () => {
  const valid_tickets = ticket_status
    .filter(x => !x.invalid_fields.length)
    .map(x => x.ticket);

  const possible_fields = your_ticket
    .map((_, i) => {
      return {
        names: rules
          .filter(rule => {
            const values = valid_tickets.map(x => x[i]);
            return values.every(v =>
              rule.rules.some(([min, max]) => min <= v && v <= max)
            );
          })
          .map(r => r.name),
        index: i
      };
    })
    .sort((a, b) => a.names.length - b.names.length);

  const minify = () => {
    const positive = possible_fields.filter(
      x => x.names.length === 1 && !x.used
    );
    if (!positive.length) {
      return;
    }
    positive.forEach(item => {
      item.used = true;
      possible_fields.forEach(f => {
        if (item !== f) {
          f.names = f.names.filter(n => n !== item.names[0]);
        }
      });
    });
    minify();
  };

  minify();

  const departure_field_indexes = possible_fields
    .filter(x => /^departure/.test(x.names[0]))
    .map(x => x.index);

  return departure_field_indexes.reduce((m, i) => {
    return m * your_ticket[i];
  }, 1);
};

console.log("part1:", part1());
console.log("part2:", part2());

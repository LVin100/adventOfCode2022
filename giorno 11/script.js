let inputAOC = `Monkey 0:
Starting items: 75, 75, 98, 97, 79, 97, 64
Operation: new = old * 13
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 7

Monkey 1:
Starting items: 50, 99, 80, 84, 65, 95
Operation: new = old + 2
Test: divisible by 3
  If true: throw to monkey 4
  If false: throw to monkey 5

Monkey 2:
Starting items: 96, 74, 68, 96, 56, 71, 75, 53
Operation: new = old + 1
Test: divisible by 11
  If true: throw to monkey 7
  If false: throw to monkey 3

Monkey 3:
Starting items: 83, 96, 86, 58, 92
Operation: new = old + 8
Test: divisible by 17
  If true: throw to monkey 6
  If false: throw to monkey 1

Monkey 4:
Starting items: 99
Operation: new = old * old
Test: divisible by 5
  If true: throw to monkey 0
  If false: throw to monkey 5

Monkey 5:
Starting items: 60, 54, 83
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 6:
Starting items: 77, 67
Operation: new = old * 17
Test: divisible by 13
  If true: throw to monkey 4
  If false: throw to monkey 1

Monkey 7:
Starting items: 95, 65, 58, 76
Operation: new = old + 5
Test: divisible by 7
  If true: throw to monkey 3
  If false: throw to monkey 6`;

let inputAOCT= `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;
console.log(inputAOC);
class Monkey {
  items = [];
  isActive = 0;
  constructor(items, operation, test, firstCond, secondCond) {
    let dirtyItem = items.split(" ");
    dirtyItem.forEach((item) => {
      if (Number.isInteger(parseInt(item))) {
        this.items.push(parseInt(item));
      }
    });
    this.operation = operation.split(" ");
    // this.test = parseInt(test.slice(-1), 10);
    test = test.split(" ");
    this.test = Number(test.slice(-1));
    this.firstCond = parseInt(firstCond.slice(-1));
    this.secondCond = parseInt(secondCond.slice(-1));
  }

  throwItem(item) {
    this.isActive++;
    let newPriority = this.newPriority(item);
    // this.items = this.items.splice(1);
    this.items.shift();

    return [this.testing(newPriority), newPriority];
  }

  newPriority(old) {
    let op5 = this.operation[5] === "old" ? old : this.operation[5];
    //TODO: rimuovere assolutamente eval
    let item = eval(`${old} ${this.operation[4]} ${op5}`);
    let newItem = Math.floor(item/3)
    // console.log(newItem);
    return newItem;
  }

  testing(item) {
    // console.log(item + ' % '+ this.test + ' = '+ ((item % this.test) === 0));
    // console.log(item)
    if (item % this.test === 0) {
      // console.log('lanciando a scimmia '+this.firstCond)
      return this.firstCond;
    }
    // console.log('lanciando a scimmia '+this.secondCond)
    return this.secondCond;
  }
}
// inputAOC = inputAOC.replaceAll('"', "");
const parsedInput = inputAOC.split("\n\n");
let inst = [];
let monkeys = [];
parsedInput.forEach((el, index) => {
  inst[index] = el.split("\n");
  monkeys[index] = new Monkey(
    inst[index][1],
    inst[index][2],
    inst[index][3],
    inst[index][4],
    inst[index][5]
  );
});

// console.log(monkeys[0])
for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey, index) => {
    // console.log('############################## scimmia '+index);
    [...monkey.items].forEach((item) => {
      // console.log('--------- INIZIO')
      // console.log(monkey.items)

      let res = monkey.throwItem(item);
      let index = res[0];
      let newPriority = res[1];
      // console.log( monkeys[`${index}`].items);
      monkeys[`${index}`].items.push(newPriority);
      // console.log(monkey.items)
      // console.log( monkeys[`${index}`].items);

    });

  });
}
// console.log(monkeys);
// console.log('QQQQQQQQQQQQQQQQQQQQQQQQQ');
monkeys.forEach(monkey =>{
  console.log(monkey.isActive)
})

//66124 è la soluzione!!!

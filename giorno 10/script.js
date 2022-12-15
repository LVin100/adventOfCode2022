let inputAOC = `addx 2
addx 3
noop
addx 1
addx 27
addx -23
addx 5
noop
addx 1
noop
addx 4
addx 1
noop
addx 4
addx 5
noop
noop
noop
addx 5
addx -4
addx 4
noop
addx 1
addx -38
noop
noop
addx 7
addx 8
addx -3
noop
addx 3
noop
addx 5
noop
noop
addx -2
addx 2
addx 9
addx -2
addx 6
addx 1
addx -4
addx 5
addx 2
addx -14
addx -6
addx -16
addx 1
addx 5
addx 1
addx 4
addx -2
noop
addx -7
addx -3
addx 17
addx 5
noop
noop
addx 19
addx -16
noop
addx 14
addx -8
addx 2
noop
addx 4
noop
addx -35
addx -2
noop
noop
addx 7
addx 19
addx -26
addx 10
addx 29
addx -21
noop
addx 4
noop
noop
addx -9
addx 4
addx 8
addx 7
noop
addx -2
addx 5
addx 2
addx -19
addx -18
noop
noop
noop
noop
addx 7
addx -7
addx 37
addx -27
addx 5
addx 2
addx -12
addx 4
addx 11
noop
noop
noop
addx 5
addx -14
addx 21
addx -4
addx 5
addx 2
noop
addx -35
noop
noop
noop
noop
addx 7
addx 1
noop
noop
addx 5
addx -1
addx 5
addx 1
noop
addx 4
addx 1
noop
noop
addx 4
noop
addx 1
addx 2
addx 5
addx 2
addx 1
noop
noop
noop
noop`;
let inputAOCT = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
inputAOC = inputAOC.replaceAll('"', "");
const parsedInput = inputAOC.split("\n");
let instructions = [];
parsedInput.forEach((el, index) => {
  instructions[index] = el.split(" ");
  instructions[index][1] = parseInt(instructions[index][1]);
});

// console.log(instructions);
let x = 1;
let cycle = 0;
let cycleToStamp = [20, 60, 100, 140, 180, 220];
let sum = 0;
instructions.forEach((inst) => {
  if (inst[0] === "noop") {
    cycle++;
    sum = isCycle20(cycle, sum, x);
  } else if (inst[0] === "addx") {
    for (let i = 0; i < 2; i++) {
      cycle++;
      sum = isCycle20(cycle, sum, x);
    }
    // console.log(x+' '+inst[1]);
    x += inst[1];
  }
});

function isCycle20(cycle, sum, x) {
  if (cycleToStamp.includes(cycle)) {
    signalStrength = cycle * x;
    sum += signalStrength;
    // console.log('al '+cycle+' ciclo la somma è: '+sum);
  }
  return sum;
}
// console.log(sum);

//parte due
/*
  x corrisponde alla prima posizione dello script, quindi x<=cycle <= x+2.
  io so che la griglia è 40*6, quindi penso basti modificare la stampa a video e mantenere un unico array di 240 valori su cui fare tutti i calcoli. 
*/

let crt = [];
let screenDimension = [40, 6];
cycleToStamp = [40];

x = 0;
cycle = 0;

instructions.forEach((inst) => {
  if (inst[0] === "noop") {
    crt[cycle] = isSpriteInPixelDrawn(x, cycle);
    cycle++;
    if (cycleToStamp.includes(cycle)) {
      console.log(crt.slice(0, 40));
      crt = [];
      cycle = 0;
    }
  } else if (inst[0] === "addx") {
    for (let i = 0; i < 2; i++) {
      crt[cycle] = isSpriteInPixelDrawn(x, cycle);
      cycle++;
      if (cycleToStamp.includes(cycle)) {
        console.log(crt.slice(0, 40));
        crt = [];
        cycle = 0;
      }
    }
    // console.log(x+' '+inst[1]);
    if (cycleToStamp.includes(cycle)) {
      console.log(crt.slice(0, 40));
      crt = [];
      cycle = 0;
    }
    x += inst[1];
  }
});

function isSpriteInPixelDrawn(x, cycle) {
  // console.log(x+' ; disegnando: '+cycle);
  if (x <= cycle && cycle <= x + 2) {
    return "#";
  }
  return ".";
}

// function drowing(screenDimension, crt) {
//   for (let y = 0; y < screenDimension[1]; y++) {
//     console.log(
//       y * screenDimension[0] +
//         "; " +
//         parseInt(y * screenDimension[0] + screenDimension[0])
//     );
//     console.log(
//       crt.slice(
//         parseInt(y * screenDimension[0]),
//         parseInt(y * screenDimension[0] + screenDimension[0])
//       )
//     );
//   }
// }
// console.log(crt);
// drowing(screenDimension, crt);

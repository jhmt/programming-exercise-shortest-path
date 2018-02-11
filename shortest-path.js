let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const square = [];
const pyramid = [];
let maxXY;

rl.on('line', function(line){
  if (line) {
    square.push([...line].map(c => parseInt(c)));
  } else {
    maxXY = square.length - 1;
    initPyramid(0, 0);
    while (pyramid.length > 1) {
      setCalcResults();
    }
    console.log(pyramid[0][0]);
    rl.close();
  }
});

let initPyramid = (y, x) => {
    if (x > maxXY) return;

    let currentY = y;
    let currentX = x;

    const line = [];
    while (y >= 0 && x <= maxXY)
    {
        line.push(square[y][x]);
        x += 1;
        y -= 1;
    }
    pyramid.push(line);

    if (currentY == maxXY) currentX += 1;
    else currentY += 1;

    initPyramid(currentY, currentX);
};

let setCalcResults = () => {
    let lastLine = pyramid.pop();
    let aboveLine = pyramid.pop();

    if (lastLine.length < aboveLine.length) {
        for (let i = 0; i < aboveLine.length; i++) {
            let num1 = (i == 0)
                ? Number.MAX_SAFE_INTEGER : aboveLine[i] + lastLine[i - 1];
            let num2 = (i >= lastLine.length)
                ? Number.MAX_SAFE_INTEGER : aboveLine[i] + lastLine[i];
            aboveLine[i] = Math.min(num1, num2);
        }
    } else {
        for (let i = 0; i < aboveLine.length; i++) {
            aboveLine[i] = Math.min(
                aboveLine[i] + lastLine[i],
                aboveLine[i] + lastLine[i + 1]);
        }
    }
    pyramid.push(aboveLine);
};

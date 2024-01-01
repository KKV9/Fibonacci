const canvas = document.querySelector("canvas");
const sequence = document.getElementById("sequence");
const squares = document.getElementById("section1");
const spirals = document.getElementById("section2");
const squaresButton = document.getElementById("button1");
const spiralsButton = document.getElementById("button2");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight / 2;
c.strokeStyle = "black";

const scale = window.innerWidth > 1200 ? 9 : 4;
const startx = canvas.width / 2 - fibonacci(8) * scale;
const starty = canvas.height / 3.5;
const iterations = 10 + 1;

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function drawSquares() {
  squaresButton.disabled = true;

  let i = 1;
  let x = startx;
  let y = starty;

  squareAnimation();
  function squareAnimation() {
    if (i >= iterations) {
      squares.style.display = "block";
      return;
    }

    const squareSize = fibonacci(i) * scale;
    const lastSize = fibonacci(i - 1) * scale;
    const previous = fibonacci(i - 2) * scale;

    if (i % 7 === 0) {
      c.fillStyle = "red";
    } else if (i % 7 === 1) {
      c.fillStyle = "blue";
    } else if (i % 7 === 2) {
      c.fillStyle = "green";
    } else if (i % 7 === 3) {
      c.fillStyle = "yellow";
    } else if (i % 7 === 4) {
      c.fillStyle = "orange";
    } else if (i % 7 === 5) {
      c.fillStyle = "purple";
    } else if (i % 7 === 6) {
      c.fillStyle = "pink";
    }

    if (i % 4 === 2) {
      x = x + lastSize;
      y = y - previous;
    } else if (i % 4 === 3) {
      y = y - squareSize;
      x = x - previous;
    } else if (i % 4 === 0) {
      x = x - squareSize;
    } else if (i % 4 === 1) {
      y = y + lastSize;
    }

    let ticks = 0;

    animate();
    function animate() {
      if (ticks < 1) {
        ticks = ticks + 0.01;
        requestAnimationFrame(animate);
      } else {
        draw();
        return;
      }
    }

    function draw() {
      c.fillRect(x, y, squareSize, squareSize);
      sequence.innerHTML = "Sequence: " + fibonacci(i);
      i++;
      squareAnimation();
    }
  }
}

function drawSpiral() {
  spiralsButton.disabled = true;

  let i = 2;
  let x = startx + fibonacci(i) * scale;
  let y = starty;
  let startTurn, endTurn;

  spiralAnimation();
  function spiralAnimation() {
    if (i >= iterations) {
      spirals.style.display = "block";
      return;
    }

    sequence.innerHTML = "Sequence: " + fibonacci(i);

    const squareSize = fibonacci(i) * scale;
    const previous = fibonacci(i - 2) * scale;

    if (i % 4 === 2) {
      startTurn = Math.PI / 2;
      endTurn = 0;
      y = y - previous;
    } else if (i % 4 === 3) {
      startTurn = Math.PI * 2;
      endTurn = Math.PI * 1.5;
      x = x - previous;
    } else if (i % 4 === 0) {
      startTurn = Math.PI * 1.5;
      endTurn = Math.PI;
      y = y + previous;
    } else if (i % 4 === 1) {
      startTurn = Math.PI;
      endTurn = Math.PI / 2;
      x = x + previous;
    }

    let arc = startTurn;

    animate();
    function animate() {
      if (arc > endTurn) {
        arc = arc - 0.01;
        draw();
        requestAnimationFrame(animate);
      } else {
        i++;
        spiralAnimation();
      }
    }

    function draw() {
      c.moveTo(x, y);
      c.beginPath();
      c.arc(x, y, squareSize, startTurn, arc, true);
      c.stroke();
    }
  }
}

//Title//
document.addEventListener("DOMContentLoaded", function () {
  const fishContentDiv = document.createElement("div");
  fishContentDiv.className = "fish-content";

  const titleDiv = document.createElement("div");
  titleDiv.className = "title";

  const firstH2 = document.createElement("h2");
  firstH2.textContent = "AQUARIUM";

  const secondH2 = document.createElement("h2");
  secondH2.textContent = "AQUARIUM";

  titleDiv.appendChild(firstH2);
  titleDiv.appendChild(secondH2);

  fishContentDiv.appendChild(titleDiv);

  document.body.appendChild(fishContentDiv);
});
//Fish conteiner//
document.addEventListener("DOMContentLoaded", function () {
  var gameConteiner = document.createElement("div");
  gameConteiner.className = "game-conteiner";

  var gameBlock = document.createElement("div");
  gameBlock.className = "game-block";

  var gameButton = document.createElement("button");
  gameButton.className = "game-button";

  var playIcon = document.createElement("div");
  playIcon.className = "play-icon";

  gameButton.appendChild(playIcon);

  gameBlock.appendChild(gameButton);

  gameConteiner.appendChild(gameBlock);

  document.body.appendChild(gameConteiner);

  gameButton.addEventListener("click", () => {
    const canvas = init();
    gameBlock.appendChild(canvas);
    gameBlock.classList.add("game-fullblock");
    gameButton.style.display = "none";
    gameBlock.classList.remove("restore-animation");
    gameBlock.classList.remove("game-block");
    gameButton.style.display = "none";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      gameBlock.classList.remove("game-block");
      gameButton.style.display = "block";
      gameBlock.classList.add("restore-animation");
      gameBlock.classList.add("game-block");

      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.remove();
      }
    }
  });

  //Bubbles//
  function createBubble() {
    const createElement = document.createElement("span");
    var size = Math.random() * 60;

    createElement.style.width = 20 + size + "px";
    createElement.style.height = 20 + size + "px";
    createElement.style.left = Math.random() * innerWidth + "px";
    createElement.style.bottom = "-50px";
    gameBlock.appendChild(createElement);

    setTimeout(() => {
      createElement.remove();
    }, 4000);
  }

  setInterval(createBubble, 50);
});

//Fish//
let H,
  W,
  san,
  koi = [],
  X = 100,
  Y = 100;
let { hypot, atan2, sin, cos, random } = Math;

class Koi {
  constructor(x, y) {
    this.x = random() * W;
    this.y = random() * H;
    this.vx = 0;
    this.vy = -random() * 3 - 1;
    this.s = 0.5;
    this.dx = 0;
    this.dy = 0;
    this.a = 0;
    this.A = 0;
    this.c0 = random() * 360;
    this.c1 = `hsl(${this.c0},100%,50%)`;
    this.c2 = `hsl(${this.c0 + 50},100%,50%)`;
  }

  draw() {
    this.update();
    this.a += hypot(this.vx, this.vy) / 20;
    let An = sin(this.a);
    let k = [
      50,
      15 + An * 5,
      -20,
      30 + An * 5,
      20,
      50 + An * 5,
      50,
      15 + An * 5,
      50,
      -15 + An * 5,
      -20,
      -30 + An * 5,
      20,
      -50 + An * 5,
      50,
      -15 + An * 5,
      100,
      0,
      100,
      -40,
      0,
      -10,
      -100,
      0 + An * 30,
      0,
      10,
      100,
      40,
      100,
      0,
      90,
      -6,
      90,
      6,
      70,
      0,
      -0,
      -0,
      -95,
      0 + An * 30,
      -130,
      0 + An * 40,
      -110,
      -0 + An * 30,
      -150,
      0 + An * 30,
      -70,
      -0 + An * 30,
      -130,
      0 + An * 40,
    ];
    let p = [];
    for (let i = 0; i < 50; i += 2) {
      p.push((k[i] * cos(this.A) - k[i + 1] * sin(this.A)) * this.s);
      p.push((k[i] * sin(this.A) + k[i + 1] * cos(this.A)) * this.s);
    }

    san.beginPath();
    san.fillStyle = this.c2;
    san.moveTo(this.x + p[0], this.y + p[1]);
    san.bezierCurveTo(
      this.x + p[2],
      this.y + p[3],
      this.x + p[4],
      this.y + p[5],
      this.x + p[6],
      this.y + p[7]
    );
    san.fill();
    san.beginPath();
    san.fillStyle = this.c2;
    san.moveTo(this.x + p[8], this.y + p[9]);
    san.bezierCurveTo(
      this.x + p[10],
      this.y + p[11],
      this.x + p[12],
      this.y + p[13],
      this.x + p[14],
      this.y + p[15]
    );
    san.fill();
    san.beginPath();
    san.fillStyle = this.c1;
    san.moveTo(this.x + p[16], this.y + p[17]);
    san.bezierCurveTo(
      this.x + p[18],
      this.y + p[19],
      this.x + p[20],
      this.y + p[21],
      this.x + p[22],
      this.y + p[23]
    );
    san.bezierCurveTo(
      this.x + p[24],
      this.y + p[25],
      this.x + p[26],
      this.y + p[27],
      this.x + p[28],
      this.y + p[29]
    );
    san.fill();
    san.beginPath();
    san.fillStyle = "black";
    san.arc(this.x + p[30], this.y + p[31], 1, 0, 44 / 7);
    san.arc(this.x + p[32], this.y + p[33], 1, 0, 44 / 7);
    san.fill();

    san.beginPath();
    san.strokeStyle = this.c2;
    san.lineWidth = 0.5;
    san.moveTo(this.x + p[34], this.y + p[35]);
    san.quadraticCurveTo(
      this.x + p[36],
      this.y + p[37],
      this.x + p[38],
      this.y + p[39]
    );
    san.stroke();

    san.beginPath();
    san.fillStyle = this.c2;
    san.moveTo(this.x + p[40], this.y + p[41]);
    san.quadraticCurveTo(
      this.x + p[42],
      this.y + p[43],
      this.x + p[44],
      this.y + p[45]
    );
    san.quadraticCurveTo(
      this.x + p[46],
      this.y + p[47],
      this.x + p[48],
      this.y + p[49]
    );
    san.fill();
  }

  update() {
    this.rules();
    this.vx += this.dx * 0.002;
    this.vy += this.dy * 0.002;
    this.x += this.vx;
    this.y += this.vy;
    this.A = atan2(this.vy, this.vx);
    if (this.x > W + 100) this.x = -100;
    if (this.x < -100) this.x = W + 100;
    if (this.y > H + 100) this.y = -100;
    if (this.y < -100) this.y = H + 100;
    this.dx = 0;
    this.dy = 0;
  }

  rules() {
    let closeedKoi = [];
    koi.forEach((koi) => {
      if (koi != this && hypot(koi.x - this.x, koi.y - this.y) < 100)
        closeedKoi.push(koi);
    });
    let mouseRepelDistance = 200;
    let mouseDistance = hypot(X - this.x, Y - this.y);
    if (mouseDistance < mouseRepelDistance) {
      let repelForce = 1 - mouseDistance / mouseRepelDistance;
      this.dx -= repelForce * (X - this.x);
      this.dy -= repelForce * (Y - this.y);
    }

    if (closeedKoi.length == 0) return;
    let dx = 0;
    let dy = 0;
    for (let koi of closeedKoi) {
      let d = hypot(koi.x - this.x, koi.y - this.y);
      dx -= (1 - d / 100) * (koi.x - this.x);
      dy -= (1 - d / 100) * (koi.y - this.y);
    }
    this.dx += dx;
    this.dy += dy;

    this.vx *= 0.9995;
    this.vy *= 0.9995;
  }
}

const Click = (e) => {
  X = e.clientX * 2;
  Y = e.clientY * 2;
  koi.forEach((koi) => {
    let dx = koi.x - X;
    let dy = koi.y - Y;
    let distance = hypot(dx, dy);
    if (distance < 500) {
      let scaleFactor = (1 - distance / 500) * 10;
      koi.dx += dx * scaleFactor;
      koi.dy += dy * scaleFactor;
    }
  });
};

const M = (e) => {
  X = e.touches[0].pageX * 2;
  Y = e.touches[0].pageY * 2;
  koi.forEach((koi) => {
    let dx = koi.x - X;
    let dy = koi.y - Y;
    let distance = hypot(dx, dy);
    if (distance < 200) {
      let scaleFactor = (1 - distance / 200) * 10;
      koi.dx += dx * scaleFactor;
      koi.dy += dy * scaleFactor;
    }
  });
};

const Loop = () => {
  san.fillStyle = "rgb(0,169,244)";
  san.fillRect(0, 0, W, H);
  san.fill();
  koi.forEach((v) => v.draw());
  webkitRequestAnimationFrame(Loop);
};

const init = () => {
  document.body.style.margin = 0;
  let c = document.createElement("canvas");
  document.body.appendChild(c);
  c.style.cursor = "pointer";
  c.style.width = "100%";
  c.style.height = "100vh";
  c.height = H = innerHeight * 2;
  c.width = W = innerWidth * 2;
  san = c.getContext("2d");
  for (let i = 0; i < 50; i++) {
    koi.push(new Koi(200, 100 + i * 100));
  }
  c.onclick = Click;
  c.ontouchmove = M;
  Loop();

  return c;
};

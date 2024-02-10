console.log("hello");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = canvas.height = 700;
const CANVAS_WIDTH = canvas.width = 800;
let gameSpeed = 5;

const background1 = new Image();
background1.src = "layer-1.png";
const background2 = new Image();
background2.src = "layer-2.png";
const background3 = new Image();
background3.src = "layer-3.png";
const background4 = new Image();
background4.src = "layer-4.png";
const background5 = new Image();
background5.src = "layer-5.png";

const slider = document.getElementById('slider');
slider.value=gameSpeed;
const showspeed = document.getElementById('showspeed');
showspeed.innerHTML=gameSpeed;
slider.addEventListener('change',function(e){
  gameSpeed = e.target.value;
  showspeed.innerHTML = e.target.value;
})


class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    
    this.x2 = 2400;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(background1, 0.2);
const layer2 = new Layer(background2, 0.4);
const layer3 = new Layer(background3, 0.6);
const layer4 = new Layer(background4, 0.8);
const layer5 = new Layer(background5, 1);
const gameobjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameobjects.forEach((object) => {
    object.update();
    object.draw();
  });
  
  requestAnimationFrame(animate);
}

animate();

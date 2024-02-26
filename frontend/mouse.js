class Mouse {
  constructor(x,y,color,username) {
    this.x = x ?x :this.randomNumber(100,canvas.width-100);
    this.y = y ?y: this.randomNumber(100,canvas.height-100);
    this.color = color ? color : this.generateRandomColor();
    this.state = [];
    this.username = username
    this.drawMouse(this.x, this.y);
    
  }
  

  generateRandomColor() {
    let randomNumber = Math.floor(Math.random() * 16777215);
    let randomColor = randomNumber.toString(16);
    randomColor = randomColor.padStart(6, "0");
    return "#" + randomColor;
  }

  randomNumber(max,min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  drawMouse(x, y) {
    context.fillStyle = this.color;
    context.fillRect(x, y, 60, 60);
  }

  drawline(x, y, x1, y1) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x1, y1);
    context.lineWidth = 5;
    context.lineCap = "round";
    context.stroke();
    context.closePath();
  }

  setCoor(x, y) {
    this.x = x;
    this.y = y;
  }
action(x, y) {
    if (x <= 0 || y <= 0 || x >= canvas.width-60|| y >= canvas.height-60) return;          
    context.clearRect(this.x, this.y, 60, 60);
    DrawLine(this);
    this.drawMouse(x, y);          
    this.setCoor(x, y);
  }
  
  Moves(type) {
    let x = this.x;
    let y = this.y;
   
    switch (type) {
      case "f":
        y -= 30;
        break;
      case "b":
        y += 30;
        break;
      case "l":
        x -= 30;
        break;
      case "r":
        x+= 30;
        break;
    }
    
    this.state.push(
    {
    from: { x: this.x, y: this.y },
    to: { x, y },
    type,
      }
    )
    this.action(x, y);
  }
  
}

function DrawLine(mouse) {
  mouse.state.forEach((s) => {
    const { to, from, type } = s;

    mouse.drawline(from.x + 30, from.y + 30, to.x + 30, to.y + 30);
  });
}


function DrawAllMouses() {
  All_MOUSES.forEach(m => {
                DrawLine(m);
                m.drawMouse(m.x,m.y); 
  })
}


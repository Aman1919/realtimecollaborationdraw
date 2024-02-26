
const mouse = new Mouse();
All_MOUSES.push(mouse);
forward.onclick = () => {
  mouse.Moves('f');
  SendMove('f')
};

backword.onclick = () => {
  mouse.Moves('b')
  SendMove('b')
};

left.onclick = () => {
  mouse.Moves('l');
SendMove('l')
};
right.onclick = () => {
mouse.Moves('r')
  SendMove('r');
};


function SendMove(type) {
  if (!(ws&&ws.readyState === WebSocket.OPEN)) return
  ws.send(JSON.stringify({
  type,meta:'move',roomid:room,username
  }))
  DrawAllMouses();
  
}
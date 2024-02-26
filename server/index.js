const WebSockets = require("ws");
const {createRoom,joinRoom,move,closing}= require('./functions')
const wss = new WebSockets.Server({ port: 8080 });



wss.on("connection", (ws) => {
  console.log("new Client Connected!!");
  
  ws.on("message", (recieveData) => {
  const data = JSON.parse(recieveData);  
  const {meta} = data;
  
    switch (meta) {
        case "create_room":
          createRoom(data,ws);
          break;
        case "join_room":
          joinRoom(data,ws);
          break;
        case "move":
          move(data,ws);
        break;
      case 'closed':
        closing(data, ws);       
        break;
        default:
          ws.send(JSON.stringify({
            "message":"Unsupported meta data provided provide valid data",
            "status":0
          }));
          break;
    }
    
  });
  ws.on("close", () => {
    closing(ws);
  });
});


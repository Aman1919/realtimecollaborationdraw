const uuid = require("uuid");
const rooms = {};

function createRoom(data, ws) {
        const roomid = uuid.v4();
        const { username, mousedetails } = data;
        rooms[roomid] = [];
        const obj = { username, mousedetails ,ws};
        rooms[roomid].push(obj);

        ws["roomID"] = roomid;
        ws["clientID"] = username;
        ws["admin"] = true;
        ws.send(
                JSON.stringify({
                        message: "room created succesfully",
                        status: 1,
                        roomid,
                        meta:"created_room"
                })
        );
}

function joinRoom(data, ws) {
        const { roomid, username, mousedetails } = data;
        if (!(roomid in rooms)) {
                ws.send(
                        JSON.stringify({
                                message: "Not a Valid Room Id",
                                status: 0,
                        })
                );
                return;
        }
        const obj = { username, mousedetails ,ws};
        rooms[roomid].push(obj);
        ws["roomID"] = roomid;
        ws["clientID"] = username;
        ws.send(
                JSON.stringify({
                        message: "Joined succesfully",
                        status: 1,
                        meta:"joined_room"
                        
                })
        );
        sendUsers(roomid);
}

function sendUsers(roomid) {
        const copyRoom = [];
        for (let r of rooms[roomid]) {
                const {username,mousedetails} = r
                copyRoom.push({ username, mousedetails})
        }
rooms[roomid].forEach((room,i)=> {
room.ws.send(JSON.stringify({users: copyRoom.filter((r,j)=>(i!==j)),meta:"send_users"}))
});
}

function move(data, ws) {
        const { type, roomid, username } = data;
console.log(data);
        rooms[roomid].forEach((room, i) => {
room.ws.send(JSON.stringify({type,movedUser:username,meta:"move"}))
});
}

function closing(ws) {
        console.log("this client has disconnected")
//     const username = ws['clientID']
//     const room = ws['roomID'];
// rooms[room] = rooms[room].filter(user => {
//                 user.username !== username;
// })
//         if (rooms[room].length === 0) delete rooms[room];
//         else {
//                 rooms[room].forEach(user => {
//                         user.ws.send(JSON.stringify({ meta: 'user_disconnected', disconnectedUser:username }));
//                 })
//         }
//         console.log(rooms);
}

module.exports = { createRoom, joinRoom, move ,closing};

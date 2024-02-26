createRoom.onclick = () => {
        username = prompt("Enter Your Username");
        if (!username) {
                alert("Enter valid username");
                return;
        }
        ws = new WebSocket("ws://localhost:8080");

        ws.addEventListener("open", () => {
                console.log("we are connected");
                ws.send(
                        JSON.stringify({
                                username,
                                mousedetails: { x: mouse.x, y: mouse.y, color: mouse.color },
                                meta: "create_room",
                        })
                );
        });

        WebSocketsOnMessage();
        stopShare.style.display = "block";
        liveShare.style.display = "none";
        dropdownDiv.style.display = "none";
};

joinRoom.onclick = () => {
        username = prompt("Enter Your Username");
        if (!username) {
                alert("Enter valid username");
                return;
        }
        room = prompt("Enter Room id: ");
        if (!room) {
                alert("Enter valid room: ");
                return;
        }

        ws = new WebSocket("ws://localhost:8080");

        ws.addEventListener("open", () => {
                console.log("we are connected");
                ws.send(
                        JSON.stringify({
                                username,
                                mousedetails: { x: mouse.x, y: mouse.y, color: mouse.color },
                                meta: "join_room",
                                roomid: room,
                        })
                );
        });

        WebSocketsOnMessage();
        stopShare.style.display = "block";
        liveShare.style.display = "none";
        dropdownDiv.style.display = "none";
};

function WebSocketsOnMessage() {
        ws.onmessage = (evnt) => {
                const data = JSON.parse(evnt.data);
                const { meta, status, roomid, users, disconnectedUser, type, movedUser } =
                        data;
                if (status && status === 0) {
                        alert("Some error happened while creating a room");
                        return;
                }
                if (meta === "created_room") {
                        room = roomid;
                } else if (meta === "send_users") {
                        SendUsers();
                } else if (meta === "move") {
                        MoveUser(type, movedUser);
                        console.log(data);
                } else if (meta === "joined_users") {
                } else if (meta === "user_disconnected") {
                        Users = Users.filter((user) => {
                                user.username !== disconnectedUser;
                        });
                }
                liveColabDiv.style.display = "flex";
                document.getElementById(
                        "roomiddiv"
                ).innerHTML = `<p class="h6 text-light">RoomId: ${room}</p>`;
                document.getElementById(
                        "username"
                ).innerHTML = `<p class="h6" style="color:${mouse.color};">Your Name: ${username}</p>`;
        };
}

function MoveUser(type, movedUser) {
        All_MOUSES.forEach((m) => {
                if (m.username === movedUser)m.Moves(type);
                DrawLine(m);
                m.drawMouse(m.x,m.y);
        });
        // DrawAllMouses();
}

function SendUsers() {
                        All_MOUSES = [mouse];
                        users.forEach((user) => {
                                const { username, mousedetails } = user;
                                All_MOUSES.push(
                                        new Mouse(
                                                mousedetails.x,
                                                mousedetails.y,
                                                mousedetails.color,
                                                username
                                        )
                                );
                        });

                        document.getElementById(
                                "joinedUser"
                        ).innerHTML = `<p class='h6 text-light'>Joined Users: </p>`;
                        for (let i = 0; i < All_MOUSES.length; i++) {
                            if (!All_MOUSES[i].username || All_MOUSES[i].username === username) continue;
                                
                                document.getElementById(
                                        "joinedUser"
                                ).innerHTML += `<p class='h6' style="color:${All_MOUSES[i].color};">${All_MOUSES[i].username}</p>`;
                        }
                        CreateUserMouses();
}

stopShare.onclick = () => {
        liveShare.style.display = "block";
        stopShare.style.display = "none";
        liveColabDiv.style.display = "none";
        ws.close();
};

function CreateUserMouses() {
        Users.forEach((user) => {
                const { username, mousedetails } = user;
                All_MOUSES.push(
                        new Mouse(mousedetails.x, mousedetails.y, mousedetails.color, username)
                );
        });
}

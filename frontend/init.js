const forward = document.getElementById("forward");
const backword = document.getElementById("backward");
const right = document.getElementById("right");
const left = document.getElementById("left");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const liveShare = document.getElementById('liveShare')
const stopShare = document.getElementById('stopShare');
const dropdownDiv = document.querySelector('.dropdown')
const createRoom = document.getElementById('createRoom');
const joinRoom = document.getElementById('joinRoom');
const liveColabDiv = document.querySelector('#liveColabDiv')
const joinedUser = document.getElementById('joinedUser');
const userDetailsDiv = document.getElementById('userdetails');
let ws, room, Users = [];
let All_MOUSES = [];
let username = '';
canvas.width = window.innerWidth*0.9;
canvas.height = window.innerHeight*0.75;



liveShare.onclick = () => {
        if (dropdownDiv.style.display === 'none') {
        dropdownDiv.style.display = 'flex'
        } else {
        dropdownDiv.style.display = 'none'
        }

}



/**
3 main problems (priority wise):-
3. implement the movement of mouse in other browser
1. stop sharing - close the event from client and server which sends other users to reload
2. resize - any mouse should to able to resize on any screen
4. add mutiple mouse
 */
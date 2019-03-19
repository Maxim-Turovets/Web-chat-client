// section
const connectInfo = document.querySelector(".connect-info");
const generalInfo = document.querySelector(".general-info");
const chatWindow = document.querySelector(".container-chat-form");
const userInfo = document.querySelector(".user-info");
const interlocutorInfo = document.querySelector(".interlocutor-info");
const contaonerMessage = document.querySelector(".container-messages");
const loading = document.getElementById("loading");

// button
const btnPair = document.getElementById("btnPair");
const btnGeneral = document.getElementById("btnGeneral");
const btnGeneralConnect = document.getElementById("btnGeneralConnect");
const btnSend = document.getElementById("btnSend");
const btnMale = document.getElementById("btnMale");
const btnFemale = document.getElementById("btnFemale");
const btnNext = document.getElementById("btnNext");
const btnInterlocutorMale = document.getElementById("btnInterlocutorMale");
const btnInterlocutorFemale = document.getElementById("btnInterlocutorFemale");
const btnSearch = document.getElementById("btnSearch");
const BtnGenChat = document.querySelector(".container-btn-general-chat");
const BtnGirl = document.querySelector(".container-btn-im-girl");
const BtnBoy = document.querySelector(".container-btn-im-boy");

//input
const inpGeneralName = document.getElementById("inpGeneralName");
const inpMessage = document.getElementById("inpMessage");
const inpUserName = document.getElementById("inpUserName");
const inpAge = document.getElementById("inpAge");
const inpInterlocutorAgeFrom = document.getElementById("inpInterlocutorAgeFrom");
const inpInterlocutorAgeTo = document.getElementById("inpInterlocutorAgeTo");
const name = document.querySelector(".input-name");
const text = document.querySelector(".input-text");

const con = new WebSocket("ws://77.47.224.135:8080/sock/chat");

// json structure
let UserInfo={
    objectType:"UserInfo",
    name:"",
    gender:"",
    age:"",
    voiceMessage:false
}

let ConnectInfo={
    objectType:"ConnectInfo",
    chatType:""
}

let InterlocutorInfo={
    objectType:"InterlocutorInfo",
    gender:"",
    ageFrom:"",
    ageTo:""
}



btnSend.addEventListener("click", e => btnSendPress());
btnGeneral.addEventListener("click", e => btnGenChatPress());
btnPair.addEventListener("click", e => btnPairChatPress());
btnGeneralConnect.addEventListener("click", e => btnGeneralConnectPress());
btnMale.addEventListener("click", e => btnMalePress());
btnFemale.addEventListener("click", e => btnFemalePress());
btnNext.addEventListener("click", e => btnNextPress());
btnInterlocutorMale.addEventListener("click", e => btnInterlocutorMalePress());
btnInterlocutorFemale.addEventListener("click", e => btnInterlocutorFemalePress());
btnSearch.addEventListener("click", e => btnSearchPress());

// text.addEventListener("keyup", function (event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         btnSendPress();
//     }
// });


// const createOtherMessage = text => {
//     let jsonRequest = JSON.parse(text);
//     if (jsonRequest.text === "none" && jsonRequest.authkey === "general"&&jsonRequest.name!="none") {
//         createAlertNewUser(jsonRequest.name);
//     }
//     else {
//         const d = document.createElement('div');
//         let html = "";
//         html += "<div class=\"row\">";
//         html += "<div class=\"col-12\">";
//         if (jsonRequest.name === "") {
//             html += "<div class=\"name float-left\">" + "Anonymous" + "</div>";
//         } else {
//             html += "<div class=\"name float-left\">" + jsonRequest.name + "</div>";
//         }
//         html += "</div></div>";
//         html += "<div class=\"row\">";
//         html += "<div class=\"col-sm-12\">";
//         html += "<div class=\"other-messages float-left\" id=\"message-" + messageCount.toString() + "\">" + jsonRequest.text + "";
//
//         html += "</div></div>";
//         d.innerHTML = html;
//         document.querySelector(".container-messages").appendChild(d);
//         let audio = new Audio('message.mp3');
//         audio.volume = 1;
//         audio.play();
//     }
//     document.location.href = "#message-" + messageCount.toString();
// };

con.onopen = () => {
    console.log('connected');
};
con.onclose = () => {
    console.log('closed');
};

con.onmessage = event => {
    // console.log(event.data);
    if(event.data==="created")
    {
        loading.style.display="none";
        interlocutorInfo.style.display="none";
        contaonerMessage.style.display="block";
        //console.log(event.data);
        createAlertNewUser();
    }
    //createOtherMessage(event.data);
};

function btnSendPress(qualifiedName, value) {
    console.log("cl");
    let json ={
        name:inpGeneralName.value,
        text:inpMessage.value
    }
    con.send(JSON.stringify(json));
    createMyMessage();
    clearInput();
}

function btnGenChatPress(qualifiedName, value) {
    ConnectInfo.chatType="general";
    con.send(JSON.stringify(ConnectInfo));
    connectInfo.style.display = "none";
    generalInfo.style.display="block";
}

function btnPairChatPress(qualifiedName, value) {
    ConnectInfo.chatType="pair";
    con.send(JSON.stringify(ConnectInfo));
    connectInfo.style.display = "none";
    userInfo.style.display="block";
}


function createMyMessage() {
    const d = document.createElement('div');
    let safetyMessage = text.value.replace(/[<]/g, "&lt");
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"name float-right\">" + generalInfo.value + "</div>";
    html += "</div></div>";
    html += "<div class=\"row\">";
    html += "<div class=\"col-sm-12\">";
    html += "<div class=\"my-messages float-right\" id=\"message-" + messageCount.toString() + "\">" + safetyMessage + "</div>";
    html += "</div></div>";
    d.innerHTML = html;
    document.querySelector(".container-messages").appendChild(d);
}
//
// function clearInput() {
//     document.getElementById("text-input").value = "";
// }
//
function createAlertNewUser() {
    const d = document.createElement('div');
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-sm-12\">";
    html += "<div class=\"new-user text-center\" id=\"message-"  + "\">" + " joined the chat</div></div>";
    html += "</div>";
    d.innerHTML = html;
    document.querySelector(".container-messages").appendChild(d);
}




function  btnGeneralConnectPress(){
    generalInfo.style.display="none";
    chatWindow.style.display="block";
}

function btnMalePress() {
    UserInfo.gender="male";
}
function btnFemalePress() {
    UserInfo.gender="female";
}

function btnVoiceMessagePress() {
    UserInfo.voiceMessage=true;
}

function btnNextPress() {
    UserInfo.name = inpUserName.value;
    UserInfo.age = inpAge.value;
    con.send(JSON.stringify(UserInfo));
    userInfo.style.display="none";
    interlocutorInfo.style.display="block";
}

function btnInterlocutorMalePress() {
    InterlocutorInfo.gender ="male";
}
function btnInterlocutorFemalePress() {
    InterlocutorInfo.gender ="female";
}
function btnSearchPress() {
    InterlocutorInfo.ageFrom = inpInterlocutorAgeFrom.value;
    InterlocutorInfo.ageTo = inpInterlocutorAgeTo.value;
    con.send(JSON.stringify(InterlocutorInfo));
    loading.style.display="block";
    interlocutorInfo.style.display="none";

}






// const BtnSend = document.querySelector(".container-btn-send");
// const BtnGenChat = document.querySelector(".container-btn-general-chat");
// const BtnPrivChat = document.querySelector(".container-btn-private-chat");
// const BtnGirl = document.querySelector(".container-btn-im-girl");
// const BtnBoy = document.querySelector(".container-btn-im-boy");
// const name = document.querySelector(".input-name");
// const text = document.querySelector(".input-text");
// const con = new WebSocket("ws://77.47.224.135:8080/sock/chat");
// let messageCount = 0;
// let gender = "none";
// let chatType = "none";
//
//
// BtnSend.addEventListener("click", e => btnSendPress());
// BtnGenChat.addEventListener("click", e => btnGenChatPress());
// BtnPrivChat.addEventListener("click", e => btnPrivateChatPress());
// BtnGirl.addEventListener("click", e => btnGirlPress());
// BtnBoy.addEventListener("click", e => btnBoyPress());
//
// text.addEventListener("keyup", function (event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         btnSendPress();
//     }
// });
//
//
// const createOtherMessage = text => {
//     let jsonRequest = JSON.parse(text);
//     if (jsonRequest.text === "none" && jsonRequest.authkey === "general"&&jsonRequest.name!="none") {
//         createAlertNewUser(jsonRequest.name);
//     }
//     else {
//         const d = document.createElement('div');
//         let html = "";
//         html += "<div class=\"row\">";
//         html += "<div class=\"col-12\">";
//         if (jsonRequest.name === "") {
//             html += "<div class=\"name float-left\">" + "Anonymous" + "</div>";
//         } else {
//             html += "<div class=\"name float-left\">" + jsonRequest.name + "</div>";
//         }
//         html += "</div></div>";
//         html += "<div class=\"row\">";
//         html += "<div class=\"col-sm-12\">";
//         html += "<div class=\"other-messages float-left\" id=\"message-" + messageCount.toString() + "\">" + jsonRequest.text + "";
//
//         html += "</div></div>";
//         d.innerHTML = html;
//         document.querySelector(".container-messages").appendChild(d);
//         let audio = new Audio('message.mp3');
//         audio.volume = 1;
//         audio.play();
//     }
//     // document.location.href = "#message-" + messageCount.toString();
// };
//
// con.onopen = () => {
//     console.log('connected');
// };
// con.onclose = () => {
//     console.log('closed');
// };
//
// con.onmessage = event => {
//     createOtherMessage(event.data);
// };
//
// function btnSendPress(qualifiedName, value) {
//     let json = "";
//     let safetyMessage = text.value.replace(/[<]/g, "&lt");
//
//     json += "{\"name\":\"" + name.value + "\",\"text\":\"" + safetyMessage + "\",\"authkey\":\"" + chatType +"\"}";
//     // con.send(json);
//     console.log(json);
//     createMyMessage();
//     clearInput();
// }
//
// function btnGenChatPress(qualifiedName, value) {
//     document.querySelector(".container-login-form").setAttribute("style", "display:none");
//     document.querySelector(".container-chat-form").removeAttribute("style");
//     chatType = "general";
//     createAlertNewUser(name.value);
//     newUserLogin();
// }
//
// function btnPrivateChatPress(qualifiedName, value) {
//     document.querySelector(".container-login-form").setAttribute("style", "display:none");
//     document.querySelector(".container-chat-form").removeAttribute("style");
//     chatType = "pair";
//     createAlertNewUser(name);
//     newUserLogin();
// }
//
// function newUserLogin() { //    send message about new user login
//     let json = {
//         name:name.value,
//         text:"none",
//         authkey:"general"
//     };
//     con.send(JSON.stringify(json));
// }
//
//
// function createMyMessage() {
//     messageCount++;
//
//     const d = document.createElement('div');
//     let safetyMessage = text.value.replace(/[<]/g, "&lt");
//     let html = "";
//     html += "<div class=\"row\">";
//     html += "<div class=\"col-12\">";
//     html += "<div class=\"name float-right\">" + name.value + "</div>";
//     html += "</div></div>";
//     html += "<div class=\"row\">";
//     html += "<div class=\"col-sm-12\">";
//     html += "<div class=\"my-messages float-right\" id=\"message-" + messageCount.toString() + "\">" + safetyMessage + "</div>";
//     html += "</div></div>";
//     d.innerHTML = html;
//     document.querySelector(".container-messages").appendChild(d);
//     document.location.href = "#message-" + messageCount.toString();
// }
//
// function clearInput() {
//     document.getElementById("text-input").value = "";
// }
//
// function createAlertNewUser(n) {
//     const d = document.createElement('div');
//     messageCount++;
//     let html = "";
//     html += "<div class=\"row\">";
//     html += "<div class=\"col-sm-12\">";
//     html += "<div class=\"new-user text-center\" id=\"message-" + messageCount.toString() + "\">" + n + " joined the chat</div></div>";
//     html += "</div>";
//     d.innerHTML = html;
//     document.querySelector(".container-messages").appendChild(d);
//     let audio = new Audio('message.mp3');
//     audio.volume = 1;
//     audio.play();
//     document.location.href = "#message-" + messageCount.toString();
// }
//
// function btnGirlPress() {
//     gender = "girl";
// }
//
// function btnBoyPress() {
//     gender = "boy";
// }

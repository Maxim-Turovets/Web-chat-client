const BtnSend = document.querySelector(".container-btn-send");
const BtnGenChat = document.querySelector(".container-btn-general-chat");
const BtnPrivChat = document.querySelector(".container-btn-private-chat");
const BtnGirl = document.querySelector(".container-btn-im-girl");
const BtnBoy = document.querySelector(".container-btn-im-boy");
const name = document.querySelector(".input-name");
const text = document.querySelector(".input-text");
const con = new WebSocket("ws://77.47.224.135:8080/sock/chat");
let messageCount = 0;
let gender = "none";
let chatType = "none";


BtnSend.addEventListener("click", e => btnSendPress());
BtnGenChat.addEventListener("click", e => btnGenChatPress());
BtnPrivChat.addEventListener("click", e => btnPrivateChatPress());
BtnGirl.addEventListener("click", e => btnGirlPress());
BtnBoy.addEventListener("click", e => btnBoyPress());

text.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        btnSendPress();
    }
});


const createOtherMessage = text => {
    let jsonRequest = JSON.parse(text);
    if (jsonRequest.text === "none" && jsonRequest.authkey === "general"&&jsonRequest.name!="none") {
        createAlertNewUser(jsonRequest.name);
    }
    else {
        const d = document.createElement('div');
        let html = "";
        html += "<div class=\"row\">";
        html += "<div class=\"col-12\">";
        if (jsonRequest.name === "") {
            html += "<div class=\"name float-left\">" + "Anonymous" + "</div>";
        } else {
            html += "<div class=\"name float-left\">" + jsonRequest.name + "</div>";
        }
        html += "</div></div>";
        html += "<div class=\"row\">";
        html += "<div class=\"col-sm-12\">";
        html += "<div class=\"other-messages float-left\" id=\"message-" + messageCount.toString() + "\">" + jsonRequest.text + "";

        html += "</div></div>";
        d.innerHTML = html;
        document.querySelector(".container-messages").appendChild(d);
        let audio = new Audio('message.mp3');
        audio.volume = 1;
        audio.play();
    }
    // document.location.href = "#message-" + messageCount.toString();
};

con.onopen = () => {
    console.log('connected');
};
con.onclose = () => {
    console.log('closed');
};

con.onmessage = event => {
    createOtherMessage(event.data);
};

function btnSendPress(qualifiedName, value) {
    let json = "";
    let safetyMessage = text.value.replace(/[<]/g, "&lt");

    json += "{\"name\":\"" + name.value + "\",\"text\":\"" + safetyMessage + "\",\"authkey\":\"" + chatType +"\"}";
    // con.send(json);
    console.log(json);
    createMyMessage();
    clearInput();
}

function btnGenChatPress(qualifiedName, value) {
    document.querySelector(".container-login-form").setAttribute("style", "display:none");
    document.querySelector(".container-chat-form").removeAttribute("style");
    chatType = "general";
    createAlertNewUser(name.value);
    newUserLogin();
}

function btnPrivateChatPress(qualifiedName, value) {
    document.querySelector(".container-login-form").setAttribute("style", "display:none");
    document.querySelector(".container-chat-form").removeAttribute("style");
    chatType = "pair";
    createAlertNewUser(name);
    newUserLogin();
}

function newUserLogin() { //    send message about new user login
    let json = {
        name:name.value,
        text:"none",
        authkey:"general"
    };
    con.send(JSON.stringify(json));
}


function createMyMessage() {
    messageCount++;

    const d = document.createElement('div');
    let safetyMessage = text.value.replace(/[<]/g, "&lt");
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"name float-right\">" + name.value + "</div>";
    html += "</div></div>";
    html += "<div class=\"row\">";
    html += "<div class=\"col-sm-12\">";
    html += "<div class=\"my-messages float-right\" id=\"message-" + messageCount.toString() + "\">" + safetyMessage + "</div>";
    html += "</div></div>";
    d.innerHTML = html;
    document.querySelector(".container-messages").appendChild(d);
    document.location.href = "#message-" + messageCount.toString();
}

function clearInput() {
    document.getElementById("text-input").value = "";
}

function createAlertNewUser(n) {
    const d = document.createElement('div');
    messageCount++;
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-sm-12\">";
    html += "<div class=\"new-user text-center\" id=\"message-" + messageCount.toString() + "\">" + n + " joined the chat</div></div>";
    html += "</div>";
    d.innerHTML = html;
    document.querySelector(".container-messages").appendChild(d);
    let audio = new Audio('message.mp3');
    audio.volume = 1;
    audio.play();
    document.location.href = "#message-" + messageCount.toString();
}

function btnGirlPress() {
    gender = "girl";
}

function btnBoyPress() {
    gender = "boy";
}

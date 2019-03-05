const Btn = document.querySelector(".container-btn");
const name = document.querySelector(".input-name");
const text = document.querySelector(".input-text");
const enter = document.querySelector(".container-page");
const con = new WebSocket("ws://10.25.128.239:8080/sock/chat");
let mes = "";
Btn.addEventListener("click", e => btnSendPress());

const createOtherMessage = text => {
    // {"name":"John","text":"Hello"};
    const d = document.createElement('div');
    let jsonRequest = JSON.parse(text);
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"name float-left\">" + jsonRequest.name + "</div>";
    html += "</div></div>"
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"other-messages float-left\">" + jsonRequest.text + "</div>";
    html += "</div></div>"
    d.innerHTML = html;
    document.querySelector(".container-messages").appendChild(d);
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

function btnSendPress() {
    // let json = "";
    // json += "{\"name\":\"" + name.value +"\",\"text\":\"" + text.value + "\" }";
    // con.send(json);
    createMyMessage();
    clearInput();
}

function createMyMessage() {
    const d = document.createElement('div');
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"name float-right\">" + name.value + "</div>";
    html += "</div></div>"
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"my-messages float-right\">" + text.value + "</div>";
    html += "</div></div>"
    d.innerHTML = html;
    document.querySelector(".container-messages").appendChild(d);
}

function clearInput() {
    document.getElementById("text-input").value = "";
}
// section
const containerChatType = document.getElementById("containerChatType");
const containerSetGender = document.getElementById("containerSetGender");
const containerSetAge = document.getElementById("containerSetAge");
const containerSetName = document.getElementById("containerSetName");
const containerSettingsVoiceMessage = document.getElementById("containerSettingsVoiceMessage");
const containerLoading = document.getElementById("containerLoading");
const containerPartnersGender = document.getElementById("containerPartnersGender");
const containerSetPartnerAge = document.getElementById("containerSetPartnerAge");
const containerChatForm = document.getElementById("containerChatForm");
const containerMessageBlock = document.getElementById("container_message_block");
const menuBlock = document.getElementById("menuBlock");


const containerMessage = document.getElementById("containerMessage");
const messageSend =document.getElementById("message-send");

// button
const btnPrivate = document.getElementById("btnPrivate");
const btnGeneral = document.getElementById("btnGeneral");
const btnSetNameNext = document.getElementById("btnSetNameNext");
const btnSetGenderMale = document.getElementById("btnSetGenderMale");
const btnSetGenderFemale= document.getElementById("btnSetGenderFemale");
const btnSetAgeNext = document.getElementById("btnSetAgeNext");
const btnVoiceMessageYes = document.getElementById("btnVoiceMessageYes");
const btnVoiceMessageNo = document.getElementById("btnVoiceMessageNo");
const btnPartnerMale = document.getElementById("btnPartnerMale");
const btnPartnerFemale = document.getElementById("btnPartnerFemale");
const btnSearch = document.getElementById("btnSearch");
const btnSend = document.getElementById("btnSend");

//input
const inpSetName = document.getElementById("inpSetName");
const inpSetAge = document.getElementById("inpSetAge");
const inpPartnersAgeFrom = document.getElementById("inpPartnersAgeFrom");
const inpPartnersAgeTo = document.getElementById("inpPartnersAgeTo");
const inpText = document.getElementById("inpText");



const text = document.querySelector(".input-text");
const con = new WebSocket("ws://77.47.224.135:8080/sock/chat");

// json structure
let UserInfo={
    objectType:"UserInfo",
    name:"",
    gender:"",
    age:"",
    voiceMessage:false
};

let ConnectInfo={
    objectType:"ConnectInfo",
    chatType:""
};

let InterlocutorInfo={
    objectType:"InterlocutorInfo",
    gender:"",
    ageFrom:"",
    ageTo:""
};

let Message ={
    objectType:"Message",
    name:"",
    text:""
};

let IfRoomCreated={
    objectType:"IfRoomCreated",
    nameInterlocutor:""
}


btnGeneral.addEventListener("click", e => btnGenChatPress());
btnPrivate.addEventListener("click", e => btnPrivatePress());
btnSetNameNext.addEventListener("click", e => btnSetNamePress());
btnSetGenderMale.addEventListener("click", e => btnSetGenderMalePress());
btnSetGenderFemale.addEventListener("click", e => btnSetGenderFemalePress());
btnSetAgeNext.addEventListener("click", e => btnSetAgeNextPress());
btnVoiceMessageYes.addEventListener("click", e => btnVoiceMessageYesPress());
btnVoiceMessageNo.addEventListener("click", e => btnVoiceMessageNoPress());
btnPartnerMale.addEventListener("click", e => btnPartnerMalePress());
btnPartnerFemale.addEventListener("click", e => btnPartnerFemalePress());
btnSearch.addEventListener("click", e => btnSearchPress());
btnSend.addEventListener("click", e => btnSendPress());





con.onopen = () => {
    console.log('connected');
};
con.onclose = () => {
    console.log('closed');
};

con.onmessage = event => {
    console.log(event.data);
    createAlertNewUser(event.data);
    createOtherMessage(event.data);
};

function btnSendPress(qualifiedName, value) {
    Message.name = UserInfo.name;
    Message.text = inpText.value;
    con.send(JSON.stringify(Message));
    createMyMessage();
}

function btnGenChatPress(qualifiedName, value) {
    ConnectInfo.chatType="general";
    con.send(JSON.stringify(ConnectInfo));
    containerChatType.style.display = "none";
    containerSetName.style.display="block";
}

function btnPrivatePress(qualifiedName, value) {
       ConnectInfo.chatType="pair";
       //con.send(JSON.stringify(ConnectInfo));
       //containerChatType.style.display = "none";
       //containerSetName.style.display="block";
 }

const createOtherMessage = text => {
    let jsonRequest = JSON.parse(text);
      
       if(jsonRequest.objectType === "Message")
       {
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
        html += "<div class=\"other-messages float-left\" id=\"message-\">" + jsonRequest.text + "";

        html += "</div></div>";
        d.innerHTML = html;
        document.getElementById("containerMessage").appendChild(d);
        let audio = new Audio('message.mp3');
        audio.volume = 1;
        audio.play();
       }
};
function createMyMessage() {
    const d = document.createElement('div');
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"name float-right\">" + Message.name + "</div>";
    html += "</div></div>";
    html += "<div class=\"row\">";
    html += "<div class=\"col-sm-12\">";
    html += "<div class=\"my-messages float-right\" id=\"message-"+ "\">" + Message.text.replace(/[<]/g, "&lt") + "</div>";
    html += "</div></div>";
    d.innerHTML = html;
    document.getElementById("containerMessage").appendChild(d);
}

const createAlertNewUser =text =>{
        let jsonRequest = JSON.parse(text);
        if (jsonRequest.objectType === "IfRoomCreated") 
        {
            menuBlock.style.display="none";
            containerLoading.style.display="none";
            containerMessageBlock.style.display="block";
            IfRoomCreated.nameInterlocutor = jsonRequest.nameInterlocutor;
            const d = document.createElement('div');
            let html = "";
            html += "<div class=\"row\">";
            html += "<div class=\"col-sm-12\">";
            html += "<div class=\"new-user text-center\" id=\"message-" + "\">" +IfRoomCreated.nameInterlocutor+" joined the chat</div></div>";
            html += "</div>";
            d.innerHTML = html;
            document.getElementById("containerMessage").appendChild(d);
        }
    }

function btnSetGenderMalePress() {
    UserInfo.gender="male";
    containerSetGender.style.display="none";
    containerSetAge.style.display="block";
}
function btnSetGenderFemalePress() {
    UserInfo.gender="female";
    containerSetGender.style.display="none";
    containerSetAge.style.display="block";
}


function btnSetAgeNextPress() {
    UserInfo.age = inpSetAge.value;
    containerSetAge.style.display="none";
    containerSettingsVoiceMessage.style.display="block";
}


function btnSearchPress() {
    InterlocutorInfo.ageFrom = inpPartnersAgeFrom.value;
    InterlocutorInfo.ageTo = inpPartnersAgeTo.value;
    con.send(JSON.stringify(InterlocutorInfo));
    containerSetPartnerAge.style.display="none";
    containerLoading.style.display="block";
}

function btnSetNamePress() {
    UserInfo.name = inpSetName.value;
    containerSetName.style.display = "none";
    containerSetGender.style.display = "block";
}

function btnVoiceMessageYesPress() {
    UserInfo.voiceMessage=true;
    containerSettingsVoiceMessage.style.display="none";
    containerPartnersGender.style.display="block";
    con.send(JSON.stringify(UserInfo));
}

function btnVoiceMessageNoPress() {
    UserInfo.voiceMessage=  false;
    containerSettingsVoiceMessage.style.display="none";
    containerPartnersGender.style.display="block";
    con.send(JSON.stringify(UserInfo))

}

function btnPartnerMalePress() {
    InterlocutorInfo.gender="male";
    containerPartnersGender.style.display="none";
    containerSetPartnerAge.style.display="block";
}

function btnPartnerFemalePress() {
    InterlocutorInfo.gender="female";
    containerPartnersGender.style.display="none";
    containerSetPartnerAge.style.display="block";
}

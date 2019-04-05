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
const containerInterlocutorDisconnected = document.getElementById("containerInterlocutorDisconnected");
const containerForm = document.getElementById("containerForm");
const containerHeader = document.getElementById("containerHeader");
const containerVoice = document.getElementById("containerVoice");

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
const btnReconnect = document.getElementById("btnReconnect");
const btnGoToMainMenu = document.getElementById("btnGoToMainMenu");

const start = document.getElementById("start");
const stop = document.getElementById("stop");



//input
const inpSetName = document.getElementById("inpSetName");
const inpSetAge = document.getElementById("inpSetAge");
const inpPartnersAgeFrom = document.getElementById("inpPartnersAgeFrom");
const inpPartnersAgeTo = document.getElementById("inpPartnersAgeTo");
const inpText = document.getElementById("inpText");




//adress
const con = new WebSocket("ws://77.47.224.135:8080/sock/chat");
con.binaryType = "arraybuffer";




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
    text:"",
    time:""
};

let IfRoomCreated={
    objectType:"IfRoomCreated",
    nameInterlocutor:""
}

let IfRoomDeleted={
    objectType:"IfRoomDeleted"
}

let InterlocutorTyping={
    objectType:"InterlocutorTyping",
    typing:false,
    name:""
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
btnReconnect.addEventListener("click", e => btnReconnectPress());
btnGoToMainMenu.addEventListener("click", e=>btnGoToMainMenuPress());






con.onopen = () => {
    console.log('connected');
};
con.onclose = () => {
    console.log('closed');
};

con.onmessage = event => {
    console.log(objectInfo(event.data));
    createImageMessage(event);
    createInterlocutorTyping(event.data);
    createAlertNewUser(event.data);
    createOtherMessage(event.data);

};

function btnSendPress() {
    Message.name = UserInfo.name;
    Message.text = inpText.value;
    con.send(JSON.stringify(Message));
    createMyMessage();
    inpText.value = "";
}

function btnGenChatPress(qualifiedName, value) {
    //ConnectInfo.chatType="general";
    //con.send(JSON.stringify(ConnectInfo));
    //containerChatType.style.display = "none";
    //containerSetName.style.display="block";
}

function btnPrivatePress(qualifiedName, value) {
       ConnectInfo.chatType="pair";
       con.send(JSON.stringify(ConnectInfo));
       containerChatType.style.display = "none";
       containerSetName.style.display="block";
 }

const createImageMessage = event=> {
        var bytes = new Uint8Array(event.data);
                    var data = "";
                    var len = bytes.byteLength;
                    if(len>0)
                    {
                    for (var i = 0; i < len; ++i) {
                        data += String.fromCharCode(bytes[i]);
                    }



        const d = document.createElement('div');
        let html = "";
        html += "<div class=\"row\">";
        html += "<div class=\"col-12\">";
        html += "</div></div>";
        html += "<div class=\"row\">";
        html += "<div class=\"col-sm-12\">";
        html += "<div class=\"other-messages float-left\" id=\"message-\">";

        html += "<img  src='data:image/png;base64,"+window.btoa(data)+"'></<img></div></div>";
        d.innerHTML = html;
        document.getElementById("containerMessage").appendChild(d);
        let audio = new Audio('message.mp3');
        audio.volume = 1;
        audio.play();




        var elem = document.getElementById("containerMessage");
        elem.scrollTop = elem.scrollHeight;
    }

}



function createMyImageMessage (arraybuff) {
    var bytes = new Uint8Array(arraybuff);
                    var data = "";
                    var len = bytes.byteLength;
                    if(len>0)
                    {
                    for (var i = 0; i < len; ++i) {
                        data += String.fromCharCode(bytes[i]);
                    }


        let date = new Date();
        const d = document.createElement('div');
        let html = "";
        html += "<div class=\"row\">";
        html += "<div class=\"col-12\">";
        html += "<div class=\"name float-right\">" + Message.name + "</div>";
        html += "</div></div>";
        html += "<div class=\"row\">";
        html += "<div class=\"col-sm-12\">";
        html += "<div class=\"my-messages float-right\"<br>"+"<img  src='data:image/png;base64,"+window.btoa(data)+"'></<img>"+"<i>"+date.getHours()+":"+addZero(date.getMinutes())+"</i></div>";
        html += "</div></div>";
        d.innerHTML = html;
        document.getElementById("containerMessage").appendChild(d);



        var elem = document.getElementById("containerMessage");
        elem.scrollTop = elem.scrollHeight;
      }

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

        html += "<br><i>"+jsonRequest.time+"</i></div></div>";
        d.innerHTML = html;
        document.getElementById("containerMessage").appendChild(d);
        let audio = new Audio('message.mp3');
        audio.volume = 1;
        audio.play();



        var elem = document.getElementById("containerMessage");
        elem.scrollTop = elem.scrollHeight;
    }

}
function createMyMessage() {
    let date = new Date();
    const d = document.createElement('div');
    let html = "";
    html += "<div class=\"row\">";
    html += "<div class=\"col-12\">";
    html += "<div class=\"name float-right\">" + Message.name + "</div>";
    html += "</div></div>";
    html += "<div class=\"row\">";
    html += "<div class=\"col-sm-12\">";
    html += "<div class=\"my-messages float-right\" id=\"message-"+ "\">" + Message.text.replace(/[<]/g, "&lt") + "<br><i>"+date.getHours()+":"+addZero(date.getMinutes())+"</i></div>";
    html += "</div></div>";
    d.innerHTML = html;
    document.getElementById("containerMessage").appendChild(d);



    var elem = document.getElementById("containerMessage");
        elem.scrollTop = elem.scrollHeight;
}

const createAlertNewUser =text =>{
        let jsonRequest = JSON.parse(text);
        if (jsonRequest.objectType === "IfRoomCreated")
        {
            menuBlock.style.display="none";
            containerLoading.style.display="none";
            containerMessageBlock.style.display="block";
            containerHeader.style.display="block";
            containerVoice.style.display="block";

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
        if(jsonRequest.objectType==="IfRoomDeleted")
        {
            con.send(JSON.stringify(IfRoomDeleted));
            containerMessageBlock.style.display="none";
            containerInterlocutorDisconnected.style.display="block";
        }
    }

const createInterlocutorTyping = text=>{
    let jsonRequest = JSON.parse(text);
    if(jsonRequest.objectType==="InterlocutorTyping"&&jsonRequest.typing===true)
    {
         const d = document.createElement('div');
         let html = "<div class=\"maxim\" id=\"containerTyping\" style=\"display: none\">"+
                    "<svg viewbox=\"0 0 100 20\" style=\"width: 9rem;height: 1.5rem;\">"+
                        "<defs><linearGradient id=\"gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">"+
                                "<stop offset=\"5%\" stop-color=\"#326384\"/>"+
                                "<stop offset=\"95%\" stop-color=\"#123752\"/></linearGradient>"+
                            "<pattern id=\"wave\" x=\"0\" y=\"0\" width=\"120\" height=\"20\" patternUnits=\"userSpaceOnUse\">"+
                                "<path id=\"wavePath\""+
                                      "d=\"M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z\""+
                                      "mask=\"url(#mask)\" fill=\"url(#gradient)\">"+
                                    "<animateTransform attributeName=\"transform\" begin=\"0s\" dur=\"1.5s\" type=\"translate\""+
                                            "from=\"0,0\" to=\"40,0\" repeatCount=\"indefinite\"/> </path></pattern>"+
                        "</defs>"+
                        "<text text-anchor=\"middle\" x=\"50\" y=\"15\" font-size=\"10\" fill=\"url(#wave)\" fill-opacity=\"0.6\">"+
                           jsonRequest.name+" typing... ✍"+
                        "</text>"+
                        "<text text-anchor=\"middle\" x=\"50\" y=\"15\" font-size=\"10\" fill=\"url(#gradient)\""+
                              "fill-opacity=\"0.1\">"+jsonRequest.name+" typing... ✍"+
                        "</text>"+
                    "</svg>"+
                "</div>";

          d.innerHTML = html;
          containerForm.insertBefore(d, containerForm.children[0])
          const containerTyping = document.getElementById("containerTyping");
          containerTyping.style.display ="block";
    }
    if (jsonRequest.objectType === "InterlocutorTyping" && jsonRequest.typing===false)
    {
    const containerTyping = document.getElementById("containerTyping");
      containerTyping.style.display ="none";
    }

}

function addZero(minute){
    minute*=1;
  if(minute<10)
    return "0"+minute;
   else
    return minute;
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

function btnReconnectPress(){
    con.send(JSON.stringify(ConnectInfo));
    con.send(JSON.stringify(UserInfo));
    con.send(JSON.stringify(InterlocutorInfo));
    containerInterlocutorDisconnected.style.display="none";
    containerLoading.style.display="block";
}

function btnGoToMainMenuPress(){
    containerChatType.style.display="block";
    containerInterlocutorDisconnected.style.display="none";
}

inpText.onfocus = function() {
InterlocutorTyping.typing = true;
InterlocutorTyping.name = UserInfo.name;
 con.send(JSON.stringify(InterlocutorTyping));
};

inpText.onblur = function() {
  InterlocutorTyping.typing = false;
 con.send(JSON.stringify(InterlocutorTyping));
};


function  objectInfo(json) {
    let returnJson = "";
    let count = 0;
    for ( i = 0; i < json.length; i++) {
        if (json.charAt(i) == '\"') {
            count++;
            continue;
        }
        if (count == 3) {
            returnJson+=json.charAt(i);
        }
    }
  //  returnJson;
    return returnJson;
}

    function sendFile() {
            var file = document.getElementById('filename').files[0];
            var reader = new FileReader();
            var rawData = new ArrayBuffer();
            var finalByte =new ArrayBuffer(1);


            reader.onload = function(e) {
                rawData = e.target.result;
                con.send(rawData);
                con.send(finalByte);
                createMyImageMessage(rawData);
            }

            reader.readAsArrayBuffer(file);

        }





window.onbeforeunload = function (evt) {
        var message = "Вы уверены что хотите выполнить это действие?";
        if (typeof evt == "undefined") {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }
        return message;
    }


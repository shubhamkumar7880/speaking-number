const msgEl=document.getElementById('msg');

const RandomNum=getRandomNumber();

window.SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition=new window.SpeechRecognition();

// start recognition and game
recognition.start();

//capture user speak
function onSpeak(e){
    const msg=e.results[0][0].transcript;
    // console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
}

//check msg against number
function checkNumber(msg){
    const num=+msg;

    // check msg if valid
    if(Number.isNaN(num)){
        msgEl.innerHTML+=`<div>This is not a valid number</div>`;
        return;
    }

    //check in range
    if(num>100 || num <1){
        msgEl.innerHTML+=`<div>Number must be between 1 and 100</div>`;
        return;
    }

    //check number
    if(num===RandomNum){
        document.body.innerHTML=`
        <h2>Congrats!You have guessed the number!<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    }else if(num>RandomNum){
        msgEl.innerHTML+=`<div>GO LOWER</div>`;
    }else{
        msgEl.innerHTML+=`<div>GO HIGHER</div>`;
    }
}

//write what user speak
function writeMessage(msg){
msgEl.innerHTML=`
<div>You Said:</div>
<span class="box">${msg}<span>
`;
}
//generate random number
function getRandomNumber(){
    return Math.floor(Math.random() * 100)+1;
}

//speak result
recognition.addEventListener('result',onSpeak);

//end SR service
recognition.addEventListener('end',() => recognition.start());

document.body.addEventListener('click',(e) =>{
    if(e.target.id="play-again"){
        window.location.reload();
    }
})
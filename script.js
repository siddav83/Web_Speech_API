var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral' ];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

//define a speech recognition instance to control the recognition for our application
var recognition = new SpeechRecognition();

//create a new speech grammar list to contain our grammar
var speechRecognitionList = new SpeechGrammarList();

//This accepts as parameters the string we want to add, plus optionally a weight value that
//specifies the importance of this grammar in relation of other grammars available in the
// list (can be from 0 to 1 inclusive.)
//The added grammar is available in the list as a SpeechGrammar object instance.
speechRecognitionList.addFromString(grammar, 1);

//We then add the SpeechGrammarList to the speech recognition instance by setting
//it to the value of the SpeechRecognition.grammars property.
recognition.grammars = speechRecognitionList;
//We also set a few other properties of the recognition instance before we move on:
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


var diagnostic = document.querySelector('.output');
var bg = document.querySelector('h1');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += `<span style="background-color:${v}">${v}</span>`;
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + color + '.';
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = 'I didn\'t recognize that color.';
}



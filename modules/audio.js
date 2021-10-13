var sndPath = "../snd/";
var audioBusy = false;
var playList = [];
var audio = new Audio();
var audioMute = false;

function playAudio(){
	if (playList.length > 0 && !(audioBusy)) {
		try{
			let audioStr = playList[0];
			playList.shift()
			audioBusy = true;
			audio = new Audio(sndPath+audioStr+".mp3");
			console.log(audio);
			audio.onended = function(){ audioBusy = false;}
			if (!audioMute) {
				audio.play();
			} else {
				playList.shift()
				audioBusy = false;
			}
		} catch(e) {
			console.log("Error playing "+audioStr);
			audioBusy = false;
		}
	}
	let t = setTimeout(function(){playAudio();}, 100);
}

function playArray(obj, param) {
	if (!audioMute) {
		if (typeof obj.audio[0] == "undefined") { obj.audio = [obj.audio]; } // catch single item fail
		for (let i=0; i<obj.audio.length; i++) {
			if (obj.audio[i] == "param") {
				let d = getDeviceFromParam(param);
				playList.push(d.name);
				
			} else {
				playList.push(obj.audio[i]);
			}
		}
	}
}

function audioStart() { //This should be set to start on a delay (2-5 seconds) 
	playList = []; // Clear audio cues at startup
	playAudio();
}


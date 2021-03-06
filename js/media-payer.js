// Sample Media Player using HTML5's Media API
//
// Ian Devlin (c) 2012
// http://iandevlin.com
// http://twitter.com/iandevlin
//
// This was written as part of an article for the February 2013 edition of .net magazine (http://netmagazine.com/)

// Wait for the DOM to be loaded before initialising the media player
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

// Variables to store handles to various required elements
var mediaPlayers;
var playPauseBtn;
var muteBtn;

function initialiseMediaPlayer() {
	mediaPlayers = document.getElementsByClassName("video");
	playPauseBtn = document.getElementById('play-pause-button');
	muteBtn = document.getElementById('mute-button');
	for(var i=0; i<mediaPlayers.length; i++) {

    mediaPlayers[i].controls = false;

		mediaPlayers[i].addEventListener('play', function() {
		changeButtonType(playPauseBtn, 'pause');
		}, false);

		mediaPlayers[i].addEventListener('pause', function() {
		changeButtonType(playPauseBtn, 'play');
		}, false);

		mediaPlayers[i].addEventListener('mute', function () {
			changeButtonType(muteBtn, 'unmute');
		}, false);

		mediaPlayers[i].addEventListener('unmute', function () {
			changeButtonType(muteBtn, 'mute');
		}, false);

		mediaPlayers[i].addEventListener('ended', function() { this.pause(); }, false);

	}
}


function togglePlayPause() {
	// If the mediaPlayer is currently paused or has ended
	if (mediaPlayers[0].paused || mediaPlayers[0].ended) {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
		// Play the media
		for(var i=0; i<mediaPlayers.length; i++) {
			mediaPlayers[i].play();
	  }
	}
	else {
		changeButtonType(playPauseBtn, 'play');
		for(var i=0; i<mediaPlayers.length; i++) {
			mediaPlayers[i].pause();
	  }
	}
}
//
// // Stop the current media from playing, and return it to the start position
function stopPlayer() {
	for(var i=0; i<mediaPlayers.length; i++) {
		mediaPlayers[i].pause();
		mediaPlayers[i].currentTime = 0;
	}
}

function changeVolume(direction) {
	if (direction === '+') {
		for(var i=0; i<mediaPlayers[i].length; i++) {
			mediaPlayers[i].volume += mediaPlayers[i].volume == 1 ? 0 : 0.1;
		}
	}
	else {
		for(var i=0; i<mediaPlayers[i].length; i++) {
			mediaPlayers[i].volume -= (mediaPlayers[i].volume == 0 ? 0 : 0.1);
			mediaPlayers[i].volume = parseFloat(mediaPlayers[i].volume).toFixed(1);
		}
	}
}

function toggleMute() {
	if (mediaPlayers[0].muted) {
		// Change the cutton to be a mute button
		changeButtonType(muteBtn, 'mute');
		for(var i=0; i<mediaPlayers.length; i++) {
			mediaPlayers[i].muted = false;

		}
		// Unmute the media player
	}
	else {
		// Change the button to be an unmute button
		changeButtonType(muteBtn, 'unmute');
		for(var i=0; i<mediaPlayers.length; i++) {
			mediaPlayers[i].muted = true;

		}
	}
}

function replayMedia() {
	resetPlayer();
	for(var i=0; i<mediaPlayers.length; i++) {
		mediaPlayers[i].play();
	}
}

function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.className = value;
}

function resetPlayer() {
	for(var i=0; i<mediaPlayers.length; i++) {
		mediaPlayers[i].currentTime = 0;
	}
	changeButtonType(playPauseBtn, 'play');
 }

 {
	setTimeout(() => document.body.classList.add('render'), 60);
	const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
	const total = navdemos.length;
	const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
	const navigate = (linkEl) => {
		document.body.classList.remove('render');
		document.body.addEventListener('transitionend', () => window.location = linkEl.href);
	};
	navdemos.forEach(link => link.addEventListener('click', (ev) => {
		ev.preventDefault();
		navigate(ev.target);
	}));
	document.addEventListener('keydown', (ev) => {
		const keyCode = ev.keyCode || ev.which;
		let linkEl;
		if ( keyCode === 37 ) {
			linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
		}
		else if ( keyCode === 39 ) {
			linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
		}
		else {
			return false;
		}
		navigate(linkEl);
	});
	imagesLoaded('.glitch__img', { background: true }, () => {
		document.body.classList.remove('loading');
		document.body.classList.add('imgloaded');
	});
}

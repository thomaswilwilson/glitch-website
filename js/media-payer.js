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
var progressBar;

function initialiseMediaPlayer() {
	mediaPlayers = document.getElementsByClassName("video");
	playPauseBtn = document.getElementById('play-pause-button');
	muteBtn = document.getElementById('mute-button');
	progressBar = document.getElementById('progress-bar');
	for(var i=0; i<mediaPlayers.length; i++) {

    mediaPlayers[i].controls = false;

		mediaPlayers[i].addEventListener('timeupdate', updateProgressBar, false);

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

function updateProgressBar() {
	// Work out how much of the media has played via the duration and currentTime parameters
	var percentage = Math.floor((100 / mediaPlayers[0].duration) * mediaPlayers[0].currentTime);
	// Update the progress bar's value
	progressBar.value = percentage;
	// Update the progress bar's text (for browsers that don't support the progress element)
	progressBar.innerHTML = percentage + '% played';
}
//
// // Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.className = value;
}
//
// // Loads a video item into the media player
// function loadVideo() {
// 	for (var i = 0; i < arguments.length; i++) {
// 		var file = arguments[i].split('.');
// 		var ext = file[file.length - 1];
// 		// Check if this media can be played
// 		if (canPlayVideo(ext)) {
// 			// Reset the player, change the source file and load it
// 			resetPlayer();
// 			mediaPlayer.src = arguments[i];
// 			mediaPlayer.load();
// 			break;
// 		}
// 	}
// }
//
// // Checks if the browser can play this particular type of file or not
// function canPlayVideo(ext) {
// 	var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
// 	if (ableToPlay == '') return false;
// 	else return true;
// }
//
function resetPlayer() {
	for(var i=0; i<mediaPlayers.length; i++) {
		mediaPlayers[i].currentTime = 0;
	}
	progressBar.value = 0;
	changeButtonType(playPauseBtn, 'play');
 }

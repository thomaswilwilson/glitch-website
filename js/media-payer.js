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
	// Get a handle to the player
	mediaPlayers = document.getElementsByClassName("video");
	// Get handles to each of the buttons and required elements
	playPauseBtn = document.getElementById('play-pause-button');
	muteBtn = document.getElementById('mute-button');
	progressBar = document.getElementById('progress-bar');

	// Hide the browser's default controls
	for(var i=0; i<mediaPlayers.length; i++) {
    mediaPlayers[i].controls = false;
		// mediaPlayers[i].addEventListener('timeupdate', updateProgressBar, false);

	// Add a listener for the timeupdate event so we can update the progress bar


	// Add a listener for the play and pause events so the buttons state can be updated
	mediaPlayers[i].addEventListener('play', function() {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
	}, false);
	mediaPlayers[i].addEventListener('pause', function() {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
		}, false);
	}
	// need to work on this one more...how to know it's muted?
	mediaPlayers[i].addEventListener('volumechange', function() {
		// Update the button to be mute/unmute
		if (mediaPlayers[i].muted) changeButtonType(muteBtn, 'unmute');
		else changeButtonType(muteBtn, 'mute');
	}, false);
	mediaPlayers[i].addEventListener('ended', function() { this.pause(); }, false);
}

function togglePlayPause() {
	// If the mediaPlayer is currently paused or has ended
	if (mediaPlayers[0].paused || mediaPlayer[0].ended) {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
		// Play the media
		for(var i=0; i<mediaPlayers.length; i++) {
			mediaPlayers[i].play();
	  }
	}
	// Otherwise it must currently be playing
	else {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
		// Pause the media
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
//
// Changes the volume on the media player
function changeVolume(direction) {
	if (direction === '+') {
		for(var i=0; i<mediaPlayers.length; i++) {
			mediaPlayers[i].volume += mediaPlayers[i].volume == 1 ? 0 : 0.1;
		}
	}
	else {
		mediaPlayers[i].volume -= (mediaPlayers[i].volume == 0 ? 0 : 0.1);
		mediaPlayers[i].volume = parseFloat(mediaPlayers[i].volume).toFixed(1);
	}
}
//
// // Toggles the media player's mute and unmute status
// function toggleMute() {
// 	if (mediaPlayer.muted) {
// 		// Change the cutton to be a mute button
// 		changeButtonType(muteBtn, 'mute');
// 		// Unmute the media player
// 		mediaPlayer.muted = false;
// 	}
// 	else {
// 		// Change the button to be an unmute button
// 		changeButtonType(muteBtn, 'unmute');
// 		// Mute the media player
// 		mediaPlayer.muted = true;
// 	}
// }
//
// // Replays the media currently loaded in the player
// function replayMedia() {
// 	resetPlayer();
// 	mediaPlayer.play();
// }
//
// // Update the progress bar
// function updateProgressBar() {
// 	// Work out how much of the media has played via the duration and currentTime parameters
// 	var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
// 	// Update the progress bar's value
// 	progressBar.value = percentage;
// 	// Update the progress bar's text (for browsers that don't support the progress element)
// 	progressBar.innerHTML = percentage + '% played';
// }
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
// // Resets the media player
// function resetPlayer() {
// 	// Reset the progress bar to 0
// 	progressBar.value = 0;
// 	// Move the media back to the start
// 	mediaPlayer.currentTime = 0;
// 	// Ensure that the play pause button is set as 'play'
// 	changeButtonType(playPauseBtn, 'play');
 // }

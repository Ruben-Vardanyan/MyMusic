let track_name = document.querySelector(".title");
let track_artist = document.querySelector(".author");
let track_art  = document.querySelector(".track-img")


let playpause_btn = document.querySelector(".stop-button");
let next_btn = document.querySelector(".next");
let prev_btn = document.querySelector(".prev");

let seek_slider = document.querySelector("#seek-slider");
let curr_time = document.querySelector(".progressing");
let total_duration = document.querySelector(".end-time");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');


let track_list = [
    {
      name: "Murder In My Mind",
      artist: "KORDHELL",
      image: "https://i.scdn.co/image/ab67616d0000b2731440ffaa43c53d65719e0150",
      path: "KORDHELL - MURDER IN MY MIND.mp3"
    },
    {
        name: "ODIUM",
        artist: "LXST CXNTURY (ft. Kingpin Skinny Pimp)",
        image: "https://i1.sndcdn.com/artworks-2nM60aztqkZ6pXbz-5oI3fA-t500x500.jpg",
        path: "LXST CXNTURY - ODIUM (ft Kingpin Skinny Pimp).mp3"
    },
    {
        name: "Close Eyes",
        artist: "DVRST",
        image: "https://i.ytimg.com/vi/ao4RCon11eY/maxresdefault.jpg",
        path: "DVRST - Close Eyes.mp3"
    },
  ];


  function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
   
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
   
    // Update details of the track
    track_art.src = track_list[track_index].image ;
    document.querySelector(".blur-background").style.background = 
     "url(" + track_list[track_index].image + ") no-repeat center / cover";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
   
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
   
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
   // Apply a random background color
    

  }


   
   
  // Function to reset all values to their default
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }


  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }

  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
   
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
   
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
  
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
   
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
     
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }


  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   

  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  loadTrack(track_index);
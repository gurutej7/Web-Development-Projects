// Initialize the varibles
let songIndex = 0 ;
let masterPlay = document.getElementById("master-play");
let myProgressBar = document.getElementById("myProgressBar");
let songList = document.querySelectorAll(".songList .song-item");
let playButtons = document.querySelectorAll(".play-btn");
let currentPlayingSong = 0 ; // index
let bottomText = document.querySelector(".songInfo #bottom-song-name");
//console.log(bottomText.innerHTML);




let songs = [
    {songName : "Song-Name-1" , filePath: "songs/1.mp3", coverPath : "covers/1.jpg" , duration:"4:50"},
    {songName : "Song-Name-2" , filePath: "songs/2.mp3", coverPath : "covers/2.jpg", duration:"3:32"},
    {songName : "Song-Name-3" , filePath: "songs/3.mp3", coverPath : "covers/3.jpg", duration:"2:50"},
    {songName : "Song-Name-4" , filePath: "songs/4.mp3", coverPath : "covers/4.jpg", duration:"3:10"},
    {songName : "Song-Name-5" , filePath: "songs/5.mp3", coverPath : "covers/5.jpg", duration:"3:55"},
    {songName : "Song-Name-6" , filePath: "songs/6.mp3", coverPath : "covers/6.jpg", duration:"5:45"},
    {songName : "Song-Name-7" , filePath: "songs/7.mp3", coverPath : "covers/7.jpg", duration:"4:50"},

];

var audioElement = new Audio('songs/1.mp3');

// console.log(audioElement.src);



const removeAllplays = () => {
    playButtons.forEach((playBtn) => {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    });
}
const removeAllpause = () => {
    playButtons.forEach((playBtn) => {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    });
}

for(let i = 0 ; i < songList.length ; i++){
    let imgElement = songList[i].getElementsByTagName("img")[0];
    // console.log(songList[i]);
    // console.log(imgElement);

    let songName = songList[i].querySelector("#song-name");
    let timestampContent = songList[i].querySelector("#time-stamp");
    let playBtn = songList[i].querySelector("#playBtn");

    playBtn.addEventListener("click" , ()=>{
       
        if(audioElement.paused || audioElement.currentTime <=0){
            removeAllplays();
           // audioElement.src =songList[i].filePath;
           audioElement = new Audio(songs[i].filePath); // audioelement.src is giving 404 error in my system
           // So I am overwriting the audio element
           // console.log(audioElement.src);
           // Update the index of current playing song
           currentPlayingSong = i ;
           bottomText.innerHTML = songs[currentPlayingSong].songName;
            audioElement.play();
            document.getElementById("gif").style.opacity = "1";
            playBtn.classList.remove("fa-play");
            playBtn.classList.add("fa-pause");
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
        }
        else{
            removeAllpause();
            audioElement.pause();
            document.getElementById("gif").style.opacity = "0";
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
    
        }
        //console.log("I am clicked");
        
    })

    songName.textContent = songs[i].songName;
    timestampContent.textContent = songs[i].duration;
    imgElement.setAttribute("src",songs[i].coverPath);


    // console.log(songName.textContent, timestampContent.textContent);
    
   
}


// listen to events

// Handle play and pause click
masterPlay.addEventListener("click" , () =>{
    // If we play then we have to change the corresponding , song item `s btn also 
    // I will access the song item via current audio file path , init`s name there is a number which i can use as a index
    if(audioElement.paused || audioElement.currentTime <=0){
        removeAllplays();
        audioElement.play();
        document.getElementById("gif").style.opacity = "1";
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        songList[currentPlayingSong].querySelector("#playBtn").classList.remove("fa-play");
        songList[currentPlayingSong].querySelector("#playBtn").classList.add("fa-pause");
       // currPlayBtn.classList.remove("fa-play");
       // currPlayBtn.classList.add("fa-pause");
    }
    else{
        removeAllpause();
        audioElement.pause();
        document.getElementById("gif").style.opacity = "0";
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        songList[currentPlayingSong].querySelector("#playBtn").classList.add("fa-play");
        songList[currentPlayingSong].querySelector("#playBtn").classList.remove("fa-pause");
       // currPlayBtn.classList.remove("fa-pause");
       // currPlayBtn.classList.add("fa-play");

    }
})
// Refer documentation of audio element events

audioElement.addEventListener("timeupdate", () =>{
    //console.log(audioElement.currentTime)

    // Percentage out of 100 of the duration
    /*
    progress = (currTime/Duration) * 100
    => currTime = (progress * Duration) / 100
    */
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) ;
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change" , ()=>{
    let prog = Number(myProgressBar.value);
    audioElement.currentTime = parseInt((prog*audioElement.duration)/100 );

})




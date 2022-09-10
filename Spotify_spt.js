console.log("Welcome to Spotify")

//Initialise the variables---------------------------------------------------------------
let songIndex=0;                                                    //for counter    
let audioElement = new Audio('songs/1.mp3');                        //for content-Songs
let masterplay = document.getElementById('masterplay')              //for all play/pause
let myProgressBar = document.getElementById('myProgressBar')        //for SeekBar
let gif = document.getElementById('gif')                            //for gif
let masterSongName = document.getElementById('masterSongName')      //for byDefault things
let songItems = Array.from(document.getElementsByClassName('songItem'))     //for Array

let songs=[
    { songName:"Aasiquana-Alam", filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    { songName:"Tere Bin", filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    { songName:"Dheeme Dheeme", filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    { songName:"Akhiyon se goli", filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    { songName:"Dilbara", filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    { songName:"Kusu Kusu", filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    { songName:"Ra ra Ready", filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    { songName:"Vaathi Coming", filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    { songName:"Bore Bore", filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    { songName:"Bekhyali", filePath:"songs/10.mp3",coverPath:"covers/10.jpg"}
]

    songItems.forEach((element,i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName
    });
//audioElement.play()



//Handle play/pause click-----------------------------------------------------------------
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play()
            masterplay.classList.remove('fa-circle-play')
            masterplay.classList.add('fa-circle-pause')
            gif.style.opacity =1;
    }
    else{
        audioElement.pause()
        masterplay.classList.remove('fa-circle-pause')
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})


//Listen to Events-------------------------------------------------------------------------
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    // Update Seekbar----------------------------------
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})


myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100)
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })}

    
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
            makeAllPlays();
            songIndex = parseInt(e.target.id)
            console.log(e);
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex+1}.mp3`
            audioElement.currentTime = 0
            audioElement.play()
            masterplay.classList.remove('fa-circle-play')
            masterplay.classList.add('fa-circle-pause')
    })
})


//Handle Prev/Next Click----------------------------------------------------------------------------
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex = 0;
    }
    else{
    songIndex+=1;
    } 
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterplay.classList.remove('fa-play-circle')
    masterplay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex = 0;
    }
    else{
        songIndex-=1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    masterplay.classList.remove('fa-play-circle')
    masterplay.classList.add('fa-pause-circle')
})

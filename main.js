var currentSongNumber = 1;
	var willLoop = 0;
	var willShuffle = 0;
	var mute = 0;
	var Playingnumber = 0  ;
	var shuffle=0;
	var equal = 0;
	

	// songs object contaming song details
	var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
	   'image' : 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
		'image' : 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
		'image' : 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
		'image' : 'song4.jpg'
    }]

///////////////////////////////////////////First Screen Hidden After Enter Name////////////////////////////////////////////////////////
$('.welcome-screen button').on('click', function() 
{
    var name = $('#name-input').val();
     if (name.length > 2) 
	   {
			var message = "Welcome, " + name;
			$('.main .user-name').text(message);
			$('.welcome-screen').addClass('hidden');
			$('.main').removeClass('hidden');
        } else 
		{
            var error ="Name Should be Greater than 3";
			$('#error1').removeClass('hidden').text(error);
            $('#name-input').addClass('error');
		}
});
	
//////////////////////////////volumeslider function///////////////////////////////
function setvolume() 
{						
	var song = document.querySelector('audio');
	song.volume = slider.value/100;
}	
	
//////////////////////////////////////////we have made a machine jispe 2 buttons diye hai songName and position ke liye///////////////////	
function changeSong() 
{
	var music =  songs[Playingnumber].fileName;
	var song = document.querySelector("audio");
	song.src = music;
	toggleSong();
	changeCurrentSongDetails(songs[Playingnumber])
}	
	
//////////////////////////////////////////////when we click on play icon it will play//////////////////////////////////////////////////////////		
	function toggleSong ()
	{
		
		var song = document.querySelector ('audio');
		if (song.paused == true) 
		{
			console.log ('Playing');
		    $('.play-icon').removeClass('fa-play').addClass('fa-pause');
		    song.play();	
		}
		
		else 
		{
		  console.log('Pausing');
		  $('.play-icon').removeClass('fa-pause').addClass('fa-play');
		  song.pause();
		}
	};
	
////////////////////// adding function that will show image on desktop or album cover of the song and details/////////////////////////////////

function changeCurrentSongDetails(songObj) 
{
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}

/////////////////////////////progress bar////////////////////////////	
function updateTime ()
{
	var song = document.querySelector('audio');
	var ct = song.currentTime;
	var dt = song.duration;
	var percentage = (ct/dt)*100;
	$('.progress-filled').css("width",percentage+"%");
}	
/////////////////////////progressbsr will react on click function///////////////////////
$(".player-progress").click(function(event) {
	console.log(event);
    var $this = $(this);
	console.log(this);

    // to get part of width of progress bar clicked
    var widthclicked = event.pageX - $this.offset().left;
    var totalWidth = $this.width(); // can also be cached somewhere in the app if it doesn't change

    // do calculation of the seconds clicked
    var calc = (widthclicked / totalWidth) * 100 ; // get the percent of bar clicked and multiply in by the duration


var song = document.querySelector('audio');
song.currentTime = (song.duration*calc)/100;

updateTime();



});
////////////////////////////////////////////////////////////////Show Current Time In Proper Format///////////////////////////////////////////////////
	function fancyTimeFormat(time)
	{   
		// Hours, minutes and seconds
		var hrs = ~~(time / 3600);
		var mins = ~~((time % 3600) / 60);
		var secs = time % 60;

		// Output like "1:01" or "4:03:59" or "123:03:59"
		var ret = "";

		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}

		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	}
	
	
/////////////////////////////////////////////////////////////will show the current time of the running song//////////////////////////////////////	
	function updateCurrentTime() 
	{
		var song = document.querySelector('audio');
		// console.log(song.currentTime);
		// console.log(song.duration);
		var currentTime = Math.floor(song.currentTime);
		currentTime = fancyTimeFormat(currentTime);
		var duration = Math.floor(song.duration);
		duration = fancyTimeFormat(duration);
		$('.time-elapsed').text(currentTime);
		$('.song-duration').text(duration);
	}	
	
//jump or skip time
function timeJump() 
{
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}		
	
//////////////////////////////////////////////////////////////what happen after windows loads/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////// add songs to the list///////////////////////////////////////////////////
window.onload = function() 
{
	changeCurrentSongDetails(songs[0]);///image of current song as default will apper on screen
	updateCurrentTime(); 
	///////////////////time laps//////////////
	setInterval(function() 
	{
		updateCurrentTime();
	},1000);
				////////////////////////////////progress bar/////////////////////						
	setInterval(function()
	{
		updateTime();
	},300);
	/////////////////////////////////pagging in data table disappears/////////////////////////////////////////////////////				
	$('#songs').DataTable
	({
		paging: false
	});
}

/////////////////////////////////////////////addSongNameClickEvent function that get the id and position of the song////////////////////////////////////// 	
function addSongNameClickEvent(songObj,position) 
{	var songName = songObj.fileName; // New Variable
	var playingnextsong = 0;
	playingnextsong = currentSongNumber-1;
	var id = '#song' + position;
	$(id).click(function() {
	var audio = document.querySelector('audio');
	var currentSong = audio.src;
	if(currentSong.search(songName) != -1)
	{
	toggleSong();
	}
	else {
	audio.src =songName;
	toggleSong();
	console.log(obj);
	changeCurrentSongDetails(songObj); // Function Call
	}
	});
			
}	
	
	
	
// calling object
for(var i =0; i < songs.length;i++) //shows the list of songs using objects
{
	var name = '#song' + (i+1);
	var obj = songs[i];
	var song = $(name);
	song.find('.song-name').text(obj.name);
	song.find('.song-artist').text(obj.artist);
	song.find('.song-album').text(obj.album); // Added
	song.find('.song-length').text(obj.duration); // Added
	addSongNameClickEvent(obj,i+1);
}	
////////////////////////////////////buttons/Controls///////////////////////////////////////////////////
	// Make Repeat button on off 
$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});	
	
//make suffling icons change on clicking
$('.fa-random').on('click',function() {
    willShuffle = 1 - willShuffle;
    $('.fa-random').toggleClass('disabled')
});	

//Lead song list to max no. (here it is 5) 

$('audio').on('ended',function() 
{
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})

//////////////////////////////////////////////////Icon Will Change When Clicked For Play and Pause///////////////////////////////////////////
$('.play-icon').on('click', function() 
{
	toggleSong();
});

///////////////////////////////////////When be press space-bar key it will play and pause and vice versa//////////////////////////////////////////
//// on key press  from keyboard	
$('body').on('keypress', function(event) 
{
	var target = event.target;
	if (event.keyCode == 32 && target.tagName !='INPUT') 
	{
		toggleSong ();
	}
});

/*$('button').on('click'.function(event)
	var target = event.target;
	if(event.keyCode == )
	
)*/

////////////////////////////add volume up and volume down bar /////////////////////////////
$('.fa-volume-up').on('click',function(){        //mute and unmute the song
	 var audio = document.querySelector('audio');
	 if(mute == 0){
		 audio.muted = true;
		 mute = 1;
		 console.log('mute');
		 $('.mute').removeClass('fa-volume-up').addClass('fa-volume-off');
	 }
	 else {
		  audio.muted = false;
		  mute = 0;
		  console.log('unmute')
		   $('.mute').removeClass('fa-volume-off').addClass('fa-volume-up');

	 }
});

//make next button clickable
$(".fa-step-forward").click(function(){

if(shuffle==1)
{
var audio = document.querySelector('audio');
var nextSongNumber = randomExcluded(0,3,Playingnumber); // Calling our function from Stackoverflow
var nextSongObj = songs[nextSongNumber];
audio.src = nextSongobj.fileName;
toggleSong();
changeCurrentSongDetails(nextSongobj);
Playingnumber = nextSongNumber;
}
else {
if(Playingnumber == songs.length-1){
Playingnumber = 0;
changeSong();
}
else {
console.log("two");
console.log(Playingnumber);
Playingnumber++;
changeSong();
}
}
})

//make previous button clickable
$(".fa-step-backward").click(function(){
if(Playingnumber == 0){
console.log("one");
Playingnumber = (songs.length-1);
changeSong();
}
else {
console.log("two");
console.log(Playingnumber);
Playingnumber--;
changeSong();
}
})


//make visible and disable voice icon on click
$('.fa-microphone').on('click',function(){
$('.fa-microphone').toggleClass('disabled')
})



//random song play
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}	

// increase and decrease the volume by volume slider		
$('#slider').on('mousemove', function() 
{								
	setvolume();
});

/////////////////increase the volume of sidebar on click/////////////////
$('#slider').on('click', function() 
{								
	setvolume();
});

$(".fa-microphone").hover(function(){

$("ol").css("display","inline-block")


})

//////////////////////////////////////////display commands//////////////////
$(".fa-microphone").mouseout(function(){

$("ol").css("display","none")


})
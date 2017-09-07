 
/*/////////////////////////////////////////////////Speech recognition
 Chrome support : As mentioned earlier,
 Chrome currently supports speech recognition with prefixed properties,
 therefore at the start of our code we include these lines to feed the right objects to Chrome,
 and non-prefix browsers, like Firefox:
 */


var result;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


//The next part of our code defines the grammar we want our app to recognise. The following variable is defined to hold our grammar:
var option = [ 'play the song', 'pause the song', 'loop through song', 'shuffle between songs', 'next song', 'previous song', 'show visualizer'];
var grammar = '#JSGF V1.0; grammar colors; public <option> = ' + option.join(' | ') + ' ;'

/*
The grammar format used is JSpeech Grammar Format (JSGF) — you can find a lot more about it at the previous link to its spec. However,
 for now let's just run through it quickly:

The lines are separated by semi-colons, just like in JavaScript.
The first line — #JSGF V1.0; — states the format and version used. This always needs to be included first.
The second line indicates a type of term that we want to recognise. public declares that it is a public rule, 
the string in angle brackets defines the recognised name for this term (color), 
and the list of items that follow the equals sign are the alternative values that will be recognised and accepted as appropriate values for the term.
Note how each is separated by a pipe character.
You can have as many terms defined as you want on separate lines following the above structure, 
and include fairly complex grammar definitions. 
For this basic demo, we are just keeping things simple.
*/
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Plugging the grammar into our speech recognition
The next thing to do is define a speech recogntion instance to control the recognition for our application.
 This is done using the SpeechRecognition() constructor.
 We also create a new speech grammar list to contain our grammar, using the SpeechGrammarList() constructor.
*/

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

/*
We add our grammar to the list using the SpeechGrammarList.addFromString() method. 
This accepts as parameters the string we want to add, 
plus optionally a weight value that specifies the importance of this grammar in relation of other grammars available in the list
 (can be from 0 to 1 inclusive.) 
 The added grammar is available in the lst as a SpeechGrammar object instance.
*/

speechRecognitionList.addFromString(grammar, 1);

/*
We then add the SpeechGrammarList to the speech recognition instance by setting it to the value of the SpeechRecognition.grammars property. 
We also set a few other properties of the recognition instance before we move on:
SpeechRecognition.lang: Sets the language of the recognition. Setting this is good practice, and therefore recommended.
SpeechRecognition.interimResults: Defines whether the speech recognition system should return interim results,
 or just final results. Final results are good enough for this simple demo.SpeechRecognition.maxAlternatives: 
 Sets the number of alternative potential matches that should be returned per result. 
 This can sometimes be useful, say if a result is not completely clear and you want to display a list if alternatives for the user to choose the correct one from. 
 But it is not needed for this simple demo, so we are just specifying one (which is actually the default anyway.)
*/


recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

/*
Note: SpeechRecognition.continuous controls whether continuous results are captured, 
or just a single result each time recognition is started. It is commented out because currently it is not implemented in Gecko,
so setting this was breaking the app. You can get a similar result by simply stopping the recognition after the first result is received, 
as you'll see later on.
*/



//innilitize the voice recognition

 $('.fa-microphone').on('click',function(){
    recognition.start();
});
  
  
  recognition.onresult = function(event) {
  var last = event.results.length - 1;
  result  = event.results[last][0].transcript; 
  


  if (result == "play the song") {
        $('.fa-microphone').addClass("active");
        var song = document.querySelector('audio');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();

    }

    if (result == "pause the song") {
        $('.fa-microphone').addClass("active");
        var song = document.querySelector('audio');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }
	
    if(result == "previous song"){


             $('.fa-microphone').addClass("active");
        if (shuffle == 1) {
            var audio = document.querySelector('audio');
            var nextSongNumber = randomExcluded(0, 3, Playingnumber); // Calling our function from Stackoverflow

            var nextSongObj = songs[nextSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            Playingnumber = nextSongNumber;


        }

		else {

            if (Playingnumber == 0) {
                Playingnumber = songs.length - 1;
                changeSong();
            } else {
                console.log("two");
                console.log(Playingnumber);
                Playingnumber--;
                changeSong();
            }

        }

    }

    if (result == "next song") {
        $('.fa-microphone').addClass("active");
        if (shuffle == 1) {
            var audio = document.querySelector('audio');
            var nextSongNumber = randomExcluded(0, 3, Playingnumber); // Calling our function from Stackoverflow

            var nextSongObj = songs[nextSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            Playingnumber = nextSongNumber;


        } else {

            if (Playingnumber == songs.length - 1) {
                Playingnumber = 0;
                changeSong();
            } else {
                console.log("two");
                console.log(Playingnumber);
                Playingnumber++;
                changeSong();
            }

        }



    }

    if (result == "show visualizer") {
        $('.fa-microphone').addClass("active");
        $('fa-bar-chart').toggleClass("active");
        if (equal == 0) {

            equal = 1;

            $("svg").css("display", "inline-block");
            $(".content").css("display", "none");
            $(".contain").css("display", "inline-block");
            $(".contain").css("background", "black");


        } else {
            equal = 0;
            $("svg").css("display", "none");
            $(".content").css("display", "inline-block");
            $(".contain").css("display", "none");




        }
    }


    if (result == "shuffle between songs"||result == "shuffle between song")
     {
        $('.fa-microphone').addClass("active");

        $(".fa-random").toggleClass("active");
        if (shuffle == 0)
        {

            shuffle = 1;
        }

        else
        {
            shuffle = 0;
        }



    }

    if (result == "loop through song"||result == "loop through songs")
     {
        $('.fa-microphone').addClass("active");
        $(".fa-repeat").toggleClass("active");
        if (loop == 0) {

            loop = 1;

        }
        else {

            loop = 0;

        }


    }
}


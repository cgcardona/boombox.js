/*
* boombox.js JavaScript Library v0.1.2
* https://audiofile.cc/boombox
* 
* Copyright 2011, Carlos Cardona 
* Released under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
* 
* Date: Mon. June 20 2011 
*/
$(document).ready(function() {
  $("#playbutton").click(function() {
    $("#boombox").boombox("play");  
  });
  $("#pausebutton").click(function() {
    $("#boombox").boombox("pause");  
  });
  $("#volumeupbutton").click(function() {
    $("#boombox").boombox("volumeup");  
  });
  $("#volumedownbutton").click(function() {
    $("#boombox").boombox("volumedown");  
  });
  $("#next").click(function(){
    $("#boombox").boombox("next");  
  });
  $("#prev").click(function(){
    $("#boombox").boombox("prev");  
  });
});
(function( $ ){
 // Create a global BOOMBOX object to hold all of the global vars.
  var BOOMBOX = {};
  BOOMBOX.song = new Audio();
  BOOMBOX.track;
  BOOMBOX.currentTime = 0;
  BOOMBOX.playing = false;
  BOOMBOX.titles = [];
  BOOMBOX.songPaths = [];
  BOOMBOX.codec;
  // Detect if the browser supports .mp3 or .ogg and set BOOMBOX.codec accordingly
  // HTML5 feature detection from http://diveintohtml5.org/everything.html 
  var a = document.createElement('audio');
  if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))) {
    BOOMBOX.codec = ".mp3";
  } else if (!!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''))) {
    BOOMBOX.codec = ".ogg";
  }
  BOOMBOX.methods = {
init : function( options ) {
	var settings = {};
  return this.each(function() {        
      // If options exist, lets merge them
      // with our default settings
    if ( options ) { 
      $.extend( settings, options );
    }

    // Push all of the song titles into an array to display so I can display them on the screen later
    for(property in settings) {
      BOOMBOX.titles.push(property);
    }

    // Push all of the song paths into an array so I can cycle through them on click.
    for(property in settings) {
      BOOMBOX.songPaths.push(settings[property]);
    }

    BOOMBOX.songTitle = BOOMBOX.titles[0];
    $("#trackName").text(BOOMBOX.songTitle);
  }); 
},
play : function() {
  if (BOOMBOX.currentTime === 0) {
    BOOMBOX.counter = +($("#counter").text() - 1);
    BOOMBOX.track = BOOMBOX.songPaths[BOOMBOX.counter];
    BOOMBOX.song.src = BOOMBOX.track + BOOMBOX.codec;
    BOOMBOX.song.play();
  } else {
    BOOMBOX.song.currentTime = BOOMBOX.currentTime;
    BOOMBOX.song.play();
  }
},
pause : function() {
  BOOMBOX.song.pause();
  BOOMBOX.currentTime = BOOMBOX.song.currentTime;
},
next : function() {
  BOOMBOX.song.pause();
  BOOMBOX.currentTime = 0;
  BOOMBOX.beforeValue = $("#counter").text();
  BOOMBOX.afterValue = +(BOOMBOX.beforeValue + 1);
  BOOMBOX.counter = BOOMBOX.songPaths.length;
  BOOMBOX.songTitle = $("#counter").text();
  $("#trackName").text(BOOMBOX.titles[BOOMBOX.songTitle]);
  if (BOOMBOX.afterValue >= BOOMBOX.counter) {
    BOOMBOX.afterValue = BOOMBOX.counter; 
  }
  $("#counter").text(BOOMBOX.afterValue);
},
prev : function() {
  BOOMBOX.song.pause();
  BOOMBOX.currentTime = 0;
  BOOMBOX.beforeValue = $("#counter").text();
  BOOMBOX.afterValue = +(BOOMBOX.beforeValue - 1);
  BOOMBOX.counter = BOOMBOX.songPaths.length;
  if (BOOMBOX.afterValue <= 1) {
    BOOMBOX.afterValue = 1; 
  }
  $("#counter").text(BOOMBOX.afterValue);
  BOOMBOX.songTitle = +($("#counter").text() - 1);
  $("#trackName").text(BOOMBOX.titles[BOOMBOX.songTitle]);
},
volumeup : function() {
  BOOMBOX.currentVolume = BOOMBOX.song.volume;
  if (BOOMBOX.currentVolume >= 1) {
    BOOMBOX.newVolume = BOOMBOX.currentVolume;
  } else {
    BOOMBOX.newVolume = BOOMBOX.currentVolume + 0.1;
  }
  BOOMBOX.song.volume = BOOMBOX.newVolume;
},
volumedown : function() {
  BOOMBOX.currentVolume = BOOMBOX.song.volume;
  if (BOOMBOX.currentVolume <= 0.1) {
    BOOMBOX.newVolume = BOOMBOX.currentVolume;
  } else {
    BOOMBOX.newVolume = BOOMBOX.currentVolume - 0.1;
  }
  BOOMBOX.song.volume = BOOMBOX.newVolume;
    }
  };

  $.fn.boombox = function( method ) {
    
    // Method calling logic
    if ( BOOMBOX.methods[method] ) {
      return BOOMBOX.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return BOOMBOX.methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.boombox' );
    }    
  
    return true;
  };

})( jQuery );

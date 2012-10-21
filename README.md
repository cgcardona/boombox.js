Boombox.js 
==========

HTML5 introduces the `<audio>` element which offers a way to play audio natively
in the browser. However the native controls are a little lacking in style.
Thankfully HTML5 also brings a full api to interact with which allows us to skin
an Audio object however we want.

Goals
-----

The primary goal of this project is to create a high quality HTML5 audio boombox
that can be easily skinned and extended.

Get a modern browser
--------------------

First things first—make sure you&rsquo;re running a modern browser. My favorite is
[Chrome](http://www.google.com/chrome) but [Safari](http://www.apple.com/safari/download/), [Opera](http://www.opera.com/mobile/download/versions/), [Firefox](http://www.mozilla.com/en-US/firefox/new/), or even [IE9](http://windows.microsoft.com/en-US/internet-explorer/downloads/ie-9/worldwide-languages) will also do. 

Let me repeat that&mdash;*_this app works in ALL major modern browsers_*.

Including jQuery & boombox.js
-----------------------------

Next grab the latest copy of [jQuery](http://code.jquery.com/jquery-latest.js) and [boombox.js](https://raw.github.com/cgcardona/boombox.js/master/js/boombox.js) and include a link to both of
them in your HTML `<head>` section.

    <head>
      <script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
      <script src="js/boombox.js" type="text/javascript"></script>
    </head>

Include the buttons
-------------------

In theory you could have as boomboxes on a page as you wish. For each one you'll
need to provide the following markup. Make sure that you wrap each group of
buttons in a div with a unique id. You'll be using that unique id in the next step.

    <div id="boombox"> 
          <div><span class="boomboxCounter">1</span> <span class="boomboxTrackName"></span></div> 
          <button class="boomboxPlayBtn slick-black boombox">Play</button> 
          <button class="boomboxPauseBtn slick-black boombox">Pause</button> 
          <button class="boomboxPreviousBtn slick-black boombox">Previous</button> 
          <button class="boomboxNextBtn slick-black boombox">Next</button> 
          <button class="boomboxVolumeDownBtn slick-black boombox">Volume Down</button> 
          <button class="boomboxVolumeUpBtn slick-black boombox">Volume Up</button> 
    </div>

Create a boombox
----------------

To create a new boombox simply call

    new Boombox(//arguments);

The Boombox constructor takes an object literal of tracks and configuration
values.

    <script> 
    new Boombox(
      tracks : {
        'Blasting Laser Fire' : './music/BlastingLaserFire',
        'Ultra Drop' : './music/UltraDrop'
      },
      configs : {
        container : '#boombox',
        autoplay : false 
      }
    );
    </script> 

Notice the object literal being passed into the Boombox constructor has two
properties which are themselves objects&mdash;tracks and configs.

The titles and paths for the audio tracks go in the `tracks` object. The audiotrack paths don&rsquo;t have a file extension.  That&rsquo;s
because boombox detects what codec the browser supports and serves up the
correct file. As a developer you need to encode your audiofiles once as .mp3 and
once as .ogg and put the path to those files in the object literal that is
passed into the boombox function.

In the configs object you put the id of the container div for this boombox as
well as a boolean value which triggers autoplay.

Mime Type
---------

To get Firefox to recognize the .ogg file type correctly you&rsquo;ll need to add this one line to the .htaccess file on the server that is serving up the audiofiles.

    AddType audio/ogg .ogg

Carlos Cardona 2011&ndash;2012
-------------------

All software is available free as in speech and free as in pizza under the [MIT Open Source License](http://www.opensource.org/licenses/mit-license.php).

For more information and examples please see [Audiofile.cc/boombox](https://audiofile.cc/boombox)
and follow [cgcardona](http://twitter.com/cgcardona).

For more projects by Audiofile please check out [Audiofile.cc](https://audiofile.cc).

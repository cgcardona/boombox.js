Boombox.js 
==========

HTML5 introduces the <code>&lt;audio&gt;</code> element which offers a way to play audio natively
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
them in your HTML <code>&lt;head&gt;</code> section.

<code><pre>
&lt;head&gt;
     &lt;script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"&gt;&lt;/script&gt;
     &lt;script src="js/boombox.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;/head&gt;
</pre></code>

Include the buttons
-------------------

You&rsquo;ll need buttons in order to control the boombox. Add these buttons that are
nested within a <code>&lt;div id="boombox"&lt;</code>.

In theory you could have as boomboxes on a page as you wish. For each one you'll
need to provide the following markup.

<code><pre>
&lt;div id="boombox"&gt; 
      &lt;div&gt;&lt;span class="boomboxCounter"&gt;1&lt;/span&gt; &lt;span class="boomboxTrackName"&gt;&lt;/span&gt;&lt;/div&gt; 
      &lt;button class="boomboxPlayBtn slick-black boombox"&gt;Play&lt;/button&gt; 
      &lt;button class="boomboxPauseBtn slick-black boombox"&gt;Pause&lt;/button&gt; 
      &lt;button class="boomboxPreviousBtn slick-black boombox"&gt;Previous&lt;/button&gt; 
      &lt;button class="boomboxNextBtn slick-black boombox"&gt;Next&lt;/button&gt; 
      &lt;button class="boomboxVolumeDownBtn slick-black boombox"&gt;Volume Down&lt;/button&gt; 
      &lt;button class="boomboxVolumeUpBtn slick-black boombox"&gt;Volume Up&lt;/button&gt; 
&lt;/div&gt;
</pre></code>

Create a boombox
----------------

To create a new boombox simply call

<code><pre>
new Boombox(//arguments);
</pre></code>

Use jQuery to grab <code>&lt;div id="boombox"&gt;</code> and call the boombox method on it. Pass in
  an object literal of songs to play. The keys should be the title you would
  like to appear on the screen and the value should be a path to the audiofiles.

<code><pre>
&lt;script&gt; 
  $(document).ready(function() {
    $("#boombox").boombox({
      'All is Illusion' : '../music/allisillusion',  
      'Grace' : '../music/grace'  
    });
  });
&lt;/script&gt; 
</pre></code>

You&rsquo;ll notice above that the song paths don&rsquo;t have a file extension. That is
because boombox detects what codec the browser supports and serves up the
correct file. As a developer you need to encode your audiofiles once as .mp3 and
once as .ogg and put the path to those files in the object literal that is
passed into the boombox function.

Remember to not use the file extensions because those will be added by boombox()
to work on a per browser basis. 

Mime Type
---------

To get Firefox to recognize the .ogg file type correctly you&rsquo;ll need to add
this one line to the .htaccess file on the server that is serving up the
audiofiles.

<code><pre>
  AddType audio/ogg .ogg
</pre></code>

Carlos Cardona 2011
-------------------

All software is available free as in speech and free as in pizza under the [MIT Open Source License](http://www.opensource.org/licenses/mit-license.php).

For more information and examples please see [Audiofile.cc/boombox](https://audiofile.cc/boombox)
and follow [cgcardona](http://twitter.com/cgcardona).

For more projects by Audiofile please check out [Audiofile.cc](https://audiofile.cc).


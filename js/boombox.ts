/*
 * boombox.ts TypeScript Library v0.1.1
 * https://audiofile.cc/boombox
 * 
 * Copyright 2011 - 2012 Carlos Cardona 
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Date: Sat. Oct 22 2012                                                                                                   
 *    ,---,.                               ____                                        ___                
 *  ,'  .'  \                            ,'  , `.  ,---,                             ,--.'|_              
 *,---.' .' |   ,---.     ,---.       ,-+-,.' _ |,---.'|      ,---.                  |  | :,'             
 *|   |  |: |  '   ,'\   '   ,'\   ,-+-. ;   , |||   | :     '   ,'\ ,--,  ,--,      :  : ' :  .--.--.    
 *:   :  :  / /   /   | /   /   | ,--.'|'   |  ||:   : :    /   /   ||'. \/ .`|    .;__,'  /  /  /    '   
 *:   |    ; .   ; ,. :.   ; ,. :|   |  ,', |  |,:     |,-..   ; ,. :'  \/  / ;    |  |   |  |  :  /`./   
 *|   :     \'   | |: :'   | |: :|   | /  | |--' |   : '  |'   | |: : \  \.' /     :__,'| :  |  :  ;_     
 *|   |   . |'   | .; :'   | .; :|   : |  | ,    |   |  / :'   | .; :  \  ;  ;       '  : |__ \  \    `.  
 *'   :  '; ||   :    ||   :    ||   : |  |/     '   : |: ||   :    | / \  \  \      |  | '.'| `----.   \ 
 *|   |  | ;  \   \  /  \   \  / |   | |`-'      |   | '/ : \   \  /./__;   ;  \ ___ ;  :    ;/  /`--'  / 
 *|   :   /    `----'    `----'  |   ;/          |   :    |  `----' |   :/\  \ ;/  .\|  ,   /'--'.     /  
 *|   | ,'                       '---'           /    \  /          `---'  `--` \  ; |---`-'   `--'---'   
 *`----'                                         `-'----'                        `--"                     
 *                                                                                                       
 * ASCII art created with http://patorjk.com/software/taag/  
 */
 
'use strict';
declare var $;
class Boombox{
  public audioTrack:Object             = new Audio();
  public audioTrackPaths:string[]      = [];
  public audioTrackTitles: string[]    = [];
  public codec:string                  = '.mp3';
  public currentAudioTrackTitle:string = '';
  public currentTime:number            = 0;
  public settings:Object               = {};
  constructor(settings){
    this.settings = settings;

    // HTML5 feature detection from http://diveintohtml5.info/everything.html
    if (!!(this.audioTrack['canPlayType'] && this.audioTrack['canPlayType']('audio/mpeg;').replace(/no/, '')))
      this.codec = ".mp3";
    else if (!!(this.audioTrack['canPlayType'] && this.audioTrack['canPlayType']('audio/ogg; codecs="vorbis"').replace(/no/, '')))
      this.codec = ".ogg";

      //if(this.settings['configs']['buildBoombox'] == undefined || this.settings['configs']['buildBoombox'] === true)
      //  this.buildBoomboxDOM();

    this.attachEventListeners(this);
    
    var that = this;
    Object.keys(this.settings['tracks']).forEach(function(elmt, inx){
      that.audioTrackTitles.push(elmt);
      that.audioTrackPaths.push(that.settings['tracks'][elmt]);
    });

    if(this.settings['configs']['autoplay'] === true)
      this.play();

    this.currentAudioTrackTitle = this.audioTrackTitles[0];
    $('#' + this.settings['configs']['container'] + ' .boomboxTrackName').text(this.currentAudioTrackTitle);

    //console.log(this);
  }

  private buildBoomboxDOM(){
    var wrapperDiv = document.createElement('div');
    var counterSpan = document.createElement('span');
    counterSpan.setAttribute('class','boomboxCounter');
    counterSpan.innerText = '1';

    var trackNameSpan = document.createElement('span');
    trackNameSpan.setAttribute('class','boomboxTrackName');

    $(wrapperDiv).append(counterSpan);
    $('#' + this.settings.configs.container).append(wrapperDiv);
    $(wrapperDiv).append(trackNameSpan);

    var ElmntMap = {
      'PlayBtn'       : 'Play',
      'PauseBtn'      : 'Pause',
      'PreviousBtn'   : 'Previous',
      'NextBtn'       : 'Next',
      'VolumeDownBtn' : 'Volume Down',
      'VolumeUpBtn'   : 'Volume Up',
      'MuteBtn'       : 'Mute'
    };

    var that = this;
    var ElmntMapKeys = Object.keys(ElmntMap);
    $(ElmntMapKeys).each(function(inx,elent){
      var tmpEl = document.createElement('button');
      tmpEl.setAttribute('class','boombox' + elent);
      tmpEl.innerText = ElmntMap[elent];
      $('#' + that.settings.configs.container).append(tmpEl);
    });
  }

  private attachEventListeners(ctx){
    var map = {
      'PlayBtn'       : 'play',
      'PauseBtn'      : 'pause',
      'VolumeUpBtn'   : 'volumeUp',
      'VolumeDownBtn' : 'volumeDown',
      'NextBtn'       : 'next',
      'PreviousBtn'   : 'previous',
      'MuteBtn'       : 'mute'
    };

    var mapKeys = Object.keys(map);
    $(mapKeys).each(function(indx,elmnt){
      $('#' + ctx.settings.configs.container + ' .boombox' + elmnt).each(function(inx,el){
        $(el).click(function(evnt){
          if(elmnt == 'MuteBtn')
            ctx[map[elmnt]](evnt.srcElement);  
          else
            ctx[map[elmnt]]();  
        });
      });
    });
  }

  public play(){
    if (this.currentTime === 0)
    {
      var counterNum = parseInt($('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(), 10);
      var songPathCounter = counterNum - 1;
      this.audioTrack['src'] = this.audioTrackPaths[songPathCounter.toString()] + this.codec;
      this.audioTrack['play']();
    } 
    else 
    {
      this.audioTrack['currentTime'] = this.currentTime;
      this.audioTrack['play']();
    }
  }

  public pause(){
    this.audioTrack['pause']();
    this.currentTime = this.audioTrack['currentTime'];
  }

  public previous(){
    this.adjustTrackNumber('previous');
  }

  public next(){
    this.adjustTrackNumber('next');
  }

  private adjustTrackNumber(direction){
    this.pause();
    this.currentTime = 0;
    var beforeValue = $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text();

    if(direction == 'previous')
    {
      var afterValue = parseInt(beforeValue, 10) - 1;
      if (afterValue <= 1)
        afterValue = 1; 
 
      $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
      var trackNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10) - 1;
      $('#' + this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);
    }
    else if (direction == 'next')
    {
      var afterValue = parseInt(beforeValue, 10) + 1;
      var counter = this.audioTrackPaths.length;
      var trackNum = $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text();
      $('#' + this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);

      if (afterValue >= counter)
      afterValue = counter; 

      $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
    }
  }

  public volumeDown(){
    this.adjustVolume('down');
  }

  public volumeUp(){
    this.adjustVolume('up');
  }

  private adjustVolume(direction){
    var currentVolume = this.audioTrack['volume'];
    if(direction == 'up')
    {
      if(currentVolume >= 1)
        this.audioTrack['volume'] = currentVolume;
      else
        this.audioTrack['volume'] = currentVolume + 0.1;
    }
    else if(direction == 'down')
    {
      if(currentVolume <= 0.1)
        this.audioTrack['volume'] = currentVolume;
      else
        this.audioTrack['volume'] = currentVolume - 0.1;
    }
  }

  public mute(srcElmnt){
    if(this.audioTrack['muted'] == true)
    {
      this.audioTrack['muted'] = false;
      $(srcElmnt).text('Mute');
    }
    else if(this.audioTrack['muted'] == false)
    {
      this.audioTrack['muted'] = true;
      $(srcElmnt).text('Unmute');
    }
  }
}

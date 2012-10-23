/*
 * boombox.ts Typescript Library v0.1.1
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

    if(this.settings['configs']['buildBoombox'] == undefined || this.settings['configs']['buildBoombox'] === true)
      this.buildBoomboxDOM();

    this.attachEventListeners(this);
    
    var that = this;
    Object.keys(this.settings['tracks']).forEach(function(elmt, inx){
      that.audioTrackTitles.push(elmt);
      that.audioTrackPaths.push(that.settings['tracks'][elmt]);
    });

    if(this.settings['configs']['autoplay'] === true)
      this.play();

    if(this.settings['configs']['startingTrack'] != undefined)
    {
      var finalNum = this.settings['configs']['startingTrack'] - 1;
      this.currentAudioTrackTitle = this.audioTrackTitles[finalNum];
    }
    else
      this.currentAudioTrackTitle = this.audioTrackTitles[0];

    $('#' + this.settings['configs']['container'] + ' .boomboxTrackName').text(this.currentAudioTrackTitle);

    //console.log(this);
    // this.audioTrack['playbackRate'] = 1;
    // HTMLMediaElement Class reference for properties and events of the Audio Element http://goo.gl/FpSCA
  }

  private buildBoomboxDOM(){
    var wrapperDiv = document.createElement('div');
    var counterSpan = document.createElement('span');
    counterSpan.setAttribute('class','boomboxCounter');

    if(this.settings['configs']['startingTrack'] != undefined)
      counterSpan.innerText = this.settings['configs']['startingTrack'].toString();
    else
      counterSpan.innerText = '1';

    var trackNameSpan = document.createElement('span');
    trackNameSpan.setAttribute('class','boomboxTrackName');

    $(wrapperDiv).append(counterSpan);
    $('#' + this.settings['configs']['container']).append(wrapperDiv);
    $(wrapperDiv).append(trackNameSpan);

    var ElmntMap = {
      'PlayBtn'       : 'Play',
      'PauseBtn'      : 'Pause',
      'PreviousBtn'   : 'Previous',
      'NextBtn'       : 'Next',
      'VolumeDownBtn' : 'Volume Down',
      'VolumeUpBtn'   : 'Volume Up',
      'MuteBtn'       : 'Mute',
      'LoopBtn'       : 'Loop'
    };

    var that = this;
    var ElmntMapKeys = Object.keys(ElmntMap);
    $(ElmntMapKeys).each(function(inx,elent){
      var tmpEl = document.createElement('button');
      tmpEl.setAttribute('class','boombox' + elent);
      tmpEl.innerText = ElmntMap[elent];
      $('#' + that.settings['configs']['container']).append(tmpEl);
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
      'MuteBtn'       : 'mute',
      'LoopBtn'       : 'loop'
    };

    var mapKeys = Object.keys(map);
    $(mapKeys).each(function(indx,elmnt){
      $('#' + ctx.settings.configs.container + ' .boombox' + elmnt).each(function(inx,el){
        $(el).click(function(evnt){
          if(elmnt == 'MuteBtn' || elmnt == 'LoopBtn')
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

  private adjustTrackNumber(direction:string){
    if(this.audioTrack['loop'] == true)
    {
      this.loop($('#' + this.settings['configs']['container'] + ' .boomboxLoopBtn'));
    }
    this.pause();
    this.currentTime = 0;
    var beforeValue = $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text();

    if(direction == 'previous')
    {
      var afterValue = parseInt(beforeValue, 10) - 1;
      if (afterValue <= 1)
        afterValue = 1; 
 
      $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
      var trackNum = parseInt($('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(), 10) - 1;
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

  private adjustVolume(direction:string){
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

  public mute(srcElmnt:Object){
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

  public loop(srcElmnt?:Object){
    if(this.audioTrack['loop'] == true)
    {
      this.audioTrack['loop'] = false;
      $(srcElmnt).css('color','black');
    }
    else if(this.audioTrack['loop'] == false)
    {
      this.audioTrack['loop'] = true;
      $(srcElmnt).css('color','red');
    }
  }
}

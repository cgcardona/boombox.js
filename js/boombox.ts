/*
 * boombox.ts JavaScript Library v0.1.0
 * https://audiofile.cc/boombox
 * 
 * Copyright 2011 - 2012 Carlos Cardona 
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Date: Sat. Oct 20 2012                                                                                                   
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

    // Detect if the browser supports .mp3 or .ogg and set this.codec accordingly
    // HTML5 feature detection from http://diveintohtml5.info/everything.html
    if (!!(this.audioTrack['canPlayType'] && this.audioTrack['canPlayType']('audio/mpeg;').replace(/no/, '')))
      this.codec = ".mp3";
    else if (!!(this.audioTrack['canPlayType'] && this.audioTrack['canPlayType']('audio/ogg; codecs="vorbis"').replace(/no/, '')))
      this.codec = ".ogg";

      console.log(this);
      this.init(this);
  }

  public init(ctx){
    var map = {
      'PlayBtn'       : 'play',
      'PauseBtn'      : 'pause',
      'VolumeUpBtn'   : 'volumeup',
      'VolumeDownBtn' : 'volumedown',
      'NextBtn'       : 'next',
      'PreviousBtn'   : 'previous'
    };

    var mapKeys = Object.keys(map);
    $(mapKeys).each(function(indx,elmnt){
      $(ctx.settings  .configs.container + ' .boombox' + elmnt).each(function(inx,el){
        $(el).click(function(){
          var finalString = map[elmnt];
          ctx[finalString]();  
        });
      });
    });

    Object.keys(ctx.settings.tracks).forEach(function(elmt, inx){
      ctx.audioTrackTitles.push(elmt);
      ctx.audioTrackPaths.push(ctx.settings.tracks[elmt]);
    });

    if(ctx.settings.configs.autoplay === true)
      this.play();

    ctx.currentAudioTrackTitle = ctx.audioTrackTitles[0];
    $(ctx.settings.configs.container + ' .boomboxTrackName').text(ctx.currentAudioTrackTitle);
  }

  public play(){
    if (this.currentTime === 0)
    {
      var counterNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10);
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
    this['currentTime'] = this.audioTrack['currentTime'];
  }

  public previous(){
    this.audioTrack['pause']();
    this.currentTime = 0;
    var beforeValue = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
    var afterValue = parseInt(beforeValue, 10) - 1;
    var trackNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10) - 1;
    $(this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());

    if (afterValue <= 1)
      afterValue = 1; 
 
    $(this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);
  }

  public next(){
    this.audioTrack['pause']();
    this.currentTime = 0;
    var beforeValue = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
    var afterValue = parseInt(beforeValue, 10) + 1;
    var counter = this.audioTrackPaths.length;
    var trackNum = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
    $(this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);

    if (afterValue >= counter)
    afterValue = counter; 

    $(this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
  }

  public volumedown(){
    this.adjustVolume('down');
  }

  public volumeup(){
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
}

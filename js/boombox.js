/*
 * boombox.js JavaScript Library v0.2.0
 * https://audiofile.cc/boombox
 * 
 * Copyright 2011 - 2012 Carlos Cardona 
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Date: Sat. Oct 20 20122
 
 *    ,---,.                               ____                                                             
 *  ,'  .'  \                            ,'  , `.  ,---,                                                    
 *,---.' .' |   ,---.     ,---.       ,-+-,.' _ |,---.'|      ,---.                        .--.             
 *|   |  |: |  '   ,'\   '   ,'\   ,-+-. ;   , |||   | :     '   ,'\ ,--,  ,--,          .--,`|  .--.--.    
 *:   :  :  / /   /   | /   /   | ,--.'|'   |  ||:   : :    /   /   ||'. \/ .`|          |  |.  /  /    '   
 *:   |    ; .   ; ,. :.   ; ,. :|   |  ,', |  |,:     |,-..   ; ,. :'  \/  / ;          '--`_ |  :  /`./   
 *|   :     \'   | |: :'   | |: :|   | /  | |--' |   : '  |'   | |: : \  \.' /           ,--,'||  :  ;_     
 *|   |   . |'   | .; :'   | .; :|   : |  | ,    |   |  / :'   | .; :  \  ;  ;           |  | ' \  \    `.  
 *'   :  '; ||   :    ||   :    ||   : |  |/     '   : |: ||   :    | / \  \  \          :  | |  `----.   \ 
 *|   |  | ;  \   \  /  \   \  / |   | |`-'      |   | '/ : \   \  /./__;   ;  \ ___   __|  : ' /  /`--'  / 
 *|   :   /    `----'    `----'  |   ;/          |   :    |  `----' |   :/\  \ ;/  .\.'__/\_: |'--'.     /  
 *|   | ,'                       '---'           /    \  /          `---'  `--` \  ; |   :    :  `--'---'   
 *`----'                                         `-'----'                        `--" \   \  /              
 *                                                                                     `--`-'
 * ASCII art created with http://patorjk.com/software/taag/  
 */
'use strict';
var Boombox = (function () {
    function Boombox(settings) {
        this.track = 1;
        this.codec = '.mp3';
        this.song = new Audio();
        this.currentTime = 0;
        this.playing = false;
        this.titles = [];
        this.songPaths = [];
        this.settings = {
        };
        this.settings = settings;
        if(!!(this.song['canPlayType'] && this.song['canPlayType']('audio/mpeg;').replace(/no/, ''))) {
            this.codec = ".mp3";
        } else {
            if(!!(this.song['canPlayType'] && this.song['canPlayType']('audio/ogg; codecs="vorbis"').replace(/no/, ''))) {
                this.codec = ".ogg";
            }
        }
        this.init(this);
    }
    Boombox.prototype.init = function (ctx) {
        $(ctx.settings.configs.container + ' .boomboxPlayBtn').each(function (inx, el) {
            el.addEventListener('click', function () {
                ctx.play();
            }, false);
        });
        $(ctx.settings.configs.container + ' .boomboxPauseBtn').each(function (inx, el) {
            el.addEventListener('click', function () {
                ctx.pause();
            }, false);
        });
        $(ctx.settings.configs.container + ' .boomboxVolumeUpBtn').each(function (inx, el) {
            el.addEventListener('click', function () {
                ctx.volumeup();
            }, false);
        });
        $(ctx.settings.configs.container + ' .boomboxVolumeDownBtn').each(function (inx, el) {
            el.addEventListener('click', function () {
                ctx.volumedown();
            }, false);
        });
        $(ctx.settings.configs.container + ' .boomboxNextBtn').each(function (inx, el) {
            el.addEventListener('click', function () {
                ctx.next();
            }, false);
        });
        $(ctx.settings.configs.container + ' .boomboxPreviousBtn').each(function (inx, el) {
            el.addEventListener('click', function () {
                ctx.prev();
            }, false);
        });
        Object.keys(ctx.settings.tracks).forEach(function (elmt, inx) {
            ctx.titles.push(elmt);
            ctx.songPaths.push(ctx.settings.tracks[elmt]);
        });
        if(ctx.settings.configs.autoplay === true) {
            this.play();
        }
        ctx.songTitle = ctx.titles[0];
        $(ctx.settings.configs.container + ' .boomboxTrackName').text(ctx.songTitle);
    };
    Boombox.prototype.play = function () {
        if(this.currentTime === 0) {
            var counterNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10);
            var songPathCounter = counterNum - 1;
            this.track = this.songPaths[songPathCounter.toString()];
            this.song['src'] = this.track + this.codec;
            this.song['play']();
        } else {
            this.song['currentTime'] = this.currentTime;
            this.song['play']();
        }
    };
    Boombox.prototype.pause = function () {
        this.song['pause']();
        this['currentTime'] = this.song['currentTime'];
    };
    Boombox.prototype.prev = function () {
        this.song['pause']();
        this.currentTime = 0;
        var beforeValue = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
        var afterValue = parseInt(beforeValue, 10) - 1;
        if(afterValue <= 1) {
            afterValue = 1;
        }
        $(this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
        var trackNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10) - 1;
        $(this.settings['configs']['container'] + ' .boomboxTrackName').text(this.titles[trackNum]);
    };
    Boombox.prototype.next = function () {
        this.song['pause']();
        this.currentTime = 0;
        var beforeValue = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
        var afterValue = parseInt(beforeValue, 10) + 1;
        var counter = this.songPaths.length;
        var trackNum = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
        $(this.settings['configs']['container'] + ' .boomboxTrackName').text(this.titles[trackNum]);
        if(afterValue >= counter) {
            afterValue = counter;
        }
        $(this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
    };
    Boombox.prototype.volumedown = function () {
        var currentVolume = this.song['volume'];
        if(currentVolume <= 0.1) {
            this.song['volume'] = currentVolume;
        } else {
            this.song['volume'] = currentVolume - 0.1;
        }
    };
    Boombox.prototype.volumeup = function () {
        var currentVolume = this.song['volume'];
        if(currentVolume >= 1) {
            this.song['volume'] = currentVolume;
        } else {
            this.song['volume'] = currentVolume + 0.1;
        }
    };
    return Boombox;
})();

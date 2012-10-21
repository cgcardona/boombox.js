'use strict';
var Boombox = (function () {
    function Boombox(settings) {
        this.audioTrack = new Audio();
        this.audioTrackPaths = [];
        this.audioTrackTitles = [];
        this.codec = '.mp3';
        this.currentAudioTrackTitle = '';
        this.currentTime = 0;
        this.settings = {
        };
        this.settings = settings;
        if(!!(this.audioTrack['canPlayType'] && this.audioTrack['canPlayType']('audio/mpeg;').replace(/no/, ''))) {
            this.codec = ".mp3";
        } else {
            if(!!(this.audioTrack['canPlayType'] && this.audioTrack['canPlayType']('audio/ogg; codecs="vorbis"').replace(/no/, ''))) {
                this.codec = ".ogg";
            }
        }
        console.log(this);
        this.init(this);
    }
    Boombox.prototype.init = function (ctx) {
        var map = {
            'PlayBtn': 'play',
            'PauseBtn': 'pause',
            'VolumeUpBtn': 'volumeup',
            'VolumeDownBtn': 'volumedown',
            'NextBtn': 'next',
            'PreviousBtn': 'previous'
        };
        var mapKeys = Object.keys(map);
        $(mapKeys).each(function (indx, elmnt) {
            $(ctx.settings.configs.container + ' .boombox' + elmnt).each(function (inx, el) {
                $(el).click(function () {
                    var finalString = map[elmnt];
                    ctx[finalString]();
                });
            });
        });
        Object.keys(ctx.settings.tracks).forEach(function (elmt, inx) {
            ctx.audioTrackTitles.push(elmt);
            ctx.audioTrackPaths.push(ctx.settings.tracks[elmt]);
        });
        if(ctx.settings.configs.autoplay === true) {
            this.play();
        }
        ctx.currentAudioTrackTitle = ctx.audioTrackTitles[0];
        $(ctx.settings.configs.container + ' .boomboxTrackName').text(ctx.currentAudioTrackTitle);
    };
    Boombox.prototype.play = function () {
        if(this.currentTime === 0) {
            var counterNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10);
            var songPathCounter = counterNum - 1;
            this.audioTrack['src'] = this.audioTrackPaths[songPathCounter.toString()] + this.codec;
            this.audioTrack['play']();
        } else {
            this.audioTrack['currentTime'] = this.currentTime;
            this.audioTrack['play']();
        }
    };
    Boombox.prototype.pause = function () {
        this.audioTrack['pause']();
        this['currentTime'] = this.audioTrack['currentTime'];
    };
    Boombox.prototype.previous = function () {
        this.audioTrack['pause']();
        this.currentTime = 0;
        var beforeValue = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
        var afterValue = parseInt(beforeValue, 10) - 1;
        var trackNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10) - 1;
        $(this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
        if(afterValue <= 1) {
            afterValue = 1;
        }
        $(this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);
    };
    Boombox.prototype.next = function () {
        this.audioTrack['pause']();
        this.currentTime = 0;
        var beforeValue = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
        var afterValue = parseInt(beforeValue, 10) + 1;
        var counter = this.audioTrackPaths.length;
        var trackNum = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
        $(this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);
        if(afterValue >= counter) {
            afterValue = counter;
        }
        $(this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
    };
    Boombox.prototype.volumedown = function () {
        this.adjustVolume('down');
    };
    Boombox.prototype.volumeup = function () {
        this.adjustVolume('up');
    };
    Boombox.prototype.adjustVolume = function (direction) {
        var currentVolume = this.audioTrack['volume'];
        if(direction == 'up') {
            if(currentVolume >= 1) {
                this.audioTrack['volume'] = currentVolume;
            } else {
                this.audioTrack['volume'] = currentVolume + 0.1;
            }
        } else {
            if(direction == 'down') {
                if(currentVolume <= 0.1) {
                    this.audioTrack['volume'] = currentVolume;
                } else {
                    this.audioTrack['volume'] = currentVolume - 0.1;
                }
            }
        }
    };
    return Boombox;
})();

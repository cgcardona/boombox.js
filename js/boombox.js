'use strict';
var Boombox = (function () {
    function Boombox(settings) {
        this.track = 1;
        this.codec = '.mp3';
        this.audioTrack = new Audio();
        this.currentTime = 0;
        this.playing = false;
        this.audioTrackTitles = [];
        this.audioTrackPaths = [];
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
            ctx.audioTrackTitles.push(elmt);
            ctx.audioTrackPaths.push(ctx.settings.tracks[elmt]);
        });
        if(ctx.settings.configs.autoplay === true) {
            this.play();
        }
        ctx.songTitle = ctx.audioTrackTitles[0];
        $(ctx.settings.configs.container + ' .boomboxTrackName').text(ctx.songTitle);
    };
    Boombox.prototype.play = function () {
        if(this.currentTime === 0) {
            var counterNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10);
            var songPathCounter = counterNum - 1;
            this.track = this.audioTrackPaths[songPathCounter.toString()];
            this.audioTrack['src'] = this.track + this.codec;
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
    Boombox.prototype.prev = function () {
        this.audioTrack['pause']();
        this.currentTime = 0;
        var beforeValue = $(this.settings['configs']['container'] + ' .boomboxCounter').text();
        var afterValue = parseInt(beforeValue, 10) - 1;
        if(afterValue <= 1) {
            afterValue = 1;
        }
        $(this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
        var trackNum = parseInt($(this.settings['configs']['container'] + ' .boomboxCounter').text(), 10) - 1;
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
        var currentVolume = this.audioTrack['volume'];
        if(currentVolume <= 0.1) {
            this.audioTrack['volume'] = currentVolume;
        } else {
            this.audioTrack['volume'] = currentVolume - 0.1;
        }
    };
    Boombox.prototype.volumeup = function () {
        var currentVolume = this.audioTrack['volume'];
        if(currentVolume >= 1) {
            this.audioTrack['volume'] = currentVolume;
        } else {
            this.audioTrack['volume'] = currentVolume + 0.1;
        }
    };
    return Boombox;
})();

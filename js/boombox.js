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
        if(this.settings['configs']['buildBoombox'] == undefined || this.settings['configs']['buildBoombox'] === true) {
            this.buildBoomboxDOM();
        }
        this.attachEventListeners();
        var thisObj = this;
        Object.keys(this.settings['tracks']).forEach(function (elmt, inx) {
            thisObj.audioTrackTitles.push(elmt);
            thisObj.audioTrackPaths.push(thisObj.settings['tracks'][elmt]);
        });
        if(this.settings['configs']['startingTrack'] != undefined) {
            this.currentAudioTrackTitle = this.audioTrackTitles[this.settings['configs']['startingTrack'] - 1];
        } else {
            this.currentAudioTrackTitle = this.audioTrackTitles[0];
        }
        this.setSource();
        if(this.settings['configs']['autoplay'] === true) {
            this.play();
        }
        document.querySelectorAll('#' + this.settings['configs']['container'] + ' .boomboxTrackName')[0]['innerHTML'] = this.currentAudioTrackTitle;
    }
    Boombox.prototype.setSource = function () {
        var counterNum = parseInt(document.querySelectorAll('#' + this.settings['configs']['container'] + ' .boomboxCounter')[0]['innerText'], 10);
        var songPathCounter = counterNum - 1;
        this.audioTrack['src'] = this.audioTrackPaths[songPathCounter.toString()] + this.codec;
    };
    Boombox.prototype.buildBoomboxDOM = function () {
        var wrapperDiv = document.createElement('div');
        var counterSpan = document.createElement('span');
        counterSpan.setAttribute('class', 'boomboxCounter');
        if(this.settings['configs']['startingTrack'] != undefined) {
            counterSpan.innerText = this.settings['configs']['startingTrack'].toString();
        } else {
            counterSpan.innerText = '1';
        }
        var trackNameSpan = document.createElement('span');
        trackNameSpan.setAttribute('class', 'boomboxTrackName');
        wrapperDiv.appendChild(counterSpan);
        document.getElementById(this.settings['configs']['container']).appendChild(wrapperDiv);
        wrapperDiv.appendChild(trackNameSpan);
        var ElmntMap = {
            'PlayBtn': 'Play',
            'PauseBtn': 'Pause',
            'PreviousBtn': 'Previous',
            'NextBtn': 'Next',
            'VolumeDownBtn': 'Volume Down',
            'VolumeUpBtn': 'Volume Up',
            'MuteBtn': 'Mute',
            'LoopBtn': 'Loop'
        };
        var thisObj = this;
        var ElmntMapKeys = Object.keys(ElmntMap);
        ElmntMapKeys.forEach(function (elent, inx) {
            var tmpEl = document.createElement('button');
            tmpEl.setAttribute('class', 'boombox' + elent);
            tmpEl.innerText = ElmntMap[elent];
            document.getElementById(thisObj.settings['configs']['container']).appendChild(tmpEl);
        });
        var currentTimeRangeWrapper = document.createElement('div');
        currentTimeRangeWrapper.className = 'crntTime';
        var currentTimeRangeDesc = document.createElement('span');
        currentTimeRangeDesc.className = "currentTime";
        currentTimeRangeDesc.innerText = "Current Time: 0";
        var currentTimesliderInput = document.createElement('input');
        currentTimesliderInput.setAttribute('type', 'range');
        currentTimesliderInput.setAttribute('min', '0');
        currentTimesliderInput.setAttribute('step', '.1');
        currentTimesliderInput['value'] = '0';
        currentTimesliderInput.className = 'boomboxCurrentTime';
        currentTimeRangeWrapper.appendChild(currentTimeRangeDesc);
        currentTimeRangeWrapper.appendChild(currentTimesliderInput);
        document.getElementById(this.settings['configs']['container']).appendChild(currentTimeRangeWrapper);
        var pbRateRangeWrapper = document.createElement('div');
        var pbRateRangeDesc = document.createElement('span');
        pbRateRangeDesc.className = 'pbRate';
        pbRateRangeDesc.innerText = 'Playback Rate: 1';
        var pbRatesliderInput = document.createElement('input');
        pbRatesliderInput.setAttribute('type', 'range');
        pbRatesliderInput.setAttribute('min', '.5');
        pbRatesliderInput.setAttribute('max', '1');
        pbRatesliderInput.setAttribute('step', '.1');
        pbRatesliderInput['value'] = '1';
        pbRatesliderInput.className = 'boomboxPlaybackRate';
        pbRateRangeWrapper.appendChild(pbRateRangeDesc);
        pbRateRangeWrapper.appendChild(pbRatesliderInput);
        document.getElementById(this.settings['configs']['container']).appendChild(pbRateRangeWrapper);
    };
    Boombox.prototype.attachEventListeners = function () {
        var map = {
            'PlayBtn': 'play',
            'PauseBtn': 'pause',
            'VolumeUpBtn': 'volumeUp',
            'VolumeDownBtn': 'volumeDown',
            'NextBtn': 'next',
            'PreviousBtn': 'previous',
            'MuteBtn': 'mute',
            'LoopBtn': 'loop'
        };
        var thisObj = this;
        var mapKeys = Object.keys(map);
        mapKeys.forEach(function (elmnt, indx) {
            $('#' + thisObj.settings['configs']['container'] + ' .boombox' + elmnt).each(function (inx, el) {
                el.addEventListener('click', function (evnt) {
                    if(elmnt == 'MuteBtn' || elmnt == 'LoopBtn') {
                        thisObj[map[elmnt]](evnt.srcElement);
                    } else {
                        thisObj[map[elmnt]]();
                    }
                }, false);
            });
        });
        var crntTmRngInput = document.querySelectorAll('#' + thisObj.settings['configs']['container'] + ' .boomboxCurrentTime')[0];
        $(crntTmRngInput).change(function (et) {
            thisObj.audioTrack['currentTime'] = et.srcElement.value;
            var spanEl = document.querySelectorAll('#' + thisObj.settings['configs']['container'] + ' .currentTime')[0];
            spanEl['innerText'] = 'Current Time: ' + et.srcElement.value;
        });
        var plybkRangeInput = document.querySelectorAll('#' + thisObj.settings['configs']['container'] + ' .boomboxPlaybackRate')[0];
        $(plybkRangeInput).change(function (evnt) {
            thisObj.audioTrack['playbackRate'] = evnt.srcElement.value;
            var spanEl = document.querySelectorAll('#' + thisObj.settings['configs']['container'] + ' .pbRate')[0];
            spanEl['innerText'] = 'Playback Rate: ' + evnt.srcElement.value;
        });
        $(this.audioTrack).bind('timeupdate', function (evt) {
            var bmbxCrntTm = document.querySelectorAll('#' + thisObj.settings['configs']['container'] + ' .boomboxCurrentTime')[0];
            bmbxCrntTm.setAttribute('value', evt.srcElement.currentTime);
            var roundedCrntTime = Math.round(evt.srcElement.currentTime * 10) / 10;
            var splitCrntTime = roundedCrntTime.toString().split('.');
            var spanEl = document.querySelectorAll('#' + thisObj.settings['configs']['container'] + ' .currentTime')[0];
            if(parseInt(splitCrntTime[1], 10) >= 5) {
                spanEl['innerText'] = 'Current Time: ' + Math.ceil(evt.srcElement.currentTime);
            } else {
                if(parseInt(splitCrntTime[1], 10) <= 4) {
                    spanEl['innerText'] = 'Current Time: ' + Math.floor(evt.srcElement.currentTime);
                }
            }
        });
        var eventKeys = Object.keys(this.settings['configs']['events']);
    };
    Boombox.prototype.play = function () {
        document.querySelectorAll('#' + this.settings['configs']['container'] + ' .boomboxCurrentTime')[0].setAttribute('max', this.audioTrack['duration']);
        if(this.currentTime === 0) {
            this.audioTrack['play']();
        } else {
            this.audioTrack['currentTime'] = this.currentTime;
            this.audioTrack['play']();
        }
    };
    Boombox.prototype.pause = function () {
        this.audioTrack['pause']();
        this.currentTime = this.audioTrack['currentTime'];
    };
    Boombox.prototype.previous = function () {
        this.adjustTrackNumber('previous');
    };
    Boombox.prototype.next = function () {
        this.adjustTrackNumber('next');
    };
    Boombox.prototype.adjustTrackNumber = function (direction) {
        if(this.audioTrack['loop'] == true) {
            this.loop(document.querySelectorAll('#' + this.settings['configs']['container'] + ' .boomboxLoopBtn')[0]);
        }
        this.pause();
        this.currentTime = 0;
        var beforeValue = document.querySelectorAll('#' + this.settings['configs']['container'] + ' .boomboxCounter')[0].innerText;
        if(direction == 'previous') {
            var afterValue = parseInt(beforeValue, 10) - 1;
            if(afterValue <= 1) {
                afterValue = 1;
            }
            $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
            var trackNum = parseInt($('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(), 10) - 1;
            $('#' + this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);
        } else {
            if(direction == 'next') {
                var afterValue = parseInt(beforeValue, 10) + 1;
                var counter = this.audioTrackPaths.length;
                var trackNum = $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text();
                $('#' + this.settings['configs']['container'] + ' .boomboxTrackName').text(this.audioTrackTitles[trackNum]);
                if(afterValue >= counter) {
                    afterValue = counter;
                }
                $('#' + this.settings['configs']['container'] + ' .boomboxCounter').text(afterValue.toString());
            }
        }
        $('#' + this.settings['configs']['container'] + ' .currentTime').text('Current Time: 0');
        $('#' + this.settings['configs']['container'] + ' .boomboxCurrentTime').val('0');
        this.setSource();
    };
    Boombox.prototype.volumeDown = function () {
        this.adjustVolume('down');
    };
    Boombox.prototype.volumeUp = function () {
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
    Boombox.prototype.mute = function (srcElmnt) {
        if(this.audioTrack['muted'] == true) {
            this.audioTrack['muted'] = false;
            $(srcElmnt).text('Mute');
        } else {
            if(this.audioTrack['muted'] == false) {
                this.audioTrack['muted'] = true;
                $(srcElmnt).text('Unmute');
            }
        }
    };
    Boombox.prototype.loop = function (srcElmnt) {
        if(this.audioTrack['loop'] == true) {
            this.audioTrack['loop'] = false;
            $(srcElmnt).css('color', 'black');
        } else {
            if(this.audioTrack['loop'] == false) {
                this.audioTrack['loop'] = true;
                $(srcElmnt).css('color', 'red');
            }
        }
    };
    return Boombox;
})();

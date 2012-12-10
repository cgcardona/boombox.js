'use strict';
var EventObject = (function () {
    function EventObject() {
        this.networkStates = [
            'NETWORK_EMPT', 
            'NETWORK_IDLE', 
            'NETWORK_LOADING', 
            'NETWORK_NO_SOURCE'
        ];
        this.readyStates = [
            'HAVE_NOTHING', 
            'HAVE_METADATA', 
            'HAVE_CURRENT_DATA', 
            'HAVE_FUTURE_DATA', 
            'HAVE_ENOUGH_DATA'
        ];
    }
    EventObject.prototype.onAbort = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('abort', evt);
    };
    EventObject.prototype.onCanPlay = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('canplay', evt);
    };
    EventObject.prototype.onCanPlayThrough = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('canplaythrough', evt);
    };
    EventObject.prototype.onDurationChange = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('durationchange', evt);
    };
    EventObject.prototype.onEmptied = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('emptied', evt);
    };
    EventObject.prototype.onEnded = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('ended', evt);
    };
    EventObject.prototype.onError = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('error', evt);
    };
    EventObject.prototype.onLoadedData = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('loadeddata', evt);
    };
    EventObject.prototype.onLoadedMetaData = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('loadedmetadata', evt);
    };
    EventObject.prototype.onLoadStart = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('loadstart', evt);
    };
    EventObject.prototype.onPause = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('pause', evt);
    };
    EventObject.prototype.onPlay = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('play', evt);
    };
    EventObject.prototype.onPlaying = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('playing', evt);
    };
    EventObject.prototype.onProgress = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('progress', evt);
    };
    EventObject.prototype.onRateChange = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('ratechange', evt);
    };
    EventObject.prototype.onSeeked = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('seeked', evt);
    };
    EventObject.prototype.onSeeking = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('seeking', evt);
    };
    EventObject.prototype.onStalled = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('stalled', evt);
    };
    EventObject.prototype.onSuspend = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('suspend', evt);
    };
    EventObject.prototype.onTimeUpdate = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('timeupdate', evt);
    };
    EventObject.prototype.onVolumeChange = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('volumechange', evt);
    };
    EventObject.prototype.onWaiting = function (evt) {
        evt.data.eventObj.eventObj.consoleLog('waiting', evt);
    };
    EventObject.prototype.consoleLog = function (eventType, evt) {
        console.log('************************************************************************************************');
        console.log('*    event:  ' + eventType);
        console.log('*    networkState:  ' + evt.data.eventObj.eventObj.networkStates[evt.srcElement.networkState]);
        console.log('*    readyState:  ' + evt.data.eventObj.eventObj.readyStates[evt.srcElement.readyState]);
        console.log('************************************************************************************************');
    };
    return EventObject;
})();

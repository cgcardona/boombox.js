'use strict';
class EventObject{
  public networkStates:string[] = [ 'NETWORK_EMPT', 'NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE' ];
  public readyStates:string[] = [ 'HAVE_NOTHING','HAVE_METADATA','HAVE_CURRENT_DATA','HAVE_FUTURE_DATA','HAVE_ENOUGH_DATA' ];
  constructor(){
  }

  public onAbort(evt){
    evt.data.eventObj.eventObj.consoleLog('abort',evt);
  }

  public onCanPlay(evt){
    evt.data.eventObj.eventObj.consoleLog('canplay',evt);
  }

  public onCanPlayThrough(evt){
    evt.data.eventObj.eventObj.consoleLog('canplaythrough',evt);
  }

  public onDurationChange(evt){
    evt.data.eventObj.eventObj.consoleLog('durationchange',evt);
  }

  public onEmptied(evt){
    evt.data.eventObj.eventObj.consoleLog('emptied',evt);
  }

  public onEnded(evt){
    evt.data.eventObj.eventObj.consoleLog('ended',evt);
  }

  public onError(evt){
    evt.data.eventObj.eventObj.consoleLog('error',evt);
  }

  public onLoadedData(evt){
    evt.data.eventObj.eventObj.consoleLog('loadeddata',evt);
  }

  public onLoadedMetaData(evt){
    evt.data.eventObj.eventObj.consoleLog('loadedmetadata',evt);
  }

  public onLoadStart(evt){
    evt.data.eventObj.eventObj.consoleLog('loadstart',evt);
  }

  public onPause(evt){
    evt.data.eventObj.eventObj.consoleLog('pause',evt);
  }

  public onPlay(evt){
    evt.data.eventObj.eventObj.consoleLog('play',evt);
  }

  public onPlaying(evt){
    evt.data.eventObj.eventObj.consoleLog('playing',evt);
  }

  public onProgress(evt){
    evt.data.eventObj.eventObj.consoleLog('progress',evt);
  }

  public onRateChange(evt){
    evt.data.eventObj.eventObj.consoleLog('ratechange',evt);
  }

  public onSeeked(evt){
    evt.data.eventObj.eventObj.consoleLog('seeked',evt);
  }

  public onSeeking(evt){
    evt.data.eventObj.eventObj.consoleLog('seeking',evt);
  }

  public onStalled(evt){
    evt.data.eventObj.eventObj.consoleLog('stalled',evt);
  }

  public onSuspend(evt){
    evt.data.eventObj.eventObj.consoleLog('suspend',evt);
  }

  public onTimeUpdate(evt){
    evt.data.eventObj.eventObj.consoleLog('timeupdate',evt);
  }

  public onVolumeChange(evt){
    evt.data.eventObj.eventObj.consoleLog('volumechange',evt);
  }

  public onWaiting(evt){
    evt.data.eventObj.eventObj.consoleLog('waiting',evt);
  }

  private consoleLog(eventType, evt){
    console.log('************************************************************************************************');
    console.log('*    event:  ' + eventType);
    console.log('*    networkState:  ' + evt.data.eventObj.eventObj.networkStates[evt.srcElement.networkState]);
    console.log('*    readyState:  ' + evt.data.eventObj.eventObj.readyStates[evt.srcElement.readyState]);
    console.log('************************************************************************************************');
  }
}

<script>
  import { onMount } from "svelte";

  import {
    sessionInstance,
    publisherInstance,
    spotlight,
    hostsAndGuests,
    othersStreams
  } from "../../stores/streamStore.js";

  import Layout from "./Layout";
  import Publihser from "./Publisher";
  import {
    initializeSession,
    connectSession,
    disconnectFromSession,
    manageSession,
  } from "./functions/sessionFunctions";

  import { record } from "./functions/recordingFunctions";

  export let apiKey;
  export let sessionId;
  export let token;
  export let archiveName;

  // stream state

  let streamState = {
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: null,
    isRecording: false,
  };

  sessionInstance.set(initializeSession(apiKey, sessionId));
  onMount(() => {
    manageSession($sessionInstance);
    connectSession($sessionInstance, token, $publisherInstance);
  });

  // session event listener to keep the track of the streams
  $sessionInstance.on("streamCreated", (event) => {
    
    if (event.stream.videoType == "screen") {
      console.log("it is a scren stream");
      spotlight.set(event.stream);
      return;
    }

    const isSpecial = JSON.parse(event.stream.connection.data).special_guest;
    isSpecial
      ? hostsAndGuests.set([...$hostsAndGuests, event.stream])
      : othersStreams.set([...$othersStreams, event.stream]);
  });

  function toggleVideo() {
    streamState.isVideoOn = !streamState.isVideoOn;
    $publisherInstance.publishVideo(streamState.isVideoOn);
  }
  function toggleAudio() {
    streamState.isAudioOn = !streamState.isAudioOn;
    $publisherInstance.publishAudio(streamState.isAudioOn);
  }
  function handleScreenSharing() {
    streamState.isScreenSharing = !streamState.isScreenSharing;
  }
  function handleRecording() {
    streamState.isRecording = !streamState.isRecording;
    record(streamState.isRecording, sessionId, archiveName);
  }

</script>

<style>
  .video-panel {
    position: relative;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .layout {
    height: 100%;
    display: grid;
    grid-template-columns: auto minmax(auto, 60%);
    grid-template-rows: minmax(auto, 60%) auto;
  }

  .buttons {
    position: absolute;
    display: flex;
    bottom: 0;
    right: 0;
    z-index: 10;
  }
</style>

<div class="video-panel">
  <div class="layout">
    <Layout isScreenSharing={streamState.isScreenSharing} />
  </div>

  <Publihser />

  <div class="buttons">
    <button on:click={toggleAudio}>Sound
      {streamState.isAudioOn ? 'OFF' : 'ON'}</button>
    <button on:click={toggleVideo}>CAMERA
      {streamState.isVideoOn ? 'OFF' : 'ON'}</button>
    <button
      class="screen-share"
      on:click={handleScreenSharing}>{streamState.isScreenSharing ? 'STOP' : ''}
      Share Screen</button>
    <button on:click={handleRecording}>{streamState.isRecording ? 'STOP' : ''}
      Record</button>
    <button on:click={disconnectFromSession($sessionInstance)}>Leave</button>
  </div>
</div>

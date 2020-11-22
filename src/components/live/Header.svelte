<script>
  import Tooltip from "../tooltip/Tooltip";
  
  import { handleTimeFormating } from "../../pages/host/_helpers";

  export let isRecording = false;
  export let thinkinName;
  export let startDate;
  // export let duration;

  const fullscreenSRC = "/assets/headericons/open_in_full-24px.svg";
  const exitFullscreenSRC = "/assets/headericons/close_fullscreen-24px.svg";
  const settingsSRC = "/assets/headericons/info.svg";

  let src = fullscreenSRC;
  let isFullscreen = false;

  function toggleFullScreen() {
    if (!isFullscreen) {
      src = exitFullscreenSRC;
      document.documentElement.requestFullscreen();
    } else {
      src = fullscreenSRC;
      document.exitFullscreen();
    }
    isFullscreen = !isFullscreen;
  }

  const { DATE, TIME, WD, YYYY } = handleTimeFormating(startDate);
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    color: white;
    padding: 0px 10px;
  }
  .title {
    font-size: 24px;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .details {
    font-family: Koopman;
    color: white;
    font-size: 16px;
    opacity: 0.8;
    margin: 0;
  }

  .recording {
    background-color: red;
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    display: inline;

  }
  .notRecording {
    display: none;
  }
  .tooltip-container {
    position: relative;
    cursor: pointer;
  }
</style>

<div class="container">
  <div class="tooltip-container">
    <Tooltip className="bottom-left">
      <span>Fullscreen</span>
    </Tooltip>
    <img {src} alt="fullscreen" on:click={toggleFullScreen} />
    <p class={isRecording ? 'recording' : 'notRecording'}>REC</p>
  </div>
  <p class="title">{thinkinName}</p>
  <div class="tooltip-container">
    <Tooltip className="bottom-right">
      <span>Fullscreen</span>
    </Tooltip>
    <img src={settingsSRC} alt="settings" class="settings" />
  </div>
</div>
<p class="details">{WD} {DATE} {YYYY}, {TIME}</p>

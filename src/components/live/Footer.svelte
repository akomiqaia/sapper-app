<script>
  import Tooltip from "../tooltip/Tooltip";

  export let changeCollapseElementState;

  const startPollSRC = "/assets/footericons/start_poll.svg";
  const addMediaSRC = "/assets/footericons/add_media.svg";
  const chatSRC = "/assets/footericons/chat.svg";
  const clipsSRC = "/assets/footericons/clips.svg";
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0px 10px;
    height: 50px;
  }
  .main-controls {
    display: flex;
    height: 100%;
    align-items: center;
    transform: translateX(-50%);

  }
  .tooltip-container {
    position: relative;
    cursor: pointer;
  }
</style>

<div class="container">
  <div on:click={changeCollapseElementState}>
    ICONS - 235
  </div>
  <div class="main-controls">
    <div class="tooltip-container">
      <Tooltip className="top">
        <span>Start Poll</span>
      </Tooltip>
      <img src={startPollSRC} alt="" />
    </div>
    <div class="tooltip-container">
      <Tooltip className="top">
        <span>Add media</span>
      </Tooltip>
      <img src={addMediaSRC} alt="" />
    </div>
    <div class="tooltip-container">
      <Tooltip className="top">
        <span>Clips</span>
      </Tooltip>
      <img src={clipsSRC} alt="clip" on:click={changeCollapseElementState} />
    </div>
  </div>
  <div class="tooltip-container">
    <Tooltip className="top-right">
      <span>Chat</span>
    </Tooltip>
    <span>24</span>
    <img src={chatSRC} alt="chat" on:click={changeCollapseElementState} />
  </div>
</div>

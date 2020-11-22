<!-- <script>
  import { slide } from "svelte/transition";
  import { params } from "@sveltech/routify";
  import slideLeftRight from "./slideLeftRight";

  import Header from "../../../../components/live/Header";
  import Footer from "../../../../components/live/Footer";
  import Stream from "../../../../components/stream/Stream";
  import Participants from "../../../../components/participants/Participants";
  import Chat from "../../../../components/chat/Chat"

  const { sessionId, token, apiKey } = $params;

  let state = {
    isChatOpen: true,
    isClipsOpen: true,
    isParticipantsOpen: true,
  };

  function changeCollapseElementState(event) {
    if (event.target.innerText) {
      state.isParticipantsOpen = !state.isParticipantsOpen;
    } else if (event.target.alt === "clip") {
      state.isClipsOpen = !state.isClipsOpen;
    } else if (event.target.alt === "chat") {
      state.isChatOpen = !state.isChatOpen;
    }
  }

</script>

<style>
  .parent {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 80px 2fr auto 50px;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    height: 100vh;
  }
  .header {
    grid-column: 1/-1;
    background-color: var(--midnight);
  }
  .video-panel {
    grid-column: 2/3;
    grid-row: 2/3;
    background-color: var(--midnight);
  }
 
  .chat {
    width: 240px;
    grid-column: 3/4;
    grid-row: 2 / 4;
    background-color: bisque;
  }

  .footer {
    grid-column: 1/-1;
    grid-row: 4/5;
    background-color: var(--midnight);
  }
  .clips {
    height: 300px;
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    background-color: var(--midnight);
  }
</style>

<div class="parent">
  <div class="header">
    <Header
      isRecording={state.recording}
      thinkinName={$params.name.replace(/\%20/g, ' ')}
      startDate={$params.start_date}
      duration={$params.duration} />
  </div>
  {#if state.isParticipantsOpen}
  <Participants />
  {/if}
  <div transition:slide class="video-panel">
    <Stream {apiKey} {sessionId} {token} archiveName={$params.name} />
  </div>
  {#if state.isChatOpen}
    <div transition:slideLeftRight class="chat">
      <Chat />
    </div>
  {/if}
  {#if state.isClipsOpen}
    <div transition:slide class="clips">Clips</div>
  {/if}
  <div class="footer">
    <Footer {changeCollapseElementState} />
  </div>
</div> -->

<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import slideLeftRight from "./slideLeftRight";


  import {
    sessionInstance,
    spotlight,
    hostsAndGuests,
  } from "../../stores/streamStore";
  
  import Dropdown from "./Dropdown";

  let participants = [];
  let isParticipantsOptionOpen = false;

  onMount(() => {
    $sessionInstance.on({
      streamCreated: (event) => {
        console.log(event.stream)
        if (event.stream.videoType === "screen") {
          return;
        }
        const newParticipant = {
          streamId: event.stream.id,
          name: JSON.parse(event.stream.connection.data).first_name,
          jobTitle: JSON.parse(event.stream.connection.data).job_titles,
          isSpecial: JSON.parse(event.stream.connection.data).special_guest,
          hasAudio: event.stream.hasAudio,
          hasVideo: event.stream.hasVideo
        };
        participants = [...participants, newParticipant];
      },
      streamDestroyed: (event) => {
        participants = participants.filter(
          (participant) => participant.streamId != event.stream.id
        );
      },
      // we need to add couple of listeners here for audio and video events
      
      // that will update values in each particpant when they unsubscribe or subscribe the stream
    });
  });

  function handleSpotlightClick(event) {
    let spotlightedStream = $hostsAndGuests.filter(
      (stream) => (stream.id = event.target.dataset.streamid)
    )[0];
    spotlight.set(spotlightedStream);
  }

  function handleParticipantClick(streamId) {
    isParticipantsOptionOpen = streamId
  }
  function handleDropdownClose() {
    isParticipantsOptionOpen = false
  }
</script>

<style>
  .participants {
    width: 240px;
    grid-column: 1 / 2;
    grid-row: 2 / 4;
    background-color: var(--midnight);
    display: flex;
    flex-direction: column;
  }
  li {
    color: black;
    background-color: bisque;
    font-size: 20px;
    text-align: left;
    align-self: center;
    list-style: none;
    margin-bottom: 5px;
    padding-left: 20px;
    height: 40px;
    width: 100%;
  }
</style>

<div transition:slideLeftRight class="participants">
  {#if participants}
    {#each participants as participant (participant.streamId)}
      <li on:click|self={handleParticipantClick(participant.streamId)} transition:slide|local>
        {#if isParticipantsOptionOpen == participant.streamId}
          <Dropdown on:click_outside={handleDropdownClose} data={participant}/>
        {/if}
        {participant.name}
     
      </li>
    {/each}
  {/if}
</div>

<script>
  import { onMount } from "svelte";


  import {
    sessionInstance,
    screensharePublisherInstance,
    spotlight
  } from "../../stores/streamStore.js";
  import {
    unpublish,
    initScreenSharingPublisher,
    publishScreenshare,
  } from "./functions/publisherFunctions.js";

  import {
    subscribeStream,
    replaceSpotlight,
  } from "./functions/subscriberFunctions";

  export let isScreenSharing;

  let spotlightDOM;
  let hostDOM;
  let otherDOM;

  onMount(() => {
    subscribeStream($sessionInstance, hostDOM, otherDOM, spotlightDOM);
  });

  $: if (isScreenSharing) {
    screensharePublisherInstance.set(initScreenSharingPublisher(spotlightDOM));
    publishScreenshare($sessionInstance, $screensharePublisherInstance);
  }
  $: if (isScreenSharing === false) {
    unpublish($sessionInstance, $screensharePublisherInstance);
  }
  $: if ($spotlight.videoType == "camera") {
    console.log("we are spotlighting the user");
    replaceSpotlight($sessionInstance, spotlightDOM, $spotlight)
  }

</script>

<style>
  .host {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    display: flex;
    height: 100%;
  }

  .other {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    display: flex;
    height: 100%
  }

  .spotlight {
    grid-row: 1 / -1;
    grid-column: 2 / -1;
    width: 100%;
    height: 100%;
  }

  .off {
    width: 0;
    height: 0;
  }
</style>

<div bind:this={hostDOM} class="host" />
<div bind:this={otherDOM} class="other" />
<div bind:this={spotlightDOM} class={isScreenSharing ? "spotlight" : "off"} />

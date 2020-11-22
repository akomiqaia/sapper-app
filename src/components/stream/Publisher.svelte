<script>
  import { onMount } from "svelte";
  import { publisherInstance } from "../../stores/streamStore.js";
  import { initPublisher } from "./functions/publisherFunctions";
  
  let publisherDOM;

  onMount(() => {
    publisherInstance.set(initPublisher(publisherDOM));
  });
</script>

<style>
  .publisher {
    position: relative;
    width: 100px;
    height: 100px;
    top: 0px;
    left: 0px;
  }
</style>

<div bind:this={publisherDOM} class="publisher" />

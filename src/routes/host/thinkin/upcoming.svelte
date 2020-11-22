<script context="module">
  export async function preload() {
    const res = await this.fetch("/api/thinkins");
    const thinkins = await res.json();
    return { thinkins };
  }
</script>

<script>
  import {currentThinkIn} from '../../../stores/streamStore' 
  
  import {
    handleTimeFormating,
    compareDates,
    checkThinkIsLive,
  } from "../_helpers";
  
  export let thinkins;
  
  function saveDataAboutThinkIn(event) {
    currentThinkIn.set(event.target.innerText)
  }

</script>

<style>
  .list {
    font-family: Koopman, sans-serif;
    width: 100%;
    max-width: 800px;
    margin: 8px 0;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .list-item-wrapper {
    display: flex;
    text-align: left;
    margin-bottom: 30px;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  .divider {
    border-bottom: 2px var(--lesswhite) solid;
  }

  .date {
    margin-right: 30px;
  }
  .event-name {
    flex-grow: 2;
  }
  .event-name > a {
    text-decoration: none;
    color: var(--white);
  }
  .current {
    background-color: red;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
</style>

<div class="list">
  {#each thinkins as { start_date, name, duration }, i (name)}
    <div
      class={`${thinkins[i + 1] && compareDates(start_date, thinkins[i + 1].date) ? 'divider' : ''} list-item-wrapper`}>
      <p class="date">{handleTimeFormating(start_date).DATE}</p>
      <p
        class={`${checkThinkIsLive(start_date, duration) ? 'current' : ''} date`}>
        {handleTimeFormating(start_date).TIME}
      </p>
      <p class="event-name">
        <a  href={`/host/thinkin/code`} on:click={saveDataAboutThinkIn}>{name}</a>
      </p>
    </div>
  {/each}

</div>

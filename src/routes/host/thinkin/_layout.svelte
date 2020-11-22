<script>
  export let segment
  $: console.log(segment)
</script>

<style>
  nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  nav > div >a {
    text-decoration: none;
    margin-right: 20px;
    color: var(--lesswhite);
    font-family: Koopman;
  }

  button {
    background-color: var(--lettuce);
    border: none;
    color: black;
  }
  button > a {
    display: inline-block;
    text-decoration: none;
    padding: 10px;
    font-family: Koopman;
    color: var(--kelp);
  }
  .active {
    color: var(--white);
    border-bottom: 3px white solid;
    font-weight: bold;
  }
 
</style>

<svelte:head>
  <style>
    body {
      background-color: var(--midnight);
      color: white;
      padding: 1em;
    }
  </style>
</svelte:head>

<nav>
  <div>
    <a class:active={segment === "upcoming"} href="/host/thinkin/upcoming">Upcoming</a>
    <a class:active={segment === "completed"} href="/host/thinkin/completed">Completed</a>
  </div>
  <button> <a href="/host/thinkin/new">New ThinkIn</a> </button>
</nav>

<slot />

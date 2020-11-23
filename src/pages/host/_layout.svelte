<script>
  import { isActive, url } from "@sveltech/routify";
  const LINKS = [
    ["/host/thinkin/upcoming", "Upcoming"],
    ["/host/thinkin/completed", "Completed"],
  ];
</script>

<style>
  nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  nav > div > a {
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
    {#each LINKS as [path, name]}
      <a class:active={$isActive(path)} href={$url(path)}>{name}</a>
    {/each}
  </div>
  <button> <a href={$url(`/host/thinkin/new`)}>New ThinkIn</a> </button>
</nav>

<slot />

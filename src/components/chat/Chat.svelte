<script>
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  import {slide} from "svelte/transition"
  import { sessionInstance, messages, currentUser } from "../../stores/streamStore";

  let div;
  let autoscroll;
  $: console.log($currentUser)

  onMount(() => {
    getMessages().then((data) => {
      messages.set(data.messages)
    });
    div.scrollTo(0, div.scrollHeight);
  });
  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });
  $sessionInstance.on("signal:msg", function signalCallback(event) {
    $messages = $messages.concat(event.data);
  });

  function handleKeydown(event) {
    if (event.key === "Enter") {
      const message = event.target.value;
      if (!message) return;
      $sessionInstance.signal(
        {
          type: "msg",
          data: {
            author: JSON.parse($sessionInstance.connection.data).first_name,
            message,
          },
        },
        function signalCallback(error) {
          if (error) {
            console.error("Error sending signal:", error.name, error.message);
          } else {
            saveMessage(message);
            event.target.value = "";
          }
        }
      );
    }
  }

  async function getMessages() {
    const sessionId = $sessionInstance.id;
    let res = await fetch(`${process.env.BASE_API_URL}/messages/${sessionId}`);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error("Fetch failed");
    }
  }

  async function saveMessage(message) {
    const timestamp = new Date(Date.now());
    const sessionId = $sessionInstance.id;
    const author = JSON.parse($sessionInstance.connection.data).first_name;

    let fetchOptions = {
      headers: {
        "content-type": "application/JSON",
      },
      method: "POST",
      body: JSON.stringify({
        timestamp,
        sessionId,
        message,
        author,
      }),
    };

    let res = await fetch(`${process.env.BASE_API_URL}/message`, fetchOptions);

    if (!res.ok) {
      throw new Error("Fetch failed");
    }
  }
  $: console.log($messages)
</script>

<style>
  .chat-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .scrollable {
    flex: 1 1 auto;
    border-top: 1px solid rgb(156, 151, 151);
    margin: 0 0 0.5em 0;
    overflow-y: auto;
  }
  article {
    margin: 0.5em 0;
  }

  .mine {
    text-align: right;
  }
  .others {
    text-align: left
  }

  p {
    padding: 0.5em 1em;
    display: inline-block;
    margin: 0;
  }
  .others p {
    background-color: #eee;
    border-radius: 1em 1em 1em 0;
    margin-left: 0px;
  }

  .mine p {
    background-color: #0074d9;
    color: white;
    border-radius: 1em 1em 0 1em;
    word-break: break-all;
    text-align: right;
    margin-right: 0px;
  }
</style>

<div class="chat-wrapper">
  <div class="scrollable" bind:this={div}>
    {#if $messages.length > 0}
      {#each $messages as { message, author }}
        <article class={author === $currentUser ? 'mine' : 'others'} transition:slide|local>
          <p>{message}</p>
          <!-- {author} -->
        </article>
      {/each}
    {/if}
  </div>

  <input on:keydown={handleKeydown} />
</div>

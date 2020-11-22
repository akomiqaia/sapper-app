

<script>
  import { goto } from '@sapper/app';
  import {currentUser, currentThinkIn } from "../../../stores/streamStore"
  let code;
  let data
  let name 
  async function handleSubmit() {
    let res = await fetch(`api/thinkin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: $currentThinkIn, code }),
    });
    if (res.ok) {
      let resData = await res.json()
      currentUser.set(resData.userName)
      data = resData
      return resData
    } else {
      throw new Error("Fetch failed");
    }

  }

  $: if (data) {
    goto(`host/thinkin/live/${$currentThinkIn}`)
  }
</script>
<style>
  .code-form{
    display: flex;
    flex-direction: column;
    max-width: 300px;
    height: 300px;
    justify-content: space-evenly;
    margin: 0 auto
  }
</style>
<div class="code-form">

  <label for="code">Enter Thinkin invitation code</label>
  <input required name="code" type="text" bind:value={code} />
  <button on:click={handleSubmit} type="submit">SUBMIT</button>
</div>



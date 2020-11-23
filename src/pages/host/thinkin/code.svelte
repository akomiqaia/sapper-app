<script>
  import { goto, params } from "@sveltech/routify";
  import {currentUser} from "../../../stores/streamStore"
  let code;
  let data

  async function handleSubmit() {
    let res = await fetch(`${process.env.BASE_API_URL}/thinkin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: $params.name, code }),
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


{#if data}
  { $goto('../live/:name', {...$params, ...data})}
{/if}


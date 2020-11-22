<script>
// import { goto } from "@sveltech/routify";


  let start_date;
  let start_time;
  let timestamp;
  let duration;
  let name;
  let moderatorCode
  let publisherCode

  $: timestamp = `${start_date} ${start_time}:00`;
  let message

  async function handleFormSubmit() {
    let fetchOptions = {
      headers: {
        "content-type": "application/JSON",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        timestamp,
        duration,
        moderatorCode,
        publisherCode
      }),
    };
    
    let res = await fetch(`${process.env.BASE_API_URL}/thinkin/create`, fetchOptions);

    if (res.ok) {
      let resData = await res.json()
      message = resData.message
      return resData;
    } else {
      throw new Error("Fetch failed");
    }
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }
  input {
    margin-bottom: 40px;
  }
</style>

<!-- {#if message}
  {message}
  {$goto("../upcoming")}
{/if} -->

<form>
  <label for="thinkin_name">Thinkin Name</label>
  <input required name="thinkin_name" type="text" bind:value={name} />  
  <label for="moderator_code">Moderator Code</label>
  <input required name="moderator_code" type="text" bind:value={moderatorCode} />
  <label for="subcscriber_code">publisher Code</label>
  <input required name="subcscriber_code" type="text" bind:value={publisherCode} />
  <label for="date">Start date</label>
  <input required name="date" type="date" bind:value={start_date} />
  <label for="time">Start time</label>
  <input required name="time" type="time" bind:value={start_time} />
  <label for="duration">Duration in Minutes</label>
  <input required name="duration" type="number" bind:value={duration} />
  <button type="button" on:click={handleFormSubmit}>Submit</button>
</form>

<p>{name}</p>
<p>{moderatorCode}</p>
<p>{start_date}</p>
<p>{start_time}</p>
<p>{duration}</p>

<script>
    import { url } from '@sveltech/routify'

      import {fetchData} from '../helpers'

      let archive_list = fetchData("/archives")

</script>

<h1>completed
  
</h1>

    {#await archive_list then { archives }}
    {#each archives as archive}
    <li>
      <a href={$url(`https://tortoisearchive.s3.eu-west-2.amazonaws.com/46958944/${archive.id}/archive.mp4`)} target="_blank">Archive name - {archive.name}, Duration - {archive.duration} seconds</a>
    </li>
    {/each}
    {/await}
<script>
  import { metatags, url } from "@sveltech/routify";
  metatags.title = "Team Tortoise";
  metatags.description = "Description coming soon...";

  // import {Auth} from 'aws-amplify'
  // function handleGoogleSignIn() {
  //   console.log(Auth.federatedSignIn({provider: "Google"}))
  //   return Auth.federatedSignIn({provider: "Google"})
  // }

</script>

<style>
  h1, h2, p {
    font-family: Pegasus;
  }
  a {
    font-family: FSKoopman;
  }
</style>
<h1>Tortoise Media ThinkIns</h1>

<h2>See all the availble ThinkIns</h2>

<div>
  <div>
    <p>
      Everyone who joins either the Host View or Participant View joins a single
      OpenTok session. Anyone with the Host View open can click Start Archive or
      Stop Archive to control recording of the entire session.
    </p>
  </div>
  <div>
    <!-- this requires more work on it. for some reason amplify is ont giving us google sign in interface -->
    <!-- <button on:click={handleGoogleSignIn}>Sign in With google</button> --> 

    <button> <a href={$url(`/host/thinkin/upcoming`)}>Host View</a> </button>
    <button> <a href={$url(`/guest`)}>Participant View</a> </button>
  </div>
</div>

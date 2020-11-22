<script>
function clickOutside(node) {
  
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

	document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}

export let data
 $: console.log(data)
</script>

<style>

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content li {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.inactive {
  opacity: 50%;
}


</style>

  <div  use:clickOutside on:click_outside class="dropdown-content">
    <li>Spotlight</li>
    <li>{data.hasAudio ? "Mute" : "Unmute"}</li>
    <li class:inactive={!data.hasVideo}>Stop camera</li>
    <li>Flag</li>
    <li>Message</li>
    <li>View profile</li>
    <li>Kick out</li>
  </div>

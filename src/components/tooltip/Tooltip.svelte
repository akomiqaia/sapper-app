<!-- 
  Tooltip component takes one attribute called `className` which will correspond to the style and a position of the tooltip. 
  Classes follow the convention where the first word means where it opens and the second word separated by dash corresponds 
  to the location of the arrow. For example, className "top-right" will open on top of the element and the arrow will be positioned 
  on the right side. If the className does not have the second word included the arrow should be positioned in the middle.

  Current working classeNames: 
      - "top"
      - "top-right"
      - "bottom-right"
      - "bottom-left"
 -->

<script>
  import { fade } from "svelte/transition";

  export let className;

  let visible = false;

  function tooltip(node) {
    node.parentNode.addEventListener("mouseenter", attachTooltip);
    node.parentNode.addEventListener("mouseleave", removeTooltip);

    function attachTooltip() {
      visible = true;
      console.log(node.parentNode);
    }

    function removeTooltip() {
      visible = false;
    }
    return {
      destroy() {
        node.removeEventListener("mouseenter", attachTooltip);
        node.removeEventListener("mouseleave", removeTooltip);
      },
    };
  }
</script>

<style>
  .notVisible {
    display: none;
  }

  .tooltip {
    display: inline-block;
    min-width: 120px;
    padding: 6px 0;
    background-color: white;
    color: var(--midnight);
    text-align: center;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
  }

  .tooltip-top {
    bottom: 120%;
    left: 50%;
    margin-left: -60px;
  }
  .tooltip-bottom-left {
    top: 120%;
    left: 0%;
  }

  .tooltip-bottom-right {
    top: 120%;
    right: 0%;
  }

  .tooltip-top-right {
    bottom: 120%;
    right: 0%;
  }

  .tooltip-bottom-right::after,
  .tooltip-bottom-left::after,
  .tooltip-top::after,
  .tooltip-top-right::after {
    content: "";
    position: absolute;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
  }

  .tooltip-top::after,
  .tooltip-top-right::after {
    top: 100%;
    border-color: white transparent transparent transparent;
  }
  .tooltip-bottom-right::after,
  .tooltip-bottom-left::after {
    bottom: 100%;
    border-color: transparent transparent white transparent;
  }

  .tooltip-bottom-left::after {
    left: 10%;
    transform: translateX(5px); 
  }

  .tooltip-bottom-right::after {
    right: 10%;
    transform: translateX(5px);
  }

  .tooltip-top::after {
    left: 50%;
  }

  .tooltip-top-right::after {
    right: 10%;
    transform: translateX(5px);
  }
</style>

{#key visible}
  <div
    use:tooltip
    class={visible ? `tooltip tooltip-${className}` : 'notVisible'}
    transition:fade>
    <slot />
  </div>
{/key}

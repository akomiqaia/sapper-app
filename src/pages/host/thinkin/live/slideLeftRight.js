import { cubicOut } from "svelte/easing";

  function slideLeftRight(
    node,
    { delay = 0, duration = 400, easing = cubicOut }
  ) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const width = parseFloat(style.width);
    const paddingleft = parseFloat(style.paddingTop);
    const paddingRight = parseFloat(style.paddingRight);
    const marginLeft = parseFloat(style.marginTop);
    const marginRight = parseFloat(style.marginBottom);
    const borderLeftWidth = parseFloat(style.borderLeftWidth);
    const borderRightWidth = parseFloat(style.borderRightWidth);

    return {
      delay,
      duration,
      easing,
      css: (t) =>
        `overflow: hidden;` +
        `opacity: ${Math.min(t * 20, 1) * opacity};` +
        `width: ${t * width}px;` +
        `padding-left: ${t * paddingleft}px;` +
        `padding-right: ${t * paddingRight}px;` +
        `margin-left: ${t * marginLeft}px;` +
        `margin-right: ${t * marginRight}px;` +
        `border-left-width: ${t * borderLeftWidth}px;` +
        `border-right-width: ${t * borderRightWidth}px;`,
    };
  }

  export default slideLeftRight
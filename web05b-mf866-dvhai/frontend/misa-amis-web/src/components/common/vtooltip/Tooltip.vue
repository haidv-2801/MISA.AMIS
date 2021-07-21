<template>
  <div
    class="tooltip"
    @mouseenter="displayTooltip"
    @mouseleave="disableTooltip"
  >
    <slot></slot>
    <span
      class="tooltip__content"
      :style="[
        { left: left },
        { right: right },
        { bottom: bottom },
        { top: top },
      ]"
      style="left: 196px"
      v-show="showTooltip && customData.length > 0"
      >{{ customData }}</span
    >
  </div>
</template>
<script>
export default {
  props: {
    customData: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showTooltip: false,
      left: null,
      right: null,
      bottom: null,
      top: null,
    };
  },
  methods: {
    /**
     * Hàm xác định vị trí tooltip
     * NVTOAN 10/07/2021
     */
    displayTooltip(e) {
      //Lấy tooltip content
      let el = e.target.closest('.tooltip-ver1'),
          elDimension = el.getBoundingClientRect(),
          content = el.querySelector('.tooltip__content'),
          contentDimension = content.getBoundingClientRect(),
          contentLeftPos = elDimension.left + (elDimension.width / 2),
          contentTopPos = elDimension.top + elDimension.height + 2;

      //Xét vị trí cho tooltip
      if(contentLeftPos + contentDimension.width >= window.innerWidth) 
        contentLeftPos = contentLeftPos -  contentDimension.width;
      
      if(contentTopPos + contentDimension.height >= window.innerHeight) 
        contentTopPos = contentTopPos -  contentDimension.height;

      content.style.left = contentLeftPos + "px";
      content.style.top = contentTopPos + "px";
      
      setTimeout(() => {
        this.showTooltip = true;
      }, 0.1);
      setTimeout(() => {
        //Lấy tooltip content
        let tooltipContent = tooltip.querySelector(".tooltip__content");
        let contentSize = tooltipContent.getBoundingClientRect();
        if (e.pageX + contentSize.width + 20 < window.innerWidth) {
          this.left = e.pageX - tooltipSize.x + 20 + "px";
        } else {
          this.right = e.pageX - tooltipSize.x + 10 + "px";
        }
        if (e.pageY + contentSize.height + 10 < window.innerHeight) {
          this.top = e.pageY - tooltipSize.y + 10 + "px";
        } else {
          this.bottom = e.pageY - tooltipSize.y + 10 + "px";
        }
      }, 0.1);
    },
    /**
     * Hàm tắt tooltip
     * NVTOAN 12/07/2021
     */
    disableTooltip() {
      this.showTooltip = false;
      this.left = null;
      this.right = null;
      this.bottom = null;
      this.top = null;
    }
  },
};
</script>
<style scoped>
.tooltip__content {
  height: 28px !important;
  display: flex;
  align-items: center;
  position: fixed;
  white-space: nowrap;
  background: rgb(56, 55, 55);
  padding: 7px;
  z-index: var(--z-index-extraplus);
  color: #fff;
  font-size: 12px;
}
</style>
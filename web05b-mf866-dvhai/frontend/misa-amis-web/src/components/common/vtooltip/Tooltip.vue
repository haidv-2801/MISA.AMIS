<template>
  <div
    class="tooltip-ver1"
    @mousemove="displayTooltip"
    @mouseleave="showTooltip = false"
  >
    <slot></slot>
    <span
      class="tooltip__content"
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
    };
  },
  methods: {
    /**
     * Hàm xác định vị trí tooltip
     * DVHAI 10/07/2021
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
      }, 0);
    },
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

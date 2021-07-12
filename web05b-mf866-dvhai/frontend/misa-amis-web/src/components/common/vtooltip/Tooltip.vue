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
      default: "",
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
      let tooltip = e.target
        .closest(".tooltip-ver1")
        .querySelector(".tooltip__content");
      //Xét vị trí cho tooltip
      tooltip.style.left =
        e.pageX + tooltip.clientWidth + 5 < document.body.clientWidth
          ? e.pageX + 10 + "px"
          : document.body.clientWidth + 5 - 2 * tooltip.clientWidth + "px";
      tooltip.style.top =
        e.pageY + tooltip.clientHeight + 5 < document.body.clientHeight
          ? e.pageY + 5 + "px"
          : document.body.clientHeight + 5 - tooltip.clientHeight + "px";

      setTimeout(() => {
        this.showTooltip = true;
      }, 0);
    },
  },
};
</script>
<style>
.tooltip__content {
  position: fixed;
  white-space: nowrap;
  background: rgb(56, 55, 55);
  padding: 5px;
  z-index: 5000;
  color: #fff;
  font-size: 12px;
}
</style>

<template>
  <div class="tooltip">

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tooltip {
  position: relative;
  --isVisible: visibility;
}

.tooltip[tooltiptext]:hover:after {
  border-radius: 1px;
  font-family: NotosanRegular; 
  visibility: var(--isVisible);
  content: attr(tooltiptext);
  z-index: var(--z-index-extraplus);
  position: absolute;
  width: fit-content;
  white-space: nowrap;
  top: calc(100% + 5px);
  left: 20px;
  color: #fff;
  padding: 5px 6px;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
<template>
    <div class="alert">
      <div class="alert__content">
        <slot name="content">
          <div class="content__icon">
            <slot name="alert__icon"></slot>
          </div>
          <div class="content__text">
            <slot name="alert__text"></slot>
          </div>
        </slot>
      </div>
      <div class="alert__line"></div>
      <div class="alert__foot">
        <slot name="alert__foot"> </slot>
      </div>
    </div>
</template>

<script></script>

<style scoped>
.alert {
  z-index: 4000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: all 0.2s;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 10%);
  background-color: #fff;
  width: 444px;
  height: fit-content;
  border-radius: 3px;
  padding: 32px 32px;
  overflow: hidden;
}

.alert__content {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.content__icon {
  max-width: 48px;
  height: 100%;
}

.content__text {
  flex: 1;
  padding: 12px 0px 0px 16px;
  margin-bottom: 32px;
}

.alert__line {
  height: 1px;
  background-color: #b8bcc3;
  margin-bottom: 20px;
}

.alert__foot {
  width: 100%;
  height: 36px;
}

.icon-48 {
  width: 48px;
  height: 48px;
}
</style>

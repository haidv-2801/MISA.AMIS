<template>
  <transition name="slide">
    <div v-if="isShow" class="toast">
      <div 
      class="toast__icon"
      :class="data.type"
      >

      <!-- icon success -->
        <svg
          v-if="data.type == 'toast--success'"
          data-v-18f96775=""
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          viewBox="0 0 16 16"
          style=""
        >
          <path
            data-v-18f96775=""
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
          ></path>
        </svg>

      <!-- icon info -->
       <svg 
       v-if="data.type == 'toast--info'"
       xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-info" viewBox="0 0 16 16">
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>

        <!-- icon error -->
        <svg 
          v-if="data.type == 'toast--error'"
        xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
          <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
          <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
        </svg>

        <!-- icon warn -->
        <svg 
        v-if="data.type == 'toast--warning'"
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>

      </div>
      <div class="toast__text">
        <p>{{ data.text }}</p>
      </div>
      <div @click="closeToast()" class="toast__close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          style="background-color:white"
          :class="data.type"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      data: {
        type: "toast--default",
        text: "Chưa có tin nhắn",
      },
    };
  },


  created() {},

  methods: {
    openToast(value) {
      let me = this;

      this.data = value;
      this.isShow = true;

      setTimeout(function() {
        me.closeToast();
      }, 3000);
    },

    closeToast() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
/* slide */
.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transition: all 0.3s;
  opacity: 0;
}

@import url("../../assets/css/common/toast.css");
</style>

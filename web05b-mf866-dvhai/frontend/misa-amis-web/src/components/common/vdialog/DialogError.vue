<template>
  <BaseDialog 
  v-if="isShow">
    <template #alert__icon>
      <div class="icon-error icon-48 icon-src"></div>
    </template>
    <template #alert__text>
      <span>{{ message }}</span>
    </template>
    <template #alert__foot>
      <div class="group__button">
        <button @click="cancel()" class="btn btn-h-36 btn-green btn-save-add">
          Đóng
        </button>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "./BaseDialog.vue";

export default {
  name: "DialogError",
  props: {
    data: {
      type: Object,
      default: () => {
        return { propertyName: "", propertyValue: "" };
      },
    },
  },
  components: {
    BaseDialog,
  },
  data() {
    return {
      dataReceive: null,
      //Trạng thái của popup
      isShow: false,
    };
  },
  methods: {
    /**
     * Mở popup
     * DVHAI 07/07/2021
     */
    openPopup(data) {
      this.dataReceive = data;
      this.isShow = true;
      document.querySelector("#overlay").style.zIndex = "3001";
    },

    /**
     * Đóng popup
     * DVHAI 07/07/2021
     */
    closePopup() {
      this.isShow = false;
      document.querySelector("#overlay").style.zIndex = "1000";
    },

    /**
     * Không làm gì cả
     * DVHAI 07/07/2021
     */
    cancel() {
      this.closePopup();
      //alert success
    },
  },

  computed: {
    message() {
      return this.dataReceive.error;
    },
  },
};
</script>

<style scoped>
.icon-error {
  background-position: -24px -954px;
}

.group__button {
  display: flex;
  justify-content: center;
}

.icon-warning {
  background-position: -592px -456px;
}
</style>

<template>
  <BaseDialog v-if="isShow">
    <template #alert__icon>
      <div class="icon-question icon-48 icon-src"></div>
    </template>
    <template #alert__text>
      <span>Dữ liệu đã bị thay đổi, bạn có muốn cất không?</span>
    </template>
    <template #alert__foot>
      <div class="group__button">
        <div class="button_left">
          <button
            @click="cancel()"
            class="btn btn-h-36 btn-size-default btn-border-default bgcolor-fff"
          >
            Hủy
          </button>
        </div>
        <div class="button_right">
          <button
            @click="closeForm()"
            class="btn btn-h-36 btn-size-default btn-border-default bgcolor-fff"
          >
            Không
          </button>
          <button
            @click="saveData()"
            class="btn btn-h-36 btn-green btn-save-add margin-left-8"
          >
            Có
          </button>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue';

export default {
  name: 'DialogConfirmStopTyping',
  props: {
    data: {
      type: Object,
      default: () => {
        return { entityName: 'bản ghi' };
      },
    },
  },
  components: {
    BaseDialog,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    /**
     * Xác nhận cất dữ liệu
     * DVHAI 11/07/2021
     */
    saveData() {
      this.$emit("saveData");
      this.closePopup();
    },

    /**
     * Mở thông báo
     * DVHAI 11/07/2021
     */
    openPopup() {
      this.isShow = true;
      document.querySelector('#overlay').style.zIndex = '3001';
      this.invokeOverlay();
    },

    /**
     * Đóng thông báo
     * DVHAI 11/07/2021
     */
    closePopup() {
      this.isShow = false;
      document.querySelector('#overlay').style.zIndex = '1000';
      this.invokeOverlay();
    },

    /**
     * Không  làm gì
     * DVHAI 11/07/2021
     */
    cancel() {
      this.closePopup();
    },

    /**
     * Đóng form
     * DVHAI 17/06/2021
     */
    closeForm() {
      //close form
      this.$emit('closeForm');

      this.cancel();
    },

    /**
     * Invoke overlay
     * DVHAI 14/06/2021
     */
    invokeOverlay() {
      this.$bus.emit('displayOverlay');
    },
  },
};
</script>

<style scoped>
.margin-left-8 {
  margin-left: 8px;
}

.group__button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-question {
  background-position: -826px -456px;
}

.btn__cancel {
  color: black !important;
  background-color: #f4f4f4 !important;
  cursor: pointer;
  margin-left: 10px;
  padding: 0px 24px;
  text-align: center;
}

.btn__close:hover {
  opacity: 0.9;
}

.btn__close {
  cursor: pointer;
  margin-left: 10px;
  width: 100px;
  text-align: center;
}

.btn__cancel:hover {
  background-color: #e9ebee !important;
}
</style>

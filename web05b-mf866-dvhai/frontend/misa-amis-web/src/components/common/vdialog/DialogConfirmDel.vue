<template>
  <BaseDialog v-if="isShow">
    <template #alert__icon>
      <div class="icon-warning icon-48 icon-src"></div>
    </template>
    <template #alert__text>
      <span>
        {{ message }}
      </span>
    </template>
    <template #alert__foot>
      <div class="group__button">
        <button
          @click="cancel()"
          class="btn btn-h-36 btn-size-default btn-border-default bgcolor-fff"
        >
          Không
        </button>
        <button
          @click="deleteRecord()"
          class="btn btn-h-36 btn-green btn-save-add"
        >
          Có
        </button>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import Resource from '../../../scripts/common/resource';
import BaseDialog from './BaseDialog.vue';

export default {
  name: 'DialogConfirmDel',
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    BaseDialog,
  },
  data() {
    return {
      //Trạng thái của popup
      isShow: false,

      //Mã bản ghi
      entityCode: '',

      //Tên bản ghi
      entityName: '',
    };
  },
  methods: {
    /**
     * Mở popup
     * DVHAI 07/07/2021
     */
    openPopup(entityName, value) {
      this.isShow = true;
      this.entityCode = `<${value}>`;
      this.entityName = entityName;
      this.invokeOverlay();
    },

    /**
     * Đóng popup
     * DVHAI 07/07/2021
     */
    closePopup() {
      this.isShow = false;

      this.invokeOverlay();
    },

    /**
     * Không làm gì cả
     * DVHAI 07/07/2021
     */
    cancel() {
      this.closePopup();
      //alert success
    },

    /**
     * Delete record
     * DVHAI 07/07/2021
     */
    deleteRecord() {
      this.$emit('deleteRecord');
      this.closePopup();
    },

    /**
     * Gọi lớp phủ
     * DVHAI 07/07/2021
     */
    invokeOverlay() {
      this.$bus.emit('invokeOverlay');
    },
  },

  computed: {
    //Thông báo hiện thị
    message() {
      return Resource.MsgQuestion.MsgConfirmDelete.format(
        this.entityName,
        this.entityCode
      );
    },
  },
};
</script>

<style scoped>
.group__button {
  display: flex;
  justify-content: space-between;
}

.icon-warning {
  background-position: -592px -456px;
}

.btn__cancel {
  color: black !important;
  background-color: #f4f4f4 !important;
}

.btn__delete {
  background-color: #f65454 !important;
}

.btn__delete:hover {
  opacity: 0.9;
}

.btn__delete,
.btn__cancel {
  cursor: pointer;
  margin-left: 10px;
  width: 100px;
  text-align: center;
}

.btn__cancel:hover {
  background-color: #e9ebee !important;
}
</style>

<template>
  <div class="main__toolbar">
    <div class="toolbar__left title">
      Nhân viên
    </div>
    <div class="toolbar__right">
      <button
        @click="openFormEmployeeDetail()"
        class="btn btn__add btn-green"
        title="Thêm mới"
        tabindex="3"
      >
        <span>Thêm mới nhân viên</span>
      </button>
    </div>
  </div>
</template>

<script scoped>
import Enumeration from "../../../scripts/common/enumeration";
export default {
  name: "ToolBar",
  data() {
    return {};
  },
  methods: {
    /**
     * Mở form chi tiết
     * DVHAI 07/07/2021
     */
    openFormEmployeeDetail() {
      //Thể loại form
      this.$store.commit("SET_FORMMODE", Enumeration.FormMode.Add);
      this.$emit("openFormEmployeeDetail");
    },

    /**
     * Open confirm popup
     * DVHAI 17/06/2021
     */
    openPopup() {
      this.$emit("openPopup");
    },
  },
};
</script>

<style scoped>
/* toolbar css */
.main__toolbar {
  margin-top: 14px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar__right {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 24px;
  font-weight: 700;
  font-family: NotosanBold;
}

.btn__add {
  height: 36px;
  padding: 8px 20px;
  font-weight: 600;
}
</style>

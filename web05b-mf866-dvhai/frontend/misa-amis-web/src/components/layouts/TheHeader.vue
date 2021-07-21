<template>
  <div class="header">
    <div class="header__region">
      <div
        v-if="isCollapsedSidebar == false"
        @click="changeSidebarState()"
        tooltiptext="Thu/Phóng"
        class="region__icon--toggle icon-toggle tooltip"
      ></div>
      <div class="region__dropdown">
        <div class="dropdown__title">
          CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
        </div>
        <div class="region__icon--toggle icon-arrow-down"></div>
      </div>
    </div>

    <!-- header right -->
    <div class="header__right">
      <!-- icon bell -->
      <div tooltiptext="Thông báo" class="icon icon-bell tooltip"></div>
      <div tooltiptext="Người dùng" class="icon icon-user  tooltip"></div>
      <div class="right__item header_username">
        Đỗ Văn Hải
      </div>
      <!-- icon arrow down -->
      <Tooltip :customData="'Xem thêm'">
        <div class="icon icon-chervon-down"></div>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import {
  GET_TOGGLESIDEBAR,
  SET_TOGGLESIDEBAR,
} from '../../store/mutation-types';

import Tooltip from '@/components/common/vtooltip/Tooltip';

export default {
  name: 'Header',
  components: {
    Tooltip,
  },
  methods: {
    /**
     * Hàm thay đổi trạng thái của sidebar
     * DVHAI 05/07/2021
     */
    changeSidebarState() {
      this.$store.commit(SET_TOGGLESIDEBAR);
    },
  },
  computed: {
    /**
     * Lấy trạng thái sidebar từ store
     * DVHAI 06/07/2021
     */
    isCollapsedSidebar() {
      return this.$store.getters[GET_TOGGLESIDEBAR];
    },
  },
};
</script>

<style scoped>
@import url('../../assets/css/common/header.css');
</style>

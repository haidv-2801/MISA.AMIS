<template>
  <div class="sidebar" :class="{ sidebar_state: isCollapsed }">
    <!-- toggle logo -->
    <div
      @click="changeSidebarState()"
      v-show="isCollapsed"
      class="nav__icon--toggle"
    >
    <Tooltip :customData="'Thu/Phóng'">
      <div class="icon icon-toggle-white"></div>
    </Tooltip>
    </div>

    <!--app logo -->
    <div v-show="!isCollapsed" class="sidebar__logo">
      <!-- logo -->
      <div tooltiptext="Ứng dụng" class="nav__toggle nav__iconapp tooltip">
        <!-- background here -->
      </div>
      <div :tooltiptext="'MISA logo'" class="nav__logo tooltip">
        <!-- background here -->
      </div>
    </div>

    <!-- navbar -->
    <div class="nav">
      <div
        v-for="(item, index) in data"
        :key="index"
        :class="{
          'sidebar__row--hover':
            curHoverItem == index && curSelectedItem != index,
          'sidebar__row--active': curSelectedItem == index,
        }"
        @click="evtRowClick(index, $event)"
        @mouseover="evtMouseOver(index)"
        @mouseout="evtMouseOut()"
      >
        <router-link class="nav__item" :to="item.link">
          <Tooltip :customData="item.text">
            <div class="item__icon">
              <div
                v-if="curSelectedItem == index"
                class="icon"
                :class="item.icon + '-active'"
              ></div>
              <div v-else class="icon" :class="item.icon"></div>
            </div>
          </Tooltip>
          <div v-show="!isCollapsed">{{ item.text }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/common/vtooltip/Tooltip'
import { GET_TOGGLESIDEBAR, SET_TOGGLESIDEBAR } from '../../store/mutation-types.js'

export default {
  name: 'Sidebar',
  components: {
    Tooltip,
  },
  data() {
    return {
      curHoverItem: -1,
      curSelectedItem: -1,
    };
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },

  methods: {
    /**
     * Hàm thay đổi trạng thái của sidebar
     * DVHAI 05/07/2021
     */
    changeSidebarState() {
      this.$store.commit(SET_TOGGLESIDEBAR);
    },

    /**
     * Gán index của dòng đang click cho curSelectedItem
     * DVHAI 05/07/2021
     */
    evtRowClick(index) {
      this.curSelectedItem = index;
    },

    /**
     * Gán index = -1
     * để bỏ hover color
     * DVHAI 05/07/2021
     */
    evtMouseOut() {
      this.curHoverItem = -1;
    },

    /**
     * Gán index của dòng đang có mouseover
     * cho curHoverItem
     * DVHAI 05/07/2021
     */
    evtMouseOver(index) {
      this.curHoverItem = index;
    },
  },
  computed: {
    isCollapsed() {
      return this.$store.getters[GET_TOGGLESIDEBAR];
    },
  },
  watch: {
    //tracking router and select
    $route(to) {
      let index = this.data.map((x) => x.link).indexOf(to.path);
      this.curSelectedItem = index;
    },
  },
};
</script>

<style scoped>
@import url('../../assets/css/common/sidebar.css');
</style>

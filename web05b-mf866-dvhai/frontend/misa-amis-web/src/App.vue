<template>
  <div id="app">
    <!-- loader -->
    <div v-show="displayLoader" id="loading">
      <Loader />
    </div>

    <!-- overlay -->
    <div id="overlay" v-show="displayOverlay"></div>

    <!-- toast msg -->
    <div class="toast-list">
      <Toast ref="Toast" />
    </div>

    <!-- sidebar -->
    <Sidebar :data="navItems" />

    <!-- content -->
    <div class="content">
      <!-- header -->
      <Header />

      <!-- main -->
      <Main />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/layouts/TheSidebar.vue";
import Header from "./components/layouts/TheHeader.vue";
import Main from "./components/layouts/TheMain.vue";
import Toast from "../src/components/common/Toast.vue";
import Loader from "../src/components/common/Loader"

export default {
  name: "App",
  created() {
    // lắng nghe sự kiện bật overlay
    this.$bus.on("invokeOverlay", () => {
      this.displayOverlay = !this.displayOverlay;
    });

    //lắng nghe sự kiện bật toast
    this.$bus.on("openToast", (value) => {
      this.$refs.Toast.openToast({ ...value });
    });
  },
  data() {
    return {
      navItems: [
        { icon: "icon-overview", link:"/overview", text: "Tổng quan" },
        { icon: "icon-cash", link:"/report", text: "Tiền mặt" },
        { icon: "icon-bankdeposite", link:"/product", text: "Tiền gửi" },
        { icon: "icon-shopping-bag", link:"/employee", text: "Mua hàng" },
        { icon: "icon-shopping-cart", link:"/customer", text: "Bán hàng" },
        { icon: "icon-invoice", link:"/setting", text: "Quản lý hóa đơn" },
        { icon: "icon-warehouse", link:"/setting", text: "Kho" },
        { icon: "icon-tool", link:"/setting", text: "Công cụ dụng cụ" },
        { icon: "icon-asset", link:"/setting", text: "Tài sản cố định" },
        { icon: "icon-tax", link:"/setting", text: "Thuế" },
        { icon: "icon-price", link:"/setting", text: "Giá thành" },
        { icon: "icon-common", link:"/setting", text: "Tổng hợp" },
        { icon: "icon-budget", link:"/setting", text: "Ngân sách" },
        { icon: "icon-report", link:"/setting", text: "Báo cáo" },
        { icon: "icon-stock", link:"/setting", text: "Phân tích tài chính" },
      ],
      displayOverlay: false,
      // displayLoader: false,
    };
  },
  components: {
    Sidebar,
    Header,
    Main,
    Toast,
    Loader
  },
  methods: {},
  computed:{
    displayLoader() {
      return this.$store.state.loaderEngine;
    }
  }
};
</script>

<style>
#app {
  display: flex;
  width: 100%;
  height: 100vh;
}

/* content css */
.content {
  background-color: white;
  flex-direction: column;
  flex: 1;
  display: flex;
  width: calc(100vw - var(--size-sidebar-width));
  height: 100%;
}

@import url("./assets/css/common/common.css");
@import url("./assets/css/common/tooltip.css");
</style>

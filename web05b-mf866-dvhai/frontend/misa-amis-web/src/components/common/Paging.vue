<template>
  <div id="pagination" class="main__pagination">
    <div class="pagi__left">
      <span class="total-page">
        Tổng số: <b>{{ this.currentTotalRecord }}</b> bản ghi
      </span>
    </div>
    <div class="pagi__right">
      <div class="page-size">
        <DropdownNormal @filterTable="filterTable" tabindex="0" />
      </div>
      <div class="page-number">
        <!-- Chọn trang trước -->
        <div
          :class="{
            disable: currentPageNumber == 1 || currentTotalRecord == 0,
          }"
          @click="prePage()"
          class="page-first cursor-pointer"
        >
          Trước
        </div>

        <!-- Trang đầu -->
        <div
          v-if="currentTotalPage > currentMaximumPage"
          class="btn-page-index cursor-pointer"
          @click="btnClick(lowerBoundPage)"
          :class="{ pageSelected: currentPageNumber == lowerBoundPage }"
        >
          {{ lowerBoundPage }}
        </div>

        <!-- Dấu 3 chấm -->
        <div
          v-if="dotLeftVisivle"
          class="btn-page-index cursor-default"
        >
          ...
        </div>

        <!-- Các trang trong phân đoạn -->
        <div
          v-for="(item, index) in listPages"
          :key="index"
          class="btn-page-index cursor-pointer"
          :class="{ pageSelected: currentPageNumber == item }"
          @click="btnClick(item)"
        >
          {{ item }}
        </div>

        <!-- Dấu 3 chấm -->
        <div
          v-if="dotRightVisivle"
          class="btn-page-index cursor-default"
        >
          ...
        </div>

        <!-- Trang cuối -->
        <div
          v-if="currentTotalPage > currentMaximumPage"
          class="btn-page-index cursor-pointer"
          @click="btnClick(upperBoundPage)"
          :class="{ pageSelected: currentPageNumber == upperBoundPage }"
        >
          {{ upperBoundPage }}
        </div>

        <!-- Chọn trang sau -->
        <div
          :class="{
            disable:
              currentPageNumber == currentTotalPage || currentTotalRecord == 0,
          }"
          @click="nextPage()"
          class="page-last cursor-pointer"
        >
          Sau
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownNormal from '../common/vcombobox/DropdownNormal.vue';
import {mapGetters} from 'vuex'
import * as mut from '../../store/mutation-types';

export default {
  name: 'Paging',
  components: {
    DropdownNormal,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    /**
     * Lọc lại dữ liêu
     * DVHAI 10/07/2021
     */
    filterTable() {
      this.$emit('filterTable');
    },

    /**
     * Chọn số trang
     * DVHAI 10/07/2021
     */
    btnClick(index) {
      if (this.currentPageNumber != index) {
        this.$store.commit(mut.SET_LOADER, true);
        this.$store.commit(mut.SET_PAGENUMBER, index);
        this.filterTable();
      }
    },

    /**
     * Chọn trang trước
     * DVHAI 10/07/2021
     */
    prePage() {
      if (this.currentPageNumber > 1) {
        this.$store.commit(mut.SET_PAGENUMBER, this.currentPageNumber - 1);
        this.filterTable();
      }
    },

    /**
     * Chọn trang tiếp theo
     * DVHAI 10/07/2021
     */
    nextPage() {
      if (this.currentPageNumber < this.currentTotalPage) {
        this.$store.commit(mut.SET_PAGENUMBER, this.currentPageNumber + 1);
        this.filterTable();
      }
    },

    /**
     * Tạo một mảng từ l đến r
     * DVHAI 10/07/2021
     */
    makeArray(l, r) {
      let arr = [];
      for (let i = l; i <= r; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  computed: {
    ...mapGetters({
      currentTotalRecord: mut.GET_TOTALRECORD,
      currentPageNumber: mut.GET_PAGENUMBER,
      currentPageSize: mut.GET_PAGESIZE,
      currentTotalPage: mut.GET_TOTALPAGE,
      currentMaximumPage: mut.GET_MAXIMUMPAGE
    }),

    //Hiển thị ba dấu chấm trái
    dotLeftVisivle() {
        return this.currentPageNumber - (this.currentMaximumPage - 1) > 0 && this.currentTotalPage > this.currentMaximumPage;
    },

    //Hiển thị ba dấu chấm phải
    dotRightVisivle() {
      return (this.currentPageNumber + this.listPages.length < this.currentTotalPage) 
      || (this.currentPageNumber < this.currentMaximumPage && this.currentPageNumber + this.currentMaximumPage - 1 >= this.currentTotalPage 
      && this.currentMaximumPage <= this.currentTotalPage);
    },

    //list page number
    listPages() {
      let lPage = [],
        totalPage = this.currentTotalPage;

      //Nếu tổng số trang nhở hơn max5
      if (totalPage <= this.currentMaximumPage) {
        lPage = this.makeArray(this.lowerBoundPage, this.upperBoundPage);
      } //Ngược lại
      else {
        if (this.currentPageNumber < this.currentMaximumPage) {
          lPage = this.makeArray(2, this.currentMaximumPage - 1);
        } else if (
          this.currentPageNumber <= this.currentTotalPage &&
          this.currentPageNumber >=
            this.currentTotalPage - this.currentMaximumPage + 2
        ) {
          lPage = this.makeArray(
            this.currentTotalPage - (this.currentMaximumPage - 2),
            this.currentTotalPage - 1
          );
        } else {
          lPage = this.makeArray(
            this.currentPageNumber - 1,
            this.currentPageNumber + 1
          );
        }
      }
      return lPage;
    },

    //Giá trị chặn đưới của phân đoạn trang
    lowerBoundPage() {
      return 1;
    },

    //Giá trị chặn trên của phân đoạn trang
    upperBoundPage() {
      let ubDefault = 0,
        totalPage = this.currentTotalPage,
        maxmimum = this.currentMaximumPage;

      //Nếu tổng số tran nhở hơn max5
      if (totalPage <= maxmimum) {
        ubDefault = Math.min(totalPage, maxmimum);
      } else {
        //Ngược lại
        ubDefault = totalPage;
      }

      return ubDefault;
    },
  },
  watch: {
    //tracking props data and clone to a new one
    data: {
      deep: true,
      handler: function() {
        this.pagination = JSON.parse(JSON.stringify(this.data));
      },
    },
  },
};
</script>

<style scoped>
.main__pagination {
  padding-right: 75px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagi__left {
  display: block;
}

.total-page {
  font-weight: 400;
  display: block;
}

.pagi__right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-size {
  margin: 0px 16px;
  display: block;
}

.page-number {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-page-index {
  justify-content: center;
  display: flex;
  min-width: 23px;
  height: 20px;
  align-items: center;
}

.pageSelected {
  border: 1px solid #e0e0e0;
  font-weight: 700;
}

.page-last {
  margin-left: 13px;
}

.page-first {
  margin-right: 13px;
}

.disable {
  pointer-events: none;
  color: #9e9e9e;
}
</style>

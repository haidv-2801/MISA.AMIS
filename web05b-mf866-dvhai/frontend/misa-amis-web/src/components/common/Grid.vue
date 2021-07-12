<template>
  <div class="grid">
    <!-- Bảng dữ liệu -->
    <div class="main__grid">
      <table>
        <thead>
          <tr>
            <!-- checkbox -->
            <td class="tickbox-40" :style="{ 'z-index': data.data.length + 2 }">
              <div
                @click="checkRow(-1)"
                :class="{ 'icon-checkbox-active': curChecked == -1 }"
                class="tick-box icon-18 icon"
              ></div>
            </td>
            <!-- Các cột còn lại -->
            <td
              :style="{ 'z-index': data.data.length + 1 }"
              v-for="(item, index) in data.column"
              :key="index"
              :class="{
                'align-right': item.dataType == Resource.DataTypeColumn.Number,
                'align-center': item.dataType == Resource.DataTypeColumn.Date,
              }"
            >
              {{ item.displayName }}
            </td>

            <!-- Cột chức năng -->
            <td
              :style="{ 'z-index': data.data.length + 1 }"
              class="utility align-center"
            >
              Chức năng
            </td>
          </tr>
        </thead>
        <!-- vc -->
        <tbody :class="{ 'no-data': data.data.length == 0 }">
          <!-- Ảnh không có dữ liệu -->
          <div v-if="data.data.length == 0" class="no-data-wrapper">
            <img src="../../assets/img/nodata.svg" alt="Không có dữ liệu" />
            <span>Không có dữ liệu</span>
          </div>
          <tr
            v-for="(item, index) in data.data"
            :key="index"
            :class="{
              active: curSelected == index,
              hover: itemHover == index,
            }"
            @click="selectRow(index)"
            @mouseover="itemHover = index"
          >
            <!-- checkbox -->
            <td
              :class="{
                active: curSelected == index,
                hover: itemHover == index,
              }"
              class="tickbox-40 tickbox-background"
            >
              <div
                @click="checkRow(index)"
                :class="{
                  'icon-checkbox-active':
                    curChecked == -1 || curChecked == index,
                }"
                class="tick-box icon-18 icon"
              ></div>
            </td>

            <!-- Các cột còn lại -->
            <td
              v-for="(column, index) in data.column"
              @dblclick="openFormDetail(item, Enumeration.FormMode.Edit)"
              :key="index"
              :class="{
                'align-right':
                  column.dataType == Resource.DataTypeColumn.Number,
                'align-center': column.dataType == Resource.DataTypeColumn.Date,
              }"
              :title="item[column.fieldName]"
            >
              {{
                formatValue(
                  item[column.fieldName],
                  column.dataType,
                  column.displayType
                )
              }}
            </td>

            <!-- Chức năng -->
            <td
              :style="{
                'z-index': utilityFlow ? index : data.data.length - index,
              }"
              :class="{
                active: curSelected == index,
                hover: itemHover == index,
              }"
              class="utility tickbox-background"
            >
              <div
                @click="openFormDetail(item, Enumeration.FormMode.Edit)"
                class="utility-text"
              >
                <span>Sửa</span>
              </div>
              <div tabindex="0" @blur="closeDropdown()" class="u-option-wrap">
                <div
                  :class="{ 'utility-icon-active': selectedOption == index }"
                  class="utility-icon"
                  @click="selectOption(index, $event)"
                >
                  <div class="icon icon-16 icon-arrowdown-blue"></div>
                </div>

                <!-- utility options -->
                <transition name="slide-fade">
                  <div
                    v-if="selectedOption == index"
                    class="u-options"
                    :style="[utilityFlow ? { top: uOptionsHeight } : {}]"
                  >
                    <div
                      @click="
                        openFormDetail(item, Enumeration.FormMode.Duplicate)
                      "
                      class="u-option-item"
                    >
                      Nhân bản
                    </div>
                    <div class="u-option-item" @click="openConfirmDelete(item)">
                      Xóa
                    </div>
                    <div class="u-option-item">Ngừng sử dụng</div>
                  </div>
                </transition>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Phân trang -->
    <div class="grid__paging">
      <Paging
        :data="gridData.pagination"
        @filterTable="filterTable"
        @changePageNumber="changePageNumber"
        @changePageSize="changePageSize"
      />
    </div>
  </div>
</template>

<script>
import Resource from '../../scripts/common/resource.js';
import Enumeration from '../../scripts/common/enumeration.js';
import CommonFn from '../../scripts/common/common.js';
import Paging from '../../components/common/Paging.vue';

export default {
  name: 'Grid',
  props: {
    gridData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Paging,
  },
  data() {
    return {
      // Tạo bản sao được truyền từ ngoài  vào
      data: JSON.parse(JSON.stringify(this.gridData)),

      //Sử dụng các tiện ích tự viết
      CommonFn: CommonFn,
      Enumeration: Enumeration,
      Resource: Resource,

      //Lưu những dòng được chọn
      multiSelectList: [],

      //Lưu vị trí dòng được tích
      curChecked: null,

      //Lưu vị trí dòng được select
      curSelected: -1,

      //Vị trí index được hover
      itemHover: -1,

      //Lưu vị trí của dropdown chức năng của từng dòng
      selectedOption: -1,

      //Đánh dấu xem dropdown có tràn không
      utilityFlow: false,

      //Chiều cao của dropdown
      uOptionsHeight: '20px',
    };
  },

  created() {
    this.data = this.gridData;
  },
  computed: {},
  methods: {
    /**
     * Lọc dữ liêu
     * DVHAI 06/07/2021
     */
    filterTable() {
      this.$emit('filterTable');
    },
    /**
     * Xóa bản ghi
     * DVHAI 06/07/2021
     */
    openFormDetail(item, formMode) {
      //Thể loại form
      this.$store.commit('SET_FORMMODE', formMode);

      this.$emit('openFormDetail', item);
    },

    /**
     * Xóa bản ghi
     * DVHAI 06/07/2021
     */
    openConfirmDelete(item) {
      this.$store.commit('SET_ENTITY', item);
      this.$emit('openConfirmDelete', item);
    },

    /**
     * Đóng dropdown đang mở
     * DVHAI 06/07/2021
     */
    closeDropdown() {
      this.selectedOption = -1;
    },

    /**
     * Lưu vị trí dòng của chức năng được chọn dùng để show dropdown chức năng
     * DVHAI 06/07/2021
     */
    selectOption(index, event) {
      if (this.selectedOption == index) {
        this.closeDropdown();
      } else {
        this.selectedOption = index;
        this.utilityFlow = false;
        this.handleOverlowUtility(event);
      }
    },

    /**
     * Sử lí tràn dropdown chức năng, nếu tràn thì dropup
     * DVHAI 05/07/2021
     */
    handleOverlowUtility(event) {
      // điểm check tràn
      var bottomCheckPoint = document
        .getElementById('pagination')
        .getBoundingClientRect().top;
      // var bottomCheckPoint = window.screen.height;
      var parent = event.target.closest('.u-option-wrap');
      setTimeout(() => {
        parent.focus();
        var childrenBounding = parent
            .querySelector('.u-options')
            .getBoundingClientRect(),
          childHeight = childrenBounding.height,
          childTop = childrenBounding.top,
          bottom = childTop + childHeight;
        if (bottom >= bottomCheckPoint) {
          this.uOptionsHeight = -(childHeight + 7) + 'px';
          this.utilityFlow = true;
        }
      }, 0.2);
    },

    /**
     * Thực hiện tích ô trong bảng
     * DVHAI 09/07/2021
     */
    checkRow(index) {
      if (this.curChecked != index) this.curChecked = index;
      else this.curChecked = null;
    },

    /**
     * Thực hiện chọn dòng trong bảng
     * DVHAI 05/07/2021
     */
    selectRow(index) {
      this.curSelected = index;
    },

    /**
     * Chọn nhiều dòng bằng cách dữ ctrl+click
     * DVHAI 05/07/2021
     */
    multiSelectRow(index) {
      if (!this.multiSelectList.includes(index))
        this.multiSelectList.push(index);
      else {
        if (this.multiSelectList.length > 1) {
          let realIndex = this.multiSelectList.indexOf(index);
          this.multiSelectList.splice(realIndex, 1);
        }
      }
    },

    /**
     * Lấy những dòng được chọn
     * DVHAI 05/07/2021
     */
    getSelectedRow() {
      return this.multiSelectList;
    },

    /**
     * Định dạng lại dữ liệu trước khi hiển thị ra bảng
     * DVHAI 05/07/2021
     */
    formatValue(data, dataType, dataDisplayType) {
      let formattedData = data;

      if (dataType) {
        switch (dataType) {
          case this.Resource.DataTypeColumn.Number:
            if (dataDisplayType == 'Money')
              formattedData = this.CommonFn.formatMoney(formattedData);
            break;
          case this.Resource.DataTypeColumn.Date:
            formattedData = this.CommonFn.formatDate(formattedData);
            break;
          case this.Resource.DataTypeColumn.Enum:
            if (dataDisplayType == 'Gender')
              formattedData = this.CommonFn.getValueEnum(
                formattedData,
                dataDisplayType
              );

            if (dataDisplayType == 'WorkStatus')
              formattedData = this.CommonFn.getValueEnum(
                formattedData,
                dataDisplayType
              );

            break;
        }
      }
      return formattedData;
    },

    /**
     * Thay đổi trang hiện tại
     * DVHAI 05/07/2021
     */
    changePageNumber(value) {
      this.$emit('changePageNumber', value);
    },

    /**
     * Thay đổi số bản ghi trong 1 trang
     * DVHAI 05/07/2021
     */
    changePageSize(value) {
      this.$emit('changePageSize', value);
    },
  },
  watch: {},
};
</script>

<style scoped>
.no-data-wrapper {
  flex-direction: column;
  justify-content: center;
  display: flex;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  position: absolute;
  align-items: center;
}

.no-data {
  height: 200px;
  position: relative;
}

table img {
  width: 132px;
  margin-bottom: 20px;
}

.grid__paging {
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  top: 0;
  background-color: #fff;
}

.u-options {
  z-index: 1000;
  position: fixed;
  top: 0;
  outline: none;
}
.active {
  background-color: #f8f8f8 !important;
}

.hover {
  background-color: #f3f8f8 !important;
}

.main__grid {
  position: relative;
  overflow: auto;
  width: 100%;
  max-height: calc(100vh - 242px);
}

.align-right {
  text-align: right;
}

.align-center {
  text-align: center;
}

table tbody td {
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 250px;
  height: 47px;
  padding: 5px 10px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
}

table tbody td:not(td.tickbox-40, td.utility) {
  cursor: default;
  min-width: 125px;
  overflow: hidden;
}

table tbody td:last-child:not(td.utility) {
  border-right: none;
  border-top: none;
}

/* i */
table {
  width: 100%;
  border-spacing: 0;
  /* border-collapse: collapse; */
}

table tbody tr {
  cursor: pointer;
  height: 47px;
}

table thead tr {
  background-color: var(--color-main-background);
}

table thead td {
  cursor: pointer;
  height: 34px;
  line-height: 34px;
  position: sticky;
  position: -webkit-sticky;
  text-transform: uppercase;
  background-color: #eceef1;
  top: 0;
  font-size: 12px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
  white-space: nowrap;
  padding: 0 10px;
  text-align: left;
  max-width: 250px;
  font-weight: 700;
  font-family: NotosanBold;
}

.utility {
  position: sticky;
  position: -webkit-sticky;
  right: 0;
  width: 120px;
  z-index: 0;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid #c7c7c7;
  border-left: 1px dotted #c7c7c7;
}

th.utility {
  text-align: center;
}

.utility-text {
  width: 25px;
  display: flex;
  flex-basis: 45px;
  justify-content: center;
}

.utility-text:active span {
  border: 1px solid rgb(0, 117, 192);
}

.utility-icon-active {
  border: 1px solid rgb(0, 117, 192);
}

.utility-icon {
  justify-content: center;
  display: flex;
  height: 16px;
  width: 26px;
}

.utility-icon:active {
  border: 1px solid rgb(0, 117, 192);
}

tbody td.utility {
  display: flex;
  justify-content: center;
  align-items: center;
}

.utility:not(thead td) .utility-text {
  color: rgb(0, 117, 192);
  font-family: NotosanSemibold;
  font-weight: 600;
  text-align: center;
}

.grid {
  padding: 0px 16px 0px 16px;
}

.icon-checkbox-active {
  background-position: -1224px -361px;
}

.icon-arrowdown-blue {
  background-position: -896px -360px;
}

.tickbox-background {
  background-color: #fff;
}

/* utility */
.u-option-wrap {
  position: relative;
  display: inline-block;
  outline: none;
}

.u-options {
  background-color: #fff;
  position: absolute;
  padding: 2px 1px;
  border-radius: 2px;
  border: 1px solid #babec5;
  max-width: 120px;
  left: -80px;
  top: var(--size-top);
  /* top: 20px; */
}

.u-option-item {
  text-overflow: ellipsis;
  padding: 5px 10px;
  white-space: nowrap;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  font-weight: 400 !important;
}

.u-option-item:hover {
  background-color: #e8e9ec;
  color: #08bf1e;
}
</style>

<template>
  <div class="group-gender">
    <div v-for="(item, index) in listData" :key="index" class="gender-item">
      <div
        @click="checkRadio(index)"
        class="item-radio"
        :class="{ 'radio-border-active': cloneModel == index }"
      >
        <div
          :class="{ 'radio-active': cloneModel == index }"
          class="radio"
        ></div>
      </div>
      <div class="item-text">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import CommonFn from '../../../scripts/common/common'
export default {
  name: "RadioButtonMaster",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    model: {
      default: "",
    },
    styleObject: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    // this.cloneModel = this.model;
  },
  data() {
    return {
      //Lấy giá trị lần đầu
      visited: false,

      //Tạo bảo sao
      cloneModel: JSON.parse(JSON.stringify(this.model)),
    };
  },
  methods: {
    /**
     * Thực hiện check radiobutton được chọn
     * DVHAI 06/07/2021
     */
    checkRadio(index) {
      if(this.visited == false) {
        this.visited = true;
        // console.log(CommonFn.hash(this.cloneModel))
        this.$bus.emit('updateOriginModel', this.data.data.inputId, CommonFn.hash(this.cloneModel))
      }
      this.cloneModel = index;
    },
  },
  computed: {
    //Danh sách các radiobutton
    listData() {
      return this.data.data.items;
    },
  },
  watch: {
    /**
     * Thay đổi giá trị của model ở bên ngoài cha
     * DVHAI 06/07/2021
     */
    cloneModel() {
      //Theo dõi giá trị bản sao và thay đổi giá trị thật bên ngoài
      this.$emit("changeValueInput", this.data.data.inputId, this.cloneModel);
    },
    /**
     * Tạo bản sao model mới
     * DVHAI 06/07/2021
     */
    model() {
      this.cloneModel = JSON.parse(JSON.stringify(this.model));
    },
  },
};
</script>

<style scroped>
.group-gender {
  height: 32px;
  display: flex;
  align-items: center;
}
.radio {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: transparent;
}
.gender-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.gender-item:last-child {
  margin-right: 0;
}
.item-text {
  padding-left: 10px;
}
.item-radio {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #babec5;
}
.radio-active {
  background-color: #2ca01c;
}
.radio-border-active {
  border: 1px solid #2ca01c;
}
</style>

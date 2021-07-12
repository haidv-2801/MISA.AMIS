<template>
  <div 
    class="dropdown dropdown__key left__item"
    :style="styleObject"
  >
    <!-- dropdown head -->
    <div 
    tabindex="2" 
    class="dropdown-box" 
    :class="{ focus: isShow}"
    @focus="addInputOutlineColor($event)"
    @blur="removeInputOutlineColor($event)"
    >
      <span class="flex-1" @click="isShow = !isShow">{{ txtTitle }}</span>

      <span class="group-icon">
        <span 
        v-show="visibleClearIcon"
        @click="resetTitle()" 
        class="box__icon icon-textclear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>

        <span
          class="icon-arrowdown"
          @click="isShow = !isShow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
            :class="{'rotate-180': isShow}"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
      </span>
    </div>

    <!-- dropdown item -->
    <transition name="slide">
      <div class="dropdown__items" v-show="isShow">
        <div
          class="dropdown__row"
          :class="{
            'dropdown__row--hover': curHoverItem == i,
            active: curSelectedItem == i,
          }"
          v-for="(item, i) in data.items"
          :key="i"
          @click="evtRowClick(i)"
          @mouseover="evtMouseOver(i)"
          @mouseout="evtMouseOut()"
        >
          <div class="svg__box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              viewBox="0 0 16 16"
              v-show="curSelectedItem == i"
            >
              <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              ></path>
            </svg>
          </div>
          <span>{{ item }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    data: {
      type: [Object, Array],
    },
    styleObject: {
      type: Object,
      default: ()=>{}
    },
    model: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      isShow: false,
      curHoverItem: -1,
      curSelectedItem: -1,
      txtTitle: this.data.title,
      visibleClearIcon: false,
      cloneModel: 0
    };
  },
  created() {
    
  },
  methods: {
   
    /**
     * Row click
     * DVHAI 12/06/2021
     */
    evtRowClick(index) {
      this.curSelectedItem = index;

      //open dropdown items
      this.closeDropdown();

      //bind data to title
      if(this.curSelectedItem != null && this.curSelectedItem >= 0)
        this.txtTitle = this.data.items[this.curSelectedItem];

      //show clear icon
      this.visibleClearIcon = true;

      //clear hover
      this.evtMouseOut();
    },

    /**
     * Reset current hovered item
     * DVHAI 12/06/2021
     */
    evtMouseOut() {
      this.curHoverItem = -1;
    },

    /**
     * Gán index của dòng đang có mouseover
     * cho curHoverItem
     * DVHAI 12/06/2021
     */
    evtMouseOver(index) {
      this.curHoverItem = index;
    },

    /**
     * Default dropdown title
     * DVHAI 12/06/2021
     */
    resetTitle() {
      this.txtTitle = this.data.title;
      
      //unchecked item
      this.curSelectedItem = null;

      //close dropdown
      this.closeDropdown();

      //hide clear icon
      this.visibleClearIcon = false;
    },

    /**
     * Show list item dropdown
     * DVHAI 12/06/2021
     */
    openDropdown() {
      this.isShow = true;
    },

    /**
     * Hide list item dropdown
     * DVHAI 12/06/2021
     */
    closeDropdown() {
      this.isShow = false;
    },

    /**
     * Change outline color
     * DVHAI 12/06/2021
     */
    addInputOutlineColor(e) {
      e.target.classList.add('focus');
    },

    /**
     * Lost focus
     * DVHAI 12/06/2021
     */
    removeInputOutlineColor(e) {
      e.target.classList.remove('focus');

      this.closeDropdown();
    }
  },
  computed: {},
  watch: {
    cloneModel() {
      this.$emit("changeValueInput", this.data.inputId, this.cloneModel);
    },
    
    model() {
      this.cloneModel = JSON.parse(JSON.stringify(this.model));
      if(this.curSelectedItem != null)
        this.evtRowClick(this.cloneModel)
    },

    curSelectedItem() {
      this.cloneModel = this.curSelectedItem;
    }
  },
};
</script>

<style scoped>
/* transition */
.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(0%);
  opacity: 0;
}

.active {
  background-color: #019160 !important;
  color: white !important;
}

.focus {
  border: 1px solid #019160 !important;
}

/* filter css */
.dropdown {
  position: relative;
  width: calc(var(--size-width-M) * 3);
}

/* icon */
.group-icon {
  display: flex;
  align-items: center;
}

.box__icon {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(233, 235, 238);
}

.icon-textclear,
.icon-arrowdown {
  cursor: pointer;
}

.icon-textclear:hover {
  background-color: rgb(233, 235, 238, 0.5);
}

.icon-arrowdown {
  display: flex;
  padding-right: 12px;
  padding-left: 6px;
}

/* dropdown  */
.dropdown-box {
  border: 1px solid #bbbbbb;
  text-indent: 16px;
  color: #000000;
  font-weight: 400;
  font-family: "GoogleRegular";
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-bg-size {
  background-size: 16px 16px, 16px 16px !important;
}

.dropdown__items {
  z-index: 99;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 100%;
  background-color: white;
  top: 40px;
  position: absolute;
  cursor: pointer;
  border-radius: 4px;
  padding: 3px 0;
}

.dropdown__row {
  align-items: center;
  display: flex;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
}

.dropdown__row span {
  flex: 1;
}

.dropdown__row .svg__box {
  display: flex;
  width: 16px;
  margin: 0 12px;
  height: 16px;
}

svg {
  transition: .2s;
}

.dropdown__row--hover {
  background-color: #e9ebee;
}
</style>

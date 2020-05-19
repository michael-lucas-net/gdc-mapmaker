<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div class="container">
      <div class="color-header">
        <Icon :color="selected" style="width: auto;">vue-js-grid</Icon>
      </div>
      <grid
        :center="false"
        :draggable="true"
        :sortable="true"
        :items="colors"
        :height="80"
        :width="80"
        @change="change"
        @remove="remove"
        @click="click"
        @sort="sort"
      >
        <template slot="cell" scope="props">
          <Icon
            :color="props.item"
            :index="props.index"
            :with-button="true"
            @remove="props.remove()"
          />
        </template>
      </grid>
    </div>
    <button @click="printMap">Print</button>
    <br />
    <br />
    {{ printedMap }}
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
import { generateRGBColors, tiles } from "@/utils.js";
export default {
  components: {
    Icon
  },
  data() {
    let colors = generateRGBColors(81);
    let allTiles = tiles();
    return {
      printedMap: "",
      colors,
      allTiles,
      selected: null
    };
  },
  methods: {
    printMap(map) {
      let text = "";

      let number = 0;

      while (number < 81) {
        for (let i = 0; i < 9; i++) {
          text += "{";
          for (let j = 0; j < 9; j++) {
            text += map[number].name;
            if (j < 8) {
              text += ", ";
            }
            number++;
          }
          text += "}";

          if (i < 8){
            text += ", ";
          }
        }
      }
      this.printedMap = text;
    },
    generateTiles(number) {
      return Array.apply(null, new Array(number)).map(() => {
        " x ";
      });
    },
    click({ items, index }) {
      let value = items.find(v => v.index === index);
      this.selected = value.item;
      console.log(this.selected);
    },
    change(event) {
      console.log("change", event);
    },
    remove(event) {
      console.log("remove", event);
    },
    sort(event) {
      this.printMap(event.items.map(i => i.item));
      console.log("sort", event);
    }
  }
};
</script>

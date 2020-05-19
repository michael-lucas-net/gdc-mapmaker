<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div class="container">

      <div class="legende" v-html="showAllTiles()"></div>
      <hr/>

      <div class="color-header">
        <Icon :color="selected" style="width: auto;">
          vue-js-grid
        </Icon>
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
      colors,
      allTiles,
      selected: null
    };
  },
  methods: {
    showAllTiles() {
      const tiles = this.allTiles;
      let txt = "";

      tiles.forEach(tile => {
        const name = tile[0];
        const color = tile[1];
        txt += `
        <div class='tile'>
          ${name}: <span style="padding: 10px; background-color:${color}">X</span>
        </div><br/>`;
      });

      return txt;
    },
    printMap() {
      const d = this.colors;
      let array = [];

      for (let i = 0; i < d.length / 9; i++) {
        for (let j = 0; j < 9; j++) {
          array[i] = d[i].tile;
        }
      }
      console.log(array);
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
      console.log("sort", event);
    }
  }
};
</script>

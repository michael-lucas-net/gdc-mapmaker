<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div class="container">
      {{ numberOfTiles }}

      <div class="tilesToAdd">
        <div class="tilePreview" v-for="tile in allTiles" :key="tile.id">
          <span class="name">{{ tile.imageName }}</span
          ><br />
          <img
            @click="addToList(tile.id)"
            :src="require(`@/assets/tilePics/${tile.imageName}.png`)"
          />
        </div>
      </div>
      <grid
        :center="false"
        :draggable="true"
        :sortable="true"
        :items="usedTiles"
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
    <br />
    <br />
    {{ printedMap }}
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
import { tiles, generateTiles } from "@/utils.js";

export default {
  components: {
    Icon
  },
  data() {
    let emptyTiles = generateTiles(81);
    let allTiles = tiles();
    return {
      printedMap: "",
      usedTiles: emptyTiles,
      allTiles
    };
  },
  computed: {
    numberOfTiles() {
      return this.usedTiles.length;
    }
  },
  methods: {
    addToList(id) {
      if (this.numberOfTiles == 81) {
        alert("81 erreicht!");
        return;
      }
      const tile = this.allTiles.find(t => t.id == id);
      console.log("ID: " + id);
      console.log(tile);
      this.usedTiles.push(tile);
    },
    printMap(map) {
      let text = "";
      let number = 0;

      while (number < this.usedTiles.length) {
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

          if (i < 8) {
            text += ", ";
          }
        }
      }
      this.printedMap = text;
    },
    click({ items, index }) {
      // Delete
      items = items.filter(i => i.index !== index);
      this.usedTiles = [];
      for (let i = 0; i < items.length; i++) {
        this.usedTiles[i] = items[i].item;
      }
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

<style>
.tilePreview {
  display: inline-block !important;
}
</style>

<template>
  <div class="home">
    <div class="container mt-5">
      <h1>Map mak0r</h1>

      <div class="tilesToAdd">
        <div class="tilePreview" v-for="tile in allTiles" :key="tile.id">
          <span class="name">{{ tile.desc }}</span
          ><br />
          <img
            @click="selectTileToAdd(tile.id)"
            :src="require(`@/assets/tilePics/${tile.imageName}.png`)"
            style="width: 60px; height: 60px;"
          />
        </div>
      </div>
      <div class="mt-3">
        <div class="col-lg-6 m-auto">
          <div class="row">
            <div
              v-for="(tile, index) in usedTiles"
              :key="index"
              class="col-sm-2"
            >
              <img
                :src="'../assets/tilePics/' + tile.imageName + '.png'"
                class="m-2"
                @click="click(index)"
                style="width: 50px; height:50px;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="container mb-5">
      {{ printedMap }}<br />
      <hr />
      {{ printedDoors }}
    </div>
  </div>
</template>

<script>
import { tiles, generateTiles } from "@/utils.js";

export default {
  data() {
    let emptyTiles = generateTiles(81);
    let allTiles = tiles();
    return {
      tileIdToAdd: -1,
      printedMap: "",
      printedDoors: "",
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
    selectTileToAdd(id) {
      this.tileIdToAdd = id;
    },
    addToList(id) {
      const tile = this.allTiles.find(t => t.id == id);
      this.usedTiles.push(tile);
    },
    printMap(map) {
      let text = "";
      let doorsText = "";
      let number = 0;

      while (number < this.usedTiles.length) {
        doorsText = "{";
        for (let i = 0; i < 9; i++) {
          text += "{";
          for (let j = 0; j < 9; j++) {
            let name = map[number].name;
            text += name;

            if (name === "P_DOOR") {
              if (doorsText !== "{") {
                doorsText += ", ";
              }
              doorsText += `{${i}, ${j}}`;
            }

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
        doorsText += "}";
      }
      this.printedMap = ".field = {" + text + "},";

      if (doorsText != "{}") {
        doorsText = ".doors = " + doorsText + ",";
      }
      this.printedDoors = doorsText;
    },
    click(index) {
      if (this.tileIdToAdd == -1) {
        return;
      }

      // Ersetzen
      this.usedTiles[index] = this.allTiles.find(t => t.id == this.tileIdToAdd);

      console.log("Index: " + index);

      console.log(this.usedTiles[0]);

      this.printMap(this.usedTiles);
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
.m-auto {
  margin-top: 5% !important;
  margin: 0 auto !important;
}
.col-sm-2 {
  max-width: 11% !important;
}
.tilesToAdd {
  margin-top: 30px;
}
.tilePreview {
  display: inline-block !important;
  margin: 0 2px;
}
</style>

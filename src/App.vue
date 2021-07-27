<template>
  <div class="text-center">
    <div class="container mt-5">
      <h1>Map Generator</h1>

      <div class="tilesToAdd">
        <div class="tilePreview" v-for="tile in allTiles" :key="tile.id">
          <span class="name">{{ tile.desc }}</span
          ><br />
          <img
            @click="selectTileToAdd(tile.id)"
            :src="require(`@/assets/tilePics/${tile.imageName}.png`)"
            style="width: 60px; height: 60px"
          />
        </div>
      </div>
      <div v-if="tileIdToAdd > -1">
        <hr />
        <h6>Ausgewählt:</h6>
        <img
          :src="require(`@/assets/tilePics/${selectedTileImageName}.png`)"
          style="width: 60px; height: 60px"
        />
        <hr />
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
                :src="require(`@/assets/tilePics/${tile.imageName}.png`)"
                class="m-2"
                @click="click(index)"
                style="width: 50px; height: 50px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <b-button @click="copyMap()">{{ buttonText }}</b-button>
    <hr />
    <div class="container mb-5"><span v-html="printedMap" /><br /></div>
  </div>
</template>

<script>
import copy from "copy-to-clipboard";
import { tiles, generateTiles } from "@/tiles.js";

export default {
  data() {
    let emptyTiles = generateTiles(81);
    let allTiles = tiles();
    return {
      buttonText: "Kopieren",
      tileIdToAdd: -1,
      printedMap: "",
      usedTiles: emptyTiles,
      allTiles,
    };
  },
  methods: {
    copyMap() {
      copy(this.printedMap);
      this.buttonText = "Kopiert!";
    },
    selectTileToAdd(id) {
      this.tileIdToAdd = id;
    },
    addToList(id) {
      const tile = this.allTiles.find((t) => t.id == id);
      this.usedTiles.push(tile);
    },
    printMap(map) {
      let text = "";
      let doorsText = "";
      let switchesText = "";
      let playerPosText = "";
      let number = 0;

      while (number < this.usedTiles.length) {
        for (let i = 0; i < 9; i++) {
          text += "{";
          for (let j = 0; j < 9; j++) {
            let name = map[number].name;

            if (name === "P_DOOR") {
              if (doorsText !== "") {
                doorsText += ", ";
              }
              doorsText += `{${j}, ${i}}`;
            } else if (name == "P_DOOR_SWITCH") {
              if (switchesText !== "") {
                switchesText += ", ";
              }
              switchesText += `{${j}, ${i}}`;
            } else if (name == "P_START") {
              playerPosText = `${j}, ${i}`;
              name = "P_FREE";
            }
            text += name;

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
      this.printedMap = "\n.field = { \n" + text + " \n},";
      this.printedMap += "\n.doors = { \n" + doorsText + " \n},";
      this.printedMap += "\n.doorSwitch = { \n" + switchesText + " \n},";
      this.printedMap += "\n.startPos = { \n" + playerPosText + "\n},";
    },
    click(index) {
      this.buttonText = "Kopieren";
      if (this.tileIdToAdd == -1) {
        return;
      }

      // Ersetzen
      this.usedTiles[index] = this.allTiles.find(
        (t) => t.id == this.tileIdToAdd
      );
      this.printMap(this.usedTiles);
    },
  },
  computed: {
    selectedTileImageName() {
      if (this.tileIdToAdd === -1) {
        return 1;
      }

      return this.allTiles.filter((t) => t.id === this.tileIdToAdd)[0]
        .imageName;
    },
  },
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

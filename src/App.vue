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
import TilesViewModel from "./viewmodels/TilesViewModel";

export default {
  data() {
    return TilesViewModel.data;
  },
  methods: TilesViewModel.methods,
  computed: TilesViewModel.computed,
};
</script>

<style>
.text-center {
  text-align: center;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.mt-5 {
  margin-top: 3rem !important;
}

.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.m-auto {
  margin: auto !important;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-sm-2 {
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
}

.m-2 {
  margin: 0.5rem !important;
}

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

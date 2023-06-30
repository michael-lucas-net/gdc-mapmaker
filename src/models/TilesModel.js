import { tiles, generateTiles } from "@/models/tiles.js";

let emptyTiles = generateTiles(81);
let allTiles = tiles();

export default {
  buttonText: "Kopieren",
  tileIdToAdd: -1,
  printedMap: "",
  usedTiles: emptyTiles,
  allTiles,
};

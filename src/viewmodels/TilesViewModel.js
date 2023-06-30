import TilesModel from "@/models/TilesModel";
import copy from "copy-to-clipboard";

export default {
  data: TilesModel,
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

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
      const text = [],
        doors = [],
        switches = [];
      let playerPos = "";

      map.forEach((tile, idx) => {
        // Berechne die Position innerhalb des 9x9-Feldes
        const row = Math.floor(idx / 9);
        const col = idx % 9;

        let name = tile.name;

        // Flags für verschiedene Zustände
        const isDoor = name === "P_DOOR";
        const isDoorSwitch = name === "P_DOOR_SWITCH";
        const isStart = name === "P_START";
        const isFirstCol = col === 0;
        const isLastCol = col === 8;

        // Füge die Position zur Liste der Türen hinzu, wenn die Kachel eine Tür ist
        if (isDoor) {
          doors.push(`{${col}, ${row}}`);
        }

        // Füge die Position zur Liste der Schalter hinzu, wenn die Kachel ein Schalter ist
        if (isDoorSwitch) {
          switches.push(`{${col}, ${row}}`);
        }

        // Speichere die Startposition und setze den Namen auf 'P_FREE'
        if (isStart) {
          playerPos = `{${col}, ${row}}`;
          name = "P_FREE";
        }

        // Füge eine öffnende Klammer hinzu, wenn wir eine neue Zeile beginnen
        if (isFirstCol) {
          text.push("{");
        }

        // Füge den Namen der Kachel zur Ausgabe hinzu
        text.push(name);

        // Füge eine schließende Klammer hinzu, wenn wir eine Zeile beenden
        if (isLastCol) {
          text.push("}");
        }
      });

      this.printedMap = `
      .field = { \n${text.join(", ")} \n},
      .doors = { \n${doors.join(", ")} \n},
      .doorSwitch = { \n${switches.join(", ")} \n},
      .startPos = { \n${playerPos} \n},`;
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

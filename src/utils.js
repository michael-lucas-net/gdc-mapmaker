export const randomInt = (fr, to) => {
  return Math.round(fr + Math.random() * to);
};
export function tiles() {
  const types = [
    ["P_START", "green"],
    ["P_OUTER", "black"],
    ["P_FREE", "#777"],
    ["P_WALL", "#333"],
    ["P_BOX", "brown"],
    ["P_TARGET", "dodgerblue"],
    ["P_OBJECT_TRIANGLE", "powderblue"],
    ["P_DOOR", "chocolate"],
    ["P_DOOR_SWITCH", "turquoise"],
    ["P_HOUSE", "pink"],
    ["P_PORTAL", "yellow"]
  ];

  return types;
}

export const generateRGBColors = count => {
  return Array.apply(null, new Array(count)).map(() => {
    const randomTile = tiles()[randomInt(0, 10)];
    return {
      color: randomTile[1],
      tile: randomTile[0]
    };
  });
};

export default { randomInt, generateRGBColors };

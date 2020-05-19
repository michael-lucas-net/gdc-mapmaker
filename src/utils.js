export const randomInt = (fr, to) => {
  return Math.round(fr + Math.random() * to);
};
export function tiles() {
  const t = [
    {
      id: 1,
      name: "P_START",
      imageName: "free"
    },
    {
      id: 2,
      name: "P_OUTER",
      imageName: "outer"
    },
    {
      id: 3,
      name: "P_FREE",
      imageName: "free"
    },
    {
      id: 4,
      name: "P_WALL",
      imageName: "wall"
    },
    {
      id: 5,
      name: "P_BOX",
      imageName: "box"
    },
    {
      id: 6,
      name: "P_TARGET",
      imageName: "target"
    },
    {
      id: 7,
      name: "P_OBJECT_TRIANGLE",
      imageName: "triangle"
    },
    {
      id: 8,
      name: "P_DOOR",
      imageName: "door"
    },
    {
      id: 9,
      name: "P_DOOR_SWITCH",
      imageName: "doorSwitch"
    },
    {
      id: 10,
      name: "P_HOUSE",
      imageName: "house"
    },
    {
      id: 11,
      name: "P_PORTAL",
      imageName: "portal"
    }
  ];

  return t;
}

export const generateRGBColors = count => {
  return Array.apply(null, new Array(count)).map(() => {
    const randomTile = tiles()[randomInt(0, 10)];
    return {
      id: randomTile.id,
      name: randomTile.name,
      imageName: randomTile.imageName
    };
  });
};

export default { randomInt, generateRGBColors };

export const randomInt = (fr, to) => {
  return Math.round(fr + Math.random() * to);
};
export function tiles() {
  const t = [
    {
      id: 1,
      desc: "Start",
      name: "P_START",
      imageName: "start"
    },
    {
      id: 2,
      desc: "Outer",
      name: "P_OUTER",
      imageName: "outer"
    },
    {
      id: 3,
      desc: "Free",
      name: "P_FREE",
      imageName: "free"
    },
    {
      id: 4,
      desc: "Wall",
      name: "P_WALL",
      imageName: "wall"
    },
    {
      id: 5,
      desc: "Box",
      name: "P_BOX",
      imageName: "box"
    },
    {
      id: 6,
      desc: "Target",
      name: "P_TARGET",
      imageName: "target"
    },
    {
      id: 7,
      desc: "Triangle",
      name: "P_OBJECT_TRIANGLE",
      imageName: "triangle"
    },
    {
      id: 8,
      desc: "Door",
      name: "P_DOOR",
      imageName: "door"
    },
    {
      id: 9,
      desc: "DoorSwitch",
      name: "P_DOOR_SWITCH",
      imageName: "doorSwitch"
    },
    {
      id: 10,
      desc: "House",
      name: "P_HOUSE",
      imageName: "house"
    },
    {
      id: 11,
      desc: "Portal",
      name: "P_PORTAL",
      imageName: "portal"
    }
  ];

  return t;
}

export const generateTiles = count => {
  return Array.apply(null, new Array(count)).map(() => {
    const randomTile = tiles()[2];
    return {
      id: randomTile.id,
      name: randomTile.name,
      desc: randomTile.desc,
      imageName: randomTile.imageName
    };
  });
};

export default { randomInt, generateTiles };

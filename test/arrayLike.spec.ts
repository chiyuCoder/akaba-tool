import {getMatchLevelList} from "../src";

const levelList = [
  {
    levelIndex: "1",
    children: [
      {
        levelIndex: "1-1",
      },
      {
        levelIndex: "1-2",
      },
      {
        levelIndex: "1-3",
        children: [
          {
            levelIndex: "1-3-1",
          },
          {
            levelIndex: "1-3-2",
            children: [
              {
                levelIndex: "1-3-2-1",
              },
            ],
          },
          {
            levelIndex: "1-3-3",
          },
        ],
      },
    ],
  },
  {
    levelIndex: "2",
    children: [
      {
        levelIndex: "2-1",
      },
      {
        levelIndex: "2-2",
        children: [
          {
            levelIndex: "2-2-1",
          },
        ],
      },
      {
        levelIndex: "2-3",
        children: [
          {
            levelIndex: "2-3-1",
          }
        ],
      }
    ],
  }
];

describe("arrayLike", () => {
  it('getMatchLevelList:2-2', function () {
    const result = getMatchLevelList("2-2", levelList, {
      valueAttr: "levelIndex",
      childrenAttr: "children"
    });
    expect(result.isMatch).toBe(true);
    expect(result.indexArray.join(",")).toBe("1,1");
  });
  it('getMatchLevelList:2-2-4-3', function () {
    const result = getMatchLevelList("2-2-4-3", levelList, {
      valueAttr: "levelIndex",
      childrenAttr: "children"
    });
    expect(result.isMatch).toBe(false);
  });
  it('getMatchLevelList:1-3-2-1', function () {
    const result = getMatchLevelList("1-3-2-1", levelList, {
      valueAttr: "levelIndex",
      childrenAttr: "children"
    });
    expect(result.isMatch).toBe(false);
  });
});

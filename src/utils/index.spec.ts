// @ts-nocheck
import {
  addItemsToSelection,
  calculateMissingSpots,
  updatePreSelectedItems,
} from ".";

describe("calculateMissingSpots", () => {
  it("should return 0 if rowsNumberSelected is less than or equal to selectedItems length", () => {
    expect(calculateMissingSpots(5, [1, 2, 3, 4, 5, 6])).toBe(0);
    expect(calculateMissingSpots(3, [1, 2, 3])).toBe(0);
  });

  it("should return the correct number of missing spots if rowsNumberSelected is greater", () => {
    expect(calculateMissingSpots(10, [1, 2, 3])).toBe(7);
    expect(calculateMissingSpots(5, [1, 2])).toBe(3);
  });
});

describe("updatePreSelectedItems", () => {
  it("should return updated preSelectedItems and missingSpots when rowsNumberSelected is greater than selectedItems length", () => {
    const [preSelectedItems, missingSpots] = updatePreSelectedItems(8, [1, 2]);
    expect(preSelectedItems).toEqual(new Set([1, 2]));
    expect(missingSpots).toBe(6);
  });

  it("should handle the case where preSelectedItems are reset if rowsNumberSelected is less than selectedItems length", () => {
    const [preSelectedItems, missingSpots] = updatePreSelectedItems(
      3,
      [1, 2, 3, 4]
    );
    expect(preSelectedItems).toEqual(new Set());
    expect(missingSpots).toBe(3);
  });
});

describe("addItemsToSelection", () => {
  it("should add items to preSelectedItems until missingSpots is 0", () => {
    const preSelectedItems = new Set<number>([1, 2]);
    const currentData = [3, 4, 5, 6];
    addItemsToSelection(preSelectedItems, 3, currentData);
    expect(preSelectedItems).toEqual(new Set([1, 2, 3, 4, 5]));
    expect(currentData).toEqual([6]);
  });

  it("should not add items if there are no missing spots", () => {
    const preSelectedItems = new Set<number>([1, 2, 3]);
    const currentData = [4, 5, 6];
    addItemsToSelection(preSelectedItems, 0, currentData);
    expect(preSelectedItems).toEqual(new Set([1, 2, 3]));
    expect(currentData).toEqual([4, 5, 6]);
  });
});

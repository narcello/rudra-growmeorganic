import { ArtworksType } from "../types";

export const calculateMissingSpots = (
  rowsNumberSelected: number,
  selectedItems: ArtworksType[]
): number => {
  const selectedCount = selectedItems.length;
  if (rowsNumberSelected <= selectedCount) return 0;
  return rowsNumberSelected - selectedCount;
};

export const updatePreSelectedItems = (
  rowsNumberSelected: number,
  selectedItems: ArtworksType[]
): [Set<ArtworksType>, number] => {
  let preSelectedItems = new Set<ArtworksType>(selectedItems);
  let missingSpots = calculateMissingSpots(rowsNumberSelected, selectedItems);

  if (missingSpots === 0) {
    if (rowsNumberSelected < selectedItems.length) {
      preSelectedItems = new Set<ArtworksType>();
      missingSpots = rowsNumberSelected;
    }
  }
  return [preSelectedItems, missingSpots];
};

export const addItemsToSelection = (
  preSelectedItems: Set<ArtworksType>,
  missingSpots: number,
  currentData: ArtworksType[]
): void => {
  while (missingSpots > 0 && currentData.length > 0) {
    const artwork = currentData.shift();
    if (artwork && !preSelectedItems.has(artwork)) {
      preSelectedItems.add(artwork);
      missingSpots--;
    }
  }
};

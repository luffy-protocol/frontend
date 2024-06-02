export function getMaxIndex(arr: number[]): any {
  if (arr.length === 0) return -1; // Handle empty array case
  return arr.reduce(
    (maxIndex, currentValue, currentIndex, array) =>
      currentValue > array[maxIndex] ? currentIndex : maxIndex,
    0
  );
}

export function sumArray(arr: number[]) {
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}

export function getMaxValue(arr: number[]) {
  if (arr.length === 0) return 0; // Handle empty array case
  return Math.max(...arr);
}

export default function getMaxIndex(arr: number[]): any {
  if (arr.length === 0) return -1; // Handle empty array case
  return arr.reduce(
    (maxIndex, currentValue, currentIndex, array) =>
      currentValue > array[maxIndex] ? currentIndex : maxIndex,
    0
  );
}

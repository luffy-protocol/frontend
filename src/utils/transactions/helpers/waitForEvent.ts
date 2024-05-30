export default async function waitForEvent(
  state: number,
  value: number
): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      console.log("State");
      console.log(state);
      if (state == value) {
        clearInterval(interval);
        resolve();
      }
    }, 1000); // Check every 200 milliseconds
  });
}

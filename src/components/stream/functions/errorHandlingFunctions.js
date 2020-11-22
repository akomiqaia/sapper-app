// Handling all of our errors here by alerting them
export function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

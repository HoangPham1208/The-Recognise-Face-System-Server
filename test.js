const date = new Date();

// Formatting date
const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
// Formatting time
const formattedTime = `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;

console.log("Formatted Date:", formattedDate);
console.log("Formatted Time:", formattedTime);

function padZero(num) {
  return num.toString().padStart(2, '0');
}
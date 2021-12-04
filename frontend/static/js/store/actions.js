// Dummy API request & response

export const randomDate = async (end, start) => {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  var start = start || "01-01-1970";
  var end = end || new Date().toLocaleDateString();
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  if (start > end) {
    return new Date(randomValueBetween(end, start)).toLocaleDateString();
  } else {
    return new Date(randomValueBetween(start, end)).toLocaleDateString();
  }
};

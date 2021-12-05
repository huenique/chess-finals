/* 
This func is supposed to fetch external content, but no real content is
required for this project so it generates a random date instead.
*/
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

export const getArticleImages = async (limit) => {
  try {
    return await axios.get(`https://picsum.photos/v2/list?limit=${limit}`);
  } catch (error) {
    console.error(error);
  }
};

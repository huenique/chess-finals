/* 
Async sleep function
*/
export const sleep = (t) => new Promise((s) => setTimeout(s, t));
export const getRandomInt = (min, max) => Math.random() * (max - min) + min;
export const loadIcons = () => feather.replace();

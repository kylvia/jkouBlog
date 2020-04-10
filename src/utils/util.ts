export function getRadomColor() {
  var aColor = [0, 1, 2, 3, 4,  "a", "b", "c"];
  var len = aColor.length;
  var iColor = "#";
  var randowIndex = 0;
  while (iColor.length < 7) {
    randowIndex = Math.floor(Math.random() * len);
    iColor += aColor[randowIndex];
  }
  return iColor;
}

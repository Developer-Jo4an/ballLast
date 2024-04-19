export function findGetParameter(parameterName, url) {
  let result = null,
    tmp = [];
  (url ?? location.search)
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0].replace("?","") === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

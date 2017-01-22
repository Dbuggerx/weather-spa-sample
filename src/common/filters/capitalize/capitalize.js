export default function () {
  return function (val) {
    return val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '';
  };
}

export default function() {
  return val => val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : '';
}

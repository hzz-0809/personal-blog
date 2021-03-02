export default function matchTag(value) {
  switch (value) {
    case 0:
      return "danger";
    case 1:
      return "warning";
    case 2:
      return "success";
    case 3:
      return "";
  }
}

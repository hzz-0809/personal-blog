import { format } from "echarts";

function getLocalTime(timeStamp) {
  let localTime = new Date(timeStamp).toLocaleDateString().replace(/\//g, "-");
  return localTime;
}
export default getLocalTime;
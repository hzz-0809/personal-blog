<template>
  <div class="container">
    <div class="signature">
      <svg
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 200"
      >
        <path
          fill="none"
          stroke-width="4.5"
          stroke-opacity="null"
          fill-opacity="null"
          d="m106.538322,68.531629c17.72152,1.65289 -45.833,-4.45544 -46.22906,-4.45544c-2.08328,-0.41322 42.47527,18.81188 34.05943,19.30693c-8.41584,0.49505 -61.88119,10.89109 -59.40594,22.27723c2.47525,11.38613 53.46534,10.89108 53.46534,10.89108c11.15701,0.41321 51.14967,-6.84887 47.68432,-15.26471c-3.46534,-8.41584 14.02913,28.30784 16.00933,24.84249c1.9802,-3.46535 -2.30751,-20.96391 0.16774,-22.44906c2.47525,-1.48515 39.62441,-0.28844 26.83166,-0.49505"
          id="svg_10"
          :stroke="color"
        />
        <path
          fill="none"
          stroke-width="4.5"
          stroke-opacity="null"
          fill-opacity="null"
          d="m198.787772,104.996839c1.84705,6.85834 1.16879,-3.58965 -6.24972,-4.19978c-7.41851,-0.61013 -17.31086,7.82577 -15.41384,11.3488c1.89702,3.52303 14.51605,-2.82963 15.60006,-1.20361c1.08401,1.62601 1.08401,2.32246 1.18545,4.16648c0.10144,1.84402 0.84632,0.23618 -0.271,-1.89702"
          id="svg_55"
          :stroke="color"
        />
        <path
          fill="none"
          stroke-width="4.5"
          stroke-opacity="null"
          fill-opacity="null"
          d="m210.378752,101.037609c2.43901,-10.96674 -4.52962,20.20905 -1.74216,16.3763c2.78745,-3.83275 18.11846,-21.95121 20.90591,-18.81532c2.78746,3.13588 9.9687,19.24053 5.57491,9.75609"
          id="svg_60"
          :stroke="color"
        />
        <path
          fill="none"
          stroke-width="4.5"
          stroke-opacity="null"
          d="m262.677052,64.826659c-16.33333,0.01716 56.17425,-0.24213 49.3946,1.45278c-6.77965,1.69491 -72.15486,35.35104 -59.56408,51.33165c12.59079,15.9806 95.9058,-4.53235 101.71693,-15.91247"
          id="svg_65"
          :stroke="color"
        />
        <path
          fill="none"
          stroke-width="4.5"
          stroke-opacity="null"
          fill-opacity="null"
          d="m360.401652,68.827139c2.49525,-15.61756 -7.75789,45.08441 -8.8368,49.64788c-1.0789,4.56347 9.47683,-12.66349 24.15491,-14.50705c14.67808,-1.84356 28.50354,23.85313 22.47738,14.15494"
          id="svg_82"
          :stroke="color"
        />
        <path
          fill="none"
          stroke-width="4.5"
          stroke-opacity="null"
          fill-opacity="null"
          d="m423.731742,105.657749c1.84705,6.85834 1.16879,-3.58965 -6.24972,-4.19978c-7.41851,-0.61013 -17.31086,7.82577 -15.41384,11.3488c1.89702,3.52303 14.51605,-2.82963 15.60006,-1.20361c1.08401,1.62601 1.08401,2.32246 1.18545,4.16648c0.10144,1.84402 0.84632,0.23618 -0.271,-1.89702"
          id="svg_56"
          :stroke="color"
        />
        <path
          fill="none"
          :stroke="color"
          stroke-width="4.5"
          stroke-opacity="null"
          fill-opacity="null"
          d="m436.286562,100.130619c-5.49999,20.24998 9.90003,18.35001 12.95001,17.3c3.04999,-1.05001 -11.45001,-12.05001 -8.20001,-12.30001c3.25,-0.25 37.55955,4.34401 32.7444,-3.50557"
          id="svg_129"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Signature",
  methods: {
    init() {
      return $(".signature svg").each(function () {
        let delay, length, path, paths, previousStrokeLength, results, speed;
        paths = $("path");
        delay = 0;
        results = [];

        for (let i = 0; i < paths.length; i++) {
          path = paths[i];
          length = path.getTotalLength(); //SVGPathElement.getTotalLength()，返回用户代理对path总长度的计算单位。
          previousStrokeLength = speed || 0;
          speed = length < 100 ? 400 : Math.floor(length) * 4; //设置绘画速度
          delay += previousStrokeLength + 100; //延迟

          //svg path的属性：
          //1.stroke-dasharray:[dashLegth,spacing],用于创建虚线,有两个参数，第一个表示虚线长度，第二个表示每段虚线之间的间距
          //2.stroke-dashoffset:offset，相对于起始点偏移，正数向左偏移，负数向右偏移
          //3.data-attr,此类属性并非svg的属性，它的作用是保存svg initialize时的一些值，以便animation中使用
          results.push(
            $(path)
              .css("transition", "none")
              .attr("data-length", length)
              .attr("data-speed", speed)
              .attr("data-delay", delay)
              .attr("stroke-dashoffset", length)
              .attr("stroke-dasharray", length + "," + length)
          );
        }
        return results;
      });
    },
    animation() {
      return $(".signature svg").each(function () {
        let delay, length, path, paths, results, speed;
        paths = $("path");
        results = [];
        for (let i = 0; i < paths.length; i++) {
          path = paths[i];
          length = $(path).attr("data-length");
          speed = $(path).attr("data-speed");
          delay = $(path).attr("data-delay");

          results.push(
            $(path)
              .css(
                "transition",
                "stroke-dashoffset " + speed + "ms " + delay + "ms linear"
              )
              .attr("stroke-dashoffset", "0")
          );
        }
        return results;
      });
    },
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.animation();
    });
  },
  props: {
    color: {
      type: String,
      default: "#000",
    },
    width: {
      type: Number,
      default: 150,
    },
    height: {
      type: Number,
      default: 70,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>


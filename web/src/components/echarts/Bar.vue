<template>
  <div class="Bar" id="Bar" v-if="isShow"></div>
</template>

<script>
export default {
  name: "Bar",
  data() {
    return {
      isShow: true,
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 20,
          bottom: 20,
          right: 20,
        },
        xAxis: { type: "value" },
        yAxis: { type: "category", data: ["留言", "获赞", "文章"] },
        series: [
          {
            type: "bar",
            barMinHeight: 5,
            data: [
              {
                value: this.about.commentNum,
                itemStyle: {
                  color: "#f39c12",
                },
              },
              {
                value: this.about.favorNum,
                itemStyle: {
                  color: "#c0392b",
                },
              },
              {
                value: this.about.articleNum,
                itemStyle: {
                  color: "#1abc9c",
                },
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    createBar() {
      let myChart = this.$echarts.init(document.getElementById("Bar"));
      myChart.setOption(this.option);
    },
    changeSize() {
      let container = document.getElementById("Bar");
      let height = container.offsetHeight;

      window.onresize = () => {
        if (container.offsetHeight !== height) {
          window.onresize = null;
          this.isShow = false;
          this.$nextTick(() => {
            this.isShow = true;
            setTimeout(() => {
              this.createBar();
              this.changeSize();
            });
          });
        }
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.createBar();
      this.changeSize();
    });
  },
  props: {
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 200,
    },
    about: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.Bar {
  width: 700px;
  height: 200px;
}

@media screen and (min-width: 1380px) {
  .Bar {
    width: 850px;
    height: 220px;
  }
}

@media screen and (max-width: 1200px) {
  .Bar {
    width: 550px;
    height: 180px;
  }
}

@media screen and (max-width: 992px) {
  .Bar {
    width: 500px;
    height: 150px;
  }
}

//手机、ipad
@media screen and (max-width: 768px) {
  .Bar {
    width: 350px;
    height: 120px;
  }
}
</style>
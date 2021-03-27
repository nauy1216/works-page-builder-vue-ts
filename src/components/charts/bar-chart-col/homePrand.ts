const prandOption = {
  animation: true,
  grid: {
    top: "14%",
    height: "62%",
    bottom: "25%",
    left: "20%"
  },
  legend: {
    data: [],
    orient: "vertical",
    right: "auto",
    textStyle: {
      fontSize: 14,
      color: "white"
    }
  },
  xAxis: {
    type: "category",
    name: "",
    nameTextStyle: {
      color: "white"
    },
    data: [],
    axisLabel: {
      interval: 0,
      rotate: 28,
      lineStyle: {
        color: "#2b2c5e"
      },
      textStyle: {
        color: "white",
        fontSize: 8
      }
    },
    axisLine: {
      lineStyle: {
        color: "#CCFFFF"
      }
    },
    axisTick: {
      //alignWithLabel: true
    }
  },
  yAxis: {
    type: "value",
    name: "",
    nameTextStyle: {
      color: "white",
      fontsize: "18"
    },
    data: [],
    splitLine: {
      show: true,
      lineStyle: {
        show: false,
        color: "#2b2c5e"
      }
    },
    axisLabel: {
      lineStyle: {
        color: "#2b2c5e"
      },
      textStyle: {
        color: "white",
        fontSize: 10
      }
    },
    axisLine: {
      lineStyle: {
        color: "#CCFFFF"
      }
    }
  },
  series: [
    {
      name: "",
      data: [],
      type: "bar",
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: 0, //圆角
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0.2,
                color: "#256da1"
              },
              {
                offset: 1,
                color: "#0a3d91"
              }
            ]
          }
        }
      }
    }
  ]
};
export default prandOption;

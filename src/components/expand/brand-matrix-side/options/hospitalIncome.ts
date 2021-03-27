const hospitalOption = {
  backgroundColor: "transparent",
  grid: {
    width: "90%",
    height: "70%",
    bottom: "22%",
    // 'left': '1%',
    right: "10%",
    barWidth: 1,
    containLabel: true
  },
  xAxis: {
    type: "value",
    name: "元",
    nameTextStyle: {
      color: "white",
      fontSize: 14
    },
    boundaryGap: [0, 0.64],
    axisLabel: {
      show: true,
      rotate: 25,
      textStyle: {
        color: "white",
        fontSize: 12
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#708090",
        opacity: 0.1
      }
    },
    axisLine: {
      lineStyle: {
        color: "#CCFFFF"
      }
    }
  },
  yAxis: {
    type: "category",
    data: ["纳吉亚成都猫研所", "安安上海御宠佳园", "瑞鹏南宁凤翔", "芭比堂广州天府路", "美联众合北京常赢", "纳吉亚北京志胜", "宠福鑫北京亦庄完全", "芭比堂上海机灵鬼"],
    axisLabel: {
      show: true,
      textStyle: {
        color: "white",
        fontSize: 14
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
      name: "各区域病例量",
      type: "bar",
      barWidth: 10,
      data: [3500, 4000, 4312, 4622, 5244, 5632, 6643],
      label: {
        normal: {
          formatter: "{c}",
          show: true,
          position: "right",
          color: "#fff"
        }
      },
      itemStyle: {
        normal: {
          barBorderRadius: 5,
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0.2,
                color: "#0d4091"
              },
              {
                offset: 1,
                color: "#256da1"
              }
            ]
          }
        }
      }
    }
  ]
};
export default hospitalOption;

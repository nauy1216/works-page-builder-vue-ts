const shoopIncomeOption = {
  textStyle: {
    fontSize: 18
    // 'color': '#ffffff'
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    show: true,
    orient: "vertical",
    right: "1%",
    top: "18%",
    textStyle: {
      fontSize: 12,
      color: "#ffffff"
    }
  },
  series: [
    {
      type: "pie",
      radius: "50%",
      center: ["37%", "50%"],
      selectedMode: "single",
      label: {
        normal: {
          color: "",
          show: true,
          formatter: "{d}%",
          fontSize: 16
        },
        emphasis: {
          show: true
        }
      },
      data: [
        {
          itemStyle: {
            normal: {
              color: "#c2067b"
            }
          },
          name: "医疗收入",
          value: 30
        },
        {
          itemStyle: {
            normal: {
              color: "#01b2cd"
            }
          },
          name: "美容收入",
          value: 70
        },
        {
          itemStyle: {
            normal: {
              color: "#bea465"
            }
          },
          name: "商品收入",
          value: 70
        },
        {
          itemStyle: {
            normal: {
              color: "#006699"
            }
          },
          name: "检查收入",
          value: 50
        },
        {
          itemStyle: {
            normal: {
              color: "#6c50e7"
            }
          },
          name: "其他收入",
          value: 70
        }
      ]
    }
  ]
};
export default shoopIncomeOption;

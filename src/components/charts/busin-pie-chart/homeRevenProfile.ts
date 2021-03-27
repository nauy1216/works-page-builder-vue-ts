const profileOption = {
  animation: true,
  grid: {
    bottom: "20%",
    left: "1%"
  },
  backgroundColor: "transparent",
  color: ["#2790a1", "#cbb26f", "#ba2a72", "#22c0d5", "#638adc"],
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    data: ["医疗营收额", "检查营收额", "商品营收额", "美容营收额", "其他营收额"],
    orient: "vertical",
    right: "0%",
    top: "1%",
    padding: 0,
    textStyle: {
      fontSize: 10,
      color: "#ffffff"
    }
  },
  series: [
    {
      name: "营收分布",
      type: "pie",
      radius: ["40%", "50%"],
      center: ["50%", "55%"],
      label: {
        normal: {
          formatter: "{d}%  ",
          backgroundColor: "",
          borderColor: "",
          borderWidth: 1,
          borderRadius: 4,
          color: "#FFFFFF",
          show: true,
          rich: {
            a: {
              color: "#FFFFFF",
              lineHeight: 22,
              fontSize: 12,
              align: "center"
            },
            hr: {
              color: "#FFFFFF",
              borderColor: "#FFFFFF",
              width: "100%",
              borderWidth: 0.5,
              height: 0
            },
            b: {
              color: "#FFFFFF",
              fontSize: 16,
              lineHeight: 33
            },
            per: {
              color: "#FFFFFF",
              backgroundColor: "#031A60",
              fontSize: 12,
              borderRadius: 2
            }
          }
        }
      },
      data: [
        {
          value: 1204517,
          name: "医疗营收额"
        },
        {
          value: 217499009,
          name: "检查营收额"
        },
        {
          value: 16772938,
          name: "商品营收额"
        },
        {
          value: 15360786,
          name: "美容营收额"
        },
        {
          value: 66143342,
          name: "其他营收额"
        }
      ]
    },
    {
      name: "营收分布",
      type: "pie",
      selectedMode: "single",
      radius: [0, "20%"],
      center: ["50%", "55%"],
      label: {
        normal: {
          // 'formatter': '{d}%',
          show: false,
          color: "#FFFFFF"
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: [
        {
          value: 1204517727,
          name: "医疗营收额",
          selected: true
        },
        {
          value: 296887638,
          name: "检查营收额",
          selected: true
        },
        {
          value: 199784586,
          name: "商品营收额"
        },
        {
          value: 184553695,
          name: "美容营收额"
        },
        {
          value: 117182122,
          name: "其他营收额"
        }
      ]
    }
  ]
};
export default profileOption;

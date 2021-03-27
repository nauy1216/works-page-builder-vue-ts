const options = {
  // backgroundColor: "rgb(7,22,42)",
  backgroundColor: "transparent",
  title: {
    left: "left",
    textStyle: {
      color: "#fff"
    }
  },
  geo: {
    map: "china",
    roam: false, // 是否开启鼠标滚轮缩放和左右平移
    zoom: 1.2,
    itemStyle: {
      normal: {
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          globalCoord: true // 缺省为 false
        },
        shadowColor: "rgb(23,52,86)",
        shadowOffsetX: 6,
        shadowOffsetY: 6
      },
      emphasis: {
        areaColor: "#389BB7",
        borderWidth: 0
      }
    },
    regions: [
      {
        name: "南海诸岛",
        value: 0,
        itemStyle: {
          normal: {
            opacity: 0,
            label: {
              show: false
            }
          }
        }
      }
    ]
  },
  series: [
    {
      type: "map",
      roam: false,
      // hover是否展示文字
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          borderColor: "rgb(147, 235, 248)",
          borderWidth: 1,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "#09132c" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#274d68" // 100% 处的颜色
              }
            ],
            globalCoord: true // 缺省为 false
          }
        },
        emphasis: {
          areaColor: "#389BB7",
          borderWidth: 0
        }
      },

      zoom: 1.2,
      map: "china",
      data: [
        {
          name: "南海诸岛",
          value: 0,
          itemStyle: {
            normal: { opacity: 0, label: { show: false } }
          }
        }
      ]
    },
    {
      name: "",
      type: "scatter",
      coordinateSystem: "geo",
      symbolSize: 80,
      symbol: `image:///images/btn.png`,
      label: {
        normal: {
          formatter: "{b}",
          position: "",
          show: true,
          color: "black",
          fontWeight: "bold"
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          opacity: 1,
          color: "white"
        }
      },
      data: [
        {
          name: "东北区",
          value: [123.46937, 41.681459]
        },
        {
          name: "华北区",
          value: [116.403039, 39.916458]
        },
        {
          name: "华东区",
          value: [121.478815, 31.228765]
        },
        {
          name: "华中区",
          value: [114.300088, 30.599213]
        },
        {
          name: "大湾区",
          value: [114.118513, 22.332835]
        },
        {
          name: "华南区",
          value: [112.795974, 24.473944]
        },
        {
          name: "华西区",
          value: [104.076356, 30.655574]
        }
      ]
    }
  ]
};
export default options;

import lines from "./lines-coordinate";
import warehouse from "./coordinate-mark";
const warehouseData = [];
// 处理飞线和仓库坐标点颜色对应
function formatting() {
  warehouse.forEach(v => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const markImg = require(`../../../../public/images/supplyChainGroup/mark-${v.rpId}.png`);
    v.data.forEach(e => {
      warehouseData.push({
        // @ts-ignore
        symbol: `image://${markImg}`,
        // @ts-ignore
        value: e.value
      });
    });
  });
}

formatting();

const options = {
  // backgroundColor: "white",
  backgroundColor: "transparent",
  title: {
    left: "left",
    textStyle: {
      color: "#fff"
    }
  },
  geo: {
    map: "china",
    label: {
      emphasis: {
        show: true
      }
    },
    roam: false, // 是否开启鼠标滚轮缩放和左右平移
    zoom: 1.2,
    itemStyle: {
      normal: {
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          globalCoord: true
        },
        shadowColor: "rgb(23,52,86)",
        shadowOffsetX: 15,
        shadowOffsetY: 15
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
      symbol: "circle",
      // hover是否展示文字
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#1DE9B6",
            fontSize: 14
          }
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
      map: "china"
    },
    {
      name: "",
      type: "scatter",
      zlevel: 10,
      coordinateSystem: "geo",
      symbolSize: 40,
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
          color: "rgb(255,251,134)"
        }
      },
      data: warehouseData
    },
    {
      type: "lines",
      zlevel: 2,
      effect: {
        show: true,
        period: 3, // 箭头指向速度，值越小速度越快
        trailLength: 0.4, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: "arrow", // 箭头图标
        symbolSize: 7 // 图标大小
      },
      lineStyle: {
        normal: {
          // color: "rgb(254,251,135)",
          width: 3, // 线条宽度
          opacity: 0.1, // 尾迹线条透明度
          curveness: 0.3 // 尾迹线条曲直度
        }
      },
      data: lines
    }
  ]
};
export default options;

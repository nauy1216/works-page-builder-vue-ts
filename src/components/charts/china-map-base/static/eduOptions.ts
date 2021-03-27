// 教育集团中国地图配置
const educationGroupChinaMap = {
  backgroundColor: "transparent",
  title: {
    left: "left",
    textStyle: {
      color: "#fff"
    }
  },
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "vertical",
    top: "bottom",
    left: "right",
    textStyle: {
      color: "#fff"
    },
    selectedMode: "single"
  },
  geo: {
    // layoutCenter: ['50%', '50%'],
    // layoutSize: 800,
    map: "china",
    // map: 'chongqing',
    label: {
      emphasis: {
        show: false
      }
    },
    roam: false, // 是否开启鼠标滚轮缩放和左右平移
    zoom: 1.2,
    itemStyle: {
      // 地图区域的多边形 图形样式。
      normal: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          // 地图区域的颜色。
          type: "radial", // 径向渐变
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            {
              // 图形的颜色。
              offset: 0,
              color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        shadowColor: "rgba(128, 217, 248, 1)", // 阴影颜色
        shadowOffsetX: -2, // 阴影水平方向上的偏移距离。
        shadowOffsetY: 2, // 阴影垂直方向上的偏移距离。
        shadowBlur: 10 // 图形阴影的模糊大小
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
      symbolSize: 60,
      label: {
        normal: {
          formatter: "{b}",
          position: "",
          show: false,
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
      tooltip: {
        formatter: "{b}",
        textStyle: {
          color: "#fff"
        }
      },
      data: [
        {
          name: "维特国际兽医学院",
          value: [119.921522, 28.457274],
          symbol: `image:///images/educationGroup/education-2.jpg`,
          symbolSize: 30,
          tooltip: {
            formatter: `<div style="width:320px;background:rgba(0,0,0,.4)"><div style="line-height:35px;color:#fff;text-align:center">维特国际兽医学院</div><div><img style="width:100%;height:200px" src="/images/educationGroup/weiteshouyixueyuan.png" alt=""> </div> <div style="color:#fff;margin-top:-20px"> 维特兽医学院是致力于临床兽专科人才培训的国际教育机构,维特力求打造全球兽医专科系列教育第一品牌。 </div> </div>`,
            position: ["40%", "30%"],
            extraCssText: "white-space:pre-wrap"
          }
        },
        {
          name: "铎悦教育",
          value: [113.994688, 22.675051],
          symbol: `image:///images/educationGroup/education-1.jpg`,
          symbolSize: 30,
          tooltip: {
            formatter: `<div style="width:320px;background:rgba(0,0,0,.4)"><div style="line-height:35px;color:#fff;text-align:center">铎悦教育</div><div><img style="width:100%;height:200px" src="/images/educationGroup/education-1.jpg" alt=""> </div> <div style="color:#fff;margin-top:-20px">铎悦教育集团成立于2019年6月28日，是一家由维特国际兽医学院、美联五洲高级兽医学院、知跃大学、湾畔大学组成的线上线下全面覆盖宠物医疗、美容、商业培训，集教育产品研发、教育培训、教育服务等于一体的大型综合性教育科技集团。</div> </div>`,
            position: ["40%", "30%"],
            extraCssText: "white-space:pre-wrap"
          }
        },
        {
          name: "美联五洲高级兽医学院",
          value: [116.40717, 39.90469],
          symbol: `image:///images/educationGroup/education-4.jpg`,
          symbolSize: 30,
          tooltip: {
            formatter: `<div style="width:320px;background:rgba(0,0,0,.4)"><div style="line-height:35px;color:#fff;text-align:center">美联五洲高级兽医学院</div><div><img style="width:100%;height:200px" src="/images/educationGroup/meilianwuzhou.png" alt=""> </div> <div style="color:#fff;margin-top:-20px">美联五洲高级兽医学院是致力于基层兽医临床能力系统提升的综合兽医教育机构，旨在打造中国兽医临床基础系列培训权威品牌。</div> </div>`,
            position: ["40%", "30%"],
            extraCssText: "white-space:pre-wrap"
          }
        },
        {
          name: "知跃大学",
          value: [121.4737, 31.23037],
          symbol: `image:///images/educationGroup/education-3.jpg`,
          symbolSize: 30,
          tooltip: {
            formatter: `<div style="width:320px;background:rgba(0,0,0,.4)"><div style="line-height:35px;color:#fff;text-align:center">知跃大学</div><div><img style="width:100%;height:200px" src="/images/educationGroup/zhiyuexueyuan.png" alt=""> </div> <div style="color:#fff;margin-top:-20px">知跃大学APP于2019年5月上线，是一所服务宠物行业终身学习者的创新大学。</div> </div>`,
            position: ["40%", "30%"],
            extraCssText: "white-space:pre-wrap"
          }
        }
      ]
    }
  ]
};

export default educationGroupChinaMap;

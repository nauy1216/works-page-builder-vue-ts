// 地图飞线
const lines = [
  // {
  //   coords: [
  //     // 吉林-辽宁
  //     [125.909983, 43.327806],
  //     [123.4051, 41.379519]
  //   ]
  // },
  // {
  //   coords: [
  //     // 吉林-黑龙江
  //     [125.909983, 43.327806],
  //     [128.019358, 46.075737]
  //   ]
  // }
  {
    rpArea: "东北区",
    rpId: 1,
    coords: [
      // 黑龙江-辽宁
      [128.019358, 46.075737],
      [123.4051, 41.379519]
    ]
  },
  {
    rpArea: "西北区",
    rpId: 1,
    coords: [
      // 兰州-乌鲁木齐
      [103.05842, 37.49516],
      [87.765451, 41.032368]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "西北区",
    rpId: 1,
    coords: [
      // 兰州-青海
      [103.05842, 37.49516],
      [96.378733, 36.477212]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "西北区",
    rpId: 1,
    coords: [
      // 兰州-内蒙古
      [103.05842, 37.49516],
      [107.321115, 40.366041]
    ]
  },
  {
    rpArea: "西北区",
    rpId: 1,
    coords: [
      // 兰州-宁夏
      [103.05842, 37.49516],
      [106.398264, 37.947046]
    ],
    lineStyle: {
      curveness: 0.1
    }
  },
  {
    rpArea: "西北区",
    rpId: 1,
    coords: [
      // 兰州-山西
      [103.05842, 37.49516],
      [112.24299, 37.320625]
    ],
    lineStyle: {
      curveness: 0.1
    }
  },
  {
    rpArea: "西北区",
    rpId: 1,
    coords: [
      // 兰州-陕西
      [103.05842, 37.49516],
      [108.903147, 35.194719]
    ],
    lineStyle: {
      curveness: 0.1
    }
  },
  {
    rpArea: "华北大区",
    rpId: 3,
    coords: [
      // 北京-石家庄
      [116.46174, 40.399515],
      [115.538889, 38.46502]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华北大区",
    rpId: 3,
    coords: [
      // 北京-山东
      [116.46174, 40.399515],
      [117.560373, 36.935218]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华北大区",
    rpId: 3,
    coords: [
      // 北京-天津
      [116.46174, 40.399515],
      [117.296701, 39.523779]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华东二区",
    rpId: 2,
    coords: [
      // 安徽-浙江
      [118.043772, 30.224223],
      [120.021311, 29.691191]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华东二区",
    rpId: 2,
    coords: [
      // 安徽-福建
      [118.043772, 30.224223],
      [117.955881, 26.748836]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华中大区",
    rpId: 3,
    coords: [
      // 武汉-河南
      [113.121897, 31.506709],
      [113.56135, 33.177365]
    ],
    lineStyle: {
      curveness: 0.2
    }
  },
  {
    rpArea: "华中大区",
    rpId: 3,
    coords: [
      // 武汉-湖南
      [113.121897, 31.506709],
      [111.49592, 28.655201]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华中大区",
    rpId: 3,
    coords: [
      // 武汉-湖南
      [113.121897, 31.506709],
      [115.890451, 28.578046]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华西大区",
    rpId: 2,
    coords: [
      // 成都-羌族自治州
      [103.981272, 30.148251],
      [102.355295, 31.992506]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华西大区",
    rpId: 2,
    coords: [
      // 成都-云南
      [103.981272, 30.148251],
      [101.56428, 25.386999]
    ],
    lineStyle: {
      curveness: -0.2
    }
  },
  {
    rpArea: "华西大区",
    rpId: 2,
    coords: [
      // 成都-贵州
      [103.981272, 30.148251],
      [106.222483, 26.178401]
    ],
    lineStyle: {
      curveness: 0.2
    }
  },
  {
    rpArea: "华西大区",
    rpId: 2,
    coords: [
      // 成都-重庆
      [103.981272, 30.148251],
      [107.804514, 30.319106]
    ],
    lineStyle: {
      curveness: 0.2
    }
  },
  {
    rpArea: "华南大区",
    rpId: 1,
    coords: [
      // 广东-海南
      [113.693186, 23.385914],
      [110.045725, 19.625295]
    ],
    lineStyle: {
      curveness: 0.2
    }
  },
  {
    rpArea: "华南大区",
    rpId: 1,
    coords: [
      // 海南-广西
      [110.045725, 19.625295],
      [108.947092, 24.310345]
    ],
    lineStyle: {
      curveness: 0.2
    }
  },
  {
    rpArea: "华南大区",
    rpId: 1,
    coords: [
      // 广西-广东
      [108.947092, 24.310345],
      [113.693186, 23.385914]
    ],
    lineStyle: {
      curveness: 0.2
    }
  }
];

function setLineColor() {
  lines.forEach(v => {
    // @ts-ignore
    v.lineStyle = {
      // @ts-ignore
      curveness: v.lineStyle?.curveness,
      color: v.rpId === 1 ? "rgb(31,233,182)" : v.rpId === 2 ? "rgb(42,170,249)" : "rgb(251,145,93)"
    };
  });
}
setLineColor();
export default lines;

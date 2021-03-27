<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { ComponentData } from "./componentData";
import hospitalIncomes from "./options/hospitalIncome";
import shoopIncomeOption from "./options/shoopIncome";
import Chart from "./Chart.vue";
import mockData from "./data";

@Component({
  name: "RpBrandMatrixSide",
  components: {
    Chart
  }
})
export default class RpBrandMatrixSide extends BaseVue<ComponentData> {
  @Prop({
    type: Object,
    default: () => {
      return {
        id: "18",
        img: "http://10.1.234.4/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-49.png",
        name: "凯特喵"
      };
    }
  })
  brandData: any;

  isShow = false;
  showImg = false;
  imgs = require("./imgs/noContent.png");
  hospitalIncomes = {};
  shoopIncomeOption: any = {};
  title = "爱诺动物医院";
  introduceData = [
    {
      id: 1,
      img: require("./imgs/yinshou.png"),
      title: "营收",
      totalName: "总营收",
      Total: 235641,
      sameMonth: "当月营收",
      sameNum: 321,
      unit1: "元",
      unit2: "元"
    },
    {
      id: 2,
      img: require("./imgs/yusuan.png"),
      title: "预期目标",
      totalName: "总目标",
      Total: 1244257,
      sameMonth: "完成进度",
      sameNum: "35",
      unit1: "元",
      unit2: ""
    },
    {
      id: 3,
      img: require("./imgs/bl.png"),
      title: "病例数",
      totalName: "总病例数",
      Total: 325124,
      sameMonth: "当月病例数",
      sameNum: 32145,
      unit1: "例",
      unit2: "例"
    },
    {
      id: 4,
      img: require("./imgs/dd.png"),
      title: "单店平均",
      totalName: "年平均",
      Total: 9142441,
      sameMonth: "当月营收",
      sameNum: 132155,
      unit1: "元",
      unit2: "元"
    }
  ];
  // 此处用于过滤处理
  companyName = "瑞鹏";
  currentPageData: any = null;
  brandMatrixData: any = null;

  mounted() {
    this.getData();
  }

  setCurrentPageData({ revenue, anticipation, caseLoad, averageRevenue, salesRecord, revenueDistribution }) {
    // this.setName(revenue);
    this.setRevenue(revenue);
    this.setAnticipation(anticipation);
    this.setAaseLoad(caseLoad);
    this.setAverageRevenue(averageRevenue);
    this.setSalesRecord(salesRecord);
    this.setRevenueDistribution(revenueDistribution);
  }

  getData() {
    this.title = String(this.brandData.name) || "爱诺动物医院";
    this.brandMatrixData = mockData.brandMatrix;
    this.upDataMedicalData(mockData.brandMatrix);
  }

  upDataMedicalData(res) {
    this.currentPageData = res;
    this.setCurrentPageData(res);
  }

  // 营收
  setRevenue(data) {
    const monthRev = data.monthlyRevenue.list; // 当月营收
    const totalRev = data.totalRevenue.list; // 总营收
    Object.keys(monthRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[0].sameNum = monthRev[key];
      }
    });
    Object.keys(totalRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[0].Total = totalRev[key];
      }
    });
  }

  // 预期目标
  setAnticipation(data) {
    const monthRev = data.completeProgress.list; // 预期目标
    const totalRev = data.objectives.list; // 总目标
    Object.keys(monthRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[1].sameNum = monthRev[key];
      }
    });
    Object.keys(totalRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[1].Total = totalRev[key];
      }
    });
  }

  // 病例数
  setAaseLoad(data) {
    const monthRev = data.monthlyCaseLoad.list; // 当月病例数
    const totalRev = data.caseLoads.list; // 总病例数
    Object.keys(monthRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[2].sameNum = monthRev[key];
      }
    });
    Object.keys(totalRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[2].Total = totalRev[key];
      }
    });
  }

  // 单店平均
  setAverageRevenue(data) {
    const monthRev = data.monthlyAverage.list; // 当月营收
    const totalRev = data.meanAnnual.list; // 年平均
    Object.keys(monthRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[3].sameNum = monthRev[key];
      }
    });
    Object.keys(totalRev).forEach(key => {
      if (key === this.title) {
        this.introduceData[3].Total = totalRev[key];
      }
    });
  }

  // 营收分布
  setRevenueDistribution(data) {
    if (data.optionData[this.title] === undefined) {
      this.showImg = true;
    } else {
      this.showImg = false;
      shoopIncomeOption.series[0].data.forEach((v, i) => {
        v.value = parseInt(data.optionData[this.title].data[i]);
      });
      this.shoopIncomeOption = shoopIncomeOption;
    }
  }

  // 营收新高
  setSalesRecord(data) {
    if (data.optionData[this.title] === undefined) {
      this.isShow = true;
    } else {
      this.isShow = false;
      const compName = data.optionData[this.title].name.slice(0, 10);
      const compNum = data.optionData[this.title].data.slice(0, 10);
      hospitalIncomes.series[0].data = compNum;
      hospitalIncomes.yAxis.data = compName;
      this.hospitalIncomes = hospitalIncomes;
    }
  }

  // 更换公司名称
  // setName(data) {
  //   const nameObj = data.monthlyRevenue.list;
  //   for (const key in nameObj) {
  //     if (key === this.title) {
  //       // this.title = this.title;
  //       break;
  //     }
  //   }
  // }

  beforeRouteUpdate(to) {
    this.title = to.query.name;
    this.setCurrentPageData(this.currentPageData);
  }

  activated() {
    this.title = String(this.brandData.name) || "爱诺动物医院";
    if (this.brandMatrixData) {
      this.upDataMedicalData(this.brandMatrixData);
    }
  }

  render() {
    return (
      <div class="rp-brand-matrix-side">
        <div class="header">
          <div class="big-title">{this.title}</div>
          <div class="introduce">
            {this.introduceData.map((item, index) => {
              return (
                <div class="introduce-item" key={index}>
                  <div class="img-box ft-lf">
                    <img src={item.img} alt="" />
                  </div>
                  <div class="info-box ft-rg">
                    <div class="title">{item.title}</div>
                    <div class="hospital-info">
                      <div class="info-num ft-lf">
                        <p>{item.totalName}</p>
                        <p>
                          {item.Total}
                          {item.unit1}
                        </p>
                      </div>
                      <div class="info-num ft-rg">
                        <p>{item.sameMonth}</p>
                        <p>
                          {item.sameNum}
                          {item.unit2}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div class="chart-content">
          <div class="chart-region">
            <div class="region-left">
              <div class="region-img" v-show={this.isShow}>
                <img class="regionImg" src={this.imgs} alt="" />
                <p class="tips">暂无数据</p>
              </div>
              <chart option={hospitalIncomes} v-show={!this.isShow}></chart>
            </div>
            <div class="region-right">
              <div class="region-img" v-show={this.showImg}>
                <img class="regionImg" src={this.imgs} alt="" />
                <p class="tips">暂无数据</p>
              </div>
              <chart option={shoopIncomeOption} v-show={!this.showImg}></chart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@include b(brand-matrix-side) {
  // background: #041525;
  padding: 0 120px;
  box-sizing: border-box;
  color: #fff;
  .header {
    width: 100%;
    height: 387px;
    .big-title {
      height: 210px;
      font-size: 38px;
      color: #fff;
      text-align: center;
      line-height: 210px;
    }
    .introduce {
      height: 116px;
      width: 100%;
      display: flex;
      justify-content: center;
      .introduce-item {
        width: 300px;
        height: 85%;
        background: #0e283fff;
        float: left;
        color: #cef5f2ff;
        margin: 0 0.12rem;
        padding-top: 0.15rem;
        .img-box {
          width: 42px;
          height: 42px;
          margin-left: 18px;
          border-radius: 50%;
          padding: 16px;
          background: #0d3356ff;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        .info-box {
          width: 66%;
          height: 80%;
          .title {
            height: 32px;
            font-size: 22px;
            line-height: 18px;
          }
          .hospital-info {
            height: 70%;
            .info-num {
              width: 48%;
              height: 90%;
              font-size: 13px;
              line-height: 28px;
            }
          }
        }
      }
    }
  }
  .chart-content {
    text-align: center;
    .region-img {
      width: 100%;
      height: 3rem;
      .regionImg {
        width: 40%;
        display: block;
        margin: 17% auto;
      }
    }
    .tips {
      font-size: 32px;
      color: #ccc;
      margin-top: 112px;
    }
    .chart-region {
      width: 100%;
      height: 710px;
      .region-left {
        height: 100%;
        width: 48%;
        float: left;
      }
      .region-right {
        height: 100%;
        width: 48%;
        float: right;
      }
    }
  }

  .ft-lf {
    float: left;
  }
  .ft-rg {
    float: right;
  }
  .tp1 {
    margin-top: 82px;
  }
}
</style>

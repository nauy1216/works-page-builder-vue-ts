<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import MapChart from "../BaseMapChart";
// @ts-ignore
import chinaJson from "echarts/map/json/china.json"; // 省
// @ts-ignore
import chinaCities from "echarts/map/json/china-cities.json"; // 市
import { px2rem, deepClone, transformProvince } from "shared/utils";
import rpCity from "./static/rp-city";
import eduOptions from "./static/eduOptions";
// echarts城市名称label
interface Cityslabel {
  name: string;
  value: Array<number | string>;
  symbolSize: number;
  symbol?: string;
  adcode?: number;
  label?: {
    [key: string]: number | string;
  };
  phoneNumber?: string;
  isHostpitalMark?: boolean;
}
// 图形
interface Features {
  type: string;
  properties: {
    childNum: number;
    cp: Array<number>;
    // 城市名称
    name: string;
    // 阿里巴巴地图 centroid地图中心店
    centroid: Array<number>;
    adcode: number;
  };
  id: string;
  geometry: {
    coordinates: Array<Array<number>>;
    encodeOffsets: Array<Array<number>>;
    type: string;
  };
}

// 图形集合
interface FeaturesPolygon {
  UTF8Encoding?: boolean;
  features: Array<Features>;
  type: string;
}

// 医院分布
interface HospitalDistrict {
  // 品牌名称
  brand: string;
  // 品牌logo
  brand_logo: string;
  city: string;
  // 所属区
  county: string;
  id: number | string;
  name: string;
  // 医院联系座机
  phone_number: string;
  // 所属大区
  region: string;
  // 经纬度
  value: string;
}
const SPECIAL_NAME = "大湾区";
@Component({
  name: "RpChinaMapBase"
})
export default class RpChinaMapBase extends MapChart {
  gather: any = {
    华西区: ["新疆", "青海", "陕西", "重庆", "四川", "贵州"],
    东北区: ["黑龙江", "辽宁", "吉林", "内蒙古"],
    华北区: ["河北", "北京", "山东", "山西", "天津"],
    华东区: ["安徽", "江苏", "福建", "浙江", "上海"],
    华南区: ["广东", "海南", "广西"],
    华中区: ["河南", "江西", "湖北", "湖南"],
    大湾区: ["深圳", "东莞", "惠州"]
  };
  region: string | undefined;
  city: string | undefined;
  county: string | undefined;
  // 缓存区县包含的数据，获取区县数据会用到
  cacheCityCollection!: FeaturesPolygon | undefined;
  // 直辖市,直辖市地图数据需要手动合并
  municipality: Array<string> = ["北京", "上海", "重庆", "天津"];
  // 大湾区，自定义的特殊区域
  specialArea!: ["深圳", "东莞", "惠州"];
  @Prop({
    type: Boolean
  })
  nextLevel!: boolean;

  @Prop({
    type: Number
  })
  mapType!: number;

  @Watch("mapType")
  setMapType(newValue) {
    // 0 标准地图 1 教育集团地图
    this.resetMap();
    if (newValue === 0) {
      this.setStandardMap();
    } else if (newValue === 1) {
      this.setEduMap();
    }
  }
  mounted() {
    const node = this.$refs.chart as HTMLElement;
    this.init(node);
    this.setStandardMap();
  }

  get chinaMap() {
    return deepClone({ ...this.componentData });
  }

  get setSwiperSize() {
    return {
      width: px2rem(this.width),
      height: px2rem(this.height)
    };
  }
  get chinaCities() {
    return { ...chinaCities };
  }

  // 设置标准地图
  public setStandardMap() {
    this.registerMapEvent("china", chinaJson as any);
    this.chart.setOption(this.componentData);
    this.chart.off("click");
    this.chart.on("click", context => {
      this.mapClickEvent(context);
    });
  }
  // 设置教育集团地图
  public setEduMap() {
    this.registerMapEvent("china", chinaJson as any);
    this.chart.setOption(eduOptions as any);
  }
  public registerMapEvent(name: string, data: FeaturesPolygon): void {
    this.echarts.registerMap(name, data);
  }

  public mapClickEvent(context: any): void {
    // 是否开启下钻
    if (!this.nextLevel) return;
    // 初始地图第一次点击
    if (context.data?.isHostpitalMark) {
      // 点击医院的标记点，展示电话弹窗
      alert("点击了mark标记");
      return;
    }

    if (!this.region) {
      const districtName = context.name in this.gather ? context.name : null;
      // 无效点击区域
      if (!districtName) return;
      // 大湾区是深圳、东莞、惠州，需要单独合并地图
      if (context.name === "大湾区") {
        this.setSpecialArea();
      } else {
        // 展示大区下的市区
        this.mergeProvinces(districtName, this.gather[districtName]);
      }

      this.region = districtName;
    } else if (this.region && !this.city) {
      // 获取区数据
      this.getDistrict(context.name);
    } else if (this.region && this.city && !this.county) {
      this.getCountyData(context.name);
    }
  }
  // 设置大湾区
  setSpecialArea() {
    // 先从城市地图中筛选出来深圳，东莞，惠州的地图图形polygon
    let features = [];
    const data: Array<Cityslabel> = [];
    const chinaCitiesClone = deepClone(chinaCities);

    chinaCitiesClone.features.forEach(v => {
      const cityName = v.properties.name;
      if (cityName === "深圳" || cityName === "东莞" || cityName === "惠州") {
        features = features.concat(v);
        data.push({
          name: cityName,
          value: v.properties.cp,
          symbolSize: 1,
          label: {
            fontSize: 30,
            color: "#fff"
          }
        });
      }
    });
    const newFeature: FeaturesPolygon = {
      type: "FeatureCollection",
      features: features,
      UTF8Encoding: true
    };
    // 手动调整位置大小

    this.chart.clear();
    this.registerMapEvent(SPECIAL_NAME, newFeature);
    const chinaMapClone = deepClone(this.chinaMap);
    chinaMapClone.geo.layoutCenter = ["50%", "70%"];
    // chinaMapClone.geo.layoutSize = 1350;
    chinaMapClone.geo.map = SPECIAL_NAME;
    chinaMapClone.series[1].data = data;
    chinaMapClone.series[0].map = SPECIAL_NAME;
    this.chart.setOption(chinaMapClone);
  }
  // 合并直辖市，直辖市需要手动合并为一个完整的市
  mergeMunicipalityCity(cityName: string): FeaturesPolygon {
    // 从chinaJson找到对应已经解码的直辖市
    const safeChinaJson = deepClone(chinaJson);
    return safeChinaJson.features.filter(v => v.properties.name === cityName);
  }

  public mergeProvinces(districtName: string, districtLists: Array<any>): void {
    // features 所有图形手动拼接
    let features: Array<FeaturesPolygon> = [];
    // 直辖市图形
    const municipalityPolygon: Array<FeaturesPolygon> = [];
    for (let i = 0; i < districtLists.length; i++) {
      const cityName = districtLists[i];
      const isIncludeMun = this.municipality.some(v => v === cityName);
      if (isIncludeMun) {
        const municipalityPolygons = this.mergeMunicipalityCity(cityName) as FeaturesPolygon;
        municipalityPolygon.push(municipalityPolygons);
      } else {
        const province = this.requireMap(transformProvince(districtLists[i]));
        features = features.concat(province.features);
      }
    }
    // 手动解码,省份是解码的，市区是编码的,先把市区手动解码然后合并,直辖市单独拼接合并
    // 解码市区
    const newFeature: FeaturesPolygon = this.decode({
      type: "FeatureCollection",
      features: features,
      UTF8Encoding: false
    });
    // 先拼接在decode会出错,decode之后再拼接直辖市数据
    newFeature.features = newFeature.features.concat(...(municipalityPolygon as Array<any>));
    // registerMap地图注册中的name必须和geo.map,series[0].map名称相同，不然会出现绘制多个区域
    this.registerMapEvent(districtName, newFeature);
    this.chinaMap.geo.map = districtName;
    this.chinaMap.series[0].map = districtName;
    // 二级城市需要手动筛选展示，不然会出现全部城市名字都被展示
    const citys = this.getProviceCity(districtName);
    // 切换原来展示的大区文字，设置为城市label
    this.chinaMap.series[1].data = citys;
    this.chart.setOption(this.chinaMap);
  }

  // 获取城市
  public getProviceCity(name: string): Array<Cityslabel> {
    const citys: Array<Cityslabel> = [];
    const data = rpCity.filter(v => v.region === name);
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.chinaCities.features.length; j++) {
        const name = this.chinaCities.features[j].properties.name;
        const cp = this.chinaCities.features[j].properties.cp;
        if (data[i].city === name) {
          citys.push({
            name: name,
            value: cp,
            symbolSize: 1,
            label: {
              fontSize: 18,
              color: "#fff"
            }
          });
        }
      }
    }
    return citys;
  }
  // 获取区级、医院分布点信息
  public getDistrict(cityName: string) {
    this.city = cityName;
    // 调接口根据编码查询区级别数据。先去城市地图查找对应编码，根据编码查询区级城市地图geo,直辖市直接展示城市
    const districtCode = this.chinaCities.features.filter(v => cityName.includes(v.properties.name))[0].id;

    // 获取区级别地图JSON数据
    const getDistrictPolygon = this.getJsonPolygon("city", districtCode);
    // 获取区级别医院分布信息
    const getHospitalDistrict = this.getHospitalInfo("city", cityName);
    Promise.all<FeaturesPolygon, Array<HospitalDistrict>>([getDistrictPolygon, getHospitalDistrict]).then(res => {
      const echartsDistrictPolygon: Array<Cityslabel> = [];
      const echartsHospital: Array<Cityslabel> = [];
      // 处理区级别地图区域，将返回的格式处理为echarts能识别的格式
      res[0].features.map(v => {
        echartsDistrictPolygon.push({
          name: v.properties.name,
          value: v.properties.centroid,
          adcode: v.properties.adcode,
          symbolSize: 1,
          label: {
            fontSize: 14,
            color: "#fff"
          }
        });
      });

      // 处理医院数据
      res[1].map(v => {
        echartsHospital.push({
          name: v.name,
          value: v.value.split(","),
          symbol: `image://http://10.1.234.4${v.brand_logo}`,
          symbolSize: 30,
          phoneNumber: v.phone_number,
          isHostpitalMark: true
        });
      });
      this.chinaMap.series[1].data = echartsDistrictPolygon;
      this.setMapPolygonAndMark(cityName, echartsHospital, res[0]);
    });
  }

  // 设置地图医院标记点
  public setPolygonMark(echartsHospital: Array<Cityslabel>): any {
    const chinaMap = deepClone(this.chinaMap);
    chinaMap.series.push({
      type: "scatter",
      symbol: "pin",
      coordinateSystem: "geo",
      symbolSize: 25,
      data: echartsHospital
    });
    return chinaMap;
  }

  // 获取县级地图数据以及医院分布点信息
  public getCountyData(countyName: string): void {
    this.county = countyName;
    const filterCounty = this.cacheCityCollection!.features.filter(v => v.properties.name === countyName);
    const countyCode = filterCounty[0].properties.adcode;
    // 获取区级别地图JSON数据
    const countyPolygon = this.getJsonPolygon("county", countyCode);
    // 获取区级别医院分布信息
    const hospitalDistrict = this.getHospitalInfo("county", this.city, countyName);
    this.chart.clear();
    Promise.all<FeaturesPolygon, Array<HospitalDistrict>>([countyPolygon, hospitalDistrict]).then(res => {
      // 重新注册地图区域
      const echartsHospital: Array<Cityslabel> = [];
      res[1].map(v => {
        echartsHospital.push({
          name: v.name,
          value: v.value.split(","),
          symbol: `image://http://10.1.234.4${v.brand_logo}`,
          symbolSize: 30,
          phoneNumber: v.phone_number,
          isHostpitalMark: true
        });
      });
      this.setMapPolygonAndMark(countyName, echartsHospital, res[0]);
    });
  }
  // 设置地图数据
  public setMapPolygonAndMark(name: string, echartsHospital: Array<Cityslabel>, polygon: FeaturesPolygon) {
    // 重新注册地图区域
    this.registerMapEvent(name, polygon);
    // 设置geo
    this.chinaMap.geo.map = name;
    this.chinaMap.geo.zoom = 1.2;
    // 设置series中的地图
    this.chinaMap.series[0].map = name;

    const map = this.setPolygonMark(echartsHospital);
    this.chart.setOption(map);
  }
  // 获取地图JSON数据 带有_full为区级别所有，不带是单独的一个区或者县数据
  public getJsonPolygon(level: string, code: string | number) {
    return new Promise<FeaturesPolygon>((resolve, reject) => {
      let codeApi = `${this.$api.map}`;
      if (level === "city") {
        codeApi = `${codeApi}${code}_full.json`;
      } else {
        codeApi = `${codeApi}/area/${code}.json`;
      }

      this.$ajax
        .get<FeaturesPolygon>(codeApi)
        .then(data => {
          resolve(data as FeaturesPolygon);
          if (level === "city") {
            this.cacheCityCollection = data as FeaturesPolygon;
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // 获取医院信息数据
  public getHospitalInfo(level: string, cityName?: string, countyName?: string) {
    return new Promise<Array<HospitalDistrict>>((resolve, reject) => {
      // 医院返回的数据有"市",ehcrats没有，需要手动处理
      const formattCityName = this.municipality.concat(this.specialArea);
      formattCityName.map(v => {
        if (cityName === v) {
          cityName = `${cityName}市`;
        }
      });
      // 之后修改接口地址
      this.$ajax
        .get<HospitalDistrict>(this.$api.mapHospital)
        .then(
          ({
            homepage: {
              homePageCenter: { homepageMap }
            }
          }) => {
            let data: Array<HospitalDistrict> = [];
            if (level === "city") {
              data = homepageMap.filter(v => v.region === this.region && v.city === cityName);
            } else if (level === "county") {
              data = homepageMap.filter(v => v.region === this.region && v.city === cityName && v.county === countyName);
            }
            resolve(data);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  }
  // 动态加载echarts中的城市json包数据
  public requireMap(name: string): any {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cityJson = require(`echarts/map/json/province/${name}.json`);
    const safeMap = deepClone(cityJson);
    return safeMap;
  }
  // 重置地图
  resetMap() {
    this.chart.clear();
    this.registerMapEvent("china", chinaJson as any);
    if (this.mapType === 0) {
      this.chart.setOption(this.componentData);
    } else if (this.mapType === 1) {
      this.chart.setOption(eduOptions as any);
    }
    this.region = undefined;
    this.city = undefined;
    this.county = undefined;
    this.cacheCityCollection = undefined;
  }
  // 解码市区数据
  public decode(json) {
    let encodeScale = json.UTF8Scale;
    if (encodeScale == null) {
      encodeScale = 1024;
    }

    const features = json.features;

    for (let f = 0; f < features.length; f++) {
      const feature = features[f];
      const geometry = feature.geometry;
      const coordinates = geometry.coordinates;
      const encodeOffsets = geometry.encodeOffsets;

      for (let c = 0; c < coordinates.length; c++) {
        const coordinate = coordinates[c];

        if (geometry.type === "Polygon") {
          coordinates[c] = this.decodePolygon(coordinate, encodeOffsets[c], encodeScale);
        } else if (geometry.type === "MultiPolygon") {
          for (let c2 = 0; c2 < coordinate.length; c2++) {
            const polygon = coordinate[c2];
            coordinate[c2] = this.decodePolygon(polygon, encodeOffsets[c][c2], encodeScale);
          }
        }
      }
    }
    // Has been decoded
    json.UTF8Encoding = false;
    return json;
  }
  // 解码地图
  public decodePolygon(coordinate: any, encodeOffsets: Array<number>, encodeScale: number): Array<any> {
    const result: Array<Array<number>> = [];
    let prevX = encodeOffsets[0];
    let prevY = encodeOffsets[1];

    for (let i = 0; i < coordinate.length; i += 2) {
      let x = coordinate.charCodeAt(i) - 64;
      let y = coordinate.charCodeAt(i + 1) - 64;
      // ZigZag decoding
      x = (x >> 1) ^ -(x & 1);
      y = (y >> 1) ^ -(y & 1);
      // Delta deocding
      x += prevX;
      y += prevY;

      prevX = x;
      prevY = y;
      // Dequantize
      result.push([x / encodeScale, y / encodeScale]);
    }

    return result;
  }
  render() {
    return (
      <div class="rp-chart-wrapper">
        <div
          ref="chart"
          onDblclick={() => {
            this.resetMap();
          }}
          class="rp-chart-wrapper__chart"
          style={this.setSwiperSize}></div>
      </div>
    );
  }
}
</script>

<style lang="scss">
@include b(chart-wrapper) {
  position: relative;
  width: 100%;
  height: 100%;
  @include e(swiper) {
    width: 100%;
    height: 100%;
  }
  @include e(chart) {
    width: 100%;
    height: 100%;
  }
  @include e(btn) {
    position: absolute;
    top: 50%;
    z-index: 99;
    @include m(left) {
      left: 0;
    }
    @include m(right) {
      right: 0;
    }
  }
}
.el-carousel__container {
  height: 100% !important;
}
.el-carousel {
  height: 100% !important;
}
</style>

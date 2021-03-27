/**
 *  1、这个文件是动态生成的， 执行npm run build:file即可。
 *  2、请不要手动写这里的代码， 将会被覆盖。
 *  3、在config.json字段private数组包含的组件不会导出。
 */
import RpKeyValueBox from "./base/key-value-box/index.vue";
import RpKeyValueBoxConfig from "./base/key-value-box/config";
import RpBarChartCol from "./charts/bar-chart-col/index.vue";
import RpBarChartColConfig from "./charts/bar-chart-col/config";
import RpBusinPieChart from "./charts/busin-pie-chart/index.vue";
import RpBusinPieChartConfig from "./charts/busin-pie-chart/config";
import RpChinaMapBase from "./charts/china-map-base/index.vue";
import RpChinaMapBaseConfig from "./charts/china-map-base/config";
import RpChinaMapSupplyChain from "./charts/china-map-supplyChain/index.vue";
import RpChinaMapSupplyChainConfig from "./charts/china-map-supplyChain/config";
import RpCircleRing from "./charts/circle-ring/index.vue";
import RpCircleRingConfig from "./charts/circle-ring/config";
import RpBrandFamily from "./expand/brand-family/index.vue";
import RpBrandFamilyConfig from "./expand/brand-family/config";
import RpBrandMatrix from "./expand/brand-matrix/index.vue";
import RpBrandMatrixConfig from "./expand/brand-matrix/config";
import RpBrandMatrixSide from "./expand/brand-matrix-side/index.vue";
import RpBrandMatrixSideConfig from "./expand/brand-matrix-side/config";
import RpCircleCombination from "./expand/circle-combination/index.vue";
import RpCircleCombinationConfig from "./expand/circle-combination/config";
import RpCounter from "./expand/counter/index.vue";
import RpCounterConfig from "./expand/counter/config";
import RpDialRouter from "./expand/dial-router/index.vue";
import RpDialRouterConfig from "./expand/dial-router/config";
import RpEduCollegeProfile from "./expand/edu-college-profile/index.vue";
import RpEduCollegeProfileConfig from "./expand/edu-college-profile/config";
import RpEduKeyvalProgress from "./expand/edu-keyval-progress/index.vue";
import RpEduKeyvalProgressConfig from "./expand/edu-keyval-progress/config";
import RpEduTeachersCount from "./expand/edu-teachers-count/index.vue";
import RpEduTeachersCountConfig from "./expand/edu-teachers-count/config";
import RpExpertsTeam from "./expand/experts-team/index.vue";
import RpExpertsTeamConfig from "./expand/experts-team/config";
import RpGoldTeachers from "./expand/gold-teachers/index.vue";
import RpGoldTeachersConfig from "./expand/gold-teachers/config";
import RpGoldTeachers3DShow from "./expand/gold-teachers-3D-show/index.vue";
import RpGoldTeachers3DShowConfig from "./expand/gold-teachers-3D-show/config";
import RpHeadLine from "./expand/head-line/index.vue";
import RpHeadLineConfig from "./expand/head-line/config";
import RpHomeEduAndnetValbox from "./expand/home-eduAndnet-valbox/index.vue";
import RpHomeEduAndnetValboxConfig from "./expand/home-eduAndnet-valbox/config";
import RpHomeSupAndmedProgress from "./expand/home-supAndmed-progress/index.vue";
import RpHomeSupAndmedProgressConfig from "./expand/home-supAndmed-progress/config";
import RpMedicalAreaRecordProgress from "./expand/medical-area-record-progress/index.vue";
import RpMedicalAreaRecordProgressConfig from "./expand/medical-area-record-progress/config";
import RpMedicalClassCountTable from "./expand/medical-class-count-table/index.vue";
import RpMedicalClassCountTableConfig from "./expand/medical-class-count-table/config";
import RpMedicalCustomerAnalysis from "./expand/medical-customer-analysis/index.vue";
import RpMedicalCustomerAnalysisConfig from "./expand/medical-customer-analysis/config";
import RpMedicalRevenueDistribute from "./expand/medical-revenue-distribute/index.vue";
import RpMedicalRevenueDistributeConfig from "./expand/medical-revenue-distribute/config";
import RpMedicalSaleProgress from "./expand/medical-sale-progress/index.vue";
import RpMedicalSaleProgressConfig from "./expand/medical-sale-progress/config";
import RpMedicalSystem from "./expand/medical-system/index.vue";
import RpMedicalSystemConfig from "./expand/medical-system/config";
import RpReviewPast from "./expand/review-past/index.vue";
import RpReviewPastConfig from "./expand/review-past/config";
import RpSidebarRight from "./expand/sidebar-right/index.vue";
import RpSidebarRightConfig from "./expand/sidebar-right/config";
import RpSubTitle from "./expand/sub-title/index.vue";
import RpSubTitleConfig from "./expand/sub-title/config";
import RpSupKeyvaluesBox from "./expand/sup-keyvalues-box/index.vue";
import RpSupKeyvaluesBoxConfig from "./expand/sup-keyvalues-box/config";

export const componentcategory = {
  base: { name: "基础组件", components: { RpKeyValueBox } },
  charts: { name: "图表组件", components: { RpBarChartCol, RpBusinPieChart, RpChinaMapBase, RpChinaMapSupplyChain, RpCircleRing } },
  expand: {
    name: "业务组件",
    components: {
      RpBrandFamily,
      RpBrandMatrix,
      RpBrandMatrixSide,
      RpCircleCombination,
      RpCounter,
      RpDialRouter,
      RpEduCollegeProfile,
      RpEduKeyvalProgress,
      RpEduTeachersCount,
      RpExpertsTeam,
      RpGoldTeachers,
      RpGoldTeachers3DShow,
      RpHeadLine,
      RpHomeEduAndnetValbox,
      RpHomeSupAndmedProgress,
      RpMedicalAreaRecordProgress,
      RpMedicalClassCountTable,
      RpMedicalCustomerAnalysis,
      RpMedicalRevenueDistribute,
      RpMedicalSaleProgress,
      RpMedicalSystem,
      RpReviewPast,
      RpSidebarRight,
      RpSubTitle,
      RpSupKeyvaluesBox
    }
  }
};

export const componentsConfig = {
  RpKeyValueBox: RpKeyValueBoxConfig,
  RpBarChartCol: RpBarChartColConfig,
  RpBusinPieChart: RpBusinPieChartConfig,
  RpChinaMapBase: RpChinaMapBaseConfig,
  RpChinaMapSupplyChain: RpChinaMapSupplyChainConfig,
  RpCircleRing: RpCircleRingConfig,
  RpBrandFamily: RpBrandFamilyConfig,
  RpBrandMatrix: RpBrandMatrixConfig,
  RpBrandMatrixSide: RpBrandMatrixSideConfig,
  RpCircleCombination: RpCircleCombinationConfig,
  RpCounter: RpCounterConfig,
  RpDialRouter: RpDialRouterConfig,
  RpEduCollegeProfile: RpEduCollegeProfileConfig,
  RpEduKeyvalProgress: RpEduKeyvalProgressConfig,
  RpEduTeachersCount: RpEduTeachersCountConfig,
  RpExpertsTeam: RpExpertsTeamConfig,
  RpGoldTeachers: RpGoldTeachersConfig,
  RpGoldTeachers3DShow: RpGoldTeachers3DShowConfig,
  RpHeadLine: RpHeadLineConfig,
  RpHomeEduAndnetValbox: RpHomeEduAndnetValboxConfig,
  RpHomeSupAndmedProgress: RpHomeSupAndmedProgressConfig,
  RpMedicalAreaRecordProgress: RpMedicalAreaRecordProgressConfig,
  RpMedicalClassCountTable: RpMedicalClassCountTableConfig,
  RpMedicalCustomerAnalysis: RpMedicalCustomerAnalysisConfig,
  RpMedicalRevenueDistribute: RpMedicalRevenueDistributeConfig,
  RpMedicalSaleProgress: RpMedicalSaleProgressConfig,
  RpMedicalSystem: RpMedicalSystemConfig,
  RpReviewPast: RpReviewPastConfig,
  RpSidebarRight: RpSidebarRightConfig,
  RpSubTitle: RpSubTitleConfig,
  RpSupKeyvaluesBox: RpSupKeyvaluesBoxConfig
};

export default {
  RpKeyValueBox,
  RpBarChartCol,
  RpBusinPieChart,
  RpChinaMapBase,
  RpChinaMapSupplyChain,
  RpCircleRing,
  RpBrandFamily,
  RpBrandMatrix,
  RpBrandMatrixSide,
  RpCircleCombination,
  RpCounter,
  RpDialRouter,
  RpEduCollegeProfile,
  RpEduKeyvalProgress,
  RpEduTeachersCount,
  RpExpertsTeam,
  RpGoldTeachers,
  RpGoldTeachers3DShow,
  RpHeadLine,
  RpHomeEduAndnetValbox,
  RpHomeSupAndmedProgress,
  RpMedicalAreaRecordProgress,
  RpMedicalClassCountTable,
  RpMedicalCustomerAnalysis,
  RpMedicalRevenueDistribute,
  RpMedicalSaleProgress,
  RpMedicalSystem,
  RpReviewPast,
  RpSidebarRight,
  RpSubTitle,
  RpSupKeyvaluesBox
};

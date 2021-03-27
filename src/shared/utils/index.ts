import chalk from "chalk";
chalk.level = 1;

export function uuid() {
  return String(+new Date()) + parseInt("" + Math.random() * 10000);
}

type VarType = "String" | "Number" | "Boolean" | "Undefined" | "Null";
function getType(v: any): string {
  return Object.prototype.toString.call(v).slice(8, -1);
}
export function isTypeOf<T>(type: VarType, v: any): v is T {
  if (getType(v) === type) {
    return true;
  }
  return false;
}

/**
 *
 * @param pxValue 设计稿的尺寸， 单位为px
 * @param scaleRatio 在设计稿转换为rem的基础上进行第二次缩放，默认值为1, 不缩放
 */
export function px2rem(pxValue: number | string, scaleRatio = 1): string {
  const htmlFontSize = parseInt(process.env.VUE_APP_HTML_FONT_SIZE || "100");
  if (isTypeOf<number>("Number", pxValue)) {
    return ((pxValue / htmlFontSize) * scaleRatio).toFixed(8) + "rem";
  }
  if (/rem$/.test(pxValue)) {
    return Number(pxValue.replace(/rem$/, "")) * scaleRatio + "rem";
  }
  pxValue = pxValue.replace(/px$/, "");
  return ((Number(pxValue) / htmlFontSize) * scaleRatio).toFixed(8) + "rem";
}

export const Logger = {
  info(...args: any[]) {
    const message: any[] = [];
    Array.prototype.slice.call(args).forEach(arg => message.push(chalk.green(arg)));
    // eslint-disable-next-line
    console.log(chalk.bgGreen("info", ...message));
  },
  error(...args: any[]) {
    const message: any[] = [];
    Array.prototype.slice.call(args).forEach(arg => message.push(chalk.red(arg)));
    // eslint-disable-next-line
    console.log(chalk.bgRed("error", ...message));
  },
  warn(...args: any[]) {
    const message: any[] = [];
    Array.prototype.slice.call(args).forEach(arg => message.push(chalk.yellow(arg)));
    // eslint-disable-next-line
    console.log(chalk.yellow("warn", ...message));
  }
};

function isObject(o: any) {
  return (typeof o === "object" || typeof o === "function") && o !== null;
}

// 迭代递归法：深拷贝对象与数组
export const deepClone = (obj: any): any => {
  if (!isObject(obj)) {
    throw new Error("obj 不是一个对象！");
  }

  const isArray = Array.isArray(obj);
  const cloneObj = isArray ? [] : {};
  for (const key in obj) {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  }

  return cloneObj;
};

export const parseToThousandth = value => {
  const num = value.toString();
  return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};
// 地图数据名字转拼音
export const transformProvince = (name: string) => {
  const province = {
    安徽: "anhui",
    澳门: "aomen",
    北京: "beijing",
    重庆: "chongqing",
    福建: "fujian",
    甘肃: "gansu",
    广东: "guangdong",
    广西: "guangxi",
    贵州: "guizhou",
    海南: "hainan",
    河北: "hebei",
    黑龙江: "heilongjiang",
    河南: "henan",
    湖北: "hubei",
    湖南: "hunan",
    江苏: "jiangsu",
    江西: "jiangxi",
    吉林: "jilin",
    辽宁: "liaoning",
    内蒙古: "neimenggu",
    宁夏: "ningxia",
    青海: "qinghai",
    山东: "shandong",
    上海: "shanghai",
    山西: "shanxi",
    陕西: "shanxi1",
    四川: "sichuan",
    台湾: "taiwan",
    天津: "tianjin",
    香港: "xianggang",
    新疆: "xinjiang",
    西藏: "xizang",
    云南: "yunnan",
    浙江: "zhejiang"
  };
  return province[name];
};

export function getAppId() {
  Logger.info("appId ", location.pathname.replace(/^\/(page-web\/)?/, ""));
  return location.pathname.replace(/^\/(page-web\/)?/, "");
}

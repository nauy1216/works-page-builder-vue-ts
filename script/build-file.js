const path = require("path");
const fs = require("fs");
const CLIEngine = require("eslint").CLIEngine;

createComponentsIndex();

function createComponentsIndex() {
  const rootPath = `src/components`;
  let contentHeader = `
    /**
     *  1、这个文件是动态生成的， 执行npm run build:file即可。
     *  2、请不要手动写这里的代码， 将会被覆盖。
     *  3、在config.json字段private数组包含的组件不会导出。
     */
    `;
  let contentExportComp = "export const componentcategory = { \n";
  let contentExportConfig = "export const componentsConfig = { \n";
  let contentExportDefault = "export default { \n";
  let componentList = [];
  let result = "";
  const paths = fs.readdirSync(path.resolve(process.cwd(), rootPath));
  let categoryPaths, compPaths;
  paths.forEach(category => {
    if (fs.statSync(`${rootPath}/${category}`).isDirectory()) {
      const configJson = require(path.resolve(process.cwd(), `${rootPath}/${category}/config.json`));
      if (configJson.isPrivate) return;
      contentExportComp += `${category}: {name:\n"${configJson.name}" , \ncomponents: `;
      let components = `{`;
      categoryPaths = fs.readdirSync(path.resolve(process.cwd(), `${rootPath}/${category}`));
      categoryPaths.forEach(compPath => {
        if (fs.statSync(`${rootPath}/${category}/${compPath}`).isDirectory()) {
          compPaths = fs.readdirSync(path.resolve(process.cwd(), `${rootPath}/${category}`));
          // 如果是私有组件将不会导出
          if (configJson.private && configJson.private.indexOf(compPath) > -1) {
            return;
          }
          if (fs.statSync(path.resolve(process.cwd(), `${rootPath}/${category}/${compPath}`)).isDirectory()) {
            const upper = upperCase(compPath);
            contentHeader += `import Rp${upper} from "./${category}/${compPath}/index.vue"; \n`;
            contentHeader += `import Rp${upper}Config from "./${category}/${compPath}/config"; \n`;
            contentExportDefault += `  Rp${upper}, \n`;
            componentList.push(`Rp${upper}`);
            contentExportConfig += `  Rp${upper}: Rp${upper}Config, \n`;
            components += `  Rp${upper}, \n`;
          }
        }
      });
      components += "}},";
      contentExportComp += components;
    }
  });
  contentExportComp += `}`;
  contentExportConfig += `}`;
  contentExportDefault += `}`;
  result = `${contentHeader}\n\n${contentExportComp}\n\n${contentExportConfig}\n\n${contentExportDefault}`;
  fs.writeFileSync(path.resolve(process.cwd(), `${rootPath}/index.ts`), result);
  const engine = new CLIEngine({
    fix: true
  });
  const report = engine.executeOnFiles(path.resolve(process.cwd(), `${rootPath}/index.ts`));
  CLIEngine.outputFixes(report);
  fs.writeFileSync(path.resolve(process.cwd(), `script/components.ts`), `export default ${JSON.stringify(componentList)}`);
}

function upperCase(str) {
  str = str.replace(/(-[^-]?)/g, $1 => $1.slice(1).toUpperCase());
  return str[0].toUpperCase() + str.slice(1);
}
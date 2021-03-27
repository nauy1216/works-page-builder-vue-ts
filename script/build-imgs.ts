import puppeteer, { Browser, Page } from "puppeteer";
import chalk from "chalk";
import components from "./components";
import minimist from "minimist";

const rawArgv = process.argv.slice(2);
const args = minimist(rawArgv, {
  string: ["componentName"]
});
const { componentName } = args;

function download(page: Page, task: Task) {
  return new Promise<Page>(async resolve => {
    page.setViewport({
      width: task.size,
      height: task.size
    });
    await page.goto(`http://localhost:9527/page-admin#/playground?component=${task.componentName}&env=headless&size=${task.size}`);
    const imgName = task.isThumbnail ? `${task.componentName}Thumbnail` : task.componentName;
    setTimeout(async () => {
      await page.screenshot({
        path: `./public/images/${imgName}.jpeg`,
        type: "jpeg",
        quality: 100
      });
      page.close();
      console.log(chalk.bgYellow("图片"), chalk.green(imgName));
      resolve(page);
    }, 500);
  });
}

type Task = {
  componentName: string;
  size: number;
  isThumbnail: boolean;
};

async function runTask(taskQueue: Task[]) {
  console.log(chalk.green("开始截取组件图片..."));
  console.time("runTask");
  const browser = await puppeteer.launch({
    headless: true
  });
  ["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, async () => {
      await browser.close();
      process.exit(0);
    });
  });

  while (taskQueue.length) {
    await download(await browser.newPage(), taskQueue.shift()!);
  }

  console.log(chalk.green("截取完成."));
  console.timeEnd("runTask");
  browser.close();
}

(async () => {
  if (componentName && components.indexOf(componentName) < 0) {
    console.log(chalk.bgRed(" error: "), chalk.red(`不存在名称为【${componentName}】的组件`));
    return;
  }
  const downloadComponents = componentName ? [componentName] : components;
  const task: Task[] = [];
  for (let componentName of downloadComponents) {
    task.push({
      componentName,
      size: 140,
      isThumbnail: true
    });
    task.push({
      componentName,
      size: 400,
      isThumbnail: false
    });
  }
  runTask(task);
})();

<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import TopTool from "./top-tool/index.vue";
import LeftTool from "./left-tool/index.vue";
import RightTool from "./right-tool/index.vue";
import PageCanvas from "./page-canvas/index.vue";
import { PageStore } from "page-admin/store/modules";
import { BeforeRouteLeave, NextFunc, Route } from "types/routeHooks";

let htmlFontSize;
@Component({
  components: {
    TopTool,
    LeftTool,
    RightTool,
    PageCanvas
  }
})
export default class Editor extends BaseVue implements BeforeRouteLeave {
  beforeRouteLeave(to: Route, from: Route, next: NextFunc): void {
    document.documentElement.style.fontSize = htmlFontSize;
    PageStore.resetPage();
    next();
  }

  created() {
    htmlFontSize = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = `${process.env.VUE_APP_HTML_FONT_SIZE}px`;
  }

  render() {
    return (
      <div class="rp-editor">
        <TopTool></TopTool>
        <div class="rp-editor__main">
          <LeftTool></LeftTool>
          <PageCanvas></PageCanvas>
          <RightTool></RightTool>
        </div>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@include b(editor) {
  width: 100vw;
  height: 100vh;
  @include e(main) {
    width: 100vw;
    height: calc(100vh - var(--header-height));
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rp-left-tool,
    .rp-right-tool {
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 4px 0px #e0e0e0;
      height: calc(100vh - var(--header-height));
      top: var(--header-height);
    }
    .rp-left-tool {
      flex: 0 0 260px;
    }
    .rp-right-tool {
      flex: 0 0 340px;
      padding: 0 20px;
    }
  }
  .rp-page-canvas {
    max-width: calc(100vw - 640px);
    max-height: calc(100vh - var(--header-height) - 40px);
    box-shadow: 0 0 4px 0 #e0e0e0;
  }
}
</style>

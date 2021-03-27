import { Component } from "vue-property-decorator";
import BaseVue from "page-admin/BaseVue";

@Component({})
export default class ContexMenuMixin extends BaseVue {
  isStartMove = false;
  scrollLeft = 0; // 页面横向滚动距离
  scrollTop = 0;
  maxScrollLeft = 0; // 页面最大横向滚动距离
  maxScrollTop = 0;
  startX = 0;
  startY = 0;
  viewportWidth = 0; // 编辑器视口宽度
  viewportHeight = 0; // 编辑器视口高度
  distanceX = 0;
  distanceY = 0;

  created() {
    this.addMoveEvent();
  }

  // 视口增加拖动事件
  addMoveEvent() {
    const handlePageMouseMove = (ev: MouseEvent) => {
      if (this.isStartMove && this.$refs.viewport) {
        const dom = (this.$refs.viewport as Vue).$el.querySelector(".el-scrollbar__wrap")!;
        this.viewportWidth = dom.clientWidth;
        this.viewportHeight = dom.clientHeight;

        this.maxScrollLeft = dom.scrollWidth - this.viewportWidth + 1;
        this.maxScrollTop = dom.scrollHeight - this.viewportHeight + 1;

        this.scrollLeft += this.startX - ev.clientX;
        this.scrollTop += this.startY - ev.clientY;

        this.scrollLeft = Math.max(0, this.scrollLeft);
        this.scrollTop = Math.max(0, this.scrollTop);
        this.scrollLeft = Math.min(this.maxScrollLeft, this.scrollLeft);
        this.scrollTop = Math.min(this.maxScrollTop, this.scrollTop);

        if (this.scrollLeft <= 1 && this.startX < ev.clientX) {
          this.distanceX += ev.clientX - this.startX;
        }
        if (this.scrollTop <= 1 && this.startY < ev.clientY) {
          this.distanceY += ev.clientY - this.startY;
        }
        // console.log(this.maxScrollLeft, this.scrollLeft);
        if (this.maxScrollLeft - this.scrollLeft <= 2 && this.startX > ev.clientX) {
          // debugger;
          this.distanceX += ev.clientX - this.startX;
        }
        if (this.maxScrollTop - this.scrollTop <= 2 && this.startY > ev.clientY) {
          this.distanceY += ev.clientY - this.startY;
        }

        dom.scrollTo(this.scrollLeft, this.scrollTop);

        this.startX = ev.clientX;
        this.startY = ev.clientY;
      }
    };

    const handlePageMouseDown = (ev: MouseEvent & { path: any }) => {
      // let hasSvg = false;
      // for (let i = 0, length = ev.path.length; i < length; i++) {
      //   const name = Object.prototype.toString.call(ev.path[i]);
      //   if (name === "[object SVGSVGElement]" || name === "[object SVGPathElement]") {
      //     hasSvg = true;
      //   }
      // }
      if (ev.target && (ev.target as HTMLElement).className.indexOf && (ev.target as HTMLElement).className.indexOf("page-content") > -1) {
        this.isStartMove = true;
        this.startX = ev.clientX;
        this.startY = ev.clientY;
        document.addEventListener("mousemove", handlePageMouseMove, true);
      }
    };

    const handlePageMouseUp = () => {
      this.isStartMove = false;
      document.removeEventListener("mousemove", handlePageMouseMove, true);
      this.distanceX = 0;
      this.distanceY = 0;
    };

    document.addEventListener("mousedown", handlePageMouseDown as any, true);
    document.addEventListener("mouseup", handlePageMouseUp as any, true);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("mousedown", handlePageMouseDown as any, true);
      document.removeEventListener("mouseup", handlePageMouseUp, true);
    });
  }
}

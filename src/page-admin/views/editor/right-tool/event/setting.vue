<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { PageStore } from "page-admin/store/modules";

import { SOCKET } from "./types";
import { SocketDetail } from "./detail-config/index";
@Component({
  name: "EventSetting",
  components: {
    SocketDetail
  }
})
export default class EventSetting extends BaseVue {
  @Prop({
    type: String,
    default: ""
  })
  sendValue!: string;

  @Prop({
    type: String,
    default: ""
  })
  emitValue!: string;

  @Prop({
    type: Number,
    default: 0
  })
  index!: number;

  get getComponent() {
    return PageStore.activeComp && this.$componentsConfig[PageStore.activeComp!.componentName];
  }
  handleBeforClose() {
    this.$emit("handleBeforClose");
  }
  submitEvent() {
    // 把当前配置保存在组件config中
    if (this.sendValue === SOCKET) {
      (this.$refs.scoket as Vue & { submitEvent: Function }).submitEvent();
    }
    // else if (this.sendValue === CHANGE_COM_STATUS) {
    //   console.log(123546);
    // }
    // PageStore.activeComp!.event!.list[this.index].detailConfig.push(event);
    // console.log(PageStore.activeComp);
    this.handleBeforClose();
  }

  render() {
    return (
      <div>
        <el-dialog width="50%" before-close={() => this.handleBeforClose()} close-on-press-escape={true} visible={true}>
          <socket-detail ref="scoket" index={this.index} emitValue={this.emitValue} sendValue={this.sendValue}></socket-detail>
          <span slot="footer" class="dialog-footer">
            <el-button onClick={() => this.submitEvent()}>确定</el-button>
          </span>
        </el-dialog>
      </div>
    );
  }
}
</script>
<style scoped lang="scss"></style>

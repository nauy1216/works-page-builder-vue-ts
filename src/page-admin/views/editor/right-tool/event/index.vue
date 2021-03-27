<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { PageStore } from "page-admin/store/modules";
import { SOCKET, CHANGE_COM_STATUS, CHANGE_PAGE } from "./types";
import EventSetting from "./setting.vue";

@Component({
  name: "ComponentEvent",
  components: {
    EventSetting
  }
})
export default class ComponentEvent extends BaseVue {
  setting = false;
  eventData: Array<any> = [];
  // 临时记录的当前行事件发送类型
  sendValue = "";
  emitValue = "";
  // 临时索引
  $index = 0;
  get getComponent() {
    return PageStore.activeComp && this.$componentsConfig[PageStore.activeComp!.componentName];
  }
  get getComponentsEvent() {
    return this.getComponent!.event!.componentEvent || null;
  }

  get getComponentsEventList() {
    return this.getComponent!.event?.list || null;
  }

  handleConfigEvent(scope) {
    // 没有选择事件触发类型则不展示弹窗dialog
    if (!scope.row.emitValue || !scope.row.sendValue) {
      this.$message("请选择事件触发类型或者事件发送类型");
      return;
    }
    this.sendValue = scope.row.sendValue;
    this.emitValue = scope.row.emitValue;
    this.$index = scope.$index;
    this.setting = true;
  }
  handleDeleteEvent(scope) {
    const index = scope.$index;
    PageStore.activeComp!.event!.list.splice(index, 1);
  }
  handleBeforClose() {
    this.setting = false;
  }
  // 获取当前选中组件的事件列表
  setEvent() {
    if (!this.getComponentsEvent || this.getComponentsEvent.length === 0) {
      this.$message("当前组件未配置事件");
      return;
    }
    // "socket", "组件联动", "页面切换"
    PageStore.activeComp!.event!.list.push({
      emitValue: "",
      sendValue: "",
      emit: [...this.getComponentsEvent],
      send: [
        {
          name: SOCKET,
          type: 1
        },
        {
          // 组件联动
          name: CHANGE_COM_STATUS,
          label: "组件联动",
          type: 2
        },
        {
          // 页面切换
          name: CHANGE_PAGE,
          label: "页面切换",
          type: 3
        }
      ],
      detailConfig: {}
    });
    // });
    /**
     *
     * [
     * click:{ // click为组件定义的，里面内容是动态添加的
     *   appid:xxxxxxxxxx,
     *   messageType: 'changeRoute | socket | ',
     *   router: /xxxxxx,
     *   params:[{
     *   key: 'id',
     *   value:123,
     *   isdynamic:true
     * }]}
     *
     *
     *
     * ]
     *
     *
     *
     */
  }
  render() {
    return (
      PageStore.activeComp?.event?.componentEvent && (
        <div class="rp-right-event">
          <el-button plain class="rp-right-event__btn" onClick={() => this.setEvent()}>
            添加事件类型
          </el-button>
          <el-divider></el-divider>
          <el-table ref="table" data={PageStore.activeComp!.event!.list} border style="width: 100%">
            <el-table-column prop="emit" label="事件触发类型">
              {scope => {
                return (
                  <el-select
                    value={scope.row.emitValue}
                    onChange={value => {
                      scope.row.emitValue = value;
                    }}>
                    {scope.row.emit.map(v => {
                      return <el-option label={v.alias} value={v.name}></el-option>;
                    })}
                  </el-select>
                );
              }}
            </el-table-column>
            <el-table-column prop="emit" label="事件发送类型">
              {scope => {
                return (
                  <el-select
                    value={scope.row.sendValue}
                    onChange={value => {
                      scope.row.sendValue = value;
                    }}>
                    {scope.row.send.map(v => {
                      return <el-option label={v.label} value={v.name}></el-option>;
                    })}
                  </el-select>
                );
              }}
            </el-table-column>
            <el-table-column label="操作" width="70">
              {scope => {
                return (
                  <div>
                    <i class="event-font-size el-icon-s-tools" onClick={() => this.handleConfigEvent(scope)} />
                    <i class="event-font-size el-icon-delete-solid" onClick={() => this.handleDeleteEvent(scope)} />
                  </div>
                );
              }}
            </el-table-column>
          </el-table>
          {this.setting ? (
            <event-setting
              sendValue={this.sendValue}
              emitValue={this.emitValue}
              index={this.$index}
              on-handleBeforClose={() => {
                this.handleBeforClose();
              }}></event-setting>
          ) : (
            ""
          )}
        </div>
      )
    );
  }
}
</script>
<style scoped lang="scss">
@include b(right-event) {
  @include e(btn) {
    margin: 0 auto;
    width: 100%;
  }
  .event-font-size {
    cursor: pointer;
    font-size: 15px;
    margin-right: 4px;
  }
}
</style>

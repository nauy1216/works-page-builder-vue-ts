<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component, Prop } from "vue-property-decorator";
import { getAppList, pageList } from "api/request";
import { PageStore } from "page-admin/store/modules";
import { SOCKET } from "../types";
interface Form {
  receiveAppId: null | string;
  messageType: number;
  routerId: null | number;
  paramsData: Array<any>;
}
@Component({
  name: "SocketDetail"
})
export default class SocketDetail extends BaseVue {
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
  transferData: Array<any> = [];
  receiveAppOptions: Array<any> = [];
  receiveAppPageOptions: Array<any> = [];
  // 穿梭框dialog
  showTransferDialog = false;

  form: Form = {
    receiveAppId: null,
    messageType: 1,
    routerId: null,
    paramsData: [
      // {
      //   key: "mockData",
      //   value: 1,
      //   isDynamic: true
      // },
      // {
      //   key: "mockData2",
      //   value: 2,
      //   isDynamic: true
      // }
    ]
  };
  // 添加自定义字段
  handleAddCustomParams() {
    this.form.paramsData.push({
      isCustom: true,
      key: "",
      value: ""
    });
  }
  submitEvent() {
    // 把当前配置保存在组件config中
    let event = {};
    if (this.sendValue === SOCKET) {
      event = {
        eventName: this.emitValue,
        eventType: this.sendValue,
        receiveAppid: this.form.receiveAppId,
        // messageType  1:路由跳转 2:页面刷新  3:组件联动
        messageType: this.form.messageType,
        router: this.form.routerId,
        params: this.form.paramsData
      };
    }
    PageStore.activeComp!.event!.list[this.index].detailConfig = event;
    // 获取当前选中的组件
  }
  // 删除自定义字段
  deleteCustomParams(index) {
    this.form.paramsData.splice(index, 1);
  }
  // 添加字段
  handleAddParams() {
    this.$message("当前组件还未绑定数据源，只能添加自定义字段，请绑定数据源再执行操作！");
    this.showTransferDialog = true;
  }

  formatData(data): Array<any> {
    const formatTransferData = [];
    for (const key in data) {
      (formatTransferData as Array<any>).push({
        label: key,
        value: data[key],
        key: key,
        isDynamic: true
      });
    }
    return formatTransferData;
  }
  isPlainObj(data) {
    return Object.prototype.toString.call(data) === "[object Object]";
  }
  isPlainArray(data) {
    return Object.prototype.toString.call(data) === "[object Array]";
  }
  // 展示字段穿梭框
  showTransfer() {
    if (!this.showTransferDialog) return;
    /**模拟从数据源获取的数据 */
    const data = [
      { id: "11", companyId: "00002", name: "深圳市利都发展有限公司" },
      { id: "20", companyId: "00014", name: "徐州禾禾宠物用品有限公司" }
    ];
    let temp_data: Array<any> = [];
    if (this.isPlainObj(data)) {
      temp_data = this.formatData(data);
    } else if (this.isPlainArray(data)) {
      if (data.length > 0) {
        temp_data = this.formatData(data[0]);
      }
    }
    return (
      this.showTransferDialog && (
        <el-dialog
          width="40%"
          close-on-press-escape={true}
          visible={true}
          append-to-body={true}
          before-close={() => {
            this.showTransferDialog = false;
            this.closeTransferDialog(temp_data);
          }}>
          <el-transfer
            style="z-index:9999"
            props={{
              key: "value",
              label: "value"
            }}
            titles={["数据源字段", "当前选中字段"]}
            class="rp-transfer-position"
            vModel={this.transferData}
            data={temp_data}
            onChange={(value, direction, deleteValue) => {
              this.delParams(deleteValue);
            }}></el-transfer>
        </el-dialog>
      )
    );
  }
  // 关闭穿梭框
  closeTransferDialog(formateTransferData: Array<any>) {
    const data: Array<any> = [];
    // 遍历原数据和穿梭框选中的数据匹配，相等的push到paramsData中
    for (let i = 0; i < this.transferData.length; i++) {
      for (let j = 0; j < formateTransferData.length; j++) {
        if (formateTransferData[j].key === this.transferData[i]) {
          data.push(formateTransferData[j]);
        }
      }
    }
    this.getTransferIndex(data);
  }
  // 查找当前穿梭框对应的索引
  getTransferIndex(data) {
    if (this.form.paramsData.length === 0) {
      this.addParams(data);
    } else {
      for (let i = 0; i < this.form.paramsData.length; i++) {
        for (let k = 0; k < data.length; k++) {
          if (this.form.paramsData[i].key === data[k].key) {
            data.splice(k, 1);
          }
        }
      }
      this.addParams(data);
    }
  }
  addParams(data) {
    data.map(v => {
      this.form.paramsData.push({
        key: v.key,
        value: v.value,
        isDynamic: true
      });
    });
  }
  delParams(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.form.paramsData.length; j++) {
        if (data[i] === this.form.paramsData[j].key) {
          this.form.paramsData.splice(j, 1);
        }
      }
    }
  }
  // 获取应用列表
  handleGetAppList() {
    getAppList().then(({ details }) => {
      this.receiveAppOptions = details as Array<any>;
    });
  }

  handleGetPageOfApp(id: number) {
    pageList(id).then(({ details }) => {
      this.receiveAppPageOptions = details as Array<any>;
    });
  }

  created() {
    this.handleGetAppList();
  }
  render() {
    return (
      <div>
        {this.sendValue === SOCKET && (
          <el-form ref="form" props={this.form} label-width="80px">
            <div>
              <el-form-item label="接收应用">
                <el-select vModel={this.form.receiveAppId} placeholder="请选择接收应用" style="width: 100%;" onChange={value => this.handleGetPageOfApp(value)}>
                  {this.receiveAppOptions.map(v => {
                    return <el-option label={(v as any).name} value={(v as any).id}></el-option>;
                  })}
                </el-select>
              </el-form-item>
              <el-form-item label="消息类型">
                <el-select vModel={this.form.messageType} placeholder="请选择消息类型" style="width: 100%;">
                  <el-option label="路由跳转" value={1}></el-option>
                  <el-option label="页面刷新" value={2}></el-option>
                  <el-option label="组件联动" value={3}></el-option>
                </el-select>
              </el-form-item>
              {this.form.messageType === 1 && (
                <el-form-item label="跳转页面">
                  <el-select disabled={this.form.receiveAppId ? false : true} vModel={this.form.routerId} placeholder="请选择跳转页面" style="width: 100%;">
                    {this.receiveAppPageOptions.map(v => {
                      return <el-option label={(v as any).name} value={(v as any).id}></el-option>;
                    })}
                  </el-select>
                </el-form-item>
              )}
            </div>
            <el-form-item label="数据参数">
              <el-table data={this.form.paramsData} border style="width: 80%;margin-bottom:30px">
                <el-table-column prop="key" label="字段名">
                  {scope => {
                    return scope.row.isCustom ? <el-input placeholder="请输入自定义字段" vModel={scope.row.key}></el-input> : scope.row.key;
                  }}
                </el-table-column>
                <el-table-column prop="value" label="值">
                  {scope => {
                    return scope.row.isCustom ? (
                      <el-input placeholder="请输入自定义值" vModel={scope.row.value}></el-input>
                    ) : scope.row.isDynamic ? (
                      scope.row.value
                    ) : (
                      <el-input disabled={scope.row.isDynamic} vModel={scope.row.value}></el-input>
                    );
                  }}
                </el-table-column>
                <el-table-column prop="action" label="操作">
                  {scope => {
                    return scope.row.isCustom ? (
                      <span
                        class="delete"
                        onClick={() => {
                          this.deleteCustomParams(scope.$index);
                        }}>
                        删除
                      </span>
                    ) : (
                      <span class="reset">重置</span>
                    );
                  }}
                </el-table-column>
                <el-table-column prop="dynamic" label="动态获取值">
                  {scope => {
                    return scope.row.isCustom ? "" : <el-checkbox vModel={scope.row.isDynamic}></el-checkbox>;
                  }}
                </el-table-column>
              </el-table>
              <el-button onClick={() => this.handleAddParams()}>增删字段</el-button>
              <el-button onClick={() => this.handleAddCustomParams()}>添加自定义字段</el-button>
            </el-form-item>
          </el-form>
        )}
        {this.showTransfer()}
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
.delete {
  cursor: pointer;
  color: rgba(221, 81, 69, 1);
}
.reset {
  cursor: pointer;
  color: #999;
}
@include b(transfer-position) {
  position: relative;
  left: 13%;
}
</style>

<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { upDataSource, checkSql } from "api/request";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/cobalt.css";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/javascript-hint";

require("codemirror/mode/sql/sql");
require("codemirror/mode/htmlmixed/htmlmixed");
import "codemirror/keymap/sublime";
@Component({
  name: "DataSource",
  components: { codemirror }
})
export default class DataSource extends BaseVue {
  dialogVisible = false;
  ruleForm = {
    id: 0, //0 表示新增
    name: "",
    remark: "",
    data_package: "",
    sql_content: ""
  };
  resultCodes = "";
  rules = {
    name: [{ required: true, message: "请填写数据包名称", trigger: "blur" }],
    data_package: [{ required: true, message: "请选择关联数据包", trigger: "change" }]
  };

  mirrorOptions = {
    //theme: "cobalt",
    //mode: "text/x-mysql",
    showCursorWhenSelecting: true,
    lineNumbers: true,
    line: true,
    readOnly: false,
    indentUnit: 2,
    smartIndent: true,
    fristLineNumber: 1
  };
  mirrorResultOptions = {
    readOnly: true,
    indentUnit: 2,
    smartIndent: true,
    fristLineNumber: 1
  };
  get isSelectedJoin() {
    return this.ruleForm.data_package ? true : false;
  }
  created() {
    //console.log()
  }

  render() {
    return (
      <el-dialog
        class="rp-code-mirror-dialog"
        close-on-click-modal={false}
        visible={this.dialogVisible}
        width="80%"
        before-close={() => {
          this.dialogVisible = false;
        }}>
        <el-form {...{ props: { model: this.ruleForm } }} rules={this.rules} ref="ruleForm" label-width="100px" class="data-ruleForm">
          <el-form-item label="数据包名称" prop="name">
            <el-input vModel={this.ruleForm.name} maxlength="30" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="数据包描述">
            <el-input vModel={this.ruleForm.remark} maxlength="150" type="textarea" style="width: 360px;"></el-input>
          </el-form-item>
          <el-form-item label="关联数据包">
            <el-select vModel={this.ruleForm.data_package} placeholder="" clearable style="width: 360px; margin-right: 10px">
              <el-option label="教育集团" value={1}></el-option>
              <el-option label="医疗集团" value={2}></el-option>
            </el-select>
            <el-checkbox vModel={this.isSelectedJoin} disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="SQL">
            <div class="code-wrap">
              <div>
                <codemirror ref="codemirror_code" v-model={this.ruleForm.sql_content} options={this.mirrorOptions}></codemirror>
              </div>
              <div>
                <codemirror ref="codemirror_result" v-model={this.resultCodes} options={this.mirrorResultOptions}></codemirror>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="rp-dialog-footer">
          <el-button
            onClick={() => {
              this.onRunning();
            }}>
            调 试
          </el-button>
          <el-button
            type="primary"
            onClick={() => {
              this.onSubmit();
            }}>
            创 建
          </el-button>
        </span>
      </el-dialog>
    );
  }
  show(fromData: any) {
    this.ruleForm = fromData;
    this.dialogVisible = true;
  }
  mounted() {
    // setTimeout(() => {
    //   (this.$refs.codemirror_code as codemirror).setSize('', 500);
    // }, 300);
  }
  onSubmit() {
    const params = { id: this.ruleForm.id, name: this.ruleForm.name, remark: this.ruleForm.remark, sql_content: this.ruleForm.sql_content, data_package: this.ruleForm.data_package };
    upDataSource(params).then(res => {
      if (res.code == 200) {
        this.$message({
          message: "操作成功",
          type: "success"
        });
      }
      this.dialogVisible = false;
    });
  }
  onRunning() {
    checkSql(this.ruleForm.sql_content).then(res => {
      alert(res);
    });
  }
}
</script>
<style lang="scss" scoped>
@include b(code-mirror-dialog) {
  color: red;
  .code-wrap {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    > div {
      box-sizing: border-box;
      width: 46%;
      //height: 302px;
      border: 1px solid #dcdfe6;
      &:nth-child(1) {
        box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
      }
    }
  }
  /deep/ .el-dialog__footer {
    padding: 20px 0;
    text-align: center;
  }
  /deep/ .el-button {
    margin-right: 40px;
  }
}
</style>

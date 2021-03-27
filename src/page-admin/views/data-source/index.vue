<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import PageHeader from "page-admin/components/frame/Header.vue";
import editDialog from "./edit-dialog.vue";
import { getDataSourceList, delDataSource, syncDataSource } from "api/request";

@Component({
  name: "DataSource",
  components: { PageHeader, editDialog }
})
export default class DataSource extends BaseVue {
  searchVal = "";
  listQuery = {
    pageNum: 1,
    pageSize: 10,
    totalCount: 0
  };
  tableData: any[] = [];
  created() {
    this.getSourceList();
  }

  render() {
    return (
      <div class="rp-data-source">
        <PageHeader>
          <div
            class="rp-data-source__goback"
            onClick={() => {
              this.$router.go(-1);
            }}>
            <i class="el-icon-arrow-left"></i>返回
          </div>
        </PageHeader>
        <div class="rp-data-source__searchs">
          <div>
            <el-button
              onClick={() => {
                this.onCreateDataSource();
              }}>
              创建数据包
            </el-button>
          </div>
          <div style="width: 300px">
            <el-input style="width: 200px;margin-right: 10px" v-model={this.searchVal} placeholder="根据名称或者id查询"></el-input>
            <el-button
              onClick={() => {
                this.onSearch();
              }}>
              搜 索
            </el-button>
          </div>
        </div>
        <div class="rp-data-source__list">
          <el-table data={this.tableData} style="width: 100%">
            <el-table-column prop="name" label="数据包名称"></el-table-column>
            <el-table-column prop="id" label="数据包标识"></el-table-column>
            <el-table-column prop="top_category" label="分类"></el-table-column>
            <el-table-column prop="remark" label="描述"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="update_time" label="最后更新时间" width="180"></el-table-column>
            <el-table-column label="操作">
              {scope => {
                return (
                  <div>
                    <el-button
                      onClick={() => {
                        this.onEditDataItem(scope.row);
                      }}>
                      编辑
                    </el-button>
                    <el-button
                      onClick={() => {
                        this.onUpdateItem(scope.row);
                      }}>
                      更新
                    </el-button>
                    <el-button
                      onClick={() => {
                        this.onDelDataItem(scope.row);
                      }}>
                      删除
                    </el-button>
                  </div>
                );
              }}
            </el-table-column>
          </el-table>
          <div class="pagination-rp">
            <el-pagination
              on-size-change={this.handleSizeChange}
              on-current-change={this.handleCurrentChange}
              layout="total, sizes,prev, pager, next,jumper"
              current-page={this.listQuery.pageNum}
              page-size={this.listQuery.pageSize}
              page-sizes={[5, 10, 15]}
              total={this.listQuery.totalCount}></el-pagination>
          </div>
        </div>
        <editDialog ref="edit_ref"></editDialog>
      </div>
    );
  }
  getSourceList() {
    //
    getDataSourceList({ search: this.searchVal, page_size: this.listQuery.pageSize, page_index: this.listQuery.pageNum }).then(res => {
      if (res.code === 200) {
        this.tableData = res.details || [];
        this.listQuery.totalCount = res.total_count;
      }
    });
  }
  onCreateDataSource() {
    const fromData = {
      id: 0, //0 表示新增
      name: "",
      remark: "",
      data_package: "",
      sql_content: ""
    };
    (this.$refs.edit_ref as editDialog).show(fromData);
  }
  onSearch() {
    this.listQuery.pageNum = 1;
    this.getSourceList();
  }
  onEditDataItem(row: any) {
    (this.$refs.edit_ref as editDialog).show(row);
  }
  onUpdateItem(row: any) {
    syncDataSource(row.id).then(res => {
      if (res.code == 200) {
        this.$message({
          message: "更新成功",
          type: "success"
        });
      }
    });
  }
  onDelDataItem(row: any) {
    this.$confirm("确定删除该数据包?", "", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        delDataSource(row.id).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getSourceList();
          }
        });
      })
      .catch(() => {
        // done
      });
  }
  //页数控制
  handleSizeChange(val) {
    this.listQuery.pageNum = 1;
    this.listQuery.pageSize = val;
    this.getSourceList();
  }
  handleCurrentChange(val) {
    this.listQuery.pageNum = val;
    this.getSourceList();
  }
}
</script>
<style lang="scss" scoped>
@include b(data-source) {
  width: 100%;
  height: 100%;
  .rp-data-source__goback {
    height: 100%;
    float: left;
    display: inline-flex;
    align-items: center;
    color: #7e7e7e;
    .el-icon-arrow-left {
      margin-right: 10px;
    }
    &:hover {
      cursor: pointer;
      color: var(--theme-color);
    }
  }
  .rp-data-source__searchs {
    display: flex;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    height: 80px;
    justify-content: space-between;
    align-items: center;
  }
  .rp-data-source__list {
    box-sizing: border-box;
    padding: 0 20px;
  }
  .rp-data-source__list /deep/ .has-gutter > tr th {
    background: #f5f7fa;
  }
  .pagination-rp {
    margin-top: 20px;
    overflow: hidden;
  }
  .pagination-rp /deep/ .el-pagination {
    float: right;
  }
}
</style>

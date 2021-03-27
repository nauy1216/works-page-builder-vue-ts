<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";

const timeDynamic = "";
@Component({
  name: "RpSidebarRight"
})
export default class RpSidebarRight extends BaseVue {
  operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
  isShowRightOperationBoard = false;
  chooseToolName = "jtjs";

  iconData = {
    jtjs: require("./imgs/chooseJTJS.png"), // 集团介绍
    ywgl: require("./imgs/chooseYWGL.png"), //
    his: require("./imgs/chooseHIS.png"),
    spjk: require("./imgs/chooseSPJK.png")
  };

  toggleOperationBoard() {
    this.isShowRightOperationBoard = !this.isShowRightOperationBoard;
  }

  openPage(data: string) {
    if (data === "集团介绍") {
      this.chooseToolName = "jtjs";
      this.operationBoardLists = ["发展历程", "品牌家族", "集团简介", "集团动态"];
    } else if (data === "业务概览") {
      this.chooseToolName = "ywgl";
      this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
    } else if (data === "HIS病例系统") {
      this.chooseToolName = "his";
      this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
    } else if (data === "视频监控") {
      this.chooseToolName = "spjk";
      this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
    } else if (data === "发展历程") {
      this.chooseToolName = "jtjs";
      this.operationBoardLists = ["发展历程", "品牌家族", "集团简介", "集团动态"];
    } else if (data === "品牌家族") {
      this.chooseToolName = "jtjs";
      this.operationBoardLists = ["发展历程", "品牌家族", "集团简介", "集团动态"];
    } else if (data === "集团简介") {
      this.chooseToolName = "jtjs";
      this.operationBoardLists = ["发展历程", "品牌家族", "集团简介", "集团动态"];
    } else if (data === "集团动态") {
      this.chooseToolName = "jtjs";
      this.operationBoardLists = ["发展历程", "品牌家族", "集团简介", "集团动态", timeDynamic];
    } else if (data === timeDynamic) {
      //
    }
  }

  chooseTools(item: string) {
    this.chooseToolName = item;
    // if (item === "jtjs") {
    //   this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
    // } else if (item === "ywgl") {
    //   this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
    // } else if (item === "his") {
    //   this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
    // } else if (item === "spjk") {
    //   this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
    // }
    this.operationBoardLists = ["集团介绍", "业务概览", "HIS病例系统", "视频监控"];
  }

  render() {
    return (
      <section class="rp-sidebar-right">
        <div
          class="arrow"
          onClick={this.toggleOperationBoard}
          style={{
            transform: this.isShowRightOperationBoard ? "rotate(180deg)" : "rotate(0deg)"
          }}></div>
        <transition name="fade">
          <div class="operationBoard" v-show={this.isShowRightOperationBoard}>
            <div class="operationBoardBox" style="height:100%;width:100%;">
              {this.operationBoardLists.map(item => {
                return (
                  <span
                    class="operationBoardItem"
                    key={item}
                    onClick={() => {
                      this.openPage(item);
                    }}>
                    {item}
                  </span>
                );
              })}
            </div>
            <div class="operationTools">
              <ul class="toolsIcon">
                {Object.keys(this.iconData).map(item => {
                  return (
                    <li
                      class="iconInfo"
                      onClick={() => {
                        this.chooseTools(item);
                      }}
                      key={item}>
                      <img src={this.iconData[item]} class={{ chooseTool: item === this.chooseToolName }} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </transition>
      </section>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(sidebar-right) {
  position: relative;
  width: 30px;
  height: 30px;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .arrow {
    position: absolute;
    width: 30px;
    height: 30px;
    // top: 50%;
    // right: 0;
    z-index: 5;
    // margin-top: -10px;
    transition: all 0.3s;
    cursor: pointer;
    background: url("./imgs/arrow-sideBar-right.png") no-repeat center;
    background-size: 100% 100%;
  }

  .operationBoard {
    width: 674px;
    height: 1080px;
    transform: translateY(calc(-50% + 15px));
    background: url("./imgs/sideBar-right.png") no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    z-index: 2;
    right: 0;

    .operationBoardBox {
      span {
        display: inline-block;
        border-radius: 25px;
        text-align: center;
        line-height: 60px;
        width: 200px;
        height: 60px;
      }

      span:nth-child(1) {
        position: absolute;
        top: 32%;
        right: 20%;
      }

      span:nth-child(2) {
        position: absolute;
        top: 42%;
        right: 26%;
      }

      span:nth-child(3) {
        position: absolute;
        top: 52%;
        right: 26%;
      }

      span:nth-child(4) {
        position: absolute;
        top: 62%;
        right: 20%;
      }

      span:nth-child(5) {
        position: absolute;
        top: 68%;
        right: 18%;
        border: none;
        text-indent: 15px;
        background: url("./imgs/bj111.png") no-repeat center;
        background-size: 100%;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(119, 247, 244, 1);
      }
      // span:nth-child(5):before {
      //   position: absolute;
      //   top: 45%;
      //   left: 18%;
      //   content: '';
      //   display: block;
      //   width: 10px;
      //   height: 10px;
      //   border-radius: 50%;
      //   background-color: #276289;
      // }
    }

    .operationTools {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 34px;
      width: 50px;
      height: 360px;
      padding: 5px;

      .toolsIcon {
        .iconInfo {
          width: 50px;
          height: 50px;

          > img {
            display: none;
          }

          .chooseTool {
            display: block;
          }

          &:nth-child(1) {
            margin-bottom: 50px;
            transform: translateY(-2px);
          }

          &:nth-child(2) {
            margin-bottom: 52px;
          }

          &:nth-child(3) {
            margin-bottom: 53px;
          }
        }
      }
    }
  }

  .operationBoardItem {
    border: 3px solid rgb(74, 136, 180); /*use px*/
    color: #679abc;
    font-size: 26px;
  }
}
</style>

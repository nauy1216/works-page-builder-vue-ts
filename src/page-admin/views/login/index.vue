<script lang="tsx">
import BaseVue from "page-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { login } from "api/request";

@Component
export default class Login extends BaseVue {
  fromData = {
    user: "admin",
    password: "123456"
  };
  rules = {
    user: [{ required: true, message: "请输入用户名", trigger: "change" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  render() {
    return (
      <div class="login-main">
        <div class="content-box">
          <div class="login-g">
            <img src="/images/login_c.gif" />
          </div>
          <div class="inputs">
            <div class="input-content">
              <h1>智慧中心后台管理</h1>
              <el-form {...{ props: { model: this.fromData } }} ref="fromData_ref" rules={this.rules} class="demo-fromData">
                <el-form-item class="input-w500" prop="user">
                  <i class="el-icon-s-custom rp-login-i"></i>
                  <el-input vModel={this.fromData.user} maxlength="20" placeholder="请输入用户名" size="medium"></el-input>
                </el-form-item>
                <el-form-item class="input-w500" prop="password">
                  <i class="el-icon-lock rp-login-i"></i>
                  <el-input vModel={this.fromData.password} maxlength="20" placeholder="请输入密码" show-password size="medium"></el-input>
                </el-form-item>
              </el-form>
              <div class="login-btn" onClick={this.onLogin}>
                登 录
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onLogin() {
    this.$refs.fromData_ref["validate"](valid => {
      if (valid) {
        const params = {
          ad_name: this.fromData.user,
          ad_passwd: this.fromData.password
        };
        login(params).then(res => {
          if (res.code == 200 && res.details) {
            sessionStorage.setItem("userInfo", JSON.stringify(res.details.basic));
            sessionStorage.setItem("token", JSON.stringify(res.details.token));
            this.$router.replace("/appManage");
          }
        });
      } else {
        return false;
      }
    });
  }
}
</script>
<style scoped lang="scss">
.login-main {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("/images/login_back.jpg") no-repeat;
  background-size: 100% 100%;
  .content-box {
    display: flex;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 94%;
    min-width: 1330px;
    height: 680px;
    background: #ffffff;
    box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    .login-g {
      position: relative;
      flex: 1.2;
      background: #e5f1ff;
      border-radius: 10px;
      img {
        width: 70%;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .inputs {
      position: relative;
      flex: 1;
      .input-content {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        h1 {
          margin-bottom: 80px;
          font-size: 36px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #397ade;
          text-align: center;
        }
        .login-btn {
          width: 500px;
          height: 78px;
          background: #62a2ff;
          border-radius: 39px;
          text-align: center;
          line-height: 78px;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
}
.input-w500 {
  width: 500px;
  margin-bottom: 53px;
}
.input-w500 /deep/ .el-input__inner {
  padding-left: 50px;
  border: none;
  border-radius: 0;
  border-bottom: 2px solid #c0c0c0;
}
.input-w500 /deep/ .el-form-item__content {
  position: relative;
  .rp-login-i {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    width: 30px;
    height: 30px;
    background: #62a2ff;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    border-radius: 50%;
  }
}
</style>

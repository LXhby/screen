<template>
  <div class="login-container">
    <div class="main-box">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="com-login-form"
        autocomplete="off"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">数据系统登录</h3>
          <span>Data System Login</span>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <input type="password" style="display: none;">
          <el-input
            id="useript"
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名（不区分英文大小写）"
            name="username"
            type="text"
            tabindex="1"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="大写锁定开启" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <input type="password" style="display: none;">
            <el-input
              id="pwdipt"
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="new-password"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-form-item style="border:none;" class="ipt-set">
          <el-checkbox v-model="loginForm.remind">自动登录</el-checkbox>
          <el-tooltip class="pwd" content="请联系管理员重置密码" placement="right">
            <el-button type="text">忘记密码</el-button>
          </el-tooltip>
        </el-form-item>
        <el-button
          :loading="loading"
          style="width:100%;"
          class="subbtn"
          @click.native.prevent="handleLogin"
        >登录</el-button>
      </el-form>
    </div>

    <div class="botom-tip">版权所有：生命绿洲有限公司</div>
  </div>
</template>

<script>
import { validatePass, decrypt } from '@/utils/validate'
import { getUser, getRemember } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      const reg = /^[0-9A-Za-z]{5,16}$/
      if (value && value.trim()) {
        if (!reg.test(value)) {
          callback(new Error('请输入长度5-16位的英文字母或数字'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入账号'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value && value.trim()) {
        if (!validatePass(value)) {
          callback(new Error('请输入8-16位的大小写英文、数字组合'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入密码'))
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        remind: true
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          console.log('4', '')
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // Encrypt 加密
    // window.addEventListener('storage', this.afterQRScan)
    //  username: getUser(),
    //     password: decrypt(getRemember(), "baobiao"),
    // console.log("username", getUser());
    var a = getRemember()
    if (a) {
      this.loginForm.username = getUser()
      this.loginForm.password = decrypt(getRemember(), 'baobiao')
    } else {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: '/'
              })
              this.loading = false
            })
            .catch(err => {
              this.loading = false
              this.$message.error(err.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url("../../../static/img/home-bg.png") 0 0 / 100% auto no-repeat;
  .el-input {
    display: inline-block;
    height: 30px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: $light_gray;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    background: rgba(247, 249, 252, 0.2);
    background: rgba(247, 249, 252, 0.2);
    border-radius: 4px;
    color: #454545;
  }
  .el-checkbox {
    .el-checkbox__label {
      color: #29cb97;
    }
    .el-checkbox__inner {
      background-color: #29cb97;
      border-color: #29cb97;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #01193c;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 1920px;
  height: 1080px;
  .main-box {
    margin-top: 209px;
  }
  .com-login-form {
    box-sizing: border-box;
    width: 520px;
    padding: 50px 110px 46px 110px;
    max-width: 100%;
    margin: 0px auto 0 auto;
    overflow: hidden;
    background: rgba(1, 20, 43, 0.4);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;

    margin-bottom: 92px;
    .title {
      height: 45px;
      font-size: 32px;
      color: $light_gray;
      margin: 0px auto 4px auto;
      text-align: center;
      font-weight: bold;
    }
    span {
      color: #748aa1;
      font-size: 16px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .ipt-set {
    border-radius: 0px;
    color: #fff;
    background: rgba(1, 20, 43, 0.2);
    .el-checkbox__label {
      color: #fff;
    }
    .pwd {
      float: right;
      border: none;
      color: #29cb97;
    }
  }
  .subbtn {
    background: #29cb97;
    border-color: #29cb97;
    color: #fff;
  }
  .botom-tip {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 100px;
    text-align: center;
    font-size: 14px;
    color: #748aa1;
  }
}
@media only screen and (max-width: 470px) {
  .thirdparty-button {
    display: none;
  }
  .login-container {
    background-image: none;
    .main-box {
      margin-top: -200px !important;
      .title-container {
        // .title {
        //   font-size: 50px;
        //   line-height: 70px;
        // }
      }
    }
  }

  .com-login-form {
    box-sizing: border-box;
    width: 520px;
    padding: 36px 35px 46px 35px;
    max-width: 100%;
    margin: 0px auto 0 auto;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>

<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <message /> -->
      <el-dropdown class="avatar-container" trigger="click">
        <i class="el-icon-caret-bottom" />
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import Message from './Message'

export default {
  components: {
    Breadcrumb,
    Hamburger
    // Message
  },
  data() {
    return {
      ws: '',
      limitConnect: 4,
      showHot: false,
      clientKeyLength: false,
      clientMap: {}
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    const _keys = Object.keys(this.clientMap)
    this.clientKeyLength = !!_keys.length
    // this.createWebSocket()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu.messages-dropdown{
  width: 260px;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
}
.empty-message{
  width: 100%;
  line-height: 100px;
  color: #ccc;
  text-align: center;
  font-size: 14px;
}
.fix-icon{
  font-size: 32px;
  color: #ccc;
  line-height: 52px;
  margin-right: 12px;
}
.message-dropdown{
  line-height: 26px;
}
.animation-blink {
  animation: blink infinite .8s;
}
.is-hot{
  position: relative;
  &::after{
    content: '';
    display: block;
    position: absolute;
    right: -4px;
    top: -4px;
    width: 8px;
    height: 8px;
    border: 1px solid #fff;
    background: #F56C6C;
    border-radius: 50%;
  }
}
@keyframes blink {
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin: 0 10px;
      cursor: pointer;
      outline: none;
      line-height: 50px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 8px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

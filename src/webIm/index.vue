<template>
  <div id="app">
    <a-layout
      style="position: absolute;
	width: 100%;
	overflow: hidden;
	height: 100%;"
    >
      <a-layout-header class="layout-header">
        <div class="header">
          <span class="setting">
            <a-dropdown>
              <span class="ant-dropdown-link" href="#">
                <a-icon type="setting" />
                <span class="username">{{ userName }}</span>
              </span>
            </a-dropdown>
          </span>
        </div>

        <a-menu
          v-model="current"
          mode="horizontal"
          :default-selected-keys="['contact']"
          :style="{ lineHeight: '50px', background: '#434648', color: '#fff', textAlign: 'left'}"
          @click="contactTypeChange"
        >
          <a-menu-item key="contact">
            <a-icon type="user" class="navMenu-icon" />
            <span class="navMenu-text">好友</span>
            <div v-if="getUnread('contact').contact" class="tip-style">&nbsp;</div>
          </a-menu-item>
        </a-menu>
      </a-layout-header>

      <a-layout>
        <a-layout-sider
          v-model="collapsed"
          style="background: #fff"
          :width="broken ? '100%' : 350"
          breakpoint="lg"
          collapsed-width="0"
          :trigger="null"
          @collapse="onCollapse"
          @breakpoint="onBreakpoint"
        >
          <!-- <MessageBox ref="messageBox" :type="activeKey" :select="select" /> -->
        </a-layout-sider>

        <a-layout-content style="overflow: visible">
          <!-- <Message
            ref="messageList"
            :type="activeKey"
            :broken="broken"
            :hide-user-list="hideUserList"
            :show-user-list="showUserList"
          /> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
// import MessageBox from '../../components/chat/index.vue'
// import Message from '../../components/chat/message.vue'
import { mapActions } from 'vuex'
export default {
  // components: {
  //   MessageBox,
  //   Message
  // },
  data() {
    return {
      groupRead: false,
      contactRead: false,
      showSettingOptions: false,
      activeKey: 'contact',
      selectedItem: '',
      showAddOptions: false,
      addList: [
        {
          name: '添加好友',
          id: '1',
          icon: 'chat'
        },
        {
          name: '申请入群',
          id: '2',
          icon: 'friends'
        },
        {
          name: '创建群组',
          id: '3',
          icon: 'comment'
        }
      ],
      userName:
        localStorage.getItem('userInfo') &&
        JSON.parse(localStorage.getItem('userInfo')).userId,
      collapsed: false,
      broken: false,
      current: ['contact']
    }
  },
  computed: {
    chatList() {
      return this.$store.state.chat.msgList
    }
  },
  methods: {
    ...mapActions(['onLogout', 'onGetFirendBlack']),
    toLogout() {
      this.onLogout()
    },
    onCollapse(collapsed, type) {
      if (type !== 'responsive') {
        this.$data.collapsed = true
      } else {
        this.$data.collapsed = false
      }
    },
    onBreakpoint(broken) {
      this.$data.broken = broken
    },
    hideUserList() {
      this.$data.collapsed = true
    },
    showUserList() {
      this.$data.collapsed = false
    },
    select(i) {
      this.$refs.messageList.select(i)
      if (this.broken) {
        this.$data.collapsed = true
      }
    },
    GetFirendBlack() {
      this.onGetFirendBlack()
      this.$refs.firendModel.changModel()
    },
    optionsVisibleChange() {
      this.$data.showSettingOptions = !this.$data.showSettingOptions
    },
    contactTypeChange(type) {
      this.$data.activeKey = type.key
      this.$router.push(`/${type.key}`)
      if (this.broken && this.collapsed) {
        this.$data.collapsed = false
      }

      switch (type.key) {
        case 'contact':
          this.$refs.messageBox.onGetContactUserList()
          break
        case 'group':
          this.$refs.messageBox.onGetGroupUserList()
          break
        case 'chatroom':
          this.$refs.messageBox.onGetChatroomUserList()
          break
        default:
          break
      }
      this.$refs.messageList.getCurrentMsg(type.key)
    },
    addModalChange() {
      this.$data.showAddOptions = !this.$data.showAddOptions
    },
    ulClick(i) {
      // this.addModalChange();
      switch (i) {
        case '1':
          this.$refs.addFriendMethods.changeModal()
          break
        case '2':
          this.$refs.addGroupModel.changeGroupModel()
          break
        case '3':
          this.$refs.createGroupModel.changeCreateModel()
          break
        default:
          break
      }
    },
    recEmedia() {
      this.$refs.videoSetting.show()
    },
    getUnread(type) {
      const chatList = this.chatList[type]
      const obj = {
        contact: false,
        group: false
      }
      if (JSON.stringify(chatList) !== '{}') {
        for (const item in chatList) {
          chatList[item].map((v, k) => {
            if (v.status === 'unread') {
              if (v.chatType === 'group') {
                obj.group = true
              }
              if (v.chatType === 'contact') {
                obj.contact = true
              }
            }
            return obj
          })
        }
      }
      return {
        contact: obj.contact,
        group: obj.group
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-style : normal;
  font-weight: 400;
  font-family: 'vant-icon';
  src        : url(https://img.yzcdn.cn/vant/vant-icon-3a7dc2.woff2) format('woff2'), url(https://img.yzcdn.cn/vant/vant-icon-3a7dc2.woff) format('woff'), url(https://img.yzcdn.cn/vant/vant-icon-3a7dc2.ttf) format('truetype')
}

.layout-header {
  height    : 100px !important;
  background: #434648 !important;
  padding   : 0 !important;

  .header {
    height         : 47px;
    display        : flex;
    line-height    : 50px;
    padding        : 0 16px;
    justify-content: space-between;

    .setting {
      color      : #fff;
      font-size  : 16px;
      font-weight: 700;
      cursor     : pointer;
    }
  }

  .navMenu-icon {
    font-size   : 20px !important;
    margin-right: 5px !important;
  }

  .navMenu-text {
    font-size: 16px;
  }

  .ant-menu-horizontal>.ant-menu-item:hover,
  .ant-menu-horizontal>.ant-menu-submenu:hover,
  .ant-menu-horizontal>.ant-menu-item-active,
  .ant-menu-horizontal>.ant-menu-submenu-active,
  .ant-menu-horizontal>.ant-menu-item-open,
  .ant-menu-horizontal>.ant-menu-submenu-open,
  .ant-menu-horizontal>.ant-menu-item-selected,
  .ant-menu-horizontal>.ant-menu-submenu-selected {
    border-bottom: 2px solid #2bb907 !important;
    color        : #05af4a !important;
  }
}

.van-icon {
  position              : relative;
  font                  : 14px/1 "vant-icon";
  font-size             : inherit;
  text-rendering        : auto;
  -webkit-font-smoothing: antialiased
}

.tip-style {
  display         : inline-block;
  width           : 10px;
  height          : 10px;
  background-color: red;
  border-radius   : 50%;
  position        : relative;
  top             : 10px;

}

.contact {
  width   : 100%;
  height  : 100%;
  overflow: hidden;

  .mask {
    width   : 100%;
    position: fixed;
    cursor  : default;
    left    : 0;
    right   : 0;
    top     : 0;
    bottom  : 0
  }

  .header {
    width     : 100%;
    height    : 50px;
    background: #000;
    color     : #fff;
    position  : relative;
    text-align: left !important;

    .setting {
      display    : inline-block;
      margin-left: 12px;
      margin-top : 12px;
    }

    .options {
      position          : absolute;
      top               : 40px;
      width             : 130px;
      background-color  : #fff;
      list-style-type   : none;
      padding           : 0;
      margin            : 0;
      text-align        : left;
      background-color  : #fff;
      border-radius     : 2px;
      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      box-shadow        : 0 1px 6px rgba(0, 0, 0, 0.2);
      z-index           : 99;

      .option {
        width      : 100%;
        padding    : 7px 8px;
        margin     : 0;
        clear      : both;
        font-size  : 14px;
        font-weight: normal;
        color      : rgba(0, 0, 0, 0.65);
        white-space: nowrap;
        cursor     : pointer;
      }

      .option:hover {
        background-color: #dbdbdb;
      }
    }

    .options2 {
      right     : 10px;
      text-align: center;
      z-index   : 999;
    }

    .option2 {
      display        : flex;
      justify-content: center;
    }

    .option2:hover {
      background-color: rgb(219, 219, 219)
    }

    .add-style {
      // display  : inline-block;
      margin-right: 12px;
      margin-top  : 12px;
      float       : right;
      cursor      : pointer;
    }

    .username {
      position: relative;
      top     : -5px;
    }
  }

  .content {
    width   : 100%;
    height  : calc(100% - 50px);
    overflow: hidden;

    .van-tabs,
    .van-tab__pane {
      height: 100%;
    }

    .van-tab {
      text-align : center;
      display    : inline-block;
      width      : 122px;
      line-height: 50px;
      padding    : 0 20px;
      cursor     : pointer;

      &::before {
        content       : "\F02D";
        font          : 20px/1 "vant-icon";
        vertical-align: text-top;
        margin-right  : 5px;
      }

    }

    .van-tabs__content {
      height: calc(100% - 50px);
    }

    .van-tabs__nav {
      background: #000;
      color     : #fff;
      text-align: left !important;
    }

    .van-tabs__line {
      background  : #00ba6e;
      width       : 122px !important;
      height      : 2px;
      /* transform: translateX(0) translateX(0) !important; */
    }
  }
}
</style>

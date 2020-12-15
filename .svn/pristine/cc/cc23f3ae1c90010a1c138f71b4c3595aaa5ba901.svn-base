<template>
  <div>
    <el-dropdown trigger="click" style="display:inline-block;height: 100%; line-height: 50px;" class="message">
      <i class="el-icon-message" :class="showHot ? 'is-hot animation-blink' : ''" style="font-size: 20px" />
      <el-dropdown-menu slot="dropdown" class="messages-dropdown">
        <div v-if="clientKeyLength">
          <el-dropdown-item v-for="(value,key) in clientMap" :key="key" divided class="message-dropdown-item" @click.native="targetId = key;show = true">
            <div style="display:flex" :class="value.unreadMessageCount ? 'is-hot' : ''">
              <i class="el-icon-s-custom fix-icon" />
              <div style="overflow:hidden">
                <div style="color: #ccc" class="text-overflow message-dropdown">客服：{{ key }}</div>
                <div class="text-overflow message-dropdown">内容：{{ value.latestMessage.content }}</div>
                <div style="line-height: 14px;font-size: 12px; color: #ccc">{{ value.sentTime }}</div>
              </div>
            </div>
          </el-dropdown-item>
        </div>
        <div v-else class="empty-message">
          暂无消息
        </div>
      </el-dropdown-menu>
    </el-dropdown>

    <transition name="el-fade-in-linear">
      <div v-show="show" class="chat-container">
        <div class="chat-top">
          <div style="flex: 1">与{{ targetId }}对话中</div>
          <div>
            <i class="el-icon-close" @click.prevent="show = false" />
          </div>
        </div>
        <div class="chat-content">
          <div style="height: 100%; width: 200px; border-right: 1px solid #eee; overflow: auto">
            <div>
              <div v-for="(value, key) in clientMap" :key="key" class="chat-info" :class="targetId == key ? 'chat-info_select' : ''" @click="targetId = key">
                <div class="text-overflow">{{ key }}</div>
                <div class="text-overflow" style="font-size:14px; color: #999;line-height: 22px">{{ value.latestMessage.content }}</div>
                <div style="font-size: 12px; color: #ccc">{{ value.sentTime }}</div>

                <div class="chat-info_pointer">{{ value.unreadMessageCount > 99 ? '99+' : value.unreadMessageCount }}</div>
              </div>
            </div>
          </div>
          <div style="flex: 1">
            <div class="chat-history-message">
              <div>
                <div v-for="message in chatHistory" :key="message.id" :class="message.type === 'to' ? 'to' : 'from'">
                  <div class="chat-message">
                    {{ message.content }}
                  </div>
                  <div class="chat-message_info">
                    <span>2020-02-02 16:50:12</span>
                    <span class="chat-message_icon-tip">
                      <i class="el-icon-check" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-repeat">
              <div id="message-content" contenteditable="true" style="flex: 1" @keyup.enter="sendMessage" />
              <div style="padding: 10px">
                <el-button type="primary" plain @click="sendMessage">发送</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const RongIMLib = require('@/utils/RongIMLib-2.5.9.js')
const protobuf = require('@/utils/protobuf-2.3.9.min.js')
const RongIMClient = RongIMLib.RongIMClient
const appKey = 'e5t4ouvpe8rpa'
const token = 'p9mkdx+pGX2n5KiwS2zr67TEAAEB0mW/q9L+ucPIuVbeYTmoljQpXbWqYyYH/RUW@j5hj.cn.rongnav.com;j5hj.cn.rongcfg.com'
export default {
  data() {
    return {
      list: [],
      show: false,
      showHot: false,
      clientKeyLength: true,
      clientMap: {
        1: { conversationType: 1,
          targetId: 1,
          latestMessageId: 1,
          unreadMessageCount: 2,
          latestMessage: { content: 'test' },
          sentTime: '2020-09-09 16:56:23'
        },
        2: { conversationType: 1,
          targetId: 1,
          latestMessageId: 1,
          unreadMessageCount: 2,
          latestMessage: { content: 'test' },
          sentTime: '2020-09-09 16:56:23'
        },
        3: { conversationType: 1,
          targetId: 1,
          latestMessageId: 1,
          unreadMessageCount: 2,
          latestMessage: { content: 'test' },
          sentTime: '2020-09-09 16:56:23'
        },
        4: { conversationType: 1,
          targetId: 1,
          latestMessageId: 1,
          unreadMessageCount: 2,
          latestMessage: { content: 'test' },
          sentTime: '2020-09-09 16:56:23'
        },
        5: { conversationType: 1,
          targetId: 1,
          latestMessageId: 1,
          unreadMessageCount: 2,
          latestMessage: { content: 'test' },
          sentTime: '2020-09-09 16:56:23'
        },
        6: { conversationType: 1,
          targetId: 1,
          latestMessageId: 1,
          unreadMessageCount: 2,
          latestMessage: { content: 'test' },
          sentTime: '2020-09-09 16:56:23'
        }
      },
      chatHistory: [{
        id: 1,
        content: 'test1',
        type: 'to'
      }, {
        id: 2,
        content: 'test223641694994123165494564564894848484884test223641694994123165494564564894848484884',
        type: 'from'
      }, {
        id: 3,
        content: 'test3',
        type: 'to'
      }, {
        id: 4,
        content: 'test4',
        type: 'from'
      }],
      clientHistory: {},
      targetId: 1,
      messageContent: ''
    }
  },
  created() {
    this.initRongIM()
  },
  mounted() {
    this.initDrop()
  },
  methods: {
    initRongIM() {
      RongIMClient.init(appKey, null, { protobuf })

      RongIMClient.setConnectionStatusListener({
        onChanged: function(status) {
          /* status 标识当前连接状态 */
          console.log('连接成功')
        }
      })
      this.getConversationList()
    },
    connectRongIM() {
      return new Promise((resolve, reject) => {
        RongIMClient.connect(token, {
          onSuccess: function(userId) {
            console.log('连接成功, 用户 ID 为', userId)
            resolve(userId)
          },
          onTokenIncorrect: function() {
            console.log('连接失败, 失败原因: token 无效')
            reject()
          },
          onError: function(errorCode) {
            console.log('连接失败, 失败原因: ', errorCode)
            reject(errorCode)
          }
        })
      })
    },
    async getConversationList() {
      const self = this
      await this.connectRongIM()
      RongIMClient.getInstance().getConversationList({
        onSuccess: function(list) {
          list.map(item => {
            self.clientMap[item.targetId] = item
          })
        },
        onError: function(error) {
          console.log('获取会话失败', error)
        }
      }, null)
    },
    sendMessage() {
      const messageContent = document.querySelector('#message-content')
      if (!messageContent.innerText.trim()) return
      this.chatHistory.push({
        id: Math.random(),
        content: messageContent.innerText,
        type: 'to'
      })

      this.$nextTick(_ => {
        this.scrollToBottom()
      })
      messageContent.innerText = ''
    },

    scrollToBottom(dom) {
      const historyMesaage = document.querySelector('.chat-history-message')
      historyMesaage.scrollTop = historyMesaage.scrollHeight
    },

    initDrop() {
      const container = document.querySelector('.chat-container')
      const top = document.querySelector('.chat-top')
      if (!container || !top) return
      let x = 0
      let y = 0
      let l = 0
      let t = 0
      let isDown = false

      top.onmousedown = function(e) {
        // 获取x坐标和y坐标
        x = e.clientX
        y = e.clientY

        // 获取左部和顶部的偏移量
        l = container.offsetLeft
        t = container.offsetTop
        // 开关打开
        isDown = true
        // 设置样式
        top.style.cursor = 'move'
      }
      // 鼠标移动
      window.onmousemove = function(e) {
        if (isDown === false) {
          return
        }
        // 获取x和y
        const nx = e.clientX
        const ny = e.clientY
        // 计算移动后的左偏移量和顶部的偏移量
        const nl = nx - (x - l)
        const nt = ny - (y - t)

        container.style.left = nl + 'px'
        container.style.top = nt + 'px'
      }
      // 鼠标抬起事件
      top.onmouseup = function() {
        // 开关关闭
        isDown = false
        top.style.cursor = 'default'
      }
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

.chat-container{
  width: 600px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  border-radius: 4px;
  border: 1px solid #ccc;
  overflow: hidden;
  z-index: 99;
  .chat-top{
    border-bottom: 1px solid #eee;
    // padding: 5px 15px;
    height: 40px;
    line-height: 40px;
    background-color: #576bd7;
    padding: 0 10px;
    color: #fff;
    display: flex;
  }
  .chat-content{
    display: flex;
    height: calc(100% - 40px);
  }

  .chat-info{
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: .2s;
    position: relative;
  }
  .chat-info_select{
    background-color: #f0f0f0;
  }
  .chat-info_pointer{
    border-radius: 8px;
    background-color: #F56C6C;
    color: #fff;
    position: absolute;
    right: 5px;
    top: 5px;
    min-width: 18px;
    padding: 0 4px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
  }

  .chat-history-message{
    height: 380px;
    border-bottom: 1px solid #eee;
    padding: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    .chat-message{
      padding: 6px;
      border-radius: 4px;
      background-color: #576bd7;
      color: #fff;
      // margin-bottom: 10px;
      word-break: break-all;
      display: inline-block;
      font-size: 14px;
    }
    .chat-message_info{
      margin-bottom: 10px;
      line-height: 20px;
      font-size: 12px;
      color: #ccc;
    }
    .chat-message_icon-tip{
      color: #576bd7;
      margin-left: 5px;
    }
    .to{
      text-align: right;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        display: block;
        border-left: 6px solid #576bd7;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        top: 5px;
        right: -6px;
      }
      .chat-message{
        text-align: left;
      }
    }
    .from{
      position: relative;
      &::after{
        content: '';
        position: absolute;
        display: block;
        border-right: 6px solid #ccc;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        top: 5px;
        left: -6px;
      }
      .chat-message{
        background-color: #ccc;
        color: #000;
      }
    }
  }
  .chat-repeat{
    height: calc(100% - 380px);
    display: flex;
  }

  #message-content{
    padding: 10px;
    word-break: break-all;
    height: 100%;
    overflow: auto;
    font-size: 14px;
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>

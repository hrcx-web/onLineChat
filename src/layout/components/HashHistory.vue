<template>
  <div class="history-container">
    <div class="history-arrow">
      <i class="el-icon-d-arrow-left" @click="transformTab('left')" />
    </div>
    <div class="out-width">
      <!-- <div class="fix-width">

      </div> -->

      <el-tag v-for="(item,index) in tabs" :key="index" size="mini" :closable="tabs.length > 1" :effect="item.path === $route.path ? 'dark' : 'plain'" style="margin-right: 6px" :class="item.path === $route.path ? 'select-history-tab': ''" class="history-tab" @close="closeTag(index)">
        <router-link :to="item.path">
          {{ item.title }}
        </router-link>
      </el-tag>
    </div>
    <div class="history-arrow">
      <i class="el-icon-d-arrow-right" @click="transformTab('right')" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Drowdown from './Dropdown.vue'
export default {
  data() {
    return {
      tabs: this.$store.state.user.history || [],
      comp: ''
    }
  },
  watch: {
    $route() {
      this.tabs = this.$store.state.user.history

      this.moveLine()

      this.$nextTick(_ => {
        this.tabRollPage()
        this.rightClick()
      })
    }
  },
  mounted() {
    this.tabRollPage()
    this.rightClick()

    window.addEventListener('click', (e) => {
      if (this.comp) this.comp.remove()
    })
  },
  methods: {
    moveLine() {
      this.$nextTick(_ => {
        const whiteLine = document.querySelector('.white-line')
        setTimeout(() => {
          const activeItem = document.querySelector('.is-active .el-submenu__title') || document.querySelector('.el-menu-item.is-active')
          if (activeItem) { // 修改记录
            const activeItemHeight = activeItem.getBoundingClientRect().y - 10
            whiteLine.style.transform = `translateY(${activeItemHeight}px)`
          }
        }, 300)
      })
    },
    rightClick() {
      const tabs = document.querySelectorAll('.history-tab')
      tabs.forEach((item, index) => {
        item.addEventListener('contextmenu', (e) => {
          e.preventDefault()
          if (!this.comp) {
            const _props = {
              tabs: this.tabs,
              index
            }
            this.comp = this.createDropdown(_props, () => {
              this.comp = ''
            })
          }

          const dropdown = document.querySelector('.dropdown')
          dropdown.style.left = `${e.clientX}px`
          dropdown.style.top = `${e.clientY}px`
        })
      })
    },
    createDropdown(props, cb) {
      const vm = new Vue({
        render: h => h(Drowdown, { props })
      }).$mount()
      document.body.appendChild(vm.$el)
      vm.$parent = this
      const comp = vm.$children[0]
      comp.remove = () => {
        document.body.removeChild(vm.$el)
        comp.$destroy()
        cb()
      }
      return comp
    },
    tabRollPage() {
      const outDom = document.querySelector('.out-width')
      const select = document.querySelector('.select-history-tab')
      outDom.scrollLeft = select.offsetLeft - 25
    },
    transformTab(type) {
      this.transformAnimation(0, 30, type)
    },
    transformAnimation(num, maxNum, type) {
      const outDom = document.querySelector('.out-width')
      let numText = num
      let golb // 为了清除requestAnimationFrame
      function numSlideFun() {
        numText++
        if (numText >= maxNum) {
          numText = maxNum
          cancelAnimationFrame(golb)
        } else {
          if (type === 'left') {
            outDom.scrollLeft = outDom.scrollLeft - (maxNum * 0.2)
          } else {
            outDom.scrollLeft = outDom.scrollLeft + (maxNum * 0.2)
          }
          golb = requestAnimationFrame(numSlideFun)
        }
      }
      numSlideFun()
    },
    closeTag(index) {
      if (this.tabs.length <= 1) return
      this.tabs.splice(index, 1)

      this.$store.commit('user/SET_HISTORY', this.tabs || [])
      sessionStorage.setItem('history', JSON.stringify(this.tabs || []))

      this.$nextTick(_ => {
        if (index === 0) {
          this.$router.push({ path: this.tabs[0].path })
        } else {
          this.$router.push({ path: this.tabs[index - 1].path })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container{
  width: 100%;
  height: 30px;
  line-height: 22px;
  box-sizing: border-box;
  padding: 4px;
  overflow: hidden;
  display: flex;

  .out-width{
    width: calc(100% - 32px);
    overflow: hidden;
    white-space: nowrap;
    transition: .2s;
  }

  .fix-width{
    transition: .2s;
    white-space: nowrap;
  }
  .history-arrow{
    color: #576BD7;
    line-height: 24px;
    cursor: pointer;
  }
  .actived-tab{
    background: #576BD7;
    color: #fff;
  }
}
</style>

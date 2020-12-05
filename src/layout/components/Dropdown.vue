<template>
  <div class="dropdown">
    <ul>
      <li @click.stop="closeTag('current')">关闭</li>
      <li @click.stop="closeTag('left')">关闭左侧标签页</li>
      <li @click.stop="closeTag('right')">关闭右侧标签页</li>
      <li @click.stop="closeTag('other')">关闭其他标签页</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    closeTag(type) {
      const tabs = this.tabs
      const index = this.index
      const parent = this.$parent.$parent

      if (type === 'current') {
        const path = tabs[index].path
        tabs.splice(index, 1)
        this.$nextTick(_ => {
          if (path === parent.$route.path) parent.$router.push({ path: tabs[index - 1].path })
        })
      } else if (type === 'other') {
        const item = tabs[index]
        tabs.splice(0, tabs.length)
        tabs.push(item)
        this.$nextTick(_ => {
          parent.$router.push({ path: item.path })
        })
      } else if (type === 'left') {
        const item = tabs[index]
        tabs.splice(0, index)
        this.$nextTick(_ => {
          parent.$router.push({ path: item.path })
        })
      } else if (type === 'right') {
        const item = tabs[index]
        tabs.splice(index + 1, tabs.length - index)
        this.$nextTick(_ => {
          parent.$router.push({ path: item.path })
        })
      }

      parent.$store.commit('user/SET_HISTORY', tabs || [])
      sessionStorage.setItem('history', JSON.stringify(tabs || []))
      parent.comp.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.dropdown{
  position: fixed;
  border-radius: 4px;
  border: 1px solid #eee;
  z-index: 99;
  background: #fff;
  box-shadow: 1px 1px 5px 1px rgba($color: #000000, $alpha: .1);
  li {
    font-size: 14px;
    padding: 8px;
    display: block;
    cursor: pointer;
    transition: .2s;
  }
  li:hover{
    background: #eef0fb;
    color: #576BD7;
  }
  li:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
}
</style>

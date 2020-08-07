<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    />
  </div>
</template>

<script>
import { query } from '@/api/user'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      pageNum: 1, // 页码
      pageSize: 10, // 一页几条
      row: [] // 存储用户管理
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      query({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then((data) => {
          if (data.code === 200) {
            this.row = data.rows
            console.log(this.row)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
</style>

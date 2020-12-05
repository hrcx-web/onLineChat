<template>
  <div class="app-container">
    <div class="top">
      <div class="top-left">客服列表页</div>
      <!-- <div class="top-right">
        <el-button size="small" :disabled="sels.length === 0" type="danger" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
        <el-button type="primary" size="small" @click="showDialog('add')">新增</el-button>
      </div> -->
    </div>

    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column align="center" label="发起时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-size="pager.pageSize"
      :pager-index="pager.pageNo"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />
  </div>
</template>

<script>
import { customerList } from '@/api/customer'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableData: {
        loading: false,
        array: []
      },
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo,
        pageSize: this.pager.pageSize
      })
      customerList(_form)
        .then(res => {
          this.tableData.array = res.rows
          this.pager.total = res.data
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    handlePagerChange(val) {
      this.pager.pageSize = val.size
      this.pager.pageNo = val.index
      this.fetchData()
    }

  }
}

</script>
<style scoped>

</style>

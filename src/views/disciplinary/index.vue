<template>
  <div class="app-container">
    <div class="top">
      <div class="top-left">惩戒记录</div>
      <div class="top-right">
        <el-button size="small" :disabled="sels.length === 0" type="danger" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
      </div>
    </div>
    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
      @selection-change="selsChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="用户昵称/公会名">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="用户手机号/公会id">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column align="center" label="账号类型">
        <template slot-scope="scope">{{ map.userType[scope.row.userType] }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作类型">
        <template slot-scope="scope">{{ map.type[scope.row.type] }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作金额">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作说明">
        <template slot-scope="scope">{{ scope.row.reason }}</template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />
  </div>
</template>

<script>
import { warnLogList, warnLogDele } from '@/api/user'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      sels: [],
      tableData: {
        array: [],
        row: {},
        loading: false
      },
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      map: {
        type: {
          1: '冻结收益',
          2: '扣除收益',
          3: '封号',
          4: '关播'
        },
        userType: {
          1: '用户',
          2: '公会'
        }
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
      warnLogList(_form)
        .then(res => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map((row) => row.id).join(',')
      this.$confirm('确定要删除选中的惩戒记录信息吗?', '提示')
        .then(() => {
          warnLogDele({
            ids: ids
          }).then((data) => {
            this.$message.success(data.message)
            this.fetchData()
          })
        })
        .catch((error) => {
          console.log(error)
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

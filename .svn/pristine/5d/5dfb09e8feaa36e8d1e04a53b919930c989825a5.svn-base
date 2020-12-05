<template>
  <div class="app-container">
    <div class="top">
      <div class="top-left">公会月报详情</div>
    </div>
    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column align="center" sortable="custom" prop="tradeCash" label="公会提现金额" />
      <el-table-column align="center" sortable="custom" prop="tradeProfit" label="公会提成" />
      <el-table-column align="center" prop="userName" label="主播名" />
      <el-table-column align="center" sortable="custom" prop="userGiftProfit" label="主播礼物收益" />
      <el-table-column align="center" sortable="custom" prop="userOrderProfit" label="主播接单收益" />
      <el-table-column align="center" prop="num" label="接通数" />
      <el-table-column align="center" sortable="custom" prop="orderNum" label="接单数" />
      <el-table-column align="center" label="接通率">
        <template slot-scope="scope">{{ (scope.row.successNum)/(scope.row.orderNum) ||'' }}</template>
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
import { tradeLogDetail } from '@/api/union'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableData: {
        loading: false,
        array: [],
        row: {}

      },
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        type: 2
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.tableData.loading = true
      const tradeId = this.$route.query.tradeId
      const _form = Object.assign({
        tradeId: tradeId,
        pageNo: this.pager.pageNo,
        pageSize: this.pager.pageSize,
        type: this.pager.type
      })
      tradeLogDetail(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    handlePagerChange(val) {
      this.pager.pageNo = val.index
      this.pager.pageSize = val.size
      this.fetchData()
    },
    sortChange(column, prop) {
      this.tableData.loading = true
      var sortingType = column.order
      if (sortingType === 'descending') {
        sortingType = '2'
      }
      if (sortingType === 'ascending') {
        sortingType = '1'
      }
      const _form = Object.assign({
        pageNo: 1,
        pageSize: this.pager.pageSize,
        type: this.pager.type,
        sort: sortingType,
        sortName: column.prop
      })
      tradeLogDetail(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    }

  }
}

</script>
<style scoped>
</style>

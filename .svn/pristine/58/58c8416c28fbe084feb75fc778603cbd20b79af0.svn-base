<template>
  <div class="app-container">
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-input v-model="filter.userName" placeholder="请输入成员昵称" style="width:140px" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.tradeType" clearable placeholder="请选择公会类型">
            <el-option v-for="(value, key) in map.tradeType" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.type" clearable placeholder="请选择订单类型">
            <el-option v-for="(value, key) in map.type" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchDataC" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">成员订单流水</div>
    </div>
    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
    >

      <el-table-column align="center" label="公会名">
        <template slot-scope="scope">{{ scope.row.tradeId }}</template>
      </el-table-column>
      <el-table-column align="center" label="发起用户">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column align="center" label="接单成员">
        <template slot-scope="scope">{{ scope.row.toUserId }}</template>
      </el-table-column>
      <el-table-column align="center" label="礼物/技能">
        <template slot-scope="scope">{{ scope.row.giftName }}</template>
      </el-table-column>
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">{{ map.type[scope.row.type] }}</template>
      </el-table-column>
      <el-table-column align="center" label="数量">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column align="center" label="单价">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column align="center" label="总价">
        <template slot-scope="scope">{{ scope.row.coin }}</template>
      </el-table-column>

      <el-table-column align="center" label="成员收益(元)">
        <template slot-scope="scope">{{ (scope.row.toUserProfit)/100||'' }}</template>
      </el-table-column>
      <el-table-column align="center" label="公会收益(元)">
        <template slot-scope="scope">
          <p>一级收益:  {{ (scope.row.tradeProfit)/100||'' }}</p>
          <p>二级收益:{{ (scope.row.secondTradeProfit)/100||'' }}</p>
        </template>

      </el-table-column>
      <el-table-column align="center" label="下单时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
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
import { skillOrder } from '@/api/union'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableData: {
        array: [],
        row: {},
        loading: false
      },
      pager: {
        pageNo: 1,
        pageSize: 10,
        pageNoC: 1,
        pageSizeC: 10,
        total: 0
      },
      map: {
        type: {
          1: '礼物赠送',
          2: '视频通话',
          3: '语音通话',
          4: '守护',
          5: '观看付费视频'

        },
        tradeType: {
          1: '一级公会',
          2: '二级公会'
        }

      },
      tradeId: '',
      filter: {
        userName: '',
        type: '',
        tradeType: ''
      }

    }
  },
  created() {
    this.fetchData()
    this.fetchData1()
  },
  methods: {
    fetchDataC() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNoC, // 页数
        pageSize: this.pager.pageSizeC // 条数
      }, this.filter)
      skillOrder(_form)
        .then((res) => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    fetchData1() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        tradeId: this.tradeId
      }, this.filter)
      skillOrder(_form)
        .then((res) => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    fetchData() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize // 条数
      }, this.filter)
      skillOrder(_form)
        .then((res) => {
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
    }
  }
}

</script>
<style scoped>
</style>

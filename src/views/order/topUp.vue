<template>
  <div class="app-container">
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-date-picker
            v-model="filter.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="filter.createTime"
            type="date"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择当天日期"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.distributorId" clearable placeholder="请选择渠道商">
            <el-option v-for="(value, key) in map.channel" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.status" clearable placeholder="请选择订单状态">
            <el-option v-for="(value, key) in map.status" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-form-item>

          <el-input v-model="filter.userName" clearable placeholder="请输入昵称" />

        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchData" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">钻石充值订单</div>
    </div>
    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="外部订单">
        <template slot-scope="scope">{{ scope.row.outId }}</template>
      </el-table-column>
      <el-table-column align="center" label="支付类型">
        <template slot-scope="scope">{{ map.payType[scope.row.payType] }}</template>
      </el-table-column>
      <el-table-column align="center" label="充值前余额">
        <template slot-scope="scope">{{ scope.row.agoBalance }}</template>
      </el-table-column>
      <el-table-column align="center" label="充值后余额">
        <template slot-scope="scope">{{ scope.row.lastBalance }}</template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">{{ map.status[scope.row.status] }}</template>
      </el-table-column>
      <el-table-column align="center" label="发起时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column> -->
      <el-table-column align="center" label="是否首充/充值钻石数">
        <template slot-scope="scope">
          <p>{{ map.reserved2[scope.row.reserved2] }}</p>
          {{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作金额">
        <template slot-scope="scope">{{ scope.row.money+'元' }}</template>
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
import { orderList } from '@/api/order'
import { getMap } from '@/api/robot'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      filter: {
        time: [],
        createTime: '',
        status: '',
        userName: '',
        distributorId: ''// 渠道商
      },
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
      },
      map: {
        reserved2: {
          1: '是'
        },
        channel: {},
        payType: {
          2: '支付宝',
          1: '微信'

        },
        status: {
          0: '待支付',
          1: '已支付'
        }
      }
    }
  },
  created() {
    this.fetchData()
    this.getMap()
  },
  methods: {
    fetchData() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo,
        pageSize: this.pager.pageSize,
        type: this.pager.type
      }, this.filter)
      if (Array.isArray(_form.time) && _form.time.length === 2) {
        _form.begin_date = _form.time[0]
        _form.end_date = _form.time[1]
      }
      if (Array.isArray(_form.time) && _form.time.length === 2 && (_form.time[0] === _form.time[1])) {
        _form.begin_date = _form.time[0] + ' ' + '00:00:00'
        _form.end_date = _form.time[1] + ' ' + '23:59:59'
      }
      delete _form.time
      orderList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    handlePagerChange(val) {
      this.pager.pageSize = val.size
      this.pager.pageNo = val.index
      this.fetchData()
    },
    // 渠道商id
    getMap() {
      this.tableData.loading = true
      getMap().then(res => {
        const { result = {}} = res
        if (Array.isArray(result)) {
          this.map.channel = Object.assign(...result)
        }
      }).finally(_ => {
        this.tableData.loading = false
      })
    }
  }
}

</script>
<style scoped>
</style>

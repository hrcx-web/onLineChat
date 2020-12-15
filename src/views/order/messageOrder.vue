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
          <el-input v-model="filter.toUserId" style="width:140px" clearable placeholder="请输入主播昵称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchDataC" />
        </el-form-item>
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">消息订单</div>
    </div>
    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
    >

      <el-table-column align="center" label="发起人">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column align="center" label="主播昵称">
        <template slot-scope="scope">{{ scope.row.toUserId }}</template>
      </el-table-column>
      <el-table-column align="center" label="消息">
        <template slot-scope="scope">{{ scope.row.orderInfo }}</template>
      </el-table-column>
      <el-table-column align="center" label="消息类型">
        <template slot-scope="scope">{{ map.flag[scope.row.flag] }}</template>
      </el-table-column>
      <el-table-column align="center" label="交易钻石">
        <template slot-scope="scope">
          <p>单次钻石:{{ scope.row.coin }}</p>
          <p>总钻石:{{ scope.row.totalCoin }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="系统抽成">
        <template slot-scope="scope">{{ scope.row.fees }}</template>
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
import { usersOrderList } from '@/api/BetweenUsers'
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
        type7: 7

      },
      filter: {
        time: [],
        toUserId: '',
        createTime: ''
      },
      map: {
        flag: {
          1: '文本',
          2: '表情',
          3: '音频',
          4: '图片'
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
        pageSize: this.pager.pageSize,
        type: this.pager.type7
      }, this.filter)
      if (Array.isArray(_form.time) && _form.time.length === 2) {
        _form.begin_date = _form.time[0]
        _form.end_date = _form.time[1]
      }
      delete _form.time
      usersOrderList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    fetchDataC() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo,
        pageSize: this.pager.pageSize,
        type: this.pager.type7
      }, this.filter)
      if (Array.isArray(_form.time) && _form.time.length === 2) {
        _form.begin_date = _form.time[0]
        _form.end_date = _form.time[1]
      }
      delete _form.time
      usersOrderList(_form).then(res => {
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
    }
  }
}

</script>
<style scoped>
</style>

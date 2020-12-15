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
          <el-select v-model="filter.status" clearable placeholder="请选择抢单状态">
            <el-option v-for="(value, key) in map.status" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.toUserId" clearable placeholder="请输入主播昵称" />
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchDataC" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">抢单记录</div>
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
      <el-table-column align="center" label="主播昵称">
        <template slot-scope="scope">{{ scope.row.toUserId }}</template>
      </el-table-column>
      <el-table-column align="center" label="抢单主播">
        <template slot-scope="scope">{{ scope.row.toUserName }}</template>
      </el-table-column>
      <el-table-column align="center" label="抢单状态">
        <template slot-scope="scope">{{ map.status[scope.row.status] }}</template>
      </el-table-column>
      <el-table-column align="center" label="抢单时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row :gutter="5">
            <el-col :span="14">
              <el-button size="mini" @click="handleClick(scope.row)">查看订单详情</el-button>
            </el-col>
          </el-row>
        </template>
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
import { dequeOrderList } from '@/api/order'
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
        status: {
          0: '失败',
          1: '成功'
        }
      },
      filter: {
        toUserId: '',
        time: [],
        createTime: '',
        status: ''
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
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize // 条数
      }, this.filter)
      if (Array.isArray(_form.time) && _form.time.length === 2) {
        _form.begin_date = _form.time[0]
        _form.end_date = _form.time[1]
      }
      delete _form.time
      dequeOrderList(_form)
        .then((res) => {
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
        pageNo: this.pager.pageNoC, // 页数
        pageSize: this.pager.pageSizeC// 条数
      }, this.filter)
      if (Array.isArray(_form.time) && _form.time.length === 2) {
        _form.begin_date = _form.time[0]
        _form.end_date = _form.time[1]
      }
      delete _form.time
      dequeOrderList(_form)
        .then((res) => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    // 跳转视频页面
    handleClick(item) {
      console.log(item.orderId)
      this.$router.push({ name: 'voice', query: { orderId: item.orderId }})
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

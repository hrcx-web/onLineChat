<template>
  <div class="app-container">
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-select v-model="filter.type" clearable>
            <el-option v-for="(value, key) in map.type" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="filter.type==3">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchData3" />
        </el-form-item>
        <el-form-item v-if="filter.type==2">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchData2" />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="filter.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
          <el-date-picker
            v-model="filter.createTime"
            type="date"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择当天日期"
          />
          <el-select v-model="filter.userType" clearable placeholder="主播选择">
            <el-option v-for="(value, key) in map.userType" :key="key" :value="key" :label="value" />
          </el-select>
          <el-select v-model="filter.orderStatus" clearable placeholder="请选择订单状态">
            <el-option v-for="(value, key) in map.orderStatus" :key="key" :value="key" :label="value" />
          </el-select>
          <el-select v-model="filter.endStatus" clearable placeholder="请选择挂断状态">
            <el-option v-for="(value, key) in map.endStatus" :key="key" :value="key" :label="value" />
          </el-select>
          <el-input v-model="filter.toUserId" style="width:140px" clearable placeholder="请输入主播昵称" />
          <el-button v-if="filter.type==3" type="primary" size="mini" icon="el-icon-search" @click="fetchData3" />
          <el-button v-if="filter.type==2" type="primary" size="mini" icon="el-icon-search" @click="fetchData2" />
          <el-button v-if="filter.type==''" type="primary" size="mini" icon="el-icon-search" @click="fetchData" />
        </el-form-item>
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">视频语音订单</div>
      <div class="top-right">
        <!-- <el-button type="danger" size="small" :disabled="sels.length === 0" @click="deleteFileOrDirectory(sels)">批量删除</el-button> -->
        <!-- <el-button type="primary" plain size="small" @click="showDialog('videoOrder')">新增</el-button> -->
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

      <el-table-column align="center" label="发起人">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column align="center" label="主播昵称">
        <template slot-scope="scope">{{ scope.row.toUserId }}</template>
      </el-table-column>
      <el-table-column align="center" label="交易数量">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column align="center" label="交易钻石">
        <template slot-scope="scope">
          <p>单次钻石:{{ scope.row.coin }}</p>
          <p>总钻石:{{ scope.row.totalCoin }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公会收益">
        <template slot-scope="scope">
          <p>{{ scope.row.tradeName==null? '':'一级公会:'+scope.row.tradeName+scope.row.tradeProfit }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="主播/上级收益">
        <template slot-scope="scope">
          <p>主播:{{ scope.row.toUserProfit }}</p>
          <p>上级收益:{{ scope.row.parentProfit }}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="发起人余额">
        <template slot-scope="scope">{{ scope.row.userBalance }}</template>
      </el-table-column> -->
      <el-table-column align="center" label="系统抽成">
        <template slot-scope="scope">{{ scope.row.fees }}</template>
      </el-table-column>
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">{{ map.type[scope.row.type] }}</template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">{{ map.orderStatus[scope.row.orderStatus] }}</template>
      </el-table-column>
      <el-table-column align="center" label="挂断状态">
        <template slot-scope="scope">{{ map.endStatus[scope.row.endStatus] }}</template>
      </el-table-column>
      <el-table-column align="center" label="响铃/通话时间">
        <template slot-scope="scope">
          <p>响铃:{{ scope.row.waitTime }}</p>
          <p>通话:{{ scope.row.remark1+'秒'||'' }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" class="button">
          <el-button size="mini" @click="remarkClick(scope.row)">通话详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />
    <el-dialog :visible.sync="dialogVisible.remark" width="700px" title="订单描述" center style="z-index: 9999">
      <p v-html="formRemark.remark" />
    </el-dialog>
  </div>

</template>

<script>
import { usersOrderList, deleteBatch } from '@/api/BetweenUsers'
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
        type2: 2,
        type3: 3

      },
      mode: '',
      form: {
        to_userId: '',
        type: ''
      },
      formRemark: {
        remark: ''
      },
      dialogVisible: {
        video: false,
        remark: false
      },
      map: {
        type: {
          2: '视频',
          3: '语音'

        },
        orderStatus: {
          0: '进行中',
          1: '拒绝接听',
          2: '已挂断',
          3: '未接通',
          4: '通话异常'
        },
        endStatus: {
          0: '用户余额不足',
          1: '接通后用户挂断',
          2: '接通后主播挂断',
          3: '未接通用户挂断',
          4: '(未接通主播挂断)主播拒接',
          5: '对方未接听',
          6: '连接建立失败',
          7: '通话超时',
          8: '服务器连接失败',
          9: '服务不可用',
          10: '服务拒绝',
          11: '服务欠费'
        },
        userType: {
          1: '是',
          0: '否'
        }
      },
      sels: [],
      filter: {
        time: [],
        type: '',
        userType: '',
        createTime: '',
        toUserId: '',
        orderStatus: '',
        endStatus: ''

      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const orderId = this.$route.query.orderId
      if (orderId) {
        this.tableData.loading = true
        const _form = Object.assign({
          pageNo: this.pager.pageNo,
          pageSize: this.pager.pageSize,
          id: orderId
        }, this.filter)
        usersOrderList(_form).then(res => {
          const { result = {}} = res
          this.tableData.array = result.records
          // console.log(this.tableData.array)
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
      } else {
        this.tableData.loading = true
        const _form = Object.assign({
          pageNo: this.pager.pageNo,
          pageSize: this.pager.pageSize
        }, this.filter)
        usersOrderList(_form).then(res => {
          const { result = {}} = res
          this.tableData.array = result.records
          // console.log(this.tableData.array)
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
      }
    },
    // 视频
    fetchData2() {
      const orderId = this.$route.query.orderId
      if (orderId) {
        this.tableData.loading = true
        const _form = Object.assign({
          pageNo: this.pager.pageNo,
          pageSize: this.pager.pageSize,
          type: this.pager.type2,
          id: orderId
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
        usersOrderList(_form).then(res => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
      } else {
        this.tableData.loading = true
        const _form = Object.assign({
          pageNo: this.pager.pageNo,
          pageSize: this.pager.pageSize,
          type: this.pager.type2
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
        usersOrderList(_form).then(res => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
      }
    },
    // 语音
    fetchData3() {
      const orderId = this.$route.query.orderId
      if (orderId) {
        this.tableData.loading = true
        const _form = Object.assign({
          pageNo: this.pager.pageNo,
          pageSize: this.pager.pageSize,
          type: this.pager.type3,
          id: orderId
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
        usersOrderList(_form).then(res => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
      } else {
        this.tableData.loading = true
        const _form = Object.assign({
          pageNo: this.pager.pageNo,
          pageSize: this.pager.pageSize,
          type: this.pager.type3
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
        usersOrderList(_form).then(res => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
      }
    },
    handlePagerChange(val) {
      this.pager.pageSize = val.size
      this.pager.pageNo = val.index
      this.fetchData2()
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map((row) => row.id).join()
      this.$confirm('确定要删除选中的文件吗?', '提示')
        .then(() => {
          deleteBatch({
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
    // 操作通话详情
    remarkClick(row) {
      this.dialogVisible.remark = true
      this.formRemark.remark = row.remark.replace(/\\n/gmi, '<br>')
    }
  }
}

</script>
<style scoped>

</style>

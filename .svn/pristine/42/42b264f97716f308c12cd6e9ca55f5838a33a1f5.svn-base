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
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchDataC" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">提现记录</div>
      <!-- <div class="top-right">
        <el-button type="danger" size="small" :disabled="sels.length===0" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
      </div> -->
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
      <el-table-column align="center" label="用户/公会名">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="外部订单">
        <template slot-scope="scope">{{ scope.row.outId }}</template>
      </el-table-column>
      <el-table-column align="center" label="实际到账">
        <template slot-scope="scope">{{ scope.row.realMoney+'元' }}</template>
      </el-table-column>
      <el-table-column align="center" label="手续费">
        <template slot-scope="scope">{{ scope.row.fees+'元' }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作金额">
        <template slot-scope="scope">{{ scope.row.money+'元' }}</template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">{{ map.status[scope.row.status] }}</template>
      </el-table-column>
      <el-table-column align="center" label="驳回原因">
        <template slot-scope="scope">{{ scope.row.reason }}</template>
      </el-table-column>
      <el-table-column align="center" label="发起时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column align="center" width="180px" label="操作">
        <template slot-scope="scope">
          <el-row :gutter="5">
            <el-col :span="10">
              <el-button type="danger" :disabled="!(scope.row.status===0)" plain size="mini" :loading="tableData.loading" @click="clickVerify(scope.row)">取消</el-button>
            </el-col>
            <el-button size="mini" :disabled="!(scope.row.status===0)" plain type="warning" :loading="tableData.loading" style="margin-left:-20px" @click="showDialog(scope.row)">编辑 </el-button>

          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />
    <el-dialog :visible.sync="dialogVisible.reflect" width="400px" title="编辑提现信息" center>
      <el-form label-position="right" label-width="120px" :model="forms" size="mini">
        <el-form-item label="账号">
          <el-input v-model="forms.account" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="forms.realName" />
        </el-form-item>
        <el-form-item label="银行名">
          <el-input v-model="forms.bankName" />
        </el-form-item>
        <el-form-item label="银行预留手机">
          <el-input v-model="forms.bankPhone" />
        </el-form-item>
        <el-form-item label="开户行所在地">
          <el-input v-model="forms.bankAdr" />
        </el-form-item>
        <el-form-item label="开户行详细地址">
          <el-input v-model="forms.bankAdrName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible.reflect = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="tableData.loading" @click="updateSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { orderList, deleteBatch, orderVerify, queryById } from '@/api/order'
import { updateUnion } from '@/api/user'
import { copyObject, clearEmptyItem } from '@/utils/index'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      filter: {
        createTime: '',
        time: []

      },
      tableData: {
        loading: false,
        array: [],
        row: {}
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
          0: '待审核',
          1: '通过',
          2: '驳回',
          3: '已取消'
        },
        type: {
          4: '用户提现',
          9: '公会提现'
        },
        userType: {
          1: '是',
          0: '否'
        }
      },
      sels: [],
      dialogVisible: {
        reflect: false
      },
      forms: {
        account: '',
        realName: '',
        bankName: '',
        bankPhone: '',
        bankAdr: '',
        bankAdrName: ''

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
      }, this.filter)
      orderList(_form).then(res => {
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
        pageNo: this.pager.pageNoC,
        pageSize: this.pager.pageSizeC
      }, this.filter)
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
    // 批量删除
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map(row => row.id).join()
      this.$confirm('确定要删除选中的提现记录信息吗?', '提示')
        .then(() => {
          deleteBatch({
            ids: ids
          }).then(data => {
            this.$message.success(data.message)
            this.fetchData()
          })
        }).catch(error => {
          console.log(error)
        })
    },

    // 编辑
    showDialog(item) {
      this.tableData.row = item || {}
      queryById({ userId: item.userId }).then(res => {
        this.forms = res.result
        this.forms = copyObject(this.forms, item, { numberToString: true })
      }).catch(error => {
        console.log(error)
      })

      this.dialogVisible.reflect = true
    },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.forms)
      _form = clearEmptyItem(_form)
      updateUnion(_form).then(res => {
        this.$message.success(res.message)
        this.dialogVisible.reflect = false
        this.fetchData()
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    // 取消状态操作
    clickVerify(item) {
      this.tableData.loading = true
      orderVerify({
        status: 3,
        id: item.id
      }).then(res => {
        this.$message.success(res.message)
        this.fetchData()
      }).finally(_ => {
        this.tableData.loading = false
      })
    }

  }
}

</script>
<style scoped>
</style>

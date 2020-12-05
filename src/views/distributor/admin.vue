<template>
  <div class="app-container">
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-input v-model="filter.userName" placeholder="请输入用户名" style="width:140px" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.operator" placeholder="请输入操作人" style="width:140px" />
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchData" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">渠道商管理员列表</div>
      <div class="top-right">
        <el-button size="small" :disabled="multipleTable.length === 0" type="danger" @click="deleteBatch()">批量删除</el-button>
        <el-button size="small" type="primary" @click="showDialog('add')">新增</el-button>
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
      <el-table-column
        align="center"
        type="selection"
      />
      <el-table-column
        align="center"
        prop="userName"
        label="用户名"
      />
      <el-table-column
        align="center"
        prop="remark"
        label="描述"
      />
      <el-table-column
        align="center"
        prop="operator"
        label="操作人"
      />
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="showDialog('edit', scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-size="pager.pageSize"
      :pager-index="pager.pageNo"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />

    <!-- 动态模态框 -->
    <el-dialog :visible.sync="dialogVisible.admin" width="400px" :title="`${mode === 'add' ? '新增' : '编辑'}渠道商管理员`" center>
      <el-form label-position="right" label-width="80px" :model="form" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" type="password" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.remark" placeholder="请输入内容" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible.admin = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="formLoading" @click="updateSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { updateDistributorAdmin, queryDistributorAdmin, deleteDistributorAdmin } from '@/api/distributor'
import { initForm, copyObject, clearEmptyItem } from '@/utils/index'
import { JSEncrypt } from 'jsencrypt'
import { PublicKey } from '@/api/user'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      mode: '',
      dialogVisible: {
        admin: false
      },
      multipleTable: [],
      filter: {
        operator: '',
        user: ''
      },
      tableData: {
        array: [],
        row: {},
        loading: false
      },
      form: {
        userName: '',
        pwd: '',
        remark: ''
      },
      formLoading: false,
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
    selsChange(sels) {
      this.multipleTable = sels
    },
    handlePagerChange(val) {
      this.pager.pageNo = val.index
      this.pager.pageSize = val.size
      this.fetchData()
    },

    showDialog(mode, item) {
      this.mode = mode
      this.tableData.row = item || {}
      this.form = initForm(this.form)
      if (mode === 'edit') {
        this.form = copyObject(this.form, item, { numberToString: true, clearKeys: ['pwd'] })
      }
      this.dialogVisible.admin = true
    },

    async updateSubmit() {
      this.formLoading = true
      const { publicKey } = await PublicKey({})
      var crypt = new JSEncrypt()
      crypt.setPublicKey(publicKey)
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form.pwd = crypt.encrypt(_form.pwd)
      _form = clearEmptyItem(_form)
      updateDistributorAdmin(_form, this.mode).then(res => {
        this.$message.success(res.message)
        this.dialogVisible.admin = false
        this.fetchData()
      }).finally(_ => {
        this.formLoading = false
      })
    },
    fetchData() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize // 条数
      }, this.filter)
      queryDistributorAdmin(_form)
        .then((res) => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    deleteBatch() {
      const ids = this.multipleTable.map((row) => row.id).join(',')
      this.$confirm('确定要删除选中的渠道商管理员信息吗?', '提示')
        .then(() => {
          deleteDistributorAdmin({
            ids: ids
          }).then((data) => {
            this.$message.success(data.message)
            this.fetchData()
          })
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
</style>

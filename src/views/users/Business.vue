<template>
  <div class="app-container">

    <div class="top">
      <div class="top-left">业务审核</div>
    </div>
    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="主播昵称">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="单价">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>

      <el-table-column align="center" label="开启类型">
        <template slot-scope="scope">{{ map.type[scope.row.type] }}</template>
      </el-table-column>
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">{{ map.status[scope.row.status] }}</template>
      </el-table-column>
      <el-table-column align="center" label="申请时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="驳回原因">
        <template slot-scope="scope">{{ scope.row.reason }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row :gutter="5">
            <el-col :span="14">
              <el-button size="mini" @click="editClick(scope.row)">编辑</el-button>
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
    <!-- 用户信息模态框 -->
    <el-dialog :visible.sync="dialogVisible.Business" width="500px" title="编辑页面审核信息" center style="z-index: 9999">
      <el-form ref="form" label-position="right" :rules="rules" label-width="100px" :model="form" size="mini">
        <el-row :gutter="5">
          <el-col :span="22">
            <el-form-item label="主播昵称">
              <el-input v-model="form.userName" />
            </el-form-item>
            <el-form-item label="单价">
              <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="审核状态" prop="status">
              <el-select v-model="form.status" clearable placeholder="请选择">
                <el-option v-for="(value, key) in map.status" v-show="(key!=='0')" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="开启类型">
              <el-select v-model="form.type" clearable placeholder="请选择">
                <el-option v-for="(value,key) in map.type" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="驳回原因">
              <el-input
                v-model="form.reason"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible.Business = false">取 消</el-button>
        <el-button
          :loading="tableData.loading"
          type="primary"
          size="small"
          @click="updateSubmit('form')"
        >提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { chatApplyList, chatApply } from '@/api/user'
import { copyObject, clearEmptyItem } from '@/utils/index'
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
        total: 0
      },
      dialogVisible: {
        Business: false
      },
      map: {
        status: {
          0: '待审核',
          1: '通过',
          2: '驳回'
        },
        type: {
          1: '语音',
          2: '视频'
        }
      },
      rules: {
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }

        ]
      },
      form: {
        reason: '',
        type: '',
        statusd: '',
        price: '',
        userName: '',
        userId: ''
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
      })
      chatApplyList(_form)
        .then((res) => {
          const { result = {}} = res
          this.tableData.array = result.records
          this.pager.total = result.total // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    editClick(item) {
      this.tableData.row = item || {}
      this.form = copyObject(this.form, item, { numberToString: true })
      this.dialogVisible.Business = true
    },
    updateSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.tableData.loading = true
          let _form = Object.assign({ id: this.tableData.row.id }, this.form)
          _form = clearEmptyItem(_form)
          chatApply(_form).then(res => {
            this.$message.success(res.message)
            this.dialogVisible.Business = false
            this.fetchData()
          }).finally(_ => {
            this.tableData.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
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

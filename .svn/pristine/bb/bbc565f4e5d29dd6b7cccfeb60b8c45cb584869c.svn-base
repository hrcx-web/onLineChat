<template>
  <div class="app-container">
    <div class="top">
      <div class="top-left">系统配置评论语</div>
      <div class="top-right">
        <el-button size="small" :disabled="sels.length === 0" type="danger" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
        <el-button type="primary" size="small" @click="showDialog">新增</el-button>
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
      <el-table-column align="center" label="评论">
        <template slot-scope="scope">{{ scope.row.comment }}</template>
      </el-table-column>
      <el-table-column align="center" label="评论语类型">
        <template slot-scope="scope">{{ map.type[scope.row.type] }}</template>
      </el-table-column>

    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />

    <el-dialog :visible.sync="dialogVisible.systemReview" width="500px" title="新增系统配置评论语信息" center>
      <el-form ref="form" label-position="right" label-width="140px" :model="form" size="mini">
        <el-row :gutter="5">
          <el-col :span="20">
            <el-form-item label="评论语">
              <el-input v-model="form.comment" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="多条评论语请用 | 分割" />
            </el-form-item>
            <el-form-item label="配置类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="(value,key) in map.type" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.systemReview=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { systemCommentList, systemCommentAdd, systemCommentDel } from '@/api/comments'
import Pagination from '@/components/Pagination'
import { initForm, clearEmptyItem } from '@/utils/index'
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
        pageSize: 10

      },
      sels: [],
      map: {
        type: {
          1: '视频语音',
          2: '商品'
        }
      },
      form: {
        comment: '',
        type: ''
      },
      dialogVisible: {
        systemReview: false
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
      systemCommentList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    showDialog(item) {
      this.tableData.row = item || {}
      this.form = initForm(this.form)
      this.dialogVisible.systemReview = true
    },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form = clearEmptyItem(_form)
      systemCommentAdd(_form).then(res => {
        this.$message.success(res.message)
        this.dialogVisible.systemReview = false
        this.fetchData()
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map(row => row.id).join()
      this.$confirm('确定要删除选中的系统配置评论语信息吗?', '提示')
        .then(() => {
          systemCommentDel({
            ids: ids
          }).then(data => {
            this.$message.success(data.message)
            this.fetchData()
          }).catch(error => {
            console.log(error)
          })
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

<template>
  <div class="app-container">
    <div class="top">
      <div class="top-left">守护套餐</div>
      <div class="top-right">
        <el-button size="small" :disabled="sels.length === 0" type="danger" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
        <el-button type="primary" size="small" @click="showDialog('add')">新增</el-button>

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
      <!-- 复选框 -->
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="守护天数">
        <template slot-scope="scope">{{ scope.row.day }}</template>
      </el-table-column>
      <el-table-column align="center" label="守护总价">
        <template slot-scope="scope">{{ scope.row.totalPrice }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否默认选中">
        <template slot-scope="scope">{{ defaultSelect[scope.row.defaultSelect] }}</template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="操作" width="120px" align="center">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="10" size="mini">
              <el-button size="mini" @click="showDialog('edit' ,scope.row)">编辑</el-button>
            </el-col>
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

    <el-dialog :visible.sync="dialogVisible.guardian" width="550px" :title="`${mode === 'add' ? '新增' : '编辑'}守护套餐信息`" center>
      <el-form ref="form" label-position="right" :validate-on-rule-change="false" label-width="180px" :model="form" size="mini">
        <el-row :gutter="5">
          <el-col :span="20">
            <el-form-item label="守护天数">
              <el-input v-model="form.day" />
            </el-form-item>
            <el-form-item label="守护总价">
              <el-input v-model="form.totalPrice" type="number" :step="0.1" min="0" />
            </el-form-item>
            <el-form-item label="是否默认选中">
              <el-select v-model="form.defaultSelect" placeholder="请选择">
                <el-option v-for="(val,key) in defaultSelect" :key="key" :value="key" :label="val" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入备注"
              />
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.guardian=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { guardConfigList, updateGuardConfig, deleteBatchGuardian } from '@/api/taskManagement'
import { initForm, copyObject, clearEmptyItem } from '@/utils/index'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      mode: '',
      tableData: {

        loading: false,
        array: [],
        row: {}
      },
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      sels: [],
      dialogVisible: {
        guardian: false
      },
      defaultSelect: {
        1: '是',
        0: '否'
      },
      form: {
        day: '',
        defaultSelect: '',
        remark: '',
        totalPrice: ''
      }
    }
  },
  created() {
    this.fetchData()
  }, methods: {
    fetchData() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo,
        pageSize: this.pager.pageSize
      })
      guardConfigList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    showDialog(mode, item) {
      this.mode = mode
      this.tableData.row = item || {}
      this.form = initForm(this.form)
      if (mode === 'edit') {
        this.form = copyObject(this.form, item, { numberToString: true })
      }
      this.dialogVisible.guardian = true
    },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form = clearEmptyItem(_form)
      updateGuardConfig(_form, this.mode).then(res => {
        this.$message.success(res.message)
        this.dialogVisible.guardian = false
        this.fetchData()
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    handlePagerChange(val) {
      this.pager.pageNo = val.index
      this.pager.pageSize = val.size
      this.fetchData()
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map((row) => row.id).join()
      this.$confirm('确定要删除选中的守护套餐信息吗?', '提示')
        .then(() => {
          deleteBatchGuardian({
            ids: ids
          }).then((data) => {
            this.$message.success(data.message)
            this.fetchData()
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>
<style scoped>
</style>

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
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchData" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">举报/投诉列表</div>
      <div class="top-right">
        <el-button size="small" :disabled="sels.length === 0" type="danger" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
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
      <el-table-column align="center" label="举报人">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="被举报人">
        <template slot-scope="scope">{{ scope.row.toUserName }}</template>
      </el-table-column>
      <el-table-column align="center" label="举报图">
        <template slot-scope="scope"> <el-image
          style="width: 80px; height: 80px"
          :src="scope.row.img"
          :preview-src-list="scope.row.srcList"
        /></template>
      </el-table-column>
      <el-table-column align="center" label="举报理由">
        <template slot-scope="scope">{{ scope.row.reason }}</template>
      </el-table-column>
      <el-table-column align="center" label="举报时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否处理">
        <template slot-scope="scope">{{ isOperator[scope.row.isOperator] }}</template>
      </el-table-column>
      <el-table-column align="center" label="处理结果描述">
        <template slot-scope="scope">{{ scope.row.result }}</template>
      </el-table-column>
      <el-table-column align="center" label="处理时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>

      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <!-- <el-row :gutter="20">
            <el-col :span="10" size="mini" tyle="margin-top: 5px"> -->
          <el-button size="mini" @click="showDialog('edit',scope.row)">编辑</el-button>
          <!-- </el-col>
          </el-row> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />

    <!-- 编辑 -->
    <el-dialog :visible.sync="dialogVisible.report" width="500px" :title="`${mode === 'add' ? '新增' : '编辑'}举报信息`" center style="z-index: 9999">
      <el-form label-position="right" label-width="120px" :validate-on-rule-change="false" :model="form" size="mini">
        <el-row :gutter="10">
          <el-col :span="22">
            <!-- <el-form-item label="举报人">
              <el-input v-model="form.userName" />
            </el-form-item>
            <el-form-item label="被举报人">
              <el-input v-model="form.toUserName" />
            </el-form-item> -->
            <el-form-item label="举报理由">
              <el-input
                v-model="form.reason"
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            <!-- <el-form-item label="举报时间">
              <el-date-picker
                v-model="form.createTime"
                format="yyyy-MM-dd "
                value-format="yyyy-MM-dd "
                type="date"
                placeholder="选择举报时间"
              />
            </el-form-item>
            <el-form-item label="处理时间">

              <el-date-picker
                v-model="form.updateTime"
                format="yyyy-MM-dd "
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择处理时间"
              />
            </el-form-item> -->
            <el-form-item label="举报图">
              <!-- <el-input v-model="form.img" /> -->
              <div class="icon-container" @click="fakeClick('img')">
                <i v-if="!form.img" class="el-icon-plus" />
                <el-image
                  v-else
                  style="width: 100%; height: 100%"
                  :src="form.img"
                />
              </div>
            </el-form-item>
            <el-form-item label="是否处理">
              <el-select v-model="form.isOperator" placeholder="请选择">
                <el-option v-for="(value, key) in isOperator" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="处理结果描述">
              <el-input
                v-model="form.result"
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <input type="file" class="img" style="visibility: hidden" @change="val=>uploadFile(val,['form','img'])">
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.report=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit('form')">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { reportList, reportDelete, reportEdit } from '@/api/feedback'
import { copyObject, clearEmptyItem } from '@/utils/index'
import { uploadQNImg } from '@/api/user'
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
      mode: '',
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      sels: [],
      isOperator: {
        1: '是',
        0: '否'
      },
      filter: {
        time: []
      },
      dialogVisible: {
        report: false
      },
      form: {
        result: '',
        img: '',
        reason: '',
        isOperator: ''
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
      if (Array.isArray(_form.time) && _form.time.length === 2) {
        _form.begin_date = _form.time[0]
        _form.end_date = _form.time[1]
      }
      if (Array.isArray(_form.time) && _form.time.length === 2 && (_form.time[0] === _form.time[1])) {
        _form.begin_date = _form.time[0] + ' ' + '00:00:00'
        _form.end_date = _form.time[1] + ' ' + '23:59:59'
      }
      delete _form.time
      reportList(_form)
        .then(res => {
          const { result = {}} = res

          if (Array.isArray(result.records)) {
            result.records.forEach(item => {
              if (item.img) {
                item.srcList = item.img.split(',')
              }
            })
          }
          this.tableData.array = result.records
          this.tableData.total = result.total
          // console.log(res)
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map((row) => row.id).join(',')
      this.$confirm('确定要删除选中的举报信息吗?', '提示')
        .then(() => {
          reportDelete({
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
    // 编辑
    showDialog(mode, item) {
      this.mode = mode
      this.tableData.row = item || {}
      // this.form = initForm(this.form)
      if (mode === 'edit') {
        this.form = copyObject(this.form, item, { numberToString: true })
      }
      this.dialogVisible.report = true
    },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form = clearEmptyItem(_form)
      reportEdit(_form, this.mode).then(res => {
        this.tableData.loading = false
        this.$message.success(res.message)
        this.dialogVisible.report = false
        this.fetchData()
      }).catch(error => {
        console.log(error)
        this.dialogVisible.report = false
      })
    },
    fakeClick(className) {
      const filesInput = document.querySelector(`input[type=file].${className}`)
      filesInput.click()
    },
    uploadFile(e, target) {
      const files = e.target.files
      if (files.length) {
        const formData = new FormData()
        formData.append('multipartFile', files[0])
        uploadQNImg(formData).then(res => {
          this[target[0]][target[1]] = res.data
          this.$message.success(res.message)
        })
      }
    },
    // 分页
    handlePagerChange(val) {
      this.pager.pageNo = val.index
      this.pager.pageSize = val.size
      this.fetchData()
    }
  }
}

</script>
<style  lang="scss" scoped >

.icon-container{
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  position: relative;
  cursor: pointer;
  i{
    display: block;
    font-size: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

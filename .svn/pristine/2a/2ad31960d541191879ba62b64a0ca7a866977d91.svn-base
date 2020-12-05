<template>
  <div class="app-container">
    <div class="top">
      <div class="top-left">成长值配置</div>
      <div class="top-right">
        <el-button type="danger" size="small" :disabled="sels.length===0" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
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
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="等级">
        <template slot-scope="scope">{{ scope.row.level }}</template>
      </el-table-column>
      <el-table-column align="center" label="图片">
        <template slot-scope="scope"><el-image
          style="width: 80px; height: 80px;cursor: pointer;"
          :src="scope.row.logo"
          @click="handlImg(scope.row)"
        /></template>
      </el-table-column>
      <el-table-column align="center" label="配置类型">
        <template slot-scope="scope">{{ map.type[scope.row.type] }}</template>
      </el-table-column>
      <el-table-column align="center" label="级别所需钻石数/魅力值">
        <template slot-scope="scope">{{ scope.row.value }}</template>
      </el-table-column>
      <el-table-column align="center" label="备注" width="220px">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" class="button">
          <el-button
            size="mini"
            @click="showDialog('edit', scope.row)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.type===0"
            size="mini"
            type="primary"
            @click="handllegal(scope.row)"
          >查看权益</el-button>

        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />

    <el-dialog :visible.sync="dialogVisible.growth" width="550px" :title="`${mode === 'add' ? '新增' : '编辑'}成长配置值信息`" center style="z-index: 9999">
      <el-form ref="form" label-position="right" label-width="160px" :validate-on-rule-change="false" :model="form" size="mini">
        <el-row :gutter="10">
          <el-col :span="22">
            <el-form-item label="等级">
              <el-input v-model="form.level" type="number" min="0" />
            </el-form-item>
            <el-form-item label="图片">
              <div class="icon-container" @click="fakeClick('logo')">
                <i v-if="!form.logo" class="el-icon-plus" />
                <img
                  v-else
                  :src="form.logo"
                  style="width: 100%; height: 100%"
                  alt=""
                >
              </div>
            </el-form-item>
            <el-form-item label="配置类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="(value, key) in map.type" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="级别所需钻石数/魅力值">
              <el-input v-model="form.value" type="number" min="0" />
            </el-form-item>

            <!-- <el-form-item label="备注">
              <el-input v-model="form.remark" placeholder="请输入备注" autosize type="textarea" />
            </el-form-item> -->
          </el-col>
        </el-row>
      </el-form>
      <input type="file" style="visibility: hidden" class="logo" @change="val=>uploadFile(val,['form','logo'])">
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.growth=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="图片展示"
      center
      :visible.sync="dialogVisible.imgVisible"
      width="30%"
    >
      <el-image :src="img.logo" />
    </el-dialog>
  </div>
</template>

<script>
import { growConfig, deleteBatchs, updategRowConfig } from '@/api/theTitle'
import { initForm, copyObject, clearEmptyItem } from '@/utils/index'
import Pagination from '@/components/Pagination'
import { uploadQNImg } from '@/api/user'
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
        pageNo: 0,
        pageSize: 10,
        total: 0
      },
      sels: [],
      map: {
        type: {

          1: '财富',
          2: '明星'

        }
      },
      mode: '',
      dialogVisible: {
        growth: false,
        imgVisible: false
      },
      form: {
        level: '',
        logo: '',
        remark: '',
        type: '',
        value: ''
      },
      img: []
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
      growConfig(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map(row => row.id).join()
      this.$confirm('确定要删除选中的成长值配置信息吗?', '提示')
        .then(() => {
          deleteBatchs({
            ids: ids
          }).then(data => {
            this.$message.success(data.message)
            this.fetchData()
          })
        }).catch(error => {
          console.log(error)
        })
    },
    handlePagerChange(val) {
      this.pager.pageSize = val.size
      this.pager.pageNo = val.index
      this.fetchData()
    },
    showDialog(mode, item) {
      this.mode = mode
      this.tableData.row = item || {}
      this.form = initForm(this.form)
      if (mode === 'edit') {
        this.form = copyObject(this.form, item, { numberToString: true })
      }
      this.dialogVisible.growth = true
    },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form = clearEmptyItem(_form)
      updategRowConfig(_form, this.mode).then(res => {
        this.tableData.loading = false
        this.$message.success(res.message)
        this.dialogVisible.growth = false
        this.fetchData()
      }).catch(error => {
        console.log(error)
        this.dialogVisible.growth = false
      })
    },
    fakeClick(className) {
      const fileInput = document.querySelector(`input[type=file].${className}`)
      fileInput.click()
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
    handllegal(row) {
      this.$router.push({ path: '/theTitle/legal', query: { id: row.id }})
    },
    handlImg(row) {
      this.dialogVisible.imgVisible = true
      this.img = row
    }
  }
}
</script>
<style scoped  lang="scss">
.icon-container{
    width: 80px;
    height: 80px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    position: relative;
      cursor: pointer;
    i{
        display: block;
        position: absolute;
        font-size: 24px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>

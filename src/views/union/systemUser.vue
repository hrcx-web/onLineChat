<template>
  <div class="app-container">
    <div class="top">
      <div class="top-left">公会管理员</div>
      <div class="top-right">
        <el-button size="small" type="danger" :disabled="sels.length === 0" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
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
      <!-- 复选框 -->
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="公会名">
        <template slot-scope="scope">{{ scope.row.tradeName }}</template>
      </el-table-column>
      <el-table-column align="center" label="公会等级">
        <template slot-scope="scope">{{ map.role[scope.row.role] }}</template>
      </el-table-column>
      <el-table-column align="center" label="公会管理员登录账号">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="登录密码">
        <template slot-scope="scope">{{ scope.row.password }}</template>
      </el-table-column> -->

      <el-table-column align="center" label="创建者">
        <template slot-scope="scope">{{ scope.row.createBy }}</template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDialog('edit' ,scope.row)">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />
    <el-dialog :visible.sync="dialogVisible.user" width="500px" :title="`新增公会信息`" center style="z-index: 9999">
      <el-form ref="form" label-position="right" label-width="120px" :validate-on-rule-change="false" :model="form" size="mini">
        <el-row :gutter="10">
          <el-col :span="22">
            <el-form-item label="公会id">
              <el-select v-model="form.tradeId" placeholder="请选择">
                <el-option v-for="(value, key) in map.tradeId" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="登录账号">
              <el-input v-model="form.userName" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone" />
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.user=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adminList, updateAdmin, tradeGetAll, deleteBatchs } from '@/api/union'
// copyObject
import { initForm, clearEmptyItem } from '@/utils/index'
import Pagination from '@/components/Pagination'
import { JSEncrypt } from 'jsencrypt'
import { PublicKey } from '@/api/user'
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
      mode: '',
      dialogVisible: {
        user: false
      },
      form: {
        userName: '',
        password: '',
        tradeId: '',
        phone: ''
      },
      sels: [],
      map: {
        tradeId: {},
        role: {
          1: '一级公会管理员',
          2: '二级公会管理员'
        }
      }
    }
  },
  created() {
    this.fetchData()
    this.tradeGetAll()
  },
  methods: {
    tradeGetAll() {
      tradeGetAll().then(res => {
        const { result } = res
        if (Array.isArray(result)) {
          result.forEach(item => {
            const _key = Object.keys(item)
            _key.forEach(key => {
              this.map.tradeId[key] = item[key]
            })
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    fetchData() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo,
        pageSize: this.pager.pageSize
      })
      adminList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    showDialog(item) {
      // this.mode = mode
      this.tableData.row = item || {}
      this.form = initForm(this.form)
      // if (mode === 'edit') {
      //   this.form = copyObject(this.form, item, { numberToString: true })
      // }
      this.dialogVisible.user = true
    },
    async updateSubmit() {
      this.tableData.loading = true
      const { publicKey } = await PublicKey({})
      var crypt = new JSEncrypt()
      crypt.setPublicKey(publicKey)
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form.password = crypt.encrypt(_form.password)
      _form = clearEmptyItem(_form)
      updateAdmin(_form).then(res => {
        this.tableData.loading = false
        this.$message.success(res.message)
        this.dialogVisible.user = false
        this.fetchData()
      }).catch(error => {
        console.log(error)
        this.dialogVisible.user = false
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
      this.$confirm('确定要删除选中的公会管理员信息吗?', '提示')
        .then(() => {
          deleteBatchs({
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

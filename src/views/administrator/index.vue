<template>
  <div class="app-container">
    <!-- <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-input v-model="filter.id" placeholder="请输入id" style="width:200px" />
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="changeId" />
      </el-form>
    </div> -->
    <div class="top">
      <div class="top-left">
        系统管理员
      </div>
      <div class="top-right">
        <el-button type="danger" size="small" :disabled="sels.length === 0" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
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
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column align="center" label="账号类型">
        <template slot-scope="scope">{{ scope.row.role }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>

      <!-- <el-table-column align="center" label="角色">
        <template slot-scope="scope">{{scope.row.roleId }}</template>
      </el-table-column> -->
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="操作" width="155px" align="center">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="10" size="mini" tyle="margin-top: 5px">
              <!-- <el-button size="mini" @click="showDialog('edit' ,scope.row)">编辑</el-button> -->
              <el-button size="mini" @click="passwordChange(scope.row)">修改密码</el-button>
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

    <el-dialog title="新增系统管理员" :visible.sync="dialogVisible.user" width="550px" center style="z-index: 9999">
      <el-form label-position="right" label-width="100px" :model="form" size="mini">
        <el-row :gutter="5">
          <el-col :span="15" />
          <el-form-item label="账号">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleId"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="form.remark"
              placeholder="请输入内容"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
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

    <!-- 修改密码 -->
    <el-dialog :visible.sync="dialogVisible.alter" width="500px" title="修改密码信息框" center style="z-index: 9999">
      <el-form ref="formAlter" :model="formAlter" status-icon :rules="rules" label-position="right" label-width="120px" size="mini">
        <el-row :gutter="10">
          <el-col :span="22">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="formAlter.newPassword" placeholder="请设置新密码" type="password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="newPassword2">
              <el-input v-model="formAlter.newPassword2" placeholder="请确认新密码" type="password" />
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.alter=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="alterSubmit('formAlter')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList, deleteBatch, userAdd, roleList, updatePwd } from '@/api/administrator'
import { JSEncrypt } from 'jsencrypt'
import { PublicKey } from '@/api/user'
import { initForm, clearEmptyItem } from '@/utils/index'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.formAlter.newPassword) {
        callback(new Error('与新密码不一致!'))
      } else {
        callback()
      }
    }
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
      sels: [],
      dialogVisible: {
        user: false,
        alter: false
      },
      formAlter: { // 修改密码
        newPassword: '',
        newPassword2: ''
      },
      adminAlter: '', // 存储修改密码id
      form: {
        account: '',
        createTime: '',
        roleId: '',
        password: '',
        remark: '',
        updateTime: ''
      },
      roleId: [],
      rules: {
        newPassword: [
          { required: true, message: '请设置新密码', trigger: 'blur' }
        ],
        newPassword2: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validateNewPassword2, trigger: 'blur' }
        ]
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
      userList(_form)
        .then(res => {
          this.tableData.array = res.rows
          this.pager.total = res.data
        }).finally(_ => {
          this.tableData.loading = false
        })
      roleList().then(res => {
        this.roleId = res.result.records
      })
    },
    // 新增
    showDialog() {
      this.dialogVisible.user = true
      this.form = {}
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map(row => row.id).join()
      this.$confirm('确定要删除选中的系统管理员信息吗?', '提示').then(() => {
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
    // 提交
    async updateSubmit() {
      this.tableData.loading = true
      const { publicKey } = await PublicKey({})
      var crypt = new JSEncrypt()

      crypt.setPublicKey(publicKey)
      const _Form = Object.assign({}, this.form)
      const passWord = crypt.encrypt(_Form.password)
      _Form.password = passWord

      let _form = Object.assign({ id: this.tableData.row.id }, _Form)
      _form = clearEmptyItem(_form)
      userAdd(_form).then(res => {
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
      this.pager.pageSize = val.size
      this.pager.pageNo = val.index
      this.fetchData()
    },
    // 修改密码
    passwordChange(row) {
      this.dialogVisible.alter = true
      this.adminAlter = row.id
      this.formAlter = initForm(this.formAlter)
    },
    async alterSubmit(formName) {
      const { publicKey } = await PublicKey({})
      var crypt = new JSEncrypt()
      crypt.setPublicKey(publicKey)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.loading = true
          let _form = Object.assign({ password: this.formAlter.newPassword, id: this.adminAlter })
          _form.password = crypt.encrypt(_form.password)
          _form = clearEmptyItem(_form)
          updatePwd(_form).then(() => {
            this.$message.success('密码已修改')
            this.dialogVisible.alter = false
            this.fetchData()
          }).finally(_ => {
            this.tableData.loading = false
          })
        } else {
          this.$message.error('请正确填写表单')
          return false
        }
      })
    }
  }
}

</script>
<style scoped>
</style>

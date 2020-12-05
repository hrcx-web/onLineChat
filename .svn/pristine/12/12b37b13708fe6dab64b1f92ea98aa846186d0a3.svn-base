<template>
  <div class="app-container">
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-select v-model="filter.userType" clearable placeholder="主播选择">
            <el-option v-for="(value, key) in map.userType" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.tradeId" clearable placeholder="请选择公会">
            <el-option v-for="(value, key) in map.tradeId" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchData" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">公会成员</div>
      <div class="top-right">
        <el-button size="small" type="primary" :disabled="sels.length>1" @click="AsClick(sels)">提成比例</el-button>
        <!-- <el-button size="small" type="danger" :disabled="sels.length === 0" @click="deleteFileOrDirectory(sels)">批量删除</el-button> -->
        <!-- <el-button type="primary" size="small" @click="showDialog('add')">新增</el-button> -->
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
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">{{ scope.row.user }}</template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px;cursor: pointer;"
            :src="scope.row.icon"
            @click="changeImg(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">{{ map.gender[scope.row.gender] }}</template>
      </el-table-column>
      <el-table-column align="center" label="财富等级">
        <template slot-scope="scope">{{ scope.row.richLevel }}</template>
      </el-table-column>
      <el-table-column align="center" label="魅力等级">
        <template slot-scope="scope">{{ scope.row.starLevel }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否是主播/提成比例">
        <template slot-scope="scope">
          <p>{{ map.isChat[scope.row.isChat] }}</p>
          <p>提成比例:{{ scope.row.profit }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="入会时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
    </el-table>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChanges"
    />

    <el-dialog
      title="头像展示"
      center
      :visible.sync="imgVisible"
      width="30%"
    >
      <el-image :src="editImg.icon" />
    </el-dialog>

    <!-- 抽成比例 -->
    <el-dialog :visible.sync="dialogVisible.As" width="500px" title="抽成比例信息框" center>
      <el-form label-position="right" label-width="130px" :model="AsForm" size="mini">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="抽成比例">
              <el-input v-model="AsForm.profit" type="number" :step="0.1" min="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible.As = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="tableData.loading" @click="updateSubmitAs">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList, tradeGetAll } from '@/api/union'
import { editProfit } from '@/api/user'
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
      imgVisible: false,
      editImg: [], // 大头像
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      map: {
        tradeId: {},
        userType: {
          1: '是',
          0: '否'
        },
        gender: {
          1: '男',
          2: '女'
        },
        role: {
          1: '公会普通成员',
          2: '公会管理员'
        },
        isChat: {
          1: '是',
          0: '否'
        }

      },
      filter: {
        userType: '',
        tradeId: ''

      },
      sels: [],
      idsAs: {}, // 抽成比例ids
      dialogVisible: {
        As: false
      },
      AsForm: {
        profit: ''
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
      }, this.filter)
      userList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    handlePagerChanges(val) {
      this.pager.pageNo = val.index
      this.pager.pageSize = val.size
      this.fetchData()
    },
    // 页面显示的大图标
    changeImg(row) {
      this.imgVisible = true
      this.editImg = row
    },
    // 复选框的操作
    selsChange(sels) {
      this.sels = sels
    },
    // 抽成比例
    AsClick() {
      if (this.sels.length === 0) {
        this.$message('请选择一个用户')
      } else {
        this.dialogVisible.As = true
        this.idsAs = this.sels.map((row) => row.id).join(',')
      }
    },
    // 抽成提交
    updateSubmitAs() {
      this.tableData.loading = true
      const _form = Object.assign({ ids: this.idsAs }, this.AsForm)

      editProfit(_form).then(res => {
        this.dialogVisible.As = false
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

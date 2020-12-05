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
      <div class="top-left">消费订单-视频</div>
      <div class="top-right">
        <!-- <el-button type="danger" size="small" :disabled="sels.length === 0" @click="deleteFileOrDirectory(sels)">批量删除</el-button> -->
        <!-- <el-button type="primary" plain size="small" @click="showDialog('videoOrder')">新增</el-button> -->
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
      <el-table-column align="center" label="发起人">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column align="center" label="接收者">
        <template slot-scope="scope">{{ scope.row.toUserId }}</template>
      </el-table-column>
      <el-table-column align="center" label="交易数量">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column align="center" label="单次交易金/币">
        <template slot-scope="scope">{{ scope.row.coin }}</template>
      </el-table-column>
      <el-table-column align="center" label="被赠送者收益">
        <template slot-scope="scope">{{ scope.row.toUserProfit }}</template>
      </el-table-column>
      <el-table-column align="center" label="发起人余额">
        <template slot-scope="scope">{{ scope.row.userBalance }}</template>
      </el-table-column>
      <el-table-column align="center" label="受益人余额">
        <template slot-scope="scope">{{ scope.row.toUserBalance }}</template>
      </el-table-column>
      <el-table-column align="center" label="系统抽成">
        <template slot-scope="scope">{{ scope.row.fees }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-button size="mini" @click="handleClick(scope.row)">查看</el-button>
            </el-col>
            <el-col :span="10" size="mini" tyle="margin-top: 5px">
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
    <!-- 消费订单-视频信息模态框 -->
    <el-dialog :visible.sync="dialogVisible.video" width="500px" :title="`${mode === 'videoOrder' ? '新增' : '编辑'}消费订单-视频`" center style="z-index: 9999">
      <el-form label-position="right" label-width="180px" :validate-on-rule-change="false" :model="form" size="mini">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="视频/语音通话接受者" prop="title">
              <el-input v-model="form.to_userId" />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="(value, key) in map.type" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.video=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit('form')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { usersOrderList, updateUsersOrder, deleteBatch } from '@/api/BetweenUsers'
import { initForm, copyObject, clearEmptyItem } from '@/utils/index'
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
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        type: 2
      },
      mode: '',
      form: {
        to_userId: '',
        type: ''
      },
      dialogVisible: {
        video: false
      },
      map: {
        type: {
          2: '视频',
          3: '语音'
        }
      },
      sels: [],
      filter: {
        time: []
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
        pageSize: this.pager.pageSize,
        type: this.pager.type
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
      usersOrderList(_form).then(res => {
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
    // 查看
    handleClick() {

    },
    // 新增编辑
    showDialog(mode, item) {
      this.mode = mode
      this.tableData.row = item || {}
      this.form = initForm(this.form)
      if (mode === 'edit') {
        this.form = copyObject(this.form, item, { numberToString: true })
      }
      this.dialogVisible.video = true
    },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form = clearEmptyItem(_form)
      updateUsersOrder(_form, this.mode).then(res => {
        this.tableData.loading = false
        this.$message.success(res.message)
        this.dialogVisible.video = false
        this.fetchData()
      })
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map((row) => row.id).join()
      this.$confirm('确定要删除选中的文件吗?', '提示')
        .then(() => {
          deleteBatch({
            ids: ids
          }).then((data) => {
            this.$message.success(data.message)
            this.fetchData()
          }).catch((error) => {
            console.log(error)
          })
        })
    }
  }
}

</script>
<style scoped>

</style>

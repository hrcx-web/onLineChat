<template>
  <div class="app-container">

    <div class="top">
      <div class="top-left">排行榜奖励配置</div>
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
      <el-table-column align="center" label="奖励数量">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column align="center" label="奖励类型">
        <template slot-scope="scope">{{ map.rewardType[scope.row.rewardType] }}</template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">{{ map.type[scope.row.type] }}</template>
      </el-table-column>
      <el-table-column align="center" label="状态">

        <template slot-scope="scope">{{ map.code[scope.row.code] }}</template>
        <!-- <el-switch
            v-model="scope.row.code"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
            @change="val => handleSwitch(val, scope.row.id)"
          /> -->

      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-row :gutter="20">
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

    <el-dialog :visible.sync="dialogVisible.reward" width="450px" :title="`${mode === 'add' ? '新增' : '编辑'}排行榜奖励配置信息`" center style="z-index: 9999">
      <el-form ref="form" label-position="right" label-width="100px" :validate-on-rule-change="false" :model="form" size="mini">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="奖励数量">
              <el-input v-model="form.num" type="number" min="0" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.code" placeholder="请选择状态">
                <el-option v-for="(value, key) in map.code" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="奖励类型">
              <el-select v-model="form.rewardType" placeholder="请选择奖励类型">
                <el-option v-for="(value, key) in map.rewardType" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择类型">
                <el-option v-for="(value, key) in map.type" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.reward=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rankRewardConfigList, updateRankReward, deleteBatch } from '@/api/list'
import { initForm, copyObject, clearEmptyItem } from '@/utils/index'

import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      mode: '',
      sels: [],
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0

      },
      tableData: {
        loading: false,
        array: [],
        row: {}
      },
      map: {
        type: {
          1: '公会榜',
          2: '明星榜'
        },
        rewardType: {
          1: '奖励热度扶持系数',
          2: '奖励钻石'
        },
        code: {
          1: '启用',
          0: '禁用'
        }
      },
      dialogVisible: {
        reward: false
      },
      form: {
        code: '',
        num: '',
        remark: '',
        rewardType: '',
        type: ''
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
      rankRewardConfigList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    // 点击新增
    showDialog(mode, item) {
      this.mode = mode
      this.tableData.row = item || {}
      this.form = initForm(this.form)
      if (mode === 'edit') {
        this.form = copyObject(this.form, item, { numberToString: true })
      }
      this.dialogVisible.reward = true
    },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form = clearEmptyItem(_form)
      updateRankReward(_form, this.mode).then(res => {
        this.$message.success(res.message)
        this.dialogVisible.reward = false
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
      const ids = this.sels.map((row) => row.id).join(',')
      this.$confirm('确定要删除选中的排行榜奖励配置信息吗?', '提示')
        .then(() => {
          deleteBatch({
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
    // handleSwitch(code, id) {
    //   updateRankReward({
    //     id,
    //     code
    //   }, 'edit').then(res => {
    //     this.fetchData()
    //   })
    // }
  }
}

</script>
<style scoped>
</style>

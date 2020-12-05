<template>
  <div>
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-select v-model="filter.userType" clearable placeholder="主播选择">
            <el-option v-for="(value, key) in map.userType" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchData" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">充值排行榜</div>
      <div class="top-right">
        <!-- <el-button type="primary" plain size="small" @click="showDialog">新增</el-button> -->
      </div>
    </div>
    <el-table
      v-loading="tableData.loading"
      :data="tableData.array"
      border
      fit
      highlight-current-row
    >

      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">{{ scope.row.user }}</template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope"> <el-image
          style="width:100px;height:100px"
          class="headimg"
          :src="scope.row.icon"
          @click="changeImg(scope.row)"
        /></template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">{{ map.gender[scope.row.gender] }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否是会员">
        <template slot-scope="scope">{{ map.vip[scope.row.isVip] }}</template>
      </el-table-column>
      <el-table-column align="center" label="充值钻石">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column align="center" label="钻石余额">
        <template slot-scope="scope">{{ scope.row.coinNum }}</template>
      </el-table-column>

    </el-table>
    <pagination
      :pager-size="pager.pageSize"
      :pager-index="pager.pageNo"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />
    <!-- 大头像 -->
    <el-dialog
      title="头像展示"
      center
      :visible.sync="imgVisible"
      width="30%"
    >
      <el-image :src="editImg.icon" />
    </el-dialog>
  </div>
</template>

<script>
import { orderByCash } from '@/api/list'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        type: 2

      },
      tableData: {
        loading: false,
        array: [],
        row: {}
      },
      map: {
        gender: {
          1: '男',
          2: '女'
        },
        vip: {
          0: '否',
          1: '是'
        },
        userType: {
          1: '是',
          0: '否'
        }
      },
      filter: {
        userType: ''
      },
      imgVisible: false,
      editImg: ''

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
      orderByCash(_form).then(res => {
        // const { result = {}} = res
        // console.log(res)
        this.tableData.array = res.rows
        this.pager.total = res.data
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    changeImg(row) {
      this.editImg = row
      this.imgVisible = true
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
.headimg{
  cursor: pointer;
}
</style>

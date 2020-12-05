<template>
  <div class="app-container">
    <div class="header">
      <div class="header-left">
        粉丝
      </div>
      <div class="header-right">
        <el-button size="mini" type="danger" :disabled="sels.length === 0" @click="deleteFileOrDirectory(sels)">批量删除</el-button>
        <el-button size="mini" type="primary" plain @click="showDialog('add')">新增</el-button>
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

      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center" label="" width="150">
        <!-- <template slot-scope="scope"></template> -->
      </el-table-column>
      <el-table-column align="center" label="">
        <!-- <template slot-scope="scope">{{ scope.row.content }}</template> -->
      </el-table-column>
      <el-table-column align="center" label="">
        <!-- <template slot-scope="scope">{{ scope.row.content }}</template> -->
      </el-table-column>
      <el-table-column align="center" label="">
        <!-- <template slot-scope="scope">{{ scope.row.content }}</template> -->
      </el-table-column>
      <el-table-column label="操作" width="160px" align="center">
        <template slot-scope="scope">
          <el-row :gutter="5">
            <el-col :span="10">
              <!-- <el-button style="width: 100%" size="mini" @click="handleClick(scope.row)">查看</el-button> -->
            </el-col>
            <el-col :span="10" size="mini" tyle="margin-top: 5px">
              <el-button style="width: 100%" size="mini" @click="showDialog('edit' ,scope.row)">编辑</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fansList } from '@/api/fans'
export default {
  data() {
    return {
      tableData: {
        array: [],
        loading: false,
        row: {}
      },
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      sels: []
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
      fansList(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        // console.log(result)
        this.pager.total = result.total
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    deleteFileOrDirectory() {

    },
    // 新增
    showDialog() {

    },
    selsChange() {

    }
  }
}

</script>
<style scoped>
.header{
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
}
 .header  .header-left{
    flex: 1;
    font-weight: 500;
    font-size:20px ;
}
.header  .header-right{
    width: 200px;
}

</style>

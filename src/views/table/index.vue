<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">{{ scope.row.icon }}</template>
      </el-table-column>
      <el-table-column label="介绍" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.letter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价值" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.cost }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间" width="200">
        <template>
          <i class="el-icon-time" />
          <span>{{ times }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="dialog" class="box">
      <!-- 模态框 -->
      <div class="model">
        <div class="top">
          <span @click="fork">x</span>
        </div>
        <div class="content">
          <div>
            <span>ID:</span>
            <input v-model="rowd.id " type="text">
          </div>
          <div>
            <span>图标地址:</span>
            <input v-model="rowd.icon " type="text">
          </div>
          <div>
            <span>价值:</span>
            <input v-model="rowd.cost" type="text">
          </div>
          <div>
            <span>介绍:</span>
            <input v-model="rowd.letter" type="text">
          </div>
          <div class="footer">
            <button @click="hide">取消</button>
            <button class="sur" @click="sure">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { getDelete } from '@/api/table'
import { getS } from '@/api/table'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialog: false, // 模态默认隐藏
      rowd: [], // 存编辑的数据
      list: null,
      listLoading: true,
      pageNum: 1,
      pageSize: 10,
      times: [] // 处理的时间
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 点击取消
    hide() {
      this.dialog = false
    },
    fork() {
      this.dialog = false
    },
    // 点击保存
    sure() {
      getS({
        id: this.rowd.id,
        icon: this.rowd.icon,
        cost: this.rowd.cost,
        letter: this.rowd.letter
      })
        .then((data) => {
          if (data.code === 200) {
            this.dialog = false
            console.log(data.success)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialog = true
      this.rowd = row
      // console.log(this.rowd);
    },
    // 删除
    handleDelete(index, row) {
      // console.log(index, row);
      getDelete({
        id: row.id
      })
        .then((data) => {
          if (data.code === 200) {
            this.fetchData()
          } else {
            // 弹出失败
            this.$message.err(data.msg)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取数据
    fetchData() {
      this.listLoading = true
      getList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then((data) => {
          this.listLoading = false
          if (data.code === 200) {
            this.list = data.rows
            console.log(this.list)
            const lists = this.list
            for (let i = 0; i < lists.length; i++) {
              this.times = lists[i].time
              const Time = this.times || ''
              this.times = Time.substring(0, 10)
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style  scoped>
/* 遮罩层 */
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.model {
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 200px auto;
  background-color: #ffffff;
}
.model .top {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  color: #e4e7ed;
}
.model .top span {
  cursor: pointer;
}
.model .top span:hover {
  color: #999;
}
.model .content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.model .content div {
  height: 60px;
  width: 400px;
  display: flex;
  justify-content: center;
}
.model .content div span {
  width: 80px;
  height: 40px;
  text-align: right;
  line-height: 40px;
  margin-right: 30px;
  font-size: 18px;
}
.model .content div input {
  height: 40px;
  width: 260px;
  outline: none;
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 5px;
}
.model .content .footer {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.model .footer button {
  height: 40px;
  width: 70px;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  margin: 0 20px;
  color: #909399;
  background: #fff;
  cursor: pointer;
}

/* 保存 */
.model .footer .sur {
  background: #409eff;
  color: #fff;
}
</style>

<template>
  <div class="app-container">
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-select v-model="filter.isAppAuto" clearable placeholder="请选择认证状态">
            <el-option v-for="(value, key) in map.isAppAuto" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.isIdentAuto" clearable placeholder="请选择身份证审核状态">
            <el-option v-for="(value, key) in map.isIdentAuto" :key="key" :value="key" :label="value" />
          </el-select>
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="fetchDataC" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">用户实名认证</div>
      <div class="top-right">
        <el-button size="small" type="primary" :disabled="sels.length===0" @click="AsClick(sels)"> 抽成比例</el-button>
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
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
      />
      <el-table-column
        align="center"
        label="头像"
      >
        <template slot-scope="scope">
          <el-image
            :src="scope.row.icon"
            style="width:80px;height:80px;cursor: pointer;"
            @click="changeImg(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="相册集"
      >
        <template slot-scope="scope">
          <el-image
            :src="checkIcon"
            style="width: 18px"
            :preview-src-list="scope.row.photoss"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="user"
        label="昵称"
      />
      <el-table-column
        align="center"
        prop="phone"
        label="手机号"
      />

      <el-table-column
        align="center"
        prop="identity"
        label="身份证号"
      />
      <el-table-column
        align="center"
        prop="sysUserId"
        label="身份证图片"
      >
        <template slot-scope="scope">
          <el-image
            :src="checkIcon"
            style="width: 18px"
            :preview-src-list="scope.row.srcList"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isIdentAuto"
        label="身份证审核状态"
      >
        <template slot-scope="scope">
          {{ map.isIdentAuto[scope.row.isIdentAuto] }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isAppAuto"
        label="认证状态"
      >
        <template slot-scope="scope">
          <p> 接单抽成比例:{{ scope.row.profit }}</p>
          <p>打赏抽成比例:{{ scope.row.giftProfit }}</p>
          {{ map.isAppAuto[scope.row.isAppAuto] }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="autoTime"
        label="申请时间"
      />
      <el-table-column
        align="center"
        label="上级/公会"
        width="120px"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.toUserName">上级昵称:{{ scope.row.toUserName }}</p>
          <p v-if="scope.row.tradeName">公会名称:{{ scope.row.tradeName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="180px"
      >
        <template slot-scope="scope">
          <!-- 通过操作 -->
          <el-popover
            v-model="scope.row.minusVisible"
            placement="top"
            width="200"
            trigger="click"
          >
            <div>
              <el-form :model="profitForm" :rules="rules">
                <el-form-item label="抽成比例" prop="profit">
                  <el-input v-model="profitForm.profit" placeholder="请填入抽成比例" type="number" :step="0.1" min="0" size="mini" style="margin: 10px 0" />
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.minusVisible = false">取消</el-button>
              <el-button type="primary" :loading="tableData.loading" size="mini" @click="scope.row.minusVisible=false, authUserInfoProfit(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" size="mini" type="primary" :disabled="true&&scope.row.isIdentAuto=='1'||scope.row.isIdentAuto=='2'" plain>通过</el-button>
          </el-popover>

          <el-button size="mini" :disabled="true&&scope.row.isIdentAuto=='1'||scope.row.isIdentAuto=='2'" plain type="danger" @click="authUserInfo({userId: scope.row.id, status: 2}, scope.row)">驳回</el-button>
          <el-row :gutter="5">
            <el-col :span="12" style="margin-top: 5px">
              <el-button style="width: 100%" size="mini" :loading="tableData.loading" type="primary" @click="showDialog(scope.row)">查看信息</el-button>
            </el-col>
            <el-col :span="12" style="margin-top: 5px">
              <el-button type="primary" style="width: 100%" size="mini" @click="userVideo(scope.row)">查看视频</el-button>
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
    <!-- 头像 -->
    <el-dialog title="头像展示" center :visible.sync="dialogVisible.bigVisible" width="30%">
      <el-image :src="editImg.icon" />
    </el-dialog>
    <!-- 认证信息模态框 -->
    <el-dialog :visible.sync="dialogVisible.user" width="800px" title="用户认证信息" center style="z-index: 9999">
      <el-form label-position="right" label-width="100px" :model="form" size="mini">
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="用户名" prop="user">
              <el-input v-model="forms.user" :disabled="true" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="forms.phone" :disabled="true" />
            </el-form-item>
            <el-form-item label="头像" prop="icon">
              <div class="icon-container">
                <!-- <i v-if="!forms.icon" class="el-icon-plus" /> -->
                <img :src="forms.icon" :disabled="true" style="width: 100%; height: 100%" alt="">
              </div>
            </el-form-item>
            <el-form-item label="音频">
              <div class="voice-container">
                <!-- <i v-if="!form.voice" class="el-icon-plus" /> -->
                <audio :src="forms.voice" :disabled="true" style="width: 100%; height: 100%" />
              </div>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="forms.gender" :disabled="true" clearable placeholder="请选择">
                <el-option v-for="(value, key) in map.gender" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否已婚">
              <el-select v-model="forms.beMarried" :disabled="true" clearable placeholder="请选择">
                <el-option v-for="(value,key) in map.beMarried" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                v-model="forms.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 100%;"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职业" prop="career">
              <el-select v-model="forms.career" :disabled="true" clearable placeholder="请选择职业">
                <el-option v-for="(value, key) in map.career" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="家乡">
              <el-input v-model="forms.hometown" :disabled="true" style="width:210px" />
              <!-- <v-distpicker class="distapicker" wrapper="width:10px" :province="user.xtrysf" :city="user.xtrycs" :area="user.areax" @selected="onselected" /> -->
            </el-form-item>
            <el-form-item label="标签" prop="labels">
              <el-select v-model="forms.labels" multiple :disabled="true" placeholder="请选择">
                <el-option v-for="item in options" :key="item.index" :value="item.value" :label="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="身高" prop="stature">
              <el-input v-model="forms.stature" :disabled="true" />
            </el-form-item>
            <el-form-item label="微信" prop="weChat">
              <el-input v-model="forms.weChat" :disabled="true" />
            </el-form-item>
            <el-form-item label="个性签名" prop="weChat">
              <el-input
                v-model="forms.signature"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item label="注册时间">
              <el-date-picker
                v-model="forms.time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 抽成比例 -->
    <el-dialog :visible.sync="dialogVisible.As" width="500px" title="抽成比例信息框" center>
      <el-form ref="AsForm" :rules="rules" label-position="right" label-width="130px" :model="AsForm" size="mini">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="接单抽成比例" prop="profit">
              <el-input v-model="AsForm.profit" type="number" :step="0.1" min="0" />
            </el-form-item>
            <el-form-item label="打赏抽成比例" prop="giftProfit">
              <el-input v-model="AsForm.giftProfit" type="number" :step="0.1" min="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible.As = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="tableData.loading" @click="updateSubmitAs('AsForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { queryVifyList, authUserInfo, userQueryById, queryLabelInUse, editProfit } from '@/api/user'

export default {
  components: {
    Pagination

  },
  data() {
    const isNumber = (rule, value, callback) => {
      var pattern = /^(-)?(([0-9])|([1-9]([0-9]+)))(.[0-9]+)$/
      if (!pattern.test(value)) {
        this.$message.warning('请输入小数')

        this.profitForm.profit = ''
      } else {
        callback()
      }
    }
    return {
      checkIcon: require('../../assets/check.png'),
      mode: '',
      multipleTable: [],
      filter: {
        isAppAuto: '',
        isIdentAuto: ''
      },
      map: {
        isAppAuto: {
          0: '未认证',
          1: '实名认证'
        },
        isIdentAuto: {
          0: '待审核',
          1: '审核通过',
          2: '审核失败'
        },
        gender: {
          1: '男',
          2: '女'
        },
        beMarried: {
          1: '是',
          2: '否'
        },
        career: {
          1: '教师',
          2: '服务员',
          3: '司机',
          5: '厨师',
          4: '理发师',
          6: '教练',
          7: '文员',
          8: '销售经理',
          9: '客服专员',
          10: '营业员',
          11: '网店店长',
          12: '维修工',
          13: '快递员',
          14: '律师',
          15: '翻译员',
          16: '会计',
          17: '医生',
          18: '工程师',
          19: '空姐',
          20: '学生',
          21: '模特',
          22: '其它'

        }
      },
      // 地理
      user: {
        xtrysf: '',
        xtrycs: '',
        areax: ''
      },
      option: {
        1: [],
        2: []
      },
      tableData: {
        array: [],
        row: {},
        loading: false
      },
      form: {
        // platformName: '',
        distributeType: '',
        price: '',
        // resetValue: '',
        settleType: '',
        sysUserId: ''
        // threshold: '',
        // url: ''
      },
      forms: {
        id: '',
        user: '',
        phone: '',
        icon: '',
        gender: '',
        beMarried: '',
        birthday: '',
        career: '',
        constellation: '',
        hometown: '',
        labels: '',
        stature: '',
        weChat: '',
        signature: '',
        voice: '',
        time: '',
        isRobot: '',
        customerId: ''

      },
      profitForm: {
        profit: ''
      },
      dialogVisible: {
        bigVisible: false,
        user: false,
        As: false

      },
      idsAs: {}, // 抽成比例ids
      AsForm: {
        profit: '',
        giftProfit: ''
      },
      sels: [],
      pager: {
        pageNo: 1,
        pageSize: 10,
        pageNoC: 1, // 查询
        pageSizeC: 10,
        total: 0
      },
      editImg: '', // 保存大头像
      rules: {
        profit: [
          { required: true, message: '输入值', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ],
        giftProfit: [
          { required: true, message: '输入值', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    options() {
      return this.forms.gender === '1' ? this.option[1] : this.option[2]
    }

  },
  created() {
    this.fetchData()
    queryLabelInUse().then(res => {
      this.option[2] = res.result.labels4Lady
      this.option[1] = res.result.labels4Man
    })
  },
  methods: {
    // 抽成比例
    AsClick() {
      this.dialogVisible.As = true
      this.idsAs = this.sels.map((row) => row.id).join(',')
    },
    // 抽成提交
    updateSubmitAs(AsForm) {
      this.$refs[AsForm].validate((valid) => {
        if (valid) {
          this.tableData.loading = true
          const _form = Object.assign({ ids: this.idsAs }, this.AsForm)

          editProfit(_form).then(res => {
            this.dialogVisible.As = false
            this.$message.success(res.message)
            this.fetchData()
          }).finally(_ => {
            this.tableData.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    authUserInfo(data, item) {
      authUserInfo(data).then(res => {
        this.$message.success(res.message)
        this.fetchData()
      })
    },
    // 通过的弹框操作
    authUserInfoProfit(row) {
      this.tableData.loading = true
      const _form = Object.assign({
        userId: row.id,
        status: 1,
        profit: this.profitForm.profit
      })
      authUserInfo(_form).then(res => {
        this.$message.success(res.message)
        this.fetchData()
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    selsChange(sels) {
      this.sels = sels
    },
    handlePagerChange(val) {
      this.pager.pageNo = val.index
      this.pager.pageSize = val.size
      this.fetchData()
    },
    fetchDataC() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNoC, // 页数
        pageSize: this.pager.pageSizeC // 条数
      }, this.filter)
      queryVifyList(_form)
        .then((res) => {
          const { rows = [], data = 0 } = res
          if (Array.isArray(rows)) {
            rows.forEach(item => {
              item.minusVisible = false
              if (item.idUrl) {
                item.srcList = item.idUrl.split(',') || []
              }
              if (item.photos) {
                item.photoss = item.photos.split(',') || []
              }
            })
          }
          this.tableData.array = rows

          this.pager.total = data // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    fetchData() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize // 条数
      }, this.filter)
      queryVifyList(_form)
        .then((res) => {
          const { rows = [], data = 0 } = res
          if (Array.isArray(rows)) {
            rows.forEach(item => {
              item.minusVisible = false
              if (item.idUrl) {
                item.srcList = item.idUrl.split(',') || []
              }
              if (item.photos) {
                item.photoss = item.photos.split(',') || []
              }
            })
          }
          this.tableData.array = rows

          this.pager.total = data // 总数
        }).finally(_ => {
          this.tableData.loading = false
        })
    },
    // 头像
    changeImg(row) {
      this.dialogVisible.bigVisible = true
      this.editImg = row
    },
    // 视频配置
    userVideo(row) {
      this.$router.push({ path: '/users/userVideo', query: { id: row.id }})
    },
    // 查看认证信息
    showDialog(item) {
      this.tableData.loading = true
      userQueryById({ id: item.id }).then(res => {
        this.forms = res.result
        if (this.forms.gender) {
          this.forms.gender = this.forms.gender.toString()
        }
        if (this.forms.beMarried) {
          this.forms.beMarried = this.forms.beMarried.toString()
        }
        if (this.forms.labels) {
          this.forms.labels = this.forms.labels.split('.')
        }
      }).finally(_ => {
        this.tableData.loading = false
      })
      this.dialogVisible.user = true
    },
    onselected(data) {
      this.form.geography = data.province.value + '|' + data.city.value + '|' + data.area.value
      this.show = false
    }

  }
}
</script>

<style lang="scss">
.icon-container{
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 1px dashed #ccc;
}
.voice-container{
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  position: relative;

}

.distapicker{
    margin-top: -20px;
}
.content-border{
  width: 100%;
  height: 120px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  padding: 5px;
  overflow-y: auto;
}
.image-content{
  width: 50px;
  height: 50px;
  margin-right: 5px;
  position: relative;
  display: inline-block;
}
</style>

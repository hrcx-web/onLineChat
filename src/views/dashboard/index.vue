<template>
  <div v-if="loginType=='admin'" class="dashboard-container">
    <el-row :gutter="10">
      <el-col v-for="(value, key) in map" :key="key" :xs="12" :sm="6" style="margin-top: 20px">
        <card :type="key.indexOf('day') > -1 ? 'today' : 'total'">
          <div class="card-title">{{ value }}</div>
          <div class="card-content">{{ (key.indexOf('money') > -1 ? division(data[key]) : data[key]) || 0 }}</div>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryIndexInfo } from '@/api/user'
import { division } from '@/utils/index'
import Card from '@/components/Card'
export default {
  name: 'Dashboard',
  components: {
    Card
  },
  data() {
    return {
      division,
      map: {
        system_num: '真人主播数',
        robot_num: '真人用户数',
        all_vip_money: '累积会员充值金额',
        all_open_vip: '累积开通会员数',
        all_coin_money: '累积钻石充值金额',
        all_cash_money: '累积提现金额',
        day_vip_money: '今日会员充值金额',
        day_open_vip: '今日开通会员数',
        day_coin_money: '今日钻石充值金额',
        day_cash_money: '今日提现金额'
      },
      data: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getIndexData()
    this.aaa()
  },
  methods: {
    aaa() {
      this.loginType = localStorage.getItem('loginType')
    },
    getIndexData() {
      queryIndexInfo().then(res => {
        const { result = {}} = res
        this.data = result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card-title{
  font-weight: 900;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";;
}
.card-content {
  font-family: 'cursive';
  font-size: 48px;
  font-weight: bold;
  text-align: right;
  color: $menuBg;
  margin: 10px 0;
}
</style>

<template>
  <div class="excelIn">
    <el-card>
      <div slot="header">
        <span>导入表格</span>
      </div>
      <el-button @click="test">test</el-button>
      <upload-excel :on-success="generateData" />
      <el-table
        :data="tabList"
        border
        stripe
        style="width: 100%;margin-top: 30px;"
      >
        <el-table-column
          v-for="item in tabHeader"
          :key="item"
          :prop="item"
          :label="item"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
export default {
  components: {
    UploadExcel
  },
  data() {
    return {
      tabList: [],
      tabHeader: [],
      test: this.debounce(() => {
        console.log(123, this)
      })
    }
  },
  methods: {
    generateData({ header, results }) {
      this.tabHeader = header
      this.tabList = results
    },
    debounce(fn, wait = 200) {
      let timer = 0
      return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => { fn.apply(this, args) }, wait)
      }
    }
  }
}
</script>
<style></style>

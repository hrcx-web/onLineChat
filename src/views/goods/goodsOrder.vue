<template>
  <div class="app-container">
    <div class="header">
      <el-form inline size="mini">
        <el-form-item>
          <el-input v-model="filter.userName" placeholder="请输入用户昵称" style="width:140px" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.toUserName" placeholder="请输入主播名" style="width:140px" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.logId" placeholder="请输入物流id" style="width:140px" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.id" placeholder="请输入订单id" style="width:140px" clearable />
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="first" />
      </el-form>
    </div>
    <div class="top">
      <div class="top-left">商品订单</div>
      <div class="top-right">
        <!-- <el-button size="small" :disabled="sels.length === 0" type="danger" @click="deleteFileOrDirectory(sels)">批量删除</el-button> -->
        <!-- <el-button type="primary" size="small" @click="showDialog">新增</el-button> -->
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :key="'first'" label="待支付" name="first">
        <el-table
          v-loading="tableData.loading"
          :data="tableData.array"
          border
          fit
          highlight-current-row
          @selection-change="selsChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="物流">
            <template slot-scope="scope">
              <p><span>订单id:</span>{{ scope.row.id }}</p>
              <p><span>物流id:</span>{{ scope.row.logId }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户信息">
            <template slot-scope="scope">
              <p><span>昵称:</span>{{ scope.row.userName }}</p>
              <p><span>收货人:</span>{{ scope.row.overName }}</p>
              <p><span>手机号:</span>{{ scope.row.phone }}</p>
              <p><span>收货地址:</span>{{ scope.row.address }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品信息">
            <template slot-scope="scope">
              <p><span>商品名:</span>{{ scope.row.goodsName }}</p>
              <p><span>数量:</span>{{ scope.row.num }}</p>
              <p><span>单价:</span>{{ scope.row.price }}</p>
              <p><span>总价:</span>{{ scope.row.totalPrice }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主播信息">
            <template slot-scope="scope">
              <p><span>主播名:</span>{{ scope.row.toUserName }}</p>
              <p><span>主播收益:</span>{{ scope.row.toUserProfit }}</p>
              <p><span>上级收益:</span>{{ scope.row.parentProfit }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易状态">
            <template slot-scope="scope">
              <p><span>订单状态:</span>{{ scope.row.status }}</p>
              <p>收货状态:<span :style="{color:(scope.row.confirmStatus=='2'?'#67C23A':'#000')}">{{ map.confirmStatus[scope.row.confirmStatus] }}</span> </p>
              <p><span>分销状态:</span>{{ map.result[scope.row.result] }}</p>
              <p><span>分销时间:</span>{{ scope.row.disTime }}</p>

            </template>
          </el-table-column>
          <el-table-column align="center" label="公会信息">
            <template slot-scope="scope">
              <p><span>一级公会:</span>{{ scope.row.tradeName }} {{ scope.row.tradeProfit }} </p>
              <p><span>二级公会:</span>{{ scope.row.secondTradeName }} {{ scope.row.secondTradeProfit }}</p>
              <p><span>系统抽成:</span>{{ scope.row.fees }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <p><span>创建时间:</span>{{ scope.row.createTime }}</p>
              <p><span>支付时间:</span>{{ scope.row.payTime }} </p>
              <p><span>发货时间:</span>{{ scope.row.sendTime }}</p>
              <p><span>收货时间:</span>{{ scope.row.confirmTime }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :key="'second'" label="已支付" name="second">
        <el-table
          v-loading="tableData.loading"
          :data="tableData.array"
          border
          fit
          highlight-current-row
          @selection-change="selsChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="物流">
            <template slot-scope="scope">
              <p><span>订单id:</span>{{ scope.row.id }}</p>
              <p><span>物流id:</span>{{ scope.row.logId }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户信息">
            <template slot-scope="scope">
              <p><span>昵称:</span>{{ scope.row.userName }}</p>
              <p><span>收货人:</span>{{ scope.row.overName }}</p>
              <p><span>手机号:</span>{{ scope.row.phone }}</p>
              <p><span>收货地址:</span>{{ scope.row.address }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品信息">
            <template slot-scope="scope">
              <p><span>商品名:</span>{{ scope.row.goodsName }}</p>
              <p><span>数量:</span>{{ scope.row.num }}</p>
              <p><span>单价:</span>{{ scope.row.price }}</p>
              <p><span>总价:</span>{{ scope.row.totalPrice }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主播信息">
            <template slot-scope="scope">
              <p><span>主播名:</span>{{ scope.row.toUserName }}</p>
              <p><span>主播收益:</span>{{ scope.row.toUserProfit }}</p>
              <p><span>上级收益:</span>{{ scope.row.parentProfit }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易状态">
            <template slot-scope="scope">
              <p><span>订单状态:</span>{{ scope.row.status }}</p>
              <p>收货状态:<span :style="{color:(scope.row.confirmStatus=='2'?'#67C23A':'#000')}">{{ map.confirmStatus[scope.row.confirmStatus] }}</span> </p>
              <p><span>分销状态:</span>{{ map.result[scope.row.result] }}</p>
              <p><span>分销时间:</span>{{ scope.row.disTime }}</p>

            </template>
          </el-table-column>
          <el-table-column align="center" label="公会信息">
            <template slot-scope="scope">
              <p><span>一级公会:</span>{{ scope.row.tradeName }} {{ scope.row.tradeProfit }} </p>
              <p><span>二级公会:</span>{{ scope.row.secondTradeName }} {{ scope.row.secondTradeProfit }}</p>
              <p><span>系统抽成:</span>{{ scope.row.fees }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <p><span>创建时间:</span>{{ scope.row.createTime }}</p>
              <p><span>支付时间:</span>{{ scope.row.payTime }} </p>
              <p><span>发货时间:</span>{{ scope.row.sendTime }}</p>
              <p><span>收货时间:</span>{{ scope.row.confirmTime }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :key="'third'" label="已发货" name="third">
        <el-table
          v-loading="tableData.loading"
          :data="tableData.array"
          border
          fit
          highlight-current-row
          @selection-change="selsChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="物流">
            <template slot-scope="scope">
              <p><span>订单id:</span>{{ scope.row.id }}</p>
              <p><span>物流id:</span>{{ scope.row.logId }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户信息">
            <template slot-scope="scope">
              <p><span>昵称:</span>{{ scope.row.userName }}</p>
              <p><span>收货人:</span>{{ scope.row.overName }}</p>
              <p><span>手机号:</span>{{ scope.row.phone }}</p>
              <p><span>收货地址:</span>{{ scope.row.address }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品信息">
            <template slot-scope="scope">
              <p><span>商品名:</span>{{ scope.row.goodsName }}</p>
              <p><span>数量:</span>{{ scope.row.num }}</p>
              <p><span>单价:</span>{{ scope.row.price }}</p>
              <p><span>总价:</span>{{ scope.row.totalPrice }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主播信息">
            <template slot-scope="scope">
              <p><span>主播名:</span>{{ scope.row.toUserName }}</p>
              <p><span>主播收益:</span>{{ scope.row.toUserProfit }}</p>
              <p><span>上级收益:</span>{{ scope.row.parentProfit }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易状态">
            <template slot-scope="scope">
              <p><span>订单状态:</span>{{ scope.row.status }}</p>
              <p>收货状态:<span :style="{color:(scope.row.confirmStatus=='2'?'#67C23A':'#000')}">{{ map.confirmStatus[scope.row.confirmStatus] }}</span> </p>
              <p><span>分销状态:</span>{{ map.result[scope.row.result] }}</p>
              <p><span>分销时间:</span>{{ scope.row.disTime }}</p>

            </template>
          </el-table-column>
          <el-table-column align="center" label="公会信息">
            <template slot-scope="scope">
              <p><span>一级公会:</span>{{ scope.row.tradeName }} {{ scope.row.tradeProfit }} </p>
              <p><span>二级公会:</span>{{ scope.row.secondTradeName }} {{ scope.row.secondTradeProfit }}</p>
              <p><span>系统抽成:</span>{{ scope.row.fees }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <p><span>创建时间:</span>{{ scope.row.createTime }}</p>
              <p><span>支付时间:</span>{{ scope.row.payTime }} </p>
              <p><span>发货时间:</span>{{ scope.row.sendTime }}</p>
              <p><span>收货时间:</span>{{ scope.row.confirmTime }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160px" align="center">
            <template v-if="scope.row.confirmStatus=='2'" slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-button size="mini" type="success" :loading="tableData.loading" plain @click="throughClick(scope.row)">通过</el-button>
                </el-col>
                <el-col :span="10">
                  <el-button size="mini" type="danger" :loading="tableData.loading" plain @click="rejectedClick(scope.row)">驳回</el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :key="'fourth'" label="已完成" name="fourth">
        <el-table
          v-loading="tableData.loading"
          :data="tableData.array"
          border
          fit
          highlight-current-row
          @selection-change="selsChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="物流">
            <template slot-scope="scope">
              <p><span>订单id:</span>{{ scope.row.id }}</p>
              <p><span>物流id:</span>{{ scope.row.logId }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户信息">
            <template slot-scope="scope">
              <p><span>昵称:</span>{{ scope.row.userName }}</p>
              <p><span>收货人:</span>{{ scope.row.overName }}</p>
              <p><span>手机号:</span>{{ scope.row.phone }}</p>
              <p><span>收货地址:</span>{{ scope.row.address }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品信息">
            <template slot-scope="scope">
              <p><span>商品名:</span>{{ scope.row.goodsName }}</p>
              <p><span>数量:</span>{{ scope.row.num }}</p>
              <p><span>单价:</span>{{ scope.row.price }}</p>
              <p><span>总价:</span>{{ scope.row.totalPrice }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主播信息">
            <template slot-scope="scope">
              <p><span>主播名:</span>{{ scope.row.toUserName }}</p>
              <p><span>主播收益:</span>{{ scope.row.toUserProfit }}</p>
              <p><span>上级收益:</span>{{ scope.row.parentProfit }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易状态">
            <template slot-scope="scope">
              <p><span>订单状态:</span>{{ scope.row.status }}</p>
              <p>收货状态:<span :style="{color:(scope.row.confirmStatus=='2'?'#67C23A':'#000')}">{{ map.confirmStatus[scope.row.confirmStatus] }}</span> </p>
              <p><span>分销状态:</span>{{ map.result[scope.row.result] }}</p>
              <p><span>分销时间:</span>{{ scope.row.disTime }}</p>

            </template>
          </el-table-column>
          <el-table-column align="center" label="公会信息">
            <template slot-scope="scope">
              <p><span>一级公会:</span>{{ scope.row.tradeName }} {{ scope.row.tradeProfit }} </p>
              <p><span>二级公会:</span>{{ scope.row.secondTradeName }} {{ scope.row.secondTradeProfit }}</p>
              <p><span>系统抽成:</span>{{ scope.row.fees }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <p><span>创建时间:</span>{{ scope.row.createTime }}</p>
              <p><span>支付时间:</span>{{ scope.row.payTime }} </p>
              <p><span>发货时间:</span>{{ scope.row.sendTime }}</p>
              <p><span>收货时间:</span>{{ scope.row.confirmTime }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane :key="'fifth'" label="已关闭" name="fifth">
        <el-table
          v-loading="tableData.loading"
          :data="tableData.array"
          border
          fit
          highlight-current-row
          @selection-change="selsChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="物流">
            <template slot-scope="scope">
              <p><span>订单id:</span>{{ scope.row.id }}</p>
              <p><span>物流id:</span>{{ scope.row.logId }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户信息">
            <template slot-scope="scope">
              <p><span>昵称:</span>{{ scope.row.userName }}</p>
              <p><span>收货人:</span>{{ scope.row.overName }}</p>
              <p><span>手机号:</span>{{ scope.row.phone }}</p>
              <p><span>收货地址:</span>{{ scope.row.address }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品信息">
            <template slot-scope="scope">
              <p><span>商品名:</span>{{ scope.row.goodsName }}</p>
              <p><span>数量:</span>{{ scope.row.num }}</p>
              <p><span>单价:</span>{{ scope.row.price }}</p>
              <p><span>总价:</span>{{ scope.row.totalPrice }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主播信息">
            <template slot-scope="scope">
              <p><span>主播名:</span>{{ scope.row.toUserName }}</p>
              <p><span>主播收益:</span>{{ scope.row.toUserProfit }}</p>
              <p><span>上级收益:</span>{{ scope.row.parentProfit }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易状态">
            <template slot-scope="scope">
              <p><span>订单状态:</span>{{ scope.row.status }}</p>
              <p>收货状态:<span :style="{color:(scope.row.confirmStatus=='2'?'#67C23A':'#000')}">{{ map.confirmStatus[scope.row.confirmStatus] }}</span> </p>
              <p><span>分销状态:</span>{{ map.result[scope.row.result] }}</p>
              <p><span>分销时间:</span>{{ scope.row.disTime }}</p>

            </template>
          </el-table-column>
          <el-table-column align="center" label="公会信息">
            <template slot-scope="scope">
              <p><span>一级公会:</span>{{ scope.row.tradeName }} {{ scope.row.tradeProfit }} </p>
              <p><span>二级公会:</span>{{ scope.row.secondTradeName }} {{ scope.row.secondTradeProfit }}</p>
              <p><span>系统抽成:</span>{{ scope.row.fees }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <p><span>创建时间:</span>{{ scope.row.createTime }}</p>
              <p><span>支付时间:</span>{{ scope.row.payTime }} </p>
              <p><span>发货时间:</span>{{ scope.row.sendTime }}</p>
              <p><span>收货时间:</span>{{ scope.row.confirmTime }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :key="'sixth'" label="取消支付" name="sixth">
        <el-table
          v-loading="tableData.loading"
          :data="tableData.array"
          border
          fit
          highlight-current-row
          @selection-change="selsChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="物流">
            <template slot-scope="scope">
              <p><span>订单id:</span>{{ scope.row.id }}</p>
              <p><span>物流id:</span>{{ scope.row.logId }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户信息">
            <template slot-scope="scope">
              <p><span>昵称:</span>{{ scope.row.userName }}</p>
              <p><span>收货人:</span>{{ scope.row.overName }}</p>
              <p><span>手机号:</span>{{ scope.row.phone }}</p>
              <p><span>收货地址:</span>{{ scope.row.address }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品信息">
            <template slot-scope="scope">
              <p><span>商品名:</span>{{ scope.row.goodsName }}</p>
              <p><span>数量:</span>{{ scope.row.num }}</p>
              <p><span>单价:</span>{{ scope.row.price }}</p>
              <p><span>总价:</span>{{ scope.row.totalPrice }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主播信息">
            <template slot-scope="scope">
              <p><span>主播名:</span>{{ scope.row.toUserName }}</p>
              <p><span>主播收益:</span>{{ scope.row.toUserProfit }}</p>
              <p><span>上级收益:</span>{{ scope.row.parentProfit }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易状态">
            <template slot-scope="scope">
              <p><span>订单状态:</span>{{ scope.row.status }}</p>
              <p>收货状态:<span :style="{color:(scope.row.confirmStatus=='2'?'#67C23A':'#000')}">{{ map.confirmStatus[scope.row.confirmStatus] }}</span> </p>
              <p><span>分销状态:</span>{{ map.result[scope.row.result] }}</p>
              <p><span>分销时间:</span>{{ scope.row.disTime }}</p>

            </template>
          </el-table-column>
          <el-table-column align="center" label="公会信息">
            <template slot-scope="scope">
              <p><span>一级公会:</span>{{ scope.row.tradeName }} {{ scope.row.tradeProfit }} </p>
              <p><span>二级公会:</span>{{ scope.row.secondTradeName }} {{ scope.row.secondTradeProfit }}</p>
              <p><span>系统抽成:</span>{{ scope.row.fees }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <p><span>创建时间:</span>{{ scope.row.createTime }}</p>
              <p><span>支付时间:</span>{{ scope.row.payTime }} </p>
              <p><span>发货时间:</span>{{ scope.row.sendTime }}</p>
              <p><span>收货时间:</span>{{ scope.row.confirmTime }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :key="'seventh'" label="已退款" name="seventh">
        <el-table
          v-loading="tableData.loading"
          :data="tableData.array"
          border
          fit
          highlight-current-row
          @selection-change="selsChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="物流">
            <template slot-scope="scope">
              <p><span>订单id:</span>{{ scope.row.id }}</p>
              <p><span>物流id:</span>{{ scope.row.logId }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户信息">
            <template slot-scope="scope">
              <p><span>昵称:</span>{{ scope.row.userName }}</p>
              <p><span>收货人:</span>{{ scope.row.overName }}</p>
              <p><span>手机号:</span>{{ scope.row.phone }}</p>
              <p><span>收货地址:</span>{{ scope.row.address }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品信息">
            <template slot-scope="scope">
              <p><span>商品名:</span>{{ scope.row.goodsName }}</p>
              <p><span>数量:</span>{{ scope.row.num }}</p>
              <p><span>单价:</span>{{ scope.row.price }}</p>
              <p><span>总价:</span>{{ scope.row.totalPrice }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主播信息">
            <template slot-scope="scope">
              <p><span>主播名:</span>{{ scope.row.toUserName }}</p>
              <p><span>主播收益:</span>{{ scope.row.toUserProfit }}</p>
              <p><span>上级收益:</span>{{ scope.row.parentProfit }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易状态">
            <template slot-scope="scope">
              <p><span>订单状态:</span>{{ scope.row.status }}</p>
              <p>收货状态:<span :style="{color:(scope.row.confirmStatus=='2'?'#67C23A':'#000')}">{{ map.confirmStatus[scope.row.confirmStatus] }}</span> </p>
              <p><span>分销状态:</span>{{ map.result[scope.row.result] }}</p>
              <p><span>分销时间:</span>{{ scope.row.disTime }}</p>

            </template>
          </el-table-column>
          <el-table-column align="center" label="公会信息">
            <template slot-scope="scope">
              <p><span>一级公会:</span>{{ scope.row.tradeName }} {{ scope.row.tradeProfit }} </p>
              <p><span>二级公会:</span>{{ scope.row.secondTradeName }} {{ scope.row.secondTradeProfit }}</p>
              <p><span>系统抽成:</span>{{ scope.row.fees }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <p><span>创建时间:</span>{{ scope.row.createTime }}</p>
              <p><span>支付时间:</span>{{ scope.row.payTime }} </p>
              <p><span>发货时间:</span>{{ scope.row.sendTime }}</p>
              <p><span>收货时间:</span>{{ scope.row.confirmTime }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <pagination
      :pager-index="pager.pageNo"
      :pager-size="pager.pageSize"
      :pager-total="pager.total"
      @pagination-change="handlePagerChange"
    />

    <el-dialog :visible.sync="dialogVisible.goods" width="500px" title="新增商品订单信息" center style="z-index: 9999">
      <el-form ref="form" label-position="right" :validate-on-rule-change="false" label-width="120px" :model="form" size="mini">
        <el-row :gutter="5">
          <el-col :span="20">
            <el-form-item label="物流id">
              <el-input v-model="form.logId" />
            </el-form-item>
            <el-form-item label="订单id">
              <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option v-for="(value,key) in map.status" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="form.payType" placeholder="请选择">
                <el-option v-for="(value,key) in map.payType" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="支付时间">
              <el-input v-model="form.payTime" />
            </el-form-item>
            <el-form-item label="分销状态">
              <el-select v-model="form.result" placeholder="请选择">
                <el-option v-for="(value,key) in map.result" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="评价状态">
              <el-select v-model="form.commStatus" placeholder="请选择">
                <el-option v-for="(value,key) in map.commStatus" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="收货状态">
              <el-select v-model="form.confirmStatus" placeholder="请选择">
                <el-option v-for="(value,key) in map.confirmStatus" :key="key" :value="key" :label="value" />
              </el-select>
            </el-form-item>
            <el-form-item label="发货时间">
              <el-input v-model="form.sendTime" />
            </el-form-item>
            <el-form-item label="收货时间">
              <el-input v-model="form.confirmTime" />
            </el-form-item>
            <el-form-item label="收货手机号">
              <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="收货地址">
              <el-input v-model="form.address" />
            </el-form-item>
            <!-- <el-form-item label="商品名">
              <el-input v-model="form.goodsName" />
            </el-form-item> -->
            <!-- <el-form-item label="商品logo">
              <div class="icon-container" @click="fakeClick('goodsLogo')">
                <i v-if="!form.goodsLogo" class="el-icon-plus" />
                <img
                  v-else
                  :src="form.goodsLogo"
                  style="width: 100%; height: 100%"
                  alt=""
                >
              </div>
            </el-form-item> -->
            <el-form-item label="主播收益">
              <el-input v-model="form.toUserProfit" />
            </el-form-item>
            <el-form-item label="单价">
              <el-input v-model="form.price" />
            </el-form-item>

            <el-form-item label="数量">
              <el-input v-model="form.num" />
            </el-form-item>
            <el-form-item label="总价">
              <el-input v-model="form.totalPrice" />
            </el-form-item>
            <el-form-item label="系统抽成">
              <el-input v-model="form.fees" />
            </el-form-item>
            <el-form-item label="上级收益">
              <el-input v-model="form.parentProfit" />
            </el-form-item>
            <el-form-item label="归属一级公会">
              <el-input v-model="form.tradeId" />
            </el-form-item>
            <el-form-item label="一级公会收益">
              <el-input v-model="form.tradeProfit" />
            </el-form-item>
            <el-form-item label="归属二级公会">
              <el-input v-model="form.secondTradeId" />
            </el-form-item>
            <el-form-item label="二级公会收益">
              <el-input v-model="form.secondTradeProfit" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <input type="file" style="visibility: hidden" class="bigLogo" @change="val => uploadFile(val, ['form','bigLogo'])">
      <input type="file" style="visibility: hidden" class="logo" @change="val => uploadFile(val, ['form','logo'])"> -->
      <div slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible.goods=false"
        >取 消</el-button>
        <el-button type="primary" :loading="tableData.loading" size="small" @click="updateSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { initForm, copyObject, clearEmptyItem } from '@/utils/index'
import { goodsOrder, updateGoodsOrder, deleteBatchs, goodsOrderEdit } from '@/api/goods'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      // 默认第一个选项卡
      activeName: 'first',
      tableData: {
        array: [],
        row: {},
        loading: false
      },
      pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        status0: 0,
        status1: 1,
        status3: 3,
        status4: 4,
        status5: 5,
        status6: 6,
        status7: 7

      },
      filter: {
        id: '',
        logId: '',
        toUserName: '',
        userName: ''
      },
      dialogVisible: {
        goods: false
      },
      mode: '',
      form: {
        payType: '', // 支付方式
        address: '', // 收获地址
        commStatus: '', // 评价状态
        payTime: '', // 支付时间
        toUserProfit: '', // 主播收益
        remark: '', // 备注
        confirmTime: '', // 收获时间
        fees: '', // 系统抽成
        logId: '', // 物流id
        id: '', // 订单id
        sendTime: '', // 发货时间
        parentProfit: '', // 上级收益
        price: '', // 单价
        phone: '', // 收获手机号
        result: '', // 分销状态
        secondTradeId: '', // 归属二级公会
        tradeId: '', // 归属一级公会
        tradeProfit: '', // 一级公会收益
        secondTradeProfit: '', // 二级公会收益
        status: '', // 订单状态
        confirmStatus: '', // 收货状态

        num: '', // 数量
        totalPrice: ''// 总价
      },
      map: {
        result: {
          0: '未分销',
          1: '已分销'
        },
        confirmStatus: {
          0: '待收货',
          1: '用户确认收货',
          2: '主播申请收货'
        },
        payType: {
          1: '微信',
          2: '支付宝',
          3: '撩币',
          4: '银行卡'
        },
        commStatus: {
          1: '已评价',
          0: '未评价'
        },
        status: {
          0: '待支付',
          1: '已支付',
          3: '已发货',
          4: '已完成',
          5: '已关闭',
          6: '取消支付',
          7: '已退款'
        }
      },
      sels: []

    }
  }, created() {
    this.first()
  },
  methods: {
    // showDialog(item) {
    //   this.tableData.row = item || {}
    //   this.form = initForm(this.form)
    //   if (mode === 'edit') {
    //     this.form = copyObject(this.form, item, { numberToString: true })
    //   }
    //   this.dialogVisible.goods = true
    // },
    updateSubmit() {
      this.tableData.loading = true
      let _form = Object.assign({ id: this.tableData.row.id }, this.form)
      _form = clearEmptyItem(_form)
      updateGoodsOrder(_form).then(res => {
        this.$message.success(res.message)
        this.dialogVisible.goods = false
        this.first()
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    handlePagerChange(val) {
      this.pager.pageNo = val.index
      this.pager.pageSize = val.size
      this.first()
    },
    selsChange(sels) {
      this.sels = sels
    },
    deleteFileOrDirectory() {
      const ids = this.sels.map(row => row.id).join()
      this.$confirm('确定要删除选中的商品订单信息吗?', '提示')
        .then(() => {
          deleteBatchs({
            ids: ids
          }).then((data) => {
            this.$message.success(data.message)
            this.first()
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleClick(tab, event) {
      if (tab.name === 'first') {
        	this.first()
      } else if (tab.name === 'second') {
        	this.second()
      } else if (tab.name === 'third') {
        	this.third()
      } else if (tab.name === 'fourth') {
        	this.fourth()
      } else if (tab.name === 'fifth') {
        	this.fifth()
      } else if (tab.name === 'sixth') {
        	this.sixth()
      } else {
        this.seventh()
      }
    },
    first() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        status: this.pager.status0
      }, this.filter)
      goodsOrder(_form).then(res => {
        const { result = {}} = res
        // console.log(res)
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    second() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        status: this.pager.status1
      }, this.filter)
      goodsOrder(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    third() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        status: this.pager.status3
      }, this.filter)
      goodsOrder(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    fourth() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        status: this.pager.status4
      }, this.filter)
      goodsOrder(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    fifth() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        status: this.pager.status5
      }, this.filter)
      goodsOrder(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    sixth() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        status: this.pager.status6
      }, this.filter)
      goodsOrder(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    seventh() {
      this.tableData.loading = true
      const _form = Object.assign({
        pageNo: this.pager.pageNo, // 页数
        pageSize: this.pager.pageSize, // 条数
        status: this.pager.status7
      }, this.filter)
      goodsOrder(_form).then(res => {
        const { result = {}} = res
        this.tableData.array = result.records
        this.pager.total = result.total // 总数
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    throughClick(row) { // 通过
      this.tableData.loading = true
      const _form = Object.assign({ orderId: row.id, status: this.pager.status4 })
      goodsOrderEdit(_form).then(res => {
        this.$message.success(res.message)
        this.third()
      }).finally(_ => {
        this.tableData.loading = false
      })
    },
    // 驳回
    rejectedClick(row) {
      this.tableData.loading = true
      const _form = Object.assign({ orderId: row.id, status: this.pager.status7 })
      goodsOrderEdit(_form).then(res => {
        this.$message.success(res.message)
        this.third()
      }).finally(_ => {
        this.tableData.loading = false
      })
    }

  }
}

</script>
<style scoped lang="scss">
.icon-container{
     width: 80px;
     height: 80px;
     border-radius:4px;
     border: 1px dashed  #ccc;
      position: relative;
  cursor: pointer;
    i{
   display: block;
    font-size: 24px;
    position: absolute;
   top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    }

}

</style>

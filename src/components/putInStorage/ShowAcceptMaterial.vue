<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable
          :value="customer1"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters1"
          responsiveLayout="scroll"
          :globalFilterFields="[
            'emaName',
            'emtNo',
            'empNo',
            'emaNo',
            'emeType',
            'esNo',
            'essNo',
            'esssNo',
            'essssNo',
            'emePriceUnit',
            'emeNumberCount',
            'emePriceCount'
          ]"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="取消过滤"
                class="p-button-outlined mb-2"
                @click="clearFilter1()"
              />
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters1['global'].value"
                  placeholder="查找"
                  style="width: 100%"
                />
              </span>
            </div>
          </template>
          <template #empty> 没有符合条件的记录 </template>
          <template #loading> 正在加载 请稍后 </template>
          <Column field="emeNo" header="编号" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.emeNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按编号搜索"
              />
            </template>
          </Column>
          <Column field="emaName" header="品名" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.emaName }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按品名搜索"
              />
            </template>
          </Column>
          <Column field="emtNo" header="物资类型" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.emtNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按物资类型搜索"
              />
            </template>
          </Column>
          <Column field="empNo" header="打包方式" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.empNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按打包方式搜索"
              />
            </template>
          </Column>
          <Column field="emaNo" header="属性" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.emaNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按属性搜索"
              />
            </template>
          </Column>
          <Column field="emeType" header="入库方式" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.emeType }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按入库方式搜索"
              />
            </template>
          </Column>
          <Column field="esNo" header="物资库" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.esNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按物资库搜索"
              />
            </template>
          </Column>
          <Column field="essNo" header="仓库" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.essNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按仓库搜索"
              />
            </template>
          </Column>
          <Column field="esssNo" header="库区" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.esssNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按库区搜索"
              />
            </template>
          </Column>
          <Column field="essssNo" header="货架" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.essssNo }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按货架搜索"
              />
            </template>
          </Column>
          <Column
            header="单价"
            filterField="emePriceUnit"
            dataType="numeric"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatCurrency(data.emePriceUnit) }}
            </template>
            <template #filter="{ filterModel }">
              <InputNumber
                v-model="filterModel.value"
                mode="currency"
                currency="CNY"
                locale="zh-CN"
              />
            </template>
          </Column>
          <Column field="emeNumberCount" header="数量" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.emeNumberCount }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="按数量搜索"
              />
            </template>
          </Column>
          <Column
            header="总价"
            filterField="emePriceCount"
            dataType="numeric"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatCurrency(data.emePriceCount) }}
            </template>
            <template #filter="{ filterModel }">
              <InputNumber
                v-model="filterModel.value"
                mode="currency"
                currency="CNY"
                locale="zh-CN"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api"
import ylRequest from "@/service"
export default {
  data() {
    return {
      customer1: null,
      filters1: null,
      loading1: true,
      loading2: true
    }
  },
  created() {
    this.initFilters1()
  },
  mounted() {
    this.selectAll()
  },
  methods: {
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        emaName: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        emtNo: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        empNo: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        emaNo: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        emeType: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        esNo: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        essNo: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        esssNo: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        essssNo: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        emePriceUnit: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        },
        emeNumberCount: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        emePriceCount: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        }
      }
    },
    clearFilter1() {
      this.initFilters1()
    },
    collapseAll() {
      this.expandedRows = null
    },
    formatCurrency(value) {
      return value.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })
    },
    formatDate(value) {
      return value.toLocaleDateString("zh-CN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
    },
    async selectAll() {
      const data = await ylRequest.request({
        url: "eme/selectAccept",
        method: "GET",
        withCredentials: true
      })
      this.customer1 = data.data
      this.loading1 = false
      this.customer1.forEach((customer) => (customer.date = new Date(customer.date)))
      this.loading2 = false
    }
    // async materialAccept(data) {
    //   const info = await ylRequest.request({
    //     url: "eme/materialAccept",
    //     method: "POST",
    //     data: data,
    //     withCredentials: true
    //   })
    //   const code = info.code
    //   if (code === 2) {
    //     this.$toast.add({
    //       severity: "success",
    //       summary: "success",
    //       detail: data.message,
    //       life: 3000
    //     })
    //   } else if (code === 0) {
    //     this.$toast.add({
    //       severity: "null",
    //       summary: "null",
    //       detail: data.message,
    //       life: 3000
    //     })
    //   } else {
    //     this.$toast.add({
    //       severity: "failure",
    //       summary: "failure",
    //       detail: data.message,
    //       life: 3000
    //     })
    //   }
    //   this.selectAll()
    // }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/demo/badges.scss";

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>

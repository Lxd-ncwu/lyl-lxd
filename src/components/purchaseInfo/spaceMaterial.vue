<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <DataTable
          ref="dt"
          :value="storage"
          :paginator="true"
          :rows="5"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Materials"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">分库区物资</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <span class="block mt-2 md:mt-0 p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filters['global'].value" placeholder="Search..." />&emsp;
                  <Button
                    label="导出"
                    icon="pi pi-upload"
                    class="p-button-help"
                    @click="exportCSV($event)"
                  />
                </span>
              </span>
            </div>
          </template>

          <Column
            field="eisNo"
            header="分库区编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.eisNo }}
            </template>
          </Column>
          <Column
            field="empNo"
            header="物资编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.empNo }}
            </template>
          </Column>
          <Column
            field="epName"
            header="供应商"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ slotProps.data.epName }}
            </template>
          </Column>
          <Column
            field="empName"
            header="物资名称"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              {{ slotProps.data.empName }}
            </template>
          </Column>
          <Column
            field="empDateProduct"
            header="生产日期"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ slotProps.data.empDateProduct }}
            </template>
          </Column>
          <Column
            field="empShelfLife"
            header="保质期"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ slotProps.data.empShelfLife + "个月" }}
            </template>
          </Column>
          <Column
            field="count"
            header="库存"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ slotProps.data.count }}
            </template>
          </Column>
          <Column headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <Button
                label="采购"
                class="p-button-rounded p-button-success mr-2 mb-2"
                @click="openNewOrder(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="newOrder"
          :style="{ width: '450px' }"
          header="物资采购"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="count">采购数量</label>
            <InputText
              id="eoCount"
              v-model.trim="Order.eoCount"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !Order.count }"
            />
            <small class="p-invalid" v-if="submitted && !Order.count">输入采购数量</small>
          </div>
          <div class="field">
            <label for="empPrice">单价</label>
            <InputText
              id="empPrice"
              v-model.trim="Order.empPrice"
              required="true"
              autofocus
              readonly="readonly"
            />
          </div>
          <template #footer>
            <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="保存" icon="pi pi-check" class="p-button-text" @click="saveOrder" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api"
import ProductService from "../../service/ProductService"
import ylRequest from "@/service"
export default {
  name: "Storage",
  data() {
    return {
      Order: {},
      newOrder: false,
      filters: {},
      submitted: false,
      storage: []
    }
  },
  productService: null,
  created() {
    this.productService = new ProductService()
    this.initFilters()
  },
  async mounted() {
    const data = await ylRequest.request({
      url: "/material_info/spaceInfo",
      method: "GET",
      withCredentials: true
    })
    this.storage = data.data
    console.log(data)
  },
  methods: {
    //导出为excel
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    },
    hideDialog() {
      this.newOrder = false
      this.submitted = false
    },
    openNewOrder(data) {
      this.Order = {
        empNo: data.empNo,
        empName: data.empName,
        empPrice: this.numFilter(data.empPrice),
        epName: data.epName
      }
      this.newOrder = true
      this.submitted = false
    },
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(2)
      return realVal
    },
    async saveOrder() {
      const data = await ylRequest.request({
        url: "/order/new_order",
        method: "POST",
        data: this.Order,
        withCredentials: true
      })
      const code = data.code
      if (code === 0) {
        this.newOrder = false
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "提交订单成功，编号为" + data.data,
          life: 3000
        })
      } else {
        alert(data.msg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/demo/badges.scss";
</style>

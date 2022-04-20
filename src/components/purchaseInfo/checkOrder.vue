<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <DataTable
          ref="dt"
          :value="order"
          :paginator="true"
          :rows="5"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Order"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">待审核订单</h5>
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
            field="eoNo"
            header="订单编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.eoNo }}
            </template>
          </Column>
          <Column
            field="empName"
            header="采购商品"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.empName }}
            </template>
          </Column>
          <Column
            field="empPrice"
            header="单价"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ slotProps.data.empPrice + "元" }}
            </template>
          </Column>
          <Column
            field="eoCount"
            header="采购数量"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              {{ slotProps.data.eoCount }}
            </template>
          </Column>
          <Column
            field="epName"
            header="供应商"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ slotProps.data.epName }}
            </template>
          </Column>
          <Column
            field="name"
            header="采购人员"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <Button
                title="审核通过"
                icon="pi pi-check"
                class="p-button-rounded p-button-outlined mr-2 mb-2"
                @click="passCheck(slotProps.data.eoId)"
              />
              <Button
                title="审核不通过"
                icon="pi pi-times"
                class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"
                @click="openNotPassWindow(slotProps.data.eoId)"
              />
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="notPass"
          :style="{ width: '450px' }"
          header="备注"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="eoReason">未通过理由</label>
            <Textarea id="eoReason" v-model="order.eoReason" required="true" rows="3" cols="20" />
          </div>
          <template #footer>
            <Button label="提交" icon="pi pi-check" class="p-button-text" @click="notPassCheck()" />
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
import qs from "qs"
export default {
  name: "order",
  data() {
    return {
      notPassId: null,
      notPass: false,
      products: null,
      filters: {},
      submitted: false,
      order: []
    }
  },
  productService: null,
  created() {
    this.productService = new ProductService()
    this.initFilters()
  },
  async mounted() {
    const data = await ylRequest.request({
      url: "/order/checkOrderList",
      method: "GET",
      withCredentials: true
    })
    this.order = data.data
    console.log(this.order)
  },
  methods: {
    async flush() {
      const data = await ylRequest.request({
        url: "/order/checkOrderList",
        method: "GET",
        withCredentials: true
      })
      this.order = data.data
    },
    openNotPassWindow(id) {
      this.notPass = true
      this.id = id
    },
    async passCheck(id) {
      const data = await ylRequest.request({
        url: "/order/passCheck/" + id,
        method: "POST",
        withCredentials: true
      })
      const code = data.code
      if (code === 0) {
        this.flush()
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "审核成功",
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: data.msg,
          life: 3000
        })
      }
    },
    async notPassCheck() {
      if (this.order.eoReason == null) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "请输入未通过理由",
          life: 3000
        })
        return
      }
      this.notPass = false
      const data = await ylRequest.request({
        url: "order/notPassCheck/" + this.id,
        data: {
          eoReason: this.order.eoReason
        },
        method: "POST",
        withCredentials: true
      })
      const code = data.code
      if (code === 0) {
        this.flush()
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "审核成功",
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: data.msg,
          life: 3000
        })
      }
    },
    //导出为excel
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/demo/badges.scss";
</style>

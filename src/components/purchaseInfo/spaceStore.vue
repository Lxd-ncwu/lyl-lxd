<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <DataTable
          ref="dt"
          :value="storage"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Storages"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">实体库信息</h5>
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
            header="编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.eisNo }}
            </template>
          </Column>
          <Column
            field="es"
            header="所在逻辑库编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.esNo }}
            </template>
          </Column>
          <Column
            field="esrNo"
            header="所处实体库编号"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ slotProps.data.esrNo }}
            </template>
          </Column>
          <Column
            field="ts"
            header="建库时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ slotProps.data.ts }}
            </template>
          </Column>
        </DataTable>
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
      products: null,
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
      url: "/storage_info/spaceInfo",
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/demo/badges.scss";
</style>

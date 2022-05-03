<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="新建"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew"
              />
              <Button
                label="删除"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="confirmDeleteSelected"
                :disabled="!selectedProducts || !selectedProducts.length"
              />
            </div>
          </template>

          <template v-slot:end>
            <Button
              label="导出"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="products"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="{totalRecords} 条数据中的 {first} 条到 {last} 条"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">物资类型定义</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="查找" />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="emtNo"
            header="编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">编号</span>
              {{ slotProps.data.emtNo }}
            </template>
          </Column>
          <Column
            field="emtNameFirst"
            header="一级类型名称"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">一级类型名称</span>
              {{ slotProps.data.emtNameFirst }}
            </template>
          </Column>
          <Column
            field="emtNameSecond"
            header="二级类型名称"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">二级类型名称</span>
              {{ slotProps.data.emtNameSecond }}
            </template>
          </Column>
          <Column
            field="emtTimeValue"
            header="创建时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">创建时间</span>
              {{ slotProps.data.emtTimeValue }}
            </template>
          </Column>
          <Column
            field="emtTs"
            header="修改时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">修改时间</span>
              {{ slotProps.data.emtTs }}
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mt-2"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="createProductDialog"
          :style="{ width: '450px' }"
          header="新建物资类型"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="emtNo">编号</label>
            <InputText
              id="emtNo"
              v-model.trim="product.emtNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emtNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.emtNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="emtNameFirst">一级类型名称</label>
            <InputText
              id="emtNameFirst"
              v-model.trim="product.emtNameFirst"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emtNameFirst }"
            />
            <small class="p-invalid" v-if="submitted && !product.emtNameFirst"
              >类型名称不能为空</small
            >
          </div>
          <div class="field">
            <label for="emtNameSecond">二级类型名称</label>
            <InputText
              id="emtNameFirst"
              v-model.trim="product.emtNameSecond"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emtNameSecond }"
            />
            <small class="p-invalid" v-if="submitted && !product.emtNameSecond"
              >类型名称不能为空</small
            >
          </div>

          <template #footer>
            <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="保存" icon="pi pi-check" class="p-button-text" @click="addProduct" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="updateProductDialog"
          :style="{ width: '450px' }"
          header="修改信息"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="emtNo">编号</label>
            <InputText
              id="emtNo"
              v-model.trim="product.emtNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emtNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.emtNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="emtNameFirst">一级类型名称</label>
            <InputText
              id="emtNameFirst"
              v-model.trim="product.emtNameFirst"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emtNameFirst }"
            />
            <small class="p-invalid" v-if="submitted && !product.emtNameFirst"
              >类型名称不能为空</small
            >
          </div>
          <div class="field">
            <label for="emtNameSecond">二级类型名称</label>
            <InputText
              id="emtNameFirst"
              v-model.trim="product.emtNameSecond"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emtNameSecond }"
            />
            <small class="p-invalid" v-if="submitted && !product.emtNameSecond"
              >类型名称不能为空</small
            >
          </div>
          <template #footer>
            <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="保存" icon="pi pi-check" class="p-button-text" @click="updateProduct" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductDialog"
          :style="{ width: '450px' }"
          header="警告⚠"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">
              您确定要删除这一项吗？ <b>{{ product.emtNo }}</b>
            </span>
          </div>
          <template #footer>
            <Button
              label="取消"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductDialog = false"
            />
            <Button label="确定" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductsDialog"
          :style="{ width: '450px' }"
          header="警告⚠"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product"> 您确定要删除所选项吗？ </span>
          </div>
          <template #footer>
            <Button
              label="取消"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductsDialog = false"
            />
            <Button
              label="确定"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteSelectedProducts"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api"
import ylRequest from "@/service"

export default {
  name: "MaterialType",
  data() {
    return {
      products: null,
      createProductDialog: false,
      updateProductDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false
    }
  },
  created() {
    this.initFilters()
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    openNew() {
      this.product = {}
      this.submitted = false
      this.createProductDialog = true
    },
    editProduct(product) {
      this.product = { ...product }
      this.updateProductDialog = true
    },
    hideDialog() {
      this.createProductDialog = false
      this.updateProductDialog = false
      this.deleteProductDialog = false
      this.deleteProductsDialog = false
      this.submitted = false
    },
    async getProduct() {
      const datas = await ylRequest.request({
        url: "/emt/selectAll",
        method: "GET",
        withCredentials: true
      })
      this.products = datas.data
    },
    async addProduct() {
      this.submitted = true
      const data = await ylRequest.request({
        url: "/emt/insertNewOne",
        method: "POST",
        data: this.product,
        withCredentials: true
      })
      const code = data.code
      if (code === 2) {
        this.$toast.add({
          severity: "success",
          summary: "success",
          detail: data.message,
          life: 3000
        })
      } else if (code === 0) {
        this.$toast.add({
          severity: "null",
          summary: "null",
          detail: data.message,
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "failure",
          summary: "failure",
          detail: data.message,
          life: 3000
        })
      }
      this.createProductDialog = false
      this.product = {}
      this.getProduct()
    },
    async updateProduct() {
      this.submitted = true
      const data = await ylRequest.request({
        url: "/emt/updateOne",
        method: "POST",
        data: this.product,
        withCredentials: true
      })
      const code = data.code
      if (code === 2) {
        this.$toast.add({
          severity: "success",
          summary: "success",
          detail: data.message,
          life: 3000
        })
      } else if (code === 0) {
        this.$toast.add({
          severity: "null",
          summary: "null",
          detail: data.message,
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "failure",
          summary: "failure",
          detail: data.message,
          life: 3000
        })
      }
      this.updateProductDialog = false
      this.product = {}
      this.getProduct()
    },
    async deleteProduct() {
      const data = await ylRequest.request({
        url: "/emt/deleteOne",
        method: "DELETE",
        params: {
          emtId: this.product.emtId
        },
        withCredentials: true
      })
      const code = data.code
      if (code === 2) {
        this.$toast.add({
          severity: "success",
          summary: "success",
          detail: data.message,
          life: 3000
        })
      } else if (code === 0) {
        this.$toast.add({
          severity: "null",
          summary: "null",
          detail: data.message,
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "failure",
          summary: "failure",
          detail: data.message,
          life: 3000
        })
      }
      this.deleteProductDialog = false
      this.product = {}
      this.getProduct()
    },
    async deleteSelectedProducts() {
      const emtIds = []
      for (var i = 0; i < this.selectedProducts.length; i++) {
        emtIds.push(this.selectedProducts[i].emtId)
      }
      const data = await ylRequest.request({
        url: "/emt/deleteMany",
        method: "DELETE",
        data: emtIds,
        withCredentials: true
      })
      const code = data.code
      if (code === 2) {
        this.$toast.add({
          severity: "success",
          summary: "success",
          detail: data.message,
          life: 3000
        })
      } else if (code === 0) {
        this.$toast.add({
          severity: "null",
          summary: "null",
          detail: data.message,
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "failure",
          summary: "failure",
          detail: data.message,
          life: 3000
        })
      }
      this.deleteProductsDialog = false
      this.selectedProducts = null
      this.getProduct()
    },
    confirmDeleteProduct(product) {
      this.product = product
      this.deleteProductDialog = true
    },
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true
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

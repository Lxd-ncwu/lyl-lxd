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
              <h5 class="m-0">物资打包方式定义</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="查找" />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="empNo"
            header="编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">编号</span>
              {{ slotProps.data.empNo }}
            </template>
          </Column>
          <Column
            field="empNumber"
            header="一包N项"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">一包N项</span>
              {{ slotProps.data.empNumber }}
            </template>
          </Column>
          <Column
            field="empVolume"
            header="打包后体积"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">打包后体积</span>
              {{ slotProps.data.empVolume }}
            </template>
          </Column>
          <Column
            field="empWeight"
            header="打包后重量"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">打包后重量</span>
              {{ slotProps.data.empWeight }}
            </template>
          </Column>
          <Column
            field="empTimeValue"
            header="创建时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">创建时间</span>
              {{ slotProps.data.empTimeValue }}
            </template>
          </Column>
          <Column
            field="empTs"
            header="修改时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">修改时间</span>
              {{ slotProps.data.empTs }}
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
          header="新建物资打包方式"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="empNo">编号</label>
            <InputText
              id="empNo"
              v-model.trim="product.empNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.empNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="empNumber">打包方式：一包N项</label>
            <InputText
              id="empNumber"
              v-model.trim="product.empNumber"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empNumber }"
            />
            <small class="p-invalid" v-if="submitted && !product.empNumber">打包方式不能为空</small>
          </div>
          <div class="field">
            <label for="empVolume">打包后体积</label>
            <InputText
              id="empVolume"
              v-model.trim="product.empVolume"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empVolume }"
            />
            <small class="p-invalid" v-if="submitted && !product.empVolume"
              >打包后体积不能为空</small
            >
          </div>
          <div class="field">
            <label for="empWeight">打包后重量</label>
            <InputText
              id="empWeight"
              v-model.trim="product.empWeight"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empWeight }"
            />
            <small class="p-invalid" v-if="submitted && !product.empWeight"
              >打包后重量不能为空</small
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
            <label for="empNo">编号</label>
            <InputText
              id="empNo"
              v-model.trim="product.empNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.empNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="empNumber">打包方式：一包N项</label>
            <InputText
              id="empNumber"
              v-model.trim="product.empNumber"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empNumber }"
            />
            <small class="p-invalid" v-if="submitted && !product.empNumber">打包方式不能为空</small>
          </div>
          <div class="field">
            <label for="empVolume">打包后体积</label>
            <InputText
              id="empVolume"
              v-model.trim="product.empVolume"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empVolume }"
            />
            <small class="p-invalid" v-if="submitted && !product.empVolume"
              >打包后体积不能为空</small
            >
          </div>
          <div class="field">
            <label for="empWeight">打包后重量</label>
            <InputText
              id="empWeight"
              v-model.trim="product.empWeight"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.empWeight }"
            />
            <small class="p-invalid" v-if="submitted && !product.empWeight"
              >打包后重量不能为空</small
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
              您确定要删除这一项吗？ <b>{{ product.empNo }}</b>
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
  name: "MaterialPackStyle",
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
        url: "/emp/selectAll",
        method: "GET",
        withCredentials: true
      })
      this.products = datas.data
    },
    async addProduct() {
      this.submitted = true
      const data = await ylRequest.request({
        url: "/emp/insertNewOne",
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
        url: "/emp/updateOne",
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
        url: "/emp/deleteOne",
        method: "DELETE",
        params: {
          empId: this.product.empId
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
      const empIds = []
      for (var i = 0; i < this.selectedProducts.length; i++) {
        empIds.push(this.selectedProducts[i].empId)
      }
      const data = await ylRequest.request({
        url: "/emp/deleteMany",
        method: "DELETE",
        data: empIds,
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

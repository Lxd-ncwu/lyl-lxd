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
              <h5 class="m-0">物资属性定义</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="查找" />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="emaNo"
            header="编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">编号</span>
              {{ slotProps.data.emaNo }}
            </template>
          </Column>
          <Column
            field="emaName"
            header="品名"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">品名</span>
              {{ slotProps.data.emaName }}
            </template>
          </Column>
          <Column
            field="emaSpecifications"
            header="规格"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">规格</span>
              {{ slotProps.data.emaSpecifications }}
            </template>
          </Column>
          <Column
            field="emaProducer"
            header="生产商"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">生产商</span>
              {{ slotProps.data.emaProducer }}
            </template>
          </Column>
          <Column
            field="emaSupplier"
            header="提供者"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">提供者</span>
              {{ slotProps.data.emaSupplier }}
            </template>
          </Column>
          <Column
            field="emaDateProduct"
            header="生产日期"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">生产日期</span>
              {{ formatDate(slotProps.data.emaDateProduct) }}
            </template>
          </Column>
          <Column
            field="emaShelfLife"
            header="保质期"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">保质期</span>
              {{ slotProps.data.emaShelfLife }}
            </template>
          </Column>
          <Column
            field="emaMaintenanceCycle"
            header="保养周期"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">保养周期</span>
              {{ slotProps.data.emaMaintenanceCycle }}
            </template>
          </Column>
          <Column
            field="emaIsReusable"
            header="是否可循环利用"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">是否可循环利用</span>
              {{ slotProps.data.emaIsReusable }}
            </template>
          </Column>
          <Column
            field="emaTimeValue"
            header="创建时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">创建时间</span>
              {{ slotProps.data.emaTimeValue }}
            </template>
          </Column>
          <Column
            field="emaTs"
            header="修改时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">修改时间</span>
              {{ slotProps.data.emaTs }}
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
          header="新建物资属性"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="emaNo">编号</label>
            <InputText
              id="emaNo"
              v-model.trim="product.emaNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="emaName">品名</label>
            <InputText
              id="emaName"
              v-model.trim="product.emaName"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaName }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaName">品名</small>
          </div>
          <div class="field">
            <label for="emaSpecifications">规格</label>
            <InputText
              id="emaSpecifications"
              v-model.trim="product.emaSpecifications"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaSpecifications }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaSpecifications"
              >规格不能为空</small
            >
          </div>
          <div class="field">
            <label for="emaProducer">生产商</label>
            <InputText
              id="emaProducer"
              v-model.trim="product.emaProducer"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaProducer }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaProducer">生产商不能为空</small>
          </div>
          <div class="field">
            <label for="emaSupplier">提供者</label>
            <InputText
              id="emaSupplier"
              v-model.trim="product.emaSupplier"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaSupplier }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaSupplier">提供者不能为空</small>
          </div>
          <div class="field">
            <label for="emaDateProduct">生产日期</label>
            <Calendar
              id="emaDateProduct"
              v-model="product.emaDateProduct"
              required="true"
              class="p-invalid"
              :showIcon="true"
            />
          </div>
          <div class="field">
            <label for="emaShelfLife">保质期</label>
            <Listbox
              id="emaShelfLife"
              v-model="product.emaShelfLife"
              :options="emaShelfLifes"
              :filter="true"
            />
          </div>
          <div class="field">
            <label for="emaMaintenanceCycle">保养周期</label>
            <Listbox
              id="emaMaintenanceCycle"
              v-model="product.emaMaintenanceCycle"
              :options="emaMaintenanceCycles"
              :filter="true"
            />
          </div>
          <div class="field">
            <label for="emaIsReusable" class="mb-3">是否可循环利用</label>
            <Dropdown
              id="emaIsReusable"
              v-model="product.emaIsReusable"
              :options="emaIsReusables"
              placeholder="是否可循环利用"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.value">{{
                    slotProps.value.label
                  }}</span>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                    slotProps.value
                  }}</span>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
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
            <label for="emaNo">编号</label>
            <InputText
              id="emaNo"
              v-model.trim="product.emaNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="emaName">品名</label>
            <InputText
              id="emaName"
              v-model.trim="product.emaName"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaName }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaName">品名</small>
          </div>
          <div class="field">
            <label for="emaSpecifications">规格</label>
            <InputText
              id="emaSpecifications"
              v-model.trim="product.emaSpecifications"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaSpecifications }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaSpecifications"
              >规格不能为空</small
            >
          </div>
          <div class="field">
            <label for="emaProducer">生产商</label>
            <InputText
              id="emaProducer"
              v-model.trim="product.emaProducer"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaProducer }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaProducer">生产商不能为空</small>
          </div>
          <div class="field">
            <label for="emaSupplier">提供者</label>
            <InputText
              id="emaSupplier"
              v-model.trim="product.emaSupplier"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emaSupplier }"
            />
            <small class="p-invalid" v-if="submitted && !product.emaSupplier">提供者不能为空</small>
          </div>
          <div class="field">
            <label for="emaDateProduct">生产日期</label>
            <Calendar
              id="emaDateProduct"
              v-model="product.emaDateProduct"
              required="true"
              class="p-invalid"
              :showIcon="true"
            />
          </div>
          <div class="field">
            <label for="emaShelfLife">保质期</label>
            <Listbox
              id="emaShelfLife"
              v-model="product.emaShelfLife"
              :options="emaShelfLifes"
              :filter="true"
            />
          </div>
          <div class="field">
            <label for="emaMaintenanceCycle">保养周期</label>
            <Listbox
              id="emaMaintenanceCycle"
              v-model="product.emaMaintenanceCycle"
              :options="emaMaintenanceCycles"
              :filter="true"
            />
          </div>
          <div class="field">
            <label for="emaIsReusable" class="mb-3">是否可循环利用</label>
            <Dropdown
              id="emaIsReusable"
              v-model="product.emaIsReusable"
              :options="emaIsReusables"
              placeholder="是否可循环利用"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.value">{{
                    slotProps.value.label
                  }}</span>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                    slotProps.value
                  }}</span>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
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
              您确定要删除这一项吗？ <b>{{ product.emaNo }}</b>
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
      submitted: false,
      emaShelfLifes: ["一个月", "三个月", "六个月", "十二个月", "十八个月", "二十四个月"],
      emaMaintenanceCycles: ["一个月", "三个月", "六个月", "十二个月", "十八个月", "二十四个月"],
      emaIsReusables: ["是", "否"]
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
        url: "/ema/selectAll",
        method: "GET",
        withCredentials: true
      })
      this.products = datas.data
    },
    async addProduct() {
      this.submitted = true
      const data = await ylRequest.request({
        url: "/ema/insertNewOne",
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
        url: "/ema/updateOne",
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
        url: "/ema/deleteOne",
        method: "DELETE",
        params: {
          emaId: this.product.emaId
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
      const emaIds = []
      for (var i = 0; i < this.selectedProducts.length; i++) {
        emaIds.push(this.selectedProducts[i].emaId)
      }
      const data = await ylRequest.request({
        url: "/ema/deleteMany",
        method: "DELETE",
        data: emaIds,
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
    },
    formatDate(value) {
      return value.toLocaleDateString("zh-CN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/demo/badges.scss";
</style>

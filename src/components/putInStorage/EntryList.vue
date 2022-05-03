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
              <h5 class="m-0">物资库管理</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="查找" />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="esNo"
            header="编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">编号</span>
              {{ slotProps.data.esNo }}
            </template>
          </Column>
          <Column
            field="esLocation"
            header="位置"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">位置</span>
              {{ slotProps.data.esLocation }}
            </template>
          </Column>
          <Column
            field="esTypeName"
            header="类别"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">类别</span>
              {{ slotProps.data.esTypeName }}
            </template>
          </Column>
          <Column
            field="esIntroduce"
            header="简介"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">简介</span>
              {{ slotProps.data.esIntroduce }}
            </template>
          </Column>
          <Column
            field="esStoreroomNumber"
            header="实体库数量"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">实体库数量</span>
              {{ slotProps.data.esStoreroomNumber }}
            </template>
          </Column>
          <Column
            field="esOutSpaceNumber"
            header="库外区数量"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">库外区数量</span>
              {{ slotProps.data.esOutSpaceNumber }}
            </template>
          </Column>
          <Column
            field="esStatusName"
            header="状态"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">状态</span>
              {{ slotProps.data.esStatusName }}
            </template>
          </Column>
          <Column
            field="esTimeValue"
            header="创建时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">创建时间</span>
              {{ slotProps.data.esTimeValue }}
            </template>
          </Column>
          <Column
            field="esTs"
            header="修改时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">修改时间</span>
              {{ slotProps.data.esTs }}
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
          header="新建物资库"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="esNo">编号</label>
            <InputText
              id="esNo"
              v-model.trim="product.esNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.esNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.esNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="esLocation">位置</label>
            <InputText
              id="esLocation"
              v-model.trim="product.esLocation"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.esLocation }"
            />
            <small class="p-invalid" v-if="submitted && !product.esLocation">位置不能为空</small>
          </div>

          <div class="field">
            <label for="esTypeName" class="mb-3">类别</label>
            <Dropdown
              id="esTypeName"
              v-model="product.esTypeName"
              :options="types"
              placeholder="请选择类别"
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

          <div class="field">
            <label for="esIntroduce">简介</label>
            <Textarea
              id="esIntroduce"
              v-model="product.esIntroduce"
              required="true"
              rows="3"
              cols="20"
            />
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
            <label for="esNo">编号</label>
            <InputText
              id="esNo"
              v-model.trim="product.esNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.esNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.esNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="esLocation">位置</label>
            <InputText
              id="esLocation"
              v-model.trim="product.esLocation"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.esLocation }"
            />
            <small class="p-invalid" v-if="submitted && !product.esLocation">编号不能为空</small>
          </div>
          <div class="field">
            <label for="esTypeName" class="mb-3">类别</label>
            <Dropdown
              id="esTypeName"
              v-model="product.esTypeName"
              :options="types"
              placeholder="请选择类别"
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

          <div class="field">
            <label for="esIntroduce">简介</label>
            <Textarea
              id="esIntroduce"
              v-model="product.esIntroduce"
              required="true"
              rows="3"
              cols="20"
            />
          </div>

          <div class="field">
            <label for="esStatusName" class="mb-3">状态</label>
            <Dropdown
              id="esStatusName"
              v-model="product.esStatusName"
              :options="statuses"
              placeholder="请选择状态"
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
              您确定要删除这一项吗？ <b>{{ product.esNo }}</b>
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
  name: "EsManage",
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
      types: ["中央存储库", "省级存储库", "市级存储库", "县级存储库", "乡级存储库"],
      statuses: ["闲置仓库", "使用中的仓库", "废弃仓库"]
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
        url: "/es/selectAll",
        method: "GET",
        withCredentials: true
      })
      this.products = datas.data
    },
    async addProduct() {
      this.submitted = true
      const data = await ylRequest.request({
        url: "/es/insertNewOne",
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
        url: "/es/updateOne",
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
        url: "/es/deleteOne",
        method: "DELETE",
        params: {
          esId: this.product.esId
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
      const esIds = []
      for (var i = 0; i < this.selectedProducts.length; i++) {
        esIds.push(this.selectedProducts[i].esId)
      }
      const data = await ylRequest.request({
        url: "/es/deleteMany",
        method: "DELETE",
        data: esIds,
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

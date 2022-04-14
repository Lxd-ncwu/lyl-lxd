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
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">总库定义</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="code"
            header="编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.code }}
            </template>
          </Column>
          <Column
            field="name"
            header="位置"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="price"
            header="类别"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column
            field="category"
            header="物资库数量"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              {{ formatCurrency(slotProps.data.category) }}
            </template>
          </Column>
          <Column
            field="rating"
            header="库外区数量"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ formatCurrency(slotProps.data.category) }}
            </template>
          </Column>
          <Column
            field="rating"
            header="简介"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              {{ formatCurrency(slotProps.data.category) }}
            </template>
          </Column>
          <Column
            field="inventoryStatus"
            header="状态"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Status</span>
              <span
                :class="
                  'product-badge status-' +
                  (slotProps.data.inventoryStatus
                    ? slotProps.data.inventoryStatus.toLowerCase()
                    : '')
                "
                >{{ slotProps.data.inventoryStatus }}</span
              >
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
          header="新建仓库"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="code">编号</label>
            <InputText
              id="code"
              v-model.trim="product.code"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.code }"
            />
            <small class="p-invalid" v-if="submitted && !product.name">编号不能为空</small>
          </div>
          <div class="field">
            <label for="code">位置</label>
            <InputText
              id="location"
              v-model.trim="product.code"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.code }"
            />
            <small class="p-invalid" v-if="submitted && !product.name">编号不能为空</small>
          </div>
          <div class="field">
            <label for="code">类别</label>
            <InputText
              id="category"
              v-model.trim="product.code"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.code }"
            />
            <small class="p-invalid" v-if="submitted && !product.name">编号不能为空</small>
          </div>
          <div class="field">
            <label for="description">Description</label>
            <Textarea
              id="description"
              v-model="product.description"
              required="true"
              rows="3"
              cols="20"
            />
          </div>

          <div class="field">
            <label for="inventoryStatus" class="mb-3">Inventory Status</label>
            <Dropdown
              id="inventoryStatus"
              v-model="product.inventoryStatus"
              :options="statuses"
              optionLabel="label"
              placeholder="Select a Status"
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
            <label class="mb-3">Category</label>
            <div class="formgrid grid">
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category1"
                  name="category"
                  value="Accessories"
                  v-model="product.category"
                />
                <label for="category1">Accessories</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category2"
                  name="category"
                  value="Clothing"
                  v-model="product.category"
                />
                <label for="category2">Clothing</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category3"
                  name="category"
                  value="Electronics"
                  v-model="product.category"
                />
                <label for="category3">Electronics</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category4"
                  name="category"
                  value="Fitness"
                  v-model="product.category"
                />
                <label for="category4">Fitness</label>
              </div>
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col">
              <label for="price">Price</label>
              <InputNumber
                id="price"
                v-model="product.price"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
            <div class="field col">
              <label for="quantity">Quantity</label>
              <InputNumber id="quantity" v-model="product.quantity" integeronly />
            </div>
          </div>
          <template #footer>
            <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="保存" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
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
            <label for="code">编号</label>
            <InputText
              id="code"
              v-model.trim="product.code"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.code }"
            />
            <small class="p-invalid" v-if="submitted && !product.name">编号不能为空</small>
          </div>
          <div class="field">
            <label for="code">位置</label>
            <InputText
              id="location"
              v-model.trim="product.code"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.code }"
            />
            <small class="p-invalid" v-if="submitted && !product.name">编号不能为空</small>
          </div>
          <div class="field">
            <label for="code">类别</label>
            <InputText
              id="category"
              v-model.trim="product.code"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.code }"
            />
            <small class="p-invalid" v-if="submitted && !product.name">编号不能为空</small>
          </div>
          <div class="field">
            <label for="description">Description</label>
            <Textarea
              id="description"
              v-model="product.description"
              required="true"
              rows="3"
              cols="20"
            />
          </div>

          <div class="field">
            <label for="inventoryStatus" class="mb-3">Inventory Status</label>
            <Dropdown
              id="inventoryStatus"
              v-model="product.inventoryStatus"
              :options="statuses"
              optionLabel="label"
              placeholder="Select a Status"
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
            <label class="mb-3">Category</label>
            <div class="formgrid grid">
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category1"
                  name="category"
                  value="Accessories"
                  v-model="product.category"
                />
                <label for="category1">Accessories</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category2"
                  name="category"
                  value="Clothing"
                  v-model="product.category"
                />
                <label for="category2">Clothing</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category3"
                  name="category"
                  value="Electronics"
                  v-model="product.category"
                />
                <label for="category3">Electronics</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="category4"
                  name="category"
                  value="Fitness"
                  v-model="product.category"
                />
                <label for="category4">Fitness</label>
              </div>
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col">
              <label for="price">Price</label>
              <InputNumber
                id="price"
                v-model="product.price"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
            <div class="field col">
              <label for="quantity">Quantity</label>
              <InputNumber id="quantity" v-model="product.quantity" integeronly />
            </div>
          </div>
          <template #footer>
            <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="保存" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">
              您确定要删除这一项吗？ <b>{{ product.name }}</b
              >?</span
            >
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductDialog = false"
            />
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductsDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product"> 您确定要删除所选项吗？ </span>
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteProductsDialog = false"
            />
            <Button
              label="Yes"
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
import ProductService from "../../service/ProductService"

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
      statuses: [
        { label: "INSTOCK", value: "instock" },
        { label: "LOWSTOCK", value: "lowstock" },
        { label: "OUTOFSTOCK", value: "outofstock" }
      ]
    }
  },
  productService: null,
  created() {
    this.productService = new ProductService()
    this.initFilters()
  },
  mounted() {
    this.productService.getProducts().then((data) => (this.products = data))
  },
  methods: {
    formatCurrency(value) {
      if (value) return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
      return
    },
    hideDialog() {
      this.productDialog = false
      this.submitted = false
    },
    saveProduct() {
      this.submitted = true
      if (this.product.name.trim()) {
        if (this.product.id) {
          this.product.inventoryStatus = this.product.inventoryStatus.value
            ? this.product.inventoryStatus.value
            : this.product.inventoryStatus
          this.products[this.findIndexById(this.product.id)] = this.product
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000
          })
        } else {
          this.product.id = this.createId()
          this.product.code = this.createId()
          this.product.image = "product-placeholder.svg"
          this.product.inventoryStatus = this.product.inventoryStatus
            ? this.product.inventoryStatus.value
            : "INSTOCK"
          this.products.push(this.product)
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Created",
            life: 3000
          })
        }
        this.productDialog = false
        this.product = {}
      }
    },
    editProduct(product) {
      this.product = { ...product }
      this.updateProductDialog = true
    },
    confirmDeleteProduct(product) {
      this.product = product
      this.deleteProductDialog = true
    },
    deleteProduct() {
      this.products = this.products.filter((val) => val.id !== this.product.id)
      this.deleteProductDialog = false
      this.product = {}
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000
      })
    },
    findIndexById(id) {
      let index = -1
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          index = i
          break
        }
      }
      return index
    },
    createId() {
      let id = ""
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return id
    },
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true
    },
    deleteSelectedProducts() {
      this.products = this.products.filter((val) => !this.selectedProducts.includes(val))
      this.deleteProductsDialog = false
      this.selectedProducts = null
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Products Deleted",
        life: 3000
      })
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

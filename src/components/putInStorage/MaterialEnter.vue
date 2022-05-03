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
              <h5 class="m-0">物资入库</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="查找" />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
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
            field="emtNo"
            header="物资类型"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">物资类型</span>
              {{ slotProps.data.emtNo }}
            </template>
          </Column>
          <Column
            field="empNo"
            header="打包方式"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">打包方式</span>
              {{ slotProps.data.empNo }}
            </template>
          </Column>
          <Column
            field="emaNo"
            header="属性"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">属性</span>
              {{ slotProps.data.emaNo }}
            </template>
          </Column>
          <Column
            field="emeType"
            header="入库方式"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">入库方式</span>
              {{ slotProps.data.emeType }}
            </template>
          </Column>
          <Column
            field="esNo"
            header="物资库编号"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">物资库编号</span>
              {{ slotProps.data.esNo }}
            </template>
          </Column>
          <Column
            field="essNo"
            header="仓库编号"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">仓库编号</span>
              {{ slotProps.data.essNo }}
            </template>
          </Column>
          <Column
            field="esssNo"
            header="库区编号"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">库区编号</span>
              {{ slotProps.data.esssNo }}
            </template>
          </Column>
          <Column
            field="essssNo"
            header="货架编号"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">货架编号</span>
              {{ slotProps.data.essssNo }}
            </template>
          </Column>
          <Column
            field="emePriceUnit"
            header="单价"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">单价</span>
              {{ formatCurrency(slotProps.data.emePriceUnit) }}
            </template>
          </Column>
          <Column
            field="emeNumberCount"
            header="数量"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">数量</span>
              {{ slotProps.data.emeNumberCount }}
            </template>
          </Column>
          <Column
            field="emePriceCount"
            header="总价"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">总价</span>
              {{ formatCurrency(slotProps.data.emePriceCount) }}
            </template>
          </Column>
          <Column
            field="emeTimeValue"
            header="创建时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">创建时间</span>
              {{ slotProps.data.emeTimeValue }}
            </template>
          </Column>
          <Column
            field="emeTs"
            header="修改时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">修改时间</span>
              {{ slotProps.data.emeTs }}
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
          header="物资入库"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="emeNo">编号</label>
            <InputText
              id="emeNo"
              v-model.trim="product.emeNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emeNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.emeNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="emaName" class="mb-3">品名</label>
            <Dropdown
              id="emaName"
              v-model="product.emaName"
              :options="emaName"
              placeholder="请选择品名"
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
            <label for="emtNo" class="mb-3">物资类型</label>
            <Dropdown
              id="emtNo"
              v-model="product.emtNo"
              :options="emtNo"
              placeholder="请选择物资类型"
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
            <label for="empNo" class="mb-3">打包方式</label>
            <Dropdown
              id="empNo"
              v-model="product.empNo"
              :options="empNo"
              placeholder="请选择打包方式"
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
            <label for="emaNo" class="mb-3">属性</label>
            <Dropdown id="emaNo" v-model="product.emaNo" :options="emaNo" placeholder="请选择属性">
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
            <label for="emeType">入库方式</label>
            <InputText
              id="emeType"
              v-model.trim="product.emeType"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emeType }"
            />
            <small class="p-invalid" v-if="submitted && !product.emeType">入库方式不能为空</small>
          </div>
          <div class="field">
            <label for="esNo" class="mb-3">物资库编号</label>
            <Dropdown id="esNo" v-model="product.esNo" :options="esNo" placeholder="物资库编号">
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
            <label for="essNo" class="mb-3">仓库编号</label>
            <Dropdown id="essNo" v-model="product.essNo" :options="essNo" placeholder="仓库编号">
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
            <label for="esssNo" class="mb-3">库区编号</label>
            <Dropdown id="esssNo" v-model="product.esssNo" :options="esssNo" placeholder="库区编号">
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
            <label for="essssNo" class="mb-3">货架编号</label>
            <Dropdown
              id="essssNo"
              v-model="product.essssNo"
              :options="essssNo"
              placeholder="货架编号"
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
            <label for="emePriceUnit">单价</label>
            <InputText
              id="emePriceUnit"
              v-model.trim="product.emePriceUnit"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emePriceUnit }"
            />
            <small class="p-invalid" v-if="submitted && !product.emePriceUnit">单价不能为空</small>
          </div>
          <div class="field">
            <label for="emeNumberCount">数量</label>
            <InputText
              id="emeNumberCount"
              v-model.trim="product.emeNumberCount"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emeNumberCount }"
            />
            <small class="p-invalid" v-if="submitted && !product.emeNumberCount"
              >数量不能为空</small
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
          header="物资入库信息修改"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="emeNo">编号</label>
            <InputText
              id="emeNo"
              v-model.trim="product.emeNo"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emeNo }"
            />
            <small class="p-invalid" v-if="submitted && !product.emeNo">编号不能为空</small>
          </div>
          <div class="field">
            <label for="emaName" class="mb-3">品名</label>
            <Dropdown
              id="emaName"
              v-model="product.emaName"
              :options="emaName"
              placeholder="请选择品名"
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
            <label for="emtNo" class="mb-3">物资类型</label>
            <Dropdown
              id="emtNo"
              v-model="product.emtNo"
              :options="emtNo"
              placeholder="请选择物资类型"
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
            <label for="empNo" class="mb-3">打包方式</label>
            <Dropdown
              id="empNo"
              v-model="product.empNo"
              :options="empNo"
              placeholder="请选择打包方式"
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
            <label for="emaNo" class="mb-3">属性</label>
            <Dropdown id="emaNo" v-model="product.emaNo" :options="emaNo" placeholder="请选择属性">
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
            <label for="emeType">入库方式</label>
            <InputText
              id="emeType"
              v-model.trim="product.emeType"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emeType }"
            />
            <small class="p-invalid" v-if="submitted && !product.emeType">入库方式不能为空</small>
          </div>
          <div class="field">
            <label for="esNo" class="mb-3">物资库编号</label>
            <Dropdown id="esNo" v-model="product.esNo" :options="esNo" placeholder="物资库编号">
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
            <label for="essNo" class="mb-3">仓库编号</label>
            <Dropdown id="essNo" v-model="product.essNo" :options="essNo" placeholder="仓库编号">
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
            <label for="esssNo" class="mb-3">库区编号</label>
            <Dropdown id="esssNo" v-model="product.esssNo" :options="esssNo" placeholder="库区编号">
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
            <label for="essssNo" class="mb-3">货架编号</label>
            <Dropdown
              id="essssNo"
              v-model="product.essssNo"
              :options="essssNo"
              placeholder="货架编号"
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
            <label for="emePriceUnit">单价</label>
            <InputText
              id="emePriceUnit"
              v-model.trim="product.emePriceUnit"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emePriceUnit }"
            />
            <small class="p-invalid" v-if="submitted && !product.emePriceUnit">单价不能为空</small>
          </div>
          <div class="field">
            <label for="emeNumberCount">数量</label>
            <InputText
              id="emeNumberCount"
              v-model.trim="product.emeNumberCount"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !product.emeNumberCount }"
            />
            <small class="p-invalid" v-if="submitted && !product.emeNumberCount"
              >数量不能为空</small
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
              您确定要删除这一项吗？ <b>{{ product.emeNo }}</b>
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
  name: "MaterialEnter",
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
      emaName: [],
      emtNo: [],
      empNo: [],
      emaNo: [],
      esNo: [],
      essNo: [],
      esssNo: [],
      essssNo: []
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
      this.getAllNeedInfo()
      this.product = {}
      this.submitted = false
      this.createProductDialog = true
    },
    editProduct(product) {
      this.getAllNeedInfo()
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
    async getAllNeedInfo() {
      const info = await ylRequest.request({
        url: "/eme/getAllNeedInfo",
        method: "GET",
        withCredentials: true
      })
      this.emaName = info.emaNames
      this.emtNo = info.emtNos
      this.empNo = info.empNos
      this.emaNo = info.emaNos
      this.esNo = info.esNos
      this.essNo = info.essNos
      this.esssNo = info.esssNos
      this.essssNo = info.essssNos
    },
    async getProduct() {
      const datas = await ylRequest.request({
        url: "/eme/selectAll",
        method: "GET",
        withCredentials: true
      })
      this.products = datas.data
    },
    async addProduct() {
      this.submitted = true
      const data = await ylRequest.request({
        url: "/eme/insertNewOne",
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
        url: "/eme/updateOne",
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
        url: "/eme/deleteOne",
        method: "DELETE",
        params: {
          emeId: this.product.emeId
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
      const emeIds = []
      for (var i = 0; i < this.selectedProducts.length; i++) {
        emeIds.push(this.selectedProducts[i].emeId)
      }
      const data = await ylRequest.request({
        url: "/eme/deleteMany",
        method: "DELETE",
        data: emeIds,
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
    formatCurrency(value) {
      return value.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/demo/badges.scss";
</style>

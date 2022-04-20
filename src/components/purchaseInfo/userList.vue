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
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <Button
                label="新建"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew"
              />
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
            field="name"
            header="姓名"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="phone"
            header="联系方式"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.phone }}
            </template>
          </Column>
          <Column
            field="role"
            header="用户权限"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ slotProps.data.role == 0 ? "管理员" : "采购人员" }}
            </template>
          </Column>
          <Column
            field="registerDate"
            header="注册时间"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              {{ slotProps.data.registerDate }}
            </template>
          </Column>
          <Column headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="openUpdate(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mt-2"
                @click="deleteUser(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="addUser"
          :style="{ width: '450px' }"
          header="添加用户"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="name">姓名</label>
            <InputText
              id="name"
              v-model.trim="user.name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.name }"
            />
            <small class="p-invalid" v-if="submitted && !user.name">请输入姓名</small>
          </div>
          <div class="field">
            <label for="phone">联系方式</label>
            <InputText id="phone" v-model="user.phone" required="true" rows="3" cols="20" />
          </div>
          <div class="field">
            <label for="role">用户权限</label>
            <InputText
              id="role"
              v-model="user.role"
              required="true"
              rows="3"
              cols="20"
              value="采购人员"
              modelValue="1"
              readonly="readonly"
            />
          </div>
          <div class="field">
            <label for="password">初始密码</label>
            <InputText id="password" v-model="user.password" required="true" rows="3" cols="20" />
          </div>
          <template #footer>
            <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="保存" icon="pi pi-check" class="p-button-text" @click="saveUser" />
          </template>
        </Dialog>
        <Dialog
          v-model:visible="updateUser"
          :style="{ width: '450px' }"
          header="修改用户信息"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="name">姓名</label>
            <InputText
              id="name"
              v-model.trim="upUser.name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.name }"
            />
            <small class="p-invalid" v-if="submitted && !epUser.name">请输入姓名</small>
          </div>
          <div class="field">
            <label for="phone">联系方式</label>
            <InputText id="phone" v-model="upUser.phone" required="true" rows="3" cols="20" />
          </div>
          <div>
            <Button
              label="重置用户密码"
              class="p-button-outlined mr-2 mb-2"
              @click="reSetPassword(upUser.id)"
            />
          </div>
          <template #footer>
            <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="保存" icon="pi pi-check" class="p-button-text" @click="updateUserInfo" />
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
      addUser: false,
      products: null,
      user: {},
      filters: {},
      submitted: false,
      storage: [],
      updateUser: false,
      upUser: {}
    }
  },
  productService: null,
  created() {
    this.productService = new ProductService()
    this.initFilters()
  },
  async mounted() {
    const data = await ylRequest.request({
      url: "/user/getList",
      method: "GET",
      withCredentials: true
    })
    this.storage = data.data
    console.log(data)
  },
  methods: {
    checkPhone(phone) {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!reg.test(phone)) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "请输入正确的手机号",
          life: 3000
        })
        return false
      }
      return true
    },
    //导出为excel
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    openNew() {
      this.user = {
        password: "123456",
        role: 1
      }
      this.submitted = false
      this.addUser = true
    },
    openUpdate(data) {
      if (data.role === 0) {
        this.updateUser = false
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "没有权限操作此用户",
          life: 3000
        })
        return
      }
      this.upUser = {
        name: data.name,
        phone: data.phone,
        id: data.id
      }
      this.updateUser = true
      this.submitted = false
    },
    hideDialog() {
      this.addUser = false
      this.submitted = false
    },
    async flush() {
      const data = await ylRequest.request({
        url: "/user/getList",
        method: "GET",
        withCredentials: true
      })
      this.storage = data.data
    },
    async saveUser() {
      if (this.checkPhone(this.user.phone) === false) {
        return
      }
      const data = await ylRequest.request({
        url: "/user/do_register",
        method: "POST",
        data: this.user,
        withCredentials: true
      })
      const code = data.code
      if (code === 0) {
        this.addUser = false
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "添加用户成功",
          life: 3000
        })
        this.flush()
      } else {
        alert(data.msg)
      }
    },
    async deleteUser(id) {
      const data = await ylRequest.request({
        url: "/user/deleteUser/" + id,
        method: "POST",
        withCredentials: true
      })
      const code = data.code
      if (code === 0) {
        this.updateUser = false
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "删除用户成功",
          life: 3000
        })
        this.flush()
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "warn",
          detail: data.msg,
          life: 3000
        })
      }
    },
    async updateUserInfo() {
      const data = await ylRequest.request({
        url: "/user/updateUser",
        method: "POST",
        withCredentials: true,
        data: this.upUser
      })
      const code = data.code
      if (code === 0) {
        this.updateUser = false
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "修改用户信息成功",
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "warn",
          detail: data.msg,
          life: 3000
        })
      }
    },
    async reSetPassword(id) {
      const data = await ylRequest.request({
        url: "/user/reSetPassword/" + id,
        method: "POST",
        withCredentials: true
      })
      const code = data.code
      if (code === 0) {
        this.updateUser = false
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "重置密码成功",
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "warn",
          detail: data.msg,
          life: 3000
        })
      }
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

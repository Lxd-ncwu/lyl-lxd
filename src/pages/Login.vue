<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <Toast />
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));
          "
        >
          <div class="text-center mb-5">
            <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3" />
            <div class="text-900 text-3xl font-medium mb-3">应急物资管理系统</div>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <InputText
              id="email"
              v-model="email"
              type="text"
              class="w-full mb-3"
              placeholder="邮箱"
              style="padding: 1rem"
            />
            <Button label="获取验证码" class="w-full p-3 text-xl" @click="createCode"></Button>
            <InputText
              id="verifyCode"
              v-model="verifyCode"
              placeholder="验证码"
              type="text"
              class="w-full mb-3"
              style="padding: 1rem"
            ></InputText>
            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox id="rememberme" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                <label for="rememberme">记住我</label>
              </div>
            </div>
            <Button label="登录" class="w-full p-3 text-xl" @click="login"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ylRequest from "@/service"
import Toast from "primevue/toast"
export default {
  data() {
    return {
      phone: "",
      password: "",
      checked: false
    }
  },
  components: {
    Toast
  },
  async beforeRouteEnter(to, from) {
    const data = await ylRequest.request({
      url: "/login/checkToken",
      method: "GET",
      withCredentials: true
    })
    const code = data.code
    if (code === 2) {
      return "/index"
    }
  },
  computed: {
    logoColor() {
      if (this.$appState.darkTheme) return "white"
      return "dark"
    }
  },
  methods: {
    async createCode() {
      const data = await ylRequest.request({
        url: "/login/createCode",
        method: "GET",
        params: {
          email: this.email
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
    },
    async login() {
      const data = await ylRequest.request({
        url: "/login/login",
        method: "POST",
        data: {
          email: this.email,
          verifyCode: this.verifyCode
        },
        withCredentials: true
      })
      const code = data.code
      if (code === 2) {
        this.$router.push("/index")
      }
    }
  }
}
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>

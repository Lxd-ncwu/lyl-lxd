<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
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
              id="email1"
              v-model="phone"
              type="text"
              class="w-full mb-3"
              placeholder="手机号"
              style="padding: 1rem"
            />

            <Password
              id="password1"
              v-model="password"
              placeholder="密码"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
            ></Password>

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                <label for="rememberme1">记住我</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >忘记密码？</a
              >
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
export default {
  data() {
    return {
      phone: "",
      password: "",
      checked: false
    }
  },
  computed: {
    logoColor() {
      if (this.$appState.darkTheme) return "white"
      return "dark"
    }
  },
  methods: {
    async login() {
      const data = await ylRequest.request({
        url: "/login/do_login",
        method: "POST",
        data: {
          phone: this.phone,
          password: this.password
        }
      })
      const code = data.code
      // console.log(data)
      if (code === 0) {
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

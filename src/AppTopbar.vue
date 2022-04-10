<template>
  <div class="layout-topbar">

    <!-- 顶部的logo信息 -->
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()"/>
      <span>物资</span>
    </router-link>

    <!-- 顶部切换页面大小的按钮 -->
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>

    <!-- 这是什么按钮？ -->
    <button class="p-link layout-topbar-menu-button layout-topbar-button"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <!-- 顶部右侧的三个按钮 span中的描述也没有在页面上显示啊？-->
    <!-- 想办法在右上角用户头像那里 添加一个点击头像出现登出和修改密码的弹框 lxd-->
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>日历</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>设置中心</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>用户中心</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'AppTopbar',
  //方法加个备注？
  methods: {
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },
    onTopbarMenuToggle(event) {
      this.$emit('topbar-menu-toggle', event);
    },
    topbarImage() {
      return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
    }
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    }
  }
}
</script>
<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle"/>
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick"/>
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view/>
      </div>
      <AppFooter/>
    </div>

    <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange"/>
    <transition name="layout-mask">
      <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
    </transition>
  </div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';

export default {
  emits: ['change-theme'],
  data() {
    return {
      layoutMode: 'static',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      //侧边栏上的文字显示
      menu: [
        {
          label: '主页',
          items: [
            {
              label: '主页', icon: 'pi pi-fw pi-home', to: '/'
            }
          ]
        },
        {
          label: '菜单项效果', icon: 'pi pi-fw pi-search',
          items: [
            {
              label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                  ]
                },
                {
                  label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'},
                    {label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark'}
                  ]
                },
              ]
            },
            //入库构想
            {
              label: '入库管理', icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: '仓库管理', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: '总库定义', icon: 'pi pi-fw pi-bookmark', to: '/esManage'},
                    {label: '仓库定义', icon: 'pi pi-fw pi-bookmark', to: '/essManage'},
                    {label: '库区定义', icon: 'pi pi-fw pi-bookmark', to: '/esssManage'},
                    {label: '货架定义', icon: 'pi pi-fw pi-bookmark', to: '/essssManage'},
                  ]
                },
                {
                  label: '物资管理', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: '物资入库', icon: 'pi pi-fw pi-bookmark'},
                    {label: '入库详情', icon: 'pi pi-fw pi-bookmark'}
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '采购模块所需', icon: 'pi pi-fw pi-search',
          items: [
            { 
              label: '后台管理(仅管理员可见)', icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: '采购管理', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: '订单审核', icon: 'pi pi-fw pi-bookmark'},
                    {label: '订单查询', icon: 'pi pi-fw pi-bookmark'},
                  ]
                },
                {
                  label: '用户管理', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: '用户信息查询', icon: 'pi pi-fw pi-bookmark'},
                    {label: '添加用户', icon: 'pi pi-fw pi-bookmark'},
                  ]
                },
                {
                  label: '供应商管理', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: '添加供应商', icon: 'pi pi-fw pi-bookmark'},
                  ]
                },
              ]
            },
            { 
              label: '仓库信息', icon: 'pi pi-fw pi-bookmark',
              items: [
                {label: '逻辑库信息', icon: 'pi pi-fw pi-bookmark'},
                {label: '实体库信息', icon: 'pi pi-fw pi-bookmark'},
                {label: '分库区信息', icon: 'pi pi-fw pi-bookmark'},
              ]
            },
            { 
              label: '物资信息', icon: 'pi pi-fw pi-bookmark',
              items: [
                {label: '逻辑库物资', icon: 'pi pi-fw pi-bookmark'},
                {label: '实体库物资', icon: 'pi pi-fw pi-bookmark'},
                {label: '分库区物资', icon: 'pi pi-fw pi-bookmark'},
              ]
            },
            { 
              label: '物资采购', icon: 'pi pi-fw pi-bookmark',
              items: [
                {label: '生成采购订单', icon: 'pi pi-fw pi-bookmark'},
                {label: '采购订单查询', icon: 'pi pi-fw pi-bookmark'},
              ]
            },
            { 
              label: '其他信息', icon: 'pi pi-fw pi-bookmark',
              items: [
                {label: '供应商信息查询', icon: 'pi pi-fw pi-bookmark'},
              ]
            }
          ]
        },
        {
          label: '常用UI组件', icon: 'pi pi-fw pi-sitemap',
          items: [
            {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout'},
            {label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input'},
            {label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "/invalidstate"},
            {label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button'},
            {label: 'Table', icon: 'pi pi-fw pi-table', to: '/table'},
            {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart'},
          ]
        },
        {
          label: '常用页面', icon: 'pi pi-fw pi-clone',
          items: [
            {label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud'},
            {label: '登录页面', icon: 'pi pi-fw pi-sign-in', to: '/login'},
            {label: '500错误', icon: 'pi pi-fw pi-times-circle', to: '/error'},
            {label: '404路径错误', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
            {label: '403拒绝访问', icon: 'pi pi-fw pi-lock', to: '/access'},
          ]
        }
      ]
    }
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    }
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += ' ' + className;
    },
    removeClass(element, className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static')
          return !this.staticMenuInactive;
        else if (this.layoutMode === 'overlay')
          return this.overlayMenuActive;
      }

      return true;
    }
  },
  computed: {
    containerClass() {
      return ['layout-wrapper', {
        'layout-overlay': this.layoutMode === 'overlay',
        'layout-static': this.layoutMode === 'static',
        'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
        'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
        'layout-mobile-sidebar-active': this.mobileMenuActive,
        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
        'p-ripple-disabled': this.$primevue.config.ripple === false
      }];
    },
    logo() {
      return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
    }
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, 'body-overflow-hidden');
    else
      this.removeClass(document.body, 'body-overflow-hidden');
  },
  components: {
    'AppTopBar': AppTopBar,
    'AppMenu': AppMenu,
    'AppConfig': AppConfig,
    'AppFooter': AppFooter,
  }
}
</script>

<style lang="scss">
@import './App.scss';
</style>

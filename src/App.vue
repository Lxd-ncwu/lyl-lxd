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
          label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
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
            {
              label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                    {label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark'},
                  ]
                },
                {
                  label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                  items: [
                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                    {label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark'}
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'UI Components', icon: 'pi pi-fw pi-sitemap',
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
          label: 'Pages', icon: 'pi pi-fw pi-clone',
          items: [
            {label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud'},
            {label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login'},
            {label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error'},
            {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
            {label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access'},
            {label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty'},
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

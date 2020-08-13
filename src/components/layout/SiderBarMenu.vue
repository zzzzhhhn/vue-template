<template>
  <v-treeview
    class="side-bar-menu"
    :items="menuItems"
    :active="currentActive"
    :open="currentOpen"
    dense
    item-key="name"
    item-text="meta.label"
    activatable
    color="rgb(250, 180, 27)"
    open-on-click
    active-class="sider-bar-menu-active"
    transition
    expand-icon=" "
    search="a"
    @update:active="onActive"
    :filter="menuFilter"
  >
    <template #prepend="{ item }">
      <v-img
        v-if="item.children"
        width="16"
        src="@assets/img/menu-icon.png"
      ></v-img>
    </template>
    <template #append="{ item, open }">
      <v-icon
        v-if="item.children"
        class="transition"
        :class="{ rotate180: open }"
        >mdi-chevron-down</v-icon
      >
    </template>
  </v-treeview>
</template>

<script>
import { routes } from "@/router/index";
export default {
  data: () => ({
    menuItems: [],
    currentActive: [],
    currentOpen: [],
    authList: []
  }),
  created() {
    this.routesInit();
  },
  methods: {
    menuFilter(item) {
      return !this.authList.includes(item.name);
    },
    onActive(val) {
      console.log(val);
      if (val === []) return;
      $(".menu-item-open").removeClass("menu-item-open");
      this.$nextTick(() => {
        $(".sider-bar-menu-active")
          .parent()
          .parent()
          .prev()
          .addClass("menu-item-open");
      });
      if (val && val[0] && this.$route.name !== val[0]) {
        this.$router.push({ name: val[0] });
      }
    },
    routesInit() {
      this.menuItems = JSON.parse(JSON.stringify(routes)).filter(
        item => item.path === "/"
      )[0].children;
      this.menuItems.map(item => {
        if (item.children) {
          item.children = item.children.filter(it => it.menu === "left");
        }
      });
      this.currentOpen = [this.menuItems[0].name];
      this.currentActive = [this.menuItems[0].children[0].name];
      this.onActive();
    }
  }
};
</script>

<style lang="scss">
$gray: rgba(255, 255, 255, 0.447);
.side-bar-menu.theme--light.v-treeview {
  color: $gray;
  font-size: 14px;
  .theme--light.v-icon {
    color: #fff;
  }
  .menu-item-open {
    background: rgb(16, 141, 233);
    color: #fff;
  }
}
</style>

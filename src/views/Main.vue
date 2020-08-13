<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="false"
      mini-variant-width="100"
      width="224"
      permanent
      color="rgba(28, 42, 54, 1)"
      app
    >
      <div class="flex side-logo">
        <img src="@assets/img/logo.png" width="71px" />
        <span class="ml10 logo-text">协作平台</span>
      </div>

      <sider-bar-menu></sider-bar-menu>
    </v-navigation-drawer>
    <v-app-bar color="#fff" height="100" flat app> </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <breadcrumbs></breadcrumbs>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="#fff" height="50" inset app> </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    SiderBarMenu: () => import("@comp/layout/SiderBarMenu"),
    Breadcrumbs: () => import("@comp/layout/Breadcrumbs")
  },

  data: () => ({
    //
  }),

  created() {}
};
</script>

<style lang="scss" scoped>
.side-logo {
  line-height: 60px;
  padding-left: 25px;
  .logo-text {
    font-size: 20px;
    color: rgba(250, 180, 27, 0.874);
  }
}
</style>

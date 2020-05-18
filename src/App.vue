<template>
  <v-app>
    <v-navigation-drawer app>
      navigation
    </v-navigation-drawer>
    <v-system-bar app>v-system-bar</v-system-bar>
    <v-app-bar app>
      app
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      content
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        container
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-bottom-navigation app>v-bottom-navigation</v-bottom-navigation>
    <v-footer app>
      footer
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),

  created() {}
};
</script>

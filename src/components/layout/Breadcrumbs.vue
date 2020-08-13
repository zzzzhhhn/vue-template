<template>
  <v-breadcrumbs :items="menuItems"></v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  data: () => ({
    menuItems: []
  }),
  created() {},
  methods: {
    getMenuItems() {}
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  // },
  watch: {
    $route() {}
  }
};
</script>

<style scoped></style>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" elevation="1">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <!-- eslint-disable-next-line vuejs-accessibility/alt-text -->
            <img :src="require('../assets/default_user.png')" />
          </v-list-item-avatar>

          <v-list-item-content v-if="user">
            <v-list-item-title style="text-align: left">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle style="text-align: left">{{ user.room }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="route in routes" :key="route.path" link :to="route.path">
          <v-list-item-icon>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="text-align: left">{{ route.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="text-align: left">Đăng xuất</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="bar" :style="barStyle" app elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="main" :style="mainStyle">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <transition name="zoom" mode="out-in" :duration="{ leave: 0 }">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'LayoutPage',
  data() {
    return {
      drawer: true,
      loading: false,
      items: [
        { title: 'Bảng trực nhật', icon: 'mdi-file-table-box' },
        { title: 'Đánh giá trực nhật', icon: 'mdi-star' },
        { title: 'Thống kê trực nhật', icon: 'mdi-chart-bar' },
        { title: 'Tạo trực nhật', icon: 'mdi-pencil' },
        { title: 'Quản lý học sinh', icon: 'mdi-account-group-outline' },
        { title: 'Đăng xuất', icon: 'mdi-logout' },
      ],
    };
  },
  computed: {
    mainStyle() {
      const style = {};
      style.width = this.drawer ? 'calc(100% - 256px)' : '100%';
      return style;
    },
    barStyle() {
      const style = {};
      style['margin-left'] = this.drawer ? '256px' : '0';
      return style;
    },
    routes() {
      return this.$router.options.routes[2].children.filter(
        (r) => !r.meta.role || r.meta.role === this.role,
      );
    },
    pageTitle() {
      return this.$route.name;
    },
    ...mapGetters('user', ['user', 'role']),
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapMutations('user', ['setUser']),
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.bar {
  right: 0;
  margin-left: 320px;
  transition: margin 0.2s;
}
</style>

<template>
  <div id="app" @contextmenu="disableContextmenu">
    <router-view v-if="isReady" />
  </div>
</template>
<script lang="ts">
import BaseVue from "page-web/BaseVue";
import { Component } from "vue-property-decorator";
import { AppStore } from "page-web/store/modules";

@Component
export default class App extends BaseVue {
  isReady = false;
  created() {
    AppStore.getPageList().then(() => {
      if (AppStore.pageList.length > 0 && !/^\/p\/\d+/.test(this.$route.path)) {
        this.$router.replace(`/p/${AppStore.pageList[0].id}`);
      }
      this.isReady = true;
    });
  }

  get pageId() {
    return Number(this.$route.params.pageId);
  }

  disableContextmenu(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    return false;
  }
}
</script>
<style scoped lang="scss">
#app {
  user-select: none;
}
</style>

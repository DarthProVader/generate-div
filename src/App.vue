<template>
  <div id="app" class="bg-brand-gradient flex flex-col min-h-screen">
    <main>
      <DivGenerator />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DivGenerator from "./components/DivGenerator.vue";

export default defineComponent({
  name: "App",
  components: {
    DivGenerator,
  },
});
</script>

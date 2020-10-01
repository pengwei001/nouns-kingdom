<template>
  <div class="home">
    <Categories />
  </div>
</template>

<script>
// @ is an alias to /src
import Categories from "@/components/Categories.vue";

export default {
  name: "Home",
  components: {
    Categories
  }
};
</script>

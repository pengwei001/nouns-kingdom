<template>
  <div class="categories-container">
    <div v-for="category in categoris" :key="category">
      <img
        :src="getImgUrl(category)"
        class="home-image-container"
        @click="onCategoryChange(category)"
      />
      <div class="category-font-container" @click="onCategoryChange(category)">
        {{ capitalize(category) }}
      </div>
    </div>
  </div>
</template>

<script>
import { NKHttpSvc } from "../services/httpService.js";

export default {
  name: "Categories",
  data() {
    return {
      categoris: []
    };
  },
  created() {
    NKHttpSvc.Categories()
      .then(res => res.json())
      .then(data => (this.categoris = data.category));
  },
  methods: {
    getImgUrl(name) {
      const imgUrl = require.context("../assets/category", false, /\.png$/);
      return imgUrl("./" + name + ".png");
    },
    capitalize(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    onCategoryChange(category) {
      this.$router.push(category);
    }
  },
  computed: {}
};
</script>

<style>
.categories-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 15%;
  margin-right: 15%;
}

@media only screen and (max-width: 800px) {
  .categories-container {
    justify-content: center;
  }
}
.home-image-container {
  height: 300px;
  width: 280px;
}
.home-image-container:hover {
  cursor: pointer;
}
@media only screen and (max-width: 280px) {
  .home-image-container {
    height: 100%;
    width: 100%;
  }
}

.category-font-container {
  font-weight: 600;
}
@media only screen and (min-width: 280px) {
  .category-font-container {
    font-size: 2vw;
  }
}

.category-font-container:hover {
  cursor: pointer;
}
</style>

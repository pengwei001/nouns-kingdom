<template>
  <PulseLoader v-if="isLoading"></PulseLoader>
  <div v-else class="category-container">
    <div v-for="word in wordsInCategory" :key="word">
      <img
        :src="getImgUrl(word)"
        class="image-container"
        @click="onCardChange(word)"
      />
      <div class="card-font-container" @click="onCardChange(word)">
        {{ word }}
      </div>
    </div>
    <div v-if="wordsInCategory.length === 0">Will add more cards here soon</div>
  </div>
</template>

<script>
import { NKHttpSvc } from "../services/httpService.js";
import PulseLoader from "../components/PulseLoader.vue";

export default {
  name: "Category",
  data() {
    return {
      isLoading: false,
      wordsInCategory: []
    };
  },
  components: {
    PulseLoader
  },
  created() {
    this.isLoading = true;
    const curCategory = this.$route.path.split("/")[1];
    const curCard = this.$route.params.id;
    NKHttpSvc.WordsOfCategory(curCategory, curCard)
      .then(res => res.json())
      .then(data => {
        this.wordsInCategory = Object.keys(data);
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  },
  methods: {
    getImgUrl(name) {
      const imageName = this.$route.name + "_" + name;
      const imgUrl = require.context("../assets/", false, /\.png$/);
      return imgUrl("./" + imageName + ".png");
    },
    onCardChange(word) {
      this.$router.push({ path: `/${this.$route.name}/${word}` });
    }
  }
};
</script>

<style scoped>
.category-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 15%;
  margin-right: 15%;
}
@media only screen and (max-width: 1650px) {
  .category-container {
    justify-content: center;
  }
}
.image-container {
  height: 300px;
  width: 280px;
}
.image-container:hover {
  cursor: pointer;
}
@media only screen and (max-width: 280px) {
  .image-container {
    height: 100%;
    width: 100%;
  }
}
.card-font-container {
  font-weight: 600;
}
@media only screen and (min-width: 280px) {
  .card-font-container {
    font-size: 2vw;
  }
}
@media only screen and (max-width: 750px) {
  .card-font-container {
    font-size: 4vw;
  }
}
.card-font-container:hover {
  cursor: pointer;
}
</style>

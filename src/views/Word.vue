<template>
  <div class="word">
    <div>
      <img :src="getImgUrl()" class="image-container" />
      <div class="words-container">
        <div v-for="(key, value) in words" :key="key" class="word-container">
          {{ value }} : {{ key }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NKHttpSvc } from "../services/httpService.js";

export default {
  name: "Word",
  data() {
    return {
      words: []
    };
  },
  created() {
    const curCategory = this.$route.path.split("/")[1];
    const curCard = this.$route.params.id;
    NKHttpSvc.WordsOfCard(curCategory, curCard).then(
      data => (this.words = data)
    );
  },
  methods: {
    getImgUrl() {
      const name = this.$route.params.id;
      const curCategory = this.$route.path.split("/")[1];
      const imageName = curCategory + "_" + name;

      const imgUrl = require.context("../assets", false, /\.png$/);
      return imgUrl("./" + imageName + ".png");
    },
    onCardChange(name) {
      console.log("card: ", name);
      this.$router.push(name);
    }
  }
};
</script>

<style>
.words-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 15%;
  margin-right: 15%;
}
.word-container {
  min-width: 200px;
}
.image-container {
  height: 600px;
  width: 573px;
}
</style>

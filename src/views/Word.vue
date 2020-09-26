<template>
  <div class="word">
    <div>
      <h1>{{ title }}</h1>
      <img :src="getImgUrl()" />
      <div class="words-container">
        <div v-for="(key, value) in words" :key="key" class="word-container">
          {{ value }} : {{ key }}
        </div>
      </div>
    </div>
    <div v-if="words.length === 0">working on design parts of {{ title }}</div>
  </div>
</template>

<script>
import { NKHttpSvc } from "../services/httpService.js";

export default {
  name: "Word",
  data() {
    return {
      words: [],
      title: this.$route.params.id
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
      console.log("!!!!", imgUrl("./" + imageName + "_with_words.png"));
      if (!imgUrl("./" + imageName + "_with_words.png")) {
        console.log("cant find image");
      }
      return imgUrl("./" + imageName + "_with_words.png");
    },
    onCardChange(name) {
      console.log("card: ", name);
      this.$router.push(name);
    }
  }
};
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
.words-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 15%;
  margin-right: 15%;
}
@media only screen and (max-width: 600px) {
  .words-container {
    justify-content: center;
  }
}
.word-container {
  min-width: 200px;
}
</style>

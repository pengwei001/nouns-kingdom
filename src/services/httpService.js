class HttpServiceClient {
  Categories() {
    return fetch("./db_category.JSON");
    // return ["animals", "foods", "tools"];
  }

  WordsOfCard(category, card) {
    const dictionay = "./db_" + category + ".JSON";
    console.log("Needs to get data from dictionary: ", dictionay);
    console.log(category);
    return fetch(dictionay)
      .then(res => res.json())
      .then(data => data[card]);
    // return fetch(dictionay);
  }

  WordsOfCategory(category) {
    const curCategory = "./db_" + category + ".JSON";
    return fetch(curCategory);
  }
}

export const NKHttpSvc = new HttpServiceClient();

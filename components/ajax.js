const apiHost = "https://bakesaleforgood.com";
export default {
  async fetchingInitialDeals() {
    try {
      let response = await fetch(apiHost + "/api/deals");
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchingFullDeal(id) {
    try {
      let response = await fetch(apiHost + "/api/deals/" + id);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchingCertainDeal(word) {
    try {
      let response = await fetch(apiHost + "/api/deals?searchTerm=" + word);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
};

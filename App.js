/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import ajax from "./components/ajax";
import DealsList from "./components/DealsList";
import DealDetails from "./components/DealDetails";
import SearchBar from "./components/SearchBar";
class App extends React.Component {
  logoXposi = new Animated.Value(0);
  state = {
    deals: [],
    dealDetailId: null,
    dealsFromSearch: []
  };

  animateLogo = (direction = 1) => {
   
    const width = Dimensions.get("window").width - 250;
    Animated.timing(this.logoXposi, {
      toValue: (direction * width) / 2,
      duration: 1000,
      easing: Easing.ease
    }).start(({ finished }) => {
      if (finished) {
        this.animateLogo(-1 * direction);
      }
    });
  };
  async componentDidMount() {
    this.animateLogo();
    const deals = await ajax.fetchingInitialDeals();
    this.setState({ deals });
  }
  searchDeals = async word => {
    const dealsFromSearch = await ajax.fetchingCertainDeal(word);
    this.setState({ dealsFromSearch });
    console.log(this.state.dealsFromSearch);
  };
  clearSearch = () => {
    this.setState({ dealsFromSearch: [] });
  };
  setDealId = dealId => {
    this.setState({ dealDetailId: dealId });
  };
  unSetDealId = () => {
    this.setState({ dealDetailId: null });
  };
  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.dealDetailId);
  };
  render() {
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals;

    if (this.state.dealDetailId !== null) {
      return (
        <DealDetails
          goBack={this.unSetDealId}
          intialDeal={this.currentDeal()}
        />
      );
    }
    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealsList setDealId={this.setDealId} deals={dealsToDisplay} />
        </View>
      );
    }
    return (
      <Animated.View style={[{ left: this.logoXposi }, styles.container]}>
        <Text style={styles.header}>DailyDeals</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 40
  },
  main: {
    marginTop: 10
  }
});

export default App;

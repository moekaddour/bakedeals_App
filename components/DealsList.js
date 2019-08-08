import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import DealItem from "./DealItem"


class DealsList extends React.Component {

    
  render() {
    return (
      <View style={styles.listContainer}>
        <FlatList data={this.props.deals} 
        renderItem={({ item }) => (<DealItem getDealId={this.props.setDealId} deal = {item}/>)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
      paddingTop:15,
    backgroundColor: "#f5efe3",
   
    width: "100%"
  },
  subHeading:{
      color:"#fbc99d",
      fontSize: 20,
    
  }
});
export default DealsList;

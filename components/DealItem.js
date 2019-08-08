import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { priceDisplay } from "./Utlity";

class DealItem extends React.Component {

    handleTouch=()=>{
        this.props.getDealId(this.props.deal.key)
    }
  render() {
    return (
      <TouchableOpacity 
      onPress = {this.handleTouch}
      style={styles.listContainer}
      >
        <Image
          source={{ uri: this.props.deal.media[0] }}
          style={styles.imgStyle}
        />
        <Text style={styles.Heading}>{this.props.deal.title}</Text>
        <View style={styles.info}>
          <Text style={styles.subHeading}>
            {priceDisplay(this.props.deal.price)}
          </Text>
          <Text style={styles.subHeading}>{this.props.deal.cause.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#f5efe3",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 5,
    marginBottom: 3,
    borderRadius: 5,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderLeftWidth: 1,
    borderColor: "#dadada"
  },
  Heading: {
    color: "#414141",
    fontSize: 20,
    fontWeight: "bold"
  },
  subHeading: {
    color: "#414141",
    fontSize: 20
  },
  imgStyle: {
    width: "100%",
    height: 150
  },
  info:{
      flex:1,
      justifyContent:"space-between",
      flexDirection:"row",
      padding:5,
  }
});

export default DealItem;

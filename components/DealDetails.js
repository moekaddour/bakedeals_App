import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Button,
  Linking,
} from "react-native";
import { priceDisplay } from "./Utlity";
import ajax from "./ajax";
import DealItem from "./DealItem";

class DealDetails extends React.Component {
  

  imageXpos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXpos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get("window").width;
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        Animated.timing(this.imageXpos, {
          toValue: direction * this.width,
          duration: 250
        }).start(() => this.handleSwipe(-1*direction));
      } else {
        Animated.spring(this.imageXpos,{toValue:0}).start()
      }
    }
  });

  handleSwipe=(indexDirection)=>{
    if(!this.state.deal.media[this.state.imageIndex+indexDirection]){
      Animated.spring(this.imageXpos,{toValue:0}).start()
      return
    }
    this.setState(prevState=>{
      return{imageIndex: prevState.imageIndex+indexDirection}
    },()=>{this.imageXpos.setValue(indexDirection*this.width)
    Animated.spring(this.imageXpos,{toValue:0}).start()
    })
  }
  state = {
    deal: this.props.intialDeal,
    imageIndex: 0
  };
  async componentDidMount() {
    const fullDeal = await ajax.fetchingFullDeal(this.state.deal.key);
    this.setState({ deal: fullDeal });
  }
  openDealUrl=()=>{
    Linking.openURL(this.state.deal.url)
  }
  render() {
    const { deal } = this.state;
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={this.props.goBack}>
          <Text style={styles.goBackLink}>Go Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          // {...this.imagePanResponder.panHandlers}
          source={{ uri: deal.media[this.state.imageIndex] }}
          style={[{ left: this.imageXpos }, styles.imgStyle]}
        />
        <Text style={styles.Heading}>{deal.title}</Text>
        <ScrollView>
          <View style={styles.info}>
            <Text style={styles.subHeading}>{priceDisplay(deal.price)}</Text>
            <Text style={styles.subHeading}>{deal.cause.name}</Text>
          </View>

          {deal.user && (
            <View style={styles.userInfo}>
              <Image
                source={{ uri: deal.user.avatar }}
                style={styles.imgUser}
              />
              <Text style={styles.userText}>{deal.user.name}</Text>
            </View>
          )}
          <View style={styles.desContainer}>
            <Text style={styles.desText}>{deal.description}</Text>
          </View>
          <Button style={styles.btn} title="Buy this deal!" onPress={this.openDealUrl} />
        </ScrollView>
      </View>
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
  goBackLink: {
    marginBottom: 5,
    color: "blue",
    fontSize: 20,
    fontWeight: "bold"
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5
  },
  userInfo: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  imgUser: {
    width: 60,
    height: 60,
    borderColor: "#f5efe3",
    borderRadius: 50,
    borderWidth: 4
  },
  desContainer: {
    flex: 4,
    marginTop: 9,
    marginBottom:15,
  },
  desText: {
    fontSize: 20
  },
  userText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  btn:{
    marginTop:15,
  }
});

export default DealDetails;

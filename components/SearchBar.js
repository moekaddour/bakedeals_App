import React from "react"

import {TextInput,  StyleSheet} from "react-native"
import debounce from "lodash.debounce"

class SearchBar extends React.Component{

state={
    textInput:""
}

debouncedSearchDeals = debounce(this.props.searchDeals,300)
handelInput=(textInput)=>{
    this.setState({textInput}, ()=>{
        this.debouncedSearchDeals(this.state.textInput)
    })
   
}

    render(){
        return(
            <TextInput placeholder="Search all deals"
            onChangeText={this.handelInput}/>
        )
    }
}

const styles= StyleSheet.create({
input:{
    height:10,
    marginHorizontal:5,
}

})
export default SearchBar
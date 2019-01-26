import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import api from './../services/api';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <View style={styles.footer}>
                <Text style={styles.footerText}>Made by Henrique Marciano. All image and data rights reserved to Marvel.</Text>
            </View>   
        );
    }
}

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            heroes: [],
        }

    }

    static navigationOptions = {
        headerTitle: 'MARVEL HEROES',
    }

    componentDidMount() {
        this.loadHeroes();
    }

    loadHeroes = async (inputText = 'A') => {

        let letter = inputText;

        if(letter == '') letter = 'A';
        
        const response = await api.get(`/characters?ts=1&apikey=8909418bba81960db4703a9bddb6472f&hash=60e1fc30180a891090809946273dd8d7&limit=100&nameStartsWith=${letter}`);//&offset=${offset}&nameStartsWith=${letter}
        
        const { results } = response.data.data;

       this.setState({ heroes: results });
    };

    renderItem = ({ item }) => {
        let url = item.thumbnail.path + '.jpg';
        //let dim = Dimensions.get('window').width/4; //pega largura da tela e divide por 4

        return (
            <View  elevation={3} style={styles.listItens}>
                <Image source={{uri: url}} style={styles.listImages}/>
                <Text style={styles.listText}>{item.name}</Text>
            </View>
        )
    }

    //addMoreHeroes = () => {}

    getInput = (inputText) => {
        this.setState({ heroes: [] });

        this.loadHeroes(inputText);
    }

    render() {

        return (
            <View style={{flex: 1, flexWrap: 'wrap'}}>
                <View style={{ backgroundColor: '#fff0f5'}}>
                    <TextInput style={styles.inputText}
                        placeholder="Type the hero name!"
                        onChangeText={(inputText) => this.getInput(inputText)}
                        maxLength={25}/>
                </View>

                <View style={styles.list}>
                <FlatList 
                    data={this.state.heroes}
                    numColumns={4}
                    columnWrapperStyle={{marginLeft: 3, marginRight: 3}}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem}
                    //onEndReached={this.addMoreHeroes}
                    //onEndReachedThreshold={0.3}
                    ListFooterComponent={() => { return (<Footer/>) }}
                    />    
                </View>
            </View> 
        )}
}

const styles = StyleSheet.create({
    list: {
        flex: 1, 
        backgroundColor: '#fff0f5'
    },

    listItens: {
        width: 82.5,
        borderWidth: 1, 
        borderColor: '#ccc',
        backgroundColor: '#d35a57', 
        marginHorizontal: 3, 
        marginTop: 6,  
    },

    listImages: {
        height: 80
    },

    listText: {
        textAlign: 'left',
        color: 'white', 
        fontSize: 12,
        fontFamily: 'BentonSans',
    },

    footer: {
        marginTop: 10,
        backgroundColor: '#d93638',
        padding: 12,
    },

    footerText: {
        textAlign: 'center',
        color: 'white', 
        fontSize: 14,
        fontFamily: 'BentonSans',
    },

    inputText: {
        margin: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 15,
        backgroundColor: 'white'
    }

});
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, TextInput} from 'react-native';
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const ViewBookDetailsScreen = (props) => {
    return (
        <View style={sharedStyles.container}>
            <View style={sharedStyles.screenTitleWrapper}>
                <TouchableOpacity style={{flex: 1}}
                                  onPress={() => props.navigation.goBack()}>
                    <Icon
                        name='angle-left'
                        color='black'
                        size={36}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{paddingRight: 0, borderRadius: 50, backgroundColor: 'white', elevation: 3}}
                    onPress={() => {
                        props.navigation.navigate('ProfileScreen')
                    }}>
                    <Icon
                        name='user-circle'
                        color='#FCB97D'
                        size={36}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bookContainer}>
                <Image style={styles.bookImg}
                       source={{
                           uri: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixid=' +
                               'MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=' +
                               'crop&w=750&q=80'
                       }}/>
            </View>
            <View style={styles.authorContainer}>
                <Text style={styles.author}>
                    athur
                </Text>
                <Text style={styles.bookName}>
                    Book of the hanna and rita
                </Text>
            </View>
            <View style={{flex: 1, width: '100%', padding: 10, marginTop: 10}}>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor eleifend egestas. Ut
                    non luctus ligula, a eleifend dolor. Curabitur scelerisque vulputate porttitor. In lobortis sagittis
                    lectus id cursus. Nulla laoreet, metus at suscipit tincidunt, elit urna feugiat nunc, a tristique
                    ligula felis in enim. Duis metus odio Duis metus odio, dictum vitae felis vel, accumsan mattis
                    tortor. Aenean pellentesque tellus vitae lacinia semper. In eu felis gravida, ultrices arcu sed,
                    lobortis dui. Phasellus sit amet ex ut ligula feugiat semper. Suspendisse tempor laoreet odio, eu
                    ornare neque. Donec interdum volutpat lorem, eget auctor magna. Nullam placerat non nisl id dapibus.
                    Interdum et malesuada fames ac ante ipsum primis in faucibus.
                </Text>
            </View>
        </View>
    );
}

export default ViewBookDetailsScreen;

const styles = StyleSheet.create({
    bookContainer: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookImg: {
        height: 300,
        width: 200
    },
    authorContainer: {
        // backgroundColor: '#fff',
        width: '100%',
        height: '10%',
        justifyContent: 'space-evenly',
        paddingLeft: 10
    },
    author: {
        fontStyle: 'italic',
        fontSize: 27,
    },
    bookName: {
        fontWeight: '400',
        fontSize: 36
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
    },
    textArea: {
        height: 80,
    }

})
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, TextInput, Platform, Image} from 'react-native';
import Styles from './Styles';
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button, FAB} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const AddEbookScreen = (props) => {
    const [bookName, setBookName] = useState('');
    const [image, setImage] = useState(null);

    useEffect(  () => {
        SelectImage();
    })
  async  function SelectImage() {
      if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (status !== 'granted') {
              alert('Permission Denied!')
          }
      }
    }

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const inputHandler = inputText => {
        setBookName(inputText)

    }

    return (
        <View style={[sharedStyles.container, {backgroundColor: 'white'}]}>
            <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto', marginTop: 50}}
                onPress={() => props.navigation.goBack()}>
                <Icon
                    name='angle-left'
                    color='black'
                    size={36}
                    style={{paddingLeft: 30, paddingRight: 20}}
                />
            </TouchableOpacity>
            <View style={Styles.container}>
                <TextInput
                    style={Styles.input}
                    placeholder='Book Name'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={inputHandler} autoCapitalize='words' blurOnSubmit value={bookName}
                    returnKeyType='next'

                />
                <View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput style={[Styles.input, {width: '70%', marginTop: 30}]} placeholder='Add Image'
                               placeholderTextColor='#bebebe' editable={false} value={image}/>
                    <FAB style={Styles.fab} medium icon="image-plus" onPress={PickImage} color='red'/>
                </View>
                <View style={{marginVertical: '98%'}}>
                    <Button mode='contained' color='#8962F8' uppercase={false}
                            style={{height: 50, width: 270, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => {}}
                    >
                        Submit
                    </Button>
                </View>
            </View>

        </View>
    );
}

export default AddEbookScreen;

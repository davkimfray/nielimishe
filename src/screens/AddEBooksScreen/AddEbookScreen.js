import React, {useState, useEffect} from 'react';
import {Text, ActivityIndicator, Picker, TouchableOpacity, View, TextInput, Platform, Image} from 'react-native';
import Styles from './Styles';
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button, FAB} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {firebase} from '../../firebase/config'
import * as FileSystem from 'expo-file-system';

const AddEbookScreen = (props) => {
    const [bookName, setBookName] = useState('');
    const [bookDetails, setBookDetails] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false)
    const ebookRef = firebase.firestore().collection('ebooks').doc(props.route.params.level)


    useEffect(  () => {
        SelectImage();
            ebookRef
                .onSnapshot(
                    querySnapshot => {
                        if(querySnapshot.data())
                        setCategories(Object.keys(querySnapshot.data()))
                    },
                    error => {
                        console.log(error)
                    }
                )
        }, [])
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
            // mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // mediaType: 'photo',
            // allowsEditing: true,
            // aspect: [1,1],
            // quality: [1, 1]
            type: image,
        }).then(res => {
     // console.log(result);
     if (!res.cancelled) {
        setImage(res);
    }
        })
    }

    const inputHandler = inputText => {
        setBookName(inputText)

    }

    const onSubmitPressed = async () => {

        // Fetch the photo with it's local URI
// const file = await FileSystem.readAsStringAsync(image.uri, {
//     encoding: FileSystem.EncodingType.Base64,
// })
        setLoading(true)
        let newCategory = ''
        const storage = firebase.storage();
        const storageRef = storage.ref();
        if (selectedCategory.trim().length > 0) {
            if (selectedCategory === 'new') {
                if (category.trim().length < 1) {
                    alert("Add New Category or Select available category.")
                    return
                } else newCategory = category
            } else newCategory = selectedCategory  
        } else {
            alert("Select available category or Select Add New Category to add new one.")
            setLoading(false)
            return
        }
        if (bookName.trim().length < 1) {
            alert("Add Book Name.")
            setLoading(false)
            return
        }
        if (image.uri.trim().length < 1) {
            alert("Add Image.")
            setLoading(false)
            return
        }

        if (newCategory.trim().length > 0 && bookName.trim().length > 0 && image) {
            const metadata = {
                contentType: 'image/jpeg',
              };
              const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  resolve(xhr.response);
                };
                xhr.onerror = function(e) {
                  console.log(e);
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', image.uri, true);
                xhr.send(null);
              });
            let data = {}
                const uploadTask = storageRef.child('book/' + bookName).put(blob);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) =>{
                        // console.log(snapshot.bytesTransferred);
                        // const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 80;
                        // setProgress(10 + uploadProgress)
                    },(error) =>{
                        alert(error)
                        setLoading(false)
                        throw error
                    },() =>{
                        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                            const ebookData = {
                                name: bookName,
                                image: url,
                                description: bookDetails
                            }
                            data[newCategory] = firebase.firestore.FieldValue.arrayUnion(ebookData)
                            ebookRef
                                .update(data)
                                .then(() => {
                                    setLoading(false)
                                    props.navigation.navigate('EBooks')
                                })
                                .catch((error) => {
                                    alert(error)
                                    setLoading(false)
                                }); 
                            }); 
                        }
                )
    
    
        }
    }


    return (
        <View style={[sharedStyles.container, {}]}>
            <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto', marginTop: 50}}
                onPress={() => props.navigation.goBack()}>
                <Icon
                    name='angle-left'
                    color='black'
                    size={36}
                    style={{ paddingRight: 20}}
                />
            </TouchableOpacity>
            <View style={Styles.container}>
            <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
                {/* <Text style={{marginLeft: '12%', color: 'gray'}}>Select Course</Text> */}
                <View style={sharedStyles.selectInput}>
                    <Picker
                        selectedValue={selectedCategory}
                        style={{width: '100%'}}
                        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                    >
                        <Picker.Item label="Select Category" color="gray" value=""/>
                        {categories.map((value, index) => (
                            <Picker.Item key={index} label={value} value={value}/>
                        ))}
                        <Picker.Item label="Add New Category" value="new"/>
                    </Picker>
                </View>
                {selectedCategory === 'new' ?
                    <TextInput
                        style={sharedStyles.input}
                        placeholder='Add New Category'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setCategory(text)}
                        value={category}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    : <Text/>
                }

                <TextInput
                    style={Styles.input}
                    placeholder='Book Name'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={inputHandler} autoCapitalize='words' blurOnSubmit value={bookName}
                    returnKeyType='next'

                />
                <View style={{width: '80%', flexDirection: 'row', marginVertical: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput style={[Styles.input, {width: '70%'}]} placeholder='Add Image'
                               placeholderTextColor='#bebebe' editable={false} value={image ? image.uri : ''}/>
                    <FAB style={Styles.fab} medium icon="image-plus" onPress={PickImage} color='#FCB97D'/>
                </View>
                <TextInput
     multiline={true}
     numberOfLines={10}
     placeholder='Book Description'
     placeholderTextColor='#BEBEBE'
     style={[Styles.input,{ height:200, textAlignVertical: 'top',paddingTop:8}]}
     onChangeText={(text) => setBookDetails(text)}
                        value={bookDetails}
 />
                <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
                <TouchableOpacity
                    style={loading ? [Styles.button, sharedStyles.disabledButton] : Styles.button}
                    disabled={loading}
                    onPress={() => onSubmitPressed()}>
                                   {loading ? 
                            <ActivityIndicator size={'large'} color={'#FCB97D'} style={{paddingRight: 16}}/>
                        :   <Text/>
                        }
                    <Text style={{color: '#fff',fontSize: 16,fontWeight: 'bold'}}>Submit</Text>
                </TouchableOpacity>
                <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
            </View>

        </View>
    );
}

export default AddEbookScreen;

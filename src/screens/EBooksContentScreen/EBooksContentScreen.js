import React, {useEffect, useState, useCallback} from 'react'
import {
    Text,
    FlatList,
    Modal,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    View,
    Pressable,
    ScrollView
} from 'react-native'
import {firebase} from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import math from "../../../assets/ebooks/see_inside_maths.jpg"
import styles from "./styles"
import PointIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EBooksContentScreen(props) {
    const books = [
        {name: 'Counting', image: math},
        {name: 'Sounds', image: math},
    ]
    const [categories, setCategories] = useState([]);
    const [ebooksData, setEbooksData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [modalVisible, showModal] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState(null);

    const getRandomColor = () => {
        return 'rgb(' + (Math.floor(Math.random() * 252)) + ',' + (Math.floor(Math.random() * 252)) + ',' + (Math.floor(Math.random() * 252)) + ')';
    }

    const colors = ['#FD820B', '#DF1125']

    let contentLevel
    let userData;
    useEffect(() => {
        const childRef = firebase.firestore().collection('users').doc(props.extraData.id)
        childRef
            .onSnapshot(querySnapshot => {
                userData = querySnapshot.data()
                contentLevel = props.extraData.role === 'admin' ? props.route.params.level : userData.children[userData.selectedChild].level

                const ebookRef = firebase.firestore().collection('ebooks')
                // ebookRef
                //         .doc(contentLevel)
                //         .onSnapshot(
                //             querySnapshot => {
                //                 setCategories(Object.keys(querySnapshot.data()))
                //                 setEbooksData(querySnapshot.data())
                //                 setLoading(false)
                //             },
                //         error => {
                //             console.log(error)
                //             setLoading(false)
                //         }
                //     )
            })
    }, [])

    const onGuidePress = useCallback((guide) => {
        showModal(true);
        setSelectedGuide(guide);
      }, []);

      const closeModal = useCallback(() => showModal(false), []);

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

            {!loading ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={80} color={'#8962F8'}/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{width: '100%', alignItems: 'center'}}
                    data={props.route.params.ebooksData}
                    renderItem={({item, index}) => (
                        <Pressable 
                        // onPress={() => props.navigation.navigate('ViewBookDetailsScreen',
                        //     {
                        //         categoryName: item,
                        //         ebooksData: ebooksData[item]}
                        // )}
                    onPress={() => onGuidePress(item)}
                        >
                        <View style={styles.container}>
                            <Image
                                style={styles.image}
                                source={{uri: item.image}}
                            />

                            {/* <Text style={{position: 'absolute'}}>{item}</Text> */}
                        </View>
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => (index + item.name)}
                />
            }
                  <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        onRequestClose={closeModal}
      >
        <VideoModal guide={selectedGuide} onClose={closeModal} />
    
      </Modal>
        </View>
    )
}



const VideoModal = ({ guide, onClose }) => {

    const onDelete = (index) => {
        alert('delete ' + index)
      }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#EDD892aa",
          justifyContent: "center",
        }}
      >
        <View style={{ backgroundColor: "#EDD892aa", elevation: 0, margin: 16}}>
                 {/* <FlatList
        contentContainerStyle={{alignItems: 'flex-start',padding:8}}
        data={guide.guides}
        renderItem={({ item, index }) => (
            <Text style={{"borderColor": "#FCB97D","borderLeftWidth": 2,marginVertical:12, paddingLeft: 16, fontSize:16}}>
                    {item}
                </Text>
        )}
        keyExtractor={(item, index) => (item.name+index)}
      />  */}
      <ScrollView>
          <View style={styles.bookContainer}>
                <Image style={styles.bookImg}
                       source={{
                           uri: guide.image 
                       }}/>
            </View>
        <View style={styles.authorContainer}>
                {/* <Text style={styles.author}>
                    athur
                </Text> */}
                <Text style={styles.bookName}>
                    {guide.name}
                </Text>
            </View>
            <View style={{ width: '100%', padding: 10, marginTop: 10}}>
                <Text>
                    {guide.description}
                </Text>
            </View>
                   <TouchableOpacity
                 style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width: '90%', margin:'5%', marginBottom:16, backgroundColor: '#FCB97D', elevation:3,borderRadius:20,padding:20}}

               onPress={onClose}>
                   <PointIcon
                        name='close-thick'
                        color='white'
                        size={24}
                    />
                <Text style={{fontSize: 18, paddingLeft:18, color:'white'}}>Close</Text>
                </TouchableOpacity>
               </ScrollView>
 </View>
 </View>
    );
  };

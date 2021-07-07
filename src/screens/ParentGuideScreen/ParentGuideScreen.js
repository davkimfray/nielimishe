
import React, { useEffect, useCallback, useState } from 'react'
import { FlatList, Modal, ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import PointIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BackIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function ParentGuideScreen(props) {
    const [loading, setLoading] = useState(true)
    const [guides, setGuides] = useState(true)
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [modalVisible, showModal] = useState(false);

 
    useEffect(() => {
        setLoading(true)
        const usersRef = firebase.firestore().collection('guide');
        usersRef
            .onSnapshot(
                querySnapshot => {
                    const data  = querySnapshot.docs.map(doc =>  ({name: doc.id, ...doc.data()}))
                    setGuides(data)
                    setLoading(false)
                },
            error => {
                console.log(error)
                setLoading(false)
            }
        )
    }, []);

    const onGuidePress = useCallback((guide) => {
        showModal(true);
        setSelectedGuide(guide);
      }, []);

      const closeModal = useCallback(() => showModal(false), []);

    return (
        <View style={sharedStyles.container}>
            <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto',marginTop: 50}}
                onPress={() => props.navigation.goBack()}>
                <BackIcon
                    name='angle-left'
                    color='black'
                    size={36}
                    style={{paddingLeft: 30, paddingRight: 20}}
                />
            </TouchableOpacity>
            
        
            {loading ? 
           <View style={{marginTop: '30%', marginLeft: '35%', position: 'absolute'}}>
           <ActivityIndicator size={60} color={'#FCB97D'}/>
       </View>
        :
            <FlatList
        contentContainerStyle={styles.container}
        numColumns={2}
           ListHeaderComponent={""}
        data={guides}
        renderItem={({ item, index }) => (
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onGuidePress(item)}>
                               <Icon
                    name={item.icon} 
                    color='#FCB97D'
                    size={36}
                    style={{paddingBottom: 8}}
                />
                    <Text style={styles.buttonTitle}>{item.name}</Text>
                </TouchableOpacity>
        )}
        keyExtractor={(item, index) => (item.name+index)}
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

      { props.extraData.role === 'admini' ?
                <TouchableOpacity
                    style={{
                    backgroundColor: '#fff',
                    elevation: 3,
                    height: 60,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: 'center',
                    padding: 16,
                    position: 'absolute',
                    bottom: 36,
                    right: 36,
            }}
                    onPress={() => props.navigation.navigate('AddCourseScreen', {level: props.route.params.level})}
                    >
                    <Icon
                        name='plus'
                        color='red'
                        size={30}
                        // style={{padding: 20}}
                    />
                </TouchableOpacity>
                : <Text/>
}
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
          backgroundColor: "#EDD892cc",
          justifyContent: "center",
        }}
      >
        <View style={{ backgroundColor: "white", padding: 16, elevation: 6, margin: 24, borderRadius: 16 }}>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', paddingTop:8}}>
                <Icon
                    name={guide.icon}
                    color='#FCB97D'
                    size={30}
                    style={{marginLeft:-24, paddingRight: 20}}
                />
                <Text style={{fontSize:18,fontWeight:'bold'}}>{guide.name}</Text>
                <PointIcon
                    onPress={()=>onDelete(guide.name)}
                     name='delete' 
                    color='red'
                    size={28}
                    style={[sharedStyles.textWithShadow, {padding: 4, marginRight:8, position:'absolute',right:0}]}
                />
              </View>   

                 <FlatList
        contentContainerStyle={{alignItems: 'flex-start',padding:8}}
        data={guide.guides}
        renderItem={({ item, index }) => (
            <Text style={{"borderColor": "#FCB97D","borderLeftWidth": 2,marginVertical:12, paddingLeft: 16, fontSize:16}}>
                    {item}
                </Text>
        )}
        keyExtractor={(item, index) => (item.name+index)}
      /> 
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
        </View>
      </View>
    );
  };
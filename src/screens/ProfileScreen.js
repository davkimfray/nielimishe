
import React, { useEffect, useState } from 'react'
import {Text, ActivityIndicator, FlatList, Image, ImageBackground, TouchableOpacity, View } from 'react-native'
import { firebase } from '../firebase/config'
import sharedStyles from "./sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import math from "../../assets/ebooks/see_inside_maths.jpg"
import { StyleSheet } from 'react-native';
 
export default function ProfileScreen(props) {
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [activeChild, setActiveChild] = useState(null)
    const usersRef = firebase.firestore().collection('users');
        const uid = props.extraData.id

    useEffect(() => {
        setLoading(true)
       usersRef
            .doc(uid)
            .onSnapshot(
                querySnapshot => {
                    const data  = querySnapshot.data()
                    setUserData(data)
                    setActiveChild(data.selectedChild);
                    setLoading(false)
                },
            error => {
                console.log(error)
                setLoading(false)
            }
        )
    }, []);

    const onSetActiveChild = (idx) => {
        setActiveChild(idx)
        const data  = {
            id: userData.id,
            email: userData.email,
            fullName: userData.fullName,
            selectedChild: idx,
            role: userData.role,
            children: userData.children
        }
        usersRef
        .doc(uid)
                .set(data)
                .catch((error) => {
                    alert(error)
                });
    }

    const onLogoutPress = () => {
        firebase.auth().signOut()
    }



    return (
        <View style={sharedStyles.container}>
        <View style={sharedStyles.screenTitleWrapper}>

<TouchableOpacity
               onPress={() => props.navigation.goBack()}>
<Icon
    name='angle-left'
    color='black'
    size={36}
/>
</TouchableOpacity>
<Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: -24}}>My Profile</Text>
<Text/>
</View>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',width: '90%',padding: 16}}>
            <Text style={{textTransform: 'uppercase',backgroundColor: '#8962F8',borderRadius: 50, padding: 16, paddingLeft:24,
                 paddingRight:24, color: 'white',fontSize: 24}}>
                 {props.extraData.fullName.slice(0,1)}
            </Text>
            <View style={{marginLeft: 24}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.extraData.email}</Text>
            <Text>{props.extraData.email}</Text>
            </View>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'flex-start',flex:1,width: '95%',marginTop:30, backgroundColor: 'white', elevation:3,borderRadius:20}}>

            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',width: '90%',padding: 16,paddingBottom:0,
                "borderBottomColor": "black","borderBottomWidth": 1}}>
                <Icon
                    style={{padding:8}}
                    name='child'
                    color='#8962F8'
                    size={36}
                />
                <View style={{marginLeft: 24}}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>children</Text>
                </View>
            </View>

            {loading ? 
           <View style={{marginTop: '30%', marginLeft: '35%', position: 'absolute'}}>
           <ActivityIndicator size={60} color={'#8962F8'}/>
       </View>
        :
            <FlatList
        contentContainerStyle={{alignItems: 'flex-start',width: '98%'}}

           ListHeaderComponent={""}
        data={userData.children}
        renderItem={({ item, index }) => (
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',width: '98%',padding: 16}}>
          <View style={{marginLeft: 8}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
              <View style={{flexDirection: 'row'}}>
                  <Icon style={{marginRight: 16}} name='birthday-cake' color='#8962F8' size={18}/>
                  <Text style={{fontSize: 16}}>{item.birthDay}</Text>
              </View>
          </View>
            {activeChild === index ? 
                  <Text style={{fontSize: 12, backgroundColor: 'green', color: 'white',marginRight: 8,padding:8, paddingVertical: 4, borderRadius:16}}>Active</Text>
              : 
              <TouchableOpacity
                style={{justifyContent: 'center', backgroundColor: 'green', elevation:3,borderRadius:8,padding:8}}
                onPress={() => onSetActiveChild(index)}>
                  <Text style={{padding:0, color:'white'}}>Set as Active</Text>
              </TouchableOpacity>
              } 
          </View>
        )}
        keyExtractor={(item, index) => (item.name+index)}
      /> 
            }
             <Text style={{flex:1}}/>
             <TouchableOpacity
                 style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width: '90%', marginBottom:16, backgroundColor: '#8962F8', elevation:3,borderRadius:20,padding:20}}

               onPress={() => props.navigation.navigate('ChildLevel', {children: userData.children})}>
                   <Icon
                        name='plus'
                        color='white'
                        size={24}
                    />
                <Text style={{fontSize: 18, paddingLeft:18, color:'white'}}>Add Child</Text>
                </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center',justifyContent: 'flex-start',width: '95%',marginTop:30, elevation:3,borderRadius:20}}>
            </View>
            <TouchableOpacity
                 style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width: '90%', marginBottom:40, backgroundColor: 'white', elevation:3,borderRadius:20,padding:20}}

               onPress={() => onLogoutPress()}>
<Icon
    name='power-off'
    color='red'
    size={28}
/>
<Text style={{fontSize: 24, paddingLeft:24, color:'red'}}>Log out</Text>
</TouchableOpacity>
    </View>
)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        borderRadius: 20,
    },
    image: {
        height: 300,
        width: '100%',
        borderRadius: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 30,
        width: '70%',
        elevation: 6,
        borderRadius: 20,

    },
})

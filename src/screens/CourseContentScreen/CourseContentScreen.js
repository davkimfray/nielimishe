
// import React, { useEffect, useState } from 'react'
// import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
// import styles from './styles';
// import { firebase } from '../../firebase/config'
// import sharedStyles from "../sharedStyles";
// import Icon from "react-native-vector-icons/Feather";
// import { Video, AVPlaybackStatus } from 'expo-av';
// import YoutubePlayerComponent from '../../components/YoutubePlayerComponent';
// import YoutubePlayer from "react-native-youtube-iframe";

// export default function CourseContentScreen(props) {
//     const [courses, setCourses] = useState([]);
//     const colors = ['#FD820B','#DF1125']
//     const video = React.useRef(null);
//     const courseSeries = [
//         "DC471a9qrU4",
//         "tVCYa_bnITg",
//         "K74l26pE4YA",
//         "m3OjWNFREJo",
//       ];

//     useEffect(() => {
//         const courseRef = firebase.firestore().collection('courses')
//         courseRef
//             .doc("Low")
//             // .withConverter()
//             // .orderBy('createdAt', 'desc')
//             .onSnapshot(
//                 querySnapshot => {
//                     setCourses(querySnapshot.data().Counting)
//                 },
//                 error => {
//                     console.log(error)
//                 }
//             )
//     }, [])



//     return (
//         <View style={sharedStyles.container}>
//             <TouchableOpacity
//                 style={{marginLeft: 0, marginRight: 'auto',marginTop: 50}}
//                 onPress={() => props.navigation.goBack()}>
//                 <Icon
//                     name='chevron-left'
//                     color='black'
//                     size={36}
//                     style={{paddingLeft: 30, paddingRight: 20}}
//                 />
//             </TouchableOpacity>
//        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/bz_v83R9w-0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
//  <View style={styles.container}>
//                            {/* <YoutubePlayerComponent style={{width: 320}}/>  */}
//                            <SafeAreaView style={{ flex: 1 }}>
//       <YoutubePlayer height={250} videoId={"sNhhvQGsMEc"} />
//     </SafeAreaView>
//  {courses.map((course, index) => (
 
//                  <View key={index} style={{backgroundColor: 'blue', padding: 40}}>        
//                         {/* <Video
//                 //   ref={video}
//                   style={{width: 320, height: 300}}
//                   source={{
//                     uri: 'https://www.youtube.com/embed/bz_v83R9w-0', 
//                     // uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//                   }}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                   useNativeControls
//                   resizeMode="contain"
//                   isLooping
//                 //   onPlaybackStatusUpdate={status => setStatus(() => status)}
//                 /> */}
//                 </View>
//                 // <TouchableOpacity
//                 //     key={index}
//                 //     style={[styles.button, {backgroundColor: colors[index]}]}

//                 //     onPress={() => props.navigation.navigate('ChildLevel')}>
//                 //     <Text style={styles.buttonTitle}>{course}</Text>
//                 // </TouchableOpacity>
//             ))}
//         </View>
//         {/*<View style={styles.container}>*/}
//                 <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={() => props.navigation.navigate('AddCourseScreen')}
//                     >
//                     <Icon
//                         name='plus'
//                         color='red'
//                         size={30}
//                         // style={{padding: 20}}
//                     />
//                 </TouchableOpacity>
//         {/*</View>*/}

//     </View>
// )
// }




import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import YoutubeIframe, { getYoutubeMeta } from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from '../../firebase/config'
import Icon from "react-native-vector-icons/Feather";
import sharedStyles from "../sharedStyles";

// const courseSeries = [
//     "DC471a9qrU4",
//     "tVCYa_bnITg", 
//     "K74l26pE4YA",
//     "m3OjWNFREJo",
//   ];

export default function CourseContentScreen(props) {
  const [modalVisible, showModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [progress, setProgress] = useState(0);


  const courseSeries = props.route.params.courseData;
  console.log(courseSeries);

  const onVideoPress = useCallback((videoId) => {
    showModal(true);
    setSelectedVideo(videoId);
  }, []);

  useEffect(() => {
    getProgress().then((p) => {
      setProgress(p);
    });
  }, [modalVisible]);



  const closeModal = useCallback(() => showModal(false), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
                 <View style={{flexDirection: 'row', alignItems: 'center',marginTop: 40}}>
           <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto'}}
                onPress={() => props.navigation.goBack()}>
                <Icon
                    name='chevron-left'
                    color='black'
                    size={36}
                    style={{paddingLeft: 8, paddingRight: 20}}
                />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1}}>
              {props.route.params.courseName}
            </Text>
            {/* <ProgressBar progress={progress * 100} /> */}
          </View>
           <FlatList
        contentContainerStyle={{ marginVertical: 16 }}

           ListHeaderComponent={""}
        data={courseSeries}
        renderItem={({ item }) => (
          <VideoItem videoId={item} onPress={onVideoPress} />
        )}
        keyExtractor={(item) => item}
      /> 
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        onRequestClose={closeModal}
      >
        <VideoModal videoId={selectedVideo} onClose={closeModal} />
    
      </Modal>
    </SafeAreaView>
  );
};

const getProgress = async () => {
  const total = courseSeries.length;
  let completed = 0;
  for (let i = 0; i < total; i++) {
    const videoId = courseSeries[i];
    const status = await getVideoProgress(videoId);
    if (status?.completed) {
      completed += 1;
    }
  }
  return completed / total;
};

// const ProgressBar = ({ progress }) => {
//   const width = (progress || 0) + "%";
//   return (
//     <View style={{ borderWidth: 1, marginVertical: 16 }}>
//       <View
//         style={{
//           backgroundColor: "green",
//           height: 10,
//           width,
//         }}
//       />
//     </View>
//   );
// };

const VideoItem = ({ videoId, onPress }) => {
  const [videoMeta, setVideoMeta] = useState(null);
  useEffect(() => {
    getYoutubeMeta(videoId).then((data) => {
      setVideoMeta(data);
    });
  }, [videoId]);

  if (videoMeta) {
    return (
      <TouchableOpacity
        onPress={() => onPress(videoId)}
        style={{ flexDirection: "row", margin: 16, marginVertical: 8, elevation: 3, backgroundColor: 'white', padding: 8, borderRadius:12 }}
      >
        <Image
          source={{ uri: videoMeta.thumbnail_url }}
          style={{
            width: videoMeta.thumbnail_width / 4,
            height: videoMeta.thumbnail_height / 4,
            borderRadius: 6
          }}
        />
        <View style={{ justifyContent: "center", marginStart: 16 }}>
          <Text style={{ marginVertical: 4, fontWeight: "bold" }}>
            {videoMeta.title}
          </Text>
          <Text>{videoMeta.author_name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};

const VideoModal = ({ videoId, onClose }) => {
  const playerRef = useRef(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      playerRef.current?.getCurrentTime().then((data) => {
        saveVideoProgress({
          videoId,
          completed,
          timeStamp: data,
        });
      });
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [videoId, completed]);

  const onPlayerReady = useCallback(() => {
    getVideoProgress(videoId).then((data) => {
      if (data.timeStamp) {
        playerRef.current?.seekTo(data.timeStamp);
      }
    });
  }, [videoId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000dd",
        justifyContent: "center",
      }}
    >
      <View style={{ backgroundColor: "white", padding: 16 }}>
        <Text onPress={onClose} style={{ textAlign: "right" }}>
          Close
        </Text>
        <YoutubeIframe
          ref={playerRef}
          play={true}
          videoId={videoId}
          height={250}
          onReady={onPlayerReady}
          onChangeState={(state) => {
            if (state === "ended") {
              setCompleted(true);
            }
          }}
        />
      </View>
    </View>
  );
};

const saveVideoProgress = ({ videoId, completed, timeStamp }) => {
  const data = {
    completed,
    timeStamp,
  };

  return AsyncStorage.setItem(videoId, JSON.stringify(data));
};

const getVideoProgress = async (videoId) => {
  const json = await AsyncStorage.getItem(videoId);
  if (json) {
    return JSON.parse(json);
  }
  return {
    completed: false,
    timeStamp: 0,
  };
};

// export default CourseContentScreen;
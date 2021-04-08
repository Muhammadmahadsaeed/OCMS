import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, FlatList, TouchableOpacity, Text } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';

const Gallery = ({ selectImageFromChat }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    console.log('camera');
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
    })
      .then((res) => {

        setData(res.edges);
        // this.setState({data: res.edges});
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getImage = (uri) => {
    selectImageFromChat(uri)
  }

  return (
    <View>

      <FlatList
        style={[styles.bottomToolbar, styles.galleryContainer]}
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => getImage(item.node.image.uri)}>
            <Image
              style={styles.galleryImage}
              source={{ uri: item.node.image.uri }}
            />
          </TouchableOpacity>

        )}
      />

    </View>
  );
};
export default Gallery;

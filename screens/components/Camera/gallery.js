import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, FlatList} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';

const Gallery = ({captures = []}) => {
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
  return (
    <View>
      <FlatList
        style={[styles.bottomToolbar, styles.galleryContainer]}
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image
            style={styles.galleryImage}
            source={{uri: item.node.image.uri}}
          />
        )}
      />
    </View>
  );
};
export default Gallery;

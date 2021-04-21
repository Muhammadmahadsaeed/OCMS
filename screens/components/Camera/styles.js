import {StyleSheet, Dimensions} from 'react-native';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

export default StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection:'column',
    justifyContent: 'space-between',
  },
  header: {
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerImageView: {
    height: 50,
    width: 40,
  },

  imgView: {
    flex: 1,
    // height: winHeight - 300,
    backgroundColor:'red'
  },
  bottomView: {
    flex:1,
    backgroundColor: 'orange',
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF',
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
  galleryContainer: {
    bottom: 100,
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
  },
  galleryImage: {
    width: 75,
    height: 75,
  },
});

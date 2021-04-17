1. menual configuation for camera
    - android/app/src/main/AndroidManifest.xml
    + <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    + <uses-permission android:name="androidpermissionREAD_EXTERNAL_STORAGE" />
   - android/app/build.gradle
   +  defaultConfig { 
        ... 
        missingDimensionStrategy 'react-native-camera', 'general' 
        }


https://stackoverflow.com/questions/56414770/select-multi-image-from-gallery-for-send-to-server-with-react-native/56422818

https://stackoverflow.com/questions/49361166/handle-multiselect-in-a-gridview
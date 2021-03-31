1. menual configuation for camera
    - android/app/src/main/AndroidManifest.xml
    + <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    + <uses-permission android:name="androidpermissionREAD_EXTERNAL_STORAGE" />
   - android/app/build.gradle
   +  defaultConfig { 
        ... 
        missingDimensionStrategy 'react-native-camera', 'general' 
        }

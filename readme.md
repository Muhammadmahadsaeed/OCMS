1. menual configuation for camera
    - android/app/src/main/AndroidManifest.xml
    + <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    + <uses-permission android:name="androidpermissionREAD_EXTERNAL_STORAGE" />
   - android/app/build.gradle
   +  defaultConfig { 
        ... 
        missingDimensionStrategy 'react-native-camera', 'general' 
        }

<!-- drawer start -->
2. for drawer
   - import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
   - import com.facebook.react.ReactActivityDelegate;
   - import com.facebook.react.ReactRootView;   

     @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
        };
    } 

<!-- drawer end -->

https://stackoverflow.com/questions/56414770/select-multi-image-from-gallery-for-send-to-server-with-react-native/56422818

https://stackoverflow.com/questions/49361166/handle-multiselect-in-a-gridview
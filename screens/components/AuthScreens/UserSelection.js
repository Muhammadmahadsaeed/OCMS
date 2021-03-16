import React from 'react';

import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const UserSelection = (props) => {
  const {
    navigationState,
    navigation,
    activeTintColor,
    inactiveTintColor,
  } = props;
  const activeTabIndex = navigation.state.index;

  return (
    <View style={styles.paymentContainer}>
      <View style={styles.paymentText}>
        <Text style={{color: '#81b840', fontSize: 20}}>Pay it forward </Text>
     
      </View>
      <View style={styles.paymentButton}>
        {navigationState.routes.map((route, index) => {
          const isRouteActive = index === activeTabIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(route.routeName)}
              key={index}>
              <View>
                <Text
                  style={[
                    styles.paymentButtonText,
                    {
                      backgroundColor: `${isRouteActive ? '#81b840' : 'white'}`,
                      color: `${tintColor}`,
                    },
                  ]}>
                  {' '}
                  {route.routeName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  paymentContainer: {
    marginTop: 10,
    height: '20%',
    width: '100%',

  },
  paymentButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20,
  },
  paymentButtonText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  paymentText: {
    marginTop: 10,
    alignItems: 'center',
  },
  footer: {
    flex: 0.4,
    backgroundColor: '#e9ba00',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
export default UserSelection;

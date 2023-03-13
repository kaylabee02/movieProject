import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Movie(): JSX.Element  {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>I am Movie </Text>
      {/* <Button
        title="Go Home"
        onPress={() => navigation.navigate('Home')}
      /> */}
    </View>
  );
}

export default Movie;
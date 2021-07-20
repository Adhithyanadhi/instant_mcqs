import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import faculty from '../screens/faculty';
import home from '../screens/home';
import student from '../screens/student';
import register from '../screens/register';
import login from '../screens/login';
import qp from '../screens/qp';
import results from '../screens/results';


const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
	    <Stack.Navigator
            initialRouteName='home'
	        screenOptions={{
            gestureEnabled: true
        }}>
        <Stack.Screen name="home" component={home} options={{ title: 'Home' }} />
        <Stack.Screen name="faculty" component={faculty} options={{ title: 'Faculty' }} />
        <Stack.Screen name="results" component={results} options={{ title: 'Results' }} />
        <Stack.Screen name="qp" component={qp} options={{ title: 'Create QP' }} />
        <Stack.Screen name="login" component={login} options={{ title: 'Login' }} />
        <Stack.Screen name="register" component={register} options={{ title: 'Register' }} />
        <Stack.Screen name="student" component={student} options={{ title: 'Back' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
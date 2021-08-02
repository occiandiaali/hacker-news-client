import React, {useState, useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import AboutMeScreen from './src/screens/AboutMeScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import SplashScreen from './src/screens/SplashScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import UserAuth from './src/auth/UserAuth';

import AppContext from './src/contexts/AppContext';

const Stack = createStackNavigator();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f9f6bb',
  },
};

export default function App() {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoggedIn = () =>
    isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
  const userSettings = {
    email: email,
    password: password,
    isLoggedIn: isLoggedIn,
    setUserEmail,
    setUserPassword,
    toggleLoggedIn,
  };

  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              elevation: 3,
              backgroundColor: '#f4511e',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="Accounts"
            component={UserAuth}
            options={{
              title: 'Accounts',
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Easy Hacker News',
              headerLeft: () => (
                <Image
                  style={{width: 50, height: 50, marginLeft: 13}}
                  source={require('./src/res/images/ehn_logo.png')}
                />
              ),
            }}
          />
          <Stack.Screen
            name="About"
            component={AboutMeScreen}
            options={{
              title: 'About Me',
            }}
          />
          <Stack.Screen
            name="Article"
            component={ArticleScreen}
            options={({route}) => ({
              headerTitle: route.params.article.title,
            })}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{title: 'UserProfile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

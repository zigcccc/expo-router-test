import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import * as Font from 'expo-font';
import { SplashScreen, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Provider } from 'react-redux';

import useEffectOnce from 'react-use/lib/useEffectOnce';

import colors from 'tailwindcss/colors';

import { store } from 'services';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'home',
};

export default function Layout() {
  const { width } = useWindowDimensions();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        merriweatherBold: require('../assets/fonts/MerriweatherSans-Bold.ttf'),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffectOnce(() => {
    loadFonts();
  });

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <Drawer
        screenOptions={{ headerShown: false, swipeEnabled: false, drawerStyle: { width: width * 0.9 } }}
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItem
              focused={path === '/home'}
              activeTintColor={colors.green['500']}
              label="Home"
              onPress={() => props.navigation.navigate('home')}
            />
            <DrawerItem label="Modal" onPress={() => props.navigation.navigate('modal')} />
            <DrawerItem label="Sitemap" onPress={() => props.navigation.navigate('_sitemap')} />
          </DrawerContentScrollView>
        )}
      />
    </Provider>
  );
}

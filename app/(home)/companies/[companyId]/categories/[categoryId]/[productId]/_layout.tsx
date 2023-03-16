import { Octicons as Icon } from '@expo/vector-icons';
import { Tabs, useNavigation, useSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import colors from 'tailwindcss/colors';

import { useGetProductQuery } from 'services/api';

const ProductTabsLayout = () => {
  const navigation = useNavigation();
  const { productId } = useSearchParams();
  const { data } = useGetProductQuery(Number(productId));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.productName || 'Loading...',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
          <Icon name="x" size={18} color="black" />
        </Pressable>
      ),
    });
  }, [data?.productName, navigation]);

  return (
    <>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.green[600] }} initialRouteName="index">
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Details',
            tabBarIcon: ({ color }) => <Icon name="book" size={18} color={color} />,
          }}
        />
        <Tabs.Screen
          name="details"
          options={{
            tabBarLabel: 'Details',
            tabBarIcon: ({ color }) => <Icon name="checklist" size={18} color={color} />,
          }}
        />
      </Tabs>
      <Pressable
        onPress={() => {
          console.log('Add it to the Cart!');
        }}
        className="p-4 mt-4 bg-green-300 rounded-sm items-center absolute bottom-24 left-4 right-4"
      >
        <Text className="text-green-700 font-bold">Add to Cart (€{data?.productPrice.taxIncludedAmount})</Text>
      </Pressable>
    </>
  );
};

export default ProductTabsLayout;

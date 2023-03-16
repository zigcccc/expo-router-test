import { Octicons as Icon } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Stack, useNavigation, usePathname } from 'expo-router';
import { Pressable, Text } from 'react-native';

const HomeLayout = () => {
  const navigation = useNavigation();
  const path = usePathname();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Stack
      screenOptions={{
        headerLeft: () => {
          if (path === '/home') {
            return (
              <Pressable onPress={handleOpenDrawer}>
                <Icon name="three-bars" size={18} color="black" />
              </Pressable>
            );
          }

          return (
            <Pressable
              className="flex-row items-center"
              onPress={navigation.goBack}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <Icon name="arrow-left" size={18} color="black" />
              <Text className="ml-2">Back</Text>
            </Pressable>
          );
        },
      }}
    >
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
              <Icon name="x" size={18} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="companies/[companyId]/categories/[categoryId]/[productId]"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
};

export default HomeLayout;

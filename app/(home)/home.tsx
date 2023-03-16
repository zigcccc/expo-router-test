import { Octicons as Icon } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { View, Text, FlatList, Pressable } from 'react-native';

import { useGetCompaniesQuery } from 'services/api/companies';

const Home = () => {
  const { data, isLoading, isError } = useGetCompaniesQuery();

  if (isError) {
    return (
      <View>
        <Text>Error while trying to load the companies...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Expo Router',
          headerRight: () => (
            <Link className="pr-4" href="/modal">
              <Icon name="share" size={18} color="black" />
            </Link>
          ),
        }}
      />
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data.content}
            renderItem={({ item }) => (
              <Link key={item.id} href={`/companies/${item.id}`} asChild>
                <Pressable>
                  <View className="p-4 bg-white my-2">
                    <Text className="font-medium">{item.companyName}</Text>
                  </View>
                </Pressable>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default Home;

import { Octicons as Icon } from '@expo/vector-icons';
import { Link, Stack, useSearchParams } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useGetCategoriesForCompanyQuery } from 'services/api/categories';
import { useGetCompanyQuery } from 'services/api/companies';

const CompanyPage = () => {
  const { companyId } = useSearchParams();
  const { data: company, isLoading: isLoadingCompany, isUninitialized } = useGetCompanyQuery(Number(companyId));
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesForCompanyQuery(Number(companyId), {
    skip: !companyId,
  });

  const isLoading = isLoadingCategories || isLoadingCompany || isUninitialized;

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Loading company data...' }} />
        <View>
          <Text>Loading...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: company.companyName }} />
      <View className="p-4">
        <Text className="text-2xl font-bold">{company.companyName}</Text>
        <Text>
          {company.postCode}, {company.postName}
        </Text>
        <View className="mt-4">
          <Text className="text-large font-bold">Categories:</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <Link key={item.id} href={`/companies/${company.id}/categories/${item.id}`} asChild>
                <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
                  <View className="p-4 bg-white my-2 flex-row justify-between items-center">
                    <Text className="font-medium">{item.categoryName}</Text>
                    <Icon name="arrow-right" size={22} color="black" />
                  </View>
                </Pressable>
              </Link>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default CompanyPage;

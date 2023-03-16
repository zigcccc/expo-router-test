import { Octicons as Icon } from '@expo/vector-icons';
import { Link, Stack, useNavigation, useSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';

import useEffectOnce from 'react-use/lib/useEffectOnce';

import colors from 'tailwindcss/colors';

import { useGetCategoriesForCompanyQuery, useLazyGetProductsForCompanyQuery } from 'services/api';

const CategoryPage = () => {
  const navigation = useNavigation();
  const { categoryId, companyId } = useSearchParams();
  const { data: categories, isLoading } = useGetCategoriesForCompanyQuery(Number(companyId));

  const [getProducts, { data: products, isLoading: isLoadingProducts }] = useLazyGetProductsForCompanyQuery();

  const category = useMemo(() => {
    if (categories) {
      return categories.find((category) => category.id === Number(categoryId));
    }
  }, [categoryId, categories]);

  const handleRefresh = () => {
    getProducts({ page: 0, companyId: Number(companyId), forceRefresh: true }, false);
  };

  const handlePageEndReached = () => {
    if (products?.last) {
      return;
    }

    const currentPage = products.pageable?.pageNumber || 0;

    getProducts({ companyId: Number(companyId), page: currentPage + 1 });
  };

  useEffectOnce(() => {
    getProducts({ companyId: Number(companyId), page: 0 });
  });

  if (isLoading || !category) {
    return (
      <>
        <Stack.Screen options={{ title: 'Loading category data...' }} />
        <View>
          <Text>Loading...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: category.categoryName,
          headerLeft: () => (
            <Pressable
              className="flex-row items-center"
              onPress={navigation.goBack}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <Icon name="arrow-left" size={18} color="black" />
              <Text className="ml-2">Back</Text>
            </Pressable>
          ),
        }}
      />
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold">{category.categoryName}</Text>
        <Text>Num of products: {category.productCount}</Text>
        <View className="mt-4 flex-1">
          <Text className="text-large font-bold">Products:</Text>
          {isLoadingProducts ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              refreshing={isLoadingProducts}
              onRefresh={handleRefresh}
              onEndReached={handlePageEndReached}
              keyExtractor={(item) => `product-${item.id}`}
              className="flex-1"
              data={products?.content || []}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View key={item.id} className="my-2">
                  <View className="py-2">
                    <Text className="font-bold mb-1">{item.productName}</Text>
                    <Text numberOfLines={2}>{item.productDescription}</Text>
                    <Link href={`/companies/${companyId}/categories/${categoryId}/${item.id}`} asChild>
                      <Pressable className="flex-row p-3 bg-slate-200 items-center justify-center mt-2">
                        <Text className="mr-3 text-slate-500 font-semibold">More</Text>
                        <Icon name="arrow-right" size={16} color={colors.slate['500']} />
                      </Pressable>
                    </Link>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default CategoryPage;

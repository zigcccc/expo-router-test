import { useSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { useGetProductQuery } from 'services/api';

const ProductPage = () => {
  const { productId } = useSearchParams();
  const { data: product, isLoading } = useGetProductQuery(Number(productId));

  if (isLoading) {
    return (
      <>
        <View>
          <Text>Loading...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold">{product.productName}</Text>
        <Text className="text-sm">{product.productDescription}</Text>
      </View>
    </>
  );
};

export default ProductPage;

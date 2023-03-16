import { useSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { useGetProductQuery } from 'services/api';

const ProductDetailsPage = () => {
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
        <Text className="text-2xl font-bold">Details of {product.productName}</Text>
        <View className="py-2">
          <Text className="text-sm font-semibold">Product origin</Text>
          <Text className="text-sm">{product.origin}</Text>
        </View>
        <View className="py-2">
          <Text className="text-sm font-semibold">Product producer</Text>
          <Text className="text-sm">{product.producer.producerName}</Text>
        </View>
      </View>
    </>
  );
};

export default ProductDetailsPage;

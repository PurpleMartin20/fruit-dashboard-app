
import { useEffect, useState } from 'react';
import { Text } from '@/components/ui/text';

import api from '../../srev/api';
import AddFruitForm from '@/components/fruit/AddFruitForm';

import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';

import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';

interface Fruit {
  id: number;
  name: string;
}

interface FruitsResponse {
  fruits: Fruit[];
}

const FruitList = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const toast = useToast();

  const fetchFruits = async (): Promise<void> => {
    try {
      const response = await api.get<FruitsResponse>('/fruits');
      setFruits(response.data.fruits);
    } catch (error) {
      console.error('Error fetching fruits', error);
    }
  };

  const addFruit = async (fruitName: string): Promise<void> => {
    try {
      await api.post('/fruits', { name: fruitName });

      toast.show({
        placement: 'bottom right',
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success">
            <ToastTitle>Success!</ToastTitle>
            <ToastDescription>
              {fruitName} added successfully.
            </ToastDescription>
          </Toast>
        ),
      });

      await fetchFruits();

    } catch (error) {
      toast.show({
        placement: 'bottom right',
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              Could not add fruit.
            </ToastDescription>
          </Toast>
        ),
      });

      console.error('Error adding fruit', error);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  return (
    <>
      <AddFruitForm addFruit={addFruit} />

      <Center className="flex h-screen">
        <Card>
          <VStack space="xl" className="py-2">
            <Heading>Fruit List</Heading>

            <Box>
              {fruits.map((fruit) => (
                <Text key={fruit.id} testID={fruit.name}>
                  {fruit.name}
                </Text>
              ))}
            </Box>
          </VStack>
        </Card>
      </Center>

    </>
  );
};

export default FruitList;

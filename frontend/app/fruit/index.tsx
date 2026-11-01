
import { useEffect, useState } from 'react';
import { Text } from '@/components/ui/text';

import api from '../../services/api';
import AddFruitForm from '@/components/fruit/AddFruitForm';

import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Grid, GridItem } from '@/components/ui/grid';
import { HStack } from '@/components/ui/hstack';



import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';

interface Fruit {
  id: number;
  name: string;
  price: number;
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

  const addFruit = async (name: string, price: number): Promise<void> => {
    try {
      await api.post('/fruits', {
        name: name.trim(),
        price: price,
      });

      toast.show({
        placement: 'bottom right',
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success">
            <ToastTitle>Success!</ToastTitle>
            <ToastDescription>
              {name} added successfully.
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
      <Grid className="gap-4" _extra={{ className: 'grid-cols-5' }}>
        <GridItem _extra={{ className: 'col-span-3' }}>
          <Center className="flex h-screen">
            <Card>
              <VStack space="xl" className="py-2">
                <Heading>Fruit List</Heading>
                <Box className=" rounded-md  p-5" >
                  {fruits.map((fruit) => (
                    <Box className="bg-muted p-12 rounded-md">
                      <Text className="text-primary-foreground" key={fruit.id}>
                        {fruit.name} - ${fruit.price.toFixed(2)}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </VStack>
            </Card>
          </Center>
        </GridItem>
        <GridItem _extra={{ className: 'col-span-2' }}>
          <AddFruitForm addFruit={addFruit} />
        </GridItem>

      </Grid>


    </>
  );
};

export default FruitList;

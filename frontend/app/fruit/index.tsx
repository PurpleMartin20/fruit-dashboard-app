
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
import { Image } from '@/components/ui/image';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';



import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';

interface Fruit {
  _id: string;
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
        placement: 'top',
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
        placement: 'top',
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


  const handleBuy = (fruit: Fruit) => {
    toast.show({
      placement: 'top',
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} action="success" variant="solid">
          <VStack space="xs">
            <ToastTitle>Purchase Successful!</ToastTitle>
            <ToastDescription>
              You bought {fruit.name} for ${fruit.price.toFixed(2)}.
            </ToastDescription>
          </VStack>
        </Toast>
      ),
    });
  };



  return (
    <>
      <Grid className="gap-4" _extra={{ className: 'grid-cols-5' }}>
        <GridItem key="fruit-form" _extra={{ className: 'col-span-3' }}>
          <Center className="flex h-screen">
            <Card className=" ">
              <VStack space="xl" className="py-2">
                <Center>
                  <Box>
                    <Heading> Fruit </Heading>
                  </Box>
                </Center>
                <Box className=" rounded-md  p-5" >
                  <Grid className="gap-4" _extra={{ className: 'grid-cols-5' }}>
                    {fruits.map((fruit) => (
                      <GridItem key={fruit._id} _extra={{ className: 'rows-span-1' }}>
                        <Card className="bg-muted p-1 rounded-md ">
                          <Image
                            source={{
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVFtcUjPx2GGJXQ8Gsw4qClcitE3gRrbVSVDwo3BtmPw&s=10',
                            }}
                            className=" h-[240px] w-full rounded-md aspect-[263/240]"
                            alt={fruit._id}
                          />

                          <Heading className="text-white text-center" key={fruit.id}>
                            {fruit.name}
                          </Heading >
                          <Text className="text-purple-300 text-center" key={fruit.id}>
                            Price - ${fruit.price.toFixed(2)}
                          </Text>
                          <Button className="bg-green-700" variant="default" size="default" onPress={() => handleBuy(fruit)} >
                            <ButtonText>Buy</ButtonText>
                          </Button>
                          <Text className="text-primary-foreground">
                            ID: {fruit._id}
                          </Text>
                        </Card>
                      </GridItem>
                    ))}

                  </Grid>
                </Box>
              </VStack>
            </Card>
          </Center>
        </GridItem>
        <GridItem key="add-fruit-form" _extra={{ className: 'col-span-2' }}>
          <AddFruitForm addFruit={addFruit} />
        </GridItem>

      </Grid >


    </>
  );
};

export default FruitList;

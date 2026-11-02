
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
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
import { Badge, BadgeText } from '@/components/ui/badge';
import { HStack } from '@/components/ui/hstack';
import { ScrollView } from '@/components/ui/scroll-view';
import { TrashIcon } from '@/components/ui/icon';
import { FruitStatus, FRUIT_STATUS_UI } from '@/constants/FruitStatus';



import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';

interface Fruit {
  id: number;
  name: string;
  price: number;
  status: FruitStatus;
}

const FruitList = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const toast = useToast();
  const { height } = useWindowDimensions();

  const fetchFruits = async (): Promise<void> => {
    try {
      const response = await api.get<Fruit[]>('/fruits');
      setFruits(response.data);
    } catch (error) {
      console.error('Error fetching fruits', error);
    }
  };

  const addFruit = async (name: string, price: number, status: FruitStatus): Promise<void> => {
    try {
      await api.post('/fruits', {
        name: name.trim(),
        price: price,
        status: status,
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


  const handleBuy = async (fruit: Fruit): Promise<void> => {
    try {
      const response = await api.patch<Fruit>(`/fruits/${fruit.id}/buy`);

      // swap in the updated fruit so its status (and UI) changes right away
      setFruits((prev) => prev.map((f) => (f.id === fruit.id ? response.data : f)));

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
    } catch (error) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              {fruit.name} is not available.
            </ToastDescription>
          </Toast>
        ),
      });

      console.error('Error buying fruit', error);
    }
  };

  const handleDelete = async (fruit: Fruit): Promise<void> => {
    try {
      await api.delete(`/fruits/${fruit.id}`);

      setFruits((prev) => prev.filter((f) => f.id !== fruit.id));

      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success">
            <ToastTitle>Deleted</ToastTitle>
            <ToastDescription>
              {fruit.name} was removed.
            </ToastDescription>
          </Toast>
        ),
      });
    } catch (error) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              Could not delete {fruit.name}.
            </ToastDescription>
          </Toast>
        ),
      });

      console.error('Error deleting fruit', error);
    }
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
                {/* cap the height so the fruit grid scrolls instead of growing past the screen */}
                <ScrollView style={{ maxHeight: height * 0.75 }}>
                <Box className=" rounded-md  p-5" >
                  {fruits.length === 0 && (
                    <Center className="py-20">
                      <Text className="text-muted-foreground">
                        No fruits yet — add one using the form.
                      </Text>
                    </Center>
                  )}
                  <Grid className="gap-4" _extra={{ className: 'grid-cols-5' }}>
                    {fruits.map((fruit) => {
                      const statusUI = FRUIT_STATUS_UI[fruit.status];

                      return (
                      <GridItem key={fruit.id} _extra={{ className: 'rows-span-1' }}>
                        <Card className={`bg-muted p-1 rounded-md ${statusUI.canBuy ? '' : 'opacity-60'}`}>
                          <Image
                            source={{
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVFtcUjPx2GGJXQ8Gsw4qClcitE3gRrbVSVDwo3BtmPw&s=10',
                            }}
                            className=" h-[240px] w-full rounded-md aspect-[263/240]"
                            alt={fruit.name}
                          />

                          <Badge className={`self-center my-1 ${statusUI.badgeClass}`}>
                            <BadgeText className="text-white">{statusUI.label}</BadgeText>
                          </Badge>

                          <Heading className="text-white text-center" >
                            {fruit.name}
                          </Heading >
                          <Text className="text-purple-300 text-center" >
                            Price - ${fruit.price.toFixed(2)}
                          </Text>
                          <Button
                            className={statusUI.canBuy ? 'bg-green-700' : 'bg-gray-600'}
                            variant="default"
                            size="default"
                            isDisabled={!statusUI.canBuy}
                            onPress={() => handleBuy(fruit)}
                          >
                            <ButtonText>{statusUI.canBuy ? 'Buy' : statusUI.label}</ButtonText>
                          </Button>
                          <HStack className="items-center justify-between">
                            <Text className="text-primary-foreground">
                              ID: {fruit.id}
                            </Text>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1"
                              onPress={() => handleDelete(fruit)}
                            >
                              <ButtonIcon as={TrashIcon} className="text-red-500" />
                            </Button>
                          </HStack>
                        </Card>
                      </GridItem>
                      );
                    })}

                  </Grid>
                </Box>
                </ScrollView>
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


import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { AddIcon } from '../ui/icon';

interface AddFruitFormProps {
  addFruit: (fruitName: string, fruitPrice: number) => void;
}

const AddFruitForm = ({ addFruit }: AddFruitFormProps) => {
  const [fruitName, setFruitName] = useState('');
  const [fruitPrice, setFruitPrice] = useState('');

  const handleSubmit = () => {
    const price = parseFloat(fruitPrice);

    if (fruitName.trim() && fruitPrice.trim() && !isNaN(price) && price >= 0) {
      addFruit(fruitName.trim(), price);

      setFruitName('');
      setFruitPrice('');
    }
  };

  return (
    <Center className="flex h-screen">
      <Card>
        <VStack space="xl" className="py-2">
          <Center>
            <Box>
              <Heading>Add Fruit </Heading>
            </Box>
          </Center>

          <Input>
            <InputField
              placeholder="Fruit name"
              value={fruitName}
              onChangeText={setFruitName}
            />
          </Input>

          <Input>
            <InputField
              placeholder="Fruit price (e.g. 2.99)"
              value={fruitPrice}
              onChangeText={setFruitPrice}
              keyboardType="decimal-pad"
            />
          </Input>

          <Box className="px-10">
            <HStack space="xl">
              <Button
                className="px-10"
                size="default"
                onPress={handleSubmit}
              >
                <ButtonIcon as={AddIcon} />
                <ButtonText>ADD</ButtonText>

              </Button>
            </HStack>
          </Box>
        </VStack>
      </Card>
    </Center>
  );
};

export default AddFruitForm;

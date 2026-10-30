
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
  addFruit: (fruit: string) => void;
}

const AddFruitForm = ({ addFruit }: AddFruitFormProps) => {
  const [fruitName, setFruitName] = useState('');

  const handleSubmit = () => {
    if (fruitName.trim()) {
      addFruit(fruitName.trim());
      setFruitName('');
    }
  };

  return (
    <Center className="flex h-screen">
      <Card>
        <VStack space="xl" className="py-2">
          <Center>
            <Box>
              <Heading>TEST</Heading>
            </Box>
          </Center>

          <Input>
            <InputField
              placeholder="Fruit name"
              value={fruitName}
              onChangeText={setFruitName}
            />
          </Input>

          <Box className="px-10">
            <HStack space="xl">
              <Button
                className="px-10"
                size="default"
                onPress={handleSubmit}
              >
                <ButtonIcon as={AddIcon}/>
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

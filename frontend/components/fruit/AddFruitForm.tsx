import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import { AddIcon, ChevronDownIcon } from '../ui/icon';
import { FruitStatus, FRUIT_STATUSES, FRUIT_STATUS_UI } from '@/constants/FruitStatus';

interface AddFruitFormProps {
  addFruit: (fruitName: string, fruitPrice: number, status: FruitStatus) => void;
}

const AddFruitForm = ({ addFruit }: AddFruitFormProps) => {
  const [fruitName, setFruitName] = useState('');
  const [fruitPrice, setFruitPrice] = useState('');
  const [status, setStatus] = useState<FruitStatus>(FruitStatus.AVAILABLE);

  const handleSubmit = () => {
    const price = parseFloat(fruitPrice);

    if (fruitName.trim() && fruitPrice.trim() && !isNaN(price) && price >= 0) {
      addFruit(fruitName.trim(), price, status);

      setFruitName('');
      setFruitPrice('');
      setStatus(FruitStatus.AVAILABLE);
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

          <VStack space="sm">
            <Text>Status</Text>
            {/* Select values are strings, so convert to/from the enum number */}
            <Select
              selectedValue={String(status)}
              initialLabel={FRUIT_STATUS_UI[status].label}
              onValueChange={(value) => setStatus(Number(value) as FruitStatus)}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select status" className="flex-1" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {FRUIT_STATUSES.map((s) => (
                    <SelectItem key={s} label={FRUIT_STATUS_UI[s].label} value={String(s)} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>

          <Center>
            <Button
              className="px-10"
              size="default"
              onPress={handleSubmit}
            >
              <ButtonIcon as={AddIcon} />
              <ButtonText>ADD</ButtonText>
            </Button>
          </Center>
        </VStack>
      </Card>
    </Center>
  );
};

export default AddFruitForm;

import { Search2Icon } from '@chakra-ui/icons';
import {
  Heading,
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Input,
  Center,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import BoxServices from './components/BoxServices';
import CardsServices from './components/CardServices';

export const CategoriesPage: React.FC = () => {
  const { t } = useTranslation('PageCategories');
  return (
    <Box p={4}>
      <Center>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="gray.300" />}
              />
              <Input
                placeholder="Search Services"
                size="md"
                htmlSize={100}
                width="auto"
                type="search"
              />
            </InputGroup>
          </Heading>
          <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
            {t('Find the best services from highly qualified specialists.')}
          </Text>
        </Stack>
      </Center>
      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <CardsServices />
          <BoxServices />
          <CardsServices />
          <BoxServices />
        </Flex>
      </Container>
    </Box>
  );
};

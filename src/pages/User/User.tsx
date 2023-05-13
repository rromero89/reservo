import {
  Box,
  Container,
  Stack,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { withWalletProtection } from '../../features/wallet/hocs/withWalletProtection';

import { Header } from './components/Header';

export const UserPage: React.FC = withWalletProtection(() => {
  const { t } = useTranslation('PageUser');
  return (
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <Header />
        <Box>
          <br />
          <Text fontSize="lg" as="b">
            {t('User data profile')}
          </Text>
          <br />
          <Tabs>
            <TabList>
              <Tab>{t('Profile')}</Tab>
              <Tab>{t('Services')}</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>
                  {t('Username')}
                  <Input placeholder="username" />
                </p>
                <br />
                <p>
                  {t('Name')}
                  <Input placeholder="name" />
                </p>
                <br />
                <p>
                  {t('Email')}
                  <Input placeholder="email" />
                </p>
                <br />
                <p>
                  <Button colorScheme="blue" size="md">
                    {t('Save')}
                  </Button>
                </p>
              </TabPanel>
              <TabPanel>
                <p>{t('Services')}</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
});

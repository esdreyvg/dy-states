import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context/AuthProvider';
import { I18nProvider } from '@/context/I18nProvider';
import AppNavigator from '@/navigation/AppNavigator';
import { theme } from '@/utils/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <AuthProvider>
            <PaperProvider theme={theme}>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </PaperProvider>
          </AuthProvider>
        </I18nProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
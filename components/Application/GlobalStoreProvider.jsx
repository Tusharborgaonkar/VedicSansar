'use client'
import { persistor, store } from '@/store/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './Loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();
const GlobalStoreProvider = ({children}) => {
  return (
    <div className="min-w-0 overflow-x-clip">
      <QueryClientProvider client={queryClient}>
        <Provider store={store} >
          <PersistGate persistor={persistor} loading={<Loading />}>
              {children}
          </PersistGate>
        </Provider>
        <Suspense fallback={null}>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
            position="bottom"
          />
        </Suspense>
      </QueryClientProvider>
    </div>
  )
}

export default GlobalStoreProvider

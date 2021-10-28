import React from 'react'
import { QueryClient, QueryClientProvider} from 'react-query'
import { AppRouter } from './router/AppRouter'

const queryClient = new QueryClient();


export const ConcesionariasApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    )
}

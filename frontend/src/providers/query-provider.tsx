/**
 * Provider React Query avec configuration optimisée
 */

"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"
import { APP_CONFIG } from "@/config/app-config"

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: APP_CONFIG.QUERY_STALE_TIME,
            gcTime: APP_CONFIG.QUERY_CACHE_TIME,
            retry: APP_CONFIG.QUERY_RETRY_COUNT,
            retryDelay: APP_CONFIG.QUERY_RETRY_DELAY,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

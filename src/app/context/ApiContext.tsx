import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface PendingRequest {
  url: string;
  resolvedPromise: Promise<Response>;
}

interface ApiContextType {
  isGlobalLoading: boolean;
  activeRequests: Map<string, Promise<Response>>;
  dedupeRequest: (url: string, fetcher: () => Promise<Response>) => Promise<Response>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const activeRequests = useRef<Map<string, Promise<Response>>>(new Map());

  const dedupeRequest = useCallback(
    async (url: string, fetcher: () => Promise<Response>): Promise<Response> => {
      // Check if a request is already in flight for this URL
      if (activeRequests.current.has(url)) {
        console.log('[api-dedupe] Request already in flight, using cached promise', { url });
        return activeRequests.current.get(url)!;
      }

      setIsGlobalLoading(true);
      const promise = fetcher()
        .then((response) => {
          activeRequests.current.delete(url);
          setIsGlobalLoading(activeRequests.current.size > 0);
          return response;
        })
        .catch((error) => {
          activeRequests.current.delete(url);
          setIsGlobalLoading(activeRequests.current.size > 0);
          throw error;
        });

      activeRequests.current.set(url, promise);
      return promise;
    },
    []
  );

  return (
    <ApiContext.Provider value={{ isGlobalLoading, activeRequests: activeRequests.current, dedupeRequest }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within ApiProvider');
  }
  return context;
};

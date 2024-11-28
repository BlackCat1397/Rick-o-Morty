import { useState, useCallback } from 'react';

export const useRefresh = (onRefresh: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    onRefresh().finally(() => setIsRefreshing(false));
  }, [onRefresh]);

  return({
    isRefreshing,
    handleRefresh,
  });
};

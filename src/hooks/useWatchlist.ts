import { useState, useEffect } from 'react';
import { WatchlistItem } from '../types';
import { SEED_WATCHLIST } from '../constants';

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>(() => {
    const saved = localStorage.getItem('northstar_watchlist');
    return saved ? JSON.parse(saved) : SEED_WATCHLIST;
  });

  useEffect(() => {
    localStorage.setItem('northstar_watchlist', JSON.stringify(items));
  }, [items]);

  const addItem = (item: WatchlistItem) => setItems(prev => [...prev, item]);
  const updateItem = (updated: WatchlistItem) => setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
  const deleteItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const toggleArchive = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, archived: !i.archived } : i));

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    toggleArchive
  };
}

import { useState } from 'react';
import mockSites from '../data/mockSites';

export function useSites() {
  const [sites, setSites] = useState(mockSites);

  function addSite(newSite) {
    setSites(prev => [...prev, { ...newSite, id: Date.now().toString() }]);
  }

 function updateSite(id, updates) {
  const allowedFields = ['name'];
  const safeUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key))
  );
  setSites(prev => prev.map(s => s.id === id ? { ...s, ...safeUpdates } : s));
}

  function deleteSite(id) {
    setSites(prev => prev.filter(s => s.id !== id));
  }

  const inactiveSites = sites.filter(s => s.actionNeeded).length;
  const sitesWithNoOwner = sites.filter(s => s.numOwners === 0).length;

  return {
    sites,
    addSite,
    updateSite,
    deleteSite,
    inactiveSites,
    sitesWithNoOwner,
  };
}
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import sitesCSV from '../data/sites.csv?raw';

function formatStorage(gb) {
  const num = parseFloat(gb);
  if (isNaN(num) || num === 0) return '0 MB';
  if (num < 1) return `${Math.round(num * 1000)} MB`;
  return `${num.toFixed(2)} GB`;
}

function formatDate(val) {
  if (!val || val.toString().trim() === '') return 'No activity';
  // CSV exports the date as a readable string already e.g. "4/7/2026"
  const d = new Date(val);
  if (isNaN(d.getTime())) return 'No activity';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function mapRow(row) {
  return {
    id: row['URL'] || Math.random().toString(),
    name: row['Site name'] || 'Unnamed Site',
    url: row['URL'] || '',
    owner: row['Email address of site owners'] || 'Unassigned',
    storage: formatStorage(row['Storage used (GB)']),
    accessed: formatDate(row['Last activity date (UTC)']),
    numOwners: parseInt(row['Number of site owners']) || 0,
    actionNeeded: row['Owner Action Needed'] === 'Yes',
    template: row['Template'] || '',
    sensitivity: row['Sensitivity label'] || '',
  };
}

export function useSites() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const result = Papa.parse(sitesCSV, {
      header: true,
      skipEmptyLines: true,
    });
    const mapped = result.data.map(mapRow).filter(s => s.url);
    setSites(mapped);
  }, []);

  function addSite(newSite) {
    setSites(prev => [...prev, { ...newSite, id: Date.now().toString() }]);
  }

  function updateSite(id, updates) {
    setSites(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
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
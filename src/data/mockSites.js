const mockSites = [
  { id: 1, name: "Marketing Team Site", url: "https://contoso.sharepoint.com/sites/marketing", owner: "J. Smith", storage: "2.51 GB", accessed: "Apr 7, 2026", numOwners: 2, actionNeeded: false },
  { id: 2, name: "Product Development Hub", url: "https://contoso.sharepoint.com/sites/product-dev", owner: "A. Johnson", storage: "5.70 GB", accessed: "Apr 7, 2026", numOwners: 1, actionNeeded: true },
  { id: 3, name: "HR Resources", url: "https://contoso.sharepoint.com/sites/hr-resources", owner: "M. Williams", storage: "1.20 GB", accessed: "Jan 13, 2026", numOwners: 2, actionNeeded: false },
  { id: 4, name: "Sales Dashboard", url: "https://contoso.sharepoint.com/sites/sales-dash", owner: "Unassigned", storage: "890 MB", accessed: "Nov 25, 2025", numOwners: 0, actionNeeded: true },
  { id: 5, name: "Engineering Documentation", url: "https://contoso.sharepoint.com/sites/engineering", owner: "B. Davis", storage: "4.10 GB", accessed: "Aug 9, 2025", numOwners: 1, actionNeeded: true },
  { id: 6, name: "Finance Operations", url: "https://contoso.sharepoint.com/sites/finance-ops", owner: "C. Martinez", storage: "3.20 GB", accessed: "Mar 15, 2026", numOwners: 2, actionNeeded: false },
  { id: 7, name: "IT Help Desk", url: "https://contoso.sharepoint.com/sites/it-helpdesk", owner: "Unassigned", storage: "0 MB", accessed: "Feb 2, 2026", numOwners: 0, actionNeeded: true },
  { id: 8, name: "Global Supply Chain", url: "https://contoso.sharepoint.com/sites/supply-chain", owner: "R. Anderson", storage: "7.80 GB", accessed: "Apr 1, 2026", numOwners: 3, actionNeeded: false },
  { id: 9, name: "Legal & Compliance", url: "https://contoso.sharepoint.com/sites/legal", owner: "S. Thomas", storage: "2.10 GB", accessed: "Mar 28, 2026", numOwners: 2, actionNeeded: false },
  { id: 10, name: "Executive Leadership", url: "https://contoso.sharepoint.com/sites/leadership", owner: "Unassigned", storage: "0 MB", accessed: "Sep 14, 2025", numOwners: 0, actionNeeded: true },
  { id: 11, name: "Customer Success", url: "https://contoso.sharepoint.com/sites/customer-success", owner: "L. Jackson", storage: "1.90 GB", accessed: "Apr 5, 2026", numOwners: 1, actionNeeded: true },
  { id: 12, name: "R&D Innovation Lab", url: "https://contoso.sharepoint.com/sites/rd-innovation", owner: "T. White", storage: "12.40 GB", accessed: "Apr 6, 2026", numOwners: 2, actionNeeded: false },
  { id: 13, name: "Procurement Team", url: "https://contoso.sharepoint.com/sites/procurement", owner: "Unassigned", storage: "210 MB", accessed: "Oct 3, 2025", numOwners: 0, actionNeeded: true },
  { id: 14, name: "Quality Assurance", url: "https://contoso.sharepoint.com/sites/quality", owner: "D. Harris", storage: "3.50 GB", accessed: "Mar 20, 2026", numOwners: 2, actionNeeded: false },
  { id: 15, name: "Facilities Management", url: "https://contoso.sharepoint.com/sites/facilities", owner: "Unassigned", storage: "0 MB", accessed: "Jul 22, 2025", numOwners: 0, actionNeeded: true },
  { id: 16, name: "Training & Development", url: "https://contoso.sharepoint.com/sites/training", owner: "P. Clark", storage: "6.30 GB", accessed: "Feb 18, 2026", numOwners: 1, actionNeeded: true },
  { id: 17, name: "North America Sales", url: "https://contoso.sharepoint.com/sites/na-sales", owner: "G. Lewis", storage: "4.70 GB", accessed: "Apr 4, 2026", numOwners: 2, actionNeeded: false },
  { id: 18, name: "EMEA Operations", url: "https://contoso.sharepoint.com/sites/emea-ops", owner: "F. Robinson", storage: "2.80 GB", accessed: "Mar 31, 2026", numOwners: 2, actionNeeded: false },
  { id: 19, name: "APAC Regional Hub", url: "https://contoso.sharepoint.com/sites/apac", owner: "Unassigned", storage: "0 MB", accessed: "Aug 30, 2025", numOwners: 0, actionNeeded: true },
  { id: 20, name: "Project Management Office", url: "https://contoso.sharepoint.com/sites/pmo", owner: "K. Walker", storage: "5.10 GB", accessed: "Apr 3, 2026", numOwners: 3, actionNeeded: false },
];

export default mockSites;
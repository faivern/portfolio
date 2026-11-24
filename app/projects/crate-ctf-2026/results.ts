export const categoryResults = [
  { name: "Web security", solved: 6, total: 6 },
  { name: "OSINT", solved: 4, total: 4 },
  { name: "Cryptography", solved: 4, total: 4 },
  { name: "Forensics", solved: 3, total: 3 },
  { name: "Reverse engineering", solved: 3, total: 4 },
  { name: "Miscellaneous", solved: 3, total: 6 },
  { name: "Exploitation", solved: 0, total: 4 },
];

export const challengesSolved = categoryResults.reduce((sum, { solved }) => sum + solved, 0);
export const challengesTotal = categoryResults.reduce((sum, { total }) => sum + total, 0);

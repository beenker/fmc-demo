export function scoreAdvisorPackage(pkg, answers) {
  let score = 0;

  if (answers.phoneType && pkg.phoneBrand === answers.phoneType) score += 4;

  if (answers.internetUse === 'licht' && pkg.internet.includes('100')) score += 3;
  if (
    answers.internetUse === 'gemiddeld' &&
    (pkg.internet.includes('400') || pkg.internet.includes('1 Gbit'))
  ) score += 3;
  if (
    answers.internetUse === 'intensief' &&
    (pkg.internet.includes('1 Gbit') || pkg.internet.includes('2 Gbit'))
  ) score += 4;

  if (answers.homeSize === 'klein' && pkg.internet.includes('100')) score += 2;
  if (
    answers.homeSize === 'middel' &&
    (pkg.internet.includes('400') || pkg.internet.includes('1 Gbit'))
  ) score += 2;
  if (
    answers.homeSize === 'groot' &&
    (pkg.internet.includes('1 Gbit') || pkg.internet.includes('2 Gbit'))
  ) score += 3;

  if (answers.tvInterests.includes('films') && (pkg.tv.includes('Complete') || pkg.tv.includes('Max'))) score += 2;
  if (answers.tvInterests.includes('sport') && pkg.tv.includes('Max')) score += 2;
  if (answers.tvInterests.includes('kids') && (pkg.tv.includes('Complete') || pkg.tv.includes('Max'))) score += 1;
  if (answers.tvInterests.includes('standaard') && pkg.tv.includes('Start')) score += 1;

  if (answers.replay === 'ja' && (pkg.tv.includes('Complete') || pkg.tv.includes('Max'))) score += 2;
  if (answers.replay === 'nee' && pkg.tv.includes('Start')) score += 1;

  if (answers.phoneNeed.includes('goedkoop') && (pkg.phone.includes('17e') || pkg.phone.includes('Galaxy A'))) score += 3;
  if (answers.phoneNeed.includes('camera') && (pkg.phone.includes('Pro') || pkg.phone.includes('Ultra'))) score += 3;
  if (answers.phoneNeed.includes('beste') && (pkg.phone.includes('Pro') || pkg.phone.includes('Ultra'))) score += 3;
  if (answers.phoneNeed.includes('opslag') && (pkg.phone.includes('Pro') || pkg.phone.includes('Ultra') || pkg.phone.includes('17'))) score += 2;

  return score;
}
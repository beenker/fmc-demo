export function parsePrice(value) {
  if (typeof value === 'number') return value;
  return Number(String(value).replace('€', '').replace('.', '').replace(',', '.').trim());
}

export function formatEuro(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function normalizePostcode(value) {
  return String(value).toUpperCase().split(' ').join('');
}

export function getLoanBounds(totalDeviceAmount) {
  if (!totalDeviceAmount || totalDeviceAmount <= 0) {
    return {
      minMonthly: 0,
      maxMonthly: 0,
      defaultMonthly: 0,
    };
  }

  const maxMonthly = Math.floor(totalDeviceAmount / 24);

  return {
    minMonthly: 5,
    maxMonthly,
    defaultMonthly: 0,
  };
}

export function buildPhoneOptions(deviceOrder, deviceVariants) {
  return deviceOrder
    .filter((key) => deviceVariants[key])
    .map((key) => ({
      id: key.toLowerCase().split(' ').join('-'),
      label: key === 'Sim only' ? 'Geen telefoon · Sim Only' : key,
      value: key === 'Sim only' ? 'Sim only' : key,
      variantKey: key,
    }));
}

export function findAddressScenario(addressScenarios, postcode, houseNumber) {
  const normalizedPostcode = normalizePostcode(postcode);
  const normalizedHouseNumber = String(houseNumber).trim();

  return addressScenarios.find(
    (item) =>
      item.postcode === normalizedPostcode &&
      String(item.houseNumber).trim() === normalizedHouseNumber
  );
}

export function resolveBundleId(bundleId, bundleMap) {
  return bundleMap[bundleId] || bundleId;
}
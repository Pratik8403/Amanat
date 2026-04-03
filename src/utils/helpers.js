export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function maskPan(pan) {
  if (!pan || pan.length < 10) return pan;
  return pan.slice(0, 4) + '••••' + pan.slice(8);
}

export function maskAadhaar(aadhaar) {
  if (!aadhaar || aadhaar.length < 12) return aadhaar;
  return '•••• •••• ' + aadhaar.slice(8);
}

export function validatePan(pan) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
}

export function validateAadhaar(aadhaar) {
  return /^[0-9]{12}$/.test(aadhaar);
}

export function validatePhone(phone) {
  return /^[6-9][0-9]{9}$/.test(phone);
}

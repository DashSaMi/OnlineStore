export function formatPrice(price) {
  // Convert Rial to Toman, format with commas, and append 'تومان'
  const toman = Math.round(price / 1);
  return toman.toLocaleString('fa-IR') + ' تومان';
}
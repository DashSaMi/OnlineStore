// app/api/products/route.js
export async function GET() {
  const products = [
    {
      id: 1,
      name: 'هدفون بلوتوثی AirPods Pro 2',
      price: 9_800_000,
      originalPrice: 12_500_000,
      discount: 22,
      rating: 4.5,
      reviews: 124,
      imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836',
    },
    {
      id: 2,
      name: 'لپ تاپ ویوو بوک Go 14',
      price: 25_990_000,
      originalPrice: 31_750_000,
      discount: 18,
      rating: 4.8,
      reviews: 89,
      imageUrl: 'https://dlcdnwebimgs.asus.com/gain/7b6485d2-2950-485c-92c9-58692b928766/w800',
    },
    {
      id: 3,
      name: 'لپ تاپ مک بوک ایر M2',
      price: 31_750_000,
      originalPrice: 36_500_000,
      discount: 13,
      rating: 4.7,
      reviews: 56,
      imageUrl: 'https://www.busiboutique.com/medias/boutique/429078/344f6d9a-c168-42c2-87f5-e49204b3fa65.jpg',
    },
    {
      id: 4,
      name: 'گوشی سامسونگ گلکسی S23',
      price: 16_750_000,
      originalPrice: 19_900_000,
      discount: 16,
      rating: 4.3,
      reviews: 78,
      imageUrl: 'https://showroom-mobile.orange.fr/wp-content/uploads/2023/01/640X500_Samsung_Galaxy_S23_5G_EE.jpg',
    },
    {
      id: 5,
      name: 'آیفون 16',
      price: 45_000_000,
      originalPrice: 50_000_000,
      discount: 10,
      rating: 4.9,
      reviews: 215,
      imageUrl: 'https://m.media-amazon.com/images/I/712Pyq1hPfL.jpg',
    },
  ];

  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' },
  });
}
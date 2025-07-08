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
      description: 'هدفون هوشمند اپل با فناوری نویزکنسلینگ فعال و حالت شفاف. طراحی ارگونومیک با قابلیت ضد آب (IPX4)، کیفیت صدای استثنایی با درایورهای سفارشی اپل، قابلیت اتصال سریع به دستگاه‌های اپل، عمر باتری تا 6 ساعت با یکبار شارژ و تا 30 ساعت با کیس شارژ، دارای سنسور فشار برای کنترل لمسی، سازگار با شارژرهای Qi.'
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
      description: 'لپ تاپ فوق سبک 1.3 کیلوگرمی با پردازنده Intel Core i7 نسل دوازدهم، رم 16 گیگابایت، حافظه SSD 512 گیگابایت، صفحه نمایش 14 اینچ Full HD IPS با حاشیه‌های باریک، گرافیک Intel Iris Xe، سیستم عامل Windows 11 اورجینال، طراحی تمام فلزی، پورت USB-C Thunderbolt 4، اسپیکرهای Harman Kardon، سنسور اثر انگشت برای ورود امن.'
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
      description: 'لپ تاپ اپل با تراشه M2، رم 8 گیگابایت یکپارچه، حافظه SSD 256 گیگابایت، صفحه نمایش 13.6 اینچ Retina با پوشش گسترده رنگ P3، دوربین FaceTime HD 1080p، سیستم عامل macOS، طراحی باریک و سبک (وزن 1.24 کیلوگرم)، اسپیکرهای استریو با پشتیبانی از Spatial Audio، سنسور Touch ID، عمر باتری تا 18 ساعت، پشتیبانی از شارژ سریع.'
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
      description: 'گوشی پرچمدار سامسونگ با پردازنده Snapdragon 8 Gen 2، رم 8 گیگابایت، حافظه داخلی 256 گیگابایت، نمایشگر 6.1 اینچ Dynamic AMOLED 2X با نرخ تازه‌سازی 120Hz، سه دوربین حرفه‌ای (50+12+10 مگاپیکسل) با قابلیت فیلمبرداری 8K، باتری 3900mAh با پشتیبانی از شارژ سریع 25W و بی‌سیم 15W، مقاوم در برابر آب و گرد و غبار (IP68)، سیستم عامل Android 13 با رابط One UI 5.1.'
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
      description: 'جدیدترین پرچمدار اپل با تراشه A18 Bionic، نمایشگر 6.7 اینچ Super Retina XDR ProMotion با نرخ تازه‌سازی 120Hz، سه دوربین پیشرفته (48+12+12 مگاپیکسل) با قابلیت فیلمبرداری Cinematic Mode و 8K، رم 6 گیگابایت، حافظه 256 گیگابایت، مقاوم در برابر آب و گرد و غبار (IP68)، سیستم عامل iOS 18، پشتیبانی از 5G، شارژ MagSafe، باتری با عمر طولانی و پشتیبانی از شارژ سریع 20W.'
    },
  ];

  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' },
  });
}
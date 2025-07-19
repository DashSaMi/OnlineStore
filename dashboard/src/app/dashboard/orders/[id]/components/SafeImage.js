//app/dashboard/orders/[id]/components/SafeImage.js
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function SafeImage({ src, alt, ...props }) {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback || !src) {
    return <img src={src} alt={alt} {...props} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      onError={() => setUseFallback(true)}
      unoptimized={true}
    />
  );
}

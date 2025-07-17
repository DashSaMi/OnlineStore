// app/api/image/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error('Failed to fetch image');
    
    return new Response(res.body, {
      headers: {
        'Content-Type': res.headers.get('Content-Type'),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}
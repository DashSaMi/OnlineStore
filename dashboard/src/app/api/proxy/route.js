export async function GET(request) {
  try {
    const apiUrl = new URL(request.nextUrl.pathname.replace('/api/proxy', ''), `{process.env.NEXTAUTH_URL}`);
    
    // Forward all query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      apiUrl.searchParams.set(key, value);
    });

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('authorization') && {
          Authorization: request.headers.get('authorization')
        })
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST(request) {
  try {
    const apiUrl = new URL(request.nextUrl.pathname.replace('/api/proxy', ''), `${process.env.NEXTAUTH_URL}`);
    const body = await request.json();

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('authorization') && {
          Authorization: request.headers.get('authorization')
        })
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
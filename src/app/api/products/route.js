import connectToDatabase from '../../lib/mongodb'
import Product from '../../models/product'

export async function GET(request) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const bestSellers = searchParams.get('bestSellers')
    
    const query = bestSellers === 'true' ? { isBestSeller: true } : {}
    
    const products = await Product.find(query).limit(10)
    
    return Response.json(products)
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
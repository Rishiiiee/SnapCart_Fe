import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function AllProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://snapcart-be.onrender.com/api/products/getallproducts")
      .then((res) => setProducts(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`} 
              className="block"
            >
              <Card className="shadow-md hover:scale-105 transition cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-full aspect-square flex items-center justify-center bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold mt-3 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-zinc-600">₹{product.price}</p>
                  <div className="mt-3">
                    <Button className="w-full">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

  import { useEffect, useState } from "react"
  import { useParams } from "react-router-dom"
  import axios from "axios"
  import { Card, CardContent } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Link } from "react-router-dom"

  export default function CategoryPage() {
    const { name } = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}products/category/${encodeURIComponent(name)}`)
        .then((res) => setProducts(res.data.products))
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [name])

    return (
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Category: {name}</h2>

        {loading ? (
          <p className="text-zinc-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found in {name}.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Link
              key={product._id}
              to={`/products/${product._id}`} 
              className="block"
              >
              <Card className="shadow-md hover:scale-105 transition">
                <CardContent className="p-4 text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
                  <p className="text-zinc-600">₹{product.price}</p>
                  <Button asChild className="mt-3 w-full">
                    <Link to={`/products/${product._id}`}>View Product</Link>
                  </Button>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

import { useEffect, useMemo, useState } from "react"
import HeroSlider from "@/components/ui/HeroSlider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}products/getallproducts?sort=new&limit=100`)
      .then((res) => {
        setProducts(res.data.products)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const onePerCategory = useMemo(() => {
    const map = {}
    for (const p of products) {
      if (!map[p.category]) map[p.category] = p
    }
    return Object.values(map)
  }, [products])

  const trending = useMemo(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 8) 
  }, [products])

  return (
    <div>
      <HeroSlider />

      <section className="container mx-auto py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Button asChild variant="outline">
            <Link to="/categories">Browse All Categories</Link>
          </Button>
        </div>

        {loading ? (
          <p className="text-zinc-600">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {onePerCategory.map(product => (
              <Card key={product._id} className="shadow-md hover:scale-105 transition">
                <CardContent className="p-4 text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
                  <p className="text-zinc-600">₹{product.price}</p>

                  <Button asChild className="mt-3 w-full">
                    <Link to={`/category/${encodeURIComponent(product.category)}`}>
                      View all {product.category}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    
     <section className="container mx-auto py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Products</h2>
        </div>

        {loading ? (
          <p className="text-zinc-600">Loading trendings...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trending.map(product => (
              <Link 
              key={trending._id}
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
                  <Button className="mt-3 w-full bg-black text-white border-2">
                      View product
                  </Button>
                </CardContent>
              </Card>
              </Link>              
            ))}
          </div>
        )}
      </section>
    </div>
    
  )
}

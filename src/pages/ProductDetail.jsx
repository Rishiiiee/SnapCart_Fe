import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "../context/CartProvider";

const categories = [
  {
    name: "Phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    name: "Footwear",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1241aaa2-5ab0-49d9-a88f-fbeae3b13ae9/JA+3+EP.png"
  },
  {
    name: "Clothing-Men",
    image: "https://image.hm.com/assets/hm/1d/9b/1d9b2f48931dca2fa7369f9c34fa25dd1349800d.jpg?imwidth=1260"
  },
  {
    name: "Clothing-Women",
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1756102112_1201262.jpg?w=480&dpr=1.3"
  },
  {
    name: "Jewellery",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"
  },
  {
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353"
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  }
]

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}products/getsingleproduct/${id}`
        )
        setProduct(res.data.product)

        const relatedRes = await axios.get(
          `${import.meta.env.VITE_API_URL}products/category/${res.data.product.category}`
        )
        setRelated(
          relatedRes.data.products.filter((p) => p._id !== res.data.product._id)
        )
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleBuyNow = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}order/razorpay/create`,
      { productId: product._id, quantity: 1, buyNow: true },
      { withCredentials: true }
    );

    const { razorpayOrder, key, order } = res.data;

    const options = {
      key,
  amount: razorpayOrder.amount,
  currency: razorpayOrder.currency,
  name: "Snapcart",
  description: product.name,
  order_id: razorpayOrder.id,
  handler: async function (response) {
        try {
          // 👇 send full data for verification
          await axios.post(
            `${import.meta.env.VITE_API_URL}order/razorpay/verify`,
            {
              ...response,
              orderId: order._id, // 👈 send our DB order id
              buyNow: true,
            },
            { withCredentials: true }
          );

          alert("Payment successful!");
        } catch (err) {
          alert("Payment verification failed!");
        }
      },
      prefill: { email: "test@example.com" },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("Payment failed to start");
  }
};


  if (loading) return <p>Loading...</p>
  if (!product) return <p>Product not found</p>

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="flex justify-center items-center bg-gray-100 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-contain"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-green-600 font-semibold">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>

          <p>{product.description}</p>
          <br />
          <strong>Product Highlights:</strong>
          <ul className="list-disc list-inside">
            <li>Premium quality material</li>
            <li>30-day return policy</li>
            <li>Free delivery available</li>
            <li>Cash on Delivery eligible</li>
          </ul>

          <div className="flex gap-4 pt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={() => addToCart(product._id, 1)}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link key={item._id} to={`/products/${item._id}`}>
                <Card className="shadow-md hover:scale-105 transition cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-full aspect-square flex items-center justify-center bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold mt-3 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-zinc-600">₹{item.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Explore More Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Explore More Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${encodeURIComponent(cat.name)}`}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-28 object-cover"
              />
              <div className="p-2 text-center font-semibold">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

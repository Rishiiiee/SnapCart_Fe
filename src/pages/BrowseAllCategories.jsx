import { Link } from "react-router-dom"

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
];


export default function BrowseAllCategories() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Browse All Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <Link
            key={cat.name}
            to={`/category/${encodeURIComponent(cat.name)}`}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center font-semibold">{cat.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

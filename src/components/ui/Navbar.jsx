import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-3 sm:p-4">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl sm:text-2xl font-bold text-zinc-800"
        >
          Snapcart
        </Link>
        
        {/* Nav Links */}
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <Link to="/products" className="hover:text-zinc-600">Products</Link>
          <Link to="/orders" className="hover:text-zinc-600">Orders</Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-zinc-600">
            <ShoppingCart size={10} className="sm:size-10" />
            Cart
          </Link>
          
          {/* Login Button */}
          <Button 
            asChild 
            className="px-2 py-0 text-xs sm:px-2 sm:py-0 sm:text-sm"
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

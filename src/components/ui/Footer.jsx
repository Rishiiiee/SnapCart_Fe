import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Snapcart</h2>
          <p className="text-sm mb-4">
            Shop smarter, live better. Your one-stop destination for phones,
            fashion, beauty, and more.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/category/Phones" className="hover:text-white">Phones</a></li>
            <li><a href="/category/Footwear" className="hover:text-white">Footwear</a></li>
            <li><a href="/category/Clothing-Men" className="hover:text-white">Clothing - Men</a></li>
            <li><a href="/category/Clothing-Women" className="hover:text-white">Clothing - Women</a></li>
            <li><a href="/category/Jewellery" className="hover:text-white">Jewellery</a></li>
            <li><a href="/category/Home & Living" className="hover:text-white">Home & Living</a></li>
            <li><a href="/category/Beauty" className="hover:text-white">Beauty</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/orders" className="hover:text-white">Orders & Returns</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping Policy</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#"><FaFacebook className="text-xl hover:text-white" /></a>
            <a href="#"><FaInstagram className="text-xl hover:text-white" /></a>
            <a href="#"><FaTwitter className="text-xl hover:text-white" /></a>
            <a href="#"><FaLinkedin className="text-xl hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center border-t border-gray-700 mt-6 pt-4 text-sm text-gray-400">
        © 2025 Snapcart. All rights reserved.
      </div>
    </footer>
  );
}

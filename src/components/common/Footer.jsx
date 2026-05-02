import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-xl">EcoCart</span>
            </div>
            <p className="text-gray-400">
              Sustainable shopping made easy. Discover eco-friendly products that make a difference.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  Clothing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eco-400 transition">
                  Beauty
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@ecocart.com</li>
              <li>Phone: +91 (555) 123-4567</li>
              <li className="mt-4">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-eco-400 transition">
                    Facebook
                  </a>
                  <a href="#" className="hover:text-eco-400 transition">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-eco-400 transition">
                    Instagram
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; {year} EcoCart. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-eco-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-eco-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-eco-400 transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

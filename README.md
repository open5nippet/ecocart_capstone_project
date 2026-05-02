# EcoCart - Sustainable E-commerce Platform

A production-level React + Vite e-commerce application focused on sustainable products with eco-scoring, authentication, and user dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- VS Code (recommended)

### Installation

1. **Navigate to project directory**
   ```bash
   cd ecocart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   copy .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start JSON Server (in another terminal)**
   ```bash
   npm run server
   ```

The app will open at http://localhost:3000

## 📦 Project Structure

```
ecocart/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── redux/              # Redux store & slices
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── utils/              # Helper functions
│   ├── styles/             # CSS files
│   ├── data/               # Mock data
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── db.json                 # JSON Server mock data
├── package.json            # Dependencies
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
└── README.md              # This file
```

## 🎯 Key Features

### ✅ Implemented
- **Authentication**: Login/Register with Redux state
- **Product Listing**: Search, filter, sort, pagination
- **Product Detail**: Detailed product view with specs
- **Cart Management**: Add/remove items, quantity control
- **Wishlist**: Save favorite products
- **Sustainability Scoring**: 0-100 eco score system
- **Dark Mode**: Theme toggle
- **Dashboard**: User analytics and charts
- **Responsive UI**: Mobile, tablet, desktop

### 🔄 Redux Slices
- `authSlice`: User authentication state
- `productSlice`: Product listing & filtering
- `cartSlice`: Shopping cart
- `wishlistSlice`: Favorites
- `uiSlice`: Dark mode & UI state

### 🎨 UI Components
- `SustainabilityBadge`: Displays eco scores with visual indicators
- `EcoChart`: Recharts integration for dashboard
- `ProductCard`: Product display component
- `Navbar & Footer`: Layout components

## 🛠️ Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start mock backend
npm run server
```

### Tailwind CSS
Tailwind is pre-configured with custom eco-colors:
- `eco-*` (green shades)
- `warn-*` (yellow shades)
- `danger-*` (red shades)

### Redux DevTools
Redux store is configured for DevTools. Install the Redux DevTools extension in your browser to inspect state changes.

## 📊 Sustainability Score System

Products are scored 0-100 based on:
- **Material**: Recycled (+30), Organic (+25), Bamboo (+28), etc.
- **Packaging**: Eco-friendly (+20), Recyclable (+15), Standard (0), Plastic (-5)
- **Brand Rating**: Based on eco-certification

Label thresholds:
- 70+: **High** (green badge)
- 40-69: **Medium** (yellow badge)
- 0-39: **Low** (red badge)

## 🔐 Authentication

Currently implemented as mock auth (for demo). To implement real authentication:

1. **Firebase**:
   ```javascript
   // Update in src/services/authService.js
   import { getAuth } from 'firebase/auth'
   ```

2. **JWT**:
   ```javascript
   // Update API interceptors in src/services/api.js
   api.interceptors.request.use(config => {
     config.headers.Authorization = `Bearer ${token}`
     return config
   })
   ```

## 🌐 API Integration

### JSON Server Routes

```
GET  /products          - Get all products
GET  /products/:id      - Get product by ID
GET  /products?category=clothing - Filter by category
POST /users            - Create user
GET  /orders           - Get orders
```

### Switching to Real API

Update `API_BASE_URL` in `.env.local`:
```
VITE_API_URL=https://your-api.com
```

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

## 🧪 Testing Features

- ✅ Try login (any email/password work in mock mode)
- ✅ Add products to cart
- ✅ Search & filter products
- ✅ Toggle dark mode
- ✅ Add to wishlist
- ✅ View sustainability scores
- ✅ Check dashboard analytics

## 📚 Technologies Used

- **React 18**: UI library
- **Vite**: Build tool
- **Redux Toolkit**: State management
- **React Router v6**: Routing
- **Tailwind CSS**: Styling
- **Axios**: HTTP client
- **Recharts**: Charts library
- **JSON Server**: Mock backend

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

**JSON Server not connecting?**
- Ensure `npm run server` is running
- Check VITE_API_URL in .env.local
- Verify db.json exists

**Tailwind styles not applying?**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Rebuild: `npm run build`

## 📝 Next Steps

1. **Connect Real API**: Replace mock data with real backend
2. **Firebase Auth**: Implement real authentication
3. **Payment Integration**: Add Stripe/PayPal
4. **Email Notifications**: Send order confirmations
5. **Admin Dashboard**: Manage products and users
6. **Reviews & Ratings**: Let users rate products

## 📄 License

MIT - Feel free to use this project!

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and style.

---

**Happy sustainable shopping! 🌱**

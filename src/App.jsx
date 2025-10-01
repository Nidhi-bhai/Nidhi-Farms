import { useState, useEffect, useRef } from 'react'
import { Leaf, ShoppingCart, Menu, X, Play, Package, Heart, Award, ChevronRight } from 'lucide-react'
import { getProducts, isShopifyConfigured } from './lib/shopify'
import './App.css'

// Import product images (fallback for when Shopify is not configured)
import productCoconutOil from './assets/product-coconut-oil.jpg'
import productFlaxseedOil from './assets/product-flaxseed-oil.jpg'
import productMoringaPowder from './assets/product-moringa-powder.jpg'
import productTurmericPowder from './assets/product-turmeric-powder.jpg'
import productMilletsPowder from './assets/product-millets-powder.jpg'
import productVetiverTea from './assets/product-vetiver-tea.jpg'
import productHibiscusTea from './assets/product-hibiscus-tea.jpg'
import productGingerSpiceTea from './assets/product-ginger-spice-tea.jpg'
import productJaggery from './assets/product-jaggery.jpg'
import productCocoaPowder from './assets/product-cocoa-powder.jpg'
import heroFarm from './assets/hero-farm.jpg'

// Simple Button component
const Button = ({ children, className = '', size = 'default', variant = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50'
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8'
  }
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }
  
  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Lazy loading 3D component
function Product3DViewer({ productUrl }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full h-[500px] bg-background rounded-lg overflow-hidden soft-shadow">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <iframe
        src={productUrl}
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
        title="3D Product Viewer"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        style={{ border: 'none' }}
      />
    </div>
  )
}

// Video player component
function VideoPlayer({ videoUrl, thumbnail, title }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden soft-shadow group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnail}
        controls={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-all group-hover:bg-black/40"
          onClick={handlePlay}
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center soft-shadow-hover transition-transform group-hover:scale-110">
            <Play className="w-8 h-8 text-primary ml-1" />
          </div>
        </div>
      )}
      
      {!isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-medium">{title}</p>
        </div>
      )}
    </div>
  )
}

// Navigation component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md soft-shadow' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Nidhi Farms</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#videos" className="text-foreground hover:text-primary transition-colors">Videos</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#products" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Products</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#videos" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Videos</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero section
function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroFarm})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 text-center z-10 pt-16">
        <h1 className="text-5xl md:text-7xl mb-6 text-white animate-fade-in" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
          Natural Herbal Products<br />& Vegan Roots
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in-delay">
          Ethically sourced, family-handled herbal treasures from our farm to your home
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg soft-shadow-hover">
            Shop Bestsellers
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg">
            Learn More
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 text-white/90">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            <span className="text-sm">Ethically sourced roots</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span className="text-sm">Transparent pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="text-sm">Minimal processing</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Product card component
function ProductCard({ image, name, description, price, scientificName }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden soft-shadow transition-all hover:soft-shadow-hover hover:-translate-y-2 duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{name}</h3>
        {scientificName && (
          <p className="text-sm text-muted-foreground italic mb-2">{scientificName}</p>
        )}
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

// Products section
function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fallback products if Shopify is not configured
  const fallbackProducts = [
    {
      image: productCoconutOil,
      name: "Organic Coconut Oil",
      scientificName: "Cocos nucifera",
      description: "Premium cold-pressed golden coconut oil for cooking and wellness",
      price: "₹450/500ml"
    },
    {
      image: productFlaxseedOil,
      name: "Flaxseed Oil",
      scientificName: "Linum usitatissimum",
      description: "Rich in Omega-3, cold-pressed flaxseed oil for heart health",
      price: "₹380/250ml"
    },
    {
      image: productMoringaPowder,
      name: "Moringa Powder",
      scientificName: "Moringa oleifera",
      description: "Nutrient-rich superfood powder from organic moringa leaves",
      price: "₹320/200g"
    },
    {
      image: productTurmericPowder,
      name: "Turmeric Powder",
      scientificName: "Curcuma longa",
      description: "Pure Ayurvedic turmeric powder with high curcumin content",
      price: "₹180/250g"
    },
    {
      image: productMilletsPowder,
      name: "Millets Powder",
      scientificName: "Mixed millets blend",
      description: "Nutritious multi-millet flour blend for healthy cooking",
      price: "₹150/500g"
    },
    {
      image: productVetiverTea,
      name: "Vetiver Tea",
      scientificName: "Chrysopogon zizanioides",
      description: "Calming Ayurvedic herbal tea with earthy vetiver roots",
      price: "₹280/100g"
    },
    {
      image: productHibiscusTea,
      name: "Rosella Hibiscus Tea",
      scientificName: "Hibiscus sabdariffa",
      description: "Vibrant ruby-red wellness tea rich in antioxidants",
      price: "₹240/100g"
    },
    {
      image: productGingerSpiceTea,
      name: "Ginger with Spices Tea",
      scientificName: "Zingiber officinale blend",
      description: "Warming artisanal tea blend with ginger and aromatic spices",
      price: "₹260/100g"
    },
    {
      image: productJaggery,
      name: "Organic Jaggery",
      scientificName: "Saccharum officinarum",
      description: "Traditional unrefined sweetener blocks from organic sugarcane",
      price: "₹120/500g"
    },
    {
      image: productCocoaPowder,
      name: "Premium Cocoa Powder",
      scientificName: "Theobroma cacao",
      description: "Rich, pure cocoa powder from ethically sourced cacao beans",
      price: "₹350/200g"
    }
  ]

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (isShopifyConfigured()) {
          const shopifyProducts = await getProducts(10)
          if (shopifyProducts && shopifyProducts.length > 0) {
            setProducts(shopifyProducts.map(product => ({
              image: product.image,
              name: product.title,
              description: product.description.substring(0, 100) + '...',
              price: product.price + '/kg',
              scientificName: ''
            })))
          } else {
            setProducts(fallbackProducts)
          }
        } else {
          setProducts(fallbackProducts)
        }
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts(fallbackProducts)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section id="products" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Our Bestsellers</h2>
            <p className="text-lg text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Our Bestsellers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked selection of premium herbal products, ethically sourced and family-handled with care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.slice(8).map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

// 3D Product showcase section
function Product3DShowcase() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Experience Our Products in 3D</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our premium packaging in stunning 3D detail
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Product3DViewer productUrl="https://pacdora.com/share/rBJZCYx7yrZXxqk8" />
        </div>
      </div>
    </section>
  )
}

// About section
function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-8 text-foreground">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Nidhi Farms is a family-run heritage farm dedicated to preserving traditional herbal knowledge 
              and sustainable farming practices. For generations, we've been cultivating premium herbs, roots, 
              and natural products with minimal processing and maximum care.
            </p>
            <p>
              Every product is ethically sourced, hand-selected, and processed using time-honored methods 
              that preserve the natural potency and purity of each ingredient. We believe in transparent 
              pricing, sustainable practices, and delivering nature's best directly to your doorstep.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <Heart className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Family Heritage</h3>
                <p className="text-sm">Generations of traditional farming wisdom</p>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Traditional Methods</h3>
                <p className="text-sm">Minimal processing, maximum purity</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Modern Standards</h3>
                <p className="text-sm">Quality certified and lab-tested</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Videos section
function Videos() {
  return (
    <section id="videos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">See Our Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how we cultivate, harvest, and process our natural products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <VideoPlayer 
            videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
            thumbnail="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800"
            title="Farm to Table: Our Vegan Journey"
          />
          <VideoPlayer 
            videoUrl="https://www.w3schools.com/html/movie.mp4"
            thumbnail="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800"
            title="Traditional Herbal Processing Methods"
          />
        </div>
      </div>
    </section>
  )
}

// Contact section
function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Phone</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
              <textarea 
                rows="4" 
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tell us about your inquiry..."
              ></textarea>
            </div>
            <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-12">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Nidhi Farms</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ethically sourced herbal products from our family farm to your home.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#products" className="block text-muted-foreground hover:text-primary transition-colors">Products</a>
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
              <a href="#videos" className="block text-muted-foreground hover:text-primary transition-colors">Videos</a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: info@nidhifarms.com</p>
              <p>Phone: +91 XXXXX XXXXX</p>
              <p>Location: Organic Farm, India</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for updates and special offers</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Nidhi Farms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App component
function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Products />
      <Product3DShowcase />
      <About />
      <Videos />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Leaf, ShoppingCart, Menu, X, Play, Package, Heart, Award, ChevronRight } from 'lucide-react'
import './App.css'

// Import product images
import product1 from './assets/product1.jpg'
import product2 from './assets/product2.jpg'
import product3 from './assets/product3.jpg'
import product4 from './assets/product4.jpg'
import product5 from './assets/product5.jpg'
import heroFarm from './assets/hero-farm.jpg'

// Lazy loading 3D component
function Product3DViewer({ productUrl }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full h-[500px] rounded-2xl overflow-hidden bg-white soft-shadow">
      {isVisible ? (
        <iframe
          title="3D Product Preview"
          allowFullScreen
          style={{ border: 'none' }}
          width="100%"
          height="100%"
          src={productUrl}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-muted animate-pulse rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-primary animate-float" />
            <p className="text-muted-foreground">Loading 3D Preview...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Video player component
function VideoPlayer({ videoUrl, thumbnail, title }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden soft-shadow group">
      {!isPlaying && (
        <>
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/50">
            <button
              onClick={handlePlay}
              className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center transform transition-all hover:scale-110 hover:bg-primary"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </button>
          </div>
        </>
      )}
      {isPlaying && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          autoPlay
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
      isScrolled ? 'bg-white/95 backdrop-blur-md soft-shadow' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-2xl brand-font text-foreground">Nidhi Farms</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
            <a href="#products" className="text-foreground hover:text-primary transition-colors font-medium">Products</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">About</a>
            <a href="#videos" className="text-foreground hover:text-primary transition-colors font-medium">Videos</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</a>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <a href="#home" className="block text-foreground hover:text-primary transition-colors font-medium">Home</a>
            <a href="#products" className="block text-foreground hover:text-primary transition-colors font-medium">Products</a>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors font-medium">About</a>
            <a href="#videos" className="block text-foreground hover:text-primary transition-colors font-medium">Videos</a>
            <a href="#contact" className="block text-foreground hover:text-primary transition-colors font-medium">Contact</a>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero section
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src={heroFarm}
          alt="Organic farm"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl text-white mb-6 text-balance">
          Nidhi Farms
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
          Raw herbal powders & plant roots
        </p>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto font-light">
          Pure, small-batch, family-handled herbs — rooted in tradition, made for modern life
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
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

// Products section
function Products() {
  const products = [
    {
      image: product1,
      name: "Sarsaparilla Root",
      scientificName: "Smilax officinalis",
      description: "Natural dried root for traditional wellness",
      price: "₹1,200/kg"
    },
    {
      image: product2,
      name: "Astragalus Root",
      scientificName: "Astragalus membranaceus",
      description: "Organic root powder for immune support",
      price: "₹1,500/kg"
    },
    {
      image: product3,
      name: "Echinacea Root",
      scientificName: "Echinacea purpurea",
      description: "Dried root for natural health benefits",
      price: "₹1,800/kg"
    },
    {
      image: product4,
      name: "Calendula Flowers",
      scientificName: "Calendula officinalis",
      description: "Organic dried flowers for herbal preparations",
      price: "₹900/kg"
    },
    {
      image: product5,
      name: "Hibiscus Powder",
      scientificName: "Hibiscus sabdariffa",
      description: "Pure hibiscus flower powder",
      price: "₹800/kg"
    }
  ]

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Our Bestsellers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked selection of premium herbal products, ethically sourced and family-handled with care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.slice(3).map((product, index) => (
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Interactive 3D Product View</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our products in stunning 3D detail. Rotate, zoom, and examine our authentic packaging
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Product3DViewer productUrl="https://www.pacdora.com/share?filter_url=psksd81ylw" />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              🔄 Drag to rotate • 🔍 Scroll to zoom • 📦 Click for details
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// About section
function About() {
  return (
    <section id="about" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Family Heritage</h3>
            <p className="text-muted-foreground">
              Every package is handled with care by our family. We believe in personal touch and traditional values in everything we do.
            </p>
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Traditional Methods</h3>
            <p className="text-muted-foreground">
              We honor time-tested methods of harvesting and processing herbs, ensuring authenticity and potency in every batch.
            </p>
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Modern Standards</h3>
            <p className="text-muted-foreground">
              While rooted in tradition, we maintain modern quality standards, transparent sourcing, and ethical practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Videos section
function Videos() {
  // Using placeholder video URLs - in production, these would be real video files
  const videos = [
    {
      title: "Natural Vegan Products Journey",
      thumbnail: product1,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      title: "From Farm to Package",
      thumbnail: product3,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ]

  return (
    <section id="videos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">See Our Story</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how we cultivate, harvest, and package our natural vegan products with care and authenticity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <VideoPlayer {...video} />
              <h3 className="text-xl font-semibold mt-4 text-center text-foreground">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact section
function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-6 text-foreground">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions about our products or want to place a bulk order? We'd love to hear from you.
          </p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
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
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-xl brand-font">Nidhi Farms</span>
            </div>
            <p className="text-white/70 text-sm">
              Pure, small-batch, family-handled herbs — rooted in tradition, made for modern life.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-white/70 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#products" className="text-white/70 hover:text-primary transition-colors">Products</a></li>
              <li><a href="#about" className="text-white/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Dried Roots</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Herbal Powders</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Organic Herbs</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Bulk Orders</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">Get access to rare herb drops</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
          <p>© 2025 Nidhi Farms — Family-handled herbs. Packaging & fulfillment by family.</p>
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

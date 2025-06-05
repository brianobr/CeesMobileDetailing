import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { toast } = useToast();

  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Handle contact form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    console.log('Form submission data:', data);
    
    toast({
      title: "Quote Request Submitted!",
      description: "Thank you for your quote request! We will contact you within 24 hours.",
    });
    
    e.currentTarget.reset();
  };

  // Track active section on scroll
  useEffect(() => {
    const updateActiveSection = () => {
      const sections = ['home', 'about', 'services', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-poppins font-bold text-primary">Cee's Mobile Detailing</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.id 
                        ? 'text-primary font-semibold' 
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-secondary hover:text-primary"
              >
                <i className="fas fa-bars text-xl"></i>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id 
                      ? 'text-primary font-semibold' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-blue-800 text-white pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 leading-tight">
            Premium Mobile Car Detailing
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional car detailing and wash services that come to you. We bring showroom quality results to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-accent hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Book Service Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200"
            >
              <a href="tel:+13128984141" className="flex items-center gap-2">
                <i className="fas fa-phone"></i>
                Call (312) 898-4141
              </a>
            </Button>
          </div>
          <div className="flex justify-center items-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <i className="fas fa-clock"></i>
              <span>Open 24 Hours Most Days</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-mobile-alt"></i>
              <span>Mobile Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-4">About Cee's Mobile Detailing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Professional car detailing and wash services with a commitment to excellence and customer satisfaction.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional car detailing service" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-poppins font-semibold text-secondary">Your Trusted Mobile Car Care Specialists</h3>
              <p className="text-gray-600 leading-relaxed">
                At Cee's Mobile Detailing and Car Wash, we bring professional automotive care directly to your location. Our experienced team uses premium products and techniques to restore and protect your vehicle's appearance.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-award text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">Premium Quality</h4>
                    <p className="text-sm text-gray-600">Professional-grade products</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <i className="fas fa-clock text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">Convenient Hours</h4>
                    <p className="text-sm text-gray-600">Open 24 hours most days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-mobile-alt text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">Mobile Service</h4>
                    <p className="text-sm text-gray-600">We come to you</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-handshake text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">Satisfaction Guaranteed</h4>
                    <p className="text-sm text-gray-600">100% customer focus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Complete mobile car detailing and wash services tailored to keep your vehicle looking its best.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-car",
                title: "Exterior Detailing",
                description: "Complete exterior wash, clay bar treatment, polishing, and protective wax application for a showroom finish.",
                features: ["Hand wash and dry", "Clay bar treatment", "Paint correction", "Wax and sealant application"],
                color: "bg-primary"
              },
              {
                icon: "fas fa-chair",
                title: "Interior Detailing", 
                description: "Deep cleaning and conditioning of all interior surfaces including seats, carpets, dashboard, and trim.",
                features: ["Vacuum and steam cleaning", "Leather conditioning", "Dashboard and trim care", "Glass cleaning"],
                color: "bg-accent"
              },
              {
                icon: "fas fa-star",
                title: "Full Detail Package",
                description: "Complete interior and exterior detailing service for the ultimate car care experience.",
                features: ["Complete exterior detail", "Complete interior detail", "Engine bay cleaning", "Tire and rim care"],
                color: "bg-green-500"
              },
              {
                icon: "fas fa-tint",
                title: "Express Wash",
                description: "Quick and efficient wash service perfect for regular maintenance between full details.",
                features: ["Exterior wash and rinse", "Wheel and tire cleaning", "Quick interior vacuum", "Window cleaning"],
                color: "bg-purple-500"
              },
              {
                icon: "fas fa-shield-alt",
                title: "Paint Protection",
                description: "Advanced protective coatings and treatments to preserve your vehicle's paint and finish.",
                features: ["Ceramic coating application", "Paint protection film", "Long-term protection", "UV damage prevention"],
                color: "bg-red-500"
              },
              {
                icon: "fas fa-calendar-check",
                title: "Maintenance Plans",
                description: "Regular scheduled detailing services to keep your vehicle in pristine condition year-round.",
                features: ["Weekly wash services", "Monthly detail packages", "Seasonal protection", "Priority scheduling"],
                color: "bg-indigo-500"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4`}>
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-secondary mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get a Quote Today
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Don't just take our word for it. Here's what our satisfied customers have to say about our mobile detailing services.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                rating: 5,
                review: "Absolutely amazing service! My car looks brand new after their full detail package. The team was professional, punctual, and the results exceeded my expectations.",
                name: "Sarah Johnson",
                title: "Verified Customer",
                color: "bg-primary"
              },
              {
                rating: 5,
                review: "Love the convenience of mobile service! They came right to my office and detailed my car while I worked. Perfect results and saved me so much time.",
                name: "Mike Rodriguez", 
                title: "Business Owner",
                color: "bg-accent"
              },
              {
                rating: 5,
                review: "Outstanding attention to detail! Every surface was pristine. The paint protection service has kept my car looking amazing for months. Highly recommend!",
                name: "Jennifer Chen",
                title: "Regular Customer",
                color: "bg-green-500"
              },
              {
                rating: 5,
                review: "Great value for money! The express wash service is perfect for my weekly maintenance. Always professional and my car always looks great.",
                name: "David Thompson",
                title: "Monthly Service Plan",
                color: "bg-purple-500"
              },
              {
                rating: 5,
                review: "Flexible scheduling and excellent communication. They worked around my busy schedule and delivered exceptional results. Will definitely use again!",
                name: "Lisa Martinez",
                title: "First-time Customer", 
                color: "bg-indigo-500"
              },
              {
                rating: 5,
                review: "The interior detailing was incredible! They got stains out that I thought were permanent. My car interior looks and smells like new. Amazing work!",
                name: "Robert Wilson",
                title: "Interior Detail Service",
                color: "bg-red-500"
              }
            ].map((review, index) => (
              <Card key={index} className="bg-white shadow-lg border border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">5.0</span>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center mr-3`}>
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-white rounded-lg px-6 py-4 shadow-lg">
              <div className="flex text-yellow-400 text-xl">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-secondary">4.9/5 Average Rating</div>
                <div className="text-sm text-gray-600">Based on 150+ customer reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Ready to give your car the care it deserves? Contact us today to schedule your mobile detailing service.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">Phone</h3>
                  <p className="text-gray-600 mb-2">Call us for immediate service or questions</p>
                  <a href="tel:+13128984141" className="text-primary font-semibold text-lg hover:text-blue-700 transition-colors">(312) 898-4141</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">Business Hours</h3>
                  <div className="space-y-1 text-gray-600">
                    <p><span className="font-medium">Monday:</span> Open 24 hours</p>
                    <p><span className="font-medium">Tuesday - Friday:</span> Open 24 hours</p>
                    <p><span className="font-medium">Saturday:</span> 7:00 AM - 7:30 PM</p>
                    <p><span className="font-medium">Sunday:</span> Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-mobile-alt text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">Mobile Service Area</h3>
                  <p className="text-gray-600">We bring our professional detailing services directly to your location - home, office, or anywhere convenient for you.</p>
                </div>
              </div>

              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-secondary mb-3">Why Choose Mobile Detailing?</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-green-500"></i>
                      <span>Save time - no travel required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-green-500"></i>
                      <span>Work continues while we detail</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-green-500"></i>
                      <span>Convenient scheduling options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-green-500"></i>
                      <span>Professional equipment on-site</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-poppins font-semibold text-secondary mb-6">Request a Quote</h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">First Name</Label>
                      <Input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Last Name</Label>
                      <Input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        required 
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Phone Number</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Service Interested In</Label>
                    <Select name="service" required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exterior">Exterior Detailing</SelectItem>
                        <SelectItem value="interior">Interior Detailing</SelectItem>
                        <SelectItem value="full">Full Detail Package</SelectItem>
                        <SelectItem value="express">Express Wash</SelectItem>
                        <SelectItem value="protection">Paint Protection</SelectItem>
                        <SelectItem value="maintenance">Maintenance Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="vehicleInfo" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Vehicle Information</Label>
                    <Input 
                      type="text" 
                      id="vehicleInfo" 
                      name="vehicleInfo" 
                      placeholder="Year, Make, Model (e.g., 2020 Honda Accord)" 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Service Location</Label>
                    <Input 
                      type="text" 
                      id="location" 
                      name="location" 
                      placeholder="Home, Office, or Other Address" 
                      required 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Additional Details</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      placeholder="Tell us about your vehicle's condition, preferred dates, or any special requests..." 
                      className="mt-1 resize-vertical"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                  >
                    Request Quote
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-600 mb-3">Prefer to call directly?</p>
                  <Button asChild className="bg-accent hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                    <a href="tel:+13128984141" className="inline-flex items-center gap-2">
                      <i className="fas fa-phone"></i>
                      Call (312) 898-4141
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-poppins font-bold mb-4">Cee's Mobile Detailing</h3>
              <p className="text-gray-300 mb-4">Professional mobile car detailing and wash services that bring showroom quality results to your doorstep.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <i className="fab fa-google"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-primary"></i>
                  <a href="tel:+13128984141" className="text-gray-300 hover:text-white transition-colors">(312) 898-4141</a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-clock text-primary"></i>
                  <span className="text-gray-300">Open 24 Hours Most Days</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-mobile-alt text-primary"></i>
                  <span className="text-gray-300">Mobile Service Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 Cee's Mobile Detailing and Car Wash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

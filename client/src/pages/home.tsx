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
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-crown text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-secondary leading-tight">CEE'S MOBILE</h1>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">DETAILING</p>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 uppercase tracking-wide ${
                    activeSection === item.id 
                      ? 'text-accent font-bold border-b-2 border-accent pb-1' 
                      : 'text-secondary hover:text-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                asChild
                className="bg-accent hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-none text-sm transition-all duration-200 uppercase tracking-wide"
              >
                <a href="tel:+13128984141">Get in Touch</a>
              </Button>
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
      <section id="home" className="relative min-h-screen flex items-center justify-center text-white pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-wider uppercase text-white drop-shadow-2xl">
              <span itemProp="name">Detailing That<br />
              <span className="text-accent drop-shadow-lg">Drives Attention</span></span>
            </h1>
            <p className="text-2xl md:text-3xl mb-8 font-medium leading-relaxed text-white drop-shadow-lg bg-black bg-opacity-30 inline-block px-4 py-2 rounded-lg">
              Shine, protection, and polish—delivered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Button 
                size="lg"
                asChild
                className="bg-accent hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-none text-lg transition-all duration-200 uppercase tracking-wide"
              >
                <a href="tel:+13128984141">Call (312) 898-4141</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('services')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-4 px-8 rounded-none text-lg transition-all duration-200 uppercase tracking-wide"
              >
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-accent font-semibold tracking-wide uppercase mb-2">Little Elm's Highly Rated Mobile Detailing Service</p>
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                Drive Away in a Professionally Detailed and Protected Ride!
              </h2>
              <div className="w-20 h-1 bg-accent mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                The trust that a vehicle owner puts in the hands of professional detailers is not something to ever be taken lightly. This is their pride and joy, direct mode of transportation, and something that they value as an asset, just as much as they view their home or other personal artifacts.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Since we became an established mobile detailing service, Cee's Mobile Detailing has collected vehicle enhancement credentials through extensive product training and hands-on experience. We specialize in ceramic coating applications, paint protection services, and comprehensive detailing packages.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With our mobile service operating out of Little Elm and covering most North Dallas cities, we are able to serve many cars, trucks, SUVs, and other vehicles throughout the region. We do not limit our detailing capabilities, as we want each and every vehicle owner to drive something they can truly be proud of for years to come.
              </p>
              <Button 
                size="lg"
                asChild
                className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-none text-lg transition-all duration-200 uppercase tracking-wide"
              >
                <a href="tel:+13128984141">Call (312) 898-4141</a>
              </Button>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional car detailing service showing premium results" 
                className="w-full h-auto shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">At Cee's Mobile Detailing, You Receive Top-Tier Car Care</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Paint Protection Film (PPF)",
                description: "Lock pristine auto paintwork behind a self-healing and gloss-enhancing paint protection film! Our team specializes in premium Clear Bra products, providing the necessary maintenance efforts that help them stop swirls, scratches, and more.",
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              },
              {
                title: "Ceramic Coating",
                description: "Hand-applied by automotive artists and experts, our ceramic coating packages deliver some of the slickest surface hydrophobicity and diamond-like shine to all cars, trucks, and SUVs. Get a professional auto ceramic coating and see the difference it makes in your vehicle's value!",
                image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              },
              {
                title: "Mobile Detailing",
                description: "Even through all the sunshine and rather temperate environment, there is still a slew of contamination that affects paintwork and wheels while sneaking inside with every passenger. Professional exterior and interior vehicle detailing services will handle all of these issues.",
                image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              },
              {
                title: "Express Wash & Maintenance",
                description: "Protection efforts for a vehicle traditionally go beyond detailing and surface sealants. Our express wash packages create a shield for your automobile, maintaining that fresh, clean appearance between full detail services.",
                image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              }
            ].map((service, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <Button 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  onClick={() => scrollToSection('contact')}
                >
                  Learn More
                </Button>
              </div>
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
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Cee's Mobile Detailing - Committed to Quality & Your Experience</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Cee's Mobile Detailing is a top-rated car care service operating out of Little Elm and serving most North Dallas cities. Our team of skilled technicians is dedicated to providing honest and reliable service to our clients. We understand that caring for your car can be overwhelming, which is why we make it our mission to educate our clients on the best practices for keeping their vehicles in top condition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-award text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Premium Materials</h3>
              <p className="text-gray-600">We use only the highest quality materials and products to ensure that our clients receive the best results possible.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Expert Technicians</h3>
              <p className="text-gray-600">Our team is easy to work with and always willing to answer any questions you may have. We strive to make the car care process as stress-free as possible.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-mobile-alt text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Mobile Convenience</h3>
              <p className="text-gray-600">Whether you need a quick clean or a full detailing, we bring our professional services directly to your location.</p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              asChild
              className="bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-none text-lg transition-all duration-200 uppercase tracking-wide"
            >
              <a href="tel:+13128984141">Call (312) 898-4141</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Notable Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Notable Vehicle Detailing Projects</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Tesla Model S - Full PPF Installation",
                description: "Complete paint protection film installation with ceramic coating for ultimate protection and gloss."
              },
              {
                image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "BMW M3 - Premium Ceramic Coating",
                description: "Professional ceramic coating application delivering diamond-like shine and hydrophobic protection."
              },
              {
                image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Mercedes-Benz - Interior & Exterior Detail",
                description: "Complete detailing package including leather conditioning, paint correction, and protective treatments."
              },
              {
                image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Porsche 911 - Paint Correction",
                description: "Multi-stage paint correction removing swirl marks and restoring factory-level gloss."
              },
              {
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Audi R8 - Full Protection Package",
                description: "Comprehensive protection including PPF, ceramic coating, and interior guard treatments."
              },
              {
                image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                title: "Range Rover - Mobile Detail Service",
                description: "On-location premium detailing service with complete interior and exterior restoration."
              }
            ].map((project, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Get In Touch</h2>
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
                    <p><span className="font-medium">Daily:</span> Daylight hours, 7 days a week</p>
                    <p className="text-sm italic">Operating hours vary by season and daylight availability</p>
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
                <h3 className="text-2xl font-bold text-secondary mb-6">Request a Quote</h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">First Name</Label>
                      <Input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">Last Name</Label>
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
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vehicleType" className="text-sm font-medium text-gray-700 mb-2 block">Vehicle Type</Label>
                    <Select name="vehicleType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="luxury">Luxury Vehicle</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-sm font-medium text-gray-700 mb-2 block">Service Type</Label>
                    <Select name="serviceType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="express-wash">Express Wash</SelectItem>
                        <SelectItem value="interior-detail">Interior Detailing</SelectItem>
                        <SelectItem value="exterior-detail">Exterior Detailing</SelectItem>
                        <SelectItem value="full-detail">Full Detail Package</SelectItem>
                        <SelectItem value="paint-protection">Paint Protection</SelectItem>
                        <SelectItem value="ceramic-coating">Ceramic Coating</SelectItem>
                        <SelectItem value="maintenance-plan">Maintenance Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">Additional Details</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your vehicle's condition, specific concerns, or any special requests..."
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 text-lg transition-all duration-200"
                  >
                    Request Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-crown text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">CEE'S MOBILE</h3>
                  <p className="text-xs text-gray-300 uppercase tracking-wider">DETAILING</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Professional mobile car detailing and wash services that come to you. We bring showroom quality results to your doorstep with premium products and expert techniques.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <i className="fab fa-instagram text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <i className="fab fa-google text-white"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Mobile Detailing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Paint Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ceramic Coating</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interior Cleaning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Express Wash</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-primary"></i>
                  <a href="tel:+13128984141" className="text-gray-300 hover:text-white transition-colors">(312) 898-4141</a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-clock text-primary"></i>
                  <span className="text-gray-300">Daylight Hours, 7 Days a Week</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-mobile-alt text-primary"></i>
                  <span className="text-gray-300">Mobile Service Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-center md:text-left">
                <p className="text-gray-300">&copy; 2025 Cee's Mobile Detailing and Car Wash. All rights reserved.</p>
              </div>
              <div className="text-center md:text-right">
                <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                  <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">About</button>
                  <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">Services</button>
                  <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
                  <a href="/sitemap.xml" className="text-gray-300 hover:text-white transition-colors">Sitemap</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
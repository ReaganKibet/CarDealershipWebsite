import React from 'react';
import { Shield, Award, Users, Globe, PenTool as Tool, Truck } from 'lucide-react';

function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">About Wilphil Imports</h1>
              <p className="text-xl leading-relaxed">Your trusted partner in premium vehicle imports since 1990. We bring the finest vehicles from Japan, UK, and Thailand directly to you, ensuring quality and reliability in every import.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 1990, Wilphil Imports has been at the forefront of the automotive import industry in Kenya. What started as a small family business has grown into one of the most trusted names in premium vehicle imports.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our commitment to quality, transparency, and customer satisfaction has earned us a reputation as the go-to destination for discerning car enthusiasts and businesses alike.
              </p>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">30+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">10k+</div>
                  <div className="text-gray-600">Cars Imported</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1619551734325-81aaf323686c?auto=format&fit=crop&q=80&w=1000" 
                alt="Our History" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1627454819213-0e7e3daf1b16?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Present" 
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-red-600" size={40} />,
                title: "Quality Assurance",
                description: "Every vehicle undergoes rigorous inspection and verification before import."
              },
              {
                icon: <Globe className="text-red-600" size={40} />,
                title: "Global Network",
                description: "Direct partnerships with dealers in Japan, UK, and Thailand."
              },
              {
                icon: <Tool className="text-red-600" size={40} />,
                title: "Expert Service",
                description: "Professional team with decades of experience in vehicle imports."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Our Import Process</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-red-200 -translate-y-1/2 hidden md:block"></div>
            <div className="grid md:grid-cols-4 gap-8 relative">
              {[
                {
                  icon: <Users size={32} />,
                  title: "Consultation",
                  description: "Understand your needs and preferences"
                },
                {
                  icon: <Globe size={32} />,
                  title: "Sourcing",
                  description: "Find the perfect vehicle from our global network"
                },
                {
                  icon: <Truck size={32} />,
                  title: "Import",
                  description: "Handle all shipping and customs procedures"
                },
                {
                  icon: <Award size={32} />,
                  title: "Delivery",
                  description: "Safe delivery to your specified location"
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg relative z-10">
                  <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center absolute -top-8 left-1/2 -translate-x-1/2">
                    {step.icon}
                  </div>
                  <div className="text-center pt-10">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div 
        className="bg-cover bg-center py-20 relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2070")',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Import Your Dream Car?</h2>
          <p className="text-xl mb-8 text-gray-200">Contact us today and let our experts guide you through the process.</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
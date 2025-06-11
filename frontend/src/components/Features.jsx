import { Shield, Zap, BarChart3, QrCode, Calendar, Users, Globe, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Password Protection",
      description: "Secure your links with password protection to control access and maintain privacy."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Custom URLs",
      description: "Create memorable, branded short URLs with custom IDs that reflect your brand."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track clicks, geographic data, referrers, and user engagement in real-time."
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Generation",
      description: "Automatically generate QR codes for your short links, perfect for offline sharing."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Link Expiration",
      description: "Set expiration dates for your links to automatically disable them when needed."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Bulk Operations",
      description: "Shorten multiple URLs at once and manage large campaigns efficiently."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global CDN",
      description: "Lightning-fast redirects worldwide with our global content delivery network."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Responsive design that works perfectly on all devices and screen sizes."
    }
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto mb-12">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to create, manage, and track your short links with professional-grade features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover-lift group"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-12 text-white">
          <h4 className="text-3xl font-bold mb-4">Ready to Get Started?</h4>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust ShortlyPro for their URL shortening needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

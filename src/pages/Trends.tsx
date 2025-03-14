import React from 'react';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Trends() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Most Popular Cars in Kenya 2024",
      excerpt: "Discover the most sought-after vehicles in the Kenyan market, from reliable family cars to luxury imports.",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=2070",
      author: "John Kamau",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Market Analysis"
    },
    {
      id: 2,
      title: "Guide to Importing Cars from Japan to Kenya",
      excerpt: "Everything you need to know about the import process, regulations, and costs involved in importing Japanese vehicles.",
      image: "https://images.unsplash.com/photo-1557411732-1797a9171fcf?auto=format&fit=crop&q=80&w=2070",
      author: "Sarah Wanjiku",
      date: "March 12, 2024",
      readTime: "12 min read",
      category: "Import Guide"
    },
    {
      id: 3,
      title: "Electric Vehicles: The Future of Kenyan Roads?",
      excerpt: "Analyzing the potential and challenges of EV adoption in Kenya, including infrastructure and cost considerations.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2070",
      author: "Michael Odhiambo",
      date: "March 10, 2024",
      readTime: "10 min read",
      category: "Future Trends"
    },
    {
      id: 4,
      title: "Best Family SUVs Under KSh 3 Million",
      excerpt: "A comprehensive comparison of affordable SUVs that offer great value for Kenyan families.",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2070",
      author: "Alice Muthoni",
      date: "March 8, 2024",
      readTime: "15 min read",
      category: "Buying Guide"
    }
  ];

  const categories = [
    "Market Analysis",
    "Import Guide",
    "Future Trends",
    "Buying Guide",
    "Maintenance Tips",
    "Industry News"
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16 border-b">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">Car Market Trends & Insights</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stay updated with the latest trends, market analysis, and expert insights about the Kenyan automotive market.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="grid gap-8">
              {blogPosts.map(post => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                        <span className="bg-red-100 px-3 py-1 rounded-full">{post.category}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 hover:text-red-600 transition-colors">
                        <Link to={`/trends/${post.id}`}>{post.title}</Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/trends/category/${category.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center justify-between p-2 hover:bg-red-50 rounded-lg group"
                  >
                    <span className="text-gray-600 group-hover:text-red-600">{category}</span>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070"
                alt="Featured Article"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">2024 Car Import Guide</h3>
                <p className="text-gray-600 mb-4">
                  Essential information for importing your dream car to Kenya in 2024.
                </p>
                <Link 
                  to="/trends/import-guide-2024"
                  className="inline-flex items-center text-red-600 hover:text-red-700"
                >
                  Read More <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
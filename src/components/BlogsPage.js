import React, { useState, useEffect } from "react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBlogs([
        {
          id: 1,
          title: "The Beauty of Kodaikanal",
          author: "Arun Kumar",
          date: "Feb 15, 2025",
          image: "./blog_1.jpg",
          description: "Kodaikanal, the 'Princess of Hill Stations', is known for its lush greenery, serene lakes, and cool weather.",
        },
        {
          id: 2,
          title: "Chettinad Cuisine: A Culinary Delight",
          author: "Meena Ramesh",
          date: "Jan 30, 2025",
          image: "./blog2.jpg",
          description: "Chettinad cuisine is famous for its spicy flavors and aromatic spices, making it a must-try in Tamil Nadu.",
        },
        {
          id: 3,
          title: "Mahabalipuram: Ancient Wonders by the Sea",
          author: "Rajesh Nair",
          date: "Feb 10, 2025",
          image: "./blog3.jpg",
          description: "Mahabalipuram is a UNESCO Heritage site with ancient rock carvings and breathtaking seaside temples.",
        },
        {
          id: 4,
          title: "Ooty: The Queen of Hills",
          author: "Priya Srinivasan",
          date: "March 5, 2025",
          image: "./blog4.jpg",
          description: "Ooty, nestled in the Nilgiri Hills, is famous for its tea gardens, misty mountains, and colonial charm. A perfect getaway for nature lovers!",
        },
        {
          id: 5,
          title: "Yercaud: Tamil Nadu’s Hidden Gem",
          author: "Naveen Kumar",
          date: "June 15, 2025",
          image: "./blog5.jpg",
          description: "Yercaud, a lesser-known hill station in Tamil Nadu, is famous for its coffee plantations, scenic viewpoints, and peaceful environment.",
        },  
        {
          id: 6,
          title: "Exploring the Mangrove Forests of Pichavaram",
          author: "Sandhya Ramesh",
          date: "September 22, 2025",
          image: "./blog6.jpg",
          description: "Take a boat ride through the Pichavaram Mangrove Forests, one of the largest in the world, best explored post-monsoon for a mesmerizing experience.",
        },
        {
          id: 7,
          title: "Kumbakonam Degree Coffee: A South Indian Classic",
          author: "Meera Venkat",
          date: "April 5, 2025",
          image: "./blog7.png",
          description: "Taste the rich, aromatic Kumbakonam Degree Coffee, a must-try for coffee lovers visiting Tamil Nadu.",
        },
        {
          id: 8,
          title: "Jallikattu: The Thrilling Tradition of Tamil Nadu",
          author: "Karthik Rangan",
          date: "January 16, 2025",
          image: "./event.jpg",
          description: "Jallikattu, a centuries-old bull-taming sport, is an integral part of Tamil Nadu’s Pongal celebrations, showcasing bravery, tradition, and the deep connection between farmers and native bull breeds.",
        
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto p-6 pr-0  rounded-lg">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Tamil Nadu</h1>
      {loading ? (
        <p className="text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-800">{blog.title}</h2>
                <p className="text-gray-500 text-sm mt-1">By {blog.author} | {blog.date}</p>
                <p className="text-gray-700 mt-3">{blog.description.substring(0, 150)}...</p>
                <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;

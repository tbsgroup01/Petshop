import React from "react";

import { ArrowRight, Calendar, User, Clock } from "lucide-react";


import nutrationImg from "../../../assets/nutration6.jpg";
import healthImg from "../../../assets/health6.jpg";
import trainingImg from "../../../assets/training7.jpg";


const BlogCard = ({
  category,
  title,
  description,
  image,
  author,
  date,
  readTime,
}) => (
  <div className="group bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
    {/* Image Container */}

    <div className="h-40 sm:h-64 overflow-hidden relative">
      <div className="absolute top-2 sm:top-5 left-2 sm:left-5 z-10">
        <span className="bg-white/90 backdrop-blur-md text-indigo-600 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-[8px] sm:text-[10px] tracking-widest uppercase shadow-sm">
          {category}
        </span>
      </div>

      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>

    {/* Content Section */}

    <div className="p-4 sm:p-8 flex flex-col flex-grow">
      {/* Meta Info */}

      <div className="flex items-center gap-2 sm:gap-4 text-slate-400 text-xs mb-2 sm:mb-4 font-medium flex-wrap">
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-indigo-400" />

          <span className="text-xs">{date}</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock size={12} className="text-indigo-400" />

          <span className="text-xs">{readTime}</span>
        </div>
      </div>

      <h3 className="text-slate-800 font-bold text-sm sm:text-xl mb-2 sm:mb-4 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
        {title}
      </h3>

      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-8 flex-grow line-clamp-2 sm:line-clamp-3">
        {description}
      </p>

      <div className="pt-3 sm:pt-6 border-t border-slate-50 flex items-center justify-between">
        {/* Author */}

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <User size={12} className="sm:block hidden" />
            <User size={10} className="sm:hidden" />
          </div>

          <span className="text-slate-700 font-bold text-xs line-clamp-1">{author}</span>
        </div>

        <button className="flex items-center text-indigo-600 font-bold text-xs sm:text-sm group-hover:gap-1 sm:group-hover:gap-2 transition-all flex-shrink-0">
          <span className="hidden xs:inline">Read</span> <ArrowRight size={14} className="ml-0.5 sm:ml-1" />
        </button>
      </div>
    </div>
  </div>
);

const BlogSection = () => {
  const blogs = [
    {
      category: "Nutrition",

      title: "Puppy Nutrition: The First 6 Months",

      description:
        "Learn about the essential nutrients your growing puppy needs to build a strong immune system and healthy bones.",

      image: nutrationImg,

      author: "Dr. Arpit",

      date: "Oct 12, 2023",

      readTime: "5 min read",
    },

    {
      category: "Health",

      title: "Understanding Pet Vaccinations",

      description:
        "A comprehensive guide to the essential vaccines every pet needs to stay protected against common diseases.",

      image: healthImg,

      author: "Dr. Shiva",

      date: "Oct 10, 2023",

      readTime: "8 min read",
    },

    {
      category: "Training",

      title: "Positive Reinforcement Basics",

      description:
        "Discover how positive reinforcement can transform your relationship with your pet and make training fun.",

      image: trainingImg,

      author: "Expert Rahul",

      date: "Oct 08, 2023",

      readTime: "6 min read",
    },
  ];

  return (
    <section className="px-3 sm:px-6 md:px-10 py-12 sm:py-24 bg-[#F8F9FE] relative overflow-hidden">
      {/* Decorative Background Blob */}

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-2 sm:px-4 py-1 sm:py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold tracking-widest uppercase mb-2 sm:mb-4">
              Our Journal
            </div>

            <h2 className="text-slate-800 text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-4">
              Latest From Our Blog
            </h2>

            <p className="text-slate-500 text-sm sm:text-lg leading-relaxed">
              Expert advice from our veterinary team to help you provide the
              best care for your furry friends.
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-200 transition-all shadow-sm text-sm">
            View All Posts <ArrowRight size={18} />
          </button>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>

        {/* Mobile View All */}

        <div className="mt-8 sm:mt-12 text-center md:hidden">
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 px-6 py-3 sm:py-4 rounded-lg sm:rounded-2xl font-bold text-white shadow-lg shadow-indigo-100 text-sm sm:text-base">
            View All Posts <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

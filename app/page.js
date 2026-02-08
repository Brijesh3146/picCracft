"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";

import Link from "next/link";
import { Sparkles, Wand2, Palette, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const [bgColorIndex, setBgColorIndex] = useState(0);
  const fullText = "Create Stunning Designs in Minutes";

  const bgColors = [
    "from-blue-100 to-blue-50",
    "from-purple-100 to-purple-50",
    "from-indigo-100 to-indigo-50",
    "from-cyan-100 to-cyan-50",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setBgColorIndex((prev) => (prev + 1) % bgColors.length);
    }, 3000);
    return () => clearInterval(colorInterval);
  }, []);

  const features = [
    {
      icon: Palette,
      title: "Design Canvas",
      desc: "Create stunning designs with our intuitive canvas editor",
    },
    {
      icon: Wand2,
      title: "AI Transformations",
      desc: "Remove backgrounds, upscale images, and generate fills with AI",
    },
    {
      icon: Sparkles,
      title: "Templates",
      desc: "Start instantly with professionally designed templates",
    },
    {
      icon: Download,
      title: "Export Anywhere",
      desc: "Download for social media, presentations, and more",
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColors[bgColorIndex]} text-gray-900 relative overflow-hidden transition-all duration-1000`}>
      <div className="relative z-10">
      {/* Navigation */}
      <nav className={`flex justify-between items-center px-6 py-5 border-b border-blue-200 bg-gradient-to-br ${bgColors[bgColorIndex]} sticky top-0 z-50 shadow-md hover:shadow-lg transition-all duration-1000`}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-700 bg-clip-text text-transparent">
            PicCraft
          </h1>
          <div className="flex items-center gap-6">
            <Link href="/handler/sign-in" className="text-gray-600 font-medium">
              Sign In
            </Link>
            <Link href="/handler/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition">
                Sign Up
              </Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-36 text-center group">
        <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:via-purple-800 group-hover:to-pink-800 transition-all duration-300">
          {displayedText || "Create Stunning Designs in Minutes"}
        </h2>
        <p className="text-lg text-gray-700 mb-14 max-w-2xl mx-auto leading-relaxed italic">
          Professional graphic design made simple. Edit images, create social media posts, and design marketing materials with AI-powered tools.
        </p>
        <Link href="/workspace">
          <Button className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white px-10 py-7 text-lg rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95">
            Start Creating →
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 rounded-3xl">
        <h3 className="text-4xl font-bold text-center mb-16 text-gray-900 hover:text-gray-950 transition-colors">Powerful Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform ${
                  isHovered
                    ? "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-purple-500 shadow-2xl -translate-y-3 scale-110"
                    : "bg-white border-blue-200 shadow-lg hover:shadow-2xl hover:border-purple-400"
                }`}
              >
                <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center transition-all ${
                  isHovered
                    ? "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-xl scale-110"
                    : "bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 hover:scale-105"
                }`}>
                  <Icon className={`w-8 h-8 ${
                    isHovered ? "text-white" : "text-blue-600"
                  }`} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center group">
        <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 rounded-3xl p-1 shadow-2xl group-hover:shadow-3xl transition-shadow">
          <div className="bg-white rounded-3xl p-16 group-hover:bg-slate-50 transition-colors">
            <h3 className="text-4xl font-bold mb-4 text-gray-900 group-hover:text-gray-950 transition-colors">Ready to Create?</h3>
            <p className="text-gray-700 mb-10 text-lg group-hover:text-gray-800 transition-colors">Join thousands of creators designing beautiful content</p>
            <Link href="/workspace">
              <Button className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white px-10 py-6 text-lg rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95">
                Get Started Free →
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

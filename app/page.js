"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Wand2, Palette, Download } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          PicCraft
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/handler/sign-in" className="text-gray-300 hover:text-white transition">
            Sign In
          </Link>
          <Link href="/handler/sign-up">
            <Button className="bg-purple-500 hover:bg-purple-600">
              Sign Up
            </Button>
          </Link>
          <UserButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Create Stunning Designs in Minutes
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Professional graphic design made simple. Edit images, create social media posts, and design marketing materials with AI-powered tools.
        </p>
        <Link href="/workspace">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg">
            Start Creating
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold text-center mb-16">Powerful Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                  hoveredFeature === idx
                    ? "bg-purple-500/20 border-purple-400 scale-105"
                    : "bg-slate-800/50 border-slate-700 hover:border-purple-400"
                }`}
              >
                <Icon className="w-12 h-12 mb-4 text-purple-400" />
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Create?</h3>
          <p className="text-gray-300 mb-8">Join thousands of creators designing beautiful content</p>
          <Link href="/workspace">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Wand2, Palette, Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const user = useUser();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const designShowcase = [
    { id: 1, title: "Social Media Post", color: "from-pink-500 to-rose-500" },
    { id: 2, title: "YouTube Thumbnail", color: "from-blue-500 to-cyan-500" },
    { id: 3, title: "Instagram Story", color: "from-purple-500 to-pink-500" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % designShowcase.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Palette, title: "Drag & Drop Editor", desc: "Intuitive canvas with real-time editing" },
    { icon: Wand2, title: "AI Magic Tools", desc: "Background removal, upscaling, and more" },
    { icon: Sparkles, title: "Templates", desc: "Ready-made designs for every need" },
    { icon: Download, title: "Export PNG", desc: "Download images in high quality PNG" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="PicCraft" width={50} height={50} />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">PicCraft</span>
          </div>
          <div className="flex items-center gap-4">
            {!user && (
              <>
                <Link href="/handler/sign-in" className="hidden sm:block text-gray-700 hover:text-gray-900 font-medium transition">
                  Sign In
                </Link>
                <Link href="/handler/sign-up">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Create designs
                <br />in <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">minutes</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Create stunning graphics for social media, presentations, and marketing with our intuitive canvas editor and AI-powered tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/workspace">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all group">
                    Start Designing Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Design Showcase */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {designShowcase.map((design, idx) => (
                  <div
                    key={design.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="w-full h-full rounded-3xl shadow-2xl relative overflow-hidden group">
                      <Image
                        src={`/design-${design.id}.jpg`}
                        alt={design.title}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-1">{design.title}</h3>
                        <p className="text-white/80">Professional Design Template</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Slide indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {designShowcase.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? "w-8 bg-purple-600" : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need to create</h2>
            <p className="text-xl text-gray-600">Powerful tools at your fingertips</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`p-8 rounded-2xl bg-white border-2 transition-all duration-300 cursor-pointer ${
                    hoveredFeature === idx ? "border-purple-500 shadow-xl -translate-y-2" : "border-gray-200 shadow-lg"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 transition-transform ${
                    hoveredFeature === idx ? "scale-110 rotate-6" : ""
                  }`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Design Examples Gallery */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">See what you can create</h2>
            <p className="text-xl text-gray-600">Get inspired by these design examples</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Instagram Post */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-pink-400 via-rose-400 to-red-500 p-8 flex flex-col justify-between">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-white text-sm font-bold mb-3">INSTAGRAM POST</div>
                    <h3 className="text-white text-3xl font-bold mb-2">Summer Sale</h3>
                    <p className="text-white/90 text-lg">Up to 50% OFF</p>
                  </div>
                  <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <Sparkles className="w-10 h-10 text-white" />
                    <span className="text-white font-semibold">Shop Now →</span>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-gray-600 font-medium">Social Media Posts</p>
            </div>

            {/* YouTube Thumbnail */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 p-8 flex flex-col justify-center items-center text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 w-full">
                    <Wand2 className="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 className="text-white text-4xl font-bold mb-3">HOW TO</h3>
                    <p className="text-white/90 text-xl font-semibold">Design Like a Pro</p>
                  </div>
                  <div className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-sm">▶ WATCH NOW</div>
                </div>
              </div>
              <p className="text-center mt-4 text-gray-600 font-medium">YouTube Thumbnails</p>
            </div>

            {/* Marketing Banner */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-white text-xs font-bold mb-2 tracking-widest">NEW COLLECTION</div>
                    <h3 className="text-white text-5xl font-bold mb-2">2026</h3>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <Palette className="w-12 h-12 text-white mb-3" />
                    <p className="text-white text-xl font-bold">Exclusive Designs</p>
                    <p className="text-white/90 text-sm mt-2">Limited Edition</p>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-gray-600 font-medium">Marketing Banners</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/workspace">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg">
                Start Creating Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Start creating today</h2>
              <p className="text-xl mb-8 text-white/90">Join thousands of creators using PicCraft</p>
              <Link href="/workspace">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-6 text-lg rounded-xl shadow-xl">
                  Get Started Free →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

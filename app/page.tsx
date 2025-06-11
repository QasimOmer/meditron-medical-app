"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Bot, FileText, Stethoscope, Heart, Shield, Brain, Pill } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentTip, setCurrentTip] = useState(0)

  const healthTips = [
    "💧 Stay hydrated - drink at least 8 glasses of water daily!",
    "🏃‍♂️ Regular exercise can prevent many chronic diseases!",
    "🥗 A balanced diet rich in fruits and vegetables boosts immunity!",
    "😴 Quality sleep is essential for mental and physical health!",
    "🧘‍♀️ Meditation and stress management improve overall wellbeing!",
    "🚭 Avoid smoking and limit alcohol consumption!",
    "🧼 Regular handwashing prevents infections!",
    "🩺 Don't skip regular medical checkups!",
  ]

  const features = [
    {
      title: "Disease Detection",
      description: "AI-powered symptom analysis and disease prediction",
      icon: Activity,
      href: "/disease-detection",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "X-Ray Analysis",
      description: "Advanced medical imaging analysis and diagnosis",
      icon: Stethoscope,
      href: "/xray-analysis",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Medical Chatbot",
      description: "24/7 AI medical assistant for health queries",
      icon: Bot,
      href: "/chatbot",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Health Reports",
      description: "Comprehensive medical report generation",
      icon: FileText,
      href: "/reports",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  ]

  const stats = [
    { icon: Heart, label: "Patients Helped", value: "10,000+" },
    { icon: Shield, label: "Accuracy Rate", value: "95%" },
    { icon: Brain, label: "AI Models", value: "12" },
    { icon: Pill, label: "Conditions Detected", value: "200+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MEDITRON</h1>
                <p className="text-sm text-gray-600">AI-Powered Healthcare Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">MEDITRON</span> 🏥
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your intelligent healthcare companion for disease prediction, medical imaging analysis, and comprehensive
            health management. Get instant medical insights powered by advanced AI.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Healthcare Service</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader className="text-center">
                    <div
                      className={`${feature.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Ticker */}
      <section className="bg-blue-600 text-white py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-lg font-medium mx-8">{healthTips.join(" • ")}</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">MEDITRON</span>
              </div>
              <p className="text-gray-400">Making healthcare smarter and more accessible through AI technology.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Disease Detection</li>
                <li>X-Ray Analysis</li>
                <li>Medical Chatbot</li>
                <li>Health Reports</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="text-gray-400 space-y-2">
                <p>📧 mqasimomer@gmail.com</p>
                <p>📱 +92 304 8911113</p>
                <p>🌐 qasimomer.github.io</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MEDITRON. All rights reserved to Muhammad Qasim Omer. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

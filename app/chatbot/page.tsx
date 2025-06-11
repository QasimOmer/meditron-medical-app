"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const quickSuggestions = [
  "What are the symptoms of diabetes?",
  "How to maintain a healthy diet?",
  "What are common flu treatments?",
  "How to manage high blood pressure?",
  "What causes headaches?",
  "How to improve sleep quality?",
]

const medicalResponses: Record<string, string> = {
  diabetes:
    "Diabetes symptoms include frequent urination, excessive thirst, unexplained weight loss, fatigue, and blurred vision. Type 1 diabetes often develops quickly, while Type 2 develops gradually. It's important to monitor blood sugar levels and maintain a healthy diet with regular exercise.",
  diet: "A healthy diet should include plenty of fruits and vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, sugar, and excessive salt. Stay hydrated with water, and consider portion control. Consult a nutritionist for personalized advice.",
  flu: "Common flu treatments include rest, staying hydrated, and over-the-counter medications like acetaminophen or ibuprofen for fever and aches. Antiviral medications may be prescribed if caught early. Get plenty of sleep and consider a humidifier for congestion.",
  "blood pressure":
    "Managing high blood pressure involves regular exercise, maintaining a healthy weight, reducing sodium intake, limiting alcohol, managing stress, and taking prescribed medications. Monitor your blood pressure regularly and follow up with your healthcare provider.",
  headache:
    "Headaches can be caused by stress, dehydration, lack of sleep, eye strain, or underlying conditions. Treatment may include rest, hydration, over-the-counter pain relievers, and stress management. Frequent severe headaches should be evaluated by a doctor.",
  sleep:
    "To improve sleep quality: maintain a consistent sleep schedule, create a comfortable sleep environment, avoid caffeine and screens before bedtime, exercise regularly (but not close to bedtime), and manage stress through relaxation techniques.",
}

export default function MedicalChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI medical assistant. I can help answer health-related questions and provide general medical information. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Find matching keywords in the message
    for (const [keyword, response] of Object.entries(medicalResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response
      }
    }

    // Default responses for common patterns
    if (lowerMessage.includes("pain") || lowerMessage.includes("hurt")) {
      return "Pain can have various causes. For acute pain, rest and over-the-counter pain relievers may help. However, persistent or severe pain should be evaluated by a healthcare professional to determine the underlying cause and appropriate treatment."
    }

    if (lowerMessage.includes("fever")) {
      return "Fever is often a sign that your body is fighting an infection. Stay hydrated, rest, and consider fever-reducing medications like acetaminophen or ibuprofen. Seek medical attention if fever is high (over 103°F/39.4°C) or persists for more than 3 days."
    }

    if (lowerMessage.includes("cough")) {
      return "Coughs can be caused by various factors including infections, allergies, or irritants. Stay hydrated, use honey for soothing, and consider a humidifier. See a doctor if the cough persists for more than 2 weeks or is accompanied by blood or severe symptoms."
    }

    // Generic helpful response
    return "I understand you're asking about a health concern. While I can provide general information, it's important to consult with a healthcare professional for personalized medical advice, especially for specific symptoms or conditions. Is there a particular aspect of health you'd like to know more about?"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Chatbot</h1>
              <p className="text-gray-600">24/7 AI medical assistant for health queries</p>
            </div>
          </div>
          <Bot className="h-12 w-12 text-purple-600" />
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-purple-600" />
              <span>Medical Assistant</span>
              <Badge variant="secondary" className="ml-auto">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-1 text-purple-600" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-1 text-white" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${message.sender === "user" ? "text-purple-200" : "text-gray-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <div className="flex space-x-1">
                        <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                        <span className="text-sm text-gray-600">Typing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="border-t p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Suggestions:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your health concerns..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This chatbot provides general health information only. Always consult healthcare professionals for
                medical advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

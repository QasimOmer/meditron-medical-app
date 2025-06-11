"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertCircle, CheckCircle, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

const symptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Shortness of breath",
  "Sore throat",
  "Body ache",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Loss of appetite",
  "Dizziness",
  "Chest pain",
  "Rash",
  "Chills",
  "Joint pain",
  "Runny nose",
  "Congestion",
  "Sweating",
  "Abdominal pain",
  "Muscle weakness",
  "Night sweats",
  "Loss of taste",
  "Loss of smell",
  "Difficulty breathing",
  "Difficulty swallowing",
  "Mouth ulcers",
  "Swollen lymph nodes",
]

const diseaseData = {
  "COVID-19": {
    probability: 0.85,
    description: "A viral respiratory illness caused by SARS-CoV-2",
    symptoms: ["Fever", "Cough", "Loss of taste", "Loss of smell", "Fatigue"],
    precautions: ["Isolate for 10 days", "Wear a mask", "Monitor oxygen levels", "Stay hydrated"],
    diet: ["Warm fluids", "Vitamin C rich foods", "Light, easily digestible meals", "Herbal teas"],
    severity: "moderate",
  },
  "Common Cold": {
    probability: 0.75,
    description: "A viral infection of the upper respiratory tract",
    symptoms: ["Runny nose", "Sore throat", "Cough", "Congestion"],
    precautions: ["Rest well", "Avoid close contact", "Use tissues", "Wash hands frequently"],
    diet: ["Chicken soup", "Warm fluids", "Citrus fruits", "Honey and ginger tea"],
    severity: "mild",
  },
  Influenza: {
    probability: 0.7,
    description: "A viral infection that attacks the respiratory system",
    symptoms: ["Fever", "Body ache", "Fatigue", "Headache", "Chills"],
    precautions: ["Get vaccinated", "Rest and hydrate", "Avoid public places", "Take antiviral medication"],
    diet: ["High-protein foods", "Warm soups", "Electrolyte drinks", "Soft foods"],
    severity: "moderate",
  },
}

export default function DiseaseDetection() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    }
  }

  const analyzeSymptomsWithAI = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis with progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simple prediction logic based on symptom matching
    let bestMatch = ""
    let highestScore = 0

    Object.entries(diseaseData).forEach(([disease, data]) => {
      const matchingSymptoms = selectedSymptoms.filter((symptom) => data.symptoms.includes(symptom)).length
      const score = matchingSymptoms / data.symptoms.length

      if (score > highestScore) {
        highestScore = score
        bestMatch = disease
      }
    })

    setPrediction(bestMatch || "Common Cold")
    setIsAnalyzing(false)
  }

  const generateReport = () => {
    if (!prediction) return

    const disease = diseaseData[prediction as keyof typeof diseaseData]
    const report = `
MEDICAL ANALYSIS REPORT
Generated on: ${new Date().toLocaleDateString()}

PATIENT SYMPTOMS:
${selectedSymptoms.map((s) => `• ${s}`).join("\n")}

PREDICTED CONDITION: ${prediction}
CONFIDENCE: ${Math.round(disease.probability * 100)}%

DESCRIPTION:
${disease.description}

RECOMMENDED PRECAUTIONS:
${disease.precautions.map((p) => `• ${p}`).join("\n")}

DIETARY RECOMMENDATIONS:
${disease.diet.map((d) => `• ${d}`).join("\n")}

SEVERITY: ${disease.severity.toUpperCase()}

DISCLAIMER: This is an AI-generated analysis for informational purposes only. 
Please consult with a healthcare professional for proper medical diagnosis and treatment.
    `

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `medical-report-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "severe":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <h1 className="text-3xl font-bold text-gray-900">Disease Detection</h1>
              <p className="text-gray-600">AI-powered symptom analysis and disease prediction</p>
            </div>
          </div>
          <Activity className="h-12 w-12 text-blue-600" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Symptom Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Symptoms</CardTitle>
                <CardDescription>Choose all symptoms you are currently experiencing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {symptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={selectedSymptoms.includes(symptom)}
                        onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                      />
                      <label
                        htmlFor={symptom}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {symptom}
                      </label>
                    </div>
                  ))}
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Selected Symptoms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <Button
                    onClick={analyzeSymptomsWithAI}
                    disabled={selectedSymptoms.length === 0 || isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Symptoms"}
                  </Button>

                  {isAnalyzing && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>AI Analysis in Progress</span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="w-full" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div>
            {prediction && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Analysis Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{prediction}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {diseaseData[prediction as keyof typeof diseaseData]?.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm text-gray-600">
                        {Math.round((diseaseData[prediction as keyof typeof diseaseData]?.probability || 0) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(diseaseData[prediction as keyof typeof diseaseData]?.probability || 0) * 100}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <span className="text-sm font-medium">Severity: </span>
                    <Badge
                      className={getSeverityColor(
                        diseaseData[prediction as keyof typeof diseaseData]?.severity || "mild",
                      )}
                    >
                      {diseaseData[prediction as keyof typeof diseaseData]?.severity?.toUpperCase()}
                    </Badge>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This is an AI-generated analysis. Please consult a healthcare professional for proper diagnosis.
                    </AlertDescription>
                  </Alert>

                  <Button onClick={generateReport} className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            )}

            {prediction && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Precautions:</h4>
                    <ul className="text-sm space-y-1">
                      {diseaseData[prediction as keyof typeof diseaseData]?.precautions.map((precaution, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Dietary Recommendations:</h4>
                    <ul className="text-sm space-y-1">
                      {diseaseData[prediction as keyof typeof diseaseData]?.diet.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

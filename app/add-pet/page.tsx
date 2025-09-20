"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Camera, Save, Scan, Sparkles, Zap, Brain } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddPet() {
  const router = useRouter()
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [petInfo, setPetInfo] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
  })

  const [uploadMethod, setUploadMethod] = useState<"manual" | "ai-scan" | "bulk">("manual")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiResults, setAiResults] = useState<{
    breed: string
    animal: string
    confidence: number
    characteristics: string[]
  } | null>(null)
  const [bulkPhotos, setBulkPhotos] = useState<
    Array<{
      id: string
      photo: string
      aiResults?: {
        breed: string
        animal: string
        confidence: number
        name?: string
      }
    }>
  >([])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        Array.from(files).forEach((file) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target?.result) {
              setUploadedPhotos((prev) => [...prev, e.target!.result as string])
            }
          }
          reader.readAsDataURL(file)
        })
        setIsUploading(false)
      }, 1000)
    }
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSavePet = () => {
    // Here you would save the pet data to your backend
    console.log("Saving pet:", { ...petInfo, photos: uploadedPhotos })
    // Reset form
    setPetInfo({ name: "", breed: "", age: "", description: "" })
    setUploadedPhotos([])
    alert("Pet added successfully!")
    router.push("/")
  }

  const analyzeWithAI = async (photoUrl: string) => {
    setIsAnalyzing(true)

    // Simulate AI analysis - in real app, this would call an AI service like Google Vision API, AWS Rekognition, or a custom model
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI results based on common breeds
    const mockResults = [
      {
        breed: "Golden Retriever",
        animal: "Dog",
        confidence: 0.94,
        characteristics: ["Friendly", "Energetic", "Loyal", "Good with kids"],
        suggestedName: "Buddy",
      },
      {
        breed: "Domestic Shorthair",
        animal: "Cat",
        confidence: 0.87,
        characteristics: ["Independent", "Calm", "Affectionate"],
        suggestedName: "Whiskers",
      },
      {
        breed: "Labrador Mix",
        animal: "Dog",
        confidence: 0.91,
        characteristics: ["Playful", "Gentle", "Active"],
        suggestedName: "Luna",
      },
      {
        breed: "Persian Cat",
        animal: "Cat",
        confidence: 0.89,
        characteristics: ["Quiet", "Elegant", "Cuddly"],
        suggestedName: "Princess",
      },
    ]

    const result = mockResults[Math.floor(Math.random() * mockResults.length)]

    setAiResults(result)
    setPetInfo((prev) => ({
      ...prev,
      breed: result.breed,
      name: result.suggestedName || "",
      description: `This ${result.animal.toLowerCase()} appears to be a ${result.breed} with ${result.characteristics.join(", ").toLowerCase()} characteristics.`,
    }))

    setIsAnalyzing(false)
  }

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setIsUploading(true)

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
          if (e.target?.result) {
            const photoUrl = e.target.result as string
            const id = `bulk-${Date.now()}-${index}`

            // Add photo to bulk array
            setBulkPhotos((prev) => [...prev, { id, photo: photoUrl }])

            // Simulate AI analysis for each photo
            setTimeout(
              async () => {
                const mockResults = [
                  { breed: "Golden Retriever", animal: "Dog", confidence: 0.94, name: "Buddy" },
                  { breed: "Domestic Shorthair", animal: "Cat", confidence: 0.87, name: "Whiskers" },
                  { breed: "Labrador Mix", animal: "Dog", confidence: 0.91, name: "Luna" },
                  { breed: "Persian Cat", animal: "Cat", confidence: 0.89, name: "Princess" },
                  { breed: "German Shepherd", animal: "Dog", confidence: 0.92, name: "Max" },
                  { breed: "Maine Coon", animal: "Cat", confidence: 0.88, name: "Fluffy" },
                ]

                const result = mockResults[Math.floor(Math.random() * mockResults.length)]

                setBulkPhotos((prev) => prev.map((item) => (item.id === id ? { ...item, aiResults: result } : item)))
              },
              1000 + index * 500,
            )
          }
        }
        reader.readAsDataURL(file)
      })

      setTimeout(() => setIsUploading(false), 1000)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center mb-8"
      >
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/10 backdrop-blur-sm text-gray-300 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>
        </Link>
        <h1 className="text-3xl font-bold text-white ml-4">Add New Pet</h1>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Camera className="w-6 h-6 mr-3" />
                Pet Information & Photos
              </CardTitle>
              <p className="text-gray-400">Upload photos and information for a new pet</p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Upload Method Selection */}
              <div>
                <Label className="text-gray-300 mb-4 block text-lg font-semibold">
                  How would you like to add pets?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      uploadMethod === "manual"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-white/5 hover:bg-white/8"
                    }`}
                    onClick={() => setUploadMethod("manual")}
                  >
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h3 className="text-white font-medium mb-1">Manual Upload</h3>
                      <p className="text-gray-400 text-sm">Upload photos and enter details manually</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      uploadMethod === "ai-scan"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-white/5 hover:bg-white/8"
                    }`}
                    onClick={() => setUploadMethod("ai-scan")}
                  >
                    <div className="text-center">
                      <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h3 className="text-white font-medium mb-1">AI Recognition</h3>
                      <p className="text-gray-400 text-sm">Let AI identify breed and details</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      uploadMethod === "bulk"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-white/5 hover:bg-white/8"
                    }`}
                    onClick={() => setUploadMethod("bulk")}
                  >
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="text-white font-medium mb-1">Bulk Upload</h3>
                      <p className="text-gray-400 text-sm">Upload multiple pets at once with AI</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Manual Upload Method */}
              {uploadMethod === "manual" && (
                <>
                  {/* Pet Information Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="petName" className="text-gray-300 mb-2 block">
                        Pet Name *
                      </Label>
                      <Input
                        id="petName"
                        value={petInfo.name}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Luna"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petBreed" className="text-gray-300 mb-2 block">
                        Breed *
                      </Label>
                      <Input
                        id="petBreed"
                        value={petInfo.breed}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, breed: e.target.value }))}
                        placeholder="e.g., Golden Retriever Mix"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petAge" className="text-gray-300 mb-2 block">
                        Age *
                      </Label>
                      <Input
                        id="petAge"
                        value={petInfo.age}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, age: e.target.value }))}
                        placeholder="e.g., 2 years"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petDescription" className="text-gray-300 mb-2 block">
                        Description
                      </Label>
                      <Textarea
                        id="petDescription"
                        value={petInfo.description}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Tell us about this pet's personality..."
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div>
                    <Label className="text-gray-300 mb-4 block text-lg font-semibold">
                      Pet Photos ({uploadedPhotos.length}/8)
                    </Label>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {uploadedPhotos.map((photo, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group"
                        >
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`Pet photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-white/20 shadow-lg"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs">
                              Main Photo
                            </Badge>
                          )}
                        </motion.div>
                      ))}

                      {/* Upload Button */}
                      {uploadedPhotos.length < 8 && (
                        <motion.label
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full h-32 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-200 group"
                        >
                          {isUploading ? (
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mb-2" />
                              <span className="text-gray-400 text-sm">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-gray-300 text-sm font-medium">Add Photo</span>
                              <span className="text-gray-500 text-xs">Click to browse</span>
                            </>
                          )}
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </motion.label>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* AI Scan Method */}
              {uploadMethod === "ai-scan" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: isAnalyzing ? 360 : 0 }}
                      transition={{ duration: 2, repeat: isAnalyzing ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                      className="inline-block mb-4"
                    >
                      <Brain className="w-16 h-16 text-purple-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI Pet Recognition</h3>
                    <p className="text-gray-400 mb-6">
                      Upload a photo and let our AI identify the breed and characteristics
                    </p>
                  </div>

                  {/* AI Upload Area */}
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    className="block w-full max-w-md mx-auto h-48 border-2 border-dashed border-purple-400/40 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400/60 hover:bg-purple-400/5 transition-all duration-200 group"
                  >
                    {isAnalyzing ? (
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mb-3" />
                        <span className="text-purple-400 text-lg font-medium">Analyzing...</span>
                        <span className="text-gray-400 text-sm">AI is identifying the breed</span>
                      </div>
                    ) : (
                      <>
                        <Scan className="w-12 h-12 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                        <span className="text-purple-400 text-lg font-medium">Scan Pet Photo</span>
                        <span className="text-gray-400 text-sm">Upload for AI analysis</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = async (event) => {
                            if (event.target?.result) {
                              const photoUrl = event.target.result as string
                              setUploadedPhotos([photoUrl])
                              await analyzeWithAI(photoUrl)
                            }
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="hidden"
                      disabled={isAnalyzing}
                    />
                  </motion.label>

                  {/* AI Results */}
                  {aiResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6"
                    >
                      <div className="flex items-center mb-4">
                        <Zap className="w-5 h-5 text-purple-400 mr-2" />
                        <h4 className="text-purple-400 font-medium">AI Analysis Results</h4>
                        <Badge className="ml-auto bg-purple-600 text-white">
                          {Math.round(aiResults.confidence * 100)}% confident
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-gray-400 text-sm">Animal Type:</span>
                          <p className="text-white font-medium">{aiResults.animal}</p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Breed:</span>
                          <p className="text-white font-medium">{aiResults.breed}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-gray-400 text-sm">Characteristics:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {aiResults.characteristics.map((trait, index) => (
                            <Badge key={index} className="bg-white/10 text-gray-300 border border-white/20">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          // Auto-fill form with AI results
                          setPetInfo((prev) => ({
                            ...prev,
                            breed: aiResults.breed,
                            name: prev.name || "AI Suggested Name",
                            description: `This ${aiResults.animal.toLowerCase()} appears to be a ${aiResults.breed} with ${aiResults.characteristics.join(", ").toLowerCase()} characteristics.`,
                          }))
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Use AI Results
                      </Button>
                    </motion.div>
                  )}

                  {/* Manual override form */}
                  {aiResults && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="aiPetName" className="text-gray-300 mb-2 block">
                          Pet Name *
                        </Label>
                        <Input
                          id="aiPetName"
                          value={petInfo.name}
                          onChange={(e) => setPetInfo((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Luna"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40"
                        />
                      </div>
                      <div>
                        <Label htmlFor="aiPetAge" className="text-gray-300 mb-2 block">
                          Age *
                        </Label>
                        <Input
                          id="aiPetAge"
                          value={petInfo.age}
                          onChange={(e) => setPetInfo((prev) => ({ ...prev, age: e.target.value }))}
                          placeholder="e.g., 2 years"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-white/40"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bulk Upload Method */}
              {uploadMethod === "bulk" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Bulk Pet Upload</h3>
                    <p className="text-gray-400 mb-6">Upload multiple pet photos and let AI identify each one</p>
                  </div>

                  {/* Bulk Upload Area */}
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    className="block w-full h-32 border-2 border-dashed border-green-400/40 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400/60 hover:bg-green-400/5 transition-all duration-200 group"
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin mb-3" />
                        <span className="text-green-400 text-lg font-medium">Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-green-400 text-lg font-medium">Upload Multiple Photos</span>
                        <span className="text-gray-400 text-sm">Select multiple pet photos</span>
                      </>
                    )}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBulkUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </motion.label>

                  {/* Bulk Results */}
                  {bulkPhotos.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">Detected Pets ({bulkPhotos.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bulkPhotos.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-4"
                          >
                            <div className="flex items-start space-x-4">
                              <img
                                src={item.photo || "/placeholder.svg"}
                                alt={`Bulk pet ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg border border-white/20"
                              />
                              <div className="flex-1">
                                {item.aiResults ? (
                                  <>
                                    <h5 className="text-white font-medium">{item.aiResults.name}</h5>
                                    <p className="text-gray-400 text-sm">{item.aiResults.breed}</p>
                                    <p className="text-gray-500 text-xs">{item.aiResults.animal}</p>
                                    <Badge className="mt-2 bg-green-600 text-white text-xs">
                                      {Math.round(item.aiResults.confidence * 100)}% match
                                    </Badge>
                                  </>
                                ) : (
                                  <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin mr-2" />
                                    <span className="text-gray-400 text-sm">Analyzing...</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {bulkPhotos.every((item) => item.aiResults) && (
                        <Button
                          onClick={() => {
                            // Process all bulk pets
                            alert(`Ready to add ${bulkPhotos.length} pets to the system!`)
                            setBulkPhotos([])
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Add All {bulkPhotos.length} Pets
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Upload Tips */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2 flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  {uploadMethod === "ai-scan" ? "AI Tips" : uploadMethod === "bulk" ? "Bulk Upload Tips" : "Photo Tips"}
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {uploadMethod === "ai-scan" ? (
                    <>
                      <li>• Use clear, well-lit photos for best AI recognition</li>
                      <li>• Show the pet's full body or clear face shot</li>
                      <li>• AI works best with common dog and cat breeds</li>
                      <li>• You can always edit the AI suggestions</li>
                    </>
                  ) : uploadMethod === "bulk" ? (
                    <>
                      <li>• Upload multiple pet photos at once</li>
                      <li>• Each photo should contain one main pet</li>
                      <li>• AI will analyze each photo separately</li>
                      <li>• Review and edit results before saving</li>
                    </>
                  ) : (
                    <>
                      <li>• Upload high-quality, well-lit photos</li>
                      <li>• Include photos showing the pet's personality</li>
                      <li>• The first photo will be the main display image</li>
                      <li>• Maximum 8 photos per pet</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  className="border-white/20 text-gray-300 hover:bg-white/5 bg-transparent"
                  onClick={() => {
                    setPetInfo({ name: "", breed: "", age: "", description: "" })
                    setUploadedPhotos([])
                    setAiResults(null)
                    setBulkPhotos([])
                  }}
                >
                  Clear All
                </Button>
                <Button
                  onClick={handleSavePet}
                  disabled={
                    (uploadMethod === "manual" && (!petInfo.name || !petInfo.breed || uploadedPhotos.length === 0)) ||
                    (uploadMethod === "ai-scan" && (!aiResults || !petInfo.name)) ||
                    (uploadMethod === "bulk" && bulkPhotos.length === 0)
                  }
                  className="bg-white text-black hover:bg-gray-100 px-8"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {uploadMethod === "bulk" ? `Save ${bulkPhotos.length} Pets` : "Save Pet"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

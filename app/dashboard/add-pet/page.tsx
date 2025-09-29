"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, DollarSign, Camera, Save } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddPet() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])

  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
    size: "",
    energy: "",
    personality: [] as string[],
    description: "",
    adoptionType: "adoption",
    quirks: "",
    yardRequirement: "",
    price: "",
    negotiable: false,
    vaccinated: false,
    spayedNeutered: false,
    goodWithKids: false,
    goodWithPets: false,
  })

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedPhotos((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePersonalityChange = (trait: string, checked: boolean) => {
    setPetData((prev) => ({
      ...prev,
      personality: checked ? [...prev.personality, trait] : prev.personality.filter((t) => t !== trait),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/dashboard")
  }

  const personalityTraits = [
    "Playful",
    "Calm",
    "Energetic",
    "Loyal",
    "Independent",
    "Affectionate",
    "Gentle",
    "Protective",
    "Social",
    "Quiet",
    "Active",
    "Cuddly",
  ]

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-8"
        >
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 backdrop-blur-sm text-gray-300 border border-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </motion.div>
          </Link>
          <h1 className="text-3xl font-bold text-white ml-4">Add New Pet</h1>
        </motion.div>

        <div className="space-y-8">
          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Pet Photos
                </CardTitle>
                <p className="text-gray-400">Upload high-quality photos to attract more adopters</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedPhotos.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group"
                    >
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Pet photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-white/20"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs">Main Photo</Badge>
                      )}
                    </motion.div>
                  ))}

                  {uploadedPhotos.length < 8 && (
                    <label className="w-full h-32 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm">Add Photo</span>
                      <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  Upload up to 8 photos. The first photo will be the main display image.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Pet Name *
                    </Label>
                    <Input
                      id="name"
                      value={petData.name}
                      onChange={(e) => setPetData((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      placeholder="e.g., Luna"
                    />
                  </div>

                  <div>
                    <Label htmlFor="breed" className="text-gray-300">
                      Breed *
                    </Label>
                    <Input
                      id="breed"
                      value={petData.breed}
                      onChange={(e) => setPetData((prev) => ({ ...prev, breed: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      placeholder="e.g., Golden Retriever Mix"
                    />
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-gray-300">
                      Age *
                    </Label>
                    <Input
                      id="age"
                      value={petData.age}
                      onChange={(e) => setPetData((prev) => ({ ...prev, age: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      placeholder="e.g., 2 years"
                    />
                  </div>

                  <div>
                    <Label htmlFor="size" className="text-gray-300">
                      Size *
                    </Label>
                    <select
                      id="size"
                      value={petData.size}
                      onChange={(e) => setPetData((prev) => ({ ...prev, size: e.target.value }))}
                      className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
                    >
                      <option value="">Select size</option>
                      <option value="Small">Small (under 25 lbs)</option>
                      <option value="Medium">Medium (25-60 lbs)</option>
                      <option value="Large">Large (60-100 lbs)</option>
                      <option value="Extra Large">Extra Large (over 100 lbs)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="energy" className="text-gray-300">
                      Energy Level *
                    </Label>
                    <select
                      id="energy"
                      value={petData.energy}
                      onChange={(e) => setPetData((prev) => ({ ...prev, energy: e.target.value }))}
                      className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
                    >
                      <option value="">Select energy level</option>
                      <option value="Low">Low - Couch potato</option>
                      <option value="Medium">Medium - Moderate activity</option>
                      <option value="High">High - Very active</option>
                      <option value="Very High">Very High - Needs lots of exercise</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="yardRequirement" className="text-gray-300">
                      Yard Requirement *
                    </Label>
                    <select
                      id="yardRequirement"
                      value={petData.yardRequirement}
                      onChange={(e) => setPetData((prev) => ({ ...prev, yardRequirement: e.target.value }))}
                      className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
                    >
                      <option value="">Select yard requirement</option>
                      <option value="none">No yard needed</option>
                      <option value="small">Small yard preferred</option>
                      <option value="medium">Medium yard needed</option>
                      <option value="large">Large yard required</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Pricing & Adoption Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300 mb-4 block">Adoption Type *</Label>
                    <div className="space-y-3">
                      {[
                        { value: "adoption", label: "Permanent Adoption", desc: "Forever home" },
                        { value: "foster", label: "Foster Care", desc: "Temporary care" },
                      ].map((option) => (
                        <motion.div
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            petData.adoptionType === option.value
                              ? "border-white/30 bg-white/10"
                              : "border-white/10 bg-white/5 hover:bg-white/8"
                          }`}
                          onClick={() => setPetData((prev) => ({ ...prev, adoptionType: option.value }))}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                petData.adoptionType === option.value ? "border-white bg-white" : "border-white/30"
                              }`}
                            >
                              {petData.adoptionType === option.value && (
                                <div className="w-2 h-2 bg-black rounded-full m-0.5" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{option.label}</h3>
                              <p className="text-gray-400 text-sm">{option.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price" className="text-gray-300">
                        Price (USD) *
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="price"
                          type="number"
                          value={petData.price}
                          onChange={(e) => setPetData((prev) => ({ ...prev, price: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 pl-10"
                          placeholder="350"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="negotiable"
                        checked={petData.negotiable}
                        onCheckedChange={(checked) =>
                          setPetData((prev) => ({ ...prev, negotiable: checked as boolean }))
                        }
                        className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                      />
                      <Label htmlFor="negotiable" className="text-gray-300">
                        Price is negotiable (OBO)
                      </Label>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-blue-400 text-sm">
                        <strong>Pricing Tips:</strong> Include adoption fees, vaccinations, and spay/neuter costs.
                        Typical ranges: Dogs $200-$500, Cats $100-$300.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personality & Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Personality & Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300 mb-4 block">Personality Traits</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {personalityTraits.map((trait) => (
                      <motion.div
                        key={trait}
                        whileHover={{ scale: 1.05 }}
                        className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                          petData.personality.includes(trait)
                            ? "border-white/30 bg-white/10"
                            : "border-white/10 bg-white/5 hover:bg-white/8"
                        }`}
                        onClick={() => handlePersonalityChange(trait, !petData.personality.includes(trait))}
                      >
                        <span className="text-white text-sm">{trait}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Health Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vaccinated"
                          checked={petData.vaccinated}
                          onCheckedChange={(checked) =>
                            setPetData((prev) => ({ ...prev, vaccinated: checked as boolean }))
                          }
                          className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <Label htmlFor="vaccinated" className="text-gray-300">
                          Up to date on vaccinations
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="spayedNeutered"
                          checked={petData.spayedNeutered}
                          onCheckedChange={(checked) =>
                            setPetData((prev) => ({ ...prev, spayedNeutered: checked as boolean }))
                          }
                          className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <Label htmlFor="spayedNeutered" className="text-gray-300">
                          Spayed/Neutered
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Compatibility</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="goodWithKids"
                          checked={petData.goodWithKids}
                          onCheckedChange={(checked) =>
                            setPetData((prev) => ({ ...prev, goodWithKids: checked as boolean }))
                          }
                          className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <Label htmlFor="goodWithKids" className="text-gray-300">
                          Good with children
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="goodWithPets"
                          checked={petData.goodWithPets}
                          onCheckedChange={(checked) =>
                            setPetData((prev) => ({ ...prev, goodWithPets: checked as boolean }))
                          }
                          className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <Label htmlFor="goodWithPets" className="text-gray-300">
                          Good with other pets
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Description & Special Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Pet Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={petData.description}
                    onChange={(e) => setPetData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell potential adopters about this pet's personality, favorite activities, and what makes them special..."
                    className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="quirks" className="text-gray-300">
                    Special Notes & Quirks
                  </Label>
                  <Textarea
                    id="quirks"
                    value={petData.quirks}
                    onChange={(e) => setPetData((prev) => ({ ...prev, quirks: e.target.value }))}
                    placeholder="Any special needs, behavioral notes, or quirky habits that adopters should know about..."
                    className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-end"
          >
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !petData.name || !petData.breed || !petData.price}
              className="bg-white text-black hover:bg-gray-100 border-0 px-8 py-3 text-lg"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Publish Pet Listing
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

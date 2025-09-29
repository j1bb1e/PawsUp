"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Save, Home } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Preferences() {
  const [preferences, setPreferences] = useState({
    species: ["dogs", "cats"],
    size: ["small", "medium", "large"],
    energy: [1, 5],
    age: [0, 10],
    goodWithKids: true,
    goodWithPets: false,
    goodWithStrangers: false,
    adoptionType: ["adoption", "foster"],
    maxDistance: [25],
    yardSpace: "medium",
  })

  const handleSpeciesChange = (species: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      species: checked ? [...prev.species, species] : prev.species.filter((s) => s !== species),
    }))
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      size: checked ? [...prev.size, size] : prev.size.filter((s) => s !== size),
    }))
  }

  const handleAdoptionTypeChange = (type: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      adoptionType: checked ? [...prev.adoptionType, type] : prev.adoptionType.filter((t) => t !== type),
    }))
  }

  const yardSpaceOptions = [
    { value: "none", label: "No Yard", description: "Apartment/Indoor only" },
    { value: "small", label: "Small Yard", description: "Patio or small backyard" },
    { value: "medium", label: "Medium Yard", description: "Standard backyard" },
    { value: "large", label: "Large Yard", description: "Spacious yard or acreage" },
  ]

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
        <h1 className="text-3xl font-bold text-white ml-4">Your Preferences</h1>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Species */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">What type of companion are you looking for?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dogs"
                    checked={preferences.species.includes("dogs")}
                    onCheckedChange={(checked) => handleSpeciesChange("dogs", checked as boolean)}
                    className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor="dogs" className="text-gray-300">
                    🐕 Dogs
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cats"
                    checked={preferences.species.includes("cats")}
                    onCheckedChange={(checked) => handleSpeciesChange("cats", checked as boolean)}
                    className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor="cats" className="text-gray-300">
                    🐱 Cats
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rabbits"
                    checked={preferences.species.includes("rabbits")}
                    onCheckedChange={(checked) => handleSpeciesChange("rabbits", checked as boolean)}
                    className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor="rabbits" className="text-gray-300">
                    🐰 Rabbits
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Yard Space */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Your Living Space
              </CardTitle>
              <p className="text-sm text-gray-400">This helps us match you with pets that fit your space</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {yardSpaceOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    preferences.yardSpace === option.value
                      ? "border-white/30 bg-white/10 backdrop-blur-sm"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                  onClick={() => setPreferences((prev) => ({ ...prev, yardSpace: option.value }))}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        preferences.yardSpace === option.value ? "border-white bg-white" : "border-white/30"
                      }`}
                    >
                      {preferences.yardSpace === option.value && (
                        <div className="w-2 h-2 bg-black rounded-full m-0.5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{option.label}</h3>
                      <p className="text-gray-400 text-sm">{option.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Preferred Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {["small", "medium", "large"].map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={preferences.size.includes(size)}
                      onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <Label htmlFor={size} className="capitalize text-gray-300">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Energy Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Energy Level</CardTitle>
              <p className="text-sm text-gray-400">From couch potato to adventure buddy</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={preferences.energy}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, energy: value }))}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>🛋️ Low</span>
                  <span>🚶 Medium</span>
                  <span>🏃 High</span>
                  <span>⚡ Very High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Age Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Age Range</CardTitle>
              <p className="text-sm text-gray-400">In years</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={preferences.age}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, age: value }))}
                  max={15}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{preferences.age[0]} years</span>
                  <span>{preferences.age[1]} years</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodWithKids"
                  checked={preferences.goodWithKids}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, goodWithKids: checked as boolean }))
                  }
                  className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <Label htmlFor="goodWithKids" className="text-gray-300">
                  Good with kids
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodWithPets"
                  checked={preferences.goodWithPets}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, goodWithPets: checked as boolean }))
                  }
                  className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <Label htmlFor="goodWithPets" className="text-gray-300">
                  Good with other pets
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodWithStrangers"
                  checked={preferences.goodWithStrangers}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, goodWithStrangers: checked as boolean }))
                  }
                  className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <Label htmlFor="goodWithStrangers" className="text-gray-300">
                  Good with strangers
                </Label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Adoption Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Adoption Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adoption"
                    checked={preferences.adoptionType.includes("adoption")}
                    onCheckedChange={(checked) => handleAdoptionTypeChange("adoption", checked as boolean)}
                    className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor="adoption" className="text-gray-300">
                    Permanent Adoption
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="foster"
                    checked={preferences.adoptionType.includes("foster")}
                    onCheckedChange={(checked) => handleAdoptionTypeChange("foster", checked as boolean)}
                    className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor="foster" className="text-gray-300">
                    Foster Care
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Distance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Maximum Distance</CardTitle>
              <p className="text-sm text-gray-400">How far are you willing to travel?</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={preferences.maxDistance}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, maxDistance: value }))}
                  max={100}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-400">{preferences.maxDistance[0]} miles</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Button
            className="w-full bg-white text-black hover:bg-gray-100 border-0 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

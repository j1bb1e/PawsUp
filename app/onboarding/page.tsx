"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, Heart, Shield, CheckCircle, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface OnboardingData {
  email: string
  name: string
  location: string
  experience: string
  yardSpace: string
  lifestyle: string
  animalComfort: number
  petTypes: string[]
  timeCommitment: string
  livingSpace: string
  hasAllergies: boolean
  allergiesDetails: string
  previousPets: boolean
  previousPetsDetails: string
  reasonForAdoption: string
}

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const [formData, setFormData] = useState<OnboardingData>({
    email: "",
    name: "",
    location: "",
    experience: "",
    yardSpace: "",
    lifestyle: "",
    animalComfort: 5,
    petTypes: [],
    timeCommitment: "",
    livingSpace: "",
    hasAllergies: false,
    allergiesDetails: "",
    previousPets: false,
    previousPetsDetails: "",
    reasonForAdoption: "",
  })

  const totalSteps = 8

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      router.push("/")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleEmailVerification = () => {
    // Simulate email verification
    setTimeout(() => {
      setIsEmailVerified(true)
    }, 1000)
  }

  const handlePetTypeChange = (petType: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      petTypes: checked ? [...prev.petTypes, petType] : prev.petTypes.filter((type) => type !== petType),
    }))
  }

  const steps = [
    {
      title: "Welcome to Pawfect Match! 🐾",
      subtitle: "Let's get you set up to find your perfect companion",
      content: (
        <div className="space-y-6 text-center">
          <div className="text-6xl mb-4">🐕🐱</div>
          <p className="text-gray-300 text-lg leading-relaxed">
            We'll ask you a few questions to ensure you're ready for pet adoption and to help us match you with the
            perfect furry friend.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              This questionnaire helps us maintain a safe and responsible adoption community.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Email Verification",
      subtitle: "Let's verify your email address for security",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              placeholder="your.email@example.com"
            />
          </div>

          {!isEmailVerified ? (
            <Button
              onClick={handleEmailVerification}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!formData.email}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Verification Code
            </Button>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-green-400">Email verified successfully!</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Basic Information",
      subtitle: "Tell us about yourself",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-gray-300">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              placeholder="City, State"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Pet Experience",
      subtitle: "What's your experience with animals?",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-4 block">Experience Level</Label>
            <div className="space-y-3">
              {[
                { value: "first-time", label: "First-time pet owner", desc: "I'm new to pet ownership" },
                { value: "some", label: "Some experience", desc: "I've had pets before" },
                { value: "experienced", label: "Very experienced", desc: "I've owned multiple pets" },
                { value: "professional", label: "Professional experience", desc: "I work with animals professionally" },
              ].map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.experience === option.value
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, experience: option.value }))}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        formData.experience === option.value ? "border-white bg-white" : "border-white/30"
                      }`}
                    >
                      {formData.experience === option.value && <div className="w-2 h-2 bg-black rounded-full m-0.5" />}
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

          <div>
            <Label className="text-gray-300 mb-3 block">Have you owned pets before?</Label>
            <div className="flex items-center space-x-2 mb-3">
              <Checkbox
                id="previousPets"
                checked={formData.previousPets}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, previousPets: checked as boolean }))}
                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label htmlFor="previousPets" className="text-gray-300">
                Yes, I've had pets before
              </Label>
            </div>

            {formData.previousPets && (
              <Textarea
                value={formData.previousPetsDetails}
                onChange={(e) => setFormData((prev) => ({ ...prev, previousPetsDetails: e.target.value }))}
                placeholder="Tell us about your previous pets..."
                className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                rows={3}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Animal Comfort Level",
      subtitle: "How comfortable are you with animals?",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-4 block">Comfort Level: {formData.animalComfort}/10</Label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.animalComfort}
              onChange={(e) => setFormData((prev) => ({ ...prev, animalComfort: Number.parseInt(e.target.value) }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Not comfortable</span>
              <span>Very comfortable</span>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <p className="text-amber-400 text-sm">
              {formData.animalComfort >= 7
                ? "Great! You seem very comfortable with animals."
                : formData.animalComfort >= 4
                  ? "That's okay! We'll help match you with calmer pets."
                  : "We recommend starting with low-maintenance pets or visiting shelters first."}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Pet Preferences",
      subtitle: "What type of pets interest you?",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-4 block">Select all that apply:</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "dogs", label: "🐕 Dogs", desc: "Loyal companions" },
                { value: "cats", label: "🐱 Cats", desc: "Independent friends" },
                { value: "rabbits", label: "🐰 Rabbits", desc: "Gentle & quiet" },
                { value: "birds", label: "🐦 Birds", desc: "Social & vocal" },
              ].map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.petTypes.includes(option.value)
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                  onClick={() => handlePetTypeChange(option.value, !formData.petTypes.includes(option.value))}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{option.label.split(" ")[0]}</div>
                    <h3 className="text-white font-medium text-sm">{option.label.split(" ")[1]}</h3>
                    <p className="text-gray-400 text-xs">{option.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-3 block">Do you have any allergies to animals?</Label>
            <div className="flex items-center space-x-2 mb-3">
              <Checkbox
                id="hasAllergies"
                checked={formData.hasAllergies}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, hasAllergies: checked as boolean }))}
                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label htmlFor="hasAllergies" className="text-gray-300">
                Yes, I have allergies
              </Label>
            </div>

            {formData.hasAllergies && (
              <Textarea
                value={formData.allergiesDetails}
                onChange={(e) => setFormData((prev) => ({ ...prev, allergiesDetails: e.target.value }))}
                placeholder="Please describe your allergies..."
                className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                rows={2}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Living Situation",
      subtitle: "Tell us about your home environment",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-4 block">Living Space</Label>
            <div className="space-y-3">
              {[
                { value: "apartment", label: "Apartment", desc: "No yard access" },
                { value: "apartment-yard", label: "Apartment with yard", desc: "Small outdoor space" },
                { value: "house-small", label: "House with small yard", desc: "Limited outdoor space" },
                { value: "house-large", label: "House with large yard", desc: "Plenty of outdoor space" },
                { value: "farm", label: "Farm/Rural property", desc: "Lots of open space" },
              ].map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.livingSpace === option.value
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, livingSpace: option.value }))}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        formData.livingSpace === option.value ? "border-white bg-white" : "border-white/30"
                      }`}
                    >
                      {formData.livingSpace === option.value && <div className="w-2 h-2 bg-black rounded-full m-0.5" />}
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

          <div>
            <Label className="text-gray-300 mb-4 block">Time Commitment</Label>
            <select
              value={formData.timeCommitment}
              onChange={(e) => setFormData((prev) => ({ ...prev, timeCommitment: e.target.value }))}
              className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
            >
              <option value="">Select time commitment</option>
              <option value="low">Low (1-2 hours/day)</option>
              <option value="medium">Medium (3-4 hours/day)</option>
              <option value="high">High (5+ hours/day)</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Final Questions",
      subtitle: "Just a few more details",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-3 block">Why do you want to adopt a pet?</Label>
            <Textarea
              value={formData.reasonForAdoption}
              onChange={(e) => setFormData((prev) => ({ ...prev, reasonForAdoption: e.target.value }))}
              placeholder="Tell us your motivation for pet adoption..."
              className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
              rows={4}
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-4 block">Lifestyle</Label>
            <select
              value={formData.lifestyle}
              onChange={(e) => setFormData((prev) => ({ ...prev, lifestyle: e.target.value }))}
              className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
            >
              <option value="">Select your lifestyle</option>
              <option value="very-active">Very Active (Daily exercise, hiking, running)</option>
              <option value="active">Active (Regular walks, weekend activities)</option>
              <option value="moderate">Moderate (Some activity, mostly relaxed)</option>
              <option value="relaxed">Relaxed (Prefer quiet, indoor activities)</option>
            </select>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-400 font-medium">Security & Verification</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your responses help us ensure responsible pet adoption and create a safe community for both pets and
              adopters.
            </p>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true
      case 1:
        return isEmailVerified && formData.email
      case 2:
        return formData.name && formData.location
      case 3:
        return formData.experience
      case 4:
        return formData.animalComfort >= 4
      case 5:
        return formData.petTypes.length > 0
      case 6:
        return formData.livingSpace && formData.timeCommitment
      case 7:
        return formData.reasonForAdoption && formData.lifestyle
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-gray-400 text-sm">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-white h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white mb-2">{currentStepData.title}</CardTitle>
                <p className="text-gray-400">{currentStepData.subtitle}</p>
              </CardHeader>
              <CardContent className="p-8">{currentStepData.content}</CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="border-white/20 text-gray-300 hover:bg-white/5 bg-transparent backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-white text-black hover:bg-gray-100 border-0"
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Complete Setup
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

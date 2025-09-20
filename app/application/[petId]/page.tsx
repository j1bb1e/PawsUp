"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Heart, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PetApplication({ params }: { params: { petId: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [applicationData, setApplicationData] = useState({
    // Basic Info
    experience: "",
    livingSpace: "",
    yardSpace: "",
    timeCommitment: "",

    // Pet-specific
    whyThisPet: "",
    petExperience: "",
    dailySchedule: "",

    // References
    references: ["", "", ""],
    veterinarian: "",

    // Agreements
    agreements: {
      homeVisit: false,
      backgroundCheck: false,
      returnPolicy: false,
      spayNeuter: false,
      lifetimeCommitment: false,
    },
  })

  // Mock pet data
  const pet = {
    id: params.petId,
    name: "Luna",
    breed: "Golden Retriever Mix",
    age: "2 years",
    photo: "/placeholder.svg?height=300&width=300&text=Luna",
    shelter: "Happy Tails Rescue",
    adoptionType: "adoption" as const,
    specialNeeds: "High energy, needs daily exercise",
  }

  const totalSteps = 4
  const completeness = Math.round(((currentStep + 1) / totalSteps) * 100)

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push(`/application/${params.petId}/confirmation`)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return applicationData.experience && applicationData.livingSpace && applicationData.yardSpace
      case 1:
        return applicationData.whyThisPet && applicationData.petExperience
      case 2:
        return applicationData.references.filter((ref) => ref.trim()).length >= 2 && applicationData.veterinarian
      case 3:
        return Object.values(applicationData.agreements).every((agreed) => agreed)
      default:
        return false
    }
  }

  const steps = [
    {
      title: "Living Situation",
      subtitle: "Tell us about your home environment",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-4 block">Experience Level</Label>
            <div className="space-y-3">
              {[
                { value: "first-time", label: "First-time pet owner" },
                { value: "some", label: "Some experience with pets" },
                { value: "experienced", label: "Very experienced" },
                { value: "professional", label: "Professional experience" },
              ].map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    applicationData.experience === option.value
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                  onClick={() => setApplicationData((prev) => ({ ...prev, experience: option.value }))}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        applicationData.experience === option.value ? "border-white bg-white" : "border-white/30"
                      }`}
                    >
                      {applicationData.experience === option.value && (
                        <div className="w-2 h-2 bg-black rounded-full m-0.5" />
                      )}
                    </div>
                    <span className="text-white">{option.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="livingSpace" className="text-gray-300">
              Living Space
            </Label>
            <select
              id="livingSpace"
              value={applicationData.livingSpace}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, livingSpace: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
            >
              <option value="">Select your living space</option>
              <option value="apartment">Apartment</option>
              <option value="apartment-yard">Apartment with yard</option>
              <option value="house-small">House with small yard</option>
              <option value="house-large">House with large yard</option>
              <option value="farm">Farm/Rural property</option>
            </select>
          </div>

          <div>
            <Label htmlFor="yardSpace" className="text-gray-300">
              Yard Space
            </Label>
            <select
              id="yardSpace"
              value={applicationData.yardSpace}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, yardSpace: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
            >
              <option value="">Select yard space</option>
              <option value="none">No yard</option>
              <option value="small">Small yard</option>
              <option value="medium">Medium yard</option>
              <option value="large">Large yard</option>
            </select>
          </div>

          <div>
            <Label htmlFor="timeCommitment" className="text-gray-300">
              Daily Time Commitment
            </Label>
            <select
              id="timeCommitment"
              value={applicationData.timeCommitment}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, timeCommitment: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-gray-300"
            >
              <option value="">Select time commitment</option>
              <option value="1-2">1-2 hours per day</option>
              <option value="3-4">3-4 hours per day</option>
              <option value="5-6">5-6 hours per day</option>
              <option value="7+">7+ hours per day</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "About This Pet",
      subtitle: `Why do you want to adopt ${pet.name}?`,
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="whyThisPet" className="text-gray-300">
              Why do you want to adopt {pet.name}?
            </Label>
            <Textarea
              id="whyThisPet"
              value={applicationData.whyThisPet}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, whyThisPet: e.target.value }))}
              placeholder={`Tell us what drew you to ${pet.name} and why you think you'd be a good match...`}
              className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="petExperience" className="text-gray-300">
              Experience with {pet.breed}s or similar breeds
            </Label>
            <Textarea
              id="petExperience"
              value={applicationData.petExperience}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, petExperience: e.target.value }))}
              placeholder="Describe any experience you have with this breed or similar pets..."
              className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="dailySchedule" className="text-gray-300">
              Daily Schedule & Exercise Plan
            </Label>
            <Textarea
              id="dailySchedule"
              value={applicationData.dailySchedule}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, dailySchedule: e.target.value }))}
              placeholder={`Describe your daily routine and how ${pet.name} would fit in, including exercise plans...`}
              className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
              rows={4}
            />
          </div>

          {pet.specialNeeds && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-amber-400 font-medium mb-1">Special Considerations for {pet.name}</h4>
                  <p className="text-gray-300 text-sm">{pet.specialNeeds}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "References",
      subtitle: "Provide references to support your application",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-4 block">Personal References (minimum 2)</Label>
            {applicationData.references.map((ref, index) => (
              <div key={index} className="mb-3">
                <Input
                  value={ref}
                  onChange={(e) => {
                    const newRefs = [...applicationData.references]
                    newRefs[index] = e.target.value
                    setApplicationData((prev) => ({ ...prev, references: newRefs }))
                  }}
                  placeholder={`Reference ${index + 1} (Name, Phone, Relationship)`}
                  className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                />
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="veterinarian" className="text-gray-300">
              Veterinarian Information
            </Label>
            <Input
              id="veterinarian"
              value={applicationData.veterinarian}
              onChange={(e) => setApplicationData((prev) => ({ ...prev, veterinarian: e.target.value }))}
              placeholder="Veterinarian name, clinic, and phone number"
              className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
            />
            <p className="text-gray-400 text-sm mt-1">
              If you don't have a vet yet, please provide the name of a clinic you plan to use
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> We may contact your references and veterinarian as part of our screening process.
              This helps us ensure the best match for both you and {pet.name}.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Agreements",
      subtitle: "Please review and agree to our adoption policies",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {[
              {
                key: "homeVisit",
                label: "Home Visit Agreement",
                description: "I agree to a home visit before adoption is finalized",
              },
              {
                key: "backgroundCheck",
                label: "Background Check",
                description: "I consent to a background check as part of the adoption process",
              },
              {
                key: "returnPolicy",
                label: "Return Policy",
                description: `I understand that if I cannot keep ${pet.name}, I must return them to the shelter`,
              },
              {
                key: "spayNeuter",
                label: "Spay/Neuter Agreement",
                description: `I agree to keep ${pet.name} spayed/neutered and up to date on vaccinations`,
              },
              {
                key: "lifetimeCommitment",
                label: "Lifetime Commitment",
                description: `I understand that adopting ${pet.name} is a lifetime commitment (potentially 10-15+ years)`,
              },
            ].map((agreement) => (
              <div
                key={agreement.key}
                className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <Checkbox
                  id={agreement.key}
                  checked={applicationData.agreements[agreement.key as keyof typeof applicationData.agreements]}
                  onCheckedChange={(checked) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      agreements: { ...prev.agreements, [agreement.key]: checked },
                    }))
                  }
                  className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black mt-0.5"
                />
                <div>
                  <Label htmlFor={agreement.key} className="text-white font-medium cursor-pointer">
                    {agreement.label}
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">{agreement.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-green-400 font-medium mb-1">Ready to Submit</h4>
                <p className="text-gray-300 text-sm">
                  Once you submit this application, our team will review it and contact you within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-3xl font-bold text-white ml-4">Adoption Application</h1>
        </motion.div>

        {/* Pet Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={pet.photo || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-16 h-16 rounded-full object-cover border border-white/20"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">{pet.name}</h2>
                  <p className="text-gray-400">
                    {pet.breed} • {pet.age}
                  </p>
                  <p className="text-gray-500 text-sm">{pet.shelter}</p>
                </div>
                <Badge className={pet.adoptionType === "foster" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}>
                  {pet.adoptionType === "foster" ? "Foster Care" : "Adoption"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-gray-400 text-sm">{completeness}% complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-white h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completeness}%` }}
              transition={{ duration: 0.5 }}
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
              <CardHeader>
                <CardTitle className="text-xl text-white">{steps[currentStep].title}</CardTitle>
                <p className="text-gray-400">{steps[currentStep].subtitle}</p>
              </CardHeader>
              <CardContent className="p-6">{steps[currentStep].content}</CardContent>
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
            disabled={!canProceed() || isSubmitting}
            className="bg-white text-black hover:bg-gray-100 border-0"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : currentStep === totalSteps - 1 ? (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Submit Application
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

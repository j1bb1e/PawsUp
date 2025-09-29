"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  X,
  MapPin,
  Calendar,
  Weight,
  Zap,
  Sparkles,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  RotateCcw,
  BookOpen,
  Camera,
} from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"

interface Pet {
  id: string
  name: string
  breed: string
  age: string
  size: string
  energy: string
  personality: string[]
  photos: string[]
  shelter: string
  location: string
  vaccinated: boolean
  spayedNeutered: boolean
  goodWithKids: boolean
  goodWithPets: boolean
  goodWithStrangers: boolean
  description: string
  adoptionType: "adoption" | "foster"
  quirks: string
  yardRequirement: "none" | "small" | "medium" | "large"
  price: number
  currency: string
  negotiable: boolean
  sellerId: string
  sellerType: string
  status: string
  postedAt: Date
  updatedAt: Date
}

const samplePets: Pet[] = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever Mix",
    age: "2 years",
    size: "Large",
    energy: "High",
    personality: ["Playful", "Loyal", "Energetic"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Luna+Playing",
      "/placeholder.svg?height=600&width=400&text=Luna+Sleeping",
      "/placeholder.svg?height=600&width=400&text=Luna+Running",
      "/placeholder.svg?height=600&width=400&text=Luna+Portrait",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
    goodWithStrangers: true,
    description:
      "Luna is a bundle of joy who loves long walks, playing fetch, and cuddling on the couch. She's great with kids and other dogs!",
    adoptionType: "adoption",
    quirks: "Loves to dig holes in the garden and is afraid of vacuum cleaners. Needs daily exercise or gets restless.",
    yardRequirement: "large",
    price: 350,
    currency: "USD",
    negotiable: false,
    sellerId: "shelter1",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Whiskers",
    breed: "Domestic Shorthair",
    age: "3 years",
    size: "Medium",
    energy: "Low",
    personality: ["Calm", "Independent", "Affectionate"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Whiskers+Sitting",
      "/placeholder.svg?height=600&width=400&text=Whiskers+Window",
      "/placeholder.svg?height=600&width=400&text=Whiskers+Napping",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: false,
    goodWithStrangers: false,
    description:
      "Whiskers is a gentle soul who enjoys quiet afternoons and gentle pets. Perfect for someone looking for a calm companion.",
    adoptionType: "adoption",
    quirks: "Doesn't like loud noises or sudden movements. Prefers to be the only pet and loves sunny windowsills.",
    yardRequirement: "none",
    price: 150,
    currency: "USD",
    negotiable: true,
    sellerId: "shelter2",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    name: "Buddy",
    breed: "Labrador Mix",
    age: "5 years",
    size: "Large",
    energy: "Medium",
    personality: ["Gentle", "Patient", "Loving"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Buddy+Smiling",
      "/placeholder.svg?height=600&width=400&text=Buddy+Walking",
      "/placeholder.svg?height=600&width=400&text=Buddy+Treats",
      "/placeholder.svg?height=600&width=400&text=Buddy+Yard",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
    goodWithStrangers: true,
    description:
      "Buddy is a senior sweetheart who still has lots of love to give. He's perfect for a family looking for a calm, well-behaved companion.",
    adoptionType: "foster",
    quirks: "Gets car sick on long rides and doesn't like being left alone for more than 4 hours. Loves belly rubs!",
    yardRequirement: "medium",
    price: 0,
    currency: "USD",
    negotiable: false,
    sellerId: "shelter3",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2023-12-28"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    name: "Zoe",
    breed: "Border Collie",
    age: "1 year",
    size: "Medium",
    energy: "Very High",
    personality: ["Smart", "Active", "Trainable"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Zoe+Jumping",
      "/placeholder.svg?height=600&width=400&text=Zoe+Training",
      "/placeholder.svg?height=600&width=400&text=Zoe+Frisbee",
      "/placeholder.svg?height=600&width=400&text=Zoe+Alert",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
    goodWithStrangers: false,
    description:
      "Zoe is a brilliant young pup who needs an active family. She loves learning new tricks and would excel at agility training!",
    adoptionType: "adoption",
    quirks:
      "Herds children and small animals. Needs mental stimulation or will find her own 'projects' around the house.",
    yardRequirement: "large",
    price: 400,
    currency: "USD",
    negotiable: true,
    sellerId: "shelter4",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    name: "Mittens",
    breed: "Persian Mix",
    age: "4 years",
    size: "Small",
    energy: "Low",
    personality: ["Quiet", "Elegant", "Cuddly"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Mittens+Fluffy",
      "/placeholder.svg?height=600&width=400&text=Mittens+Grooming",
      "/placeholder.svg?height=600&width=400&text=Mittens+Cozy",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: false,
    goodWithPets: false,
    goodWithStrangers: false,
    description:
      "Mittens is a regal beauty who prefers a quiet home. She loves being pampered and would be perfect for someone looking for a lap cat.",
    adoptionType: "adoption",
    quirks: "Requires daily brushing and doesn't like water. Prefers elevated sleeping spots and quiet environments.",
    yardRequirement: "none",
    price: 200,
    currency: "USD",
    negotiable: false,
    sellerId: "shelter5",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "6",
    name: "Max",
    breed: "German Shepherd Mix",
    age: "3 years",
    size: "Large",
    energy: "High",
    personality: ["Protective", "Loyal", "Intelligent"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Max+Alert",
      "/placeholder.svg?height=600&width=400&text=Max+Playing",
      "/placeholder.svg?height=600&width=400&text=Max+Training",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: false,
    goodWithStrangers: false,
    description:
      "Max is a devoted companion who forms strong bonds with his family. He's well-trained and would make an excellent guard dog.",
    adoptionType: "adoption",
    quirks: "Can be territorial with other dogs. Loves car rides and knows basic commands. Needs an experienced owner.",
    yardRequirement: "large",
    price: 375,
    currency: "USD",
    negotiable: false,
    sellerId: "shelter1",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "7",
    name: "Bella",
    breed: "Beagle Mix",
    age: "4 years",
    size: "Medium",
    energy: "Medium",
    personality: ["Friendly", "Curious", "Gentle"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Bella+Sniffing",
      "/placeholder.svg?height=600&width=400&text=Bella+Happy",
      "/placeholder.svg?height=600&width=400&text=Bella+Treats",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
    goodWithStrangers: true,
    description:
      "Bella is a sweet and curious girl who loves exploring new scents and meeting new friends. She's great with everyone!",
    adoptionType: "adoption",
    quirks:
      "Follows her nose everywhere and can be stubborn on walks. Loves treats and responds well to positive reinforcement.",
    yardRequirement: "medium",
    price: 275,
    currency: "USD",
    negotiable: true,
    sellerId: "shelter2",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "8",
    name: "Shadow",
    breed: "Black Cat Mix",
    age: "2 years",
    size: "Medium",
    energy: "Medium",
    personality: ["Playful", "Mysterious", "Affectionate"],
    photos: [
      "/placeholder.svg?height=600&width=400&text=Shadow+Prowling",
      "/placeholder.svg?height=600&width=400&text=Shadow+Playing",
      "/placeholder.svg?height=600&width=400&text=Shadow+Cuddling",
    ],
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
    goodWithStrangers: true,
    description:
      "Shadow is a beautiful black cat with a playful spirit. Despite superstitions, he brings nothing but good luck and love!",
    adoptionType: "adoption",
    quirks: "Loves to hide in boxes and surprise people. Very vocal and will 'talk' to you. Enjoys interactive toys.",
    yardRequirement: "none",
    price: 125,
    currency: "USD",
    negotiable: false,
    sellerId: "shelter3",
    sellerType: "shelter",
    status: "available",
    postedAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-13"),
  },
]

// Mock user preferences - in a real app this would come from user state/database
const userPreferences = {
  yardSpace: "large", // none, small, medium, large
}

// Function to check if pet matches user's yard space
const isPetCompatible = (pet: Pet, userYardSpace: string) => {
  const yardCompatibility = {
    none: ["none"],
    small: ["none", "small"],
    medium: ["none", "small", "medium"],
    large: ["none", "small", "medium", "large"],
  }

  return yardCompatibility[userYardSpace as keyof typeof yardCompatibility]?.includes(pet.yardRequirement)
}

// Filter pets based on compatibility
const getCompatiblePets = (pets: Pet[], userYardSpace: string) => {
  return pets.filter((pet) => isPetCompatible(pet, userYardSpace))
}

export default function PawsUp() {
  const compatiblePets = getCompatiblePets(samplePets, userPreferences.yardSpace)
  const [currentPetIndex, setCurrentPetIndex] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [matches, setMatches] = useState<Pet[]>([])
  const [showMatch, setShowMatch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [displayedPet, setDisplayedPet] = useState(compatiblePets[0])
  const [matchedPet, setMatchedPet] = useState<Pet | null>(null)
  const [swipeHistory, setSwipeHistory] = useState<Array<{ pet: Pet; action: "pass" | "love"; index: number }>>([])
  const [isFlipped, setIsFlipped] = useState(false)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleSwipe = async (direction: "left" | "right") => {
    if (isLoading) return

    setIsLoading(true)
    const swipedPet = displayedPet
    const currentIndex = currentPetIndex

    // Add to history
    setSwipeHistory((prev) => [
      ...prev,
      { pet: swipedPet, action: direction === "right" ? "love" : "pass", index: currentIndex },
    ])

    if (direction === "right") {
      setMatches((prev) => [...prev, swipedPet])
      setMatchedPet(swipedPet)
      setShowMatch(true)
      setTimeout(() => {
        setShowMatch(false)
        setMatchedPet(null)
      }, 2500)
    }

    await new Promise((resolve) => setTimeout(resolve, 600))

    const nextIndex = currentPetIndex < compatiblePets.length - 1 ? currentPetIndex + 1 : 0
    setCurrentPetIndex(nextIndex)
    setDisplayedPet(compatiblePets[nextIndex])
    setCurrentPhotoIndex(0) // Reset to first photo for new pet
    setIsFlipped(false) // Reset flip state for new pet

    setIsLoading(false)
  }

  const handlePhotoNavigation = (direction: "prev" | "next") => {
    if (!displayedPet) return

    if (direction === "next") {
      setCurrentPhotoIndex((prev) => (prev + 1) % displayedPet.photos.length)
    } else {
      setCurrentPhotoIndex((prev) => (prev - 1 + displayedPet.photos.length) % displayedPet.photos.length)
    }
  }

  const handleUndo = () => {
    if (swipeHistory.length === 0) return

    const lastSwipe = swipeHistory[swipeHistory.length - 1]

    // Remove from history
    setSwipeHistory((prev) => prev.slice(0, -1))

    // If it was a love, remove from matches
    if (lastSwipe.action === "love") {
      setMatches((prev) => prev.filter((pet) => pet.id !== lastSwipe.pet.id))
    }

    // Go back to the previous pet
    setCurrentPetIndex(lastSwipe.index)
    setDisplayedPet(lastSwipe.pet)
    setCurrentPhotoIndex(0)
    setIsFlipped(false) // Reset flip state
  }

  const getEnergyColor = (energy: string) => {
    switch (energy.toLowerCase()) {
      case "low":
        return "bg-gray-700 text-gray-200"
      case "medium":
        return "bg-gray-600 text-gray-100"
      case "high":
        return "bg-gray-500 text-white"
      case "very high":
        return "bg-gray-400 text-gray-900"
      default:
        return "bg-gray-600 text-gray-200"
    }
  }

  if (!displayedPet) return null

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden pb-20">
      {/* Subtle Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/3 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center py-3 relative z-10 flex-shrink-0"
      >
        <div className="inline-block">
          <h1 className="text-2xl font-bold text-white">🐾 PawsUp</h1>
        </div>
      </motion.div>

      {/* Match Notification */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-6xl mb-4"
              >
                💕
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-3">It's a Match!</h2>
              <p className="text-gray-400 text-lg">You and {matchedPet?.name} are perfect together!</p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-1 bg-white/30 rounded-full mt-4"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet Card - Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-3 relative z-10 min-h-0">
        <div className="w-full max-w-sm h-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayedPet.id}
              style={{ x, rotate, opacity }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) {
                  handleSwipe(info.offset.x > 0 ? "right" : "left")
                }
              }}
              className="cursor-grab active:cursor-grabbing flex-1 flex flex-col"
            >
              <Card className="overflow-hidden shadow-2xl border border-white/10 bg-gray-900/80 backdrop-blur-xl flex-1 flex flex-col">
                <div className="relative flex-1 perspective-1000">
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-full h-full preserve-3d"
                  >
                    {/* Back of card - Backstory */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-800 to-gray-900 p-3 overflow-y-auto">
                      <div className="text-white h-full flex flex-col">
                        <div className="text-center mb-3">
                          <h3 className="text-lg font-bold mb-2">{displayedPet.name}'s Story</h3>
                          <div className="w-12 h-0.5 bg-white/30 mx-auto"></div>
                        </div>

                        <div className="space-y-2 flex-1">
                          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
                            <h4 className="font-semibold mb-1 flex items-center text-xs">
                              <Heart className="w-3 h-3 mr-1 text-red-400" />
                              Personality
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {displayedPet.personality.map((trait, index) => (
                                <Badge key={index} className="bg-white/20 text-white border-0 text-xs px-1 py-0">
                                  {trait}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
                            <h4 className="font-semibold mb-1 flex items-center text-xs">
                              <Sparkles className="w-3 h-3 mr-1 text-yellow-400" />
                              Special Notes
                            </h4>
                            <p className="text-xs text-gray-200 leading-relaxed">{displayedPet.quirks}</p>
                          </div>

                          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
                            <h4 className="font-semibold mb-1 flex items-center text-xs">
                              <MapPin className="w-3 h-3 mr-1 text-blue-400" />
                              Living Needs
                            </h4>
                            <div className="text-xs text-gray-200 space-y-1">
                              <p>
                                <span className="font-medium">Yard:</span>{" "}
                                {displayedPet.yardRequirement === "none"
                                  ? "No yard needed"
                                  : displayedPet.yardRequirement === "small"
                                    ? "Small yard preferred"
                                    : displayedPet.yardRequirement === "medium"
                                      ? "Medium yard needed"
                                      : "Large yard required"}
                              </p>
                              <p>
                                <span className="font-medium">Energy:</span> {displayedPet.energy}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
                            <h4 className="font-semibold mb-1 flex items-center text-xs">
                              <Calendar className="w-3 h-3 mr-1 text-green-400" />
                              About {displayedPet.name}
                            </h4>
                            <p className="text-xs text-gray-200 leading-relaxed">{displayedPet.description}</p>
                          </div>
                        </div>

                        <div className="mt-2 text-center">
                          <p className="text-xs text-gray-400">💡 Flip back to see photos</p>
                        </div>
                      </div>
                    </div>

                    {/* Front of card - Original Design */}
                    <div className="absolute inset-0 backface-hidden">
                      <motion.img
                        key={currentPhotoIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        src={displayedPet.photos[currentPhotoIndex] || "/placeholder.svg"}
                        alt={`${displayedPet.name} photo ${currentPhotoIndex + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {/* Photo Navigation */}
                      {displayedPet.photos.length > 1 && !isFlipped && (
                        <>
                          <button
                            onClick={() => handlePhotoNavigation("prev")}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-200"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handlePhotoNavigation("next")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-200"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>

                          {/* Photo Indicators */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                            {displayedPet.photos.map((_, index) => (
                              <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                  index === currentPhotoIndex ? "bg-white" : "bg-white/40"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </motion.div>

                  {/* Flip Button */}
                  <motion.button
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-200 border border-white/20"
                    title={isFlipped ? "Show photos" : "Show backstory"}
                  >
                    <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      {isFlipped ? <Camera className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                    </motion.div>
                  </motion.button>

                  {/* Adoption Type Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                    className="absolute top-2 right-2"
                  >
                    <Badge
                      className={`${
                        displayedPet.adoptionType === "foster" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                      } border-0 px-2 py-0.5 shadow-lg font-medium text-xs`}
                    >
                      {displayedPet.adoptionType === "foster" ? "Foster Care" : "Adoption"}
                    </Badge>
                  </motion.div>

                  {/* Swipe Indicators */}
                  <AnimatePresence>
                    {x.get() > 50 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm"
                      >
                        <div className="bg-green-600 text-white px-4 py-2 rounded-2xl font-bold text-lg transform rotate-12 shadow-2xl">
                          LOVE 💚
                        </div>
                      </motion.div>
                    )}
                    {x.get() < -50 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-red-500/20 flex items-center justify-center backdrop-blur-sm"
                      >
                        <div className="bg-red-600 text-white px-4 py-2 rounded-2xl font-bold text-lg transform -rotate-12 shadow-2xl">
                          PASS 💔
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <CardContent className="p-3 bg-gray-900/90 backdrop-blur-sm flex-shrink-0">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-white">{displayedPet.name}</h2>
                        <p className="text-gray-400 text-sm">{displayedPet.breed}</p>
                      </div>
                      <Badge
                        className={`${getEnergyColor(displayedPet.energy)} border border-white/20 px-2 py-0.5 shadow-lg text-xs`}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {displayedPet.energy}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center text-gray-300 bg-white/5 backdrop-blur-sm rounded-lg p-1.5 border border-white/10"
                      >
                        <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                        {displayedPet.age}
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center text-gray-300 bg-white/5 backdrop-blur-sm rounded-lg p-1.5 border border-white/10"
                      >
                        <Weight className="w-3 h-3 mr-1 text-gray-400" />
                        {displayedPet.size}
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center text-gray-300 col-span-2 bg-white/5 backdrop-blur-sm rounded-lg p-1.5 border border-white/10"
                      >
                        <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                        {displayedPet.shelter}, {displayedPet.location}
                      </motion.div>
                    </div>

                    {/* Pricing */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="mb-2 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white">
                          <DollarSign className="w-3 h-3 mr-1 text-green-400" />
                          <span className="text-lg font-bold">${displayedPet.price}</span>
                          {displayedPet.negotiable && <span className="text-gray-400 text-xs ml-1">(OBO)</span>}
                        </div>
                        <Badge className="bg-green-600/20 text-green-400 border border-green-600/30 text-xs">
                          {displayedPet.adoptionType === "foster" ? "Foster Fee" : "Adoption Fee"}
                        </Badge>
                      </div>
                    </motion.div>

                    <p className="text-gray-300 text-xs mb-2 leading-relaxed line-clamp-2">
                      {displayedPet.description}
                    </p>

                    {/* Quirks Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="mb-2 bg-amber-500/10 backdrop-blur-sm rounded-lg p-2 border border-amber-500/20"
                    >
                      <div className="flex items-start gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-amber-400 text-xs font-medium mb-1">Good to Know</h4>
                          <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">{displayedPet.quirks}</p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-400 mb-3">
                      {[
                        { label: "Vaccinated", value: displayedPet.vaccinated },
                        { label: "Spayed/Neutered", value: displayedPet.spayedNeutered },
                        { label: "Good with kids", value: displayedPet.goodWithKids },
                        { label: "Good with pets", value: displayedPet.goodWithPets },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className={`flex items-center ${item.value ? "text-gray-300" : "text-gray-500"} bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1 ${item.value ? "bg-white/60" : "bg-gray-600"}`}
                          ></div>
                          {item.label}
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex gap-2 items-center"
                    >
                      {/* Undo Button - Small and subtle */}
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1.5 h-auto text-gray-500 hover:text-gray-300 hover:bg-white/5 bg-transparent backdrop-blur-sm transition-all duration-300 disabled:opacity-30"
                          onClick={handleUndo}
                          disabled={swipeHistory.length === 0 || isLoading}
                          title={
                            swipeHistory.length > 0
                              ? `Undo ${swipeHistory[swipeHistory.length - 1]?.action}`
                              : "No actions to undo"
                          }
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </motion.div>

                      {/* Main Action Buttons */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-2 border-white/20 text-gray-300 hover:bg-white/5 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-white/30 py-2"
                        onClick={() => handleSwipe("left")}
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Pass
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-white text-black hover:bg-gray-100 border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-white/10 py-2"
                        onClick={() => handleSwipe("right")}
                        disabled={isLoading}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Love
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Swipe Instructions - Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center py-2 text-gray-500 text-xs relative z-10 flex-shrink-0"
      >
        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          💡 Swipe right to love, left to pass
        </motion.p>
      </motion.div>
    </div>
  )
}

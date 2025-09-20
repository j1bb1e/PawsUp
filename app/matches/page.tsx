"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MessageCircle, Phone, MapPin, Sparkles, DollarSign, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock matches data - in a real app this would come from global state or database
const sampleMatches = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever Mix",
    age: "2 years",
    size: "Large",
    photo: "/placeholder.svg?height=300&width=300&text=Luna",
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    matchedAt: "2 hours ago",
    adoptionType: "adoption" as const,
    price: 350,
    negotiable: false,
    description: "Luna is a bundle of joy who loves long walks, playing fetch, and cuddling on the couch.",
    energy: "High",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: "3",
    name: "Buddy",
    breed: "Labrador Mix",
    age: "5 years",
    size: "Large",
    photo: "/placeholder.svg?height=300&width=300&text=Buddy",
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    matchedAt: "1 day ago",
    adoptionType: "foster" as const,
    price: 0,
    negotiable: false,
    description: "Buddy is a senior sweetheart who still has lots of love to give.",
    energy: "Medium",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: "8",
    name: "Shadow",
    breed: "Black Cat Mix",
    age: "2 years",
    size: "Medium",
    photo: "/placeholder.svg?height=300&width=300&text=Shadow",
    shelter: "Old Bridge Animal Shelter",
    location: "Old Bridge, NJ",
    matchedAt: "3 days ago",
    adoptionType: "adoption" as const,
    price: 125,
    negotiable: false,
    description: "Shadow is a beautiful black cat with a playful spirit.",
    energy: "Medium",
    vaccinated: true,
    spayedNeutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
]

// Mock recent activity
const recentActivity = [
  {
    id: "1",
    type: "match",
    petName: "Luna",
    petPhoto: "/placeholder.svg?height=60&width=60&text=Luna",
    message: "You matched with Luna!",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "message",
    petName: "Buddy",
    petPhoto: "/placeholder.svg?height=60&width=60&text=Buddy",
    message: "Old Bridge Animal Shelter sent you a message about Buddy",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "application",
    petName: "Shadow",
    petPhoto: "/placeholder.svg?height=60&width=60&text=Shadow",
    message: "Your application for Shadow is under review",
    timestamp: "3 days ago",
  },
]

export default function Matches() {
  const [selectedTab, setSelectedTab] = useState("matches")

  return (
    <div className="min-h-screen bg-black p-4 pb-20">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 right-10 w-24 h-24 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center mb-8 relative z-10"
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
        <h1 className="text-3xl font-bold text-white ml-4">Your Matches 💕</h1>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-gray-900/80 border border-white/10 w-full">
            <TabsTrigger value="matches" className="data-[state=active]:bg-white data-[state=active]:text-black flex-1">
              <Heart className="w-4 h-4 mr-2" />
              Matches ({sampleMatches.length})
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-white data-[state=active]:text-black flex-1"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            {sampleMatches.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="text-6xl mb-4"
                >
                  🐾
                </motion.div>
                <h2 className="text-2xl font-semibold text-white mb-2">No matches yet</h2>
                <p className="text-gray-400 mb-6 text-lg">Keep swiping to find your perfect companion!</p>
                <Link href="/">
                  <Button className="bg-white text-black hover:bg-gray-100 border-0 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Swiping
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6, type: "spring", bounce: 0.3 }}
                  >
                    <Card className="overflow-hidden shadow-xl border border-white/10 bg-gray-900/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="relative">
                        <motion.div whileHover={{ scale: 1.05 }} className="relative overflow-hidden">
                          <img
                            src={match.photo || "/placeholder.svg"}
                            alt={match.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </motion.div>

                        <div className="absolute top-3 right-3">
                          <Badge
                            className={
                              match.adoptionType === "foster" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                            }
                          >
                            {match.adoptionType === "foster" ? "Foster" : "Adopt"}
                          </Badge>
                        </div>

                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-black/60 text-white border-0 backdrop-blur-sm">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {match.price === 0 ? "Free" : `$${match.price}`}
                            {match.negotiable && " (OBO)"}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{match.name}</h3>
                            <p className="text-gray-400">{match.breed}</p>
                            <p className="text-gray-500 text-sm">{match.age}</p>
                          </div>
                          <Badge className="bg-white/10 text-gray-300 border border-white/20">
                            {match.energy} Energy
                          </Badge>
                        </div>

                        <div className="flex items-center text-gray-400 text-sm mb-3 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                          <MapPin className="w-4 h-4 mr-2" />
                          {match.shelter}, {match.location}
                        </div>

                        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">{match.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                          {[
                            { label: "Vaccinated", value: match.vaccinated },
                            { label: "Spayed/Neutered", value: match.spayedNeutered },
                            { label: "Good with kids", value: match.goodWithKids },
                            { label: "Good with pets", value: match.goodWithPets },
                          ].map((item, itemIndex) => (
                            <div
                              key={item.label}
                              className={`flex items-center ${item.value ? "text-gray-300" : "text-gray-500"} bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${item.value ? "bg-white/60" : "bg-gray-600"}`}
                              />
                              {item.label}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-500">Matched {match.matchedAt}</span>
                        </div>

                        <div className="flex gap-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full border-white/20 text-gray-300 hover:bg-white/5 bg-transparent backdrop-blur-sm"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-white text-black hover:bg-gray-100 border-0 shadow-lg"
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              Contact
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl hover:bg-gray-900/90 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={activity.petPhoto || "/placeholder.svg"}
                          alt={activity.petName}
                          className="w-12 h-12 rounded-full object-cover border border-white/20"
                        />
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.message}</p>
                          <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                        </div>
                        <div className="flex items-center">
                          {activity.type === "match" && <Heart className="w-5 h-5 text-red-400" />}
                          {activity.type === "message" && <MessageCircle className="w-5 h-5 text-blue-400" />}
                          {activity.type === "application" && <Sparkles className="w-5 h-5 text-green-400" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {recentActivity.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No recent activity</h3>
                <p className="text-gray-400">Start swiping to see your activity here!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

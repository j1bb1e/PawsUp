"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Edit, Eye, Trash2, DollarSign, Heart, MessageCircle, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock user data
const currentUser = {
  id: "user1",
  name: "Happy Tails Rescue",
  type: "shelter" as const,
  email: "contact@happytails.org",
  location: "San Francisco, CA",
  verified: true,
}

// Mock pets data
const mockPets = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever Mix",
    age: "2 years",
    size: "Large",
    photos: [
      "/placeholder.svg?height=200&width=200&text=Luna+1",
      "/placeholder.svg?height=200&width=200&text=Luna+2",
      "/placeholder.svg?height=200&width=200&text=Luna+3",
    ],
    price: 350,
    currency: "USD",
    negotiable: false,
    adoptionType: "adoption" as const,
    status: "available" as const,
    applications: 12,
    views: 247,
    postedAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    name: "Buddy",
    breed: "Labrador Mix",
    age: "5 years",
    size: "Large",
    photos: [
      "/placeholder.svg?height=200&width=200&text=Buddy+1",
      "/placeholder.svg?height=200&width=200&text=Buddy+2",
    ],
    price: 200,
    currency: "USD",
    negotiable: true,
    adoptionType: "foster" as const,
    status: "pending" as const,
    applications: 8,
    views: 156,
    postedAt: new Date("2024-01-08"),
  },
  {
    id: "3",
    name: "Whiskers",
    breed: "Domestic Shorthair",
    age: "3 years",
    size: "Medium",
    photos: ["/placeholder.svg?height=200&width=200&text=Whiskers"],
    price: 150,
    currency: "USD",
    negotiable: false,
    adoptionType: "adoption" as const,
    status: "available" as const,
    applications: 5,
    views: 89,
    postedAt: new Date("2024-01-12"),
  },
]

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("pets")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-600 text-white"
      case "pending":
        return "bg-yellow-600 text-white"
      case "adopted":
        return "bg-blue-600 text-white"
      case "hold":
        return "bg-gray-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const totalRevenue = mockPets.reduce((sum, pet) => sum + (pet.status === "adopted" ? pet.price : 0), 0)
  const totalApplications = mockPets.reduce((sum, pet) => sum + pet.applications, 0)
  const totalViews = mockPets.reduce((sum, pet) => sum + pet.views, 0)

  return (
    <div className="min-h-screen bg-black p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center">
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
          <h1 className="text-3xl font-bold text-white ml-4">My Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 text-white border-0 px-4 py-2">
            {currentUser.verified ? "✓ Verified" : "Pending Verification"}
          </Badge>
          <Link href="/dashboard/add-pet">
            <Button className="bg-white text-black hover:bg-gray-100">
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-gray-900/80 border border-white/10">
            <TabsTrigger value="pets" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Heart className="w-4 h-4 mr-2" />
              My Pets ({mockPets.length})
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <MessageCircle className="w-4 h-4 mr-2" />
              Applications ({totalApplications})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pets" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{mockPets.length}</div>
                  <div className="text-gray-400">Total Pets</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">${totalRevenue}</div>
                  <div className="text-gray-400">Total Revenue</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{totalApplications}</div>
                  <div className="text-gray-400">Applications</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{totalViews}</div>
                  <div className="text-gray-400">Total Views</div>
                </CardContent>
              </Card>
            </div>

            {/* Pets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPets.map((pet, index) => (
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl hover:bg-gray-900/90 transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={pet.photos[0] || "/placeholder.svg"}
                        alt={pet.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={getStatusColor(pet.status)}>
                          {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black/60 text-white border-0 backdrop-blur-sm">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {pet.price}
                          {pet.negotiable && " (OBO)"}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{pet.name}</h3>
                          <p className="text-gray-400 text-sm">{pet.breed}</p>
                          <p className="text-gray-500 text-xs">{pet.age}</p>
                        </div>
                        <Badge
                          className={
                            pet.adoptionType === "foster" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                          }
                        >
                          {pet.adoptionType === "foster" ? "Foster" : "Adopt"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-4">
                        <div className="text-center">
                          <div className="text-white font-medium">{pet.applications}</div>
                          <div>Applications</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{pet.views}</div>
                          <div>Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{pet.photos.length}</div>
                          <div>Photos</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-white/20 text-gray-300 hover:bg-white/5 bg-transparent"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-white/20 text-gray-300 hover:bg-white/5 bg-transparent"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/20 text-red-400 hover:bg-red-500/5 bg-transparent"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="mt-3 text-xs text-gray-500">Posted {pet.postedAt.toLocaleDateString()}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Application Management</h3>
                <p className="text-gray-400 mb-6">View and manage adoption applications for your pets</p>
                <Link href="/shelter/dashboard">
                  <Button className="bg-white text-black hover:bg-gray-100">View Applications</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Average Views per Pet</span>
                      <span className="text-white font-medium">{Math.round(totalViews / mockPets.length)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Average Applications per Pet</span>
                      <span className="text-white font-medium">{Math.round(totalApplications / mockPets.length)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Average Price</span>
                      <span className="text-white font-medium">
                        ${Math.round(mockPets.reduce((sum, pet) => sum + pet.price, 0) / mockPets.length)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-green-400 font-medium">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">New application for Luna</span>
                      <span className="text-gray-500 ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Buddy marked as pending</span>
                      <span className="text-gray-500 ml-auto">5h ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">Whiskers got 15 new views</span>
                      <span className="text-gray-500 ml-auto">1d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

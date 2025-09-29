"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Users,
  Heart,
  MapPin,
  Clock,
  CheckCircle,
  Trophy,
  MessageCircle,
  Eye,
  Building2,
  Mail,
  Phone,
  Globe,
  Edit,
  Star,
  TrendingUp,
  Plus,
  Upload,
  Camera,
  X,
  Save,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Shelter profile data
const shelterProfile = {
  id: "shelter1",
  name: "Happy Tails Rescue",
  type: "Non-profit Animal Shelter",
  email: "contact@happytails.org",
  phone: "(555) 123-4567",
  website: "www.happytails.org",
  location: "San Francisco, CA",
  address: "123 Rescue Lane, San Francisco, CA 94102",
  established: "2015",
  verified: true,
  rating: 4.8,
  totalReviews: 247,
  description:
    "Happy Tails Rescue is dedicated to finding loving homes for abandoned and surrendered animals. We provide comprehensive care, rehabilitation, and matching services.",
  specialties: ["Dogs", "Cats", "Small Animals"],
  stats: {
    totalPets: 156,
    successfulAdoptions: 1247,
    currentlyAvailable: 23,
    totalRevenue: 45600,
    avgMatchScore: 8.2,
    responseTime: "2 hours",
  },
}

// Mock applications data
const mockApplications = [
  {
    id: "1",
    petId: "1",
    petName: "Luna",
    petPhoto: "/placeholder.svg?height=100&width=100&text=Luna",
    applicant: {
      id: "user1",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      location: "San Francisco, CA",
      photo: "/placeholder.svg?height=60&width=60&text=SJ",
      isPreApproved: true,
      isVerified: true,
    },
    score: {
      totalScore: 8.7,
      ranking: 1,
      status: "top-candidate" as const,
      breakdown: {
        applicationCompleteness: 0.95,
        preApprovalStatus: 1.0,
        suitabilityMatch: 0.85,
        geographicProximity: 1.0,
        timeOfLike: 0.8,
        engagementLevel: 0.9,
        shelterPriority: 0.2,
      },
    },
    appliedAt: new Date("2024-01-15T10:30:00"),
    messages: 3,
    hasScheduledVisit: true,
  },
  {
    id: "2",
    petId: "1",
    petName: "Luna",
    petPhoto: "/placeholder.svg?height=100&width=100&text=Luna",
    applicant: {
      id: "user2",
      name: "Mike Chen",
      email: "mike@email.com",
      location: "Oakland, CA",
      photo: "/placeholder.svg?height=60&width=60&text=MC",
      isPreApproved: false,
      isVerified: true,
    },
    score: {
      totalScore: 7.2,
      ranking: 2,
      status: "top-candidate" as const,
      breakdown: {
        applicationCompleteness: 0.8,
        preApprovalStatus: 0.3,
        suitabilityMatch: 0.9,
        geographicProximity: 0.7,
        timeOfLike: 0.9,
        engagementLevel: 0.7,
        shelterPriority: 0.0,
      },
    },
    appliedAt: new Date("2024-01-15T08:15:00"),
    messages: 1,
    hasScheduledVisit: false,
  },
  {
    id: "3",
    petId: "1",
    petName: "Luna",
    petPhoto: "/placeholder.svg?height=100&width=100&text=Luna",
    applicant: {
      id: "user3",
      name: "Emma Davis",
      email: "emma@email.com",
      location: "Berkeley, CA",
      photo: "/placeholder.svg?height=60&width=60&text=ED",
      isPreApproved: true,
      isVerified: false,
    },
    score: {
      totalScore: 6.8,
      ranking: 3,
      status: "top-candidate" as const,
      breakdown: {
        applicationCompleteness: 0.7,
        preApprovalStatus: 1.0,
        suitabilityMatch: 0.6,
        geographicProximity: 0.7,
        timeOfLike: 0.6,
        engagementLevel: 0.8,
        shelterPriority: 0.0,
      },
    },
    appliedAt: new Date("2024-01-14T16:20:00"),
    messages: 5,
    hasScheduledVisit: true,
  },
]

export default function ShelterDashboard() {
  const [selectedTab, setSelectedTab] = useState("add-pet")
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [petInfo, setPetInfo] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
  })

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
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "top-candidate":
        return "bg-green-600 text-white"
      case "waitlist":
        return "bg-yellow-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400"
    if (score >= 6) return "text-yellow-400"
    return "text-red-400"
  }

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
                className="hover:bg-white/10 backdrop-blur-sm text-green-300 border border-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </motion.div>
          </Link>
          <h1 className="text-3xl font-bold text-green-400 ml-4">Shelter Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 text-white border-0 px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            Verified Shelter
          </Badge>
          <Button className="bg-white text-black hover:bg-gray-100">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-gray-900/80 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Building2 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Users className="w-4 h-4 mr-2" />
              Applications ({mockApplications.length})
            </TabsTrigger>
            <TabsTrigger value="pets" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Heart className="w-4 h-4 mr-2" />
              My Pets (23)
            </TabsTrigger>
            <TabsTrigger value="add-pet" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Shelter Profile */}
          <TabsContent value="overview" className="space-y-6">
            {/* Shelter Profile Card */}
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                      HT
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-green-400">{shelterProfile.name}</h2>
                        {shelterProfile.verified && (
                          <Badge className="bg-green-600 text-white border-0">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-green-500 text-lg mb-2">{shelterProfile.type}</p>
                      <div className="flex items-center gap-4 text-sm text-green-500 mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {shelterProfile.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {shelterProfile.rating} ({shelterProfile.totalReviews} reviews)
                        </div>
                        <div>Est. {shelterProfile.established}</div>
                      </div>
                      <p className="text-green-300 leading-relaxed max-w-2xl">{shelterProfile.description}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center text-green-300 mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="font-medium">Email</span>
                    </div>
                    <p className="text-green-400">{shelterProfile.email}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center text-green-300 mb-2">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="font-medium">Phone</span>
                    </div>
                    <p className="text-green-400">{shelterProfile.phone}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center text-green-300 mb-2">
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="font-medium">Website</span>
                    </div>
                    <p className="text-green-400">{shelterProfile.website}</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h3 className="text-green-400 font-semibold mb-3">Specialties</h3>
                  <div className="flex gap-2">
                    {shelterProfile.specialties.map((specialty) => (
                      <Badge key={specialty} className="bg-blue-600/20 text-blue-400 border border-blue-600/30">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {shelterProfile.stats.successfulAdoptions}
                  </div>
                  <div className="text-green-500">Successful Adoptions</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {shelterProfile.stats.currentlyAvailable}
                  </div>
                  <div className="text-green-500">Available Pets</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{shelterProfile.stats.avgMatchScore}</div>
                  <div className="text-green-500">Avg Match Score</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${shelterProfile.stats.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-green-500">Total Revenue</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-green-400">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-300">New application from Sarah Johnson for Luna</span>
                    <span className="text-green-500 ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-green-300">Buddy was successfully adopted by the Martinez family</span>
                    <span className="text-green-500 ml-auto">5h ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-green-300">Added 3 new pets to the system</span>
                    <span className="text-green-500 ml-auto">1d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-green-400">Applications for Luna</CardTitle>
                <p className="text-green-500">
                  {mockApplications.length} total applications •{" "}
                  {mockApplications.filter((app) => app.score.status === "top-candidate").length} top candidates
                </p>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {mockApplications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl hover:bg-gray-900/90 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                application.score.ranking === 1
                                  ? "bg-yellow-600 text-black"
                                  : application.score.ranking === 2
                                    ? "bg-gray-400 text-black"
                                    : application.score.ranking === 3
                                      ? "bg-amber-600 text-black"
                                      : "bg-gray-600 text-white"
                              }`}
                            >
                              {application.score.ranking}
                            </div>
                            {application.score.ranking <= 3 && <Trophy className="w-3 h-3 text-yellow-400 mt-1" />}
                          </div>

                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <img
                                src={application.applicant.photo || "/placeholder.svg"}
                                alt={application.applicant.name}
                                className="w-12 h-12 rounded-full object-cover border border-white/20"
                              />
                              {application.applicant.isVerified && (
                                <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-0.5">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold text-green-400">{application.applicant.name}</h3>
                                <Badge className={getStatusColor(application.score.status)}>
                                  {application.score.status === "top-candidate" ? "Top Candidate" : "Pending"}
                                </Badge>
                                {application.applicant.isPreApproved && (
                                  <Badge className="bg-blue-600 text-white border-0 text-xs">Pre-approved</Badge>
                                )}
                              </div>

                              <div className="flex items-center text-green-500 text-sm mb-2">
                                <MapPin className="w-3 h-3 mr-1" />
                                {application.applicant.location}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-green-500">
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Applied {application.appliedAt.toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  {application.messages} messages
                                </div>
                                {application.hasScheduledVisit && (
                                  <div className="flex items-center text-green-400">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Visit scheduled
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getScoreColor(application.score.totalScore)}`}>
                              {application.score.totalScore}
                            </div>
                            <div className="text-xs text-green-500">Match Score</div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-green-300 hover:bg-white/5 bg-transparent"
                            >
                              <MessageCircle className="w-3 h-3 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div className="text-center">
                            <div className="text-green-400 font-medium">
                              {Math.round(application.score.breakdown.applicationCompleteness * 100)}%
                            </div>
                            <div className="text-green-500">Application</div>
                          </div>
                          <div className="text-center">
                            <div className="text-green-400 font-medium">
                              {Math.round(application.score.breakdown.suitabilityMatch * 100)}%
                            </div>
                            <div className="text-green-500">Suitability</div>
                          </div>
                          <div className="text-center">
                            <div className="text-green-400 font-medium">
                              {Math.round(application.score.breakdown.geographicProximity * 100)}%
                            </div>
                            <div className="text-green-500">Location</div>
                          </div>
                          <div className="text-center">
                            <div className="text-green-400 font-medium">
                              {Math.round(application.score.breakdown.engagementLevel * 100)}%
                            </div>
                            <div className="text-green-500">Engagement</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pets">
            <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-400 mb-2">Pet Management</h3>
                <p className="text-green-500 mb-6">Manage your pet listings, photos, and adoption status</p>
                <Link href="/dashboard/add-pet">
                  <Button className="bg-white text-black hover:bg-gray-100">Add New Pet</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Pet Tab */}
          <TabsContent value="add-pet" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Camera className="w-6 h-6 mr-3" />
                    Add New Pet
                  </CardTitle>
                  <p className="text-green-500">Upload photos and information for a new pet</p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Pet Information Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="petName" className="text-green-300 mb-2 block">
                        Pet Name *
                      </Label>
                      <Input
                        id="petName"
                        value={petInfo.name}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Luna"
                        className="bg-white/5 border-white/20 text-green-300 placeholder:text-gray-500 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petBreed" className="text-green-300 mb-2 block">
                        Breed *
                      </Label>
                      <Input
                        id="petBreed"
                        value={petInfo.breed}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, breed: e.target.value }))}
                        placeholder="e.g., Golden Retriever Mix"
                        className="bg-white/5 border-white/20 text-green-300 placeholder:text-gray-500 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petAge" className="text-green-300 mb-2 block">
                        Age *
                      </Label>
                      <Input
                        id="petAge"
                        value={petInfo.age}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, age: e.target.value }))}
                        placeholder="e.g., 2 years"
                        className="bg-white/5 border-white/20 text-green-300 placeholder:text-gray-500 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petDescription" className="text-green-300 mb-2 block">
                        Description
                      </Label>
                      <Textarea
                        id="petDescription"
                        value={petInfo.description}
                        onChange={(e) => setPetInfo((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Tell us about this pet's personality..."
                        className="bg-white/5 border-white/20 text-green-300 placeholder:text-gray-500 focus:border-green-400"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div>
                    <Label className="text-green-300 mb-4 block text-lg font-semibold">
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
                            className="w-full h-32 object-cover rounded-lg border border-green-400/30 shadow-lg"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2 bg-green-600 text-white text-xs">
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
                          className="w-full h-32 border-2 border-dashed border-green-400/40 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400/60 hover:bg-green-400/5 transition-all duration-200 group"
                        >
                          {isUploading ? (
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin mb-2" />
                              <span className="text-green-400 text-sm">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-green-400 text-sm font-medium">Add Photo</span>
                              <span className="text-green-500 text-xs">Click to browse</span>
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

                    {/* Upload Tips */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="text-green-400 font-medium mb-2 flex items-center">
                        <Camera className="w-4 h-4 mr-2" />
                        Photo Tips
                      </h4>
                      <ul className="text-green-300 text-sm space-y-1">
                        <li>• Upload high-quality, well-lit photos</li>
                        <li>• Include photos showing the pet's personality</li>
                        <li>• The first photo will be the main display image</li>
                        <li>• Maximum 8 photos per pet</li>
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                    <Button
                      variant="outline"
                      className="border-white/20 text-green-300 hover:bg-white/5 bg-transparent"
                      onClick={() => {
                        setPetInfo({ name: "", breed: "", age: "", description: "" })
                        setUploadedPhotos([])
                      }}
                    >
                      Clear All
                    </Button>
                    <Button
                      onClick={handleSavePet}
                      disabled={!petInfo.name || !petInfo.breed || uploadedPhotos.length === 0}
                      className="bg-green-600 hover:bg-green-700 text-white px-8"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Pet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">47</div>
                  <div className="text-green-500">Total Applications</div>
                  <div className="text-green-400 text-sm mt-1">+12 this week</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">8.2</div>
                  <div className="text-green-500">Avg Match Score</div>
                  <div className="text-blue-400 text-sm mt-1">High quality matches</div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">12</div>
                  <div className="text-green-500">Successful Adoptions</div>
                  <div className="text-green-400 text-sm mt-1">This month</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

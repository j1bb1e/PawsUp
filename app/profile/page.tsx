"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Camera, MapPin, Mail, Phone, Home, Shield, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    bio: "Dog lover and hiking enthusiast looking for an active companion to join me on adventures!",
    experience: "First-time pet owner",
    livingSpace: "Apartment with yard",
    lifestyle: "Active",
    yardSpace: "medium",
    isVerified: true,
    emailVerified: true,
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would save to your backend
  }

  const yardSpaceOptions = [
    { value: "none", label: "No Yard" },
    { value: "small", label: "Small Yard" },
    { value: "medium", label: "Medium Yard" },
    { value: "large", label: "Large Yard" },
  ]

  return (
    <div className="min-h-screen bg-black p-4 pb-20">
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
          <h1 className="text-3xl font-bold text-white ml-4">Your Profile</h1>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="border-white/20 text-gray-300 hover:bg-white/5 bg-transparent backdrop-blur-sm"
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </motion.div>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Picture & Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-2xl font-bold text-white">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  {profile.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {isEditing && (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-white text-black hover:bg-gray-100"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                        className="text-xl font-semibold bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
                    )}
                    {profile.isVerified && (
                      <Badge className="bg-green-600 text-white border-0 px-2 py-0.5 text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {isEditing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        className="h-6 text-sm bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                      />
                    ) : (
                      profile.location
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  {isEditing ? (
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className="flex-1 bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                    />
                  ) : (
                    <span className="flex-1">{profile.email}</span>
                  )}
                  {profile.emailVerified && <CheckCircle className="w-4 h-4 text-green-500 ml-2" />}
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      className="flex-1 bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                    />
                  ) : (
                    profile.phone
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Verification Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-white font-medium">Email Verified</p>
                      <p className="text-gray-400 text-sm">Your email has been confirmed</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-white font-medium">Profile Verified</p>
                      <p className="text-gray-400 text-sm">Identity and background checked</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white border-0">Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-amber-400 mr-3" />
                    <div>
                      <p className="text-white font-medium">Phone Verification</p>
                      <p className="text-gray-400 text-sm">Add extra security to your account</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-0">
                    Verify
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell shelters about yourself and what kind of pet you're looking for..."
                  rows={4}
                  className="bg-white/5 border-white/20 text-gray-300 placeholder:text-gray-500"
                />
              ) : (
                <p className="text-gray-300">{profile.bio}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pet Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Pet Experience & Living Space</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experience" className="text-sm font-medium text-gray-300">
                  Experience Level
                </Label>
                {isEditing ? (
                  <select
                    id="experience"
                    value={profile.experience}
                    onChange={(e) => setProfile((prev) => ({ ...prev, experience: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-300"
                  >
                    <option value="First-time pet owner">First-time pet owner</option>
                    <option value="Some experience">Some experience</option>
                    <option value="Very experienced">Very experienced</option>
                    <option value="Professional experience">Professional experience</option>
                  </select>
                ) : (
                  <Badge className="mt-1 bg-white/10 text-gray-300 border border-white/20">{profile.experience}</Badge>
                )}
              </div>

              <div>
                <Label htmlFor="livingSpace" className="text-sm font-medium text-gray-300">
                  Living Space
                </Label>
                {isEditing ? (
                  <select
                    id="livingSpace"
                    value={profile.livingSpace}
                    onChange={(e) => setProfile((prev) => ({ ...prev, livingSpace: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-300"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Apartment with yard">Apartment with yard</option>
                    <option value="House with small yard">House with small yard</option>
                    <option value="House with large yard">House with large yard</option>
                    <option value="Farm/Rural property">Farm/Rural property</option>
                  </select>
                ) : (
                  <Badge className="mt-1 bg-white/10 text-gray-300 border border-white/20">{profile.livingSpace}</Badge>
                )}
              </div>

              <div>
                <Label htmlFor="yardSpace" className="text-sm font-medium text-gray-300 flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  Yard Space
                </Label>
                {isEditing ? (
                  <select
                    id="yardSpace"
                    value={profile.yardSpace}
                    onChange={(e) => setProfile((prev) => ({ ...prev, yardSpace: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-300"
                  >
                    {yardSpaceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Badge className="mt-1 bg-white/10 text-gray-300 border border-white/20">
                    {yardSpaceOptions.find((opt) => opt.value === profile.yardSpace)?.label}
                  </Badge>
                )}
              </div>

              <div>
                <Label htmlFor="lifestyle" className="text-sm font-medium text-gray-300">
                  Lifestyle
                </Label>
                {isEditing ? (
                  <select
                    id="lifestyle"
                    value={profile.lifestyle}
                    onChange={(e) => setProfile((prev) => ({ ...prev, lifestyle: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-300"
                  >
                    <option value="Very active">Very active</option>
                    <option value="Active">Active</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Relaxed">Relaxed</option>
                  </select>
                ) : (
                  <Badge className="mt-1 bg-white/10 text-gray-300 border border-white/20">{profile.lifestyle}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              className="w-full bg-white text-black hover:bg-gray-100 border-0 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
              onClick={handleSave}
            >
              Save Profile
            </Button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">47</div>
                  <div className="text-sm text-gray-400">Pets Viewed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-gray-400">Matches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-gray-400">Applications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

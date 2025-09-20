import type { MatchScore, Application, UserProfile, Pet } from "@/types/matching"

// Scoring weights (can be adjusted by shelters)
const DEFAULT_WEIGHTS = {
  applicationCompleteness: 0.25,
  preApprovalStatus: 0.2,
  suitabilityMatch: 0.2,
  geographicProximity: 0.15,
  timeOfLike: 0.05,
  engagementLevel: 0.1,
  shelterPriority: 0.05,
}

export function calculateMatchScore(
  user: UserProfile,
  pet: Pet,
  application: Application,
  likedAt: Date,
  shelterPriorityBoost = 0,
): MatchScore {
  const breakdown = {
    applicationCompleteness: calculateApplicationScore(application),
    preApprovalStatus: calculatePreApprovalScore(user),
    suitabilityMatch: calculateSuitabilityScore(user, pet),
    geographicProximity: calculateProximityScore(user, pet),
    timeOfLike: calculateTimeScore(likedAt),
    engagementLevel: user.engagementScore,
    shelterPriority: shelterPriorityBoost,
  }

  const totalScore = Object.entries(breakdown).reduce(
    (total, [key, score]) => total + score * DEFAULT_WEIGHTS[key as keyof typeof DEFAULT_WEIGHTS],
    0,
  )

  return {
    userId: user.id,
    petId: pet.id,
    totalScore: Math.round(totalScore * 100) / 100,
    breakdown,
    ranking: 0, // Will be set after sorting
    status: "pending",
    appliedAt: application.submittedAt || new Date(),
  }
}

function calculateApplicationScore(application: Application): number {
  return application.completeness / 100
}

function calculatePreApprovalScore(user: UserProfile): number {
  let score = 0
  if (user.isPreApproved) score += 0.5
  if (user.backgroundCheckStatus === "approved") score += 0.3
  if (user.homeCheckStatus === "completed") score += 0.2
  return Math.min(score, 1)
}

function calculateSuitabilityScore(user: UserProfile, pet: Pet): number {
  let score = 0.5 // Base score

  // Yard requirement matching
  const yardCompatibility = {
    none: ["none"],
    small: ["none", "small"],
    medium: ["none", "small", "medium"],
    large: ["none", "small", "medium", "large"],
  }

  if (yardCompatibility[user.preferences.yardSpace as keyof typeof yardCompatibility]?.includes(pet.yardRequirement)) {
    score += 0.3
  }

  // Experience matching
  const experienceMatch = {
    "first-time": ["Low", "Medium"],
    some: ["Low", "Medium", "High"],
    experienced: ["Medium", "High", "Very High"],
    professional: ["High", "Very High"],
  }

  if (experienceMatch[user.preferences.experience as keyof typeof experienceMatch]?.includes(pet.energy)) {
    score += 0.2
  }

  return Math.min(score, 1)
}

function calculateProximityScore(user: UserProfile, pet: Pet): number {
  // Simplified distance calculation (in real app, use actual coordinates)
  const userCity = user.location.split(",")[0].trim()
  const petCity = pet.location.split(",")[0].trim()

  if (userCity === petCity) return 1
  if (user.location.split(",")[1]?.trim() === pet.location.split(",")[1]?.trim()) return 0.7
  return 0.3
}

function calculateTimeScore(likedAt: Date): number {
  const hoursAgo = (Date.now() - likedAt.getTime()) / (1000 * 60 * 60)
  return Math.max(0, 1 - hoursAgo / (24 * 7)) // Decreases over a week
}

export function rankApplicants(scores: MatchScore[]): MatchScore[] {
  const sorted = scores.sort((a, b) => b.totalScore - a.totalScore)

  return sorted.map((score, index) => ({
    ...score,
    ranking: index + 1,
    status: index < 3 ? "top-candidate" : index < 10 ? "waitlist" : "pending",
  }))
}

export interface MatchScore {
  userId: string
  petId: string
  totalScore: number
  breakdown: {
    applicationCompleteness: number
    preApprovalStatus: number
    suitabilityMatch: number
    geographicProximity: number
    timeOfLike: number
    engagementLevel: number
    shelterPriority: number
  }
  ranking: number
  status: "pending" | "top-candidate" | "waitlist" | "rejected"
  appliedAt: Date
}

export interface Application {
  id: string
  userId: string
  petId: string
  status: "draft" | "submitted" | "under-review" | "approved" | "rejected"
  completeness: number
  submittedAt?: Date
  responses: {
    experience: string
    livingSpace: string
    yardSpace: string
    timeCommitment: string
    previousPets: string
    references: string[]
    veterinarian: string
    reasonForAdoption: string
    specificPetQuestions: Record<string, string>
  }
}

export interface UserProfile {
  id: string
  name: string
  email: string
  location: string
  coordinates?: { lat: number; lng: number }
  isPreApproved: boolean
  backgroundCheckStatus: "pending" | "approved" | "rejected"
  homeCheckStatus: "pending" | "scheduled" | "completed" | "failed"
  engagementScore: number
  adoptionHistory: string[]
  preferences: {
    yardSpace: string
    experience: string
    lifestyle: string
  }
}

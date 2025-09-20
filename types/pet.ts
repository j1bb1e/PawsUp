export interface Pet {
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

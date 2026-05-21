export type Role = "user" | "provider";

export type CategoryId =
  | "babysitting"
  | "moving"
  | "repairs"
  | "pets"
  | "elderly"
  | "cleaning";

export type RequestStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "rated";

export type ChatMessage = {
  id: string;
  from: "user" | "provider";
  text: string;
  ts: number;
};

export type Review = {
  rating: number;
  text: string;
  by: "user" | "provider";
};

export type ServiceRequest = {
  id: string;
  category: CategoryId;
  title: string;
  description: string;
  address: string;
  neighborhood: string;
  when: string; // human readable
  price: number;
  status: RequestStatus;
  createdAt: number;
  acceptedAt?: number;
  completedAt?: number;
  providerId?: string;
  userId: string;
  distanceKm: number;
  messages: ChatMessage[];
  reviewFromUser?: Review;
  reviewFromProvider?: Review;
};

export type Profile = {
  name: string;
  phone: string;
  neighborhood: string;
  city: string;
  verified: boolean;
  avatarColor: string;
  initials: string;
  ratingAvg: number;
  ratingCount: number;
};

export type AppState = {
  authenticated: boolean;
  onboarded: boolean;
  role: Role;
  user: Profile;
  provider: Profile;
  requests: ServiceRequest[];
};

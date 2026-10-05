export type ServiceType =
  | "call"
  | "digital_product"
  | "priority_dm"
  | "webinar"
  | "cohort"
  | "course"
  | "package";

export type BookingStatus =
  | "confirmed"
  | "cancelled"
  | "rescheduled"
  | "no_show";

export type DmStatus = "pending" | "answered" | "expired";

export type PaymentStatus = "pending" | "completed" | "refunded" | "failed";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  headline: string | null;
  bio: string | null;
  socialLinks: Record<string, string>;
  theme: string;
  category: string | null;
  ratingAvg: number;
  ratingCount: number;
  bookingCount: number;
  isOnboarded: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  userId: string;
  type: ServiceType;
  title: string;
  description: string | null;
  priceCents: number;
  originalPriceCents: number | null;
  currency: string;
  durationMinutes: number | null;
  replySLADays: number | null;
  capacity: number | null;
  sessionCount: number | null;
  isPublished: boolean;
  sortOrder: number;
  customQuestions: string[];
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  hostId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  guestTimezone: string;
  startAt: string;
  endAt: string;
  status: BookingStatus;
  meetingUrl: string | null;
  answers: Record<string, string>;
  cancelToken: string;
  createdAt: string;
}

export interface Purchase {
  id: string;
  serviceId: string;
  buyerName: string;
  buyerEmail: string;
  amountCents: number;
  currency: string;
  downloadCount: number;
  downloadToken: string;
  createdAt: string;
}

export interface PriorityDM {
  id: string;
  serviceId: string;
  creatorId: string;
  senderName: string;
  senderEmail: string;
  questionText: string;
  answerText: string | null;
  status: DmStatus;
  amountCents: number;
  currency: string;
  createdAt: string;
  answeredAt: string | null;
}

export interface Testimonial {
  id: string;
  creatorId: string;
  serviceId: string | null;
  reviewerName: string;
  rating: number;
  body: string;
  isPublic: boolean;
  createdAt: string;
}

export interface AvailabilityRule {
  id: string;
  userId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  isActive: boolean;
}

export interface TimeSlot {
  startAt: string;
  endAt: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

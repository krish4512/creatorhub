import type {
  User,
  Service,
  Booking,
  Testimonial,
  Category,
  PriorityDM,
} from "@/types";

export const categories: Category[] = [
  { id: "cat-1", name: "Careers & Jobs", slug: "careers" },
  { id: "cat-2", name: "Tech & Data", slug: "tech" },
  { id: "cat-3", name: "Product & Design", slug: "product-design" },
  { id: "cat-4", name: "Business", slug: "business" },
  { id: "cat-5", name: "Money & Finance", slug: "money" },
  { id: "cat-6", name: "Life & Wellness", slug: "life-wellness" },
];

export const creators: User[] = [
  {
    id: "u-1",
    username: "amara-chen",
    firstName: "Amara",
    lastName: "Chen",
    email: "amara@example.com",
    avatarUrl: null,
    headline: "Product Lead at a Series B startup",
    bio: "Helped 500+ people land PM roles. 8 years in product across fintech and e-commerce. I do mock interviews, resume reviews, and career pivots.",
    socialLinks: { linkedin: "https://linkedin.com/in/example", twitter: "https://x.com/example" },
    theme: "default",
    category: "Product & Design",
    ratingAvg: 4.8,
    ratingCount: 83,
    bookingCount: 1200,
    isOnboarded: true,
    createdAt: "2025-03-15T10:00:00Z",
  },
  {
    id: "u-2",
    username: "raj-mehta",
    firstName: "Raj",
    lastName: "Mehta",
    email: "raj@example.com",
    avatarUrl: null,
    headline: "Senior Data Engineer",
    bio: "Building data pipelines at scale. Open to mentoring on SQL, Python, Spark, and interview prep for data roles.",
    socialLinks: { linkedin: "https://linkedin.com/in/example2" },
    theme: "default",
    category: "Tech & Data",
    ratingAvg: 4.6,
    ratingCount: 41,
    bookingCount: 380,
    isOnboarded: true,
    createdAt: "2025-06-01T10:00:00Z",
  },
  {
    id: "u-3",
    username: "sophie-laurent",
    firstName: "Sophie",
    lastName: "Laurent",
    email: "sophie@example.com",
    avatarUrl: null,
    headline: "Career Coach & Resume Writer",
    bio: "Former recruiter turned career coach. I help you tell your story so hiring managers listen.",
    socialLinks: {},
    theme: "default",
    category: "Careers & Jobs",
    ratingAvg: 4.9,
    ratingCount: 127,
    bookingCount: 2100,
    isOnboarded: true,
    createdAt: "2024-11-20T10:00:00Z",
  },
];

export const services: Service[] = [
  {
    id: "svc-1",
    userId: "u-1",
    type: "call",
    title: "Product Career Chat",
    description: "30 minutes to talk through your PM career — whether you're breaking in, switching companies, or levelling up.",
    priceCents: 4900,
    originalPriceCents: 7500,
    currency: "USD",
    durationMinutes: 30,
    replySLADays: null,
    capacity: null,
    sessionCount: null,
    isPublished: true,
    sortOrder: 0,
    customQuestions: ["What's your current role?", "What would make this call a success for you?"],
    createdAt: "2025-03-20T10:00:00Z",
  },
  {
    id: "svc-2",
    userId: "u-1",
    type: "digital_product",
    title: "PM Interview Prep Kit",
    description: "50+ real questions, frameworks, and example answers for product management interviews.",
    priceCents: 1900,
    originalPriceCents: null,
    currency: "USD",
    durationMinutes: null,
    replySLADays: null,
    capacity: null,
    sessionCount: null,
    isPublished: true,
    sortOrder: 1,
    customQuestions: [],
    createdAt: "2025-04-01T10:00:00Z",
  },
  {
    id: "svc-3",
    userId: "u-1",
    type: "priority_dm",
    title: "Quick Career Question",
    description: "Send me any product career question and get a detailed reply within 3 days.",
    priceCents: 1500,
    originalPriceCents: null,
    currency: "USD",
    durationMinutes: null,
    replySLADays: 3,
    capacity: null,
    sessionCount: null,
    isPublished: true,
    sortOrder: 2,
    customQuestions: [],
    createdAt: "2025-04-10T10:00:00Z",
  },
  {
    id: "svc-4",
    userId: "u-1",
    type: "webinar",
    title: "Breaking Into Product Management",
    description: "A live 90-minute session on how to transition into PM from engineering, design, or marketing.",
    priceCents: 2900,
    originalPriceCents: 4900,
    currency: "USD",
    durationMinutes: 90,
    replySLADays: null,
    capacity: 50,
    sessionCount: null,
    isPublished: true,
    sortOrder: 3,
    customQuestions: [],
    createdAt: "2025-05-01T10:00:00Z",
  },
  {
    id: "svc-5",
    userId: "u-2",
    type: "call",
    title: "Data Engineering Mentorship",
    description: "Talk through your data career, review your architecture decisions, or prep for interviews.",
    priceCents: 3500,
    originalPriceCents: null,
    currency: "USD",
    durationMinutes: 30,
    replySLADays: null,
    capacity: null,
    sessionCount: null,
    isPublished: true,
    sortOrder: 0,
    customQuestions: ["Describe your current data stack"],
    createdAt: "2025-06-10T10:00:00Z",
  },
  {
    id: "svc-6",
    userId: "u-3",
    type: "call",
    title: "Resume Deep Dive",
    description: "I'll rewrite your resume live on the call. Bring your current version and the roles you're targeting.",
    priceCents: 7900,
    originalPriceCents: 9900,
    currency: "USD",
    durationMinutes: 45,
    replySLADays: null,
    capacity: null,
    sessionCount: null,
    isPublished: true,
    sortOrder: 0,
    customQuestions: ["Share a link to your current resume"],
    createdAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "svc-7",
    userId: "u-3",
    type: "priority_dm",
    title: "Resume Feedback",
    description: "Upload your resume and I'll send back a marked-up PDF with specific fixes within 2 days.",
    priceCents: 2900,
    originalPriceCents: null,
    currency: "USD",
    durationMinutes: null,
    replySLADays: 2,
    capacity: null,
    sessionCount: null,
    isPublished: true,
    sortOrder: 1,
    customQuestions: [],
    createdAt: "2025-01-10T10:00:00Z",
  },
];

export const bookings: Booking[] = [
  {
    id: "bk-1",
    serviceId: "svc-1",
    hostId: "u-1",
    guestName: "Jordan Lee",
    guestEmail: "jordan@example.com",
    guestPhone: null,
    guestTimezone: "America/New_York",
    startAt: "2026-10-10T14:00:00Z",
    endAt: "2026-10-10T14:30:00Z",
    status: "confirmed",
    meetingUrl: "https://meet.example.com/abc123",
    answers: { "What's your current role?": "Software engineer looking to move to PM" },
    cancelToken: "tok-cancel-1",
    createdAt: "2026-10-05T09:00:00Z",
  },
  {
    id: "bk-2",
    serviceId: "svc-6",
    hostId: "u-3",
    guestName: "Priya Patel",
    guestEmail: "priya@example.com",
    guestPhone: null,
    guestTimezone: "Asia/Kolkata",
    startAt: "2026-10-12T10:00:00Z",
    endAt: "2026-10-12T10:45:00Z",
    status: "confirmed",
    meetingUrl: "https://meet.example.com/def456",
    answers: { "Share a link to your current resume": "https://docs.example.com/resume" },
    cancelToken: "tok-cancel-2",
    createdAt: "2026-10-05T11:00:00Z",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    creatorId: "u-1",
    serviceId: "svc-1",
    reviewerName: "Megha C.",
    rating: 5,
    body: "Amara's career guidance helped me avoid mistakes in my job search. Landed a PM role two weeks later.",
    isPublic: true,
    createdAt: "2026-09-15T10:00:00Z",
  },
  {
    id: "test-2",
    creatorId: "u-1",
    serviceId: "svc-2",
    reviewerName: "David K.",
    rating: 4,
    body: "The interview kit is solid. Covered every question I got in my final rounds.",
    isPublic: true,
    createdAt: "2026-08-20T10:00:00Z",
  },
  {
    id: "test-3",
    creatorId: "u-3",
    serviceId: "svc-6",
    reviewerName: "Alex T.",
    rating: 5,
    body: "Sophie completely transformed my resume. Got callbacks from three companies the same week.",
    isPublic: true,
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "test-4",
    creatorId: "u-1",
    serviceId: null,
    reviewerName: "Nina R.",
    rating: 5,
    body: "Practical, no-fluff advice. Worth every penny.",
    isPublic: true,
    createdAt: "2026-07-10T10:00:00Z",
  },
];

export const priorityDms: PriorityDM[] = [
  {
    id: "dm-1",
    serviceId: "svc-3",
    creatorId: "u-1",
    senderName: "Casey M.",
    senderEmail: "casey@example.com",
    questionText: "Should I do an MBA before switching to product, or try to break in directly?",
    answerText: null,
    status: "pending",
    amountCents: 1500,
    currency: "USD",
    createdAt: "2026-10-04T15:00:00Z",
    answeredAt: null,
  },
];

export function getCreatorByUsername(username: string): User | undefined {
  return creators.find((c) => c.username === username);
}

export function getServicesByUserId(userId: string): Service[] {
  return services.filter((s) => s.userId === userId && s.isPublished);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getTestimonialsByCreatorId(creatorId: string): Testimonial[] {
  return testimonials.filter((t) => t.creatorId === creatorId && t.isPublic);
}

export function getBookingsByHostId(hostId: string): Booking[] {
  return bookings.filter((b) => b.hostId === hostId);
}

export function getDmsByCreatorId(creatorId: string): PriorityDM[] {
  return priorityDms.filter((d) => d.creatorId === creatorId);
}

export function getCreatorsByCategory(category?: string): User[] {
  if (!category) return creators;
  return creators.filter((c) => c.category === category);
}

export function searchCreators(query: string): User[] {
  const q = query.toLowerCase();
  return creators.filter(
    (c) =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.headline?.toLowerCase().includes(q) ||
      c.bio?.toLowerCase().includes(q) ||
      c.category?.toLowerCase().includes(q)
  );
}

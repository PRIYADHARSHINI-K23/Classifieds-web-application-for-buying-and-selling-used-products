// Mock medical products data
export const mockProducts = [
  {
    _id: "1",
    name: "Paracetamol 500mg Tablets",
    description: "Pain relief and fever reducer tablets. Effective for headaches, muscle pain, and fever.",
    price: 45,
    cuttedPrice: 60,
    images: [{ url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop" }],
    category: "Over-the-Counter",
    stock: 50,
    ratings: 4.5,
    numOfReviews: 125,
    brand: { name: "MedCare" }
  },
  {
    _id: "2", 
    name: "Vitamin D3 1000 IU Capsules",
    description: "Essential vitamin D3 supplement for bone health and immune system support.",
    price: 299,
    cuttedPrice: 399,
    images: [{ url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop" }],
    category: "Vitamins & Supplements",
    stock: 30,
    ratings: 4.7,
    numOfReviews: 89,
    brand: { name: "HealthPlus" }
  },
  {
    _id: "3",
    name: "Cough Syrup 100ml",
    description: "Effective cough suppressant syrup for dry and wet cough relief.",
    price: 125,
    cuttedPrice: 150,
    images: [{ url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop" }],
    category: "Over-the-Counter",
    stock: 25,
    ratings: 4.2,
    numOfReviews: 67,
    brand: { name: "CoughCare" }
  },
  {
    _id: "4",
    name: "Omega-3 Fish Oil Capsules",
    description: "Premium omega-3 fatty acids for heart and brain health support.",
    price: 599,
    cuttedPrice: 799,
    images: [{ url: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop" }],
    category: "Vitamins & Supplements", 
    stock: 40,
    ratings: 4.6,
    numOfReviews: 156,
    brand: { name: "OceanHealth" }
  },
  {
    _id: "5",
    name: "Antiseptic Cream 30g",
    description: "Topical antiseptic cream for minor cuts, wounds, and skin infections.",
    price: 85,
    cuttedPrice: 110,
    images: [{ url: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop" }],
    category: "Personal Care",
    stock: 60,
    ratings: 4.3,
    numOfReviews: 92,
    brand: { name: "SkinGuard" }
  },
  {
    _id: "6",
    name: "Multivitamin Tablets",
    description: "Complete daily multivitamin with essential vitamins and minerals.",
    price: 399,
    cuttedPrice: 499,
    images: [{ url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop" }],
    category: "Vitamins & Supplements",
    stock: 35,
    ratings: 4.4,
    numOfReviews: 203,
    brand: { name: "VitaMax" }
  },
  {
    _id: "7",
    name: "Antacid Tablets",
    description: "Fast-acting antacid tablets for heartburn and acid indigestion relief.",
    price: 65,
    cuttedPrice: 85,
    images: [{ url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop" }],
    category: "Over-the-Counter",
    stock: 45,
    ratings: 4.1,
    numOfReviews: 78,
    brand: { name: "DigestEase" }
  },
  {
    _id: "8",
    name: "Iron Supplement 65mg",
    description: "Iron supplement tablets for treating iron deficiency and anemia.",
    price: 199,
    cuttedPrice: 249,
    images: [{ url: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop" }],
    category: "Vitamins & Supplements",
    stock: 28,
    ratings: 4.5,
    numOfReviews: 134,
    brand: { name: "IronStrong" }
  },
  {
    _id: "9",
    name: "Hand Sanitizer 250ml",
    description: "70% alcohol-based hand sanitizer for effective germ protection.",
    price: 149,
    cuttedPrice: 199,
    images: [{ url: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop" }],
    category: "Personal Care",
    stock: 55,
    ratings: 4.6,
    numOfReviews: 167,
    brand: { name: "CleanHands" }
  },
  {
    _id: "10",
    name: "Calcium + Vitamin D Tablets",
    description: "Calcium supplement with vitamin D for strong bones and teeth.",
    price: 349,
    cuttedPrice: 449,
    images: [{ url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop" }],
    category: "Vitamins & Supplements",
    stock: 32,
    ratings: 4.7,
    numOfReviews: 198,
    brand: { name: "BoneHealth" }
  }
];

// Mock cart items data
export const mockCartItems = [
  {
    product: "1",
    name: "Paracetamol 500mg Tablets",
    price: 45,
    cuttedPrice: 60,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    stock: 50,
    quantity: 2
  },
  {
    product: "2",
    name: "Vitamin D3 1000 IU Capsules", 
    price: 299,
    cuttedPrice: 399,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
    stock: 30,
    quantity: 1
  },
  {
    product: "3",
    name: "Cough Syrup 100ml",
    price: 125,
    cuttedPrice: 150,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop",
    stock: 25,
    quantity: 1
  },
  {
    product: "4",
    name: "Omega-3 Fish Oil Capsules",
    price: 599,
    cuttedPrice: 799,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop",
    stock: 40,
    quantity: 1
  },
  {
    product: "5",
    name: "Antiseptic Cream 30g",
    price: 85,
    cuttedPrice: 110,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop",
    stock: 60,
    quantity: 3
  },
  {
    product: "6",
    name: "Multivitamin Tablets",
    price: 399,
    cuttedPrice: 499,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
    stock: 35,
    quantity: 1
  },
  {
    product: "7",
    name: "Antacid Tablets",
    price: 65,
    cuttedPrice: 85,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    stock: 45,
    quantity: 2
  },
  {
    product: "8",
    name: "Iron Supplement 65mg",
    price: 199,
    cuttedPrice: 249,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop",
    stock: 28,
    quantity: 1
  },
  {
    product: "9",
    name: "Hand Sanitizer 250ml",
    price: 149,
    cuttedPrice: 199,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop",
    stock: 55,
    quantity: 2
  },
  {
    product: "10",
    name: "Calcium + Vitamin D Tablets",
    price: 349,
    cuttedPrice: 449,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
    stock: 32,
    quantity: 1
  }
];

// Mock orders data
export const mockOrders = [
  {
    _id: "ORD001",
    orderItems: [
      { name: "Paracetamol 500mg Tablets", quantity: 2, price: 45 },
      { name: "Vitamin D3 1000 IU Capsules", quantity: 1, price: 299 }
    ],
    totalPrice: 389,
    orderStatus: "Delivered",
    createdAt: "2024-01-15T10:30:00.000Z"
  },
  {
    _id: "ORD002",
    orderItems: [
      { name: "Cough Syrup 100ml", quantity: 1, price: 125 },
      { name: "Antiseptic Cream 30g", quantity: 2, price: 85 }
    ],
    totalPrice: 295,
    orderStatus: "Shipped",
    createdAt: "2024-01-16T14:20:00.000Z"
  },
  {
    _id: "ORD003",
    orderItems: [
      { name: "Omega-3 Fish Oil Capsules", quantity: 1, price: 599 }
    ],
    totalPrice: 599,
    orderStatus: "Processing",
    createdAt: "2024-01-17T09:15:00.000Z"
  },
  {
    _id: "ORD004",
    orderItems: [
      { name: "Multivitamin Tablets", quantity: 1, price: 399 },
      { name: "Iron Supplement 65mg", quantity: 1, price: 199 }
    ],
    totalPrice: 598,
    orderStatus: "Delivered",
    createdAt: "2024-01-18T16:45:00.000Z"
  },
  {
    _id: "ORD005",
    orderItems: [
      { name: "Hand Sanitizer 250ml", quantity: 3, price: 149 },
      { name: "Antacid Tablets", quantity: 2, price: 65 }
    ],
    totalPrice: 577,
    orderStatus: "Shipped",
    createdAt: "2024-01-19T11:30:00.000Z"
  },
  {
    _id: "ORD006",
    orderItems: [
      { name: "Calcium + Vitamin D Tablets", quantity: 1, price: 349 }
    ],
    totalPrice: 349,
    orderStatus: "Processing",
    createdAt: "2024-01-20T13:20:00.000Z"
  }
];

// Mock user orders data
export const mockUserOrders = [
  {
    _id: "ORD001",
    orderItems: [
      {
        name: "Paracetamol 500mg Tablets",
        quantity: 2,
        price: 45,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
        product: "1"
      }
    ],
    orderStatus: "Delivered",
    createdAt: "2024-01-15T10:30:00.000Z",
    deliveredAt: "2024-01-18T14:20:00.000Z"
  },
  {
    _id: "ORD002",
    orderItems: [
      {
        name: "Vitamin D3 1000 IU Capsules",
        quantity: 1,
        price: 299,
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
        product: "2"
      }
    ],
    orderStatus: "Shipped",
    createdAt: "2024-01-16T14:20:00.000Z",
    deliveredAt: null
  },
  {
    _id: "ORD003",
    orderItems: [
      {
        name: "Cough Syrup 100ml",
        quantity: 1,
        price: 125,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop",
        product: "3"
      }
    ],
    orderStatus: "Processing",
    createdAt: "2024-01-17T09:15:00.000Z",
    deliveredAt: null
  },
  {
    _id: "ORD004",
    orderItems: [
      {
        name: "Omega-3 Fish Oil Capsules",
        quantity: 1,
        price: 599,
        image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop",
        product: "4"
      }
    ],
    orderStatus: "Delivered",
    createdAt: "2024-01-18T16:45:00.000Z",
    deliveredAt: "2024-01-22T11:30:00.000Z"
  }
];

// Mock user data
export const mockUser = {
  _id: "USER001",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@medicalstore.com",
  gender: "female",
  role: "customer",
  avatar: {
    url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  },
  createdAt: "2024-01-10T08:30:00.000Z"
};
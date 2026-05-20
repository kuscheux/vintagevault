export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  era: string;
  condition: string;
  dimensions?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  // -- Furniture --
  {
    id: "1",
    name: "Victorian Carved Dresser",
    price: 1250,
    category: "Furniture",
    image: "/images/product-dresser.jpg",
    images: ["/images/product-dresser.jpg"],
    description:
      "A stunning Victorian-era dresser with hand-carved floral details, original brass hardware, and a rich mahogany finish. Three spacious drawers with dovetail joints. The warm patina speaks to its well-cared-for history.",
    era: "1880s",
    condition: "Excellent",
    dimensions: '48"W x 22"D x 36"H',
    isFeatured: true,
  },
  {
    id: "5",
    name: "Tufted Leather Club Chair",
    price: 1875,
    category: "Furniture",
    image: "/images/product-chair.jpg",
    images: ["/images/product-chair.jpg"],
    description:
      "A classic leather club chair with deep button tufting and rolled arms. The rich brown leather has developed a beautiful patina over decades. Supremely comfortable with firm cushioning and sturdy hardwood frame.",
    era: "1940s",
    condition: "Very Good",
    dimensions: '34"W x 36"D x 32"H',
    isFeatured: true,
  },
  {
    id: "11",
    name: "Mid-Century Coffee Table",
    price: 750,
    category: "Furniture",
    image: "/images/product-table.jpg",
    images: ["/images/product-table.jpg"],
    description:
      "A beautiful mid-century modern coffee table with tapered legs and clean lines. The warm walnut finish has been lovingly maintained. A timeless piece that anchors any living room with effortless style.",
    era: "1960s",
    condition: "Excellent",
    dimensions: '48"W x 24"D x 16"H',
    isFeatured: true,
  },

  // -- Clothing --
  {
    id: "13",
    name: "1970s Leather Bomber Jacket",
    price: 285,
    category: "Clothing",
    image: "/images/product-jacket.jpg",
    images: ["/images/product-jacket.jpg"],
    description:
      "A beautifully aged 1970s brown leather bomber jacket with a rich, worn-in patina. Features a zip front, snap collar, and ribbed cuffs. The kind of jacket that gets better with every wear.",
    era: "1970s",
    condition: "Very Good",
    dimensions: "Men's M/L",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "14",
    name: "Floral Print A-Line Dress",
    price: 145,
    category: "Clothing",
    image: "/images/product-dress.jpg",
    images: ["/images/product-dress.jpg"],
    description:
      "A gorgeous 1960s floral print A-line dress in muted earthy tones. Flattering silhouette with a defined waist and full skirt. A true vintage gem perfect for any occasion.",
    era: "1960s",
    condition: "Excellent",
    dimensions: "Women's S/M",
    isNew: true,
  },

  // -- Housewares --
  {
    id: "6",
    name: "Silver Victorian Tea Set",
    price: 650,
    category: "Housewares",
    image: "/images/product-teaset.jpg",
    images: ["/images/product-teaset.jpg"],
    description:
      "A complete silver-plated tea service including teapot, sugar bowl, creamer, and serving tray. Features intricate engraved floral patterns throughout. A true conversation piece for entertaining or display.",
    era: "1870s",
    condition: "Excellent",
    isNew: true,
  },
  {
    id: "15",
    name: "Copper Tea Kettle",
    price: 120,
    category: "Housewares",
    image: "/images/product-kettle.jpg",
    images: ["/images/product-kettle.jpg"],
    description:
      "A charming vintage copper tea kettle with a wooden handle and beautiful aged patina. Fully functional and ready for daily use or as a stunning kitchen display piece.",
    era: "1940s",
    condition: "Good",
    dimensions: '8" diameter x 10"H',
  },
  {
    id: "16",
    name: "Hand-Painted Dinner Plates",
    price: 195,
    originalPrice: 240,
    category: "Housewares",
    image: "/images/product-plates.jpg",
    images: ["/images/product-plates.jpg"],
    description:
      "A set of six vintage hand-painted dinner plates with delicate floral patterns in blue, white, and gold trim. Perfect for elegant entertaining or as a curated wall display.",
    era: "1920s",
    condition: "Very Good",
    dimensions: '10.5" diameter',
    isFeatured: true,
  },
  {
    id: "7",
    name: "Hand-Painted Ceramic Bowl",
    price: 95,
    category: "Housewares",
    image: "/images/product-bowl.jpg",
    images: ["/images/product-bowl.jpg"],
    description:
      "A delicate hand-painted ceramic bowl with blue and white floral motifs. The crackle glaze finish speaks to its age and authenticity. Perfect for display or daily use.",
    era: "1950s",
    condition: "Good",
    dimensions: '10" diameter x 4"H',
  },

  // -- Decor --
  {
    id: "2",
    name: "Artisan Ceramic Vases",
    price: 185,
    category: "Decor",
    image: "/images/product-vases.jpg",
    images: ["/images/product-vases.jpg"],
    description:
      "A curated set of three hand-thrown ceramic vases in warm earth tones. Each piece features unique glazing patterns and organic forms. Mid-century pieces from the artisan pottery movement.",
    era: "1960s",
    condition: "Very Good",
    dimensions: 'Tallest: 12"H',
    isNew: true,
  },
  {
    id: "4",
    name: "Gilded Baroque Frame",
    price: 340,
    originalPrice: 420,
    category: "Decor",
    image: "/images/product-frame.jpg",
    images: ["/images/product-frame.jpg"],
    description:
      "An ornate gilded picture frame with baroque scrollwork and genuine gold leaf finish. The aged patina adds character and warmth. Fits a 16x20 canvas or print.",
    era: "1890s",
    condition: "Good",
    dimensions: '24"W x 28"H (outer)',
  },
  {
    id: "9",
    name: "Gilded Standing Mirror",
    price: 980,
    originalPrice: 1200,
    category: "Decor",
    image: "/images/product-mirror.jpg",
    images: ["/images/product-mirror.jpg"],
    description:
      "A full-length standing mirror with an ornate gilded wooden frame. The aged patina and hand-carved details make this a stunning decorative piece for a bedroom or entryway.",
    era: "1900s",
    condition: "Very Good",
    dimensions: '28"W x 68"H',
    isNew: true,
  },
  {
    id: "8",
    name: "Pendulum Wall Clock",
    price: 575,
    category: "Decor",
    image: "/images/product-clock.jpg",
    images: ["/images/product-clock.jpg"],
    description:
      "A handsome oak wall clock with Roman numerals and a working pendulum mechanism. The carved wood frame shows beautiful grain detail. Keeps accurate time after professional servicing.",
    era: "1910s",
    condition: "Restored",
    dimensions: '16"W x 24"H',
    isFeatured: true,
  },
  {
    id: "10",
    name: "Leather-Bound Book Collection",
    price: 320,
    category: "Decor",
    image: "/images/product-books.jpg",
    images: ["/images/product-books.jpg"],
    description:
      "A curated collection of six leather-bound books with gold-embossed spines. Titles range from classic literature to historical accounts. Beautiful as shelf decor or a thoughtful gift.",
    era: "1920s-1950s",
    condition: "Good",
  },

  // -- Lighting --
  {
    id: "3",
    name: "Brass Pendant Light",
    price: 425,
    category: "Lighting",
    image: "/images/product-light.jpg",
    images: ["/images/product-light.jpg"],
    description:
      "An elegant brass and glass pendant light with warm amber tones. Rewired for modern use while preserving its original antique charm. Perfect as a statement piece over a dining table.",
    era: "1920s",
    condition: "Restored",
    dimensions: '14" diameter x 18"H',
    isFeatured: true,
  },
  {
    id: "12",
    name: "Art Deco Table Lamp",
    price: 385,
    category: "Lighting",
    image: "/images/product-lamp.jpg",
    images: ["/images/product-lamp.jpg"],
    description:
      "A vintage Art Deco table lamp with a stained glass shade in amber and green tones. The ornate bronze base features geometric motifs typical of the era. Rewired for safe modern use.",
    era: "1930s",
    condition: "Restored",
    dimensions: '12" diameter x 20"H',
    isNew: true,
  },
];

export const categories = [
  {
    name: "Furniture",
    slug: "furniture",
    image: "/images/category-furniture.jpg",
    description: "Dressers, chairs, tables & more",
    count: products.filter((p) => p.category === "Furniture").length,
  },
  {
    name: "Clothing",
    slug: "clothing",
    image: "/images/category-clothing.jpg",
    description: "Vintage dresses, jackets & accessories",
    count: products.filter((p) => p.category === "Clothing").length,
  },
  {
    name: "Housewares",
    slug: "housewares",
    image: "/images/category-housewares.jpg",
    description: "Tea sets, dinnerware & kitchen treasures",
    count: products.filter((p) => p.category === "Housewares").length,
  },
  {
    name: "Decor",
    slug: "decor",
    image: "/images/category-decor.jpg",
    description: "Mirrors, vases, clocks & curiosities",
    count: products.filter((p) => p.category === "Decor").length,
  },
  {
    name: "Lighting",
    slug: "lighting",
    image: "/images/category-lighting.jpg",
    description: "Lamps, pendants & chandeliers",
    count: products.filter((p) => p.category === "Lighting").length,
  },
];

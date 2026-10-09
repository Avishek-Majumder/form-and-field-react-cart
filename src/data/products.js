const image = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`;

export const categories = ['All objects', 'Furniture', 'Lighting', 'Decor', 'Textiles'];

// Prices are integer cents so cart arithmetic never accumulates floating-point errors.
export const products = [
  {
    id: 'arc-chair',
    name: 'Linen Accent Chair',
    category: 'Furniture',
    material: 'Linen-look upholstery · Painted wood',
    price: 18900,
    image: image('chair'),
    alt: 'Cream tufted accent chair with painted wooden legs',
    badge: 'Bestseller',
    color: '#b5b1a7',
    dimensions: '73 × 68 × 80 cm',
    description:
      'A quiet corner, a good book, a little time to yourself. With a tufted seat and turned wooden legs, this accent chair brings a softer shape to everyday living.',
    care: 'Vacuum gently with an upholstery attachment. Blot spills with a clean, dry cloth.',
  },
  {
    id: 'studio-lamp',
    name: 'Studio Table Lamp',
    category: 'Lighting',
    material: 'Metal · Warm white light',
    price: 7800,
    image: image('lamp'),
    alt: 'Minimal table lamp in a softly lit interior',
    badge: 'New arrival',
    color: '#dbd3c4',
    dimensions: '30 × 30 × 46 cm',
    description:
      'Light where you need it, warmth where you want it. An understated table lamp that turns a bedside, desk, or reading corner into your favorite place.',
    care: 'Unplug before cleaning. Dust with a soft, dry cloth. LED bulb recommended.',
  },
  {
    id: 'still-plates',
    name: 'Still Ceramic Plates',
    category: 'Decor',
    material: 'Glazed ceramic · Set of four',
    price: 3600,
    image: image('vase'),
    alt: 'Stack of blue glazed ceramic plates on a wooden table',
    badge: '',
    color: '#94a9b7',
    dimensions: 'Ø 24 cm · Set of four',
    description:
      'A slower breakfast, a shared supper. Four softly glazed plates that bring a little color and a sense of occasion to the everyday table.',
    care: 'Hand-wash with mild soap. Avoid sudden temperature changes.',
  },
  {
    id: 'sunday-table',
    name: 'Sunday Side Table',
    category: 'Furniture',
    material: 'Painted wood · Natural legs',
    price: 8900,
    image: image('table'),
    alt: 'Round white side table with wooden legs beside a bed',
    badge: '',
    color: '#e4e0d9',
    dimensions: 'Ø 48 × 55 cm',
    description:
      'For your morning coffee, a bedside book, or a favorite little object. A round tabletop and warm wooden legs make an easy companion for everyday moments.',
    care: 'Use coasters. Wipe with a slightly damp cloth and dry immediately.',
  },
  {
    id: 'woven-rug',
    name: 'Woven Ground Rug',
    category: 'Textiles',
    material: 'Woven fibers · Earth tones',
    price: 12900,
    image: image('rug'),
    alt: 'Textured area rug with a warm woven pattern',
    badge: 'The everyday edit',
    color: '#b99979',
    dimensions: '160 × 230 cm',
    description:
      'The piece that brings a room together. A warm, tactile weave with a relaxed pattern, adding a little comfort to the everyday rhythm of your home.',
    care: 'Vacuum without a beater bar. Rotate occasionally and spot-clean with mild soap.',
  },
  {
    id: 'form-chair',
    name: 'Form Dining Chair',
    category: 'Furniture',
    material: 'Wood · Natural grain',
    price: 11900,
    image: image('cabinet'),
    alt: 'Dark wooden spindle-back dining chair against a charcoal wall',
    badge: '',
    color: '#55534e',
    dimensions: '45 × 48 × 82 cm',
    description:
      'Pull up a chair. A familiar spindle-back silhouette in a deep wood finish brings a little character to long dinners and everyday conversations.',
    care: 'Dust with a soft cloth. Avoid direct heat and prolonged exposure to sunlight.',
  },
  {
    id: 'moss-sofa',
    name: 'Moss Two-Seat Sofa',
    category: 'Furniture',
    material: 'Woven upholstery · Timber frame',
    price: 64900,
    image: image('sofa'),
    alt: 'Green upholstered sofa with clean modern lines',
    badge: 'Bestseller',
    color: '#758575',
    dimensions: '180 × 86 × 80 cm',
    description:
      'Stay a little longer. Generous cushions, a grounded silhouette, and a nature-inspired palette make Moss a welcoming center for your living space.',
    care: 'Vacuum weekly and rotate loose cushions. Professional upholstery cleaning recommended.',
  },
  {
    id: 'halo-pendant',
    name: 'Halo Pendant Light',
    category: 'Lighting',
    material: 'Sculptural shade · Soft glow',
    price: 9600,
    image: image('pendant'),
    alt: 'Decorative pendant light casting a soft ambient glow',
    badge: '',
    color: '#d8c29b',
    dimensions: '40 × 40 × 35 cm',
    description:
      'A little atmosphere, from above. A sculptural pendant that creates a gentle focal point over your dining table or in an inviting entryway.',
    care: 'Switch off before dusting. Installation by a qualified electrician recommended.',
  },
];

export const productById = Object.fromEntries(products.map((product) => [product.id, product]));
export const formatPrice = (cents) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(cents / 100);

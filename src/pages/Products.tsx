import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import bg2 from '@/assets/images/bg2.png';
import { useSearchParams } from 'react-router-dom';
// code-split heavy UI pieces
const ProductCard = lazy(() => import('@/components/ProductCard'));
const QuickPurchaseModal = lazy(() => import('@/components/QuickPurchaseModal'));
import LazyImage from '@/components/LazyImage';
import { Product as BaseProduct, ProductCategory } from '@/lib/types';

type Product = BaseProduct & { 
  formattedPrice: string;
  ingredients?: string[];
  stock: number;
};
import { GridIcon, ListIcon } from 'lucide-react';

// Format price with ₹ symbol
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Enhanced mock products data with professional Egyptian-inspired items
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Granola',
    category: 'food' as ProductCategory,
    description: 'Fuel your day with our handcrafted Granola, a delicious and nutritious mix of roasted nuts, seeds, oats, and natural jaggery—lightly toasted in pure cold-pressed coconut oil. ',
    price: 195, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/granola.webp',
    rating: 4.9,
    featured: true,
    stock: 15,
    ingredients: ['Rolled Oats', 'Almonds', 'Flax Seeds', 'Sunflower Seeds','Pumpkin Seeds','Cold-Pressed Coconut Oil','Jaggery'],
    benefits: ['Heart-Healthy Ingredients ', 'Natural Sweetener', 'Fiber-Rich Oats','Protein-Packed','Immunity Boosting','Weight-Friendly'],
   },
  {
    id: '2',
    name: 'Sprouted Ragi Powder',
    category: 'food' as ProductCategory,
    description: 'Sprouted Ragi Powder – Naturally Nutritious & Wholesome Carefully prepared from 100% whole ragi grains, our Sprouted Ragi Powder is a powerhouse of nutrition. The grains are traditionally sprouted to enhance bioavailability, gently dried, and finely milled to preserve their natural goodness. Rich in calcium, iron, and dietary fiber, sprouted ragi supports strong bones, aids digestion, and helps maintain healthy blood sugar levels.',
    price: 80, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Sprouted Ragi/Sprouted Ragi 500gm.webp',
    rating: 5.0,
    featured: true,
    stock: 8,
     ingredients: ['100% Sprouted Ragi (Finger Millet)','Salt'],
    benefits: ['Bone Strength', 'Improved Digestion', 'Diabetic-Friendly','Weight Management','Rich in Iron','Gluten-Free','Plant-Based Protein'],
   
  },
  {
    id: '14',
    name: 'Natural Herbal Eye Shadow',
    category: 'skincare' as ProductCategory,
    description: 'Enhance your eyes with the gentle power of nature. Our 100% Natural Eye Shadow',
    price: 400, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Natural Herbal Eye Shadow.webp',
    rating: 4.7,
    featured: false,
    stock: 12,
     ingredients: ['Arrowroot Powder ', 'Manjistha Powder','Charcoal Powder','Liquorice Powder'],
    benefits: ['Gentle on Skin', 'Natural Tint & Soft Texture', 'Detoxifying & Healing','Anti-Aging Properties','Chemical-Free Beauty '],
    
  },
  {
    id: '23',
    name: 'Lip Scrub',
    category: 'skincare' as ProductCategory,
    description: 'Give your lips the care they deserve with our 100% Natural Lip Scrub, thoughtfully crafted with mango butter, sugar, almond oil, and lavender oil. This luxurious scrub gently buffs away dead skin cells while deeply moisturizing your lips, leaving them soft, smooth, and naturally radiant.Perfect as a pre-lip care routine or before applying lip tint or lipstick for a flawless finish.',
    price: 260, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Lip Scrub.webp',
    rating: 4.8,
    featured: true,
    stock: 5,
    ingredients: ['Mango Butter', 'Sugar','Almond Oil','Lavender Oil'],
    benefits: ['Exfoliates Dead Skin', 'Deeply Moisturizing', 'Soothing Aroma','Smooth Base for Lipstick']
  },
  {
    id: '3',
    name: 'Kambu Puttu Mix',
    category: 'food' as ProductCategory,
    description: 'Rekindle the flavors of your grandmother’s kitchen with our Kambu Puttu Mix, made from premium pearl millet (kambu) blended with a touch of cardamom and natural salt. This wholesome puttu mix is stone-ground and prepared in small batches to retain its natural aroma, fiber, and nutritional richness.',
    price: 110, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Kambu Puttu Mix.webp',
    rating: 4.9,
    featured: true,
    stock: 10,
    ingredients: ['Pearl Millet (Kambu)', 'Cardamom', 'Salt'],
    benefits: ['High in Iron & Calcium ', 'Gut-Friendly Grain', 'Helps Control Diabetes','Heart Health Support','Naturally Gluten-Free','Light & Cooling']
  },
  {
    id: '4',
    name: 'Karupu kauvini kanji mix',
    category: 'food' as ProductCategory,
    description: 'Cherished by Tamil royalty and once known as the “Forbidden Rice,” Karuppu Kavuni (Black Rice) is a rare and powerful grain packed with nutrients and antioxidants. Our Karuppu Kavuni Kanji Mix is made from handpicked black rice, carefully cleaned, slow-roasted, and stone-ground to retain its rich color, nutty aroma, and nutritional integrity.',
    price: 135, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Karupu/Karupu kauvini kanji mix 500gm.webp',
    rating: 4.5,
    featured: false,
    stock: 20,
      ingredients: ['Karuppu Kavuni Rice (Black Rice)', 'Sivapu Kauvini Rice (Red Rice) ', 'poongar arisi', 'katuyanam','karunkuruvi arisi','mapalai samba'],
    benefits: ['Rich in Antioxidants ', 'Supports Heart Health', 'Diabetic-Friendly','Improves Digestion','Iron-Rich','Weight Management ','Gluten-Free']
  },
  {
    id: '15',
    name: 'Ceramide Moisturizer',
    category: 'skincare' as ProductCategory,
    description: 'EOur Ceramide Moisturizer is expertly formulated with ceramides, shea butter, and skin-loving emulsifiers to restore your skin natural barrier.',
    price: 320, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Ceramide Moisturizer.webp',
    rating: 4.6,
    featured: true,
    stock: 7,
    ingredients: ['Ceramide', 'Cetyl Alcohol','Stearic Acid','Aqua','Emulsifying Wax','Shea Butter','Propylene Glycol'],
    benefits: ['Rebuilds Skin Barrier – Restores moisture and smoothness', 'Calms Sensitivity – Reduces irritation and inflammation', 'Rich but Lightweight – Hydrates without clogging pores','Dermatologist-Recommended Actives ']
  },
  {
    id: '16',
    name: 'Herbal Hair Oil',
    category: 'skincare' as ProductCategory,
    description: 'Each bottle is infused with coconut oil, sesame oil, almond oil,olive oil, and a powerful combination of traditional herbs like amla, neem, hibiscus, curry leaves, aloe vera, and more—steeped slowly to extract their full benefits.This potent oil helps control hair fall, moisturize the scalp, and reduce body heat,',
    price: 350, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Herbal Hair Oil.webp',
    rating: 4.8,
    featured: true,
    stock: 9,
     ingredients: ['Carrier Oils:Coconut Oil,Sesame Oil, Almond Oil,Olive Oil', 'Herbs:Amla, Neem, Curry Leaves, Aloe Vera, Henna, Avarampoo, Moringa Leaves, Karunjeeragam, Hibiscus, Rose Petals','Essentials:Lavender Oil, Tea Tree Oil'],
    benefits: ['Prevents Hair Fall', 'Deep Scalp Moisturization', 'Reduces Body Heat','Promotes Hair Growth','Chemical-Free & Natural']
  },
  {
    id: '9',
    name: 'Ragi Choco Pancake Mix',
    category: 'food' as ProductCategory,
    description: 'Turn breakfast into a delicious treat with nutrition-packed pancakes.Ragi Choco Pancake – Where taste meets health in every bite.',
    price: 185, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Ragi Choco Pancake/Ragi Choco Pancake Mix 250gm.webp',
    rating: 4.8,
    featured: true,
    stock: 9,
    ingredients: ['Ragi (Finger Millet)', 'Peanut', 'Flax Seed','Jaggery','Cocoa Powder','Baking Powder','Baking Soda','Salt'],
    benefits: ['Rich in Calcium & Iron ', 'Brain-Boosting Cocoa ', 'Omega-3 from Flax Seeds','Good Fats & Protein','No Refined Sugar','Kid-Friendly & Tasty ']
  },
  {
    id: '10',
    name: 'Butterfly Lemongrass Tea',
    category: 'food' as ProductCategory,
    description: ' Add a few drops of lemon, and watch the tea magically turn purple—an herbal experience thats as delightful to see as it is to sip!',
    price: 180, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Butterfly Lemongrass Tea.webp',
    rating: 4.8,
    featured: true,
    stock: 9,
     ingredients: ['Dried Butterfly Pea Flowers', 'Dried Lemongrass'],
    benefits: ['Rich in Antioxidants', 'Calming & Stress-Relieving ', 'Aids Digestion','Natural Detox','Good for Eyes & Hair','Caffeine-Free']
  },
  {
    id: '13',
    name: 'Eye Kajol',
    category: 'skincare' as ProductCategory,
    description: 'Made using time-honored ayurvedic ingredients like almond dust, castor oil, beeswax, and ghee, our Eye Kajol is a 100% natural and chemical-free formula designed to soothe, protect, and enhance your eyes.',
    price: 160, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Eye Kajol.webp',
    rating: 4.8,
    featured: true,
    stock: 9,   ingredients: ['Almond Dust', 'Castor Oil','Beeswax','Ghee'],
    benefits: ['Cools and Soothes Eyes', 'Promotes Eyelash Growth ', 'No Irritation or Chemicals','Traditional & Herbal ','Deep Black Finish']
  },
  {
    id: '17',
    name: ' Anti-Dandruff Hair Oil',
    category: 'skincare' as ProductCategory,
    description: 'Free from harmful chemicals and safe for all hair types, including sensitive scalps.',
    price: 280, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Anti-Dandruff Hair Oil.webp',
    rating: 4.8,
    featured: true,
    stock: 9, ingredients: ['Carrier Oils:Coconut Oil,Sesame Oil', 'Herbs: Amla, Neem, Curry Leaves, Aloe Vera, Henna, Avarampoo, Moringa Leaves, Karunjeeragam, Hibiscus, Rose Petals','Special Additive: Neem Oil for anti-fungal and antibacterial protection'],
    benefits: ['Fights Dandruff Naturally', 'Soothes and Cools the Scalp', 'Reduces Hair Fall','Moisturizes Dry Scalp','100% Herbal & Chemical-Free']
  },
  {
    id: '5',
    name: 'Millet waffle mix',
    category: 'food' as ProductCategory,
    description: 'mix, pour, and cook in your waffle maker—or even in a dosa pan for thin, crispy treats!Just.',
    price: 210, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Millet waffle/Millet waffle mix 250gm.webp',
    rating: 4.8,
    featured: true,
    stock: 9,
   ingredients: ['Wheat Flour', 'Millet Flour', 'Rice Flour','Salt','Jaggery'],
    benefits: ['Rich in Fiber & Nutrients', 'Natural Sweetness ', 'Sustained Energy','Good for Kids & Adults','No Chemicals or Preservatives ','Versatile & Delicious'] },
  {
    id: '6',
    name: 'Sola Paniyaram',
    category: 'food' as ProductCategory,
    description: 'Perfect for soft, fluffy paniyaram with a slightly nutty and earthy flavor—enjoy it with chutney or sambar for a comforting and filling meal.',
    price: 145, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Sola Paniyaram/Sola Paniyaram 250gm.webp',
     rating: 4.8,
    featured: true,
    stock: 9,
     ingredients: ['Sivapu solam', ' Vellai solam', 'Urad dal','Fenugreek seeds'],
    benefits: ['Gluten-Free Grain', 'Supports Digestion', 'High in Fiber','Iron & Protein Boost','Heart-Friendly','Diabetic-Friendly']
  },
  {
    id: '18',
    name: 'Herbal Hair Butter',
    category: 'skincare' as ProductCategory,
    description: 'perfect leave-in for dry, curly, or damaged hair and an excellent alternative to chemical-based styling gels or serums.',
    price: 330, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Herbal Hair Butter.webp',
    rating: 4.8,
    featured: true,
    stock: 9,ingredients: ['Cocoa Butter', 'Flax Seed Extract ','Almond Oil','Propylene Glycol (plant-based)- (used in minimal safe quantity)'],
    benefits: ['Deep Conditioning', 'Natural Styling Aid', 'Reduces Frizz & Split Ends','Lightweight & Non-Greasy','100% Herbal & Chemical-Free']
  },
  {
     id: '20',
    name: 'Foot Scrub',
    category: 'skincare' as ProductCategory,
    description: 'Ideal for regular use, it leaves your feet feeling refreshed, smooth, and beautifully cared for.',
    price: 240, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Foot Scrub.webp',
    rating: 4.8,
    featured: true,
    stock: 9,
    
    ingredients: ['Shea Butter', 'Coconut Oil','Walnut Powder','Eucalyptus Oil','Sea Salt'],
    benefits: ['Gentle Exfoliation', 'Deep Moisturization', 'Soothing & Refreshing','Natural & Chemical-Free','Improves Skin Texture']
  },
     { id: '7',
    name: 'Millet Payiru Adai',
    category: 'food' as ProductCategory,
    description: 'Ideal for breakfast, brunch, or dinner—just mix with water and cook like a dosa or thick pancake. Serve hot with chutney or butter.',
    price: 160, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Millet payiru/Millet Payiru Adai 250gm.webp',
    rating: 4.8,
    featured: true,
    stock: 9, ingredients: ['Green Gram', 'Moong Dal', 'Chana Dal','Toor Dal','Red Chilli','Garlic','Ginger','Asafoetida','Varagu (Kodo Millet)', 'Thinai (Foxtail Millet)', 'Kuthiraivali (Barnyard Millet)'],
    benefits: ['Rich in Plant-Based Protein', 'Millet Powered', 'Good for Digestion','Diabetic-Friendly','Weight Management','Balanced Spice ']
  },
     { id: '8',
    name: 'Kollu idly podi',
    category: 'food' as ProductCategory,
    description: 'Kollu idly ready mix is stone-ground in small batches, free from preservatives, and perfect for soft, fluffy idlies that are light on the stomach and rich in nutrients. Just mix, ferment, and steam',
    price: 145, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Kollu idly/Kollu idly 250gm.webp',
    rating: 4.8,
    featured: true,
    stock: 9,
      ingredients: ['Horse Gram', 'Urad Dal', 'Fenugreek Seeds'],
    benefits: ['Boosts Metabolism', 'Supports Weight Loss', 'Rich in Iron & Protein','Heart-Healthy','Diabetic-Friendly','Improves Gut Health']
  },
   { id: '19',
    name: 'Natural Hair Colour Powder',
    category: 'skincare' as ProductCategory,
    description: 'Kollu idly ready mix is stone-ground in small batches, free from preservatives, and perfect for soft, fluffy idlies that are light on the stomach and rich in nutrients. Just mix, ferment, and steam',
    price: 250, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Natural Hair Colour Powder.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
    ingredients: ['Henna Powder', 'Kadukkai (Haritaki)','Karisilai (False Daisy)','Neem Leaves'],
    benefits: ['Natural Color Enhancement', 'Scalp Nourishment', 'Strengthens Hair Roots','No Harsh Chemicals','Cooling & Detoxifying']
  },
   { id: '11',
    name: 'Rose Herbal Tea',
    category: 'food' as ProductCategory,
    description: 'Sip serenity with our Rose Herbal Tea, a delicate fusion of dried rose petals, hibiscus, cloves, cinnamon, and cardamom—all known for their calming, antioxidant-rich properties. This naturally caffeine-free blend is perfect for reducing stress, supporting digestion, and promoting radiant skin from within.Crafted in small batches with no preservatives or additives, this herbal tea is a gentle, aromatic companion to your wellness rituals—morning or night.',
    price: 150, // Direct INR price
    
  image: '/src/assets/images/Nurmaa product image/Rose Herbal Tea.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
     ingredients: ['Dried Rose Petals', 'Hibiscus','Cloves','Cinnamon','Cardamom'],
    benefits: ['Promotes Glowing Skin –', 'Reduces Stress & Anxiety', 'Supports Digestion ','Boosts Immunity','Hormonal Balance','Caffeine-Free']
  },
   { id: '12',
    name: 'Panakatti Kappai',
    category: 'food' as ProductCategory,
    description: 'Rooted in age-old Ayurvedic wisdom, Panakatti Kappai is a powerful home remedy made with just three potent ingredients: Panakatti (Palm Jaggery), Dry Ginger, and Cardamom. This traditional blend is known for its effectiveness in relieving cold, sore throat, and indigestion naturally—without chemicals or side effects.Perfect for all age groups, this herbal preparation can be crushed and added to warm water, tea, or simply chewed in small amounts for instant relief and warmth.',
    price: 140, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Panakatti Kappai.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
    ingredients: ['Palm Jaggery (Panakatti)', 'Dry Ginger','Cardamom'],
    benefits: ['Natural Cough Suppressant', 'Boosts Immunity', 'Supports Digestion','Iron-Rich Sweetener','Warming Effect','Chemical-Free Relief']
  },
   { id: '22',
    name: 'Foot Cream',
    category: 'skincare' as ProductCategory,
    description: 'Perfect for daily use, it nourishes tired feet, reduces roughness, and restores softness—leaving your skin smooth, hydrated, and revitalized.',
    price: 260, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Foot Cream.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
  
    ingredients: ['Shea Butter', 'Coconut Oil ','Peppermint Oil','Eucalyptus Oil','Sunflower Oil'],
    benefits: ['Deep Moisturization', 'Soothes & Heals Cracks', 'Refreshing & Cooling ','100% Natural & Chemical-Free']
  },
   { id: '24',
    name: 'Lip Balm',
    category: 'skincare' as ProductCategory,
    description: 'seals in moisture and keeps your lips soft all day long.Perfect for dry, chapped, or sensitive lips—ideal for all weather conditions.',
    price: 180, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Lip Balm.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
   
    ingredients: ['Mango Butter', 'Cocoa Butter','Almond Oil','Red Mica','Beeswax'],
    benefits: ['Intensive Moisture', 'Natural Tint', 'Heals & Prevents Chapping','Non-Sticky Finish','Safe & Natural ']
  },
   { id: '25',
    name: 'Body Butter',
    category: 'skincare' as ProductCategory,
    description: 'Creamy moisturizer melts into the skin, delivering long-lasting hydration and leaving your body soft, supple, and glowing.',
    price: 320, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Body Butter.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
    
    ingredients: ['Mango Butter', 'Cocoa Butter','Almond Oil','Cetyl Alcohol','Stearic Acid','Propylene Glycol'],
    benefits: ['Locks in Moisture', 'Softens Skin', 'Smooth, Non-Greasy Texture','Soothes Dry Patches','Naturally Nourishing']
  },
   { id: '26',
    name: 'Kumkumadi Day Cream',
    category: 'skincare' as ProductCategory,
    description: 'Experience the ancient wisdom of Ayurveda with our Kumkumadi Day Cream, enriched with kojic powder and ascorbic acid (Vitamin C).',
    price: 350, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Kumkumadi Day Cream.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
   ingredients: ['Kojic Powder', ' Ascorbic Acid (Vitamin C)','Herbal Extract Base'],
    benefits: ['Brightens Complexion', 'Improves Skin Texture', 'Rich in Antioxidants','Lightweight Formula','Ayurvedic & Dermatologically Trusted']
  },
    { id: '27',
    name: 'Herbal Face Wash',
    category: 'skincare' as ProductCategory,
    description: 'Cleanse your face gently with our Herbal Face Wash, made with natural surfactant cocoglucoside, soothing turmeric, and brightening ascorbic powder.',
    price: 280, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Herbal Face Wash.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
   ingredients: ['Cocoglucoside,', 'Aqua (Water)','Turmeric Extract','Ascorbic Powder','Propylene Glycol'],
    benefits: ['Gentle Cleansing', 'Retains Natural Moisture', 'Brightens Skin','Free from Sulfates & Harsh Chemicals','Daily Use Formula']
  },
   { id: '21',
    name: 'Foot Salt',
    category: 'skincare' as ProductCategory,
    description: 'Pamper your feet with our 100% Natural Foot Salt, a rejuvenating blend designed to soothe tired, cracked skin while gently exfoliating dead cells.',
    price: 180, // Direct INR price
  image: '/src/assets/images/Nurmaa product image/Foot Salt.webp',
    rating: 4.8,
    featured: true,
    stock: 9, 
    ingredients: ['Himalayan Salt', 'Epsom Salt','Rosemary Herb','Dried Orange Peel','Lavender Oil'],
    benefits: ['Heals Cracked Skin', 'Exfoliates Dead Cells', 'Soothes & Relaxes Muscles','Refreshing Aromatherapy','100% Natural & Chemical-Free']
  }
].map(product => ({
  ...product,
  formattedPrice: formatPrice(product.price)
}));

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  // filteredProducts is computed (memoized) to avoid extra renders/state updates
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const debounceRef = useRef<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<string>('');
  // Price range as a progress bar (slider)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const minPrice = 0;
  const maxPrice = 1000;
  const step = 50;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // keep URL-driven category in sync (only set once when param changes)
  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory | null;
    if (category) setActiveCategory(category);
  }, [searchParams]);

  // debounce the free-text search to avoid re-filtering while user types
  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    // 300ms debounce
    debounceRef.current = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  // compute filteredProducts with useMemo to avoid intermediate state and extra renders
  const filteredProducts = useMemo(() => {
    const category = searchParams.get('category') as ProductCategory | null;
    const featured = searchParams.get('featured') === 'true';
    let filtered = [...allProducts];
    filtered = filtered.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesFeatured = !featured || product.featured;
      const max = Math.min(priceRange[1], maxPrice);
      const matchesPrice = product.price >= priceRange[0] && product.price <= max;
      const q = debouncedSearchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesFeatured && matchesPrice && matchesSearch;
    });

    if (sortOption === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  }, [searchParams, activeCategory, sortOption, priceRange, debouncedSearchQuery]);
  
  // Interactive elements
  const handleQuickPurchase = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setPriceRange([minPrice, maxPrice]);
    setSearchQuery('');
    setSortOption('');
  };

  // Categories with symbols
  const categories = [
    { id: 'all', name: 'All Products', symbol: '𓃭' },
    { id: 'skincare', name: 'Skincare', symbol: '𓍯' },
    { id: 'food', name: 'Food & Herbs', symbol: '𓇬' },
    // { id: 'wellness', name: 'Wellness', symbol: '𓂀' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9f0]">
      {/* Hero Section - Improved Responsiveness */}
      <div
        className="flex items-center pt-32 pb-8 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24 relative text-white bg-cover bg-center"
        style={{
          // smaller image size + lower quality to reduce payload — use local asset
            backgroundImage: `linear-gradient(rgba(18, 23, 105, 0.85), rgba(103, 36, 106, 0.85)), url(${bg2})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 font-serif text-[#FE49AF] drop-shadow-lg">
            Ancient Egyptian Treasures
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-[#EBEBD3] px-2 sm:px-4">
            Discover authentic products inspired by the beauty secrets and sacred rituals of ancient Egypt.
          </p>
          
          {/* Responsive Search Bar */}
          <div className="mt-4 sm:mt-8 max-w-md mx-auto px-4 sm:px-0 w-full">
            <input
              type="text"
              placeholder="Search sacred products..."
              className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-full text-[#121769] text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content - Improved Layout */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Filters Sidebar - Mobile Friendly */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-[#EBEBD3] mb-6 lg:mb-0 lg:sticky lg:top-4">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden p-4 border-b border-[#EBEBD3]">
                <button
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                  className="w-full flex items-center justify-between text-[#121769] font-medium"
                >
                  <span>Filters</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Filters Content */}
              <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block p-4 sm:p-6 space-y-6`}>
                {/* Categories */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-[#121769]">Categories</h3>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as ProductCategory | 'all')}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg text-sm sm:text-base ${
                        activeCategory === cat.id 
                          ? 'bg-[#67246A] text-white' 
                          : 'text-[#121769] hover:bg-[#EBEBD3]'
                      }`}
                    >
                      <span className="mr-2">{cat.symbol}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Price Range - Progress Bar (Slider) */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-[#121769]">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      step={step}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([minPrice, Number(e.target.value)])}
                      className="w-full accent-[#FE49AF]"
                    />
                    <div className="flex justify-between text-sm text-[#121769] mt-2">
                      <span>₹{minPrice}</span>
                     
                      <span>₹{maxPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List - Responsive */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#121769] p-4 rounded-lg shadow-lg mb-6">
              <p className="text-[#EBEBD3] text-sm sm:text-base">
                Showing <span className="font-bold text-[#FE49AF]">{filteredProducts.length}</span> products
              </p>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActiveView('grid')}
                  className={`p-2 rounded ${activeView === 'grid' ? 'bg-[#FE49AF]' : 'bg-[#EBEBD3]'}`}
                >
                  <GridIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveView('list')}
                  className={`p-2 rounded ${activeView === 'list' ? 'bg-[#FE49AF]' : 'bg-[#EBEBD3]'}`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={
              activeView === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                : 'flex flex-col gap-4 sm:gap-6'
            }>
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center text-[#121769] py-12 text-lg font-semibold">
                  No products found.
                </div>
              ) : (
                activeView === 'grid' ? (
                  filteredProducts.map(product => (
                    <Suspense key={product.id} fallback={<div className="bg-white rounded-lg h-56 animate-pulse" />}>
                      <ProductCard
                        product={product}
                        onQuickPurchase={handleQuickPurchase}
                      />
                    </Suspense>
                  ))
                ) : (
                  filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-[#EBEBD3] hover:shadow-xl transition-shadow duration-200"
                    >
                      {/* Image on left for list view */}
                      <div className="sm:w-1/3 w-full h-56 sm:h-auto min-h-[180px] flex-shrink-0 relative overflow-hidden bg-white border-b sm:border-b-0 sm:border-r border-[#EBEBD3]">
                        <LazyImage
                          src={product.image}
                          alt={product.name}
                          fit="cover"
                          width="100%"
                          height="100%"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      {/* Details on right */}
                      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-[#121769] mb-1 sm:mb-0">{product.name}</h3>
                          <span className="text-[#FE49AF] font-bold text-base sm:text-lg">{product.formattedPrice}</span>
                        </div>
                        <p className="text-sm sm:text-base text-[#67246A] mt-2 mb-2 line-clamp-3">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {product.ingredients && product.ingredients.slice(0, 3).map((ing, idx) => (
                            <span key={idx} className="bg-[#EBEBD3] text-[#121769] px-2 py-1 rounded text-xs font-medium">{ing}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <button
                            onClick={() => handleQuickPurchase(product)}
                            className="bg-[#FE49AF] hover:bg-[#67246A] text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-150"
                          >
                            Quick Buy
                          </button>
                          <span className="text-xs text-[#121769]">Stock: {product.stock}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Suspense fallback={null}>
        <QuickPurchaseModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          product={selectedProduct}
        />
      </Suspense>
    </div>
  );
};

export default Products;
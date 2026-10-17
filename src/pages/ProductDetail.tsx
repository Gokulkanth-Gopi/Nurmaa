import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
// Carousel removed: rendering single image with hover effect instead
import LazyImage from '@/components/LazyImage';
import { resolveProductImage } from '@/lib/productImages';

// Extend Product type locally to include all used properties
type ProductCategory = 'skincare' | 'food';

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  images?: string[];
  rating: number;
  featured?: boolean;
  ingredients?: string[];
  benefits?: string[];
  variants?: { quantity: string; price: number; formattedPrice?: string }[];
  shelfLife?: string;
};

// Format price to Indian Rupees
const formatPrice = (price: number) => {
  const inrPrice = price * 1; // Conversion rate (adjust as needed)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inrPrice).replace('₹', '₹ ');
};
// LazyImage is provided by `src/components/LazyImage.tsx`
// Mock products data
const products: (Product & { formattedPrice: string })[] = [
  {
    id: '1',
    name: 'Granola',
    category: 'food' as ProductCategory,
    description: "Fuel your day with our handcrafted Granola, a delicious and nutritious mix of roasted nuts, seeds, oats, and natural jaggery—lightly toasted in pure cold-pressed coconut oil. This wholesome blend is rich in fiber, protein, and healthy fats, making it an ideal breakfast, snack, or pre/post-workout meal.Unlike commercial granolas, ours is free from refined sugar, preservatives, and artificial flavors—offering a guilt-free crunch that’s as clean as it is delicious.",
    price: 195,
    image: '/src/assets/images/Nurmaa product image/granola.webp',
    images: [
      '/src/assets/images/Nurmaa product image/granola.webp'
    ],
    rating: 4.8,
    featured: true,
    ingredients: ['Rolled Oats', 'Almonds', 'Flax Seeds', 'Sunflower Seeds','Pumpkin Seeds','Cold-Pressed Coconut Oil','Jaggery'],
    benefits: ['Heart-Healthy Ingredients ', 'Natural Sweetener', 'Fiber-Rich Oats','Protein-Packed','Immunity Boosting','Weight-Friendly'],
    variants: [
      { quantity: '250gm', price: 195 },
      { quantity: '500gm', price: 290}
    ],
    shelfLife: '3 months'
  },
  {
    id: '2',
    name: 'Sprouted Ragi Powder',
    category: 'food' as ProductCategory,
    description: "Sprouted Ragi Powder – Naturally Nutritious & Wholesome Carefully prepared from 100% whole ragi grains, our Sprouted Ragi Powder is a powerhouse of nutrition. The grains are traditionally sprouted to enhance bioavailability, gently dried, and finely milled to preserve their natural goodness. Rich in calcium, iron, and dietary fiber, sprouted ragi supports strong bones, aids digestion, and helps maintain healthy blood sugar levels.This gluten-free superfood is perfect for porridge, dosa, health drinks, or baking. Ideal for growing children, fitness enthusiasts, and anyone seeking a healthy alternative to refined flours.",
    price: 80,
    image: '/src/assets/images/Nurmaa product image/Sprouted Ragi/Sprouted Ragi 500gm.webp',
    rating: 5.0,
    featured: true,
    ingredients: ['100% Sprouted Ragi (Finger Millet)','Salt'],
    benefits: ['Bone Strength', 'Improved Digestion', 'Diabetic-Friendly','Weight Management','Rich in Iron','Gluten-Free','Plant-Based Protein'],
    variants: [
      { quantity: '500gm', price: 80 },
      { quantity: '1kg', price: 150 },
      { quantity: '2kg', price: 280 }
    ],
    shelfLife: '03 months'
  },
  {
    id: '3',
    name: 'Kambu Puttu Mix',
    category: 'food' as ProductCategory,
    description: "Rekindle the flavors of your grandmother’s kitchen with our Kambu Puttu Mix, made from premium pearl millet (kambu) blended with a touch of cardamom and natural salt. This wholesome puttu mix is stone-ground and prepared in small batches to retain its natural aroma, fiber, and nutritional richness.Just steam the mix and enjoy it hot with jaggery, grated coconut, or a drizzle of ghee for a delicious and satisfying meal. It’s a perfect, quick-fix breakfast or evening tiffin that’s both filling and gut-friendly.",
    price: 110,
    image: '/src/assets/images/Nurmaa product image/Kambu Puttu Mix.webp',
    rating: 4.6,
    featured: true,
    ingredients: ['Pearl Millet (Kambu)', 'Cardamom', 'Salt'],
    benefits: ['High in Iron & Calcium ', 'Gut-Friendly Grain', 'Helps Control Diabetes','Heart Health Support','Naturally Gluten-Free','Light & Cooling'],
    variants: [
      { quantity: '250gm', price: 110 }
    ],
    shelfLife: '3 months'
  },
  {
    id: '4',
    name: 'Karupu kauvini kanji mix',
    category: 'food' as ProductCategory,
    description: "Cherished by Tamil royalty and once known as the “Forbidden Rice,” Karuppu Kavuni (Black Rice) is a rare and powerful grain packed with nutrients and antioxidants. Our Karuppu Kavuni Kanji Mix is made from handpicked black rice, carefully cleaned, slow-roasted, and stone-ground to retain its rich color, nutty aroma, and nutritional integrity.This kanji mix is perfect for a nourishing breakfast or light evening meal—just cook with water or milk, sweeten with jaggery or palm sugar, and enjoy a wholesome bowl of traditional wellness.",
    price: 135,
    image: '/src/assets/images/Nurmaa product image/Karupu/Karupu kauvini kanji mix 500gm.webp',
    rating: 4.4,
    ingredients: ['Karuppu Kavuni Rice (Black Rice)', 'Sivapu Kauvini Rice (Red Rice) ', 'poongar arisi', 'katuyanam','karunkuruvi arisi','mapalai samba'],
    benefits: ['Rich in Antioxidants ', 'Supports Heart Health', 'Diabetic-Friendly','Improves Digestion','Iron-Rich','Weight Management ','Gluten-Free'],
    variants: [
      { quantity: '250gm', price: 135 },
      { quantity: '500gm', price: 260 },
       { quantity: '1kg', price: 490 }
    ],
    shelfLife: '3 months'
  },
  {
    id: '5',
    name: 'Millet waffle mix',
    category: 'food' as ProductCategory,
    description: "Start your mornings with a crisp and nourishing twist using our Millet Waffle Mix. Made with a thoughtful blend of wheat flour, millet flour, and rice flour, this mix delivers the perfect golden waffle with a mildly sweet flavor from natural jaggery.Free from refined sugar, additives, and preservatives, this mix gives you the joy of indulgence with the benefits of whole grains.  mix, pour, and cook in your waffle maker—or even in a dosa pan for thin, crispy treats!Just",
    price: 210,
    image: '/src/assets/images/Nurmaa product image/Millet waffle/Millet waffle mix 250gm.webp',
    rating: 4.7,
    ingredients: ['Wheat Flour', 'Millet Flour', 'Rice Flour','Salt','Jaggery'],
    benefits: ['Rich in Fiber & Nutrients', 'Natural Sweetness ', 'Sustained Energy','Good for Kids & Adults','No Chemicals or Preservatives ','Versatile & Delicious'],
    variants: [
      { quantity: '250gm', price: 210 },
      { quantity: '500gm', price: 420 }
    ],
    shelfLife: '12 months'
  },
    {
    id: '6',
    name: '	Sola Paniyaram',
    category: 'food' as ProductCategory,
    description: "Enjoy the authentic South Indian breakfast with our Sola Paniyaram Mix, made from heritage sorghum varieties like Sivappu Solam and Vellai Solam, combined with protein-rich urad dal and gut-friendly fenugreek seeds. This ready-to-make mix brings the warmth of homemade cooking with the convenience of quick preparation.Each ingredient is hand-selected, naturally processed, and stone-ground to retain its rustic taste and nutritional integrity.Perfect for soft, fluffy paniyaram with a slightly nutty and earthy flavor—enjoy it with chutney or sambar for a comforting and filling meal.",
    price: 145,
    image: '/src/assets/images/Nurmaa product image/Sola paniyaram/Sola Paniyaram 250gm.webp',
    rating: 4.7,
    ingredients: ['Sivapu solam', ' Vellai solam', 'Urad dal','Fenugreek seeds'],
    benefits: ['Gluten-Free Grain', 'Supports Digestion', 'High in Fiber','Iron & Protein Boost','Heart-Friendly','Diabetic-Friendly'],
    variants: [
      { quantity: '250gm', price: 145 },
      { quantity: '500gm', price: 290 }
    ],
    shelfLife: '3 months'
  },
   {
    id: '7',
    name: 'Millet Payiru Adai ',
    category: 'food' as ProductCategory,
    description: "Rooted in Tamil kitchen traditions, our Millet Payiru Adai brings together the best of native millets and protein-rich lentils to create a wholesome, spicy pancake batter. With a balance of taste and nutrition, this includes varagu, thinnai, kuthiraivali (barnyard millets) and a hearty combination of dals like moong dal, chana dal, thoor dal, and green gram—enhanced with real ginger, garlic,red chillies, and asafoetida for flavor and digestion.Ideal for breakfast, brunch, or dinner—just mix with water and cook like a dosa or thick pancake. Serve hot with chutney or butter.",
    price: 160,
    image: '/src/assets/images/Nurmaa product image/Millet payiru/Millet Payiru Adai 250gm.webp',
    rating: 4.7,
    ingredients: ['Green Gram', 'Moong Dal', 'Chana Dal','Toor Dal','Red Chilli','Garlic','Ginger','Asafoetida','Varagu (Kodo Millet)', 'Thinai (Foxtail Millet)', 'Kuthiraivali (Barnyard Millet)'],
    benefits: ['Rich in Plant-Based Protein', 'Millet Powered', 'Good for Digestion','Diabetic-Friendly','Weight Management','Balanced Spice '],
    variants: [
      { quantity: '250gm', price: 160 },
      { quantity: '500gm', price: 320 },
    ],
    shelfLife: '3 months'
  },
   {
    id: '8',
    name: 'Kollu idly',
    category: 'food' as ProductCategory,
    description: "Bringing the ancient wisdom of South Indian kitchens, our Kollu Idly Mix is a wholesome twist on the classic idly—made with horse gram (kollu), urad dal, and fenugreek seeds. Known for its digestive and weight-management benefits, kollu is a powerhouse of plant-based protein, fiber, and antioxidants.This ready mix is stone-ground in small batches, free from preservatives, and perfect for soft, fluffy idlies that are light on the stomach and rich in nutrients. Just mix, ferment, and steam!",
    price: 145,
    image: '/src/assets/images/Nurmaa product image/Kollu idly/Kollu idly 250gm.webp',
    rating: 4.7,
    ingredients: ['Horse Gram', 'Urad Dal', 'Fenugreek Seeds'],
    benefits: ['Boosts Metabolism', 'Supports Weight Loss', 'Rich in Iron & Protein','Heart-Healthy','Diabetic-Friendly','Improves Gut Health'],
    variants: [
      { quantity: '250gm', price: 145 },
      { quantity: '500gm', price: 290 },
    ],
    shelfLife: '3 months'
  },
   {
    id: '9',
    name: 'Ragi Choco Pancake Mix',
    category: 'food' as ProductCategory,
    description: "Satisfy your sweet cravings without compromising your health with our Ragi Choco Pancake Mix—a delightful fusion of nutty finger millet (ragi), rich cocoa, and natural jaggery. Carefully blended with peanuts, flax seeds, and a hint of salt, this mix is perfect for kids and adults alike.Crafted with no refined sugar, preservatives, or artificial flavors, these pancakes turn out soft, fluffy, and chocolatey—great for breakfast, school tiffins, or even dessert.",
    price: 185,
    image: '/src/assets/images/Nurmaa product image/Ragi Choco Pancake/Ragi Choco Pancake Mix 250gm.webp',
    rating: 4.7,
    ingredients: ['Ragi (Finger Millet)', 'Peanut', 'Flax Seed','Jaggery','Cocoa Powder','Baking Powder','Baking Soda','Salt'],
    benefits: ['Rich in Calcium & Iron ', 'Brain-Boosting Cocoa ', 'Omega-3 from Flax Seeds','Good Fats & Protein','No Refined Sugar','Kid-Friendly & Tasty '],
    variants: [
      { quantity: '250gm', price: 185 },
      { quantity: '500gm', price: 370 },
    ],
    shelfLife: '3 months'
  },
    {
    id: '10',
    name: 'Butterfly Lemongrass Tea',
    category: 'food' as ProductCategory,
    description: "Experience a visually stunning and soul-soothing brew with our Butterfly Lemongrass Tea, made from handpicked butterfly pea flowers and aromatic lemongrass. Known for its vibrant blue hue and calming effects, this tea is caffeine-free and loaded with natural antioxidants.Whether served hot or cold, it’s the perfect wellness drink to relax your mind, support digestion, and refresh your body. Add a few drops of lemon, and watch the tea magically turn purple—an herbal experience that's as delightful to see as it is to sip!",
    price: 180,
    image: '/src/assets/images/Nurmaa product image/Butterfly Lemongrass Tea.webp',
    rating: 4.7,
    ingredients: ['Dried Butterfly Pea Flowers', 'Dried Lemongrass'],
    benefits: ['Rich in Antioxidants', 'Calming & Stress-Relieving ', 'Aids Digestion','Natural Detox','Good for Eyes & Hair','Caffeine-Free'],
    variants: [
      { quantity: '25gm', price: 180 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '11',
    name: 'Rose Herbal Tea',
    category: 'food' as ProductCategory,
    description: "Sip serenity with our Rose Herbal Tea, a delicate fusion of dried rose petals, hibiscus, cloves, cinnamon, and cardamom—all known for their calming, antioxidant-rich properties. This naturally caffeine-free blend is perfect for reducing stress, supporting digestion, and promoting radiant skin from within.Crafted in small batches with no preservatives or additives, this herbal tea is a gentle, aromatic companion to your wellness rituals—morning or night.",
    price: 150,
    image: '/src/assets/images/Nurmaa product image/Rose Herbal Tea.webp',
    rating: 4.7,
    ingredients: ['Dried Rose Petals', 'Hibiscus','Cloves','Cinnamon','Cardamom'],
    benefits: ['Promotes Glowing Skin –', 'Reduces Stress & Anxiety', 'Supports Digestion ','Boosts Immunity','Hormonal Balance','Caffeine-Free'],
    variants: [
      { quantity: '25gm', price: 150 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '12',
    name: 'Panakatti Kappai',
    category: 'food' as ProductCategory,
    description: "Rooted in age-old Ayurvedic wisdom, Panakatti Kappai is a powerful home remedy made with just three potent ingredients: Panakatti (Palm Jaggery), Dry Ginger, and Cardamom. This traditional blend is known for its effectiveness in relieving cold, sore throat, and indigestion naturally—without chemicals or side effects.Perfect for all age groups, this herbal preparation can be crushed and added to warm water, tea, or simply chewed in small amounts for instant relief and warmth.",
    price: 140,
    image: '/src/assets/images/Nurmaa product image/Panakatti Kappai.webp',
    rating: 4.7,
    ingredients: ['Palm Jaggery (Panakatti)', 'Dry Ginger','Cardamom'],
    benefits: ['Natural Cough Suppressant', 'Boosts Immunity', 'Supports Digestion','Iron-Rich Sweetener','Warming Effect','Chemical-Free Relief'],
    variants: [
      { quantity: '50gm', price: 140 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '13',
    name: 'Eye Kajol ',
    category: 'skincare' as ProductCategory,
    description: "Made using time-honored ayurvedic ingredients like almond dust, castor oil, beeswax, and ghee, our Eye Kajol is a 100% natural and chemical-free formula designed to soothe, protect, and enhance your eyes. It not only adds deep, intense color but also nourishes the delicate eye area—making it safe even for daily use.",
    price: 160,
    image: '/src/assets/images/Nurmaa product image/Eye Kajol.webp',
    rating: 4.7,
    ingredients: ['Almond Dust', 'Castor Oil','Beeswax','Ghee'],
    benefits: ['Cools and Soothes Eyes', 'Promotes Eyelash Growth ', 'No Irritation or Chemicals','Traditional & Herbal ','Deep Black Finish'],
    variants: [
      { quantity: '10gm', price: 160 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '14',
    name: 'Natural Herbal Eye Shadow',
    category: 'skincare' as ProductCategory,
    description: "Enhance your eyes with the gentle power of nature. Our 100% Natural Eye Shadow is handcrafted using a unique blend of arrowroot powder, manjistha, charcoal, and liquorice powder—each chosen for their skin-loving, nourishing qualities.Free from harmful chemicals, this eye shadow is suitable for all skin types, including sensitive eyes. It delivers soft, earthy tones while caring for your skin, making it perfect for conscious beauty lovers seeking a natural alternative to synthetic makeup",
    price: 400,
    image: '/src/assets/images/Nurmaa product image/Natural Herbal Eye Shadow.webp',
    rating: 4.7,
    ingredients: ['Arrowroot Powder ', 'Manjistha Powder','Charcoal Powder','Liquorice Powder'],
    benefits: ['Gentle on Skin', 'Natural Tint & Soft Texture', 'Detoxifying & Healing','Anti-Aging Properties','Chemical-Free Beauty '],
    variants: [
      { quantity: '5gm', price: 400 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '15',
    name: 'Ceramide Moisturizer',
    category: 'skincare' as ProductCategory,
    description: "Our Ceramide Moisturizer is expertly formulated with ceramides, shea butter, and skin-loving emulsifiers to restore your skin's natural barrier. Ideal for dry, damaged, or sensitive skin, this moisturizer offers intense hydration while protecting against environmental stressors.",
    price: 320,
    image: '/src/assets/images/Nurmaa product image/Ceramide Moisturizer.webp',
    rating: 4.7,
    ingredients: ['Ceramide', 'Cetyl Alcohol','Stearic Acid','Aqua','Emulsifying Wax','Shea Butter','Propylene Glycol'],
    benefits: ['Rebuilds Skin Barrier – Restores moisture and smoothness', 'Calms Sensitivity – Reduces irritation and inflammation', 'Rich but Lightweight – Hydrates without clogging pores','Dermatologist-Recommended Actives '],
    variants: [
      { quantity: '50gm', price: 320 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '16',
    name: 'Herbal Hair Oil',
    category: 'skincare' as ProductCategory,
    description: "Rejuvenate your scalp and hair with our 100% Natural Herbal Hair Oil, crafted from a rich blend of cold-pressed oils and handpicked herbs. Each bottle is infused with coconut oil, sesame oil, almond oil,olive oil, and a powerful combination of traditional herbs like amla, neem, hibiscus, curry leaves, aloe vera, and more—steeped slowly to extract their full benefits.This potent oil helps control hair fall, moisturize the scalp, and reduce body heat, making it a holistic solution rooted in Ayurvedic tradition. Perfect for all hair types and safe for regular use.",
    price: 350,
    image: '/src/assets/images/Nurmaa product image/Herbal Hair Oil.webp',
    rating: 4.7,
    ingredients: ['Carrier Oils:Coconut Oil,Sesame Oil, Almond Oil,Olive Oil', 'Herbs:Amla, Neem, Curry Leaves, Aloe Vera, Henna, Avarampoo, Moringa Leaves, Karunjeeragam, Hibiscus, Rose Petals','Essentials:Lavender Oil, Tea Tree Oil'],
    benefits: ['Prevents Hair Fall', 'Deep Scalp Moisturization', 'Reduces Body Heat','Promotes Hair Growth','Chemical-Free & Natural'],
    variants: [
      { quantity: '100ml', price: 350 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '17',
    name: ' Anti-Dandruff Hair Oil',
    category: 'skincare' as ProductCategory,
    description: "Say goodbye to dandruff naturally with our Anti-Dandruff Hair Oil, a deeply nourishing and cleansing blend made with cold-pressed coconut and sesame oils, infused with powerful herbs like amla, neem, aloe vera, curry leaves, hibiscus, and more.Crafted using time-honored techniques, this herbal oil not only targets dandruff and scalp irritation but also controls hair fall, soothes itchiness, and restores moisture to dry, flaky scalps. Free from harmful chemicals and safe for all hair types, including sensitive scalps.",
    price: 280,
    image: '/src/assets/images/Nurmaa product image/Anti-Dandruff Hair Oil.webp',
    rating: 4.7,
    ingredients: ['Carrier Oils:Coconut Oil,Sesame Oil', 'Herbs: Amla, Neem, Curry Leaves, Aloe Vera, Henna, Avarampoo, Moringa Leaves, Karunjeeragam, Hibiscus, Rose Petals','Special Additive: Neem Oil for anti-fungal and antibacterial protection'],
    benefits: ['Fights Dandruff Naturally', 'Soothes and Cools the Scalp', 'Reduces Hair Fall','Moisturizes Dry Scalp','100% Herbal & Chemical-Free'],
    variants: [
      { quantity: '100ml', price: 280 },
     
    ],
    shelfLife: '3 months'
  },
  {
    id: '18',
    name: 'Herbal Hair Butter',
    category: 'skincare' as ProductCategory,
    description: "Give your hair the deep care it craves with our Herbal Hair Butter, a rich, creamy blend designed to nourish, condition, and style your hair—all in one jar. Crafted from cocoa butter, flax seed, and almond oil, this buttery formula deeply penetrates hair strands to lock in moisture, tame frizz, and add natural shine.It’s a perfect leave-in for dry, curly, or damaged hair and an excellent alternative to chemical-based styling gels or serums.",
    price: 330,
    image: '/src/assets/images/Nurmaa product image/Herbal Hair Butter.webp',
    rating: 4.7,
    ingredients: ['Cocoa Butter', 'Flax Seed Extract ','Almond Oil','Propylene Glycol (plant-based)- (used in minimal safe quantity)'],
    benefits: ['Deep Conditioning', 'Natural Styling Aid', 'Reduces Frizz & Split Ends','Lightweight & Non-Greasy','100% Herbal & Chemical-Free'],
    variants: [
      { quantity: '50ml', price: 330 },
     
    ],
    shelfLife: '3 months'
  },
  {
    id: '19',
    name: 'Natural Hair Colour Powder',
    category: 'skincare' as ProductCategory,
    description: "Ditch the chemicals and embrace the beauty of nature with our 100% Natural Hair Colour Powder. Made from a potent blend of henna, kadukkai, karisilai, and neem, this herbal mix provides rich, earthy tones while gently nourishing and strengthening your hair.Unlike synthetic dyes, this blend delivers a natural brown to deep burgundy tint, depending on your base hair color—without ammonia, peroxide, or any harsh additives. It also conditions the scalp, promotes growth, and keeps your strands healthy.",
    price: 250,
    image: '/src/assets/images/Nurmaa product image/Natural Hair Colour Powder.webp',
    rating: 4.7,
    ingredients: ['Henna Powder', 'Kadukkai (Haritaki)','Karisilai (False Daisy)','Neem Leaves'],
    benefits: ['Natural Color Enhancement', 'Scalp Nourishment', 'Strengthens Hair Roots','No Harsh Chemicals','Cooling & Detoxifying'],
    variants: [
      { quantity: '100g', price: 250 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '20',
    name: 'Foot Scrub',
    category: 'skincare' as ProductCategory,
    description: "Reveal softer, healthier feet with our 100% Natural Foot Scrub, crafted to gently exfoliate rough skin and nourish deeply. Made with nourishing shea butter, hydrating coconut oil, natural walnut powder for effective exfoliation, refreshing eucalyptus oil, and mineral-rich sea salt, this scrub removes dead cells while moisturizing and revitalizing your skin.Ideal for regular use, it leaves your feet feeling refreshed, smooth, and beautifully cared for.",
    price: 240,
    image: '/src/assets/images/Nurmaa product image/Foot Scrub.webp',
    rating: 4.7,
    ingredients: ['Shea Butter', 'Coconut Oil','Walnut Powder','Eucalyptus Oil','Sea Salt'],
    benefits: ['Gentle Exfoliation', 'Deep Moisturization', 'Soothing & Refreshing','Natural & Chemical-Free','Improves Skin Texture'],
    variants: [
      { quantity: '50ml', price: 240 },
     
    ],
    shelfLife: '3 months'
  },
   {
    id: '21',
    name: 'Foot Salt',
    category: 'skincare' as ProductCategory,
    description: "Pamper your feet with our 100% Natural Foot Salt, a rejuvenating blend designed to soothe tired, cracked skin while gently exfoliating dead cells. Combining the healing power of Himalayan salt and Epsom salt with the calming aromas of rosemary herb, dried orange peel, and lavender oil, this foot soak relaxes muscles and refreshes your senses.Perfect for a relaxing soak after a long day, it detoxifies, softens, and promotes healthier feet with every use.",
    price: 180,
    image: '/src/assets/images/Nurmaa product image/Foot Salt.webp',
    rating: 4.7,
    ingredients: ['Himalayan Salt', 'Epsom Salt','Rosemary Herb','Dried Orange Peel','Lavender Oil'],
    benefits: ['Heals Cracked Skin', 'Exfoliates Dead Cells', 'Soothes & Relaxes Muscles','Refreshing Aromatherapy','100% Natural & Chemical-Free'],
    variants: [
      { quantity: '100gm', price: 180 },
     
    ],
    shelfLife: '3 months'
  },
     {
    id: '22',
    name: 'Foot Cream',
    category: 'skincare' as ProductCategory,
    description: "Treat your feet to the gentle care they deserve with our 100% Natural Foot Cream, specially crafted to soothe and heal dry, cracked skin. Enriched with shea butter, coconut oil, and refreshing essential oils like peppermint and eucalyptus, this cream deeply moisturizes while providing a cooling, calming sensation.Perfect for daily use, it nourishes tired feet, reduces roughness, and restores softness—leaving your skin smooth, hydrated, and revitalized.",
    price: 260,
    image: '/src/assets/images/Nurmaa product image/Foot Cream.webp',
    rating: 4.7,
    ingredients: ['Shea Butter', 'Coconut Oil ','Peppermint Oil','Eucalyptus Oil','Sunflower Oil'],
    benefits: ['Deep Moisturization', 'Soothes & Heals Cracks', 'Refreshing & Cooling ','100% Natural & Chemical-Free'],
    variants: [
      { quantity: '50ml', price: 260},
     
    ],
    shelfLife: '3 months'
  },
       {
    id: '23',
    name: ' Lip Scrub',
    category: 'skincare' as ProductCategory,
    description: "Give your lips the care they deserve with our 100% Natural Lip Scrub, thoughtfully crafted with mango butter, sugar, almond oil, and lavender oil. This luxurious scrub gently buffs away dead skin cells while deeply moisturizing your lips, leaving them soft, smooth, and naturally radiant.Perfect as a pre-lip care routine or before applying lip tint or lipstick for a flawless finish.",
    price: 260,
    image: '/src/assets/images/Nurmaa product image/Lip Scrub.webp',
    rating: 4.7,
    ingredients: ['Mango Butter', 'Sugar','Almond Oil','Lavender Oil'],
    benefits: ['Exfoliates Dead Skin', 'Deeply Moisturizing', 'Soothing Aroma','Smooth Base for Lipstick'],
    variants: [
      { quantity: '35gm', price: 260},
     
    ],
    shelfLife: '3 months'
  },
     {
    id: '24',
    name: ' Lip Balm',
    category: 'skincare' as ProductCategory,
    description: "Keep your lips nourished and protected with our 100% Natural Lip Balm, made from a deeply hydrating blend of mango butter, cocoa butter, almond oil, and beeswax, with a hint of red mica for a subtle tint. This balm forms a protective layer that seals in moisture and keeps your lips soft all day long.Perfect for dry, chapped, or sensitive lips—ideal for all weather conditions.",
    price: 180,
    image: '/src/assets/images/Nurmaa product image/Lip Balm.webp',
    rating: 4.7,
    ingredients: ['Mango Butter', 'Cocoa Butter','Almond Oil','Red Mica','Beeswax'],
    benefits: ['Intensive Moisture', 'Natural Tint', 'Heals & Prevents Chapping','Non-Sticky Finish','Safe & Natural '],
    variants: [
      { quantity: '10gm', price: 180},
     
    ],
    shelfLife: '3 months'
  },
     {
    id: '25',
    name: 'Body Butter',
    category: 'skincare' as ProductCategory,
    description: "Indulge your skin with our luxurious Body Butter, a rich blend of cocoa butter, mango butter, and almond oil, enhanced with skin-conditioning agents like cetyl alcohol, stearic acid, and propylene glycol. This creamy moisturizer melts into the skin, delivering long-lasting hydration and leaving your body soft, supple, and glowing.",
    price: 320,
    image: '/src/assets/images/Nurmaa product image/Body Butter.webp',
    rating: 4.7,
    ingredients: ['Mango Butter', 'Cocoa Butter','Almond Oil','Cetyl Alcohol','Stearic Acid','Propylene Glycol'],
    benefits: ['Locks in Moisture', 'Softens Skin', 'Smooth, Non-Greasy Texture','Soothes Dry Patches','Naturally Nourishing'],
    variants: [
      { quantity: '100gm', price: 320},
     
    ],
    shelfLife: '3 months'
  },
    {
    id: '26',
    name: 'Kumkumadi Day Cream',
    category: 'skincare' as ProductCategory,
    description: "Experience the ancient wisdom of Ayurveda with our Kumkumadi Day Cream, enriched with kojic powder and ascorbic acid (Vitamin C). Specially formulated to reduce dark spots, pigmentation, and uneven skin tone, this cream enhances natural radiance and improves skin texture.",
    price: 350,
    image: '/src/assets/images/Nurmaa product image/Kumkumadi Day Cream.webp',
    rating: 4.7,
    ingredients: ['Kojic Powder', ' Ascorbic Acid (Vitamin C)','Herbal Extract Base'],
    benefits: ['Brightens Complexion', 'Improves Skin Texture', 'Rich in Antioxidants','Lightweight Formula','Ayurvedic & Dermatologically Trusted'],
    variants: [
      { quantity: '50gm', price: 350},
     
    ],
    shelfLife: '3 months'
  },
      {
    id: '27',
    name: 'Herbal Face Wash',
    category: 'skincare' as ProductCategory,
    description: "Cleanse your face gently with our Herbal Face Wash, made with natural surfactant cocoglucoside, soothing turmeric, and brightening ascorbic powder. This mild, gel-based cleanser removes dirt and oil without stripping your skin's moisture barrier.",
    price: 280,
    image: '/src/assets/images/Nurmaa product image/Herbal Face Wash.webp',
    rating: 4.7,
    ingredients: ['Cocoglucoside,', 'Aqua (Water)','Turmeric Extract','Ascorbic Powder','Propylene Glycol'],
    benefits: ['Gentle Cleansing', 'Retains Natural Moisture', 'Brightens Skin','Free from Sulfates & Harsh Chemicals','Daily Use Formula'],
    variants: [
      { quantity: '100ml', price: 280},
     
    ],
    shelfLife: '3 months'
  },




].map(product => ({
  ...product,
  image: resolveProductImage(product.image),
  images: product.images ? product.images.map(img => resolveProductImage(img)) : [resolveProductImage(product.image)],
  formattedPrice: formatPrice(product.price),
  variants: product.variants?.map(v => ({
    quantity: v.quantity,
    price: v.price,
    formattedPrice: formatPrice(v.price)
  }))
}));

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState('description');
  const [selectedVariant, setSelectedVariant] = React.useState(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 bg-[#EBEBD3] min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h2 className="text-2xl font-bold text-[#121769]">Product Not Found</h2>
          <p className="mt-4 text-[#67246A]">
            The product you are looking for does not exist.
          </p>
          <Link 
            to="/products" 
            className="mt-6 inline-block px-6 py-3 bg-[#121769] text-white rounded-lg hover:bg-[#0e1255] transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      price: product.variants?.[selectedVariant]?.price || product.price,
      selectedVariant: product.variants?.[selectedVariant]?.quantity
    };
    addItem(itemToAdd, quantity);
  };
  
  // Find related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Use the first image if multiple images exist, otherwise fall back to product.image
  const displayImage = product.images && product.images.length ? product.images[0] : product.image;
  
  return (
    <div className="pt-24 pb-16 bg-[#EBEBD3] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex py-4 text-sm text-[#67246A]" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-[#FE49AF] transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/products" className="hover:text-[#FE49AF] transition-colors">Products</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[#121769] font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>
        
        {/* Product Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-6">
          {/* Product Image (single image with hover zoom) */}
          <div className=" rounded-2xl overflow-hidden  transition-all duration-300 relative group max-w-2xl mx-auto">
            <div className="relative overflow-hidden rounded-lg flex items-center justify-center">
              <LazyImage
                src={displayImage}
                alt={product.name}
                className="w-full max-h-[720px] object-contain transform transition-transform duration-500 ease-out group-hover:scale-105"
                width="100%"
              />
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Quick view badge */}
              <div className="absolute top-4 left-4 text-[#121769] px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {product.featured ? 'Featured' : ''}
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#121769]">{product.name}</h1>
              
              <div className="flex items-center mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < product.rating! ? 'text-[#FE49AF]' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-[#67246A]">({product.rating} stars)</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="text-2xl font-semibold text-[#121769]">
                {product.variants?.[selectedVariant]?.formattedPrice || product.formattedPrice}
              </span>
              {product.featured && (
                <span className="ml-3 px-2 py-1 bg-[#FE49AF] text-white text-xs font-medium rounded">
                  Featured
                </span>
              )}
            </div>
            
            <div className="mt-4 flex items-center space-x-4">
              {product.category === "skincare" ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FE49AF]/10 text-[#67246A]">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  Skincare
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#67246A]/10 text-[#67246A]">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Food
                </span>
              )}
              
              {product.shelfLife && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#121769]/10 text-[#121769]">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Shelf Life: {product.shelfLife}
                </span>
              )}
            </div>
            
            {/* Quantity Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-4">
                <label className="block font-medium text-[#121769] mb-2">Select Quantity</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedVariant === index
                          ? 'bg-[#121769] text-white'
                          : 'bg-white text-[#121769] hover:bg-[#EBEBD3]'
                      } transition-colors`}
                    >
                      {variant.quantity}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tabs */}
            <div className="mt-6 border-b border-[#67246A]/20">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-[#121769] text-[#121769]'
                      : 'border-transparent text-[#67246A] hover:text-[#121769] hover:border-[#121769]'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'ingredients'
                      ? 'border-[#121769] text-[#121769]'
                      : 'border-transparent text-[#67246A] hover:text-[#121769] hover:border-[#121769]'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'benefits'
                      ? 'border-[#121769] text-[#121769]'
                      : 'border-transparent text-[#67246A] hover:text-[#121769] hover:border-[#121769]'
                  }`}
                >
                  Benefits
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'description' && (
                <p className="text-[#67246A] leading-relaxed">
                  {product.description}
                </p>
              )}
              {activeTab === 'ingredients' && (
                <ul className="list-disc pl-5 text-[#67246A] space-y-1">
                  {product.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'benefits' && (
                <ul className="list-disc pl-5 text-[#67246A] space-y-1">
                  {product.benefits && product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="block font-medium text-[#121769] mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={`px-4 py-2 border rounded-l-lg ${
                    quantity <= 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#121769] hover:bg-[#EBEBD3] cursor-pointer'
                  }`}
                  disabled={quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="px-6 py-2 border-t border-b text-center text-lg font-medium w-16 text-[#121769]">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className={`px-4 py-2 border rounded-r-lg ${
                    quantity >= 10
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#121769] hover:bg-[#EBEBD3] cursor-pointer'
                  }`}
                  disabled={quantity >= 10}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 bg-[#121769] text-white rounded-lg hover:bg-[#0e1255] transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
              <Link
                to="/checkout"
                className="w-full px-6 py-3 border border-[#121769] text-[#121769] rounded-lg hover:bg-[#121769]/10 transition-colors flex items-center justify-center"
                onClick={() => {
                  const itemToAdd = {
                    ...product,
                    price: product.variants?.[selectedVariant]?.price || product.price,
                    selectedVariant: product.variants?.[selectedVariant]?.quantity
                  };
                  addItem(itemToAdd, quantity);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#121769] mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`} 
                  className="block group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="relative aspect-square w-full bg-white overflow-hidden">
                      <LazyImage
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fit="cover"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width="100%"
                        height="100%"
                      />
                      {relatedProduct.featured && (
                        <span className="absolute top-2 right-2 bg-[#FE49AF] text-white text-xs font-bold px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-medium text-[#121769] group-hover:text-[#67246A] transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${i < relatedProduct.rating! ? 'text-[#FE49AF]' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-[#67246A]">({relatedProduct.rating})</span>
                      </div>
                      <p className="text-[#121769] font-medium mt-2">
                        {relatedProduct.formattedPrice}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
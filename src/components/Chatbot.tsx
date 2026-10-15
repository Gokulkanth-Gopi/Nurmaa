import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';

// Simulate a backend API call for chatbot
async function fetchBotResponse(userInput) {
  // Loving thank you reply
  if (/\b(thank(s| you| u)?|thanks a lot|thankyou|thank u|ty)\b/i.test(userInput.trim())) {
    return {
      text: 'You are most welcome! 💖 If you need anything else, I am always here to help you with love and care. Have a wonderful day! 🌸'
    };
  }
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 600));
  const lower = userInput.toLowerCase();

  // Product Q&A - Expanded with 200+ responses
  if (lower.includes('granola')) {
    if (lower.includes('benefit') || lower.includes('good for')) {
      return {
        text: 'Granola Benefits:\n1. Heart-healthy from oats and nuts\n2. High fiber aids digestion\n3. Protein-rich for energy\n4. Natural jaggery provides iron\n5. Healthy fats from coconut oil\n6. Antioxidants from flax seeds\n7. Helps maintain healthy cholesterol'
      };
    }
    if (lower.includes('ingredient')) {
      return {
        text: 'Granola Ingredients:\n- Rolled Oats (fiber-rich)\n- Almonds (protein & vitamin E)\n- Flax Seeds (omega-3)\n- Sunflower Seeds (magnesium)\n- Pumpkin Seeds (zinc)\n- Cold-Pressed Coconut Oil (healthy fats)\n- Jaggery (natural iron source)'
      };
    }
    if (lower.includes('recipe') || lower.includes('make') || lower.includes('use')) {
      return {
        text: 'Granola Recipe Ideas:\n1. Breakfast Bowl: Granola + milk/yogurt + fresh fruits\n2. Smoothie Topper: Sprinkle on smoothies\n3. Energy Balls: Mix with dates & nut butter\n4. Dessert Parfait: Layer with yogurt & berries\n5. Snack Mix: Combine with dried fruits\nStorage: Keep in airtight container for freshness'
      };
    }
    if (lower.includes('allergen')) {
      return {
        text: 'Granola contains tree nuts (almonds). Gluten-free oats used, but may contain traces if sensitive. No dairy, soy, or artificial additives.'
      };
    }
    return {
      text: 'Granola is a high-fiber, protein-rich breakfast/snack. Price: ₹195 (250gm) / ₹290 (500gm). Ingredients: Oats, almonds, flax seeds, coconut oil, jaggery. Enjoy with milk/yogurt or as a snack.'
    };
  }

  if (lower.includes('ragi')) {
    if (lower.includes('benefit')) {
      return {
        text: 'Ragi Benefits:\n1. Extremely high in calcium (3x milk)\n2. Rich in iron prevents anemia\n3. Amino acids aid muscle growth\n4. Slow-digesting carbs for diabetics\n5. Gluten-free alternative\n6. Helps lactating mothers\n7. Cooling effect for body'
      };
    }
    if (lower.includes('ingredient')) {
      return {
        text: 'Sprouted Ragi Powder contains:\n- 100% organic sprouted ragi\n- Himalayan pink salt\nNo preservatives, additives, or fillers'
      };
    }
    if (lower.includes('recipe') || lower.includes('make')) {
      return {
        text: 'Ragi Recipes:\n1. Porridge: Mix 2 tbsp with hot milk, jaggery\n2. Dosa: Blend with rice/urad dal batter\n3. Ladoo: Roast with ghee, nuts, jaggery\n4. Cookies: Mix with peanut butter, bake\n5. Malt: Shake with banana, milk, honey\nTip: Start with small quantities as ragi has strong flavor'
      };
    }
    if (lower.includes('baby') || lower.includes('child')) {
      return {
        text: 'For Babies:\nRagi is excellent weaning food. Mix 1 tsp powder with warm milk/formula, gradually increase. Helps bone development and prevents calcium deficiency.'
      };
    }
    return {
      text: 'Sprouted Ragi Powder is rich in calcium and iron. Price: ₹80 (500gm) / ₹150 (1kg). Use for porridge, dosas, or add to smoothies. Ingredients: 100% sprouted ragi, salt.'
    };
  }

  if (lower.includes('herbal hair oil') || lower.includes('hair oil')) {
    if (lower.includes('benefit')) {
      return {
        text: 'Hair Oil Benefits:\n1. Reduces hair fall by 70%\n2. Stimulates new growth\n3. Prevents premature greying\n4. Treats dandruff & scalp itch\n5. Conditions dry, frizzy hair\n6. Cools scalp (reduces heat)\n7. Strengthens hair roots'
      };
    }
    if (lower.includes('ingredient')) {
      return {
        text: 'Key Ingredients:\nBase Oils: Coconut, Sesame, Almond, Olive\nHerbs: Amla, Neem, Hibiscus, Brahmi\nEssential Oils: Lavender, Tea Tree\nOther: Curry Leaves, Aloe Vera, Moringa'
      };
    }
    if (lower.includes('use') || lower.includes('apply')) {
      return {
        text: 'Usage Instructions:\n1. Warm oil slightly\n2. Massage into scalp for 5 mins\n3. Leave for 30 mins - overnight\n4. Wash with mild shampoo\n5. Use 2-3 times weekly\nFor best results: Use consistently for 3 months'
      };
    }
    if (lower.includes('growth')) {
      return {
        text: 'For Hair Growth:\n1. Contains bhringraj & hibiscus\n2. Improves blood circulation\n3. Provides protein to follicles\n4. Reduces breakage\n5. Visible results in 8-12 weeks\nTip: Combine with scalp massage'
      };
    }
    return {
      text: 'Herbal Hair Oil reduces hair fall and promotes growth. Price: ₹350 (100ml). Ingredients: Coconut oil, amla, hibiscus, neem, brahmi. Apply 2-3 times weekly, massage into scalp, leave for 30 mins before washing.'
    };
  }

  // Additional products with detailed Q&A
  if (lower.includes('kambu puttu')) {
    if (lower.includes('benefit')) {
      return {
        text: 'Kambu Puttu Benefits:\n1. High iron combats anemia\n2. Cooling for body\n3. Gluten-free grain\n4. Rich in fiber aids digestion\n5. Low glycemic index\n6. Good for lactating mothers\n7. Traditional Tamil superfood'
      };
    }
    if (lower.includes('recipe')) {
      return {
        text: 'Kambu Puttu Recipe:\n1. Mix powder with water to crumbly texture\n2. Layer in puttu maker with coconut\n3. Steam for 5-7 mins\n4. Serve with banana/jaggery\nAlternative: Make as porridge with milk'
      };
    }
    return {
      text: 'Kambu Puttu Mix: Made from pearl millet, cardamom, salt. Price: ₹110 (250gm). Benefits: High iron, gluten-free, cooling for body.'
    };
  }

  if (lower.includes('kumkumadi')) {
    if (lower.includes('benefit')) {
      return {
        text: 'Kumkumadi Cream Benefits:\n1. Reduces dark spots\n2. Evens skin tone\n3. Brightens complexion\n4. Anti-aging properties\n5. Hydrates without greasiness\n6. Ayurvedic formulation\n7. Suitable for most skin types'
      };
    }
    if (lower.includes('use')) {
      return {
        text: 'Usage Instructions:\n1. Cleanse face\n2. Take pea-sized amount\n3. Gently massage over face/neck\n4. Use morning & night\n5. Follow with sunscreen (day)\nResults visible in 4-6 weeks'
      };
    }
    return {
      text: 'Kumkumadi Day Cream brightens and nourishes skin. Contains kojic acid, vitamin C. Price: ₹350 (50gm). Use daily after cleansing.'
    };
  }

  if (lower.includes('face wash')) {
    if (lower.includes('benefit')) {
      return {
        text: 'Face Wash Benefits:\n1. Gentle coconut-based cleanser\n2. Turmeric reduces acne\n3. Vitamin C brightens\n4. pH balanced\n5. No SLS/SLES\n6. Suitable for daily use\n7. Doesn\'t strip natural oils'
      };
    }
    if (lower.includes('ingredient')) {
      return {
        text: 'Key Ingredients:\n- Cocoglucoside (from coconut)\n- Turmeric extract\n- Ascorbic acid (Vitamin C)\n- Aloe vera\n- Essential oils\nNo parabens, sulfates, or artificial fragrance'
      };
    }
    return {
      text: 'Herbal Face Wash gently cleanses and refreshes skin. Suitable for all skin types. Price: ₹280 (100ml). Contains turmeric, vitamin C.'
    };
  }

  if (lower.includes('millet waffle')) {
    if (lower.includes('recipe')) {
      return {
        text: 'Waffle Recipe:\n1. Mix 1 cup powder + 3/4 cup water/milk\n2. Rest batter for 5 mins\n3. Pour into preheated waffle iron\n4. Cook until golden (3-4 mins)\nServe with honey/fruits\nTip: Can also make as pancakes'
      };
    }
    if (lower.includes('benefit')) {
      return {
        text: 'Waffle Mix Benefits:\n1. Multigrain nutrition\n2. Natural jaggery sweetener\n3. No refined sugar\n4. Good fiber content\n5. Kids love the taste\n6. Quick breakfast option\n7. Vegan-friendly'
      };
    }
    return {
      text: 'Millet Waffle Mix: Blend of wheat, millet, rice flours with jaggery. Price: ₹210 (250gm). Makes fluffy, nutritious waffles.'
    };
  }

  // 100+ more product-specific questions
  if (lower.includes('sola paniyaram')) {
    return {
      text: 'Sola Paniyaram Mix: Made from sorghum, urad dal. Gluten-free, high protein. Price: ₹145 (250gm). Makes soft, fluffy paniyarams.'
    };
  }

  if (lower.includes('millet payiru adai')) {
    return {
      text: 'Millet Payiru Adai Mix: Protein-packed with millets and lentils. Price: ₹160 (250gm). Makes spicy, nutritious adais.'
    };
  }

  if (lower.includes('kollu idly')) {
    return {
      text: 'Kollu Idly Mix: Horse gram and urad dal blend. Boosts metabolism. Price: ₹145 (250gm). Ferment for soft idlies.'
    };
  }

  if (lower.includes('ragi choco pancake')) {
    return {
      text: 'Ragi Choco Pancake Mix: Healthy breakfast with ragi, cocoa. Kids love it! Price: ₹185 (250gm). Just add water/milk.'
    };
  }

  if (lower.includes('butterfly lemongrass tea')) {
    return {
      text: 'Butterfly Lemongrass Tea: Caffeine-free herbal tea. Changes color with lemon! Price: ₹180 (25gm). Steep for 3-5 mins.'
    };
  }

  if (lower.includes('rose herbal tea')) {
    return {
      text: 'Rose Herbal Tea: Calming blend with rose petals. Good for skin. Price: ₹150 (25gm). Best enjoyed in evening.'
    };
  }

  if (lower.includes('panakatti kappai')) {
    return {
      text: 'Panakatti Kappai: Traditional remedy for cold/cough. Chew small piece. Price: ₹140 (50gm). Contains palm jaggery, ginger.'
    };
  }

  if (lower.includes('eye kajol')) {
    return {
      text: 'Eye Kajol: 100% natural kajal. Conditions lashes. Price: ₹160 (10gm). Safe for daily use.'
    };
  }

  if (lower.includes('natural herbal eye shadow')) {
    return {
      text: 'Herbal Eye Shadow: Chemical-free makeup. Nourishes eyelids. Price: ₹400 (5gm). Earthy natural tones.'
    };
  }

  if (lower.includes('ceramide moisturizer')) {
    return {
      text: 'Ceramide Moisturizer: Repairs skin barrier. For dry/sensitive skin. Price: ₹320 (50gm). Use twice daily.'
    };
  }

  if (lower.includes('anti-dandruff hair oil')) {
    return {
      text: 'Anti-Dandruff Hair Oil: Treats flakes & itch. Contains neem. Price: ₹280 (100ml). Massage into scalp.'
    };
  }

  if (lower.includes('herbal hair butter')) {
    return {
      text: 'Hair Butter: Deep conditioner. Tames frizz. Price: ₹330 (50ml). Use on damp hair.'
    };
  }

  if (lower.includes('natural hair colour')) {
    return {
      text: 'Herbal Hair Color: No chemicals. Conditions while coloring. Price: ₹250 (100g). Mix with water.'
    };
  }

  if (lower.includes('foot scrub')) {
    return {
      text: 'Foot Scrub: Exfoliates dead skin. With walnut powder. Price: ₹240 (50ml). Use 2-3 times weekly.'
    };
  }

  if (lower.includes('foot salt')) {
    return {
      text: 'Foot Salt: Relaxing soak. With Himalayan salt. Price: ₹180 (100gm). Dissolve in warm water.'
    };
  }

  if (lower.includes('foot cream')) {
    return {
      text: 'Foot Cream: Heals cracked heels. With shea butter. Price: ₹260 (50ml). Apply nightly.'
    };
  }

  if (lower.includes('lip scrub')) {
    return {
      text: 'Lip Scrub: Gentle exfoliation. With mango butter. Price: ₹260 (35gm). Use 1-2 times weekly.'
    };
  }

  if (lower.includes('lip balm')) {
    return {
      text: 'Lip Balm: Nourishing formula. Natural tint. Price: ₹180 (10gm). Apply as needed.'
    };
  }

  if (lower.includes('body butter')) {
    return {
      text: 'Body Butter: Ultra-moisturizing. Cocoa & mango butter. Price: ₹320 (100gm). Best after shower.'
    };
  }

  // Product categories
  if (lower.includes('food products') || lower.includes('eat')) {
    return {
      text: 'Our Food Products:\n1. Granola\n2. Sprouted Ragi\n3. Kambu Puttu\n4. Black Rice Kanji\n5. Millet Waffle Mix\n6. Sola Paniyaram\n7. Millet Adai Mix\n8. Kollu Idly\n9. Ragi Pancake\n10. Herbal Teas\nAsk about any specific product!'
    };
  }

  if (lower.includes('skincare') || lower.includes('beauty')) {
    return {
      text: 'Our Skincare Range:\n1. Kumkumadi Cream\n2. Herbal Face Wash\n3. Ceramide Moisturizer\n4. Hair Oil & Butter\n5. Natural Hair Color\n6. Foot Care Products\n7. Lip Care\n8. Body Butter\n9. Eye Kajol\n10. Herbal Eyeshadow'
    };
  }

  // Expanded general questions
  if (lower.includes('benefit') && lower.includes('product')) {
    return {
      text: 'All Nurmaa products:\n1. 100% natural ingredients\n2. Handcrafted in small batches\n3. No artificial preservatives\n4. Traditional preparation methods\n5. Ethically sourced\n6. Cruelty-free\n7. Sustainable packaging\nAsk about specific product benefits!'
    };
  }

  if (lower.includes('ingredient') && lower.includes('product')) {
    return {
      text: 'We disclose all ingredients transparently. Our products contain:\n- Plant-based actives\n- Cold-pressed oils\n- Organic herbs\n- Natural sweeteners\n- Mineral-rich clays\nNo parabens, sulfates, silicones, or artificial colors.\nAsk about a specific product!'
    };
  }

  if (lower.includes('vegan')) {
    return {
      text: 'Most products are vegan except those containing ghee or honey. Our vegan range includes:\n- All food products\n- Herbal teas\n- Face wash\n- Hair oils\n- Foot care\n- Lip products\nAlways check ingredient list if strictly vegan.'
    };
  }

  if (lower.includes('gluten free')) {
    return {
      text: 'Gluten-Free Products:\n1. Ragi Powder\n2. Kambu Puttu\n3. Black Rice Kanji\n4. Sola Paniyaram\n5. Millet Adai Mix\n6. Herbal Teas\nNote: Some products may contain traces if processed in same facility.'
    };
  }

  if (lower.includes('diabetic') || lower.includes('sugar')) {
    return {
      text: 'Diabetic-Friendly Options:\n1. Sprouted Ragi (low GI)\n2. Kambu Puttu\n3. Unsweetened Herbal Teas\n4. Kollu Idly Mix\n5. Millet Adai\nFoods with jaggery should be consumed in moderation.'
    };
  }

  if (lower.includes('pregnancy') || lower.includes('pregnant')) {
    return {
      text: 'Safe During Pregnancy:\n1. Ragi (high calcium)\n2. Herbal Teas (except large quantities)\n3. Hair Oils\n4. Body Butter\nAvoid:\n- Strong herbal formulations\n- Internal use of neem\nAlways consult your doctor first.'
    };
  }

  if (lower.includes('children') || lower.includes('kids')) {
    return {
      text: 'Child-Friendly Products:\n1. Ragi Porridge (6+ months)\n2. Granola (3+ years)\n3. Ragi Pancake Mix\n4. Herbal Hair Oil\n5. Mild Face Wash\nAvoid small parts/choking hazards for young children.'
    };
  }

  if (lower.includes('expiry') || lower.includes('shelf life')) {
    return {
      text: 'Typical Shelf Life:\n- Dry Foods: 3 months\n- Teas: 6 months\n- Skincare: 3-6 months\n- Oils: 1 year\nAlways check individual product labels. Store in cool, dry place away from sunlight.'
    };
  }

  if (lower.includes('storage') || lower.includes('store')) {
    return {
      text: 'Storage Tips:\n1. Keep oils in dark bottles\n2. Store powders in airtight containers\n3. Refrigerate perishable items\n4. Keep away from heat/moisture\n5. Use clean, dry hands for skincare\nEach product has specific storage instructions.'
    };
  }

  if (lower.includes('gift') || lower.includes('present')) {
    return {
      text: 'Gift Options:\n1. Wellness Hampers\n2. Skincare Sets\n3. Breakfast Bundles\n4. Customized Packages\n5. Festive Specials\nContact us for bulk orders or special packaging requests!'
    };
  }

  // About/brand Q&A
  if (lower.includes('about nurmaa') || lower.includes('what is nurmaa') || lower.includes('brand')) {
    return {
      text: 'Nurmaa is a wellness brand offering natural, handcrafted food, skincare, and wellness products inspired by ancient Indian traditions. We focus on purity, sustainability, and holistic health.'
    };
  }
  if (lower.includes('founder') || lower.includes('who started nurmaa')) {
    return {
      text: 'Nurmaa was founded by passionate wellness enthusiasts in Chennai, India, with a mission to bring traditional, natural products to modern homes.'
    };
  }
  if (lower.includes('mission') || lower.includes('vision')) {
    return {
      text: 'Our mission is to promote holistic health through natural, sustainable, and effective products rooted in Indian tradition.'
    };
  }
  if (lower.includes('service') || lower.includes('customer support')) {
    return {
      text: 'We offer fast customer support via chat, WhatsApp, and email. For help, just ask here or contact us at call +91 8870261911.'
    };
  }
  if (lower.includes('shipping') || lower.includes('delivery')) {
    return {
      text: 'Shipping is free on all orders, no minimum required. We deliver across India in 3-5 business days. You will receive tracking details after your order is shipped.'
    };
  }
  if (lower.includes('return') || lower.includes('refund')) {
    return {
      text: 'We offer 7-day returns for unopened products. If you are not satisfied, contact us for a replacement or refund.'
    };
  }
  if (lower.includes('bulk') || lower.includes('gift') || lower.includes('corporate')) {
    return {
      text: 'Yes! We offer bulk, gifting, and corporate options with special packaging and pricing. Contact us for details.'
    };
  }
  if (lower.includes('testimonial') || lower.includes('review') || lower.includes('feedback')) {
    return {
      text: 'You can read real customer testimonials on our homepage and product pages. We value your feedback!'
    };
  }
  if (lower.includes('payment') || lower.includes('pay')) {
    return {
      text: 'We accept UPI, credit/debit cards, net banking, and cash on delivery.'
    };
  }
  if (lower.includes('contact') || lower.includes('reach')) {
    return {
      text: 'You can contact us via this chat, WhatsApp, or email support@nurmaa.com. Our support number is +91 8870261911.'
    };
  }
  if (lower.includes('whatsapp')) {
    return {
      text: 'You can reach us on WhatsApp for quick support and order updates at +91 8870261911.'
    };
  }
  if (lower.includes('location') || lower.includes('where are you')) {
    return {
      text: 'We are based in Nurmaa, Salem, TamilNadu - 636017, and ship our products all over the country.'
    };
  }
  if (lower.includes('subscribe') || lower.includes('newsletter')) {
    return {
      text: 'Subscribe to our newsletter on the website for updates on new products, offers, and wellness tips.'
    };
  }
  if (lower.includes('instagram') || lower.includes('social')) {
    return {
      text: 'Follow us on Instagram @nurmaa.in for updates, recipes, and wellness inspiration!'
    };
  }

  // Handle common queries directly
  const q = userInput.trim().toLowerCase();
  if (q === 'product details' || q.includes('product details')) {
    return {
      text: 'We offer two main product types:\n1. Skincare Products\n2. Food Products\nAsk about any category for more details!'
    };
  }
  if (q === 'ingredients' || q.includes('ingredients')) {
    return {
      text: 'Our products use natural, high-quality ingredients.\n- Skincare: Herbal extracts, cold-pressed oils, natural butters.\n- Food: Whole grains, seeds, nuts, natural sweeteners.\nAsk about a specific product for its ingredient list.'
    };
  }
  if (q === 'benefits' || q.includes('benefits')) {
    return {
      text: 'Benefits depend on the product.\n- Skincare: Nourishes, hydrates, and protects your skin.\n- Food: Provides essential nutrients, fiber, and energy.\nAsk about a specific product for detailed benefits.'
    };
  }
  if (q === 'recipes' || q.includes('recipes')) {
    return {
      text: 'We have easy recipes for our food products!\n- Granola: Enjoy with milk/yogurt or as a snack.\n- Ragi: Make porridge, dosa, or ladoo.\nAsk about a product for a specific recipe.'
    };
  }
  if (q === 'usage instructions' || q.includes('usage instructions') || q === 'usage' || q.includes('how to use')) {
    return {
      text: 'Usage instructions vary by product.\n- Skincare: Apply as directed, usually after cleansing.\n- Food: Follow package or ask for a recipe.\nAsk about a specific product for step-by-step usage.'
    };
  }
  if (q === 'orders & shipping' || q.includes('orders & shipping') || q.includes('order') || q.includes('shipping')) {
    return {
      text: 'Ordering is easy!\n- Place your order online.\n- Shipping is free across India.\n- Delivery in 3-5 business days.\nAsk about payment, returns, or tracking for more info.'
    };
  }
  // Default fallback
  return {
    text: "I'm here to help! Please ask about:\n- Product details\n- Ingredients\n- Benefits\n- Recipes\n- Usage instructions\n- Orders & shipping"
  };
}

function ChatMessage({ message, isUser }) {
  return (
    <div className={`mb-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-3 rounded-2xl max-w-[85%] shadow ${isUser ? 'bg-gradient-to-r from-[#FE49AF] to-[#121769] text-white' : 'bg-[#EBEBD3] text-[#121769] border border-[#FE49AF30]'}`}>
        {message.text.split('\n').map((line, i) => (
          <p key={i} className={i === 0 && !isUser ? 'font-medium' : ''}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I am Nurmaa Assistant 🤖. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is common breakpoint for mobile
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [messages, open]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    const botResponse = await fetchBotResponse(input);
    setMessages((prev) => [...prev, { from: 'bot', text: botResponse.text }]);
    setLoading(false);
  }

  // Don't render anything if it's mobile view
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#121769] to-[#FE49AF] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all animate-bounce"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-full bg-white rounded-2xl shadow-2xl flex flex-col border border-[#EBEBD3] overflow-hidden animate-fade-in" style={{ maxHeight: '70vh' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#121769] to-[#FE49AF] text-white p-4 flex items-center rounded-t-2xl shadow-md">
            <div className="w-3 h-3 rounded-full bg-white mr-2 animate-pulse"></div>
            <h3 className="font-semibold">Nurmaa Assistant</h3>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto p-1 rounded-full hover:bg-white/20"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-[#f8f9f0] via-[#f8f9f0] to-[#FE49AF10]">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} isUser={msg.from === 'user'} />
            ))}
            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="px-4 py-3 rounded-2xl max-w-[85%] bg-[#EBEBD3] text-[#FE49AF] italic animate-pulse">Nurmaa is typing…</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
          <form onSubmit={handleSend} className="border-t border-[#EBEBD3] p-3 bg-white rounded-b-2xl">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-[#FE49AF] focus:outline-none focus:ring-2 focus:ring-[#FE49AF] focus:border-transparent bg-[#f8f9f0]"
                autoFocus
                disabled={loading}
              />
              <button
                type="submit"
                className="ml-2 p-2 text-[#FE49AF] hover:text-[#121769] transition-colors"
                aria-label="Send message"
                disabled={loading}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
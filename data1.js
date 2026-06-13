/**
 * ═══════════════════════════════════════════════════════════
 *  ملف البيانات — تم إنشاؤه من لوحة التحكم Admin Panel
 *  Restaurant: بيتزا لذة الملوك
 * ═══════════════════════════════════════════════════════════
 */

const MENU_DATA = {
  restaurant: {
    name: "بيتزا لذة الملوك",
    nameEn: "Pizza Lazat Al-Molouk",
    welcome: "فطائر - بيتزا - باستا",
    tagline: "لما البيتزا تبقى تحفة فنية مش مجرد أكلة",
    logo: "D:menu fassetslogoWhatsApp Image 2026-06-13 at 9.41.01 PM.jpeg",
    phones: ["01034356136", "01123889069", "01034352138"],
    address: "سوق المنطقة السابعة بجوار ماركت أبو غزالة",
    deliveryNote: "أسرع دليفرى في مصر",
  },
  categories: [
    {
      id: "crepe-savory",
      name: "Crepe (Savory)",
      nameAr: "كريب حادق",
      items: [
        { id: "cs-1", name: "سجق", nameEn: "Sausage", description: "موتزاريلا وخضار", price: 200, image: "assets/images/crepe-sausage.jpg" },
        { id: "cs-2", name: "برجر لحمة", nameEn: "Beef Burger", description: "موتزاريلا وخضار", price: 100, image: "assets/images/crepe-burger.jpg" },
        { id: "cs-3", name: "سوسيس", nameEn: "Hot Dog", description: "موتزاريلا وخضار", price: 100, image: "assets/images/crepe-hotdog.jpg" },
        { id: "cs-4", name: "فراخ باربيكيو", nameEn: "BBQ Chicken", description: "فراخ، مشروم، صوص باربيكيو", price: 110, image: "assets/images/crepe-bbq.jpg" },
        { id: "cs-5", name: "فاهيتا فراخ", nameEn: "Chicken Fajita", description: "موتزاريلا وخضار", price: 100, image: "assets/images/crepe-fajita.jpg" },
        { id: "cs-6", name: "مشكل لحوم", nameEn: "Meat Mix", description: "مفروم، سجق، بسطرمة", price: 110, image: "assets/images/crepe-meat-mix.jpg" },
        { id: "cs-7", name: "مشكل جبن", nameEn: "Cheese Mix", description: "موتزاريلا، رومي، شيدر، كيري", price: 100, image: "assets/images/crepe-cheese-mix.jpg" },
        { id: "cs-8", name: "بانية", nameEn: "Pane", description: "موتزاريلا وخضار", price: 110, image: "assets/images/crepe-pane.jpg" },
        { id: "cs-9", name: "كريسبي أطياب", nameEn: "Atyab Crispy", description: "موتزاريلا وخضار", price: 85, image: "assets/images/crepe-crispy.jpg" },
        { id: "cs-10", name: "بطاطس", nameEn: "Fries", description: "", price: 55, image: "assets/images/crepe-fries.jpg" },
        { id: "cs-11", name: "بطاطس كريسبي", nameEn: "Crispy Fries", description: "", price: 70, image: "assets/images/crepe-crispy-fries.jpg" },
        { id: "cs-12", name: "مكس فراخ", nameEn: "Chicken Mix", description: "فراخ متبلة، كريسبي، بانية", price: 110, image: "assets/images/crepe-chicken-mix.jpg" },
        { id: "cs-13", name: "سوبر كرانشي", nameEn: "Super Crunchy", description: "كريسبي، سجق، شيدر", price: 110, image: "assets/images/crepe-super-crunchy.jpg" },
        { id: "cs-14", name: "قنبلة", nameEn: "The Bomb", description: "مشكل لحوم، مشكل جبن، كريسبي", price: 120, image: "assets/images/crepe-bomb.jpg" },
        { id: "cs-15", name: "استربس", nameEn: "Strips", description: "موتزاريلا وخضار", price: 110, image: "assets/images/crepe-strips.jpg" },
        { id: "cs-16", name: "كريب الباتشينو", nameEn: "Al Pacino Crepe", description: "تركي، سلامي، كيري، رانش", price: 130, image: "assets/images/crepe-alpacino.jpg" },
        { id: "cs-17", name: "كريب بسطرمة", nameEn: "Pastrami Crepe", description: "موتزاريلا وخضار", price: 110, image: "assets/images/crepe-pastrami.jpg" },
        { id: "cs-18", name: "كريب لذة الملوك", nameEn: "Lazat Al-Molouk Crepe", description: "تركي، استربس، كريسبي، كيري، سجق، رومي، بطاطس، موتزاريلا", price: 180, image: "assets/images/crepe-special.jpg" }
      ],
    },
    {
      id: "crepe-sweet",
      name: "Crepe (Sweet)",
      nameAr: "كريب حلو",
      items: [
        { id: "cw-1", name: "شيكولاته وموز وبندق", nameEn: "Chocolate Banana Hazelnut", description: "", price: 80, image: "assets/images/crepe-sweet-choco.jpg" },
        { id: "cw-2", name: "بوريو", nameEn: "Oreo", description: "", price: 70, image: "assets/images/crepe-oreo.jpg" },
        { id: "cw-3", name: "هوهوز", nameEn: "Hohos", description: "", price: 70, image: "assets/images/crepe-hohos.jpg" }
      ],
    },
    {
      id: "pizza",
      name: "Pizza",
      nameAr: "البيتزا",
      note: "يوجد بيتزا حشو أطراف — سوسيس أو موتزاريلا",
      items: [
        { id: "pz-1", name: "مارجريتا", nameEn: "Margherita", description: "موتزاريلا، صوص، خضار", prices: { L: 200, M: 140, S: 90 }, image: "assets/images/pizza-margherita.jpg" },
        { id: "pz-2", name: "تشيكن باربيكيو", nameEn: "Chicken BBQ", description: "فراخ، مشروم، موتزاريلا، صوص باربيكيو", prices: { L: 240, M: 180, S: 110 }, image: "assets/images/pizza-bbq.jpg" },
        { id: "pz-3", name: "كريزي تشيكن", nameEn: "Crazy Chicken", description: "فراخ، مشروم، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 100 }, image: "assets/images/pizza-crazy-chicken.jpg" },
        { id: "pz-4", name: "تونة", nameEn: "Tuna", description: "تونة، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/pizza-tuna.jpg" },
        { id: "pz-5", name: "جمبري", nameEn: "Shrimp", description: "جمبري، موتزاريلا، خضار", prices: { L: 260, M: 200, S: 150 }, image: "assets/images/pizza-shrimp.jpg" },
        { id: "pz-6", name: "فواكه البحر", nameEn: "Seafood", description: "جمبري، كالاماري، تونة، خضار", prices: { L: 270, M: 220, S: 160 }, image: "assets/images/pizza-seafood.jpg" },
        { id: "pz-7", name: "تريبيانا BBQ", nameEn: "Tribiana BBQ", description: "سجق، مشروم، موتزاريلا، صوص بارد", prices: { L: 230, M: 150, S: 110 }, image: "assets/images/pizza-tribiana.jpg" },
        { id: "pz-8", name: "فراخ رانش", nameEn: "Chicken Ranch", description: "فراخ، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 115 }, image: "assets/images/pizza-ranch.jpg" },
        { id: "pz-9", name: "كواترو فور ماجيو", nameEn: "Quattro Formaggi", description: "صوص، خضار، 4 أنواع جبن", prices: { L: 230, M: 150, S: 100 }, image: "assets/images/pizza-quattro.jpg" },
        { id: "pz-10", name: "فور تشيز", nameEn: "Four Cheese", description: "كيري، موتزاريلا، شيدر، رومي، زيتون", prices: { L: 230, M: 150, S: 100 }, image: "assets/images/pizza-four-cheese.jpg" },
        { id: "pz-11", name: "فونجي", nameEn: "Funghi", description: "مشروم، موتزاريلا، خضار", prices: { L: 230, M: 160, S: 100 }, image: "assets/images/pizza-funghi.jpg" },
        { id: "pz-12", name: "بيبروني", nameEn: "Pepperoni", description: "بيبروني، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/pizza-pepperoni.jpg" },
        { id: "pz-13", name: "سلامي", nameEn: "Salami", description: "سلامي، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/pizza-salami.jpg" },
        { id: "pz-14", name: "سجق", nameEn: "Sojouk", description: "سجق، موتزاريلا، خضار", prices: { L: 230, M: 160, S: 100 }, image: "assets/images/pizza-sojouk.jpg" },
        { id: "pz-15", name: "بلونيز", nameEn: "Bolognese", description: "مفروم، موتزاريلا، خضار", prices: { L: 230, M: 160, S: 100 }, image: "assets/images/pizza-bolognese.jpg" },
        { id: "pz-16", name: "فينسيا", nameEn: "Venice", description: "بسطرمة، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 105 }, image: "assets/images/pizza-venice.jpg" },
        { id: "pz-17", name: "ميكس لحوم", nameEn: "Meat Mix", description: "مفروم، سجق، بسطرمة، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/pizza-meat-mix.jpg" },
        { id: "pz-18", name: "سوبر سوبريم", nameEn: "Super Supreme", description: "بسطرمة، سلامي، مشروم، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/pizza-supreme.jpg" },
        { id: "pz-19", name: "سوبر بيف", nameEn: "Super Beef", description: "مفروم، سوسيس، سلامي، موتزاريلا، خضار", prices: { L: 220, M: 160, S: 110 }, image: "assets/images/pizza-super-beef.jpg" },
        { id: "pz-20", name: "شيكاغو", nameEn: "Chicago", description: "مفروم، سوسيس، موتزاريلا، خضار", prices: { L: 230, M: 160, S: 100 }, image: "assets/images/pizza-chicago.jpg" },
        { id: "pz-21", name: "سوسيس", nameEn: "Hot Dog", description: "سوسيس، موتزاريلا، خضار", prices: { L: 220, M: 160, S: 100 }, image: "assets/images/pizza-hotdog.jpg" },
        { id: "pz-22", name: "لذة الملوك", nameEn: "Kings Delight", description: "مشكل جبن، مشكل لحوم، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/pizza-kings.jpg" },
        { id: "pz-23", name: "الباتشينو", nameEn: "Al Pacino", description: "تركي، كيري، فراخ، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/pizza-alpacino.jpg" },
        { id: "pz-24", name: "حلواني", nameEn: "Halawani", description: "تركي، سلامي، موتزاريلا، خضار", prices: { L: 240, M: 180, S: 100 }, image: "assets/images/pizza-halawani.jpg" },
        { id: "pz-25", name: "سموك ترك", nameEn: "Smoked Turkey", description: "تركي مدخن، موتزاريلا، خضار", prices: { L: 230, M: 160, S: 100 }, image: "assets/images/pizza-smoked-turkey.jpg" },
        { id: "pz-26", name: "بيتزا فراخ", nameEn: "Chicken Pizza", description: "فراخ، موتزاريلا، خضار", prices: { L: 230, M: 170, S: 100 }, image: "assets/images/pizza-chicken.jpg" },
        { id: "pz-27", name: "حشو أطراف", nameEn: "Stuffed Crust", description: "سوسيس أو موتزاريلا", prices: { L: 100, M: 80, S: 55 }, image: "assets/images/pizza-stuffed-crust.jpg" }
      ],
    },
    {
      id: "savory-feteer",
      name: "Savory Feteer",
      nameAr: "الفطير الحادق",
      items: [
        { id: "sf-1", name: "جبنة رومي", nameEn: "Roumi Cheese", description: "رومي، خضار، موتزاريلا", prices: { L: 210, M: 170, S: 110 }, image: "assets/images/feteer-roumi.jpg" },
        { id: "sf-2", name: "جبنة موتزاريلا", nameEn: "Mozzarella", description: "موتزاريلا، خضار، رومي", prices: { L: 210, M: 170, S: 110 }, image: "assets/images/feteer-mozzarella.jpg" },
        { id: "sf-3", name: "جبنة كيري", nameEn: "Kiri Cheese", description: "كيري، خضار، موتزاريلا", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/feteer-kiri.jpg" },
        { id: "sf-4", name: "مشكل جبن", nameEn: "Mixed Cheese", description: "كيري، شيدر، رومي، خضار، موتزاريلا", prices: { L: 240, M: 180, S: 120 }, image: "assets/images/feteer-cheese-mix.jpg" },
        { id: "sf-5", name: "سوسيس", nameEn: "Hot Dog", description: "سوسيس، خضار، موتزاريلا", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/feteer-hotdog.jpg" },
        { id: "sf-6", name: "مفروم", nameEn: "Minced Meat", description: "مفروم، خضار، موتزاريلا", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/feteer-minced.jpg" },
        { id: "sf-7", name: "سجق بلدي", nameEn: "Baladi Sausage", description: "سجق، خضار، موتزاريلا", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/feteer-sojouk.jpg" },
        { id: "sf-8", name: "بسطرمة", nameEn: "Pastrami", description: "بسطرمة، خضار، موتزاريلا", prices: { L: 230, M: 170, S: 120 }, image: "assets/images/feteer-pastrami.jpg" },
        { id: "sf-9", name: "مشكل لحوم", nameEn: "Mixed Meat", description: "مفروم، سجق، بسطرمة، خضار", prices: { L: 240, M: 170, S: 120 }, image: "assets/images/feteer-meat-mix.jpg" },
        { id: "sf-10", name: "سلامي", nameEn: "Salami", description: "سلامي، خضار، موتزاريلا", prices: { L: 230, M: 170, S: 110 }, image: "assets/images/feteer-salami.jpg" },
        { id: "sf-11", name: "سجق والجبنة الكيري", nameEn: "Sojouk and Kiri", description: "سجق، كيري، رومي، خضار، موتزاريلا", prices: { L: 240, M: 180, S: 120 }, image: "assets/images/feteer-sojouk-kiri.jpg" },
        { id: "sf-12", name: "الباتشينو", nameEn: "Al Pacino", description: "تركي، كيري، فراخ، خضار، موتزاريلا", prices: { L: 240, M: 180, S: 120 }, image: "assets/images/feteer-alpacino.jpg" },
        { id: "sf-13", name: "ديك رومي", nameEn: "Turkey", description: "تركي، خضار، موتزاريلا", prices: { L: 240, M: 170, S: 110 }, image: "assets/images/feteer-turkey.jpg" },
        { id: "sf-14", name: "دجاج", nameEn: "Chicken", description: "فراخ متبلة، خضار، موتزاريلا", prices: { L: 240, M: 170, S: 120 }, image: "assets/images/feteer-chicken.jpg" },
        { id: "sf-15", name: "ميكس فراخ", nameEn: "Chicken Mix", description: "ميكس فراخ، خضار، موتزاريلا", prices: { L: 240, M: 170, S: 120 }, image: "assets/images/feteer-chicken-mix.jpg" },
        { id: "sf-16", name: "مشروم", nameEn: "Mushroom", description: "مشروم، خضار، موتزاريلا", prices: { L: 220, M: 160, S: 110 }, image: "assets/images/feteer-mushroom.jpg" },
        { id: "sf-17", name: "تونة", nameEn: "Tuna", description: "تونة، خضار، موتزاريلا", prices: { L: 240, M: 170, S: 120 }, image: "assets/images/feteer-tuna.jpg" },
        { id: "sf-18", name: "جمبري", nameEn: "Shrimp", description: "جمبري، خضار، موتزاريلا", prices: { L: 260, M: 210, S: 150 }, image: "assets/images/feteer-shrimp.jpg" },
        { id: "sf-19", name: "فواكه البحر", nameEn: "Seafood", description: "جمبري، كالاماري، تونة، خضار، موتزاريلا", prices: { L: 270, M: 220, S: 160 }, image: "assets/images/feteer-seafood.jpg" },
        { id: "sf-20", name: "لذة الملوك", nameEn: "Kings Delight", description: "سلامي، بسطرمة، روست بيف، تركي، كيري", prices: { L: 250, M: 180, S: 150 }, image: "assets/images/feteer-kings.jpg" },
        { id: "sf-21", name: "قنبلة", nameEn: "The Bomb", description: "مفروم، سجق، بسطرمة، كيري، شيدر، رومي", prices: { L: 240, M: 180, S: 120 }, image: "assets/images/feteer-bomb.jpg" },
        { id: "sf-22", name: "بسطرمة كريانا", nameEn: "Pastrami Kiriana", description: "بسطرمة، كيري، شيدر، رومي، خضار، موتزاريلا", prices: { L: 240, M: 180 }, image: "assets/images/feteer-pastrami-kiriana.jpg" }
      ],
    },
    {
      id: "sweet-feteer",
      name: "Sweet Feteer",
      nameAr: "الفطير الحلو",
      items: [
        { id: "swf-1", name: "سكر", nameEn: "Sugar", description: "سكر، لبن، سمن", prices: { L: 120, M: 60 }, image: "assets/images/feteer-sweet-sugar.jpg" },
        { id: "swf-2", name: "كاستر", nameEn: "Custard", description: "كاسترد، سكر، لبن، سمن", prices: { L: 130, M: 70 }, image: "assets/images/feteer-custard.jpg" },
        { id: "swf-3", name: "بغاشة بالقرفة", nameEn: "Cinnamon Baghasha", description: "قرفة، سكر، لبن، سمن", prices: { L: 130, M: 75 }, image: "assets/images/feteer-cinnamon.jpg" },
        { id: "swf-4", name: "قشطة", nameEn: "Cream", description: "قشطة، كاسترد، سكر، لبن، سمن", prices: { L: 150, M: 120 }, image: "assets/images/feteer-cream.jpg" },
        { id: "swf-5", name: "ملوكي", nameEn: "Royal", description: "زبيب، جوز هند، كاسترد، سكر، لبن، سمن", prices: { L: 140, M: 95 }, image: "assets/images/feteer-royal.jpg" },
        { id: "swf-6", name: "موز", nameEn: "Banana", description: "موز، كاسترد، سكر، لبن، سمن", prices: { L: 140, M: 100 }, image: "assets/images/feteer-banana.jpg" },
        { id: "swf-7", name: "تفاح", nameEn: "Apple", description: "تفاح، كاسترد، سكر، لبن، سمن", prices: { L: 150, M: 110 }, image: "assets/images/feteer-apple.jpg" },
        { id: "swf-8", name: "مربى وقشطة", nameEn: "Jam and Cream", description: "مربى، عسل، قشطة، كاسترد، سكر، لبن، سمن", prices: { L: 150, M: 120 }, image: "assets/images/feteer-jam-cream.jpg" },
        { id: "swf-9", name: "اسكندرية", nameEn: "Alexandria", description: "قشطة، عسل، كرز، كاسترد، سكر، لبن، سمن", prices: { L: 180, M: 140 }, image: "assets/images/feteer-alexandria.jpg" },
        { id: "swf-10", name: "شيكولاته بالموز", nameEn: "Chocolate Banana", description: "شيكولاته، موز، بندق، كاسترد، سكر، لبن، سمن", prices: { L: 250, M: 180 }, image: "assets/images/feteer-choco-banana.jpg" },
        { id: "swf-11", name: "شيكولاته ميكس", nameEn: "Mixed Chocolate", description: "شيكولاته، شيكولاته بيضاء، كاسترد، سكر، لبن", prices: { L: 230, M: 165 }, image: "assets/images/feteer-choco-mix.jpg" },
        { id: "swf-12", name: "بلاك فورست", nameEn: "Black Forest", description: "نصف شيكولاته، نصف فواكه، مكسرات", prices: { L: 240, M: 170 }, image: "assets/images/feteer-black-forest.jpg" },
        { id: "swf-13", name: "فروتي", nameEn: "Fruity", description: "فواكه مشكلة، قشطة، عسل، كرز", prices: { L: 180, M: 140 }, image: "assets/images/feteer-fruity.jpg" },
        { id: "swf-14", name: "بسبوسة أو كنافة", nameEn: "Basbousa or Kunafa", description: "بسبوسة أو كنافة، كاسترد، سكر، لبن، سمن", prices: { L: 180, M: 120 }, image: "assets/images/feteer-basbousa.jpg" }
      ],
    },
    {
      id: "sawarekh",
      name: "Sawarekh",
      nameAr: "صاروخ",
      items: [
        { id: "sw-1", name: "صاروخ سجق", nameEn: "Sojouk Sarokh", description: "", prices: { L: 150, M: 110 }, image: "assets/images/sarokh-sojouk.jpg" },
        { id: "sw-2", name: "صاروخ لحمة", nameEn: "Meat Sarokh", description: "", prices: { L: 150, M: 110 }, image: "assets/images/sarokh-meat.jpg" },
        { id: "sw-3", name: "صاروخ سوسيس", nameEn: "Hot Dog Sarokh", description: "", prices: { L: 150, M: 110 }, image: "assets/images/sarokh-hotdog.jpg" },
        { id: "sw-4", name: "صاروخ سجق كيري", nameEn: "Sojouk Kiri Sarokh", description: "", prices: { L: 150, M: 120 }, image: "assets/images/sarokh-sojouk-kiri.jpg" },
        { id: "sw-5", name: "صاروخ فراخ", nameEn: "Chicken Sarokh", description: "", prices: { L: 160, M: 120 }, image: "assets/images/sarokh-chicken.jpg" },
        { id: "sw-6", name: "صاروخ بسطرمة كيري", nameEn: "Pastrami Kiri Sarokh", description: "", prices: { L: 160, M: 120 }, image: "assets/images/sarokh-pastrami-kiri.jpg" },
        { id: "sw-7", name: "صاروخ سوبر سوبريم", nameEn: "Super Supreme Sarokh", description: "", prices: { L: 160, M: 120 }, image: "assets/images/sarokh-supreme.jpg" },
        { id: "sw-8", name: "صاروخ لذة الملوك", nameEn: "Kings Delight Sarokh", description: "", prices: { L: 160, M: 120 }, image: "assets/images/sarokh-kings.jpg" }
      ],
    },
    {
      id: "sandwiches",
      name: "Sandwiches",
      nameAr: "الساندوتشات",
      items: [
        { id: "sn-1", name: "سجق", nameEn: "Sausage", description: "", prices: { L: 70, M: 45, S: 50 }, image: "assets/images/sandwich-sausage.jpg" },
        { id: "sn-2", name: "فاهيتا فراخ", nameEn: "Chicken Fajita", description: "", prices: { L: 75, M: 55, S: 60 }, image: "assets/images/sandwich-fajita.jpg" },
        { id: "sn-3", name: "فراخ بانية", nameEn: "Pane Chicken", description: "", prices: { L: 65, M: 40, S: 45 }, image: "assets/images/sandwich-pane.jpg" },
        { id: "sn-4", name: "ستربس", nameEn: "Strips", description: "", prices: { L: 75, M: 55, S: 60 }, image: "assets/images/sandwich-strips.jpg" },
        { id: "sn-5", name: "بطاطس", nameEn: "Fries", description: "", prices: { L: 50, M: 35, S: 40 }, image: "assets/images/sandwich-fries.jpg" },
        { id: "sn-6", name: "كبدة إسكندراني", nameEn: "Alexandrian Liver", description: "", prices: { L: 60, M: 40, S: 45 }, image: "assets/images/sandwich-liver.jpg" },
        { id: "sn-7", name: "كفتة", nameEn: "Kofta", description: "", prices: { L: 70, M: 50, S: 55 }, image: "assets/images/sandwich-kofta.jpg" }
      ],
    },
    {
      id: "meals",
      name: "Meals",
      nameAr: "الوجبات",
      items: [
        { id: "ml-1", name: "وجبة فرخة مشوية", nameEn: "Grilled Chicken Meal", description: "", price: 400, image: "assets/images/meal-grilled-chicken.jpg" },
        { id: "ml-2", name: "وجبة ربع فراخ", nameEn: "Quarter Chicken Meal", description: "", price: 110, image: "assets/images/meal-quarter-chicken.jpg" },
        { id: "ml-3", name: "وجبة نص فراخ", nameEn: "Half Chicken Meal", description: "", price: 200, image: "assets/images/meal-half-chicken.jpg" },
        { id: "ml-4", name: "وجبة ربع كفتة", nameEn: "Quarter Kofta Meal", description: "", price: 110, image: "assets/images/meal-quarter-kofta.jpg" },
        { id: "ml-5", name: "وجبة نص كفتة", nameEn: "Half Kofta Meal", description: "", price: 200, image: "assets/images/meal-half-kofta.jpg" },
        { id: "ml-6", name: "كيلو كفتة", nameEn: "Kilo Kofta", description: "", price: 400, image: "assets/images/meal-kilo-kofta.jpg" },
        { id: "ml-7", name: "ساندوتش كفتة عيش بلدي", nameEn: "Kofta Baladi Sandwich", description: "", price: 30, image: "assets/images/meal-kofta-baladi.jpg" },
        { id: "ml-8", name: "ساندوتش كبدة عيش بلدي", nameEn: "Liver Baladi Sandwich", description: "", price: 30, image: "assets/images/meal-liver-baladi.jpg" }
      ],
    },
    {
      id: "pasta",
      name: "Pasta",
      nameAr: "الباستا",
      items: [
        { id: "pa-1", name: "اسباجيتي بالصوص والخضار", nameEn: "Spaghetti with Sauce", description: "", price: 75, image: "assets/images/pasta-spaghetti-veg.jpg" },
        { id: "pa-2", name: "مكرونة فرن", nameEn: "Oven Pasta", description: "لحوم، صوص، موتزاريلا", price: 110, image: "assets/images/pasta-oven.jpg" },
        { id: "pa-3", name: "باستا مشروم", nameEn: "Mushroom Pasta", description: "", price: 110, image: "assets/images/pasta-mushroom.jpg" },
        { id: "pa-4", name: "اسباجيتي بلونيز", nameEn: "Spaghetti Bolognese", description: "", price: 110, image: "assets/images/pasta-bolognese.jpg" },
        { id: "pa-5", name: "اسباجيتي إسكندراني", nameEn: "Alexandrian Spaghetti", description: "سجق، خضار، جبنة رومي", price: 110, image: "assets/images/pasta-alexandrian.jpg" },
        { id: "pa-6", name: "باستا سوسيس", nameEn: "Sausage Pasta", description: "", price: 110, image: "assets/images/pasta-sausage.jpg" },
        { id: "pa-7", name: "باستا سجق", nameEn: "Sojouk Pasta", description: "", price: 110, image: "assets/images/pasta-sojouk.jpg" },
        { id: "pa-8", name: "باستا مشكل لحوم", nameEn: "Meat Mix Pasta", description: "", price: 125, image: "assets/images/pasta-meat-mix.jpg" },
        { id: "pa-9", name: "باستا مشكل جبن", nameEn: "Cheese Mix Pasta", description: "", price: 115, image: "assets/images/pasta-cheese-mix.jpg" },
        { id: "pa-10", name: "نجرسكو فراخ", nameEn: "Chicken Negresco", description: "", price: 120, image: "assets/images/pasta-negresco.jpg" },
        { id: "pa-11", name: "باستا بصدور الديك الرومي", nameEn: "Turkey Breast Pasta", description: "", price: 125, image: "assets/images/pasta-turkey.jpg" },
        { id: "pa-12", name: "باستا ميكس فراخ", nameEn: "Chicken Mix Pasta", description: "", price: 130, image: "assets/images/pasta-chicken-mix.jpg" },
        { id: "pa-13", name: "وايت شريمب", nameEn: "White Shrimp", description: "جمبري، بيني، صوص كريمة", price: 160, image: "assets/images/pasta-white-shrimp.jpg" },
        { id: "pa-14", name: "اسباجيتي جمبري", nameEn: "Shrimp Spaghetti", description: "", price: 150, image: "assets/images/pasta-shrimp.jpg" },
        { id: "pa-15", name: "اسباجيتي فواكه البحر", nameEn: "Seafood Spaghetti", description: "جمبري، كالاماري، خضار", price: 160, image: "assets/images/pasta-seafood.jpg" }
      ],
    },
    {
      id: "alexandrian-hawawshi",
      name: "Alexandrian Hawawshi",
      nameAr: "حواوشي إسكندراني",
      items: [
        { id: "hw-1", name: "حواوشي إسكندراني (لحمة أو سجق)", nameEn: "Meat or Sojouk", description: "", prices: { L: 75, M: 50 }, image: "assets/images/hawawshi-regular.jpg" },
        { id: "hw-2", name: "حواوشي إسكندراني مخصوص", nameEn: "Special Hawawshi", description: "مع موتزاريلا", prices: { L: 80, M: 60 }, image: "assets/images/hawawshi-special.jpg" },
        { id: "hw-3", name: "حواوشي عيش بلدي", nameEn: "Baladi Bread Hawawshi", description: "", price: 30, image: "assets/images/hawawshi-baladi.jpg" }
      ],
    },
    {
      id: "calzone",
      name: "Calzone",
      nameAr: "كالزوني",
      items: [
        { id: "cz-1", name: "فراخ", nameEn: "Chicken", description: "", price: 100, image: "assets/images/calzone-chicken.jpg" },
        { id: "cz-2", name: "لحمة", nameEn: "Meat", description: "", price: 100, image: "assets/images/calzone-meat.jpg" },
        { id: "cz-3", name: "سوسيس", nameEn: "Hot Dog", description: "", price: 100, image: "assets/images/calzone-hotdog.jpg" },
        { id: "cz-4", name: "سجق", nameEn: "Sojouk", description: "", price: 100, image: "assets/images/calzone-sojouk.jpg" },
        { id: "cz-5", name: "ميكس لحوم", nameEn: "Meat Mix", description: "", price: 110, image: "assets/images/calzone-meat-mix.jpg" }
      ],
    },
    {
      id: "additions",
      name: "Additions",
      nameAr: "الإضافات",
      items: [
        { id: "ad-1", name: "جبنة", nameEn: "Cheese", description: "", prices: { L: 40, M: 30, S: 20 }, image: "assets/images/add-cheese.jpg" },
        { id: "ad-2", name: "لحوم", nameEn: "Meats", description: "", prices: { L: 40, M: 30, S: 20 }, image: "assets/images/add-meats.jpg" },
        { id: "ad-3", name: "أسماك", nameEn: "Fish", description: "", price: 50, image: "assets/images/add-fish.jpg" },
        { id: "ad-4", name: "بطاطس", nameEn: "Fries", description: "", price: 10, image: "assets/images/add-fries.jpg" }
      ],
    },
    {
      id: "appetizers",
      name: "Appetizers",
      nameAr: "المقبلات",
      items: [
        { id: "ap-1", name: "كلوسلو", nameEn: "Coleslaw", description: "", price: 25, image: "assets/images/app-coleslaw.jpg" },
        { id: "ap-2", name: "سلطة خضراء", nameEn: "Green Salad", description: "", price: 10, image: "assets/images/app-salad.jpg" },
        { id: "ap-3", name: "بوم فريت", nameEn: "Pomme Frites", description: "", prices: { L: 50, M: 30 }, image: "assets/images/app-fries.jpg" },
        { id: "ap-4", name: "عيش بالثوم", nameEn: "Garlic Bread", description: "", price: 25, image: "assets/images/app-garlic-bread.jpg" }
      ],
    },
    {
      id: "meshaltet",
      name: "Meshaltet",
      nameAr: "مشلتت",
      items: [
        { id: "ms-1", name: "مشلتت سادة", nameEn: "Plain Meshaltet", description: "", prices: { L: 200, M: 150 }, image: "assets/images/meshaltet-plain.jpg" },
        { id: "ms-2", name: "مشلتت ست الحسن", nameEn: "Set El Hosn Meshaltet", description: "اسأل عن السعر", image: "assets/images/meshaltet-set-el-hosn.jpg" }
      ],
    }
  ],
};

const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/201034356136",
  facebook: " https://www.facebook.com/share/1EJoeVnCjk/?mibextid=wwXIfr",
};
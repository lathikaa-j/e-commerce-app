require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

const products = [

/* =========================
   📱 ELECTRONICS (15)
========================= */

{
  title: "Ergonomic Wireless Mouse",
  description: "Comfortable wireless mouse for daily productivity.",
  price: 999,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
  stock: 20,
},
{
  title: "Mechanical Keyboard",
  description: "RGB mechanical keyboard with tactile switches.",
  price: 2999,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
  stock: 15,
},
{
  title: "Bluetooth Speaker",
  description: "Portable speaker with powerful bass.",
  price: 2499,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
  stock: 10,
},
{
  title: "Smart Watch",
  description: "Fitness tracking and notifications on wrist.",
  price: 4999,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  stock: 12,
},
{
  title: "Noise Cancelling Headphones",
  description: "Premium over-ear wireless headphones.",
  price: 6999,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  stock: 8,
},
{
  title: "USB-C Fast Charger",
  description: "Quick charge adapter for all devices.",
  price: 799,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?auto=format&fit=crop&w=800&q=80",
  stock: 30,
},
{
  title: "Webcam HD 1080p",
  description: "High-quality webcam for meetings and streaming.",
  price: 1899,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=800&q=80",
  stock: 18,
},
{
  title: "Laptop Cooling Pad",
  description: "Multi-fan cooling stand for laptops.",
  price: 1499,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=800&q=80",
  stock: 14,
},
{
  title: "External SSD 1TB",
  description: "High-speed portable storage device.",
  price: 6999,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80",
  stock: 10,
},
{
  title: "Wireless Router",
  description: "High-speed dual band WiFi router.",
  price: 2499,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=800&q=80",
  stock: 16,
},
{
  title: "Smart LED Bulb",
  description: "WiFi controlled color changing bulb.",
  price: 599,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
  stock: 40,
},
{
  title: "Power Bank 20000mAh",
  description: "High capacity fast charging power bank.",
  price: 1999,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
  stock: 25,
},
{
  title: "Bluetooth Earbuds",
  description: "Compact wireless earbuds with case.",
  price: 1499,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
  stock: 22,
},
{
  title: "Smart TV Remote",
  description: "Universal smart TV remote controller.",
  price: 699,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
  stock: 35,
},
{
  title: "Gaming Monitor",
  description: "144Hz high refresh rate display.",
  price: 12999,
  category: "electronics",
  image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80",
  stock: 7,
},

/* =========================
   👕 FASHION (15)
========================= */

{
  title: "Denim Jacket",
  description: "Classic stylish denim jacket.",
  price: 1999,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  stock: 25,
},
{
  title: "Oversized Hoodie",
  description: "Comfortable streetwear hoodie.",
  price: 1499,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
  stock: 30,
},
{
  title: "White Sneakers",
  description: "Minimal everyday sneakers.",
  price: 3499,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  stock: 18,
},
{
  title: "Travel Backpack",
  description: "Durable backpack with laptop space.",
  price: 1799,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  stock: 20,
},
{
  title: "Casual T-Shirt",
  description: "Soft cotton everyday wear.",
  price: 599,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  stock: 50,
},
{
  title: "Slim Fit Jeans",
  description: "Modern stretchable jeans.",
  price: 1599,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
  stock: 28,
},
{
  title: "Formal Shirt",
  description: "Office wear premium shirt.",
  price: 1299,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
  stock: 22,
},
{
  title: "Leather Belt",
  description: "Classic brown leather belt.",
  price: 699,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
  stock: 40,
},
{
  title: "Sunglasses",
  description: "UV protected stylish sunglasses.",
  price: 999,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  stock: 35,
},
{
  title: "Wrist Watch",
  description: "Elegant analog wrist watch.",
  price: 2499,
  category: "fashion",
  image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
  stock: 15,
},

/* =========================
   📚 BOOKS (15)
========================= */

{
  title: "Atomic Habits",
  description: "Build better habits easily.",
  price: 499,
  category: "books",
  image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
  stock: 40,
},
{
  title: "Deep Work",
  description: "Focus deeply and work efficiently.",
  price: 450,
  category: "books",
  image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  stock: 25,
},
{
  title: "Clean Code",
  description: "Programming best practices.",
  price: 699,
  category: "books",
  image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
  stock: 20,
},
{
  title: "Rich Dad Poor Dad",
  description: "Financial mindset classic.",
  price: 399,
  category: "books",
  image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=800&q=80",
  stock: 30,
},
{
  title: "Zero to One",
  description: "Startup growth insights.",
  price: 499,
  category: "books",
  image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",
  stock: 22,
},
{
  title: "Psychology of Money",
  description: "Understanding wealth behavior.",
  price: 499,
  category: "books",
  image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
  stock: 28,
},
{
  title: "Think and Grow Rich",
  description: "Classic success principles.",
  price: 350,
  category: "books",
  image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80",
  stock: 35,
},
{
  title: "The Alchemist",
  description: "Inspirational fiction novel.",
  price: 299,
  category: "books",
  image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80",
  stock: 45,
},
{
  title: "You Can Win",
  description: "Motivational success guide.",
  price: 399,
  category: "books",
  image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
  stock: 30,
},
{
  title: "Harry Potter",
  description: "Fantasy adventure series.",
  price: 599,
  category: "books",
  image: "https://images.unsplash.com/photo-1529590003495-b2646e2718bf?auto=format&fit=crop&w=800&q=80",
  stock: 50,
},
{
  title: "Sherlock Holmes",
  description: "Detective mystery stories.",
  price: 450,
  category: "books",
  image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800&q=80",
  stock: 40,
},
{
  title: "Ikigai",
  description: "Japanese philosophy of life.",
  price: 399,
  category: "books",
  image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
  stock: 32,
},
{
  title: "The Subtle Art",
  description: "Life advice book.",
  price: 499,
  category: "books",
  image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
  stock: 27,
},
{
  title: "Start With Why",
  description: "Leadership insights.",
  price: 550,
  category: "books",
  image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&w=800&q=80",
  stock: 20,
},
{
  title: "Richest Man in Babylon",
  description: "Financial wisdom classic.",
  price: 350,
  category: "books",
  image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  stock: 38,
},

/* =========================
   🎮 GAMING (15)
========================= */

{
  title: "Gaming Mouse",
  description: "High precision gaming mouse.",
  price: 2499,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?auto=format&fit=crop&w=800&q=80",
  stock: 15,
},
{
  title: "RGB Gaming Keyboard",
  description: "Mechanical keyboard built for gamers.",
  price: 3999,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
  stock: 10,
},
{
  title: "Gaming Headset",
  description: "Surround sound headset.",
  price: 3499,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=800&q=80",
  stock: 12,
},
{
  title: "Xbox Controller",
  description: "Wireless gaming controller.",
  price: 4599,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=80",
  stock: 10,
},
{
  title: "Gaming Monitor",
  description: "144Hz high refresh rate display.",
  price: 12999,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80",
  stock: 7,
},
{
  title: "Gaming Chair",
  description: "Ergonomic chair for long sessions.",
  price: 8999,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
  stock: 6,
},
{
  title: "RGB Mouse Pad",
  description: "Large RGB gaming mouse pad.",
  price: 1499,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1587202372775-98927f3c0d1b?auto=format&fit=crop&w=800&q=80",
  stock: 20,
},
{
  title: "Gaming Desk",
  description: "Spacious gaming setup desk.",
  price: 5999,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=800&q=80",
  stock: 5,
},
{
  title: "PS5 Controller",
  description: "Next-gen dual sense controller.",
  price: 5499,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80",
  stock: 9,
},
{
  title: "VR Headset",
  description: "Immersive virtual reality headset.",
  price: 19999,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80",
  stock: 4,
},
{
  title: "Gaming Earbuds",
  description: "Low latency gaming earbuds.",
  price: 1999,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=800&q=80",
  stock: 18,
},
{
  title: "Streaming Mic",
  description: "Professional condenser microphone.",
  price: 3499,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
  stock: 12,
},
{
  title: "Gaming Laptop Stand",
  description: "Adjustable stand for cooling.",
  price: 1299,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  stock: 25,
},
{
  title: "Console Cooling Fan",
  description: "Keeps console temperature low.",
  price: 999,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=80",
  stock: 15,
},
{
  title: "Game Controller Grip",
  description: "Better grip for long gaming.",
  price: 599,
  category: "gaming",
  image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80",
  stock: 30,
},

/* =========================
   🧩 ACCESSORIES (15)
========================= */

{
  title: "Wireless Charging Pad",
  description: "Fast wireless charging support.",
  price: 1199,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
  stock: 20,
},
{
  title: "Cable Organizer Kit",
  description: "Keeps desk clutter-free.",
  price: 499,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
  stock: 40,
},
{
  title: "Laptop Cooling Pad",
  description: "Multi-fan cooling system.",
  price: 1499,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=800&q=80",
  stock: 18,
},
{
  title: "Smartphone Tripod",
  description: "Perfect for photos/videos.",
  price: 799,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
  stock: 25,
},
{
  title: "Bluetooth Tracker",
  description: "Never lose your items.",
  price: 999,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&w=800&q=80",
  stock: 30,
},
{
  title: "Desk LED Lamp",
  description: "Adjustable brightness lamp.",
  price: 1299,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  stock: 22,
},
{
  title: "USB Hub Adapter",
  description: "Multi-port expansion hub.",
  price: 699,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
  stock: 35,
},
{
  title: "Wrist Rest Pad",
  description: "Ergonomic wrist support.",
  price: 399,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  stock: 50,
},
{
  title: "Screen Cleaning Kit",
  description: "Clean laptop & phone screens.",
  price: 299,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
  stock: 60,
},
{
  title: "Phone Stand Holder",
  description: "Foldable mobile stand.",
  price: 349,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
  stock: 45,
},
{
  title: "Fast Charging Cable",
  description: "Durable USB-C cable.",
  price: 399,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
  stock: 70,
},
{
  title: "Earbud Silicone Case",
  description: "Protective case for earbuds.",
  price: 299,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
  stock: 80,
},
{
  title: "Laptop Sleeve Bag",
  description: "Waterproof laptop sleeve.",
  price: 899,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
  stock: 25,
},
{
  title: "Mini Portable Fan",
  description: "USB rechargeable fan.",
  price: 599,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80",
  stock: 30,
},
{
  title: "Smart Ring Holder",
  description: "Phone grip stand.",
  price: 199,
  category: "accessories",
  image: "https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&w=800&q=80",
  stock: 90,
},

];

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
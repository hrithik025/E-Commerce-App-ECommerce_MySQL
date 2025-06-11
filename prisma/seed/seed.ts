import 'tsconfig-paths/register';

import { PrismaClient } from '@prisma/client';
import { CreateUsers } from './User.seed';

const prisma = new PrismaClient();

async function main() {
    // Seed FileStoreConfig
    await prisma.fileStoreConfig.createMany({
        data: [
            { IsActive: true, Name: 'FileStore_Main', FileStoragePath: 'D:\\Ecommerce' },
        ],
    });

    // Seed Users
    await CreateUsers();

    // Seed UserImages
    await prisma.userImage.createMany({
        data: [
            { FileName: 'alice_profile.jpg', FileExtension: '.jpg', FileStoreConfigId: 1, UserId: 1 }
        ],
    });

    // Seed Product Categories
    await prisma.productCategory.createMany({
        data: [
            { Label: "Electronics", Name: "electronics", "IsActive": true },
            { Label: "Fashion", Name: "fashion", "IsActive": true },
            { Label: "Jewellery & Accessories", Name: "jewellery_and_accessories", "IsActive": true },
            { Label: "Home & Garden", Name: "home_and_garden", "IsActive": true },
            { Label: "Sports & Entertainment", Name: "sports_and_entertainment", "IsActive": true },
            { Label: "Mother & Kids", Name: "mother_and_kids", "IsActive": true },
            { Label: "Beauty & Health", Name: "beauty_and_health", "IsActive": true },
            { Label: "Toys & Games", Name: "toys_and_games", "IsActive": true },
            { Label: "Collectible & Art", Name: "collectible_and_art", "IsActive": true },
            { Label: "Books & Stationery", Name: "books_and_stationery", "IsActive": true }
        ]
        ,
    });

    // Seed TaxTypes
    await prisma.taxType.createMany({
        data: [
            { Name: 'GST', IsActive: true },
        ],
    });

    // Seed Countries
    await prisma.country.createMany({
        data: [
            { Name: 'India', ISOCode: 'IN', CurrencyCode: 'INR', CurrencySymbol: '₹', TaxRate: 9.0, TaxTypeId: 1, IsActive: true },
        ],
    });

    // Seed States for India, US, and Pakistan
    await prisma.state.createMany({
        data: [
            { Name: 'Maharashtra', CountryId: 1, TaxRate: 9.0, IsActive: true },
            { Name: 'TamilNadu', CountryId: 1, TaxRate: 9.5, IsActive: true },
            { Name: 'Karnataka', CountryId: 1, TaxRate: 10, IsActive: true },
            { Name: 'Kerala', CountryId: 1, TaxRate: 8.5, IsActive: true },
            { Name: 'Andhra Pradesh', CountryId: 1, TaxRate: 9.0, IsActive: true },
        ],
    });

    // Seed Addresses
    const users = await prisma.user.findMany();
    const states = await prisma.state.findMany();
    await prisma.address.createMany({
        data: [
            { FirstName: 'Omkar', LastName: 'Sharma', PhoneNumber: '9876543210', Email: 'omkar.sharma@email.com', Address: '402, Krishna Kunj, Main Road', Landmark: 'Near Gateway of India', PinCode: '411002', City: 'Pune', StateId: 1, UserId: 1, IsActive: true },
            { FirstName: 'Ravi', LastName: 'Shastri', PhoneNumber: '9876543211', Email: 'ravi.shastri@email.com', Address: '20, MG Road', Landmark: 'Near Bangalore Palace', PinCode: '560001', City: 'Bangalore', StateId: 3, UserId: 2, IsActive: true },
            { FirstName: 'Meena', LastName: 'Sundar', PhoneNumber: '9988776655', Email: 'meena.sundar@email.com', Address: '22, Bharathi Street', Landmark: 'Near Marina Beach', PinCode: '600001', City: 'Chennai', StateId: 2, UserId: 3, IsActive: true },
            { FirstName: 'Priya', LastName: 'Nair', PhoneNumber: '8765432109', Email: 'priya.nair@email.com', Address: '10, MG Road', PinCode: '695001', City: 'Thiruvananthapuram', StateId: 4, UserId: 4, IsActive: true },
            { FirstName: 'Lakshmi', LastName: 'Reddy', PhoneNumber: '7012345678', Email: 'lakshmi.reddy@email.com', Address: '100, MG Road', Landmark: 'Near Charminar', PinCode: '520002', City: 'Vijayawada', StateId: 5, UserId: 5, IsActive: true },
        ],
    });

    // Seed VariantCategoryConfig
    await prisma.variantCategoryConfig.createMany({
        data: [
            { "IsActive": true, "Name": "Storage", "Label": "Storage Size" },
            { "IsActive": true, "Name": "Color", "Label": "Color" },
            { "IsActive": true, "Name": "Material", "Label": "Material Type" },
            { "IsActive": true, "Name": "Style", "Label": "Product Style" },
            { "IsActive": true, "Name": "Size", "Label": "Product Size" },
            { "IsActive": true, "Name": "Power", "Label": "Power Type" },
            { "IsActive": true, "Name": "AgeGroup", "Label": "Age Group" },
            { "IsActive": true, "Name": "Brand", "Label": "Brand Type" },
        ]
        ,
    });

    // Seed VariantCategoryValueConfig
    await prisma.variantCategoryValueConfig.createMany({
        data: [
            { "IsActive": true, "VariantCategoryId": 1, "Name": "128GB", "Label": "128 GB" },
            { "IsActive": true, "VariantCategoryId": 1, "Name": "256GB", "Label": "256 GB" },
            { "IsActive": true, "VariantCategoryId": 1, "Name": "512GB", "Label": "512 GB" },
            { "IsActive": true, "VariantCategoryId": 1, "Name": "1TB", "Label": "1 TB" },
            { "IsActive": true, "VariantCategoryId": 1, "Name": "2TB", "Label": "2 TB" },

            { "IsActive": true, "VariantCategoryId": 2, "Name": "Black", "Label": "Black" },
            { "IsActive": true, "VariantCategoryId": 2, "Name": "White", "Label": "White" },
            { "IsActive": true, "VariantCategoryId": 2, "Name": "Blue", "Label": "Blue" },
            { "IsActive": true, "VariantCategoryId": 2, "Name": "Red", "Label": "Red" },
            { "IsActive": true, "VariantCategoryId": 2, "Name": "Green", "Label": "Green" },

            { "IsActive": true, "VariantCategoryId": 3, "Name": "Leather", "Label": "Leather" },
            { "IsActive": true, "VariantCategoryId": 3, "Name": "Cotton", "Label": "Cotton" },
            { "IsActive": true, "VariantCategoryId": 3, "Name": "Polyester", "Label": "Polyester" },
            { "IsActive": true, "VariantCategoryId": 3, "Name": "Silk", "Label": "Silk" },
            { "IsActive": true, "VariantCategoryId": 3, "Name": "Nylon", "Label": "Nylon" },

            { "IsActive": true, "VariantCategoryId": 4, "Name": "Classic", "Label": "Classic" },
            { "IsActive": true, "VariantCategoryId": 4, "Name": "Modern", "Label": "Modern" },

            { "IsActive": true, "VariantCategoryId": 5, "Name": "S", "Label": "Small" },
            { "IsActive": true, "VariantCategoryId": 5, "Name": "M", "Label": "Medium" },
            { "IsActive": true, "VariantCategoryId": 5, "Name": "L", "Label": "Large" },
            { "IsActive": true, "VariantCategoryId": 5, "Name": "XL", "Label": "X-Large" },
            { "IsActive": true, "VariantCategoryId": 5, "Name": "XXL", "Label": "XX-Large" },

            { "IsActive": true, "VariantCategoryId": 6, "Name": "Battery", "Label": "Battery" },
            { "IsActive": true, "VariantCategoryId": 6, "Name": "USB", "Label": "USB" },
            { "IsActive": true, "VariantCategoryId": 6, "Name": "Wireless", "Label": "Wireless" },
            { "IsActive": true, "VariantCategoryId": 6, "Name": "Solar", "Label": "Solar" },
            { "IsActive": true, "VariantCategoryId": 6, "Name": "Plug", "Label": "Plug" },

            { "IsActive": true, "VariantCategoryId": 7, "Name": "Adult", "Label": "Adult" },
            { "IsActive": true, "VariantCategoryId": 7, "Name": "Teen", "Label": "Teen" },
            { "IsActive": true, "VariantCategoryId": 7, "Name": "Child", "Label": "Child" },
            { "IsActive": true, "VariantCategoryId": 7, "Name": "Baby", "Label": "Baby" },
            { "IsActive": true, "VariantCategoryId": 7, "Name": "Elderly", "Label": "Elderly" },

            { "IsActive": true, "VariantCategoryId": 8, "Name": "Nike", "Label": "Nike" },
            { "IsActive": true, "VariantCategoryId": 8, "Name": "Adidas", "Label": "Adidas" },
            { "IsActive": true, "VariantCategoryId": 8, "Name": "Samsung", "Label": "Samsung" },
            { "IsActive": true, "VariantCategoryId": 8, "Name": "Apple", "Label": "Apple" },
            { "IsActive": true, "VariantCategoryId": 8, "Name": "Sony", "Label": "Sony" }
        ]
        ,
    });

    // Seed Products
    const categories = await prisma.productCategory.findMany();
    await prisma.product.createMany({
        data: [
            {
                "Name": "smartphone_galaxy_s23",
                "ProductCategoryId": 1,
                "IsActive": true,
                "Label": "Smartphone - Galaxy S23"
            },
            {
                "Name": "smartphone_galaxy_s23_ultra",
                "ProductCategoryId": 1,
                "IsActive": true,
                "Label": "Smartphone - Galaxy S23 Ultra"
            },
            {
                "Name": "wireless_headphones_bose_qc45",
                "ProductCategoryId": 1,
                "IsActive": true,
                "Label": "Wireless Headphones - Bose QC45"
            },
            {
                "Name": "wireless_headphones_sony_wh_1000xm4",
                "ProductCategoryId": 1,
                "IsActive": true,
                "Label": "Wireless Headphones - Sony WH-1000XM4"
            },
            {
                "Name": "smartwatch_apple_watch_series_8",
                "ProductCategoryId": 1,
                "IsActive": true,
                "Label": "Smartwatch - Apple Watch Series 8"
            },
            {
                "Name": "men_s_leather_jacket_black",
                "ProductCategoryId": 2,
                "IsActive": true,
                "Label": "Men’s Leather Jacket - Black"
            },
            {
                "Name": "women_s_dress_floral_pattern",
                "ProductCategoryId": 2,
                "IsActive": true,
                "Label": "Women’s Dress - Floral Pattern"
            },
            {
                "Name": "bracelet_gold_plated",
                "ProductCategoryId": 3,
                "IsActive": true,
                "Label": "Bracelet - Gold-Plated"
            },
            {
                "Name": "necklace_diamond",
                "ProductCategoryId": 3,
                "IsActive": true,
                "Label": "Necklace - Diamond"
            },
            {
                "Name": "lego_set_star_wars",
                "ProductCategoryId": 8,
                "IsActive": true,
                "Label": "Lego Set - Star Wars"
            }
        ]
        ,
    });

    // Seed Product Variants
    const products = await prisma.product.findMany();
    await prisma.productVariant.createMany({
        data: [
            {
                "ProductId": 1,
                "Name": "smartphone_galaxy_s23_128gb_black",
                "Label": "128 GB",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 100,
                "Price": 799.99,
                "Discount": 0,
                "Description": "The Samsung Galaxy S23 in sophisticated Phantom Black offers a powerful and smooth smartphone experience. Its advanced camera system, featuring enhanced low-light performance and sharp image stabilization, lets you capture stunning photos and videos in any situation. The bright and dynamic 6.1-inch AMOLED display delivers vibrant colors and sharp details for immersive viewing. Powered by a Snapdragon processor, expect fast performance for gaming, multitasking, and demanding apps. With 128GB of internal storage, you have ample space for your essential apps, photos, and media. Its sleek design and comfortable size make it easy to handle, while its long-lasting battery ensures you stay connected throughout the day. This is the standard model, offering a great balance of performance and storage for everyday users."
            },
            {
                "ProductId": 1,
                "Name": "smartphone_galaxy_s23_256gb_black",
                "Label": "256 GB",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 50,
                "Price": 849.99,
                "Discount": 5,
                "Description": "Upgrade your storage with the Samsung Galaxy S23 in Phantom Black, now featuring 256GB of internal memory. This variant provides double the storage of the base model, ideal for users who take a lot of high-resolution photos and videos, download numerous apps, or store large media libraries. You'll still enjoy the same exceptional camera capabilities, powerful Snapdragon performance, and vibrant 6.1-inch AMOLED display. The sleek and pocketable design remains, offering both style and convenience. Take advantage of the 5% discount and gain the extra space you need to comfortably manage your digital life without worrying about running out of storage."
            },
            {
                "ProductId": 2,
                "Name": "smartphone_galaxy_s23_ultra_256gb_black",
                "Label": "256 GB",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 60,
                "Price": 1199.99,
                "Discount": 10,
                "Description": "Experience the pinnacle of Samsung's smartphone technology with the Galaxy S23 Ultra in Phantom Black, offering 256GB of storage. This flagship device boasts a revolutionary camera system with incredible zoom capabilities, allowing you to capture stunning detail from afar. The expansive and brilliant 6.8-inch Dynamic AMOLED 2X display provides an unparalleled viewing experience with a smooth 120Hz refresh rate. The integrated S Pen enhances productivity, enabling precise note-taking and creative expression. Powered by the latest Snapdragon processor, it delivers unmatched performance for gaming and demanding tasks. The 256GB of storage provides ample space for your creations and files. This default variant offers a fantastic balance of cutting-edge features and storage capacity, now available with a 10% discount."
            },
            {
                "ProductId": 2,
                "Name": "smartphone_galaxy_s23_ultra_512gb_black",
                "Label": "512 GB",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 40,
                "Price": 1299.99,
                "Discount": 0,
                "Description": "For the ultimate storage needs, the Samsung Galaxy S23 Ultra in Phantom Black with 512GB of internal memory ensures you'll never have to compromise. This high-capacity variant offers double the storage of the 256GB model, perfect for professionals, content creators, and media enthusiasts with extensive libraries. You'll still enjoy the groundbreaking camera system, immersive 6.8-inch Dynamic AMOLED 2X display, and the versatility of the S Pen. The powerful Snapdragon processor guarantees top-tier performance for any application. If storage is your top priority, this 512GB Galaxy S23 Ultra provides the maximum space available, allowing you to store a vast amount of photos, videos, apps, and documents with ease."
            },
            {
                "ProductId": 3,
                "Name": "wireless_headphones_bose_qc45_black",
                "Label": "Black",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 120,
                "Price": 299.00,
                "Discount": 5,
                "Description": "Immerse yourself in your audio world with the Bose QuietComfort 45 wireless headphones in classic Black. Renowned for their superior noise cancellation technology, these headphones effectively block out ambient noise, allowing you to fully focus on your music, podcasts, or calls, even in noisy environments. The lightweight design and plush over-ear cushions provide exceptional comfort for extended listening sessions. Experience high-fidelity audio with a balanced sound profile, deep bass, and crisp highs. The integrated microphone ensures clear and reliable call quality. With a long battery life, you can enjoy hours of uninterrupted listening. This default black variant offers a premium audio experience with industry-leading noise cancellation, now with a 5% discount."
            },
            {
                "ProductId": 3,
                "Name": "wireless_headphones_bose_qc45_white",
                "Label": "White",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 80,
                "Price": 299.00,
                "Discount": 0,
                "Description": "Enjoy the legendary comfort and performance of the Bose QuietComfort 45 wireless headphones in a stylish White finish. These headphones offer the same exceptional noise cancellation capabilities and high-quality audio reproduction as the black variant. The lightweight construction and comfortable over-ear design make them ideal for all-day wear. The built-in microphone ensures clear communication during calls. With a long-lasting battery, you can stay immersed in your audio for extended periods. If you prefer a brighter aesthetic without compromising on Bose's renowned sound and noise-canceling technology, the white QC45 headphones are an excellent choice."
            },
            {
                "ProductId": 4,
                "Name": "wireless_headphones_sony_wh_1000xm4_black",
                "Label": "Black",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 90,
                "Price": 349.00,
                "Discount": 10,
                "Description": "Experience award-winning noise cancellation and exceptional sound quality with the Sony WH-1000XM4 wireless headphones in Black. These headphones utilize advanced Dual Noise Sensor technology and an Integrated Processor V1 to deliver industry-leading noise cancellation that adapts to your environment. Enjoy premium, high-resolution audio with rich bass and clear treble, further customizable through the Sony Headphones Connect app. The comfortable over-ear design features soft, pressure-relieving earpads for extended wear. Smart features like Speak-to-Chat, wearing detection, and multipoint connection enhance convenience. This popular black variant is available with a 10% discount, offering a top-tier audio experience with intelligent features."
            },
            {
                "ProductId": 4,
                "Name": "wireless_headphones_sony_wh_1000xm4_blue",
                "Label": "Blue",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 65,
                "Price": 349.00,
                "Discount": 0,
                "Description": "Immerse yourself in superior sound and tranquility with the Sony WH-1000XM4 wireless headphones in a stylish Blue color. These headphones offer the same class-leading noise cancellation and high-fidelity audio performance as the black model. The comfortable and ergonomic design ensures a pleasant listening experience for hours. Personalize your sound with the Sony Headphones Connect app and take advantage of smart features like Speak-to-Chat and wearing detection for seamless interaction. If you're looking for a touch of individuality without sacrificing premium audio quality and noise cancellation, the blue Sony WH-1000XM4 headphones are a fantastic choice."
            },
            {
                "ProductId": 5,
                "Name": "smartwatch_apple_watch_series_8_s_black",
                "Label": "Small",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 70,
                "Price": 399.00,
                "Discount": 0,
                "Description": "The Apple Watch Series 8 in a sleek Black finish with a Small band is an indispensable tool for health monitoring and staying connected. It offers advanced health features like heart rate monitoring, blood oxygen (SpO2) tracking, fall detection, and innovative temperature sensing for deeper insights into your well-being and cycle tracking. Seamlessly integrated with your iPhone, it allows you to receive notifications, make and answer calls, and track a wide range of workouts with detailed metrics. The bright and always-on Retina display ensures that crucial information is always visible at a glance. This small band size provides a secure and comfortable fit for users with smaller wrists."
            },
            {
                "ProductId": 5,
                "Name": "smartwatch_apple_watch_series_8_m_black",
                "Label": "Medium",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 55,
                "Price": 399.00,
                "Discount": 5,
                "Description": "Designed for a wider range of wrist sizes, the Apple Watch Series 8 in Black with a Medium band offers the same comprehensive health and connectivity features as the small band version. Monitor your heart health, track your daily activity and workouts with precision, and stay connected with notifications and calls directly from your wrist. The always-on Retina display provides easy access to your information throughout the day. Take advantage of the 5% discount on this medium-band option, which offers a more relaxed and comfortable fit for everyday wear if the small band feels too snug. Experience the seamless integration and powerful features of the Apple Watch ecosystem on your wrist."
            },
            {
                "ProductId": 6,
                "Name": "men_s_leather_jacket_black_s",
                "Label": "Small",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 40,
                "Price": 299.00,
                "Discount": 10,
                "Description": "A timeless staple for any man's wardrobe, this Men's Leather Jacket in classic Black, size Small, offers both style and durability. Crafted from high-quality genuine leather, it provides a comfortable fit and a sophisticated, slightly rugged look. The classic design features a zip-up front, practical pockets, and a smooth lining for comfort. Take advantage of the 10% discount on this default small size. Perfect for layering over shirts or sweaters, this leather jacket adds a touch of cool and enduring style to any outfit, making it a versatile piece for various occasions."
            },
            {
                "ProductId": 6,
                "Name": "men_s_leather_jacket_black_m",
                "Label": "Medium",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 55,
                "Price": 299.00,
                "Discount": 5,
                "Description": "This Men's Leather Jacket in Black, size Medium, offers the same enduring style and quality craftsmanship as the small variant, but is tailored to provide a comfortable and flattering fit for those who typically wear a medium size. Made from durable genuine leather, it features a classic design with functional pockets and a comfortable inner lining. Enjoy a 5% discount on this medium-sized option. Whether you're going for a casual everyday look or dressing up for a night out, this leather jacket adds a touch of timeless sophistication and rugged charm to your attire."
            },
            {
                "ProductId": 7,
                "Name": "women_s_dress_floral_pattern_s",
                "Label": "Small",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 70,
                "Price": 79.99,
                "Discount": 0,
                "Description": "Embrace the vibrancy of the season with this delightful Women's Dress in a beautiful floral pattern, size Small. Made from a lightweight and breathable fabric, this dress ensures comfort and ease of movement on warmer days. The cheerful and elegant floral design adds a touch of femininity and charm, making it perfect for casual outings, brunches, or garden parties. The flattering silhouette of this default small size will make you feel confident and stylish. Its easy-to-wear design and eye-catching print make it a lovely addition to your spring and summer wardrobe."
            },
            {
                "ProductId": 7,
                "Name": "women_s_dress_floral_pattern_m",
                "Label": "Medium",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 60,
                "Price": 99.99,
                "Discount": 10,
                "Description": "This charming Women's Dress featuring a lovely floral pattern is now available in size Medium, offering the same light and comfortable fabric and elegant design as the small variant, but tailored to fit those who typically wear a medium size. The vibrant and stylish floral print adds a touch of joy and sophistication to any occasion. Take advantage of the 10% discount on this medium-sized dress. Whether you're attending a special event or simply enjoying a sunny day, this floral dress will make you feel beautiful and comfortable. Its flattering cut and eye-catching pattern make it a wonderful choice for your wardrobe."
            },
            {
                "ProductId": 8,
                "Name": "bracelet_gold_plated_s",
                "Label": "Small",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 60,
                "Price": 89.00,
                "Discount": 0,
                "Description": "Add a subtle touch of sophistication to your wrist with this elegant Gold-Plated Bracelet in size Small. This delicate bracelet features a smooth and lustrous gold-plated finish, offering a timeless and classic style. The small size ensures a comfortable and secure fit for those with smaller wrists. This default small variant is perfect for adding a hint of shine to your everyday look or as a refined complement to a more formal outfit. Its simple yet elegant design makes it versatile enough to be worn alone or layered with other bracelets for a personalized style."
            },
            {
                "ProductId": 8,
                "Name": "bracelet_gold_plated_m",
                "Label": "Medium",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 45,
                "Price": 119.00,
                "Discount": 5,
                "Description": "This beautiful Gold-Plated Bracelet is also available in size Medium, offering the same elegant and timeless style as the small variant but designed to fit comfortably on medium-sized wrists. The smooth and shiny gold-plated finish adds a touch of luxury and refinement to any ensemble. Enjoy a 5% discount on this medium-sized bracelet. Whether you're looking for a subtle everyday accessory or a polished piece for a special occasion, this gold-plated bracelet is a versatile and stylish choice that will enhance your look."
            },
            {
                "ProductId": 8,
                "Name": "bracelet_gold_plated_l",
                "Label": "Large",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 45,
                "Price": 199.00,
                "Discount": 5,
                "Description": "Complete your jewelry collection with this striking Gold-Plated Bracelet in size Large. Offering the same elegant design and lustrous finish as the smaller sizes, this bracelet is specifically crafted to provide a comfortable and stylish fit for larger wrists. The luxurious gold plating adds a touch of glamour and sophistication to any outfit. Take advantage of the 5% discount on this large-sized option. Whether you're dressing up for a special event or adding a touch of elegance to your everyday style, this gold-plated bracelet is a beautiful and versatile accessory that will make a statement."
            },
            {
                "ProductId": 9,
                "Name": "necklace_diamond_classic",
                "Label": "Classic",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 25,
                "Price": 499.00,
                "Discount": 10,
                "Description": "A symbol of timeless elegance, this Classic Diamond Necklace features a beautifully cut and set genuine diamond. The classic pendant design ensures it will remain a cherished piece for generations. The sparkling diamond catches the light beautifully, adding a touch of brilliance to any neckline. Take advantage of the 10% discount on this default classic style. Perfect for adding a touch of sophistication to both formal and semi-formal attire, this diamond necklace is a meaningful and luxurious addition to any jewelry collection."
            },
            {
                "ProductId": 9,
                "Name": "necklace_diamond_modern",
                "Label": "Modern",
                "IsDefault": false,
                "IsActive": true,
                "Quantity": 15,
                "Price": 549.00,
                "Discount": 0,
                "Description": "Make a contemporary statement with this Modern Diamond Necklace. This piece features a uniquely designed setting for a genuine diamond, offering a fresh and stylish take on a classic gemstone. The modern aesthetic is perfect for those who appreciate clean lines and innovative design in their jewelry. The brilliant diamond adds a touch of luxury and sparkle. Whether you're dressing up for a special occasion or adding a touch of modern elegance to your everyday look, this diamond necklace is a sophisticated and eye-catching choice."
            },
            {
                "ProductId": 10,
                "Name": "lego_starwars",
                "Label": "Adult",
                "IsDefault": true,
                "IsActive": true,
                "Quantity": 10,
                "Price": 199.99,
                "Discount": 20,
                "Description": "Unleash your inner Jedi (or Sith!) with this exciting LEGO Star Wars set designed for teens and adult fans. This intricate set allows you to build a detailed replica from the Star Wars universe, offering a rewarding and engaging building experience. The finished model is perfect for display and includes iconic minifigures to bring your favorite scenes to life. Take advantage of the significant 20% discount on this popular set. Whether you're a long-time Star Wars enthusiast or a LEGO collector, this set provides hours of creative fun and results in an impressive collectible piece."
            }
        ]
        ,
    });

    // Seed Product Variant Details
    await prisma.productVariantDetail.createMany({
        data: [
            { "IsActive": true, "ProductVariantId": 1, "VariantCategoryId": 1, "VariantValueId": 1 },
            { "IsActive": true, "ProductVariantId": 2, "VariantCategoryId": 1, "VariantValueId": 2 },
            { "IsActive": true, "ProductVariantId": 3, "VariantCategoryId": 1, "VariantValueId": 2 },
            { "IsActive": true, "ProductVariantId": 4, "VariantCategoryId": 1, "VariantValueId": 3 },
            { "IsActive": true, "ProductVariantId": 5, "VariantCategoryId": 2, "VariantValueId": 6 },
            { "IsActive": true, "ProductVariantId": 6, "VariantCategoryId": 2, "VariantValueId": 7 },
            { "IsActive": true, "ProductVariantId": 7, "VariantCategoryId": 2, "VariantValueId": 6 },
            { "IsActive": true, "ProductVariantId": 8, "VariantCategoryId": 2, "VariantValueId": 8 },
            { "IsActive": true, "ProductVariantId": 9, "VariantCategoryId": 5, "VariantValueId": 18 },
            { "IsActive": true, "ProductVariantId": 10, "VariantCategoryId": 5, "VariantValueId": 19 },
            { "IsActive": true, "ProductVariantId": 11, "VariantCategoryId": 5, "VariantValueId": 18 },
            { "IsActive": true, "ProductVariantId": 12, "VariantCategoryId": 5, "VariantValueId": 19 },
            { "IsActive": true, "ProductVariantId": 13, "VariantCategoryId": 5, "VariantValueId": 18 },
            { "IsActive": true, "ProductVariantId": 14, "VariantCategoryId": 5, "VariantValueId": 19 },
            { "IsActive": true, "ProductVariantId": 15, "VariantCategoryId": 5, "VariantValueId": 18 },
            { "IsActive": true, "ProductVariantId": 16, "VariantCategoryId": 5, "VariantValueId": 19 },
            { "IsActive": true, "ProductVariantId": 17, "VariantCategoryId": 5, "VariantValueId": 20 },
            { "IsActive": true, "ProductVariantId": 18, "VariantCategoryId": 4, "VariantValueId": 16 },
            { "IsActive": true, "ProductVariantId": 19, "VariantCategoryId": 4, "VariantValueId": 17 },
            { "IsActive": true, "ProductVariantId": 20, "VariantCategoryId": 7, "VariantValueId": 28 },
        ]
        ,
    });

    // Seed Product Images
    await prisma.productImage.createMany({
        data: [
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_l_01",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 17
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_l_02",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 17
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_l_03",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 17
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_l_04",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 17
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_l_05",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 17
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_m_01",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 16
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_m_02",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 16
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_m_03",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 16
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_m_04",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 16
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_m_05",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 16
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_s_01",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 15
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_s_02",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 15
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_s_03",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 15
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_s_04",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 15
            },
            {
                "IsActive": true,
                "FileName": "bracelet_gold_plated_s_05",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 15
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_m_01",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 12
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_m_02",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 12
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_m_03",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 12
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_m_04",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 12
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_s_01",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 11
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_s_02",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 11
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_s_03",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 11
            },
            {
                "IsActive": true,
                "FileName": "men_s_leather_jacket_black_s_04",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 11
            },
            {
                "IsActive": true,
                "FileName": "necklace_diamond_classic_01",
                "FileExtension": "png",
                "FileStoreConfigId": 1,
                "ProductVariantId": 18
            },
            {
                "IsActive": true,
                "FileName": "necklace_diamond_classic_02",
                "FileExtension": "avif",
                "FileStoreConfigId": 1,
                "ProductVariantId": 18
            },
            {
                "IsActive": true,
                "FileName": "necklace_diamond_modern_01",
                "FileExtension": "png",
                "FileStoreConfigId": 1,
                "ProductVariantId": 19
            },
            {
                "IsActive": true,
                "FileName": "necklace_diamond_modern_02",
                "FileExtension": "avif",
                "FileStoreConfigId": 1,
                "ProductVariantId": 19
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_128gb_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 1
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_128gb_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 1
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_128gb_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 1
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_128gb_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 1
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_128gb_black_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 1
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_256gb_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 2
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_256gb_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 2
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_256gb_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 2
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_256gb_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 2
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_256gb_black_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 2
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_256gb_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 3
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_256gb_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 3
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_256gb_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 3
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_256gb_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 3
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_256gb_black_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 3
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_512gb_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 4
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_512gb_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 4
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_512gb_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 4
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_512gb_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 4
            },
            {
                "IsActive": true,
                "FileName": "smartphone_galaxy_s23_ultra_512gb_black_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 4
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_m_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 10
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_m_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 10
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_m_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 10
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_m_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 10
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_m_black_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 10
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_m_black_06",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 10
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_s_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 9
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_s_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 9
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_s_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 9
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_s_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 9
            },
            {
                "IsActive": true,
                "FileName": "smartwatch_apple_watch_series_8_s_black_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 9
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 5
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 5
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 5
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 5
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_white_01",
                "FileExtension": "png",
                "FileStoreConfigId": 1,
                "ProductVariantId": 6
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_white_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 6
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_white_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 6
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_white_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 6
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_bose_qc45_white_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 6
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_black_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 7
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_black_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 7
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_black_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 7
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_black_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 7
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_black_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 7
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_black_06",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 7
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_blue_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 8
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_blue_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 8
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_blue_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 8
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_blue_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 8
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_blue_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 8
            },
            {
                "IsActive": true,
                "FileName": "wireless_headphones_sony_wh_1000xm4_blue_06",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 8
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_m_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 14
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_m_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 14
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_m_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 14
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_m_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 14
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_m_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 14
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_m_06",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 14
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_s_01",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 13
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_s_02",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 13
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_s_03",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 13
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_s_04",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 13
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_s_05",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 13
            },
            {
                "IsActive": true,
                "FileName": "women_s_dress_floral_pattern_s_06",
                "FileExtension": "jpeg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 13
            },
            {
                "IsActive": true,
                "FileName": "lego_starwars_01",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 20
            },
            {
                "IsActive": true,
                "FileName": "lego_starwars_02",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 20
            },
            {
                "IsActive": true,
                "FileName": "lego_starwars_03",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 20
            },
            {
                "IsActive": true,
                "FileName": "lego_starwars_04",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 20
            },
            {
                "IsActive": true,
                "FileName": "lego_starwars_05",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 20
            },
            {
                "IsActive": true,
                "FileName": "lego_starwars_06",
                "FileExtension": "jpg",
                "FileStoreConfigId": 1,
                "ProductVariantId": 20
            }
        ]
        ,
    });

    // Seed Product Specifications
    await prisma.productSpecification.createMany({
        data: [
            { "Key": "Storage Capacity", "Value": "128 GB", "ProductVariantId": 1 },
            { "Key": "Color", "Value": "Phantom Black", "ProductVariantId": 1 },
            { "Key": "RAM", "Value": "8 GB", "ProductVariantId": 1 },
            { "Key": "Display Size", "Value": "6.1 inches", "ProductVariantId": 1 },
            { "Key": "Display Type", "Value": "Dynamic AMOLED 2X", "ProductVariantId": 1 },
            { "Key": "Resolution", "Value": "2340 x 1080 (FHD+)", "ProductVariantId": 1 },
            { "Key": "Refresh Rate", "Value": "120 Hz", "ProductVariantId": 1 },
            { "Key": "Processor", "Value": "Snapdragon 8 Gen 2 for Galaxy", "ProductVariantId": 1 },
            { "Key": "CPU Speed", "Value": "3.36 GHz, 2.8 GHz, 2 GHz", "ProductVariantId": 1 },
            { "Key": "Rear Camera - Resolution (Multiple)", "Value": "50MP + 12MP + 10MP", "ProductVariantId": 1 },
            { "Key": "Rear Camera - F Number (Multiple)", "Value": "F1.8, F2.2, F2.4", "ProductVariantId": 1 },
            { "Key": "Rear Camera - OIS", "Value": "Yes", "ProductVariantId": 1 },
            { "Key": "Rear Camera - Zoom", "Value": "3x Optical Zoom, Digital Zoom up to 30x", "ProductVariantId": 1 },
            { "Key": "Front Camera - Resolution", "Value": "12MP", "ProductVariantId": 1 },
            { "Key": "Front Camera - F Number", "Value": "F2.2", "ProductVariantId": 1 },
            { "Key": "Video Recording Resolution", "Value": "8K UHD (7680 x 4320) @30fps", "ProductVariantId": 1 },
            { "Key": "Battery Capacity", "Value": "3900 mAh", "ProductVariantId": 1 },
            { "Key": "USB Interface", "Value": "USB Type-C", "ProductVariantId": 1 },
            { "Key": "Wi-Fi", "Value": "802.11 a/b/g/n/ac/ax 2.4G+5GHz+6GHz, HE160, MIMO, 1024-QAM", "ProductVariantId": 1 },
            { "Key": "Operating System", "Value": "Android 13", "ProductVariantId": 1 },
            { "Key": "Storage Capacity", "Value": "256 GB", "ProductVariantId": 2 },
            { "Key": "Color", "Value": "Phantom Black", "ProductVariantId": 2 },
            { "Key": "RAM", "Value": "8 GB", "ProductVariantId": 2 },
            { "Key": "Display Size", "Value": "6.1 inches", "ProductVariantId": 2 },
            { "Key": "Display Type", "Value": "Dynamic AMOLED 2X", "ProductVariantId": 2 },
            { "Key": "Resolution", "Value": "2340 x 1080 (FHD+)", "ProductVariantId": 2 },
            { "Key": "Refresh Rate", "Value": "120 Hz", "ProductVariantId": 2 },
            { "Key": "Processor", "Value": "Snapdragon 8 Gen 2 for Galaxy", "ProductVariantId": 2 },
            { "Key": "CPU Speed", "Value": "3.36 GHz, 2.8 GHz, 2 GHz", "ProductVariantId": 2 },
            { "Key": "Rear Camera - Resolution (Multiple)", "Value": "50MP + 12MP + 10MP", "ProductVariantId": 2 },
            { "Key": "Rear Camera - F Number (Multiple)", "Value": "F1.8, F2.2, F2.4", "ProductVariantId": 2 },
            { "Key": "Rear Camera - OIS", "Value": "Yes", "ProductVariantId": 2 },
            { "Key": "Rear Camera - Zoom", "Value": "3x Optical Zoom, Digital Zoom up to 30x", "ProductVariantId": 2 },
            { "Key": "Front Camera - Resolution", "Value": "12MP", "ProductVariantId": 2 },
            { "Key": "Front Camera - F Number", "Value": "F2.2", "ProductVariantId": 2 },
            { "Key": "Video Recording Resolution", "Value": "8K UHD (7680 x 4320) @30fps", "ProductVariantId": 2 },
            { "Key": "Battery Capacity", "Value": "3900 mAh", "ProductVariantId": 2 },
            { "Key": "USB Interface", "Value": "USB Type-C", "ProductVariantId": 2 },
            { "Key": "Wi-Fi", "Value": "802.11 a/b/g/n/ac/ax 2.4G+5GHz+6GHz, HE160, MIMO, 1024-QAM", "ProductVariantId": 2 },
            { "Key": "Operating System", "Value": "Android 13", "ProductVariantId": 2 },
            { "Key": "Storage Capacity", "Value": "256 GB", "ProductVariantId": 3 },
            { "Key": "Color", "Value": "Phantom Black", "ProductVariantId": 3 },
            { "Key": "RAM", "Value": "8 GB", "ProductVariantId": 3 },
            { "Key": "Display Size", "Value": "6.8 inches", "ProductVariantId": 3 },
            { "Key": "Display Type", "Value": "Dynamic AMOLED 2X", "ProductVariantId": 3 },
            { "Key": "Resolution", "Value": "3088 x 1440 (Quad HD+)", "ProductVariantId": 3 },
            { "Key": "Refresh Rate", "Value": "120 Hz", "ProductVariantId": 3 },
            { "Key": "Processor", "Value": "Snapdragon 8 Gen 2 for Galaxy", "ProductVariantId": 3 },
            { "Key": "CPU Speed", "Value": "3.36 GHz, 2.8 GHz, 2 GHz", "ProductVariantId": 3 },
            { "Key": "Rear Camera - Resolution (Multiple)", "Value": "200MP + 12MP + 10MP + 10MP", "ProductVariantId": 3 },
            { "Key": "Rear Camera - F Number (Multiple)", "Value": "F1.7, F2.2, F2.4, F4.9", "ProductVariantId": 3 },
            { "Key": "Rear Camera - OIS", "Value": "Yes", "ProductVariantId": 3 },
            { "Key": "Rear Camera - Zoom", "Value": "3x Optical Zoom, 10x Optical Zoom, Digital Zoom up to 100x", "ProductVariantId": 3 },
            { "Key": "Front Camera - Resolution", "Value": "12MP", "ProductVariantId": 3 },
            { "Key": "Front Camera - F Number", "Value": "F2.2", "ProductVariantId": 3 },
            { "Key": "Video Recording Resolution", "Value": "8K UHD (7680 x 4320) @30fps", "ProductVariantId": 3 },
            { "Key": "Battery Capacity", "Value": "5000 mAh", "ProductVariantId": 3 },
            { "Key": "S Pen Support", "Value": "Yes, Built-in", "ProductVariantId": 3 },
            { "Key": "USB Interface", "Value": "USB Type-C", "ProductVariantId": 3 },
            { "Key": "Operating System", "Value": "Android 13", "ProductVariantId": 3 },
            { "Key": "Storage Capacity", "Value": "512 GB", "ProductVariantId": 4 },
            { "Key": "Color", "Value": "Phantom Black", "ProductVariantId": 4 },
            { "Key": "RAM", "Value": "12 GB", "ProductVariantId": 4 },
            { "Key": "Display Size", "Value": "6.8 inches", "ProductVariantId": 4 },
            { "Key": "Display Type", "Value": "Dynamic AMOLED 2X", "ProductVariantId": 4 },
            { "Key": "Resolution", "Value": "3088 x 1440 (Quad HD+)", "ProductVariantId": 4 },
            { "Key": "Refresh Rate", "Value": "120 Hz", "ProductVariantId": 4 },
            { "Key": "Processor", "Value": "Snapdragon 8 Gen 2 for Galaxy", "ProductVariantId": 4 },
            { "Key": "CPU Speed", "Value": "3.36 GHz, 2.8 GHz, 2 GHz", "ProductVariantId": 4 },
            { "Key": "Rear Camera - Resolution (Multiple)", "Value": "200MP + 12MP + 10MP + 10MP", "ProductVariantId": 4 },
            { "Key": "Rear Camera - F Number (Multiple)", "Value": "F1.7, F2.2, F2.4, F4.9", "ProductVariantId": 4 },
            { "Key": "Rear Camera - OIS", "Value": "Yes", "ProductVariantId": 4 },
            { "Key": "Rear Camera - Zoom", "Value": "3x Optical Zoom, 10x Optical Zoom, Digital Zoom up to 100x", "ProductVariantId": 4 },
            { "Key": "Front Camera - Resolution", "Value": "12MP", "ProductVariantId": 4 },
            { "Key": "Front Camera - F Number", "Value": "F2.2", "ProductVariantId": 4 },
            { "Key": "Video Recording Resolution", "Value": "8K UHD (7680 x 4320) @30fps", "ProductVariantId": 4 },
            { "Key": "Battery Capacity", "Value": "5000 mAh", "ProductVariantId": 4 },
            { "Key": "S Pen Support", "Value": "Yes, Built-in", "ProductVariantId": 4 },
            { "Key": "USB Interface", "Value": "USB Type-C", "ProductVariantId": 4 },
            { "Key": "Operating System", "Value": "Android 13", "ProductVariantId": 4 },
            { "Key": "Color", "Value": "Black", "ProductVariantId": 5 },
            { "Key": "Noise Cancellation", "Value": "Active Noise Cancellation (ANC)", "ProductVariantId": 5 },
            { "Key": "Transparency Mode", "Value": "Yes", "ProductVariantId": 5 },
            { "Key": "Wireless Technology", "Value": "Bluetooth 5.0", "ProductVariantId": 5 },
            { "Key": "Audio Codecs Supported", "Value": "SBC, AAC", "ProductVariantId": 5 },
            { "Key": "Battery Life (with ANC)", "Value": "Up to 24 hours", "ProductVariantId": 5 },
            { "Key": "Battery Life (without ANC)", "Value": "Up to 30 hours", "ProductVariantId": 5 },
            { "Key": "Quick Charge", "Value": "15 minutes for 3 hours of playback", "ProductVariantId": 5 },
            { "Key": "Charging Port", "Value": "USB-C", "ProductVariantId": 5 },
            { "Key": "Weight", "Value": "0.5 lbs (240 grams)", "ProductVariantId": 5 },
            { "Key": "Driver Size", "Value": "40mm", "ProductVariantId": 5 },
            { "Key": "Frequency Response", "Value": "20Hz - 20kHz", "ProductVariantId": 5 },
            { "Key": "Impedance", "Value": "32 ohms", "ProductVariantId": 5 },
            { "Key": "Sensitivity", "Value": "105 dB/mW", "ProductVariantId": 5 },
            { "Key": "Microphone", "Value": "Built-in microphone for calls", "ProductVariantId": 5 },
            { "Key": "Voice Assistant Support", "Value": "Google Assistant, Alexa", "ProductVariantId": 5 },
            { "Key": "Included Accessories", "Value": "Carrying case, Audio cable (3.5mm), USB-C charging cable", "ProductVariantId": 5 },
            { "Key": "Water Resistance", "Value": "No", "ProductVariantId": 5 },
            { "Key": "Headphone Type", "Value": "Over-Ear", "ProductVariantId": 5 },
            { "Key": "Touch Controls", "Value": "Yes, on earcup", "ProductVariantId": 5 },
            { "Key": "Color", "Value": "White", "ProductVariantId": 6 },
            { "Key": "Noise Cancellation", "Value": "Active Noise Cancellation (ANC)", "ProductVariantId": 6 },
            { "Key": "Transparency Mode", "Value": "Yes", "ProductVariantId": 6 },
            { "Key": "Wireless Technology", "Value": "Bluetooth 5.0", "ProductVariantId": 6 },
            { "Key": "Audio Codecs Supported", "Value": "SBC, AAC", "ProductVariantId": 6 },
            { "Key": "Battery Life (with ANC)", "Value": "Up to 24 hours", "ProductVariantId": 6 },
            { "Key": "Battery Life (without ANC)", "Value": "Up to 30 hours", "ProductVariantId": 6 },
            { "Key": "Quick Charge", "Value": "15 minutes for 3 hours of playback", "ProductVariantId": 6 },
            { "Key": "Charging Port", "Value": "USB-C", "ProductVariantId": 6 },
            { "Key": "Weight", "Value": "0.5 lbs (240 grams)", "ProductVariantId": 6 },
            { "Key": "Driver Size", "Value": "40mm", "ProductVariantId": 6 },
            { "Key": "Frequency Response", "Value": "20Hz - 20kHz", "ProductVariantId": 6 },
            { "Key": "Impedance", "Value": "32 ohms", "ProductVariantId": 6 },
            { "Key": "Sensitivity", "Value": "105 dB/mW", "ProductVariantId": 6 },
            { "Key": "Microphone", "Value": "Built-in microphone for calls", "ProductVariantId": 6 },
            { "Key": "Voice Assistant Support", "Value": "Google Assistant, Alexa", "ProductVariantId": 6 },
            { "Key": "Included Accessories", "Value": "Carrying case, Audio cable (3.5mm), USB-C charging cable", "ProductVariantId": 6 },
            { "Key": "Water Resistance", "Value": "No", "ProductVariantId": 6 },
            { "Key": "Headphone Type", "Value": "Over-Ear", "ProductVariantId": 6 },
            { "Key": "Touch Controls", "Value": "Yes, on earcup", "ProductVariantId": 6 },
            { "Key": "Color", "Value": "Black", "ProductVariantId": 7 },
            { "Key": "Noise Cancellation", "Value": "Active Noise Cancellation (ANC)", "ProductVariantId": 7 },
            { "Key": "Transparency Mode", "Value": "Yes", "ProductVariantId": 7 },
            { "Key": "Wireless Technology", "Value": "Bluetooth 5.0", "ProductVariantId": 7 },
            { "Key": "Audio Codecs Supported", "Value": "SBC, AAC, LDAC", "ProductVariantId": 7 },
            { "Key": "Battery Life (with ANC)", "Value": "Up to 30 hours", "ProductVariantId": 7 },
            { "Key": "Battery Life (without ANC)", "Value": "Up to 38 hours", "ProductVariantId": 7 },
            { "Key": "Quick Charge", "Value": "10 minutes for 5 hours of playback", "ProductVariantId": 7 },
            { "Key": "Charging Port", "Value": "USB-C", "ProductVariantId": 7 },
            { "Key": "Weight", "Value": "0.56 lbs (254 grams)", "ProductVariantId": 7 },
            { "Key": "Driver Size", "Value": "40mm", "ProductVariantId": 7 },
            { "Key": "Frequency Response", "Value": "4 Hz - 40,000 Hz", "ProductVariantId": 7 },
            { "Key": "Impedance", "Value": "47 ohms (with cable), 16 ohms (without cable)", "ProductVariantId": 7 },
            { "Key": "Sensitivity", "Value": "102 dB/mW", "ProductVariantId": 7 },
            { "Key": "Microphone", "Value": "Multiple microphones with Precise Voice Pickup", "ProductVariantId": 7 },
            { "Key": "Voice Assistant Support", "Value": "Google Assistant, Alexa", "ProductVariantId": 7 },
            { "Key": "Included Accessories", "Value": "Carrying case, Headphone cable, USB-C charging cable, Airplane adapter", "ProductVariantId": 7 },
            { "Key": "Water Resistance", "Value": "No", "ProductVariantId": 7 },
            { "Key": "Headphone Type", "Value": "Over-Ear", "ProductVariantId": 7 },
            { "Key": "Touch Controls", "Value": "Yes, on earcup", "ProductVariantId": 7 },
            {
                "Key": "Color",
                "Value": "Blue",
                "ProductVariantId": 8
            },
            {
                "Key": "Noise Cancellation",
                "Value": "Active Noise Cancellation (ANC)",
                "ProductVariantId": 8
            },
            {
                "Key": "Transparency Mode",
                "Value": "Yes",
                "ProductVariantId": 8
            },
            {
                "Key": "Wireless Technology",
                "Value": "Bluetooth 5.0",
                "ProductVariantId": 8
            },
            {
                "Key": "Audio Codecs Supported",
                "Value": "SBC, AAC, LDAC",
                "ProductVariantId": 8
            },
            {
                "Key": "Battery Life (with ANC)",
                "Value": "Up to 30 hours",
                "ProductVariantId": 8
            },
            {
                "Key": "Battery Life (without ANC)",
                "Value": "Up to 38 hours",
                "ProductVariantId": 8
            },
            {
                "Key": "Quick Charge",
                "Value": "10 minutes for 5 hours of playback",
                "ProductVariantId": 8
            },
            {
                "Key": "Charging Port",
                "Value": "USB-C",
                "ProductVariantId": 8
            },
            {
                "Key": "Weight",
                "Value": "0.56 lbs (254 grams)",
                "ProductVariantId": 8
            },
            {
                "Key": "Driver Size",
                "Value": "40mm",
                "ProductVariantId": 8
            },
            {
                "Key": "Frequency Response",
                "Value": "4 Hz - 40,000 Hz",
                "ProductVariantId": 8
            },
            {
                "Key": "Impedance",
                "Value": "47 ohms (with cable), 16 ohms (without cable)",
                "ProductVariantId": 8
            },
            {
                "Key": "Sensitivity",
                "Value": "102 dB/mW",
                "ProductVariantId": 8
            },
            {
                "Key": "Microphone",
                "Value": "Multiple microphones with Precise Voice Pickup",
                "ProductVariantId": 8
            },
            {
                "Key": "Voice Assistant Support",
                "Value": "Google Assistant, Alexa",
                "ProductVariantId": 8
            },
            {
                "Key": "Included Accessories",
                "Value": "Carrying case, Headphone cable, USB-C charging cable, Airplane adapter",
                "ProductVariantId": 8
            },
            {
                "Key": "Water Resistance",
                "Value": "No",
                "ProductVariantId": 8
            },
            {
                "Key": "Headphone Type",
                "Value": "Over-Ear",
                "ProductVariantId": 8
            },
            {
                "Key": "Touch Controls",
                "Value": "Yes, on earcup",
                "ProductVariantId": 8
            },
            {
                "Key": "Size",
                "Value": "Medium",
                "ProductVariantId": 9
            },
            {
                "Key": "Case Material",
                "Value": "Aluminum",
                "ProductVariantId": 9
            },
            {
                "Key": "Display Type",
                "Value": "Retina LTPO OLED Always On display",
                "ProductVariantId": 9
            },
            {
                "Key": "Display Size",
                "Value": "1.9 inches",
                "ProductVariantId": 9
            },
            {
                "Key": "Resolution",
                "Value": "484 x 396 pixels",
                "ProductVariantId": 9
            },
            {
                "Key": "Processor",
                "Value": "S8 SiP with 64-bit dual-core processor",
                "ProductVariantId": 9
            },
            {
                "Key": "Water Resistance",
                "Value": "Water resistant to 50 meters",
                "ProductVariantId": 9
            },
            {
                "Key": "Connectivity",
                "Value": "Wi-Fi 802.11b/g/n 2.4GHz and 5GHz, Bluetooth 5.0",
                "ProductVariantId": 9
            },
            {
                "Key": "GPS",
                "Value": "GPS, GNSS, Galileo, BeiDou",
                "ProductVariantId": 9
            },
            {
                "Key": "Sensors",
                "Value": "Blood Oxygen sensor, Electrical heart sensor, Third-generation optical heart sensor, Accelerometer, Gyroscope, Ambient light sensor",
                "ProductVariantId": 9
            },
            {
                "Key": "Battery Life",
                "Value": "Up to 18 hours",
                "ProductVariantId": 9
            },
            {
                "Key": "Charging Type",
                "Value": "Magnetic fast charging USB-C cable",
                "ProductVariantId": 9
            },
            {
                "Key": "Operating System",
                "Value": "watchOS",
                "ProductVariantId": 9
            },
            {
                "Key": "App Store",
                "Value": "Yes",
                "ProductVariantId": 9
            },
            {
                "Key": "Cellular Option",
                "Value": "No",
                "ProductVariantId": 9
            },
            {
                "Key": "Speaker and Microphone",
                "Value": "Yes",
                "ProductVariantId": 9
            },
            {
                "Key": "Siri",
                "Value": "Yes",
                "ProductVariantId": 9
            },
            {
                "Key": "Band Material",
                "Value": "Fluoroelastomer",
                "ProductVariantId": 9
            },
            {
                "Key": "Weight",
                "Value": "38.8 grams (aluminum, GPS)",
                "ProductVariantId": 9
            },
            {
                "Key": "Size",
                "Value": "Small",
                "ProductVariantId": 10
            },
            {
                "Key": "Case Material",
                "Value": "Aluminum",
                "ProductVariantId": 10
            },
            {
                "Key": "Display Type",
                "Value": "Retina LTPO OLED Always On display",
                "ProductVariantId": 10
            },
            {
                "Key": "Display Size",
                "Value": "1.69 inches",
                "ProductVariantId": 10
            },
            {
                "Key": "Resolution",
                "Value": "430 x 352 pixels",
                "ProductVariantId": 10
            },
            {
                "Key": "Processor",
                "Value": "S8 SiP with 64-bit dual-core processor",
                "ProductVariantId": 10
            },
            {
                "Key": "Water Resistance",
                "Value": "Water resistant to 50 meters",
                "ProductVariantId": 10
            },
            {
                "Key": "Connectivity",
                "Value": "Wi-Fi 802.11b/g/n 2.4GHz and 5GHz, Bluetooth 5.0",
                "ProductVariantId": 10
            },
            {
                "Key": "GPS",
                "Value": "GPS, GNSS, Galileo, BeiDou",
                "ProductVariantId": 10
            },
            {
                "Key": "Sensors",
                "Value": "Blood Oxygen sensor, Electrical heart sensor, Third-generation optical heart sensor, Accelerometer, Gyroscope, Ambient light sensor",
                "ProductVariantId": 10
            },
            {
                "Key": "Battery Life",
                "Value": "Up to 18 hours",
                "ProductVariantId": 10
            },
            {
                "Key": "Charging Type",
                "Value": "Magnetic fast charging USB-C cable",
                "ProductVariantId": 10
            },
            {
                "Key": "Operating System",
                "Value": "watchOS",
                "ProductVariantId": 10
            },
            {
                "Key": "App Store",
                "Value": "Yes",
                "ProductVariantId": 10
            },
            {
                "Key": "Cellular Option",
                "Value": "No",
                "ProductVariantId": 10
            },
            {
                "Key": "Speaker and Microphone",
                "Value": "Yes",
                "ProductVariantId": 10
            },
            {
                "Key": "Siri",
                "Value": "Yes",
                "ProductVariantId": 10
            },
            {
                "Key": "Band Material",
                "Value": "Fluoroelastomer",
                "ProductVariantId": 10
            },
            {
                "Key": "Weight",
                "Value": "32.0 grams (aluminum, GPS)",
                "ProductVariantId": 10
            },
            {
                "Key": "Material",
                "Value": "Leather",
                "ProductVariantId": 11
            },
            {
                "Key": "Color",
                "Value": "Black",
                "ProductVariantId": 11
            },
            {
                "Key": "Size",
                "Value": "Small",
                "ProductVariantId": 11
            },
            {
                "Key": "Style",
                "Value": "Classic Biker",
                "ProductVariantId": 11
            },
            {
                "Key": "Lining Material",
                "Value": "Polyester",
                "ProductVariantId": 11
            },
            {
                "Key": "Closure Type",
                "Value": "Zipper",
                "ProductVariantId": 11
            },
            {
                "Key": "Number of Pockets (Outer)",
                "Value": "3",
                "ProductVariantId": 11
            },
            {
                "Key": "Number of Pockets (Inner)",
                "Value": "1",
                "ProductVariantId": 11
            },
            {
                "Key": "Hardware Color",
                "Value": "Silver",
                "ProductVariantId": 11
            },
            {
                "Key": "Care Instructions",
                "Value": "Wipe clean with a damp cloth",
                "ProductVariantId": 11
            },
            {
                "Key": "Season",
                "Value": "Autumn/Winter",
                "ProductVariantId": 11
            },
            {
                "Key": "Water Resistance",
                "Value": "Slightly water-resistant",
                "ProductVariantId": 11
            },
            {
                "Key": "Fit",
                "Value": "Regular",
                "ProductVariantId": 11
            },
            {
                "Key": "Collar Style",
                "Value": "Stand Collar with Snap Button",
                "ProductVariantId": 11
            },
            {
                "Key": "Cuff Style",
                "Value": "Zippered Cuffs",
                "ProductVariantId": 11
            },
            {
                "Key": "Ventilation",
                "Value": "None",
                "ProductVariantId": 11
            },
            {
                "Key": "Weight",
                "Value": "2.5 lbs",
                "ProductVariantId": 11
            },
            {
                "Key": "Country of Origin",
                "Value": "Imported",
                "ProductVariantId": 11
            },
            {
                "Key": "Occasion",
                "Value": "Casual, Motorcycle Riding",
                "ProductVariantId": 11
            },
            {
                "Key": "Age Group",
                "Value": "Adult",
                "ProductVariantId": 11
            },
            {
                "Key": "Material",
                "Value": "Leather",
                "ProductVariantId": 12
            },
            {
                "Key": "Color",
                "Value": "Black",
                "ProductVariantId": 12
            },
            {
                "Key": "Size",
                "Value": "Medium",
                "ProductVariantId": 12
            },
            {
                "Key": "Style",
                "Value": "Classic Biker",
                "ProductVariantId": 12
            },
            {
                "Key": "Lining Material",
                "Value": "Polyester",
                "ProductVariantId": 12
            },
            {
                "Key": "Closure Type",
                "Value": "Zipper",
                "ProductVariantId": 12
            },
            {
                "Key": "Number of Pockets (Outer)",
                "Value": "3",
                "ProductVariantId": 12
            },
            {
                "Key": "Number of Pockets (Inner)",
                "Value": "1",
                "ProductVariantId": 12
            },
            {
                "Key": "Hardware Color",
                "Value": "Silver",
                "ProductVariantId": 12
            },
            {
                "Key": "Care Instructions",
                "Value": "Wipe clean with a damp cloth",
                "ProductVariantId": 12
            },
            {
                "Key": "Season",
                "Value": "Autumn/Winter",
                "ProductVariantId": 12
            },
            {
                "Key": "Water Resistance",
                "Value": "Slightly water-resistant",
                "ProductVariantId": 12
            },
            {
                "Key": "Fit",
                "Value": "Regular",
                "ProductVariantId": 12
            },
            {
                "Key": "Collar Style",
                "Value": "Stand Collar with Snap Button",
                "ProductVariantId": 12
            },
            {
                "Key": "Cuff Style",
                "Value": "Zippered Cuffs",
                "ProductVariantId": 12
            },
            {
                "Key": "Ventilation",
                "Value": "None",
                "ProductVariantId": 12
            },
            {
                "Key": "Weight",
                "Value": "2.6 lbs",
                "ProductVariantId": 12
            },
            {
                "Key": "Country of Origin",
                "Value": "Imported",
                "ProductVariantId": 12
            },
            {
                "Key": "Occasion",
                "Value": "Casual, Motorcycle Riding",
                "ProductVariantId": 12
            },
            {
                "Key": "Age Group",
                "Value": "Adult",
                "ProductVariantId": 12
            },
            {
                "Key": "Pattern",
                "Value": "Floral",
                "ProductVariantId": 13
            },
            {
                "Key": "Material",
                "Value": "Polyester Blend",
                "ProductVariantId": 13
            },
            {
                "Key": "Color",
                "Value": "Multicolor",
                "ProductVariantId": 13
            },
            {
                "Key": "Size",
                "Value": "Small",
                "ProductVariantId": 13
            },
            {
                "Key": "Dress Length",
                "Value": "Knee-Length",
                "ProductVariantId": 13
            },
            {
                "Key": "Sleeve Length",
                "Value": "Short Sleeves",
                "ProductVariantId": 13
            },
            {
                "Key": "Neckline",
                "Value": "Round Neck",
                "ProductVariantId": 13
            },
            {
                "Key": "Closure Type",
                "Value": "Pullover",
                "ProductVariantId": 13
            },
            {
                "Key": "Lining",
                "Value": "Partially Lined",
                "ProductVariantId": 13
            },
            {
                "Key": "Care Instructions",
                "Value": "Machine wash cold, gentle cycle",
                "ProductVariantId": 13
            },
            {
                "Key": "Season",
                "Value": "Spring/Summer",
                "ProductVariantId": 13
            },
            {
                "Key": "Style",
                "Value": "Casual, Day Dress",
                "ProductVariantId": 13
            },
            {
                "Key": "Fit",
                "Value": "Regular Fit",
                "ProductVariantId": 13
            },
            {
                "Key": "Waistline",
                "Value": "Empire Waist",
                "ProductVariantId": 13
            },
            {
                "Key": "Decoration",
                "Value": "None",
                "ProductVariantId": 13
            },
            {
                "Key": "Transparency",
                "Value": "Not Transparent",
                "ProductVariantId": 13
            },
            {
                "Key": "Stretch",
                "Value": "Slight Stretch",
                "ProductVariantId": 13
            },
            {
                "Key": "Weight",
                "Value": "0.8 lbs",
                "ProductVariantId": 13
            },
            {
                "Key": "Country of Origin",
                "Value": "Imported",
                "ProductVariantId": 13
            },
            {
                "Key": "Occasion",
                "Value": "Casual, Vacation",
                "ProductVariantId": 13
            },
            {
                "Key": "Pattern",
                "Value": "Floral",
                "ProductVariantId": 14
            },
            {
                "Key": "Material",
                "Value": "Polyester Blend",
                "ProductVariantId": 14
            },
            {
                "Key": "Color",
                "Value": "Multicolor",
                "ProductVariantId": 14
            },
            {
                "Key": "Size",
                "Value": "Medium",
                "ProductVariantId": 14
            },
            {
                "Key": "Dress Length",
                "Value": "Knee-Length",
                "ProductVariantId": 14
            },
            {
                "Key": "Sleeve Length",
                "Value": "Short Sleeves",
                "ProductVariantId": 14
            },
            {
                "Key": "Neckline",
                "Value": "Round Neck",
                "ProductVariantId": 14
            },
            {
                "Key": "Closure Type",
                "Value": "Pullover",
                "ProductVariantId": 14
            },
            {
                "Key": "Lining",
                "Value": "Partially Lined",
                "ProductVariantId": 14
            },
            {
                "Key": "Care Instructions",
                "Value": "Machine wash cold, gentle cycle",
                "ProductVariantId": 14
            },
            {
                "Key": "Season",
                "Value": "Spring/Summer",
                "ProductVariantId": 14
            },
            {
                "Key": "Style",
                "Value": "Casual, Day Dress",
                "ProductVariantId": 14
            },
            {
                "Key": "Fit",
                "Value": "Regular Fit",
                "ProductVariantId": 14
            },
            {
                "Key": "Waistline",
                "Value": "Empire Waist",
                "ProductVariantId": 14
            },
            {
                "Key": "Decoration",
                "Value": "None",
                "ProductVariantId": 14
            },
            {
                "Key": "Transparency",
                "Value": "Not Transparent",
                "ProductVariantId": 14
            },
            {
                "Key": "Stretch",
                "Value": "Slight Stretch",
                "ProductVariantId": 14
            },
            {
                "Key": "Weight",
                "Value": "0.9 lbs",
                "ProductVariantId": 14
            },
            {
                "Key": "Country of Origin",
                "Value": "Imported",
                "ProductVariantId": 14
            },
            {
                "Key": "Occasion",
                "Value": "Casual, Vacation",
                "ProductVariantId": 14
            },
            {
                "Key": "Material",
                "Value": "Gold-Plated Alloy",
                "ProductVariantId": 15
            },
            {
                "Key": "Color",
                "Value": "Gold",
                "ProductVariantId": 15
            },
            {
                "Key": "Size",
                "Value": "Small",
                "ProductVariantId": 15
            },
            {
                "Key": "Style",
                "Value": "Delicate Chain",
                "ProductVariantId": 15
            },
            {
                "Key": "Clasp Type",
                "Value": "Lobster Claw",
                "ProductVariantId": 15
            },
            {
                "Key": "Chain Type",
                "Value": "Cable Chain",
                "ProductVariantId": 15
            },
            {
                "Key": "Adjustable Length",
                "Value": "Yes",
                "ProductVariantId": 15
            },
            {
                "Key": "Main Stone",
                "Value": "None",
                "ProductVariantId": 15
            },
            {
                "Key": "Plating Thickness",
                "Value": "0.5 microns",
                "ProductVariantId": 15
            },
            {
                "Key": "Care Instructions",
                "Value": "Avoid contact with water and chemicals",
                "ProductVariantId": 15
            },
            {
                "Key": "Occasion",
                "Value": "Casual, Everyday Wear",
                "ProductVariantId": 15
            },
            {
                "Key": "Metal Purity",
                "Value": "Not Applicable",
                "ProductVariantId": 15
            },
            {
                "Key": "Weight",
                "Value": "0.1 lbs",
                "ProductVariantId": 15
            },
            {
                "Key": "Country of Origin",
                "Value": "Imported",
                "ProductVariantId": 15
            },
            {
                "Key": "Target Audience",
                "Value": "Women",
                "ProductVariantId": 15
            },
            {
                "Key": "Durability",
                "Value": "Tarnish-resistant",
                "ProductVariantId": 15
            },
            {
                "Key": "Link Style",
                "Value": "Solid Links",
                "ProductVariantId": 15
            },
            {
                "Key": "Finish",
                "Value": "High Polish",
                "ProductVariantId": 15
            },
            {
                "Key": "Hypoallergenic",
                "Value": "Yes",
                "ProductVariantId": 15
            },
            {
                "Key": "Packaging",
                "Value": "Gift Box Included",
                "ProductVariantId": 15
            },
            {
                "Key": "Material",
                "Value": "Gold-Plated Alloy",
                "ProductVariantId": 16
            },
            {
                "Key": "Color",
                "Value": "Gold",
                "ProductVariantId": 16
            },
            {
                "Key": "Size",
                "Value": "Medium",
                "ProductVariantId": 16
            },
            {
                "Key": "Style",
                "Value": "Delicate Chain",
                "ProductVariantId": 16
            },
            {
                "Key": "Clasp Type",
                "Value": "Lobster Claw",
                "ProductVariantId": 16
            },
            {
                "Key": "Chain Type",
                "Value": "Cable Chain",
                "ProductVariantId": 16
            },
            {
                "Key": "Adjustable Length",
                "Value": "Yes",
                "ProductVariantId": 16
            },
            {
                "Key": "Main Stone",
                "Value": "None",
                "ProductVariantId": 16
            },
            {
                "Key": "Plating Thickness",
                "Value": "0.5 microns",
                "ProductVariantId": 16
            },
            {
                "Key": "Care Instructions",
                "Value": "Avoid contact with water and chemicals",
                "ProductVariantId": 16
            },
            {
                "Key": "Occasion",
                "Value": "Casual, Everyday Wear",
                "ProductVariantId": 16
            },
            {
                "Key": "Metal Purity",
                "Value": "Not Applicable",
                "ProductVariantId": 16
            },
            {
                "Key": "Weight",
                "Value": "0.12 lbs",
                "ProductVariantId": 16
            },
            {
                "Key": "Country of Origin",
                "Value": "Imported",
                "ProductVariantId": 16
            },
            {
                "Key": "Target Audience",
                "Value": "Women",
                "ProductVariantId": 16
            },
            {
                "Key": "Durability",
                "Value": "Tarnish-resistant",
                "ProductVariantId": 16
            },
            {
                "Key": "Link Style",
                "Value": "Solid Links",
                "ProductVariantId": 16
            },
            {
                "Key": "Finish",
                "Value": "High Polish",
                "ProductVariantId": 16
            },
            {
                "Key": "Hypoallergenic",
                "Value": "Yes",
                "ProductVariantId": 16
            },
            {
                "Key": "Packaging",
                "Value": "Gift Box Included",
                "ProductVariantId": 16
            },
            {
                "Key": "Material",
                "Value": "Gold-Plated Alloy",
                "ProductVariantId": 17
            },
            {
                "Key": "Color",
                "Value": "Gold",
                "ProductVariantId": 17
            },
            {
                "Key": "Size",
                "Value": "Large",
                "ProductVariantId": 17
            },
            {
                "Key": "Style",
                "Value": "Delicate Chain",
                "ProductVariantId": 17
            },
            {
                "Key": "Clasp Type",
                "Value": "Lobster Claw",
                "ProductVariantId": 17
            },
            {
                "Key": "Chain Type",
                "Value": "Cable Chain",
                "ProductVariantId": 17
            },
            {
                "Key": "Adjustable Length",
                "Value": "Yes",
                "ProductVariantId": 17
            },
            {
                "Key": "Main Stone",
                "Value": "None",
                "ProductVariantId": 17
            },
            {
                "Key": "Plating Thickness",
                "Value": "0.5 microns",
                "ProductVariantId": 17
            },
            {
                "Key": "Care Instructions",
                "Value": "Avoid contact with water and chemicals",
                "ProductVariantId": 17
            },
            {
                "Key": "Occasion",
                "Value": "Casual, Everyday Wear",
                "ProductVariantId": 17
            },
            {
                "Key": "Metal Purity",
                "Value": "Not Applicable",
                "ProductVariantId": 17
            },
            {
                "Key": "Weight",
                "Value": "0.15 lbs",
                "ProductVariantId": 17
            },
            {
                "Key": "Country of Origin",
                "Value": "Imported",
                "ProductVariantId": 17
            },
            {
                "Key": "Target Audience",
                "Value": "Women",
                "ProductVariantId": 17
            },
            {
                "Key": "Durability",
                "Value": "Tarnish-resistant",
                "ProductVariantId": 17
            },
            {
                "Key": "Link Style",
                "Value": "Solid Links",
                "ProductVariantId": 17
            },
            {
                "Key": "Finish",
                "Value": "High Polish",
                "ProductVariantId": 17
            },
            {
                "Key": "Hypoallergenic",
                "Value": "Yes",
                "ProductVariantId": 17
            },
            {
                "Key": "Packaging",
                "Value": "Gift Box Included",
                "ProductVariantId": 17
            },
            {
                "Key": "Main Stone",
                "Value": "Diamond",
                "ProductVariantId": 18
            },
            {
                "Key": "Carat Weight",
                "Value": "0.25 ct",
                "ProductVariantId": 18
            },
            {
                "Key": "Diamond Cut",
                "Value": "Round",
                "ProductVariantId": 18
            },
            {
                "Key": "Diamond Clarity",
                "Value": "SI1-SI2",
                "ProductVariantId": 18
            },
            {
                "Key": "Diamond Color",
                "Value": "G-H",
                "ProductVariantId": 18
            },
            {
                "Key": "Metal",
                "Value": "Sterling Silver",
                "ProductVariantId": 18
            },
            {
                "Key": "Plating",
                "Value": "Rhodium Plated",
                "ProductVariantId": 18
            },
            {
                "Key": "Chain Length",
                "Value": "18 inches",
                "ProductVariantId": 18
            },
            {
                "Key": "Clasp Type",
                "Value": "Spring Ring",
                "ProductVariantId": 18
            },
            {
                "Key": "Style",
                "Value": "Solitaire Pendant",
                "ProductVariantId": 18
            },
            {
                "Key": "Occasion",
                "Value": "Formal, Special Occasions",
                "ProductVariantId": 18
            },
            {
                "Key": "Care Instructions",
                "Value": "Clean with a soft cloth",
                "ProductVariantId": 18
            },
            {
                "Key": "Setting Type",
                "Value": "Prong Setting",
                "ProductVariantId": 18
            },
            {
                "Key": "Weight",
                "Value": "0.2 lbs",
                "ProductVariantId": 18
            },
            {
                "Key": "Country of Origin",
                "Value": "USA",
                "ProductVariantId": 18
            },
            {
                "Key": "Target Audience",
                "Value": "Women",
                "ProductVariantId": 18
            },
            {
                "Key": "Durability",
                "Value": "High",
                "ProductVariantId": 18
            },
            {
                "Key": "Finish",
                "Value": "High Polish",
                "ProductVariantId": 18
            },
            {
                "Key": "Packaging",
                "Value": "Luxury Gift Box Included",
                "ProductVariantId": 18
            },
            {
                "Key": "Metal Purity",
                "Value": "925 Sterling Silver",
                "ProductVariantId": 18
            },
            {
                "Key": "Main Stone",
                "Value": "Diamond",
                "ProductVariantId": 19
            },
            {
                "Key": "Carat Weight",
                "Value": "0.15 ct",
                "ProductVariantId": 19
            },
            {
                "Key": "Diamond Cut",
                "Value": "Baguette",
                "ProductVariantId": 19
            },
            {
                "Key": "Diamond Clarity",
                "Value": "VS1-VS2",
                "ProductVariantId": 19
            },
            {
                "Key": "Diamond Color",
                "Value": "D-F",
                "ProductVariantId": 19
            },
            {
                "Key": "Metal",
                "Value": "14K White Gold",
                "ProductVariantId": 19
            },
            {
                "Key": "Chain Length",
                "Value": "16 inches + 2 inch extender",
                "ProductVariantId": 19
            },
            {
                "Key": "Clasp Type",
                "Value": "Lobster Claw",
                "ProductVariantId": 19
            },
            {
                "Key": "Style",
                "Value": "Bar Pendant",
                "ProductVariantId": 19
            },
            {
                "Key": "Occasion",
                "Value": "Everyday Wear, Modern Events",
                "ProductVariantId": 19
            },
            {
                "Key": "Care Instructions",
                "Value": "Clean with a soft cloth",
                "ProductVariantId": 19
            },
            {
                "Key": "Setting Type",
                "Value": "Channel Setting",
                "ProductVariantId": 19
            },
            {
                "Key": "Weight",
                "Value": "0.15 lbs",
                "ProductVariantId": 19
            },
            {
                "Key": "Country of Origin",
                "Value": "Europe",
                "ProductVariantId": 19
            },
            {
                "Key": "Target Audience",
                "Value": "Women",
                "ProductVariantId": 19
            },
            {
                "Key": "Durability",
                "Value": "High",
                "ProductVariantId": 19
            },
            {
                "Key": "Finish",
                "Value": "High Polish",
                "ProductVariantId": 19
            },
            {
                "Key": "Packaging",
                "Value": "Elegant Gift Box Included",
                "ProductVariantId": 19
            },
            {
                "Key": "Metal Purity",
                "Value": "14K",
                "ProductVariantId": 19
            },
            {
                "Key": "Design",
                "Value": "Minimalist",
                "ProductVariantId": 19
            },
            {
                "Key": "Theme",
                "Value": "Star Wars",
                "ProductVariantId": 20
            },
            {
                "Key": "Age Range",
                "Value": "16+",
                "ProductVariantId": 20
            },
            {
                "Key": "Number of Pieces",
                "Value": "6187",
                "ProductVariantId": 20
            },
            {
                "Key": "Model Name",
                "Value": "Millennium Falcon",
                "ProductVariantId": 20
            },
            {
                "Key": "Product Dimensions",
                "Value": "33 x 24 x 8 inches",
                "ProductVariantId": 20
            },
            {
                "Key": "Material",
                "Value": "Plastic",
                "ProductVariantId": 20
            },
            {
                "Key": "Educational Objective",
                "Value": "Creative Building",
                "ProductVariantId": 20
            },
            {
                "Key": "Special Features",
                "Value": "Highly detailed model, removable canopy, rotating gun turrets",
                "ProductVariantId": 20
            },
            {
                "Key": "Assembly Required",
                "Value": "Yes",
                "ProductVariantId": 20
            },
            {
                "Key": "Batteries Required",
                "Value": "No",
                "ProductVariantId": 20
            },
            {
                "Key": "Weight",
                "Value": "14 lbs",
                "ProductVariantId": 20
            },
            {
                "Key": "Country of Origin",
                "Value": "Denmark",
                "ProductVariantId": 20
            },
            {
                "Key": "Minifigures Included",
                "Value": "7 (Luke Skywalker, Han Solo, Princess Leia, Chewbacca, C-3PO, R2-D2, BB-8)",
                "ProductVariantId": 20
            },
            {
                "Key": "Interior Details",
                "Value": "Detailed cockpit, gunnery stations, engineering bay",
                "ProductVariantId": 20
            },
            {
                "Key": "Collectible",
                "Value": "Yes",
                "ProductVariantId": 20
            },
            {
                "Key": "Release Date",
                "Value": "2017",
                "ProductVariantId": 20
            },
            {
                "Key": "Care Instructions",
                "Value": "Wipe with a dry cloth",
                "ProductVariantId": 20
            },
            {
                "Key": "Skill Level",
                "Value": "Expert",
                "ProductVariantId": 20
            },
            {
                "Key": "Barcode",
                "Value": "673419266521",
                "ProductVariantId": 20
            },
            {
                "Key": "Model Number",
                "Value": "75192",
                "ProductVariantId": 20
            }

        ]
    })

    // Seed Reviews
    const productVariants = await prisma.productVariant.findMany();
    await prisma.review.createMany({
        data: [
            {
                "UserId": 3,
                "ProductVariantId": 1,
                "NoOfStars": 5,
                "Comment": "Absolutely love this phone! The camera is fantastic and it's super fast. Great value for the price.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 1,
                "NoOfStars": 4,
                "Comment": "Good phone overall. The battery life could be a bit better, but the performance is excellent.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 1,
                "NoOfStars": 5,
                "Comment": "Upgraded from my old phone and I'm blown away! The screen is so vibrant.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 2,
                "NoOfStars": 5,
                "Comment": "The extra storage is a lifesaver! Same great phone as the 128GB version, but with more room for everything.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 2,
                "NoOfStars": 4,
                "Comment": "Happy with my purchase. The phone is snappy and the camera is impressive. Discount was a nice bonus.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 2,
                "NoOfStars": 5,
                "Comment": "Worth the extra money for the 256GB. No regrets!",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 3,
                "NoOfStars": 5,
                "Comment": "This phone is incredible! The zoom on the camera is amazing, and the screen is beautiful. Definitely worth the investment.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 3,
                "NoOfStars": 5,
                "Comment": "The best smartphone I've ever owned. The S Pen is so useful and the performance is top-notch.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 3,
                "NoOfStars": 4,
                "Comment": "Great phone, but it's quite expensive. However, the features justify the cost.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 4,
                "NoOfStars": 4,
                "Comment": "Excellent phone with tons of storage. Sometimes feels a bit large in the hand, but the features are fantastic.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 4,
                "NoOfStars": 5,
                "Comment": "If you need a lot of space, this is the phone for you. It's fast, takes great photos, and the battery lasts all day.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 4,
                "NoOfStars": 5,
                "Comment": "The 512GB is overkill for most, but I love having the peace of mind. Fantastic phone.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 5,
                "NoOfStars": 5,
                "Comment": "The noise cancellation on these headphones is unbelievable! So comfortable to wear for long periods too.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 5,
                "NoOfStars": 4,
                "Comment": "Great sound quality and the noise cancellation works really well. A bit pricey, but worth it for the quiet.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 6,
                "NoOfStars": 5,
                "Comment": "Love the white color! Same amazing Bose quality as the black ones. Perfect for my workouts.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 6,
                "NoOfStars": 4,
                "Comment": "Very comfortable and the sound is excellent. Noise cancellation is still top-tier.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 6,
                "NoOfStars": 5,
                "Comment": "Prefer these over my old headphones. The white looks super stylish.",
                "PostedDate": new Date()
            }, {
                "UserId": 5,
                "ProductVariantId": 7,
                "NoOfStars": 5,
                "Comment": "These Sony headphones are fantastic! The sound is so clear and the noise cancellation is the best I've tried.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 7,
                "NoOfStars": 5,
                "Comment": "The blue color is really nice! Great sound and comfortable for hours of listening.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 7,
                "NoOfStars": 4,
                "Comment": "Excellent headphones, but the touch controls take some getting used to.",
                "PostedDate": new Date()
            },

            {
                "UserId": 5,
                "ProductVariantId": 8,
                "NoOfStars": 5,
                "Comment": "These Sony headphones are fantastic! The sound is so clear and the noise cancellation is the best I've tried.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 8,
                "NoOfStars": 5,
                "Comment": "The blue color is really nice! Great sound and comfortable for hours of listening.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 8,
                "NoOfStars": 4,
                "Comment": "Excellent headphones, but the touch controls take some getting used to.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 9,
                "NoOfStars": 4,
                "Comment": "A great smartwatch for keeping track of my fitness and notifications. The small band fits perfectly.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 9,
                "NoOfStars": 5,
                "Comment": "Love my new Apple Watch! So many useful features and it looks great.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 9,
                "NoOfStars": 5,
                "Comment": "Easy to use and the health tracking is very accurate.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 10,
                "NoOfStars": 4,
                "Comment": "The medium band is a much better fit for me. Same great Apple Watch features.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 10,
                "NoOfStars": 5,
                "Comment": "Very happy with the size and all the health tracking features. A worthwhile upgrade.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 10,
                "NoOfStars": 4,
                "Comment": "Good watch, but the battery life could be better.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 11,
                "NoOfStars": 5,
                "Comment": "This leather jacket is exactly what I was looking for. Great quality and fits perfectly.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 11,
                "NoOfStars": 4,
                "Comment": "Stylish jacket and seems well-made. The small size is just right.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 11,
                "NoOfStars": 5,
                "Comment": "Excellent leather quality. Very happy with this purchase.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 12,
                "NoOfStars": 4,
                "Comment": "Nice jacket, fits well in medium, good for the price.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 12,
                "NoOfStars": 5,
                "Comment": "Excellent quality leather, very stylish.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 12,
                "NoOfStars": 4,
                "Comment": "The medium size was perfect. Happy with my purchase.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 13,
                "NoOfStars": 5,
                "Comment": "Beautiful floral dress! Perfect for summer.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 13,
                "NoOfStars": 4,
                "Comment": "Love the pattern, but the material is a bit thin.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 13,
                "NoOfStars": 5,
                "Comment": "Great dress for a casual day out. Many compliments!",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 14,
                "NoOfStars": 4,
                "Comment": "The medium size fits perfectly. Very comfortable.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 14,
                "NoOfStars": 5,
                "Comment": "Gorgeous dress, and the colors are so vibrant.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 14,
                "NoOfStars": 4,
                "Comment": "Good quality for the price. Would recommend.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 15,
                "NoOfStars": 5,
                "Comment": "Elegant bracelet, perfect for everyday wear.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 15,
                "NoOfStars": 4,
                "Comment": "Pretty, but a bit delicate. Be careful with it.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 15,
                "NoOfStars": 5,
                "Comment": "Love the gold plating, very classy.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 16,
                "NoOfStars": 4,
                "Comment": "Nice bracelet, fits well, good quality.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 16,
                "NoOfStars": 5,
                "Comment": "Beautiful bracelet, very happy with my purchase.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 16,
                "NoOfStars": 4,
                "Comment": "Looks great, but the clasp is a little fiddly.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 17,
                "NoOfStars": 5,
                "Comment": "Stunning bracelet, perfect for special occasions.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 17,
                "NoOfStars": 5,
                "Comment": "Excellent quality and design.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 17,
                "NoOfStars": 4,
                "Comment": "Very elegant and sophisticated.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 18,
                "NoOfStars": 5,
                "Comment": "Beautiful diamond necklace, very sparkly.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 18,
                "NoOfStars": 4,
                "Comment": "Classic and timeless, love it.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 18,
                "NoOfStars": 5,
                "Comment": "Perfect for a special gift.",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 19,
                "NoOfStars": 4,
                "Comment": "Modern and stylish, love the design.",
                "PostedDate": new Date()
            },
            {
                "UserId": 3,
                "ProductVariantId": 19,
                "NoOfStars": 5,
                "Comment": "Unique and eye-catching. Great purchase.",
                "PostedDate": new Date()
            },
            {
                "UserId": 2,
                "ProductVariantId": 19,
                "NoOfStars": 4,
                "Comment": "Very pretty, but a little smaller than expected.",
                "PostedDate": new Date()
            },
            {
                "UserId": 5,
                "ProductVariantId": 20,
                "NoOfStars": 5,
                "Comment": "Amazing LEGO set! So detailed and fun to build.",
                "PostedDate": new Date()
            },
            {
                "UserId": 4,
                "ProductVariantId": 20,
                "NoOfStars": 5,
                "Comment": "A must-have for any Star Wars fan!",
                "PostedDate": new Date()
            },
            {
                "UserId": 1,
                "ProductVariantId": 20,
                "NoOfStars": 4,
                "Comment": "Challenging build, but worth it in the end.",
                "PostedDate": new Date()
            }
        ],
    });

    // Seed Coupons
    await prisma.coupon.createMany({
        data: [
            { IsActive: true, CouponCode: 'DISCOUNT1012345', MaxNoOfUsagePerUser: 1, Discount: 10 },
            { IsActive: true, CouponCode: 'DISCOUNT2012345', MaxNoOfUsagePerUser: 2, Discount: 20 },
        ],
    });

    // Seed Cart
    await prisma.cart.createMany({
        data: [
            { UserId: 1 },
            { UserId: 2 },
            { UserId: 3 },
            { UserId: 4 },
            { UserId: 5 }
        ]
    });

    // Seed Cart Products
    await prisma.cartProduct.createMany({
        data: [
            { IsActive: true, CartId: 1, ProductVariantId: 1, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 2, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 3, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 6, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 9, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 11, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 12, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 14, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 15, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 17, Quantity: 2, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 19, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 1, ProductVariantId: 20, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 2, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 4, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 5, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 7, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 8, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 10, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 11, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 13, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 14, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 16, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 18, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 2, ProductVariantId: 19, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 1, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 3, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 4, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 6, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 9, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 10, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 12, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 13, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 15, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 17, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 3, ProductVariantId: 19, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 2, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 3, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 5, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 7, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 8, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 9, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 11, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 13, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 15, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 16, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 18, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 4, ProductVariantId: 20, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 1, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 4, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 6, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 7, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 8, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 10, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 12, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 14, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 16, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 18, Quantity: 1, AddedDate: new Date() },
            { IsActive: true, CartId: 5, ProductVariantId: 20, Quantity: 1, AddedDate: new Date() },
        ]
    })

    console.log('Seeding completed!');
}



main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
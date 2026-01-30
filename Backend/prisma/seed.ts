import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Clear existing products
    await prisma.product.deleteMany({});
    console.log('Cleared existing products.');

    const products = [
        {
            name: 'Velvet Evening Jacket',
            description: 'A masterpiece of tailoring, this velvet jacket features a structured shoulder and a slim, tapered waist. The deep obsidian fabric absorbs light, creating a silhouette of pure elegance. Perfect for evening affairs.',
            price: 8500.00,
            imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
            category: 'Jackets',
            stock: 20,
            colors: ['Obsidian', 'Midnight Blue', 'Burgundy'],
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            name: 'Silk Chiffon Blouse',
            description: 'Crafted from 100% mulberry silk, this blouse floats against the skin. Featuring a classic bow neck and pearlescent buttons, it adds a touch of softness to any structured ensemble.',
            price: 4200.00,
            imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=1000',
            category: 'Tops',
            stock: 35,
            colors: ['Ivory', 'Champagne', 'Rose Dust'],
            sizes: ['XS', 'S', 'M', 'L']
        },
        {
            name: 'Tailored Wool Trousers',
            description: 'Italian wool trousers with a high-waisted fit and a sharp pleat. These trousers elongate the leg and offer unparalleled comfort without compromising on style.',
            price: 5500.00,
            imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000',
            category: 'Bottoms',
            stock: 25,
            colors: ['Charcoal', 'Slate', 'Espresso'],
            sizes: ['28', '30', '32', '34']
        },
        {
            name: 'Cashmere Oversized Sweater',
            description: 'Pure cashmere luxury. This oversized sweater is designed for comfort and chic layering. The neutral tones make it a versatile staple for the modern wardrobe.',
            price: 7500.00,
            imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
            category: 'Knitwear',
            stock: 15,
            colors: ['Oatmeal', 'Heather Grey', 'Cream'],
            sizes: ['S/M', 'L/XL']
        },
        {
            name: 'Obsidian Leather Clutch',
            description: 'Minimalist architecture in leather. This structured clutch features gold hardware and a detachable chain strap. The ultimate evening companion.',
            price: 3800.00,
            imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000',
            category: 'Accessories',
            stock: 10,
            colors: ['Obsidian', 'Oxblood'],
            sizes: ['One Size']
        },
        {
            name: 'Chelsea Boots',
            description: 'Handcrafted from Italian calf leather, these boots feature a sleek profile and a comfortable block heel. Durable, stylish, and timeless.',
            price: 6500.00,
            imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=1000',
            category: 'Footwear',
            stock: 18,
            colors: ['Black', 'Chestnut'],
            sizes: ['36', '37', '38', '39', '40', '41']
        },
        {
            name: 'Minimalist Gold Watch',
            description: 'A statement of understated luxury. Featuring a mesh gold strap and a black dial, this watch is powered by precise Swiss movement.',
            price: 12500.00,
            imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000',
            category: 'Jewelry',
            stock: 8,
            colors: ['Gold'],
            sizes: ['One Size']
        },
        {
            name: 'Midnight Silk Scarf',
            description: 'Woven from the finest silk, this scarf features a subtle geometric print. It drapes beautifully and adds a sophisticated pop of color.',
            price: 2500.00,
            imageUrl: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=1000',
            category: 'Accessories',
            stock: 50,
            colors: ['Midnight Blue', 'Emerald', 'Ruby'],
            sizes: ['One Size']
        },
        {
            name: 'Structured Leather Tote',
            description: 'The perfect work-to-weekend bag. Generously sized with internal organization, this tote is crafted from pebbled leather that ages beautifully.',
            price: 8900.00,
            imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000',
            category: 'Accessories',
            stock: 12,
            colors: ['Tan', 'Black', 'Taupe'],
            sizes: ['One Size']
        },
        {
            name: 'Linen Summer Blazer',
            description: 'Breathable and chic, this unlined linen blazer is ideal for warmer climates. The relaxed fit gives it a modern, effortless vibe.',
            price: 7200.00,
            imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
            category: 'Jackets',
            stock: 22,
            colors: ['White', 'Sand', 'Sage'],
            sizes: ['S', 'M', 'L']
        },
        {
            name: 'Pleated Midi Skirt',
            description: 'Fluid movement defined. This midi skirt features sharp accordion pleats and a comfortable elastic waistband. versatile enough for day or night.',
            price: 4500.00,
            imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=1000',
            category: 'Bottoms',
            stock: 30,
            colors: ['Metallic Gold', 'Black', 'Dusty Pink'],
            sizes: ['XS', 'S', 'M', 'L']
        },
        {
            name: 'Satin Slip Dress',
            description: 'Bias-cut for a flattering fit, this satin slip dress skims the body. Featuring delicate spaghetti straps and a cowl neckline.',
            price: 5200.00,
            imageUrl: 'https://images.unsplash.com/photo-1485231183945-3ec4649f9d41?auto=format&fit=crop&q=80&w=1000',
            category: 'Dresses',
            stock: 25,
            colors: ['Champagne', 'Black', 'Emerald'],
            sizes: ['XS', 'S', 'M', 'L']
        },
    ];

    for (const p of products) {
        const product = await prisma.product.create({
            data: {
                ...p,
                colors: JSON.stringify(p.colors),
                sizes: JSON.stringify(p.sizes)
            },
        });
        console.log(`Created product with id: ${product.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

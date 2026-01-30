import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Cotton T-Shirt',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],

    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#000000', '#F5F5DC'],
    category: 'T-Shirts',
    description:
      'Heavyweight cotton jersey t-shirt with a relaxed, boxy fit. Features dropped shoulders and a ribbed crew neck.',
    newArrival: true,
    featured: true
  },
  {
    id: '2',
    name: 'Pleated Wide Leg Trousers',
    price: 4800,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'],

    sizes: ['28', '30', '32', '34'],
    colors: ['#000000', '#808080'],
    category: 'Pants',
    description:
      'Tailored trousers cut from premium wool blend. High-waisted fit with double pleats and a wide, flowing leg.',
    featured: true
  },
  {
    id: '3',
    name: 'Structured Wool Blazer',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800'],

    sizes: ['46', '48', '50', '52'],
    colors: ['#000000', '#1A1A1A'],
    category: 'Outerwear',
    description:
      'Classic single-breasted blazer with structured shoulders. Fully lined with internal pockets.',
    newArrival: true
  },
  {
    id: '4',
    name: 'Minimalist Leather Sneakers',
    price: 6500,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'],

    sizes: ['40', '41', '42', '43', '44'],
    colors: ['#FFFFFF', '#000000'],
    category: 'Footwear',
    description:
      'Handcrafted leather sneakers with a clean, minimal profile. Durable rubber sole and leather lining.',
    featured: true
  },
  {
    id: '5',
    name: 'Cashmere Blend Sweater',
    price: 5500,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800'],

    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#D2B48C', '#808080', '#000000'],
    category: 'Knitwear',
    description:
      'Luxuriously soft cashmere and wool blend sweater. Features ribbed trims and a regular fit.',
    newArrival: true
  },
  {
    id: '6',
    name: 'Utility Cargo Pants',
    price: 4200,
    images: [
      'https://images.unsplash.com/photo-1517445312882-5627b9311353?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'],

    sizes: ['28', '30', '32', '34'],
    colors: ['#556B2F', '#000000'],
    category: 'Pants',
    description:
      'Functional cargo pants with multiple pockets. Made from durable cotton twill with a relaxed fit.'
  },
  {
    id: '7',
    name: 'Oversized Denim Jacket',
    price: 5200,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800'],

    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#87CEEB', '#000000'],
    category: 'Outerwear',
    description:
      'Vintage-inspired denim jacket with an oversized silhouette. Features branded hardware and contrast stitching.',
    newArrival: true
  },
  {
    id: '8',
    name: 'Silk Blend Shirt',
    price: 4500,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=80&w=800'],

    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#000000'],
    category: 'Shirts',
    description:
      'Fluid silk blend shirt with a concealed placket. Perfect for evening wear or elevated daily looks.'
  },
  {
    id: '9',
    name: 'Leather Crossbody Bag',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'],

    sizes: ['One Size'],
    colors: ['#000000', '#8B4513'],
    category: 'Accessories',
    description:
      'Compact crossbody bag crafted from italian leather. Adjustable strap and silver-tone hardware.'
  },
  {
    id: '10',
    name: 'Relaxed Linen Shorts',
    price: 2500,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800'],

    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F5F5DC', '#000000', '#808000'],
    category: 'Shorts',
    description:
      'Breathable linen shorts for warmer days. Elasticated waistband with drawstring for comfort.'
  },
  {
    id: '11',
    name: 'Wool Blend Coat',
    price: 12500,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?auto=format&fit=crop&q=80&w=800'],

    sizes: ['46', '48', '50', '52'],
    colors: ['#000000', '#A9A9A9'],
    category: 'Outerwear',
    description:
      'Longline wool coat with a notched lapel. A timeless essential for the modern wardrobe.',
    newArrival: true
  },
  {
    id: '12',
    name: 'Ribbed Beanie',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800'],

    sizes: ['One Size'],
    colors: ['#000000', '#808080', '#D2B48C'],
    category: 'Accessories',
    description:
      'Classic ribbed beanie made from merino wool. Warm, durable, and essential for winter.'
  }];
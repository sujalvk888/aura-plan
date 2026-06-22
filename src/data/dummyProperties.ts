export interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
}

export const dummyProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Modern Luxury Villa',
    description: 'A breathtaking ultra-modern villa with sleek architectural lines, infinity pool, and luxurious warm lighting.',
    location: 'Beverly Hills, California',
    imageUrl: '/property-villa.png'
  },
  {
    id: 'prop-2',
    name: 'Skyline Penthouse Apartment',
    description: 'High-rise luxury living with floor-to-ceiling windows offering spectacular city skyline views.',
    location: 'Manhattan, New York',
    imageUrl: '/property-apartment.png'
  },
  {
    id: 'prop-3',
    name: 'Suburban Family Home',
    description: 'Beautiful modern family house featuring elegant design, cozy lighting, and a well-maintained lawn.',
    location: 'Austin, Texas',
    imageUrl: '/property-house.png'
  },
  {
    id: 'prop-4',
    name: 'Oceanfront Beach House',
    description: 'Stunning beach house with large glass facades facing the ocean and wide wooden decks for sunrise views.',
    location: 'Malibu, California',
    imageUrl: '/property-beach-house.png'
  },
  {
    id: 'prop-5',
    name: 'Alpine Mountain Retreat',
    description: 'Luxurious modern cabin surrounded by pine trees and snow-capped peaks, perfect for a cozy winter getaway.',
    location: 'Aspen, Colorado',
    imageUrl: '/property-mountain.png'
  },
  {
    id: 'prop-6',
    name: 'Corporate Innovation Hub',
    description: 'Sleek modern commercial office space with open plan layout, high ceilings, and premium materials.',
    location: 'Silicon Valley, California',
    imageUrl: '/property-commercial.png'
  }
];

import { PrismaClient, UserRole, PropertyType, PropertyStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dyxersoft.com' },
    update: {},
    create: {
      email: 'admin@dyxersoft.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'Dyxersoft',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create agent user
  const agentPassword = await bcrypt.hash('agent123', 12);
  const agent = await prisma.user.upsert({
    where: { email: 'agent@dyxersoft.com' },
    update: {},
    create: {
      email: 'agent@dyxersoft.com',
      password: agentPassword,
      firstName: 'John',
      lastName: 'Agent',
      role: UserRole.AGENT,
      phone: '+591-709-55-012',
      emailVerified: true,
    },
  });
  console.log('✅ Agent user created:', agent.email);

  // Create property owner
  const ownerPassword = await bcrypt.hash('owner123', 12);
  const owner = await prisma.user.upsert({
    where: { email: 'owner@dyxersoft.com' },
    update: {},
    create: {
      email: 'owner@dyxersoft.com',
      password: ownerPassword,
      firstName: 'Maria',
      lastName: 'Property Owner',
      role: UserRole.OWNER,
      phone: '+591-609-47-045',
      emailVerified: true,
    },
  });
  console.log('✅ Property owner created:', owner.email);

  // Create client user
  const clientPassword = await bcrypt.hash('client123', 12);
  const client = await prisma.user.upsert({
    where: { email: 'client@dyxersoft.com' },
    update: {},
    create: {
      email: 'client@dyxersoft.com',
      password: clientPassword,
      firstName: 'Carlos',
      lastName: 'Client',
      role: UserRole.CLIENT,
      phone: '+591-709-55-078',
      emailVerified: true,
    },
  });
  console.log('✅ Client user created:', client.email);

  // Create sample properties
  const properties = [
    {
      title: 'Luxury Villa in Punta Cana',
      description: 'Beautiful oceanfront villa with private beach access. Perfect for vacation rental or permanent residence.',
      address: 'Playa Bavaro',
      city: 'Punta Cana',
      state: 'La Altagracia',
      zipCode: '23000',
      latitude: 18.5512,
      longitude: -68.3714,
      price: 2500000,
      bedrooms: 5,
      bathrooms: 4,
      area: 450.5,
      lotSize: 1200.0,
      yearBuilt: 2020,
      propertyType: PropertyType.VILLA,
      status: PropertyStatus.ACTIVE,
      isFeatured: true,
      ownerId: owner.id,
      agentId: agent.id,
    },
    {
      title: 'Modern Apartment in Zona Colonial',
      description: 'Stylish apartment in the heart of Santo Domingo\'s historic district.',
      address: 'Calle Las Damas',
      city: 'Santo Domingo',
      state: 'Distrito Nacional',
      zipCode: '10210',
      latitude: 18.4731,
      longitude: -69.8857,
      price: 350000,
      bedrooms: 2,
      bathrooms: 2,
      area: 120.0,
      yearBuilt: 2018,
      propertyType: PropertyType.APARTMENT,
      status: PropertyStatus.ACTIVE,
      ownerId: owner.id,
      agentId: agent.id,
    },
    {
      title: 'Commercial Office Space',
      description: 'Prime commercial space in business district. Perfect for offices or retail.',
      address: 'Av. Winston Churchill',
      city: 'Santo Domingo',
      state: 'Distrito Nacional',
      zipCode: '10147',
      latitude: 18.4655,
      longitude: -69.9403,
      price: 850000,
      area: 280.0,
      yearBuilt: 2019,
      propertyType: PropertyType.COMMERCIAL,
      status: PropertyStatus.ACTIVE,
      ownerId: owner.id,
      agentId: agent.id,
    },
  ];

  for (const propertyData of properties) {
    const property = await prisma.property.create({
      data: propertyData,
    });
    console.log(`✅ Property created: ${property.title}`);

    // Add sample features
    const features = [
      { name: 'Air Conditioning', value: 'Central AC' },
      { name: 'Parking', value: '2 spaces' },
      { name: 'Security', value: '24/7 Security' },
      { name: 'Pool', value: 'Swimming Pool' },
    ];

    for (const feature of features) {
      await prisma.propertyFeature.create({
        data: {
          ...feature,
          propertyId: property.id,
        },
      });
    }

    // Add sample images
    const images = [
      { url: '/images/property1-main.jpg', caption: 'Main view', isPrimary: true, order: 1 },
      { url: '/images/property1-kitchen.jpg', caption: 'Kitchen', isPrimary: false, order: 2 },
      { url: '/images/property1-bedroom.jpg', caption: 'Master bedroom', isPrimary: false, order: 3 },
    ];

    for (const image of images) {
      await prisma.propertyImage.create({
        data: {
          ...image,
          propertyId: property.id,
        },
      });
    }
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
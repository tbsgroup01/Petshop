const PETS_KEY = 'petshop_pets';
const INQUIRY_KEY = 'petshop_unread_inquiries';
const BOOKINGS_KEY = 'petshop_bookings';

const defaultPets = [
  { id: 1, name: 'Buddy (Golden Retriever)', price: '₹1,200', inquiries: 32, views: 1200, img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400', tag: 'BEST SELLING', active: true, status: 'ACTIVE', statusColor: 'bg-emerald-500', location: 'New York, NY', added: 'Added 2 days ago' },
  { id: 2, name: 'Molly (French Bulldog)', price: '₹2,500', inquiries: 18, views: 842, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400', tag: 'TOP TRENDING', active: true, status: 'ACTIVE', statusColor: 'bg-emerald-500', location: 'Los Angeles, CA', added: 'Added 4 days ago' },
  { id: 3, name: 'Shadow (Black Lab)', price: '₹950', inquiries: 12, views: 2100, img: 'https://images.unsplash.com/photo-1590767950092-42b8362368da?auto=format&fit=crop&q=80&w=400', tag: 'HOT LISTING', active: false, status: 'SOLD', statusColor: 'bg-slate-700', location: 'Boston, MA', added: 'Sold 1 week ago' },
  { id: 4, name: 'Luna (Husky)', price: '₹1,800', inquiries: 9, views: 420, img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400', tag: 'NEW', active: true, status: 'ACTIVE', statusColor: 'bg-emerald-500', location: 'Chicago, IL', added: 'Added 5 days ago' },
];

export const loadPets = () => {
  if (typeof window === 'undefined') {
    return defaultPets;
  }

  const saved = window.localStorage.getItem(PETS_KEY);
  if (!saved) {
    window.localStorage.setItem(PETS_KEY, JSON.stringify(defaultPets));
    return defaultPets;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : defaultPets;
  } catch (error) {
    window.localStorage.setItem(PETS_KEY, JSON.stringify(defaultPets));
    return defaultPets;
  }
};

export const loadBookings = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = window.localStorage.getItem(BOOKINGS_KEY);
  if (!saved) {
    const defaultBookings = [
      {
        id: 1,
        petName: 'Max',
        breed: 'Golden Retriever',
        gender: 'Male',
        location: 'Mumbai, MH',
        price: '₹1,200',
        service: 'Daycare',
        date: 'May 10, 2026 • 09:00 AM',
        status: 'Confirmed',
      },
      {
        id: 2,
        petName: 'Luna',
        breed: 'Border Collie',
        gender: 'Female',
        location: 'Pune, MH',
        price: '1,800',
        service: 'Meeting',
        date: 'May 12, 2026 • 11:30 AM',
        status: 'Pending',
      },
    ];
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(defaultBookings));
    return defaultBookings;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
    return [];
  }
};

export const saveBookings = (bookings) => {
  if (typeof window === 'undefined') {
    return null;
  }
  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return bookings;
};

export const addBooking = (booking) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const bookings = loadBookings();
  const nextId = bookings.length ? Math.max(...bookings.map((item) => item.id || 0)) + 1 : 1;
  const nextBooking = {
    id: nextId,
    petName: booking.petName || 'Unknown Pet',
    breed: booking.breed || 'Mixed Breed',
    gender: booking.gender || 'Male',
    location: booking.location || 'Unknown Location',
    price: booking.price || '1,200',
    service: booking.service || 'Daycare',
    date: booking.date || new Date().toLocaleString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
    status: booking.status || 'Pending',
    notes: booking.notes || '',
  };

  const updated = [nextBooking, ...bookings];
  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  return nextBooking;
};

export const clearBookings = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  window.localStorage.removeItem(BOOKINGS_KEY);
  return [];
};

export const loadUnreadInquiries = () => {
  if (typeof window === 'undefined') {
    return 0;
  }
  const saved = window.localStorage.getItem(INQUIRY_KEY);
  const count = Number(saved);
  return Number.isFinite(count) && count > 0 ? count : 0;
};

export const incrementUnreadInquiries = (amount = 1) => {
  if (typeof window === 'undefined') {
    return 0;
  }
  const current = loadUnreadInquiries();
  const next = current + amount;
  window.localStorage.setItem(INQUIRY_KEY, String(next));
  window.dispatchEvent(new Event('petshop.inquiryUpdated'));
  return next;
};

export const resetUnreadInquiries = () => {
  if (typeof window === 'undefined') {
    return 0;
  }
  window.localStorage.setItem(INQUIRY_KEY, '0');
  window.dispatchEvent(new Event('petshop.inquiryUpdated'));
  return 0;
};

export const savePets = (pets) => {
  if (typeof window === 'undefined') {
    return null;
  }
  window.localStorage.setItem(PETS_KEY, JSON.stringify(pets));
  return pets;
};

export const updatePet = (updatedPet) => {
  if (typeof window === 'undefined' || !updatedPet?.id) {
    return null;
  }
  const pets = loadPets();
  const updated = pets.map((pet) => (pet.id === updatedPet.id ? { ...pet, ...updatedPet } : pet));
  window.localStorage.setItem(PETS_KEY, JSON.stringify(updated));
  return updated.find((pet) => pet.id === updatedPet.id) || null;
};

export const deletePet = (petId) => {
  if (typeof window === 'undefined' || petId == null) {
    return loadPets();
  }
  const pets = loadPets();
  const updated = pets.filter((pet) => pet.id !== petId);
  window.localStorage.setItem(PETS_KEY, JSON.stringify(updated));
  return updated;
};

export const incrementPetInquiries = (petId = null) => {
  const pets = loadPets();
  if (!pets.length) {
    return pets;
  }

  let incremented = false;
  const updated = pets.map((pet, index) => {
    if ((!incremented && petId != null && pet.id === petId) || (!incremented && petId == null && index === 0)) {
      incremented = true;
      return { ...pet, inquiries: (pet.inquiries ?? 0) + 1 };
    }
    return pet;
  });

  savePets(updated);
  return updated;
};

export const savePet = (pet) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const pets = loadPets();
  const nextId = pets.length ? Math.max(...pets.map((item) => item.id || 0)) + 1 : 1;
  const newPet = {
    id: nextId,
    name: pet.name || `${petTypeLabel(pet.petType)} Puppy`,
    breed: pet.breed || 'Mixed Breed',
    price: pet.price || '1,200',
    location: pet.location || 'Unknown',
    added: 'Added just now',
    status: 'ACTIVE',
    statusColor: 'bg-emerald-500',
    inquiries: pet.inquiries ?? 0,
    views: pet.views ?? Math.floor(Math.random() * 400) + 150,
    img: pet.img || defaultImageForType(pet.petType),
    tag: pet.tag || 'NEW',
    active: true,
    description: pet.description || '',
    vaccination: pet.vaccination || '',
    deworming: pet.deworming || '',
    medicalNotes: pet.medicalNotes || '',
  };

  const updated = [newPet, ...pets];
  window.localStorage.setItem(PETS_KEY, JSON.stringify(updated));
  return newPet;
};

const defaultImageForType = (type) => {
  if (type === 'Cat') {
    return 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=400';
  }
  return 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400';
};

const petTypeLabel = (type) => {
  if (type === 'Cat') return 'Cat';
  return 'Dog';
};


export const clearUnreadInquiries = () => {
  if (typeof window === 'undefined') {
    return 0;
  }

  window.localStorage.setItem(
    INQUIRY_KEY,
    '0'
  );

  window.dispatchEvent(
    new Event('petshop.inquiryUpdated')
  );

  return 0;
};
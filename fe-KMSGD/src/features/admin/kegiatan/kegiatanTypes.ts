export interface Speaker {
  id: number;
  nama: string;
  urutan: number;
}

export interface Kegiatan {
  id: number;
  date: string;
  startTime: string;
  endTime?: string;
  category: string;
  title: string;
  desc: string;
  location: string;
  image?: string;
  type?: string;
  price?: string;
  registrationLink?: string;
  organizer?: string;
  contactPerson?: string;
  isPublished: boolean;
  createdAt: string;
  speakers: Speaker[];
}

export interface CreateKegiatanPayload {
  date: string;
  startTime: string;
  endTime?: string;
  category: string;
  title: string;
  desc: string;
  location: string;
  image?: string;
  type?: string;
  price?: string;
  registrationLink?: string;
  organizer?: string;
  contactPerson?: string;
  isPublished?: boolean;
  speakers?: Omit<Speaker, "id">[];
}
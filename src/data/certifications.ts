export interface Certification {
  id: string;
  title: string;
  issuer: string;
  validity: string;
  image: string;
}

export const certificationsData: Certification[] = [
  {
    id: "1",
    title:
      "Back End JavaScript - With AI Literacy & Global Certification Class",
    issuer: "Binar Academy",
    validity: "2024",
    image: "/docs/sertif 1.png",
  },
  {
    id: "2",
    title: "Red Hat System Administration I (RH124 - RHA) - Ver. 9.3",
    issuer: "Red Hat",
    validity: "2026",
    image: "/docs/sertif 2.png",
  },
  {
    id: "3",
    title: "Magang PT Manggala Teknologi Nusantara",
    issuer: "PT Manggala Teknologi Nusantara",
    validity: "2025",
    image: "/docs/sertif 3.png",
  },
];
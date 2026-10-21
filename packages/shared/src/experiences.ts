export type Experience = {
  slug: string;
  title: string;
  chef: string;
  chefSlug: string;
  type: string;
  cuisine: string;
  date: string;
  time: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  seatsLeft: number;
  description: string;
  menu: string[];
};

export const experiences: Experience[] = [
  {
    slug: "taste-of-jamaica",
    title: "A Taste of Jamaica",
    chef: "Andre Williams",
    chefSlug: "andre-williams",
    type: "PRIVATE DINNER",
    cuisine: "Modern Jamaican",
    date: "Saturday, November 14",
    time: "7:00 PM – 10:00 PM",
    location: "Columbia, Maryland",
    rating: 4.9,
    reviews: 38,
    price: 95,
    seatsLeft: 6,
    description: "An intimate six-course journey through Jamaican flavors, family stories, and modern technique.",
    menu: ["Sorrel welcome drink", "Ackee croquette", "Escovitch snapper", "Braised oxtail", "Coconut rice & peas", "Rum bread pudding"]
  },
  {
    slug: "handmade-pasta-night",
    title: "Handmade Pasta Night",
    chef: "Sofia Romano",
    chefSlug: "sofia-romano",
    type: "CHEF'S TABLE",
    cuisine: "Italian",
    date: "Friday, November 13",
    time: "6:30 PM – 9:30 PM",
    location: "Baltimore, Maryland",
    rating: 4.8,
    reviews: 24,
    price: 70,
    seatsLeft: 4,
    description: "A relaxed pasta table celebrating handmade shapes, seasonal sauces, and generous Italian hospitality.",
    menu: ["Aperitivo", "Burrata", "Tagliatelle", "Ravioli", "Seasonal contorno", "Olive oil cake"]
  },
  {
    slug: "ethiopian-nights",
    title: "Ethiopian Nights",
    chef: "Hana Bekele",
    chefSlug: "hana-bekele",
    type: "SOCIAL DINNER",
    cuisine: "Ethiopian",
    date: "Sunday, November 15",
    time: "5:00 PM – 8:00 PM",
    location: "Silver Spring, Maryland",
    rating: 4.9,
    reviews: 31,
    price: 55,
    seatsLeft: 8,
    description: "Share injera, traditional stews, coffee, and conversation around one communal table.",
    menu: ["Tej welcome", "Sambusa", "Doro wat", "Misir wat", "Gomen & injera", "Coffee ceremony"]
  }
];

export function getExperience(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}

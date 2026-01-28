export const countries = [
  { value: 'france', label: { en: 'France', fr: 'France' } },
  { value: 'uae', label: { en: 'United Arab Emirates', fr: 'Émirats Arabes Unis' } },
  { value: 'tunisia', label: { en: 'Tunisia', fr: 'Tunisie' } },
  { value: 'italy', label: { en: 'Italy', fr: 'Italie' } },
];

export const citiesByCountry: Record<string, Array<{ value: string; label: string }>> = {
  france: [
    { value: 'nice', label: 'Nice' },
    { value: 'villefranche-sur-mer', label: 'Villefranche-sur-Mer' },
    { value: 'cannes', label: 'Cannes' },
    { value: 'antibes', label: 'Antibes' },
    { value: 'saint-paul-de-vence', label: 'Saint-Paul-de-Vence' },
    { value: 'vence', label: 'Vence' },
    { value: 'frejus', label: 'Fréjus / Saint-Raphaël' },
    { value: 'saint-tropez', label: 'Saint-Tropez' },
    { value: 'monaco', label: 'Monaco' },
  ],
  italy: [
    { value: 'ventimiglia', label: 'Ventimiglia' },
    { value: 'san-remo', label: 'San Remo' },
    { value: 'imperia', label: 'Imperia' },
    { value: 'genova', label: 'Genova' },
    { value: 'cinque-terre', label: 'Cinque Terre' },
    { value: 'portofino', label: 'Portofino' },
  ],
  tunisia: [
    { value: 'tunis', label: 'Tunis' },
    { value: 'djerba', label: 'Djerba' },
    { value: 'sousse', label: 'Sousse' },
    { value: 'hammamet', label: 'Hammamet' },
    { value: 'hammam-sousse', label: 'Hammam Sousse' },
    { value: 'bizerte', label: 'Bizerte' },
  ],
  uae: [
    { value: 'abu-dhabi', label: 'Abu Dhabi' },
    { value: 'ajman', label: 'Ajman' },
    { value: 'sharjah', label: 'Sharjah' },
    { value: 'dubai', label: 'Dubai' },
    { value: 'fujairah', label: 'Fujairah' },
    { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
    { value: 'umm-al-quwain', label: 'Umm Al Quwain' },
  ],
};

export const propertyTypes = [
  { value: 'apartment_rent', label: { en: 'Apartment for Rent', fr: 'Appartement à Louer' } },
  { value: 'apartment_sale', label: { en: 'Apartment for Sale', fr: 'Appartement à Vendre' } },
  { value: 'penthouse_rent', label: { en: 'Penthouse for Rent', fr: 'Penthouse à Louer' } },
  { value: 'penthouse_sale', label: { en: 'Penthouse for Sale', fr: 'Penthouse à Vendre' } },
  { value: 'villa_rent', label: { en: 'Villa for Rent', fr: 'Villa à Louer' } },
  { value: 'villa_sale', label: { en: 'Villa for Sale', fr: 'Villa à Vendre' } },
  { value: 'riad_rent', label: { en: 'Riad for Rent', fr: 'Riad à Louer' } },
  { value: 'riad_sale', label: { en: 'Riad for Sale', fr: 'Riad à Vendre' } },
];

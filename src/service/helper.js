export const years = [
  2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
];

export const months = [
  {
    id: 0,
    name: "Januari",
  },
  {
    id: 1,
    name: "Februari",
  },
  {
    id: 2,
    name: "Maret",
  },
  {
    id: 3,
    name: "April",
  },
  {
    id: 4,
    name: "Mei",
  },
  {
    id: 5,
    name: "Juni",
  },
  {
    id: 6,
    name: "Juli",
  },
  {
    id: 7,
    name: "Agustus",
  },
  {
    id: 8,
    name: "September",
  },
  {
    id: 9,
    name: "Oktober",
  },
  {
    id: 10,
    name: "November",
  },
  {
    id: 11,
    name: "Desember",
  },
];

export const changeNumberToMonth = (month) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[month] || "Tidak Valid";
};

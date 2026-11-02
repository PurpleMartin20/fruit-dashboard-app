// Must match backend/enums.py FruitStatus (IntEnum)
export enum FruitStatus {
  AVAILABLE = 0,
  RESERVED = 1,
  SOLD = 2,
  OUT_OF_STOCK = 3,
}

// How each status looks in the UI
export const FRUIT_STATUS_UI: Record<
  FruitStatus,
  { label: string; badgeClass: string; canBuy: boolean }
> = {
  [FruitStatus.AVAILABLE]: { label: 'Available', badgeClass: 'bg-green-600', canBuy: true },
  [FruitStatus.RESERVED]: { label: 'Reserved', badgeClass: 'bg-yellow-500', canBuy: false },
  [FruitStatus.SOLD]: { label: 'Sold', badgeClass: 'bg-gray-500', canBuy: false },
  [FruitStatus.OUT_OF_STOCK]: { label: 'Out of Stock', badgeClass: 'bg-red-600', canBuy: false },
};

export const FRUIT_STATUSES = [
  FruitStatus.AVAILABLE,
  FruitStatus.RESERVED,
  FruitStatus.SOLD,
  FruitStatus.OUT_OF_STOCK,
];

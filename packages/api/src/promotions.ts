import { getData } from "./api";

export interface Promotion {
  active: boolean;
  code: string;
  description: string;
  discountPercent: number;
  id: string;
  title: string;
  validFrom: string;
  validTo: string;
}

export async function getActivePromotion(): Promise<Promotion | null> {
  const promotion = await getData<Promotion>("/api/promotions");

  if (!promotion.active) {
    return null;
  }

  return promotion;
}

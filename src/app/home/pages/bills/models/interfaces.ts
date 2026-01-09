import { Product } from '../../items/models/interfaces';
import { Party } from '../../parties/models/interfaces';
import { BillType } from './enums';

export interface BillResponse {
  id: string;
  amount: number;
  createdAt: string;
  items: BillItem[];
  note: string;
  partyId: string;
  type: BillType;
}

export interface BillItem {
  price: number;
  productId: string;
  quantity: number;
  totalAmount: number;
}

export interface BillWithPartyResponse {
  id: string;
  party: Party;
  type: BillType;
  amount: number;
  note?: string;
  items: BillItem[];
  createdAt: string;
}

export interface CreateBillRequest {
  partyId: string;
  type: BillType;
  amount: number;
  note: string;
  items: BillItem[];
}

export interface BillDetailsResponse {
  id: string;
  type: BillType;
  amount: number;
  note?: string;
  party: Party;
  items: BillItemWithProductResponse[];
  createdAt: string;
}

export interface BillItemWithProductResponse {
  productId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  product: Product;
}

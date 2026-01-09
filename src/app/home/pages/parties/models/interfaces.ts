import { PartyType, TransactionType } from './enums';

export interface PartyListSummaryResponse {
  totalYouGave: number;
  totalYouGot: number;
  netBalance: number;
  parties: Array<PartyWithBalanceResponse>;
}

export interface PartyWithBalanceResponse {
  partyId: string;
  name: string;
  contactNumber: string;
  youGave: number;
  youGot: number;
  balance: number;
  lastTransactionAt: string;
}

export interface CreatePartyRequest {
  name: string;
  contactNumber: string;
  type: PartyType;
  gstNumber?: string;
}

export interface CreatePartyResponse {
  id: string;
  name: string;
  contactNumber: string;
  type: PartyType;
  gstNumber: string;
}

export interface PartyDetailResponse {
  id: string;
  name: string;
  contactNumber: string;
  type: string;
  gstNumber: string;
  createdAt: string;
  updatedAt: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  partyId: string;
  userId: string;
  type: TransactionType;
  amount: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  amount: number;
  note?: string;
  partyId: string;
  type: TransactionType;
}

export interface TransactionResponse {
  amount: number;
  id: string;
  note: string;
  partyId: string;
  type: TransactionType;
  userId: string;
}

export interface Party {
  contactNumber: string;
  createdAt: string;
  gstNumber?: string;
  id: string;
  name: string;
  type: PartyType;
  updatedAt: string;
  userId: string;
  YOU_GAVE: number;
  YOU_GOT: number;
}

export interface Partner {
  _id: string;
  guidUser: string;
  guidPartner: string;
  name: string;
  latitude: string;
  longitude: string;
  type: string;
  address: string;
  phone: string;
  collaboration: string;
  collaboration_details: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PartnerResponseData {
  totalPages: number;
  totalData: number;
  totalDataperPage: number;
  totalType?:number
  totalTypeData?:number;
  page: number;
  partners: Partner[];
}

export interface PartnerResponse {
  statusCode: number;
  message: string;
  data: Partner; 
}

export interface PartnerSuccesResponse {
  statusCode: number;
  message: string;
  data: Partner; 
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export type PartnerListResponse = ApiResponse<PartnerResponseData>;

export interface PartnerRequest {
  name: string;
  latitude: string;
  longitude: string;
  type: string;
  address: string;
  phone: string;
  collaboration: string;
  collaboration_details: string;
}

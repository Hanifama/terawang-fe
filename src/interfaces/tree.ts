export interface Tree {
  _id: string;
  guidTree: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  updated_dt: string;
  photo: string;
  description: string;
  created_dt: string;
  __v: number;
}

export interface TreeResponseData {
  totalPages: number;
  totalData: number;
  totalDataperPage: number;
  page: number;
  trees: Tree[];
}

export interface TreeResponse {
  statusCode: number;
  message: string;
  data: Tree; 
}

export interface TreeSuccesResponse {
  statusCode: number;
  message: string;
  data: Tree; 
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export type TreeListResponse = ApiResponse<TreeResponseData>;

export interface TreeRequest {
  name: string;
  latitude: string;
  longitude: string;
  type: string;
  address: string;
  phone: string;
  collaboration: string;
  collaboration_details: string;
}

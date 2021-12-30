export interface RentDTO {
    period:string;
    price:number;
}

export interface AccessoryDTO{
    type:string;
    name:string;    
}

export interface CarDTO {
    id:string;
    brand:string;
    name:string;
    about:string;
    rent:RentDTO;
    fuel_type:string;
    thumbnail: string;
    accessories: AccessoryDTO[];
    photos: string[];
  }
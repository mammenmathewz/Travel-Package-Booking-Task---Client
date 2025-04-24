export type PackageProps = {
  _id: string | null | undefined; 
  from: string; 
  to: string; 
  startDate: string; 
  endDate: string; 
  basePrice: number; 
  bookingCount?: number; 
  createdAt: string;
  updatedAt: string; 
  includedServices: {
    food: boolean; 
    accommodation: boolean; 
  };
  packageDetails: string; 

};

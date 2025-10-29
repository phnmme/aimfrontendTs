export interface Vehicle {
  vehicleNumber: string;
  services: {
    serviceType: string;
    startDate: string | null;
    endDate: string | null;
  }[];
}

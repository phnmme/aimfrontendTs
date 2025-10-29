export interface Setting {
  id: string;
  key: string;
  value: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  customerId: string;
  vehicleNumber: string;
}

export interface Service {
  id: string;
  vehicleId: string;
  serviceType: string;
  endDate: string;
  vehicle: Vehicle;
}

export interface MyData {
  customerId: string;
  settings: Setting[];
  service: Service[];
}

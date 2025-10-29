interface customerListType {
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  vehicleCount: number;
  serviceCount: number;
}

interface customerGetMoreType {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  vehicles: {
    id: number;
    vehicleNumber: string;
    services: {
      id: number;
      serviceType: string;
      createdAt: Date;
    }[];
  }[];
}

interface User {
  id: string;
  name: string;
  email: string;
}

export type { customerListType, customerGetMoreType, User };

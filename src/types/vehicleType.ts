interface vehicleListType {
  vehicleId: string;
  vehicleNumber: string;
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface vehicleGetMoreType {
  id: string;
  customerId: string;
  vehicleNumber: string;
  createdAt: string;
  customer: {
    id: string;
    branchId: string;
    idCardOrTax: string;
    firstName: string;
    lastName: string;
    phone: string;
    key: string;
    createdAt: string;
  };
  services: {
    id: string;
    vehicleId: string;
    serviceType: string;
    startDate: string;
    endDate: string;
    pdfName: string | null;
    imageName: string | null;
    createdAt: string;
  }[];
}

export type { vehicleListType, vehicleGetMoreType };

interface summaryType {
  customerCount: number;
  vehicleCount: number;
  expvehicleCount: number;
  expvehicleInfo: {
    vehicleId: string;
    vehicleNumber: string;
    customerName: string;
    endDate: string;
    serviceType: string;
  }[];
}

export type { summaryType };

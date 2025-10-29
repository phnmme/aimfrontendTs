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

interface logType {
  id: string;
  userId: string;
  actionType: string;
  actionDetail: string;
  ipAddress: string;
  createdAt: string;
  user: {
    name: string;
  };
}

interface totalGraphType {
  [year: string]: {
    month: string;
    totalCustomers: number;
    totalServices: number;
  }[];
}

interface MonthlyData {
  month: string;
  totalCustomers: number;
  totalServices: number;
}

interface YearlyData {
  [year: string]: MonthlyData[];
}

export type { summaryType, logType, totalGraphType, YearlyData, MonthlyData };

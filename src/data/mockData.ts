export interface ProfitResponse {
  top_profitable_products: Product[];
  total_units_sold: number;
  total_vendor_transfer: number;
  total_profitable_count: number;
  total_collected_amount: number;
  previous_period: PeriodData;
  comparison: ComparisonMetric;
}

export interface PeriodData {
  top_profitable_products: Product[];
  total_units_sold: number;
  total_vendor_transfer: number;
  total_profitable_count: number;
  total_collected_amount: number;
}

export interface Product {
  sku: string;
  vendor_transfer: number;
  total_selling_price: number;
  units: number;
  collected_amount: number;
  overhead: number;
  total_cost: number;
  profit_amount: number;
  profit_percent: number;
}
export interface ComparisonDetailForProfit {
  total_units_sold: ComparisonMetric;
  total_vendor_transfer: ComparisonMetric;
  total_profitable_count: ComparisonMetric;
  total_collected_amount: ComparisonMetric;
}

// ---------- Sales Summary ----------
export interface SalesSummaryResponse {
  current_period: PeriodSummary;
  previous_period: PeriodSummary;
  comparison_percent: ComparisonDetail;
  daily: DailySales[];
}

export interface PeriodSummary {
  start_date: string;
  end_date: string;
  summary: SalesSummary;
}

export interface SalesSummary {
  total_sales: number;
  delivered_amount: number;
  delivered_count: number;
  rto_amount: number;
  rto_count: number;
  returned_amount: number;
  returned_count: number;
  exchanged_amount: number;
  exchanged_count: number;
}

export interface ComparisonDetail {
  total_sales: ComparisonMetric;
  delivered_amount: ComparisonMetric;
  delivered_count: ComparisonMetric;
  rto_amount: ComparisonMetric;
  rto_count: ComparisonMetric;
  returned_amount: ComparisonMetric;
  returned_count: ComparisonMetric;
  exchanged_amount: ComparisonMetric;
  exchanged_count: ComparisonMetric;
}

export interface ComparisonMetric {
  current: number;
  previous: number;
  percent_change: number;
  status: 'increase' | 'decrease' | 'no change';
}

export interface DailySales {
  order_date__date: string;
  skucode?: string;
  daily_sales: number;
  daily_delivered: number;
  daily_delivered_count?: number;
  daily_rto: number;
  daily_rto_count?: number;
  daily_returned: number;
  daily_returned_count?: number;
  daily_exchanged: number;
  daily_exchanged_count?: number;
}

export interface VendorTransferData {
  current: number;
  previous: number;
  percent_change: number;
  status: "increase" | "decrease" | "no_change";
}

export interface VendorTransferStatsResponse {
  vendor_transfer: VendorTransferData;
}


// Mock data for the dashboard
export const mockProducts: Product[] = [
  // {
  //   skuCode: "SKU-001",
  //   name: "Premium Wireless Headphones",
  //   sellingPrice: 299.99,
  //   costPrice: 150.00,
  //   unitsSold: 1250,
  //   profit: 187488,
  //   profitMargin: 50.0
  // },
  // {
  //   id: "2", 
  //   skuCode: "SKU-002",
  //   name: "Smart Fitness Tracker",
  //   sellingPrice: 199.99,
  //   costPrice: 85.00,
  //   unitsSold: 2100,
  //   profit: 241479,
  //   profitMargin: 57.5
  // },
  // {
  //   id: "3",
  //   skuCode: "SKU-003", 
  //   name: "Bluetooth Speaker Pro",
  //   sellingPrice: 149.99,
  //   costPrice: 75.00,
  //   unitsSold: 1800,
  //   profit: 134982,
  //   profitMargin: 50.0
  // },
  // {
  //   id: "4",
  //   skuCode: "SKU-004",
  //   name: "Wireless Charging Pad",
  //   sellingPrice: 79.99,
  //   costPrice: 35.00,
  //   unitsSold: 3200,
  //   profit: 143968,
  //   profitMargin: 56.3
  // },
  // {
  //   id: "5",
  //   skuCode: "SKU-005",
  //   name: "USB-C Hub Deluxe", 
  //   sellingPrice: 89.99,
  //   costPrice: 40.00,
  //   unitsSold: 2500,
  //   profit: 124975,
  //   profitMargin: 55.6
  // },
  // {
  //   id: "6",
  //   skuCode: "SKU-006",
  //   name: "Gaming Mouse Elite",
  //   sellingPrice: 129.99,
  //   costPrice: 65.00,
  //   unitsSold: 1900,
  //   profit: 123491,
  //   profitMargin: 50.0
  // },
  // {
  //   id: "7",
  //   skuCode: "SKU-007",
  //   name: "4K Webcam Pro",
  //   sellingPrice: 249.99,
  //   costPrice: 145.00,
  //   unitsSold: 800,
  //   profit: 83992,
  //   profitMargin: 42.0
  // },
  // {
  //   id: "8",
  //   skuCode: "SKU-008",
  //   name: "Smart Home Hub",
  //   sellingPrice: 199.99,
  //   costPrice: 120.00,
  //   unitsSold: 950,
  //   profit: 75992,
  //   profitMargin: 40.0
  // },
  // {
  //   id: "9",
  //   skuCode: "SKU-009",
  //   name: "Portable SSD 1TB",
  //   sellingPrice: 179.99,
  //   costPrice: 110.00,
  //   unitsSold: 1100,
  //   profit: 76989,
  //   profitMargin: 38.9
  // },
  // {
  //   id: "10",
  //   skuCode: "SKU-010",
  //   name: "Premium Phone Case",
  //   sellingPrice: 49.99,
  //   costPrice: 22.00,
  //   unitsSold: 5200,
  //   profit: 145548,
  //   profitMargin: 56.0
  // },
  // // Loss-making products
  // {
  //   id: "11",
  //   skuCode: "SKU-011",
  //   name: "VR Headset Basic",
  //   sellingPrice: 399.99,
  //   costPrice: 480.00,
  //   unitsSold: 150,
  //   profit: -12001,
  //   profitMargin: -20.0
  // },
  // {
  //   id: "12",
  //   skuCode: "SKU-012", 
  //   name: "Smart Watch Series X",
  //   sellingPrice: 599.99,
  //   costPrice: 720.00,
  //   unitsSold: 200,
  //   profit: -24002,
  //   profitMargin: -20.0
  // },
  // {
  //   id: "13",
  //   skuCode: "SKU-013",
  //   name: "Professional Drone 4K",
  //   sellingPrice: 1299.99,
  //   costPrice: 1450.00,
  //   unitsSold: 75,
  //   profit: -11251,
  //   profitMargin: -11.5
  // },
  // {
  //   id: "14",
  //   skuCode: "SKU-014",
  //   name: "Gaming Laptop Ultra",
  //   sellingPrice: 1999.99,
  //   costPrice: 2200.00,
  //   unitsSold: 45,
  //   profit: -9000,
  //   profitMargin: -10.0
  // },
  // {
  //   id: "15",
  //   skuCode: "SKU-015",
  //   name: "Smart Display 10 inch",
  //   sellingPrice: 299.99,
  //   costPrice: 350.00,
  //   unitsSold: 180,
  //   profit: -9002,
  //   profitMargin: -16.7
  // }
];

export const getTopProfitableProducts = (limit: number = 5): Product[] => {
  return mockProducts
    .filter(product => product.profit > 0)
    .sort((a, b) => b.profit - a.profit)
    .slice(0, limit);
};

export const getTopLossMakingProducts = (limit: number = 5): Product[] => {
  return mockProducts
    .filter(product => product.profit < 0)
    .sort((a, b) => a.profit - b.profit)
    .slice(0, limit);
};

export const getTotalStats = () => {
  const totalProfit = mockProducts.reduce((sum, product) => sum + (product.profit > 0 ? product.profit : 0), 0);
  const totalLoss = mockProducts.reduce((sum, product) => sum + (product.profit < 0 ? Math.abs(product.profit) : 0), 0);
  const totalProducts = mockProducts.length;
  const profitableProducts = mockProducts.filter(p => p.profit > 0).length;
  
  return {
    totalProfit,
    totalLoss,
    totalProducts,
    profitableProducts,
    netProfit: totalProfit - totalLoss
  };
};
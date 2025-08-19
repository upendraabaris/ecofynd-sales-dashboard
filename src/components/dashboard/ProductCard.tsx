import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Product } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  rank: number;
  showProfit?: boolean;
}

const ProductCard = ({ product, rank, showProfit = true }: ProductCardProps) => {
  const isProfit = product.profit_percent > 0;
  
  // Only show profitable products
  // if (!isProfit) return null;

  return (
          <>
            <tr key={product.sku} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{product.sku}</td>
              <td className="px-4 py-3 text-right text-gray-700">₹{product.total_selling_price.toFixed(2)}</td>
              <td className="px-4 py-3 text-right text-gray-700">₹{product.vendor_transfer.toFixed(2)}</td>
              <td className="px-4 py-3 text-right text-gray-700">{product.units}</td>
              <td className="px-4 py-3 text-right text-gray-700">₹{product.total_cost.toFixed(2)}</td>
              <td className={`px-4 py-3 text-right font-semibold ${product.profit_amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                ₹{product.profit_amount.toFixed(2)}
              </td>
              <td className={`px-4 py-3 text-right font-medium ${product.profit_percent >= 0 ? "text-green-500" : "text-red-500"}`}>
                {product.profit_percent.toFixed(1)}%
              </td>
            </tr>
          {/* ))} */}
    </>
  );
};

export default ProductCard;
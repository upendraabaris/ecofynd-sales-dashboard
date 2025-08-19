import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProductCard from "@/components/dashboard/ProductCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopProfitableProducts } from "@/data/mockData";
import { TrendingUp, BarChart3 } from "lucide-react";

const ProfitableProducts = () => {
  const profitableProducts = getTopProfitableProducts(10);
  const totalProfit = profitableProducts.reduce((sum, product) => sum + product.profit, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-profit" />
            <h1 className="text-3xl font-bold tracking-tight">Top Profitable Products</h1>
          </div>
          <p className="text-muted-foreground">
            Detailed view of your most successful products by profit generation
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products Shown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profitableProducts.length}</div>
              <p className="text-xs text-muted-foreground">Top performers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Combined Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-profit">
                ${totalProfit.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">From top products</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Margin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-profit">
                {(profitableProducts.reduce((sum, p) => sum + p.profitMargin, 0) / profitableProducts.length).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Profit margin</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-profit" />
              <CardTitle className="text-xl">Profitable Products Ranking</CardTitle>
            </div>
            <CardDescription>
              Ranked by total profit generated (selling price - cost price) × units sold
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {profitableProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>
              Insights from your top profitable products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold text-profit">Success Factors</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• High-margin wireless accessories lead profitability</li>
                  <li>• Products priced between $50-$300 show optimal performance</li>
                  <li>• Consumer electronics with 50%+ margins drive success</li>
                  <li>• High-volume sales complement strong unit margins</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-profit">Growth Opportunities</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Expand successful product lines (wireless, smart devices)</li>
                  <li>• Increase inventory for high-demand profitable items</li>
                  <li>• Consider premium variants of top performers</li>
                  <li>• Bundle complementary profitable products</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfitableProducts;
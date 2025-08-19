import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProductCard from "@/components/dashboard/ProductCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTopLossMakingProducts } from "@/data/mockData";
import { TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";

const LossProducts = () => {
  const lossProducts = getTopLossMakingProducts(10);
  const totalLoss = lossProducts.reduce((sum, product) => sum + Math.abs(product.profit), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <TrendingDown className="w-8 h-8 text-loss" />
            <h1 className="text-3xl font-bold tracking-tight">Top Loss-Making Products</h1>
            <Badge variant="destructive" className="ml-2">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Attention Required
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Products requiring immediate pricing strategy review and action
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-card border-loss/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products at Loss
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-loss">{lossProducts.length}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-loss/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Loss Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-loss">
                -${totalLoss.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Revenue impact</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-loss/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Loss Margin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-loss">
                {(lossProducts.reduce((sum, p) => sum + p.profitMargin, 0) / lossProducts.length).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Loss margin</p>
            </CardContent>
          </Card>
        </div>

        {/* Loss Products Grid */}
        <Card className="bg-gradient-card border-loss/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-loss" />
              <CardTitle className="text-xl">Loss-Making Products Ranking</CardTitle>
            </div>
            <CardDescription>
              Ranked by total loss amount - highest losses first
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lossProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card className="bg-gradient-card border-loss/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-loss" />
              <CardTitle>Immediate Action Required</CardTitle>
            </div>
            <CardDescription>
              Strategic recommendations to address loss-making products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold text-loss">Critical Issues Identified</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-loss-light">
                    <h5 className="font-medium text-sm">Pricing Below Cost</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      All loss-making products are priced below their cost price
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-warning/10">
                    <h5 className="font-medium text-sm">High-Value Products</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Premium electronics are showing the highest absolute losses
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <h5 className="font-medium text-sm">Low Sales Volume</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Loss products also have lower sales volumes
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-profit">Recommended Actions</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-profit-light">
                    <h5 className="font-medium text-sm">1. Price Adjustment</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Increase prices to achieve minimum 15% profit margin
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <h5 className="font-medium text-sm">2. Cost Optimization</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Negotiate better supplier terms or find alternative sources
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <h5 className="font-medium text-sm">3. Product Review</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider discontinuing consistently unprofitable items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LossProducts;
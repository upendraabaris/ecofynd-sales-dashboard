import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProductCard from "@/components/dashboard/ProductCard";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopProfitableProducts, getTopLossMakingProducts, getTotalStats, ProfitResponse } from "@/data/mockData";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Package,
  BarChart3
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/hooks/useApi";
import DatePicker from "react-datepicker";
import "./../datepicker.css";
import ProfitChart from "../components/dashboard/ProfitChart";

import { format, subDays, startOfMonth, startOfYear } from "date-fns";
import { Value } from "@radix-ui/react-select";
import AreaChartComp from "@/components/dashboard/AreaChartComp";
import PieChartComp from "@/components/dashboard/PieChartComp";

const presetOptions = [
  { label: 'Select Date', Value: "select_date"},
  { label: "Last 7 Days", value: "last7" },
  { label: "Last 30 Days", value: "last30" },
  { label: "Last 3 Months", value: "last90" },
  { label: "Month to Date", value: "mtd" },
  { label: "Year to Date", value: "ytd" },
  { label: "Custom", value: "custom" },
];


const Dashboard = () => {
  // const topProfitable = getTopProfitableProducts(5);
  // const topLosses = getTopLossMakingProducts(5);
  const stats = getTotalStats();
  const [topProfitable, setTopProfitable] = useState([]);
  const [topLosses, setTopLosses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [topUnits, setTopUnits] = useState([]);
  const [vendorTransferData, setVendorTransferData] = useState<VendorTransferStatsResponse | null>(null);
  const [chartData, setChartData] = useState({
    top_selling_by_units: [],
    top_returned_units: [],
    top_rto_units: []
  });
  const [data, setData] = useState<ProfitResponse | null>(null);
  const [data1, setData1] = useState<ProfitResponse | null>(null);
  const [salesData, setSalesData] = useState<SalesSummaryResponse | null>(null);

  const [selectedPreset, setSelectedPreset] = useState("select_date");

  // useEffect(() => {
  //   loadData(); // initial call with no date filter
  // }, []);


  useEffect(() => {
    if (startDate && endDate) {
      loadData(startDate, endDate); // filtered call on date change
    }
  }, [startDate, endDate]);

  const loadData = async (start = null, end = null) => {
    // if (!startDate || !endDate) return;
    try {
      const profitableData = await api.get('/sales/sku-profit', {
        params: {
          start_date: startDate, // e.g. '2025-07-01'
          end_date: endDate      // e.g. '2025-07-31'
        }
      });
      // const lossData = await fetchTopLossMakingProducts();
      const lossData = await api.get('/sales/sku-loss', {
        params: {
          start_date: startDate, // e.g. '2025-07-01'
          end_date: endDate      // e.g. '2025-07-31'
        }
      });

      const fetchTopUnits = await api.get("/sales/top-units", {
        params: { start_date: startDate, end_date: endDate },
      });


      const salesSummary = await api.get("/sales/sales-summary", {
        params: { start_date: startDate, end_date: endDate },
      });

      const vendorTransferSummary = await api.get("/sales/vendor-transfer-profit", {
        params: { start_date: startDate, end_date: endDate },
      });


      setTopProfitable(profitableData.data);
      setTopLosses(lossData.data.top_loss_making_products);
      setData(profitableData.data);
      setData1(lossData.data);
      setTopUnits(fetchTopUnits.data);
      setSalesData(salesSummary.data);
      setChartData({
        top_selling_by_units: fetchTopUnits.data.top_selling_by_units ?? [],
        top_returned_units: fetchTopUnits.data.top_returned_units ?? [],
        top_rto_units: fetchTopUnits.data.top_rto_units ?? [],
      });
      setVendorTransferData(vendorTransferSummary.data.vendor_transfer);
    } catch (err) {
      console.error("API error", err);
    } finally {
      setLoading(false);
    }
  }

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);

    const today = new Date();
    let start = null;
    let end = format(today, "yyyy-MM-dd");

    switch (value) {
      case "last7":
        start = format(subDays(today, 6), "yyyy-MM-dd");
        break;
      case "last30":
        start = format(subDays(today, 29), "yyyy-MM-dd");
        break;
      case "last90":
        start = format(subDays(today, 89), "yyyy-MM-dd");
        break;
      case "mtd":
        start = format(startOfMonth(today), "yyyy-MM-dd");
        break;
      case "ytd":
        start = format(startOfYear(today), "yyyy-MM-dd");
        break;
      case "custom":
        setStartDate(null);
        setEndDate(null);
        return; // don't call loadData
    }

    setStartDate(start);
    setEndDate(end);
    loadData(start, end);
  };


  return (
    <DashboardLayout>
      {/* <div className="my-5 bg-white flex items-center justify-center px-4">
        <div className="w-full bg-white p-6 rounded-2xl shadow-md border"> */}
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Select Date Range</h2> */}
          <div className="my-5 bg-white flex">

            {/* Preset Filter Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div>
                <label className="font-semibold text-gray-700">Select Preset</label>
                <select
                  value={selectedPreset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl mt-1"
                >
                  {presetOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* Custom Start & End Date Only When Custom is Selected */}
              {selectedPreset === "custom" && (
                <>
                  <div>
                    <label className="font-semibold text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (endDate && e.target.value > endDate) setEndDate(""); // reset if invalid
                      }}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </>
              )}
              </div>

            </div>
          </div>

        {/* </div>
      </div> */}

      {/* Page Header */}
        
      <div className="space-y-2">
        {/* <h1 className="text-3xl font-bold tracking-tight">Sales Insights Dashboard</h1> */}
        {/* <p className="text-muted-foreground">
          Monitor your product performance and identify profit opportunities
        </p> */}
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Sales"
          value={`₹${salesData?.current_period?.summary?.total_sales?.toFixed(2) ?? 0}`}
          icon={IndianRupee}
          unit="Unit"
          comparison_percent={salesData?.comparison_percent?.total_sales?.percent_change}
          status={salesData?.comparison_percent?.total_sales?.status}
          // description="Total revenue minus costs"
          trend="up"
        />
        <StatsCard
          title="Delivered"
          value={`₹${salesData?.current_period?.summary?.delivered_amount?.toFixed(2) ??0 }`}
          icon={IndianRupee}
          unit="Unit"
          // description="Total revenue minus costs"
          count={salesData?.current_period?.summary?.delivered_count}
          comparison_percent={salesData?.comparison_percent?.delivered_amount?.percent_change}
          status={salesData?.comparison_percent?.delivered_amount?.status}
          trend="up"
        />
        <StatsCard
          title="RTO"
          value={`₹${salesData?.current_period?.summary?.rto_amount?.toFixed(2) ?? 0}`}
          icon={IndianRupee}
          unit="Unit"
          count={salesData?.current_period?.summary?.rto_count}
          // description="Total revenue minus costs"
          comparison_percent={salesData?.comparison_percent?.rto_amount?.percent_change}
          status={salesData?.comparison_percent?.rto_amount?.status}
          trend="up"
        />
        <StatsCard
          title="RTV"
          value={`₹${salesData?.current_period?.summary?.returned_amount?.toFixed(2) ?? 0}`}
          icon={IndianRupee}
          unit="Unit"
          count={salesData?.current_period?.summary?.returned_count}
          // description="Total revenue minus costs"
          comparison_percent={salesData?.comparison_percent?.returned_amount?.percent_change}
          status={salesData?.comparison_percent?.returned_amount?.status}
          trend="up"
        />
        <StatsCard
          title="Exchanged"
          value={`₹${salesData?.current_period?.summary?.exchanged_amount?.toFixed(2) ?? 0}`}
          icon={IndianRupee}
          unit="Unit"
          count={salesData?.current_period?.summary?.exchanged_count}
          comparison_percent={salesData?.comparison_percent?.exchanged_amount?.percent_change}
          status={salesData?.comparison_percent?.exchanged_amount?.status}
          // description="Total revenue minus costs"
          trend="up"
        />
        <StatsCard
          title="Total Vendor Transfer"
          value={`₹${((data?.total_vendor_transfer ?? 0) + (data1?.total_vendor_transfer ?? 0))?.toFixed(2)}`}
          comparison_percent={vendorTransferData?.percent_change}
          status={vendorTransferData?.status}
          icon={IndianRupee}
          // description="Total revenue minus costs"
          trend="up"
        />
        <StatsCard
          title="Total Unit Sold"
          value={`${(salesData?.current_period?.summary?.delivered_count ?? 0) + (salesData?.current_period?.summary?.rto_count ?? 0) + (salesData?.current_period?.summary?.returned_count ?? 0) + (salesData?.current_period?.summary?.exchanged_count ?? 0)}`}
          icon={Package}
          // description={`${data?.total_units_sold ?? 0} profitable products`}
          trend="neutral"
        />
        <StatsCard
          title="Products With Positive Profit"
          value={`${data?.total_profitable_count ?? 0}`}
          icon={TrendingUp}
          // description="From profitable products"
          trend="up"
        />
        <StatsCard
          title="Product With Negative Profit"
          value={`${(data1?.total_loss_count) ? data1?.total_loss_count : 0}`}
          icon={TrendingDown}
          // description="From loss-making products"
          trend="down"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
        <div className="my-5">
          <ProfitChart
            title="Top Profitable Products"
            data={topProfitable.top_profitable_products ?? []}
            dataKey="profit_amount"
            color="#4CAF50"
            legendLabel="Profit (₹)"
            tooltipLabel="Profit"
          />
        </div>

        <div className="my-5">
          <ProfitChart
            title="Top Loss-Making Products"
            data={topLosses ?? []}
            dataKey="profit_amount"
            color="#F44336"
            legendLabel="Loss (₹)"
            tooltipLabel="Loss"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
        <div className="my-5">
          <AreaChartComp
            title="Top Selling by Units"
            data={chartData.top_selling_by_units ?? []}
            dataKey="units_sold"
            color="#ADD8E6"
            legendLabel="Units Sold"
            tooltipLabel="Units Sold"
          />
        </div>

        <div className="my-5">
          <PieChartComp
            title="Top Returned To Varee (RTV) Products"
            data={chartData.top_returned_units ?? []}
            dataKey="units_returned"
            color="#FF9800"
            legendLabel="Units Returned"
            tooltipLabel="Returned Units"
          />
        </div>


      </div>
      <div className="my-5">
        <ProfitChart
          title="Top RTO Products"
          data={chartData.top_rto_units ?? []}
          dataKey="units_rto"
          color="#9C27B0"
          legendLabel="RTO Units"
          tooltipLabel="RTO Units"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-1 mt-5">
        {/* Top Profitable Products */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-profit" />
              <CardTitle className="text-xl">Top Profitable Products</CardTitle>
            </div>
            <CardDescription>
              Products generating the highest profit margins
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <table className="min-w-full divide-y divide-gray-200 text-sm table-auto">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-right">Selling Price</th>
                  <th className="px-4 py-3 text-right">Vendor Transfer</th>
                  <th className="px-4 py-3 text-right">Unit</th>
                  <th className="px-4 py-3 text-right">Final Cost</th>
                  <th className="px-4 py-3 text-right">Profit (₹)</th>
                  <th className="px-4 py-3 text-right">Profit (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {topProfitable?.top_profitable_products?.map((product, index) => (
                  <ProductCard
                    key={product.sku}
                    product={product}
                    rank={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-loss" />
              <CardTitle className="text-xl">Top Loss-Making Products</CardTitle>
            </div>
            <CardDescription>
              Products that need immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <table className="min-w-full divide-y divide-gray-200 text-sm table-auto">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-right">Selling Price</th>
                  <th className="px-4 py-3 text-right">Vendor Transfer</th>
                  <th className="px-4 py-3 text-right">Unit</th>
                  <th className="px-4 py-3 text-right">Final Cost</th>
                  <th className="px-4 py-3 text-right">Profit (₹)</th>
                  <th className="px-4 py-3 text-right">Profit (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {topLosses.map((product, index) => (
                  <ProductCard
                    key={product.sku}
                    product={product}
                    rank={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
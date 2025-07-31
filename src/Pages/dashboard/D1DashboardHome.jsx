// Smart Udhar Dashboard - Enhanced with Pie & Histogram Charts

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

import {
  ShoppingCart,
  Wallet,
  CreditCard,
  Store,
  Users,
  Package,
  Activity,
  Smile,
  BadgeDollarSign
} from 'lucide-react';

import ApexCharts from 'react-apexcharts';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import { CSVLink } from 'react-csv';

// === Chart Configurations ===
const pieChartOptions = {
  chart: { type: 'pie' },
  labels: ['Retail Stores', 'Online Customers', 'Distributors'],
  legend: { position: 'bottom' }
};

const pieChartSeries = [45, 35, 20];

const histogramOptions = {
  chart: { type: 'bar' },
  plotOptions: {
    bar: {
      distributed: true,
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    }
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['₹0-1K', '₹1K-5K', '₹5K-10K', '₹10K+']
  }
};

const histogramSeries = [
  {
    name: 'Transactions',
    data: [12, 30, 22, 10]
  }
];

const STAT_CARD_TYPE_MAP = {
  sale: {
    icon: <ShoppingCart size={20} color="#16A34A" />,
    bg: "bg-[#DCFCE7]"
  },
  paid: {
    icon: <Wallet size={20} color="#2563EB" />,
    bg: "bg-[#DBEAFE]"
  },
  pending: {
    icon: <CreditCard size={20} color="#EA580C" />,
    bg: "bg-[#FFEDD5]"
  },
  stores: {
    icon: <Store size={20} color="#8B5CF6" />,
    bg: "bg-[#EDE9FE]"
  },
  customers: {
    icon: <Users size={20} color="#10B981" />,
    bg: "bg-[#D1FAE5]"
  },
  products: {
    icon: <Package size={20} color="#F59E0B" />,
    bg: "bg-[#FEF3C7]"
  },
  active: {
    icon: <Activity size={20} color="#3B82F6" />,
    bg: "bg-[#DBEAFE]"
  },
  satisfaction: {
    icon: <Smile size={20} color="#FBBF24" />,
    bg: "bg-[#FEF9C3]"
  },
  subscription: {
    icon: <BadgeDollarSign size={20} color="#0EA5E9" />,
    bg: "bg-[#E0F2FE]"
  }
};

const cardData = [
  { title: "Total Sales", value: "₹15.6L", change: "12.9%", isPositive: true, type: "sale" },
  { title: "Total Paid", value: "₹12.8L", change: "2.3%", isPositive: true, type: "paid" },
  { title: "Total Pending", value: "₹2.8L", change: "4.3%", isPositive: false, type: "pending" },
  { title: "Total Stores", value: "108", change: "5.6%", isPositive: true, type: "stores" },
  { title: "Total Customers", value: "5,000+", change: "3.2%", isPositive: true, type: "customers" },
  { title: "Total Products", value: "1200", type: "products" },
  { title: "Active Users (24h)", value: "35", type: "active" },
  { title: "Customer Satisfaction", value: "4.5★", type: "satisfaction" },
  { title: "Subscription Revenue", value: "₹1.2L", change: "8.4%", isPositive: true, type: "subscription" }
];

const activityFeed = [
  { type: "sale", text: "New sale of ₹10,000", time: "5 min ago" },
  { type: "admin", text: "Admin updated store details", time: "10 min ago" },
  { type: "subscription", text: "New subscription activated", time: "20 min ago" }
];

const graphData = [
  { month: 'Jul 2024', sales: 18, collection: 16 },
  { month: 'Aug 2024', sales: 19, collection: 17 },
  { month: 'Sep 2024', sales: 18, collection: 18 },
  { month: 'Oct 2024', sales: 19, collection: 19 },
  { month: 'Nov 2024', sales: 18, collection: 18 },
  { month: 'Dec 2024', sales: 18, collection: 17 }
];

const monthlyRevenueOptions = {
  chart: {
    type: 'line',
    zoom: { enabled: true },
    toolbar: { show: true }
  },
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  tooltip: {
    shared: true,
    intersect: false
  }
};

const monthlyRevenueSeries = [
  { name: 'Sales', data: [18, 19, 18, 19, 18, 18] },
  { name: 'Paid', data: [16, 17, 18, 19, 18, 17] },
  { name: 'Pending', data: [2, 2, 1, 0, 1, 1] },
  { name: 'Subscription', data: [1.1, 1.3, 1.2, 1.5, 1.6, 1.7] }
];

// === Components ===
const StatCard = ({ title, value, change, isPositive, type }) => {
  const config = STAT_CARD_TYPE_MAP[type] || {};
  return (
    <div className="bg-white shadow rounded-lg p-4  flex justify-between items-center w-full">
      <div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-xl font-semibold text-black">{value}</div>
        {change && (
          <div className={`text-sm flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <FaArrowUp /> : <FaArrowDown />} {change}
          </div>
        )}
      </div>
      <div className={`p-2 rounded-full shadow ${config.bg}`}>{config.icon}</div>
    </div>
  );
};

const ActivityItem = ({ text, time }) => (
  <div className="text-sm py-2 border-b">
    <div>{text}</div>
    <div className="text-xs text-gray-400">{time}</div>
  </div>
);

// === Main Dashboard ===
const D1DashboardHome = () => {
  return (
    <div className="p-4 pt-10 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((card, idx) => <StatCard key={idx} {...card} />)}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
      {/* Monthly Revenue Trends - Line Chart */}
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Monthly Progress - Sales, Paid, Pending, Subscription</h2>
          <CSVLink data={graphData} filename="monthly-progress.csv" className="text-sm text-blue-600">Download CSV</CSVLink>
        </div>
        <ApexCharts options={monthlyRevenueOptions} series={monthlyRevenueSeries} type="line" height={320} />
      </div>

      {/* Sales & Collection Chart - Bar Chart */}
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Sales & Collection Overview</h2>
          <CSVLink data={graphData} filename="sales-collection.csv" className="text-sm text-blue-600">Download CSV</CSVLink>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graphData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#0f9afe" name="Sales" radius={[4, 4, 0, 0]} />
            <Bar dataKey="collection" fill="#00e0a3" name="Collection" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>

      {/* Pie and Histogram Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Customer Distribution</h2>
          <ApexCharts options={pieChartOptions} series={pieChartSeries} type="pie" height={300} />
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Transaction Volume by Range</h2>
          <ApexCharts options={histogramOptions} series={histogramSeries} type="bar" height={300} />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {activityFeed.map((item, idx) => <ActivityItem key={idx} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default D1DashboardHome;

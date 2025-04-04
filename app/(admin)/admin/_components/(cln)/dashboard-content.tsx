// "use client"

// import { BarChart3, DollarSign, Package, Users } from "lucide-react"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// export function DashboardContent() {
//   return (
//     <main className="flex-1 overflow-y-auto p-4 md:p-6">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$45,231.89</div>
//             <p className="text-xs text-muted-foreground">+20.1% from last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+2350</div>
//             <p className="text-xs text-muted-foreground">+180.1% from last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Sales</CardTitle>
//             <BarChart3 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+12,234</div>
//             <p className="text-xs text-muted-foreground">+19% from last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Now</CardTitle>
//             <Package className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+573</div>
//             <p className="text-xs text-muted-foreground">+201 since last hour</p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="mt-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Sales</CardTitle>
//             <CardDescription>You made 265 sales this month.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Product</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {recentSales.map((sale, index) => (
//                   <TableRow key={index}>
//                     <TableCell className="font-medium">{sale.customer}</TableCell>
//                     <TableCell>{sale.product}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <div className={`h-2 w-2 rounded-full ${getStatusColor(sale.status)}`} />
//                         {sale.status}
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   )
// }

// function getStatusColor(status:any) {
//   switch (status) {
//     case "Completed":
//       return "bg-green-500"
//     case "Processing":
//       return "bg-yellow-500"
//     case "Failed":
//       return "bg-red-500"
//     default:
//       return "bg-gray-500"
//   }
// }

// const recentSales = [
//   {
//     customer: "John Smith",
//     product: "Pro Subscription",
//     status: "Completed",
//     amount: 350.0,
//   },
//   {
//     customer: "Sarah Johnson",
//     product: "Basic Plan",
//     status: "Processing",
//     amount: 125.5,
//   },
//   {
//     customer: "Michael Brown",
//     product: "Enterprise License",
//     status: "Completed",
//     amount: 1250.0,
//   },
//   {
//     customer: "Emily Davis",
//     product: "Premium Support",
//     status: "Failed",
//     amount: 450.0,
//   },
//   {
//     customer: "David Wilson",
//     product: "Custom Integration",
//     status: "Completed",
//     amount: 850.0,
//   },
// ]


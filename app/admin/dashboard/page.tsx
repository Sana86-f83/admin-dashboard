// "use client";

// import ProtectedRoute from "@/app/components/protected/page";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// interface CartItem {
//   name: string;
//   image: string;
// }

// interface Order {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   phone: number;
//   email: string;
//   city: string;
//   address: string;
//   zipCode: string;
//   total: number;
//   discount: number;
//   orderDate: string;
//   status: string | number;
//   cartItems: CartItem[];
// }

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type == "order"]{
//         _id, firstName, lastName, phone, email, address, total, city,
//         discount, status, orderDate, zipCode, cartItems[]->{name, image}
//         }`
//       )
//       .then((data) => setOrders(data))
//       .catch((error) => console.log("Error fetching orders:", error));
//   }, []);

//   const filteredOrders =
//     filter === "All"
//       ? orders
//       : orders.filter((order) => order.status === filter);

//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
//   };

//   const handleDelete = async (orderId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await client.delete(orderId);
//       setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));

//       Swal.fire("Deleted", "Your order has been deleted", "success");
//     } catch (error) {
//       Swal.fire("Error", "Failed to delete order", "error");
//     }
//   };

//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       await client.patch(orderId).set({ status: newStatus }).commit();
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       const statusMessages: { [key: string]: string } = {
//         dispatch: "Your order has been dispatched.",
//         success: "Your order has been completed.",
//       };

//       Swal.fire("Status Updated", statusMessages[newStatus] || "Status changed", "success");
//     } catch (error) {
//       Swal.fire("Error", "Failed to change status", "error");
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="flex flex-col h-screen bg-gray-100">
//         <nav className="bg-red-600 text-white p-4 shadow-lg flex justify-between">
//           <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//           <div className="flex space-x-4">
//             {["All", "pending", "success", "dispatch"].map((status) => (
//               <button
//                 key={status}
//                 className={`px-4 py-2 rounded-lg transition-all ${
//                   filter === status ? "bg-white text-red-600 font-bold" : "text-white"
//                 }`}
//                 onClick={() => setFilter(status)}
//               >
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </button>
//             ))}
//           </div>
//         </nav>

//         <div className="flex p-6 overflow-y-auto">
//           <h2 className="text-2xl font-bold text-center">Orders</h2>
//         </div>

//         <div className="overflow-y-auto gap-10 text-black rounded-lg shadow-sm">
//           <table className="w-full ">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Customer</th>
//                 <th>Address</th>
//                 <th>Date</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 text-black">
//               {filteredOrders.map((order) => (
//                 <React.Fragment key={order._id}>
//                   <tr
//                     className="cursor-pointer hover:bg-red-100 transition-all"
//                     onClick={() => toggleOrderDetails(order._id)}
//                   >
//                     <td>{order._id}</td>
//                     <td>{order.firstName} {order.lastName}</td>
//                     <td>{order.address}</td>
//                     <td>{new Date(order.orderDate).toLocaleDateString()}</td>
//                     <td>${order.total}</td>
//                     <td>
//                       <select
//                         value={order.status || ""}
//                         onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                         className="bg-gray-100 p-1 rounded"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="success">Success</option>
//                         <option value="dispatch">Dispatched</option>
//                       </select>
//                     </td>
//                     <td>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDelete(order._id);
//                         }}
//                         className="bg-red-300 text-white px-3 py-1 rounded hover:bg-red-700 transition"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>

//                   {selectedOrderId === order._id && (
//                     <tr>
//                       <td colSpan={7} className="bg-gray-500 p-4">
//                         <h3 className="font-bold">Order Details</h3>
//                         <p>Phone: <strong>{order.phone}</strong></p>
//                         <p>Email: <strong>{order.email}</strong></p>
//                         <p>City: <strong>{order.city}</strong></p>
//                         <ul>
//                           {order.cartItems.map((item, index) => (
//                             <li key={`${order._id}-${index}`}>
//                               {item.name}
//                               {item.image && (
//                                 <img
//                                   src={urlFor(item.image).url()}
//                                   alt="product"
//                                   width={100}
//                                   height={100}
//                                   className="rounded"
//                                 />
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import ProtectedRoute from "@/app/components/protected/page";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface CartItem {
  name: string;
  image: string;
}

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  city: string;
  address: string;
  zipCode: string;
  total: number;
  discount: number;
  orderDate: string;
  status: string | number;
  cartItems: CartItem[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
        _id, firstName, lastName, phone, email, address, total, city,
        discount, status, orderDate, zipCode, cartItems[]->{name, image}
        }`
      )
      .then((data) => {
        const updatedOrders = data.map((order: Order) => ({
          ...order,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
        }));
        setOrders(updatedOrders);
      })
      .catch((error) => console.log("Error fetching orders:", error));
  }, []);

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      Swal.fire("Deleted", "Your order has been deleted", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete order", "error");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      const statusMessages: { [key: string]: string } = {
        dispatch: "Your order has been dispatched.",
        success: "Your order has been completed.",
      };

      Swal.fire(
        "Status Updated",
        statusMessages[newStatus] || "Status changed",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "Failed to change status", "error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-yellow-200 p-4 ">
        <nav className="bg-yellow-500 text-white p-4 shadow-lg flex justify-between rounded-md">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="flex space-x-4 text-xl">
            {["All", "pending", "success", "dispatch"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-all font-semibold ${
                  filter === status
                    ? "bg-white text-yellow-600"
                    : "text-white hover:bg-yellow-700"
                }`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("isLogged"); // Remove login status
              window.location.href = "/admin"; // Redirect to admin login page
            }}
            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </nav>

        <div className="overflow-y-auto gap-10 text-black rounded-lg shadow-md bg-white p-4 mt-4">
          <table className="w-full border-collapse border border-yellow-500 rounded-md">
            <thead className="bg-yellow-300 text-black">
              <tr>
                <th className="p-2 border border-yellow-500">ID</th>
                <th className="p-2 border border-yellow-500">Customer</th>
                <th className="p-2 border border-yellow-500">Address</th>
                <th className="p-2 border border-yellow-500">Date</th>
                <th className="p-2 border border-yellow-500">Total</th>
                <th className="p-2 border border-yellow-500">Status</th>
                <th className="p-2 border border-yellow-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-300 text-black">
              {filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr
                    className="cursor-pointer hover:bg-yellow-200 transition-all text-center"
                    onClick={() => toggleOrderDetails(order._id)}
                  >
                    <td className="p-2 border border-yellow-500">
                      {order._id}
                    </td>
                    <td className="p-2 border border-yellow-500">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="p-2 border border-yellow-500">
                      {order.address}
                    </td>
                    <td className="p-2 border border-yellow-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border border-yellow-500">
                      ${order.total}
                    </td>
                    <td className="p-2 border border-yellow-500">
                      <select
                        value={order.status || ""}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="bg-gray-100 p-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="dispatch">Dispatched</option>
                      </select>
                    </td>
                    <td className="p-2 border border-yellow-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(order._id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {selectedOrderId === order._id && (
                    <tr>
                      <td
                        colSpan={7}
                        className="bg-yellow-100 p-4 border border-yellow-500"
                      >
                        <h3 className="font-bold">Order Details</h3>
                        <p>
                          Phone: <strong>{order.phone}</strong>
                        </p>
                        <p>
                          Email: <strong>{order.email}</strong>
                        </p>
                        <p>
                          City: <strong>{order.city}</strong>
                        </p>
                        <ul>
                          {order.cartItems.map((item, index) => (
                            <li key={`${order._id}-${index}`} className="mt-2">
                              {item.name}
                              {item.image && (
                                <img
                                  src={urlFor(item.image).url()}
                                  alt="product"
                                  width={100}
                                  height={100}
                                  className="rounded mt-2 border border-yellow-500"
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}

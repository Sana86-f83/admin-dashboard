// "use client";

// import { useRouter } from "next/navigation"; 
// import { useState } from "react";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter(); 

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Email:", email);
//     console.log("Password:", password);

//     if (email.trim() === "sana.faisalmehmood@gmail.com" && password.trim() === "Sana") {
//       localStorage.setItem("isLogged", "true");
//       console.log("Login Successful! Redirecting...");
//       router.replace("/admin/dashboard");
//     } else {
//       console.log("Invalid Credentials!");
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-yellow-400">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4 text-red-500 ">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded mb-2 text-black text-xl"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-2 text-black text-xl"
//         />
//         <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded w-full">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }









"use client";

import { useRouter } from "next/navigation"; 
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    if (email.trim() === "sana.faisalmehmood@gmail.com" && password.trim() === "Sana") {
      localStorage.setItem("isLogged", "true");
      console.log("Login Successful! Redirecting...");
      router.replace("/admin/dashboard");
    } else {
      console.log("Invalid Credentials!");
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-400 to-orange-500 ">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-2/5">
        <h2 className="text-4xl font-bold mb-6 text-black font-serif text-center">Admin Login</h2>

        <div className="mb-4 text-black text-xl">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 text-black text-xl ">
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-2xl text-white font-semibold p-3 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

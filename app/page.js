import FoodItems from "./components/FoodItems";
export default function Home() {
  return (
    <FoodItems />
  );
}


// "use client"
// import { io } from "socket.io-client";
// import { useEffect } from "react";

// export default function Home() {
//   useEffect(() => {
//     const socket = io({
//       path: "/api/socket.io", // Match the path used in the server setup
//     });

//     socket.on("connect", () => {
//       console.log("Connected to server:", socket.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from server");
//     });

//     return () => socket.disconnect(); // Cleanup
//   }, []);

//   return <div>Socket.IO Connected!</div>;
// }

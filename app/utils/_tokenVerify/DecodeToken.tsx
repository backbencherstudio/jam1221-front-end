// // import { jwtDecode } from "jwt-decode"; // ✅ CORRECT


// interface DecodedToken {
//   exp: number;
//   name?: string;
//   sub?: string;
//   admin?: boolean;
//   // any other custom claims
// }

// export const isTokenValid = (token: string): boolean => {
//   try {
//     const decoded = jwtDecode<DecodedToken>(token);
//     const currentTime = Date.now() / 1000;

//     return decoded.exp > currentTime;
//   } catch (err) {
//     console.error("Invalid token", err);
//     return false;
//   }
// };
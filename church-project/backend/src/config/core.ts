import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5173", "https://yourapp.com"],
  credentials: true,
};

export default cors(corsOptions);

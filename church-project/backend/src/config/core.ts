import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:3000", "https://yourapp.com"], // update with your origins
  credentials: true,
};

export default cors(corsOptions);

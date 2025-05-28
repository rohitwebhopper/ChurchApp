import { useState } from "react";
import styles from "./card.module.css";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

const data = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 50 },
  { name: "May", value: 30 },
  { name: "Jun", value: 45 },
  { name: "Jul", value: 40 },
];
const FinanceCard = () => {
  const [tab, setTab] = useState("Income");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>

          {/* Total Balance */}
          <div className={styles.balance}>
            <div className={styles.balanceIcon}>
              <HiOutlineCurrencyDollar className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Donation</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-gray-800">
                  ₹459.10
                </span>
                <span className="text-green-500 font-medium text-sm">
                  ↑ 42.9%
                </span>
              </div>
            </div>
            <div className={styles.tabs}>
              {["Monthly", "Quartely", "Yearly"].map((item) => (
                <button
                  key={item}
                  className={`${styles.tab} ${
                    tab === item ? styles.tabActive : ""
                  }`}
                  onClick={() => setTab(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className={styles.chartArea}>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Income Info */}
          <div className={styles.incomeCircle}>
            <div className={styles.circle}>₹65</div>
            <div>
              <p className="font-semibold text-gray-700">Donation this week</p>
              <p className="text-sm text-gray-400"> ₹39k less than last week</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceCard;

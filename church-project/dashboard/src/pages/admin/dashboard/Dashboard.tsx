import { HiUsers, HiHeart, HiOutlineClipboardList } from "react-icons/hi";

const stats = [
  {
    id: 1,
    label: "Members",
    value: "1,245",
    icon: <HiUsers className="text-primary w-8 h-8" />,
  },
  {
    id: 2,
    label: "Donations",
    value: "$24,500",
    icon: <HiHeart className="text-primary w-8 h-8" />,
  },
  {
    id: 3,
    label: "Projects",
    value: "12 Active",
    icon: <HiOutlineClipboardList className="text-primary w-8 h-8" />,
  },
];

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-6">
      <header>
        <h2 className="text-2xl font-extrabold text-primary mb-2">
          Welcome to Your Church Dashboard
        </h2>
        <p className="text-gray-700 max-w-xl">
          Manage your members, donations, and projects with ease.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map(({ id, label, value, icon }) => (
          <div
            key={id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
              {icon}
            </div>
            <div>
              <p className="text-gray-500 font-medium">{label}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashboardHome;

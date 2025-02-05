import ApexChart from "../charts/DailyBookings";
import RecentBookingsTable from "../components/RecentBookingsTable";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="statistics">
        <div className="card daily_recipes">
          <h3>250 000MZN</h3>
          <p>Receitas diárias</p>
        </div>
        <div className="card all_bookings">
          <h3>50/100</h3>
          <p>Quartos reservados</p>
        </div>
        <div className="recent_bookings">
          <RecentBookingsTable />
        </div>

        <div className="daily_bookings_grafic">
          <ApexChart />
        </div>

      </div>
    </div>
  );
}

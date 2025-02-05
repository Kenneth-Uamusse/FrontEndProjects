import person_icon from "../../public/person_icon.png";

export default function RecentBookingsTable() {
  return (
    <div className="card">
      <h2>Reservados Recentemente</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>
              <img
                src={person_icon}
                alt="Person Image"
                className="person_icon"
              />
            </td>
            <td>John Doe</td>
            <td>Room 28</td>
          </tr>
          <tr>
            <td>
              <img
                src={person_icon}
                alt="Person Image"
                className="person_icon"
              />
            </td>
            <td>Liza Doe</td>
            <td>Room 20</td>
          </tr>
          <tr>
            <td>
              <img
                src={person_icon}
                alt="Person Image"
                className="person_icon"
              />
            </td>
            <td>Martin Havu</td>
            <td>Room 28</td>
          </tr>
          <tr>
            <td>
              <img
                src={person_icon}
                alt="Person Image"
                className="person_icon"
              />
            </td>
            <td>John Doe</td>
            <td>Room 28</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

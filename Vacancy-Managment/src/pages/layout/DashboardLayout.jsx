import { Link, Outlet } from "react-router-dom";
import logo from "../../../public/logo.png";
import creation from "../../../public/icons/creation.png";
import candidates from "../../../public/icons/candidates.png";
import statistics from "../../../public/icons/statistics.png";
import jobs from "../../../public/icons/jobs.png";
import candidacies from "../../../public/icons/candidacies.png";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside>
        <img src={logo} alt="Ikarus Logo" className="ikarus_logo" />
        <div className="links">
          <Link to="/dashboard">
            <img src={statistics} alt="Statistics Icon" className="asideIcon" />
            Estatísticas
          </Link>
          <Link to="createVacancy">
            <img src={creation} alt="Job Creation Icon" className="asideIcon" />
            Criar Vaga
          </Link>
          <Link to="createCandidacy">
            <img
              src={candidates}
              alt="Insert Candidate Icon"
              className="asideIcon"
            />
            Criar Candidatura
          </Link>
          <Link to="allVacancies">
            <img src={jobs} alt="All Jobs Icon" className="asideIcon" />
            Lista de Vagas
          </Link>
          <Link to="allCandidacies">
            <img
              src={candidacies}
              alt="All Candidacies Icon"
              className="asideIcon"
            />
            Lista de Candidaturas
          </Link>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

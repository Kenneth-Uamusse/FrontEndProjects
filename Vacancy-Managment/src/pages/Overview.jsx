import ApexChart from "../components/chart/BarChart";
import approved from "../../public/icons/approved.png";
import pending from "../../public/icons/pending.png";
import rejected from "../../public/icons/rejected.png";
import active from "../../public/icons/active.png";
import useVacancyContext from "../hook/useVacancyContext";
import useCandidacyContext from "../hook/useCandidacyContext";
import { TablePagination } from "@mui/material";
import { useState } from "react";

export default function Overview() {
  const { jobs } = useVacancyContext();
  const { candidacies } = useCandidacyContext();

  const currentDate = new Date();

  const availableJobs = jobs
    .filter((job) => {
      const limitDate = new Date(job.limitDate);
      return limitDate > currentDate;
    })
    .map((job) => ({ value: job.id, label: job.jobTitle }));

  const pendingCandidacies = candidacies.filter(
    (candidacy) => candidacy.status === "Em análise"
  );

  const approvedCandidacies = candidacies.filter(
    (candidacy) => candidacy.status === "Aprovada"
  );

  const rejectedCandiacies = candidacies.filter(
    (candidacy) => candidacy.status === "Rejeitada"
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <main className="statistics">
      <section id="cardsSection">
        <div className="card">
          <img src={active} alt="active-icon" className="icon" />
          <p>{availableJobs.length}</p>
          <h4>Total de vagas activas</h4>
        </div>
        <div className="card">
          <img src={approved} alt="approved-icon" className="icon" />
          <p>{approvedCandidacies.length}</p>
          <h4>Candidatos Aprovados</h4>
        </div>
        <div className="card">
          <img src={pending} alt="pending-icon" className="icon" />
          <p>{pendingCandidacies.length}</p>
          <h4>Candidatos em Análise</h4>
        </div>
        <div className="card">
          <img src={rejected} alt="rejected-icon" className="icon" />
          <p>{rejectedCandiacies.length}</p>
          <h4>Candidatos rejeitados</h4>
        </div>
      </section>
      <section id="reportSection">
        <div id="chart">
          <ApexChart />
        </div>
        <div className="reportTable">
          <table>
            <thead>
              <tr>
                <th>Vagas</th>
                <th>Total de Candidatos</th>
                <th>Em Análise</th>
                <th>Aprovados</th>
                <th>Rejeitados</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => (
                    <tr key={job.id}>
                      <td>{job.jobTitle}</td>
                      <td>{job.candidates.length}</td>
                      <td>
                        {
                          job.candidates.filter(
                            (candidate) => candidate.status === "Em análise"
                          ).length
                        }
                      </td>
                      <td>
                        {
                          job.candidates.filter(
                            (candidate) => candidate.status === "Aprovada"
                          ).length
                        }
                      </td>
                      <td>
                        {
                          job.candidates.filter(
                            (candidate) => candidate.status === "Rejeitada"
                          ).length
                        }
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhuma vaga cadastrada</td>
                </tr>
              )}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={jobs != null ? jobs.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          ></TablePagination>
        </div>
      </section>
    </main>
  );
}

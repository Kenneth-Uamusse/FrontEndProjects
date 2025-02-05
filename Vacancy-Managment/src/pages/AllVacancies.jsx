import show from "../../public/icons/show.png";
import edit from "../../public/icons/edit.png";
import bin from "../../public/icons/bin.png";
import useVacancyContext from "../hook/useVacancyContext";
import { toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { TablePagination } from "@mui/material";

export default function AllVacancies() {
  const { jobs, deleteJob } = useVacancyContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div id="reportTable" className="reportTable">
      <table>
        <thead>
          <tr>
            <th>Título da Vaga</th>
            <th>Data da Criação</th>
            <th>Data Limite</th>
            <th>Candidatos</th>
            <th>Acções</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((job) => (
                <tr key={job.id}>
                  <td>{job.jobTitle}</td>
                  <td>{formatDate(job.createdAt)}</td>
                  <td>{formatDate(job.limitDate)}</td>
                  <td>{job.candidates.length}</td>
                  <td>
                    <img src={show} alt="Show" className="actionBtn" />
                    <img src={edit} alt="Edit" className="actionBtn" />
                    <img
                      src={bin}
                      alt="Bin"
                      className="actionBtn"
                      onClick={() => {
                        deleteJob(job.id);
                        toast.success("Vaga excluída com sucesso!!");
                      }}
                    />
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
  );
}

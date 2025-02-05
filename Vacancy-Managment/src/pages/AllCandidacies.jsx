import useCandidacyContext from "../hook/useCandidacyContext";
import bin from "../../public/icons/bin.png";
import approved from "../../public/icons/approved.png";
import rejected from "../../public/icons/rejected.png";
import { handleApproveBtn, handleRejectBtn } from "../hook/handleCandidacies";
import { toast } from "react-toastify";
import { useState } from "react";
import { TablePagination } from "@mui/material";

export default function AllCandidacies() {
  const { candidacies, deleteCandidacy, setCandidacies } =
    useCandidacyContext();
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div id="reportTable" className="reportTable">
      <div className="form-group">
        <input
          type="text"
          name="searchInput"
          id="searchInputf"
          placeholder="Pesquise por nome da vaga..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <br />
      <table>
        <thead>
          <th>Vagas</th>
          <th>Nome do Candidato</th>
          <th>Email do Candidato</th>
          <th>Status</th>
          <th>Acções</th>
        </thead>
        <tbody>
          {candidacies.length > 0 ? (
            candidacies
              .filter((candidacy) => {
                return search.toLowerCase() === ""
                  ? candidacy
                  : candidacy.jobTitle
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((candidacy) => (
                <tr key={candidacy.id}>
                  <td>{candidacy.jobTitle}</td>
                  <td>{candidacy.candidateName}</td>
                  <td>{candidacy.candidateEmail}</td>
                  <td>{candidacy.status || "Em análise"}</td>
                  <td>
                    <img
                      src={approved}
                      alt="Approve Icon"
                      className="actionBtn"
                      onClick={() => {
                        handleApproveBtn(setCandidacies, candidacy.id);
                        toast.success("Candidatura Aprovada com sucesso!!");
                      }}
                    />
                    <img
                      src={rejected}
                      alt="Reject Icon"
                      className="actionBtn"
                      onClick={() => {
                        handleRejectBtn(setCandidacies, candidacy.id);
                        toast.success("Candidatura Rejeitada com sucesso!!");
                      }}
                    />
                    <img
                      src={bin}
                      alt="bin icon"
                      className="actionBtn"
                      onClick={() => {
                        deleteCandidacy(candidacy.id);
                        toast.success("Candidatura excluída com sucesso");
                      }}
                    />
                  </td>
                </tr>
              ))
          ) : (
            <tr colSpan={5}>
              <td>Nenhuma candidatura cadastrada</td>
            </tr>
          )}
        </tbody>
      </table>
      <TablePagination
        component="div"
        count={candidacies != null ? candidacies.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      ></TablePagination>
    </div>
  );
}

import { useContext } from "react";
import { CandidacyContext } from "../../context/contexts";
import useVacancyContext from "../../hook/useVacancyContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function CandidacyForm({ candidacy = null, onSubmit }) {
  const { jobs, addCandidateToJob } = useVacancyContext();
  const { addCandidacy } = useContext(CandidacyContext);

  const currentDate = new Date();

  const availableJobs = jobs
    .filter((job) => {
      const limitDate = new Date(job.limitDate);
      return limitDate > currentDate;
    })
    .map((job) => ({ value: job.id, label: job.jobTitle }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const selectedJobId = formData.get("jobTitle");
    const selectedJobTitle = availableJobs.find(
      (job) => job.value === selectedJobId
    );

    const newCandidacy = {
      id: uuidv4(),
      jobTitle: selectedJobTitle ? selectedJobTitle.label : "",
      candidateName: formData.get("candidateName"),
      candidateEmail: formData.get("candidateEmail"),
      candidateId: formData.get("candidateId"),
      status: "Em análise",
    };

    if (candidacy) {
      toast.success("Candidatura Actualizada com Sucesso");
    } else {
      addCandidacy(newCandidacy);

      addCandidateToJob(selectedJobId, newCandidacy);

      toast.success("Candidatura efectuada com sucesso!!");
    }

    if (onSubmit) {
      onSubmit();
    }

    e.target.reset();
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Título da Vaga</label>
          <select name="jobTitle" id="jobTitle" required>
            <option value="" selected disabled>
              Seleccione...
            </option>
            {availableJobs.map((job) => (
              <option key={job.value} value={job.value}>
                {job.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="candidateName">Nome do Candidato</label>
          <input type="text" name="candidateName" id="candidateName" required />
        </div>
        <div className="form-group">
          <label htmlFor="candidateEmail">Email do Candidato</label>
          <input type="email" name="candidateEmail" id="candidateEmail" />
        </div>
        <div className="form-group">
          <label htmlFor="candidateId">Número de BI</label>
          <input type="text" name="candidateId" id="candidateId" />
        </div>

        <button type="submit" className="submit-button">
          {candidacy ? "Actualizar" : "Salvar"}
        </button>
      </form>
    </div>
  );
}

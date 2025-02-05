import { useState } from "react";
import useVacancyContext from "../../hook/useVacancyContext.js";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

// eslint-disable-next-line react/prop-types
export default function JobForm({ job = null, onSubmit }) {
  const { addJob } = useVacancyContext();

  const [formData, setFormData] = useState({
    jobTitle: job ? job.jobTitle : "",
    jobDescription: job ? job.jobDescription : "",
    jobRequirements: job ? job.jobRequirements : "",
    limitDate: job ? job.limitDate : "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addJob(formData); 

    setFormData({
      jobTitle: "",
      jobDescription: "",
      jobRequirements: "",
      limitDate: "",
    });

    if (job) {
      toast.success("Vaga actualizada com sucesso!");
    } else {
      toast.success("Vaga salva com sucesso!");
    }

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Título da Vaga</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Descrição da Vaga</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows="4"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="jobRequirements">Requisitos Básicos</label>
          <textarea
            id="jobRequirements"
            name="jobRequirements"
            value={formData.jobRequirements}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="limitDate">Data Limite para Aplicação</label>
          <input
            type="date"
            id="limitDate"
            name="limitDate"
            value={formData.limitDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {job ? "Actualizar" : "Salvar"}
        </button>
      </form>
    </div>
  );
}

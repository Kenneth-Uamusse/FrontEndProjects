import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { VacanciesContext } from "./contexts";

export const VacanciesProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem("jobs");
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: uuidv4(),
      candidates: [],
      createdAt: new Date(),
    };

    setJobs((currentState) => {
      const newJobs = [newJob, ...currentState];
      localStorage.setItem("jobs", JSON.stringify(newJobs));

      return newJobs;
    });
  };

  const deleteJob = (jobId) => {
    setJobs((currentState) => {
      const newJobs = currentState.filter((job) => job.id !== jobId);
      localStorage.setItem("jobs", JSON.stringify(newJobs));

      return newJobs;
    });
  };

  const addCandidateToJob = (jobId, candidate) => {
    setJobs((prevJobs) => {
      const updatedJobs = prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, candidates: [...job.candidates, candidate] }
          : job
      );
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      return updatedJobs;
    });
  };

  return (
    <VacanciesContext.Provider
      value={{ jobs, setJobs, addJob, deleteJob, addCandidateToJob }}
    >
      {children}
    </VacanciesContext.Provider>
  );
};

VacanciesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

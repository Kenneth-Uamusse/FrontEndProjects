import { useState } from "react";
import PropTypes from "prop-types";
import { CandidacyContext } from "./contexts";
import useVacancyContext from "../hook/useVacancyContext";

export const CandidacyProvider = ({ children }) => {
  const { jobs, setJobs } = useVacancyContext();

  const [candidacies, setCandidacies] = useState(() => {
    const storedCandidacies = localStorage.getItem("candidacies");
    return storedCandidacies ? JSON.parse(storedCandidacies) : [];
  });

  const addCandidacy = (newCandidacy) => {
    setCandidacies((currentState) => {
      const updatedCandidacies = [...currentState, newCandidacy];
      localStorage.setItem("candidacies", JSON.stringify(updatedCandidacies));

      return updatedCandidacies;
    });
  };

  const deleteCandidacy = (candidacyId) => {
    setCandidacies((currentState) => {
      const updatedCandidacies = currentState.filter(
        (candidacy) => candidacy.id !== candidacyId
      );
      localStorage.setItem("candidacies", JSON.stringify(updatedCandidacies));

      const updatedJobs = jobs.map((job) => {
        const updatedJob = {
          ...job,
          candidates: job.candidates.filter(
            (candidacy) => candidacy.id !== candidacyId
          ),
        };
        return updatedJob;
      });

      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      return updatedCandidacies;
    });
  };

  return (
    <CandidacyContext.Provider
      value={{
        candidacies,
        setCandidacies,
        addCandidacy,
        deleteCandidacy,
      }}
    >
      {children}
    </CandidacyContext.Provider>
  );
};

CandidacyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

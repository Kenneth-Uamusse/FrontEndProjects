const updateCandidacyStatus = (setCandidacies, candidacyId, newStatus) => {
  setCandidacies((currentState) => {
    const updatedCandidacies = currentState.map((candidacy) =>
      candidacy.id === candidacyId
        ? { ...candidacy, status: newStatus }
        : candidacy
    );
    localStorage.setItem("candidacies", JSON.stringify(updatedCandidacies));

    return updatedCandidacies;
  });
};

const handleApproveBtn = (setCandidacies, candidacyId) => {
  updateCandidacyStatus(setCandidacies, candidacyId, "Aprovada");
};

const handleRejectBtn = (setCandidacies, candidacyId) => {
  updateCandidacyStatus(setCandidacies, candidacyId, "Rejeitada");
};

export { updateCandidacyStatus, handleApproveBtn, handleRejectBtn };

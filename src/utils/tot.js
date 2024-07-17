let tot;

export const getTot = async () => {
  const storedTot = localStorage.getItem("evaluationTot");
  tot = storedTot;
  return tot;
};

export const setTot = (value) => {
  tot = value;

  localStorage.setItem("evaluationTot", JSON.stringify(value));
};

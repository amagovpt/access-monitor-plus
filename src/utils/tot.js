let tot;

export const getTot = async () => {
  const storedTot = localStorage.getItem("evaluationTot");

  console.log("#", storedTot);
  tot = storedTot;
  console.log("#1", tot);
  return tot;
};

export const setTot = (value) => {
  tot = value;

  console.log("#4", value);

  localStorage.setItem("evaluationTot", JSON.stringify(value));
};

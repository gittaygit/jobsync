export const findSimilarities = (resumeSkills, jobSkills) => {
  if (resumeSkills.length === 0 || jobSkills.length === 0) {
    return 0;
  }

  const similarsList = jobSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );

  const percentDiff = ((similarsList.length / jobSkills.length) * 100).toFixed(
    2
  );

  return percentDiff;
};

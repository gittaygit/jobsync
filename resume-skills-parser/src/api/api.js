import axios from "axios";

export const parser = async (userInput) => {
  try {
    const resp = await axios.post("/api/parse/skills", {
      data: userInput,
    });
    if (!resp.data.skills) {
      return [];
    }
    return resp.data.skills;
  } catch (error) {
    console.log(error);
  }
};

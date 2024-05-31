import axios from "axios";

const apiKey = process.env.REACT_APP_DEEPSEEK_API_KEY;
const baseURL = process.env.REACT_APP_DEEPSEEK_BASE_URL;

console.log("API Key:", apiKey);
console.log("Base URL:", baseURL);

export const fetchChatCompletion = async (messages) => {
  try {
    const response = await axios.post(`${baseURL}/chat/completions`, {
      model: "deepseek-chat",
      messages: messages,
      stream: false,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    throw error;
  }
};
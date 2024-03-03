const apiKey = "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"; // Replace 'YOUR_API_KEY' with your actual API key
const apiUrl = "https://api.openai.com/v1/chat/completions";

const make_call = document.getElementById("call-btn");
make_call.addEventListener("click", () => {
  console.log("hello cllick!!");
  getQuestions();
});

//getQuestions method
async function getQuestions() {
  const modification_promt =
    "add ##  after every question and don't add any newline character in response ";
  const prompt =
    "generate 1 interview questions for java core. " + modification_promt; // Your prompt
  const response_arr = await getResponse(prompt);
  console.log(response_arr);
  console.log("end!!");
}

//funciton to get the response from api
async function getResponse(prompt) {
  let question_array = null;
  let response = null;
  console.log(prompt);
  //data send with request to api
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an iterviewer.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  //fetching response from api using fetch method
  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.choices[0].message.content); //ai output

  //       question_array = data.choices[0].message.content.split("\n");
  //     })
  //     .catch((error) => console.error("Error:", error));
  try {
    response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error:", error);
  }

  const data_from_response = await response.json();
  console.log(data_from_response);
  question_array = data_from_response.choices[0].message.content.split("##");
  console.log(question_array);
  //   question_array.forEach((element) => {
  //     console.log(element + "--");
  //   });
  return question_array;
}

export { getQuestions };

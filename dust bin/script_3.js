const apiKey = "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"; // Replace 'YOUR_API_KEY' with your actual API key
const apiUrl = "https://api.openai.com/v1/chat/completions";

const container = document.getElementById("container");
const start_btn = document.getElementById("start");
const question_p = document.getElementById("question");
const answer_input = document.getElementById("answer");

start_btn.addEventListener("click", () => {
  console.log("starting the interview! line 10");
  getQuestions();
});

//review answer
async function reviewAnswer() {
  console.log("entered reviewAnswer");
  //get user answer
  const answer = answer_input.value;
  console.log(question_p.innerText);
  console.log(answer);

  const instruction =
    "You are an interviewer. Evaluate the answer and rate it on 0 to 10 scale and also give a feedback on where he/she could've improvised to make it perfect.";
  const prompt =
    "Question you asked: " +
    question_p.innerText +
    "\nAnswer of intern: " +
    answer +
    "\nnow rate the asnwer out of 10 an";

  console.log("before getting rating");
  let rating = await getResponse(instruction, prompt);
  console.log("after getting rating");
  console.log(rating);
}

//print questions on screen
function printQuestion(question) {
  //hide start button
  start_btn.style.display = "none";
  //print question in question container
  question_p.innerText = "Q. " + question;
  //unhide answer input container
  answer_input.style.display = "inline-block";

  //create submit button
  const submit_btn = document.createElement("button");
  submit_btn.textContent = "Submit";
  submit_btn.addEventListener("click", reviewAnswer);
  container.appendChild(submit_btn);
}

//getQuestions method -> this will fetch questions from getResponse()
async function getQuestions() {
  //####[update] - future update to get more
  const instruction = "You are an interviewer.";
  // Your prompt"
  const prompt = "Generate 1 interview question for java core. ";
  let question = await getResponse(instruction, prompt);
  // console.log(question);
  printQuestion(question);
}

//getQuestions method -> this will fetch questions from getResponse()
//funciton to get the response from api
async function getResponse(instruction, prompt) {
  // console.log(instruction, "\n", prompt);
  //data to be send over the api
  try {
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: instruction,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    };
    //request -----> method(how the data will be send) , header(contains type + auth token) & body(contains data)
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(apiUrl, request);
    const responseData = await response.json();
    console.log(responseData);
    const responseContent = responseData.choices[0].message.content;

    // console.log(responseContent);
    return responseContent;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get response from API");
  }
}

const apiKey = "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"; // Replace 'YOUR_API_KEY' with your actual API key
const apiUrl = "https://api.openai.com/v1/chat/completions";

// const container = document.getElementById("container");
const root = document.getElementById("root");
const get_question_btn_el = document.getElementById("get-question");
const question_el = document.getElementById("question");
const answer_el = document.getElementById("answer");
const submit_btn_el = document.getElementById("submit-btn");

const rating_el = document.getElementById("rating");
const feedback_el = document.getElementById("feedback");

submit_btn_el.addEventListener("click", () => {
  console.log("submitting answer");
  reviewAnswer();
});

get_question_btn_el.addEventListener("click", () => {
  console.log("starting the interview! line 10");
  getQuestions();
});

//show feedback recieved through api
function showFeedback(data) {
  rating_el.innerText = data.rating + "/10";
  feedback_el.innerText = data.feedback;
}

//review answer
async function reviewAnswer() {
  console.log("entered reviewAnswer");
  //get user answer
  const answer = answer_el.value;
  console.log(question_el.innerText);
  console.log(answer);

  const instruction = `You are an interviewer. Evaluate the answer and give JSON having feedback and rating as keys like this {"feedback":"detailed feedback of the answer and how he/she can improve, 150 words review atleast","rating":"rating out of 10"}`;
  const prompt =
    "Question you asked: " +
    question_el.innerText +
    "\nAnswer of intern: " +
    answer +
    "\nnow rate the asnwer out of 10 an";

  console.log("before getting rating");
  let response = await getResponse(instruction, prompt);
  console.log(response);
  console.log(response);
  data = JSON.parse(response);
  showFeedback(data);
  console.log("after getting rating");
}

function printQuestion(question) {
  question_el.innerText = question;
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

//ui_component


  /* <div class="items question" id="question-container">
  <h2>Interview Question</h2>
  <p id="question">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque dolore
    ducimus eligendi doloribus nisi.
  </p>
  <button id="get-question">Get Question</button>
</div>; */


function getQuestionComponent() {
  const question_container = document.createElement("div");
  question_container.classList.add("items", "question");
  question_container.id = "question-container";

  const h_el = document.createElement("h2");
  h_el.innerText = "Interview Question";

  const question_el = document.createElement("p");
  question_el.id = "question";

  const button_el = document.createElement("button");
  button_el.id = "get-question";
  button_el.innerText = "Get Question";

  //append to question cont.
  question_container.appendChild(h_el);
  question_container.appendChild(question_el);
  question_container.appendChild(button_el);

  return question_container;
}


  // <!-- answer -->
  //     <div class="items answer">
  //       <h2>Answer</h2>
  //       <textarea
  //         rows="8"
  //         placeholder="Write your answer here..."
  //         id="answer"
  //       ></textarea>
  //       <button id="submit-btn">Submit</button>
  //     </div>
function getAnswerComponent() {
  const answer_container = document.createElement("div");
  answer_container.classList.add("items", "answer");

  const h_el = document.createElement("h2");
  h_el.innerText = "Answer";

  const textarea_el = document.createElement("textarea");
  textarea_el.setAttribute("rows","8");
  textarea_el.setAttribute("placeholder", "Write your answer here...");
  textarea_el.id = "answer";


  const button_el = document.createElement("button");
  button_el.id = "submit-btn";
  button_el.innerText = "Submit";

  //append to question cont.
  answer_container.appendChild(h_el);
  answer_container.appendChild(textarea_el);
  answer_container.appendChild(button_el);

  return answer_container;
}



// <!-- feedback -->
//       <div class="items feedback" id="feedback-container">
//         <div class="rating-container">
//           <h2>AI Feedback</h2>
//           <h2 class="rating" id="rating">8/10</h2>
//         </div>
//         <p id="feedback">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
//           officiis provident voluptate corrupti quas porro laboriosam dolorum
//           natus minus dignissimos delectus sit adipisci, mollitia eius
//           cupiditate, iste quod. Eligendi, quasi.
//         </p>
//       </div>
function getFeedbackComponent() {
  const feedback_container = document.createElement("div");
  feedback_container.classList.add("items", "feedback");
  feedback_container.id = "feedback-container";

  const rating_container = document.createElement("div");
  rating_container.classList.add("rating-container");

  const h_title_el = document.createElement("h2");
  h_title_el.innerText = "AI Feedback";

  const h_rating_el = document.createElement("h2");
  h_rating_el.classList.add("rating");
  h_rating_el.id = "rating";
  
  //appending to rating container
  rating_container.appendChild(h_title_el);
  rating_container.appendChild(h_rating_el);

  const p_feedback = document.createElement("p");
  p_feedback.id = "feedback";

  feedback_container.appendChild(rating_container);
  feedback_container.appendChild(p_feedback);

  return feedback_container;
}


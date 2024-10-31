import React, { useState } from 'react';

const QuizForm = () => {
  const [questions, setQuestions] = useState([
    {
      question: '',
      answers: [{ text: '', isCorrect: false }],
    },
  ]);

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', answers: [{ text: '', isCorrect: false }] },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Add an answer to a question
  const addAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({ text: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  // Remove an answer from a question
  const removeAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.filter(
      (_, i) => i !== answerIndex
    );
    setQuestions(newQuestions);
  };

  // Update the question text or answer text
  const updateText = (questionIndex, text, answerIndex = null) => {
    const newQuestions = [...questions];
    if (answerIndex === null) {
      newQuestions[questionIndex].question = text;
    } else {
      newQuestions[questionIndex].answers[answerIndex].text = text;
    }
    setQuestions(newQuestions);
  };

  // Toggle the correct answer checkbox
  const toggleCorrectAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].isCorrect = !newQuestions[questionIndex].answers[answerIndex].isCorrect;
    setQuestions(newQuestions);
  };

  return (
    <div className="container w-md-75 w-100 bg-light p-4 fw-bold col-12 ">
    <form className="p-4 border rounded">
      <h3 className='text-center fw-bold'>Quiz Main Details</h3>
      <div className="mb-3">
        <label className="form-label">Quiz Title *</label>
        <input type="text" className="form-control" placeholder="Enter quiz title" />
      </div>
      <div className="mb-3">
        <label className="form-label">Passing Percentage *</label>
        <input type="number" className="form-control" placeholder="Enter passing percentage" />
      </div>

      <h4>Questions</h4>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="card mb-3">
          <div className="card-header d-flex justify-content-between">
            <span>Question {questionIndex + 1}</span>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeQuestion(questionIndex)}
            >
              Remove
            </button>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Question *</label>
              <input
                type="text"
                className="form-control"
                placeholder={`Enter Question ${questionIndex + 1}`}
                value={question.question}
                onChange={(e) => updateText(questionIndex, e.target.value)}
              />
            </div>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Answer ${answerIndex + 1}`}
                  value={answer.text}
                  onChange={(e) => updateText(questionIndex, e.target.value, answerIndex)}
                />
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={() => toggleCorrectAnswer(questionIndex, answerIndex)}
                    aria-label="Correct Answer"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeAnswer(questionIndex, answerIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => addAnswer(questionIndex)}
            >
              + New Answer
            </button>
          </div>
        </div>
      ))}
 

      <div className="buttons d-flex align-items-center justify-content-center">
      <button type="button" className="btn btn-outline-primary p-1 mx-3 " onClick={addQuestion}>
        + Add Another Question
      </button>
      
      </div>
      <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
    
    </form>
    </div>
  );
};

export default QuizForm;

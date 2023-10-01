let operator;
let numDigits;
let numQuestions;
let currentQuestion;

let appendedAnswer = '';

function generateRandomNumber(digits) {
	const min = Math.pow(10, digits - 1);
	const max = Math.pow(10, digits) - 1;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
	let questionText = '';
	let answer = 0;
	for (let i = 0; i < numQuestions; i++) {
		const num = generateRandomNumber(numDigits);
		questionText += `${num} ${operator} `;
		if (i === 0) {
			answer = num;
		} else {
			answer = eval(`${answer} ${operator} ${num}`);
		}
	}
	questionText = questionText.slice(0, -2); // Remove trailing operator
	return { questionText, answer };
}

function displayCorrectAnswer(answer) {
	const answerDisplay = document.getElementById('answer-display');
	answerDisplay.textContent = `Correct Answer: ${answer}`;
	answerDisplay.style.opacity = '1';

	setTimeout(() => {
		answerDisplay.style.opacity = '0';
	}, 900);
}

function checkAnswer() {
	const userAnswer = parseFloat(appendedAnswer) || parseFloat(document.getElementById('userAnswer').value); // Use the appended answer or value entered in the box

	if (userAnswer === currentQuestion.answer) {
		showFeedback('check-mark.png', 'correct'); // Use the tick image
		// Record correct answer and time taken here
		// Update statistics
	} else {
		showFeedback('cancel.png', 'incorrect'); // Use the cross image
		const formattedAnswer = currentQuestion.answer.toFixed(2); // Format the correct answer
		displayCorrectAnswer(formattedAnswer);
	}
}

function showFeedback(imageSrc, className) {
	const feedbackImage = document.getElementById(className);

	// Show the feedback
	feedbackImage.style.opacity = '1';

	// Hide the feedback after 2 seconds
	setTimeout(() => {
		feedbackImage.style.opacity = '0';
	}, 900);
}


function generateNextQuestion() {
	// Clear the answer display
	const answerDisplay = document.getElementById('answer-display');
	answerDisplay.innerHTML = '';
	answerDisplay.style.opacity = '0';

	// Clear the feedback
	const feedback = document.getElementById('feedback');
	feedback.innerHTML = '';
	feedback.style.opacity = '0';

	// Hide the feedback images
	const correctImage = document.getElementById('correct');
	const incorrectImage = document.getElementById('incorrect');
	correctImage.style.opacity = '0';
	incorrectImage.style.opacity = '0';

	currentQuestion = generateQuestion();
	document.getElementById('question').innerHTML = currentQuestion.questionText;
	document.getElementById('userAnswer').value = '';
	document.getElementById('result').innerHTML = '';
}


function exitChallenge() {
	document.getElementById('config').style.display = 'block';
	document.getElementById('challenge').style.display = 'none';
}

function startChallenge() {
	numDigits = parseInt(document.getElementById('numDigits').value) || 1; // making 1 as default value
	numQuestions = parseInt(document.getElementById('numQuestions').value) || 2;
	currentQuestion = generateQuestion();
	document.getElementById('question').innerHTML = currentQuestion.questionText;

	appendedAnswer = '';

	document.getElementById('config').style.display = 'none';
	document.getElementById('challenge').style.display = 'block';

	// Show the keypad and hide the input field
	document.getElementById('keypad').style.display = 'block';
	document.getElementById('userAnswer').style.display = 'block';
}

function selectOperator(selectedOperator) {
	operator = selectedOperator;
	document.getElementById('selectedOperator').innerHTML = selectedOperator;

	// Highlight the selected operator button
	const operatorButtons = document.querySelectorAll('#operatorButtons button');
	operatorButtons.forEach(button => button.classList.remove('selected'));
	const selectedButton = Array.from(operatorButtons).find(button => button.innerText === selectedOperator);
	selectedButton.classList.add('selected');
}

function appendToAnswer(character) {
	appendedAnswer += character;
	var inputField = document.getElementById('userAnswer');
	inputField.value = appendedAnswer;
}

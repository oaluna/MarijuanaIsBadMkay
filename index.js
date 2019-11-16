'use strict';

const questionSet = [
    {
    number: 1,
    text: `Everyone knows it's Butters! What's his real name?`,
    optionA: `Marjorine 'Butters' Stotch`,
    optionB: `Professor Chaos!!!`,
    optionC: `Leopold 'Butters' Stotch`,
    optionD: `Napoleon Bonaparte`
    },

    {
    number: 2,
    text: `I said what-what... What is the title of the very first episode of South Park?`,
    optionA: `'Cartman's Mom Is A Dirty Slut`,
    optionB: `'Cartman Gets An Anal Probe'`,
    optionC: `'Cartman's Mom Is Still A Dirty Slut'`,
    optionD: `'Weight Gain 4000'`
    },

    {
    number: 3,
    text: `Oh my God! They Killed Kenny! Kenny died an astounding ____ times throughout the South Park francise.`,
    optionA: `166`,
    optionB: `85`,
    optionC: `126`,
    optionD: `1145`
    },

    {
    number: 4,
    text: `Okay, class! What lazy-eyed teacher did Mr. Mackey fall in love with, mkay?`,
    optionA: `Ms. Choksondik`,
    optionB: `Ms. Tittyknees`,
    optionC: `Mrs. Crabtree`,
    optionD: `Ms. Anthrope`
    },       

    {
    number: 5,
    text: `What junkie piece of million little fibers always advises to "not forget to bring a towel"?`,
    optionA: `Mr. Hat`,
    optionB: `Towelie`,
    optionC: `Halfie`,
    optionD: `Mr. Hankey`
    },

    {
    number: 6,
    text: `Hey, chill out, guy! What sexy dictator just wants to do it all the time with his lover Satan? Relax man.`,
    optionA: `Adolf Hitler`,
    optionB: `Mussolini`,
    optionC: `Saddam Hussein`,
    optionD: `Kim Jong Il`
    },
    
    {
    number: 7,
    text: `Oh, Jesus Christ! Who was Mr...Mrs... President Garrison's other right-hand mate? Besides Mr. Hat?`,
    optionA: `Mr. Slave`,
    optionB: `Ned`,
    optionC: `Caitlyn Jenner`,
    optionD: `Big Gay Al`
    },
    
    {
    number: 8,
    text: `Cartman thinks Kyle is hella lame! Why is that?`,
    optionA: `Because he's a daywalking ginger`,
    optionB: `Because he's a Jew`,
    optionC: `Because he's from Jersey`,
    optionD: `All of the above`
    },
    
    {
    number: 9,
    text: `Don't kick the baby! Where was Ike Broflovski adopted from?`,
    optionA: `He's adopted?!?!?!`,
    optionB: `New Jersey`,
    optionC: `Denver`,
    optionD: `Canada`
    },       
    
    {
    number: 10,
    text: `Ok this one is hard, I'm serial! What politician warned us early on about global warming and ManBearPig but just couldn't convince the world how serial it was?`,
    optionA: `John McCain`,
    optionB: `Al Gore`,
    optionC: `Jeb Bush`,
    optionD: `Sarah Huckabee Sanders`
    }
];

const ANSWERS = [
    `Leopold 'Butters' Stotch`,
    `'Cartman Gets An Anal Probe'`,
    `126`,
    `Ms. Choksondik`,
    `Towelie`,
    `Saddam Hussein`,
    `Mr. Slave`,
    `All of the above`,
    `Canada`,
    `Denver`
]; 

let questionNum = 1;
let correctAnswers = 0;

function questionPageTemplate(correctAnswers, questions, questionsAnswered) {
    return `
    <section id="question-page" role="main">
        <h2 id="question">${question.text}
        </h2>
        
        <form>
            <fieldset>
                <label>
                    <input class="answer" type="radio" name="option" checked></input>
                    <span>${question.ans1}</span>
                    <span>${question.ans2}</span>
                    <span>${question.ans3}</span>
                    <span>${question.ans4}</span>}
                </label>
            </fieldset>

            <button id="js-submit-button">Submit</button>
        </form>

        <div id="status-bar">
            <span id="question-count>Score: $(correctAnswers)/$(questionsAnswered)</span>
        </div>
    </section>`;
}

function handleStartButton(){
    $('#js-start-button').click(function (event) {
        nextQuestion(); 
    });
}


function handleSubmitButton(){
    $('#container').on('click'(function (event){
        event.preventDefault();
        const answer = $('input: checked').siblings('span');
        const userIsCorrect = handleCheckUserAnswer(answer);
        if(userIsCorrect) {
            generateCorrectAnswerFeedback();
        }else {
            generateIncorrectAnswerFeedback();
        }
    }));
}

function handleNextQuestionButton() {
    $('#container').on('click', '#js-next-button', function (event) {
        if(questionNum === 10) {
            createResultsPage(correctAnswers);
        }else {
            iterateQuestion();
            nextQuestion();
        }
    });
}

function handleRestartQuizButton() {
    $('#container').on('click', '#js-restart-button', function (event) {
        questionNum = 1;
        correctAnswers = 0;
        nextQuestion();
    });
}

function nextQuestion() {
    const question = questionSet[questionNum - 1];
    const questionsAnswered = questionNum - 1;
    $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function handleCheckUserAnswer(answer) {
    if(answer.text() === ANSWERS[questionNum - 1]) {
        return true;
    } else{
        return false;
    }
}

function generateCorrectAnswerFeedback() {
    $('#container').html(correctFeedback);
    iterateCorrectAnswers();
}
    
    const correctAnswerFeedback = `
    <section class="feedback-page" role="main">
        <h2>"Yess! Yeeeesss!"</h2>

        <button id="js-next-button">Next</button>
  </section>
`;



function generateIncorrectAnswerFeedback() {
    $('#container').html(incorrectFeedbackTemplate(questionNum));
} 

function incorrectFeedbackTemplate(questionNum) {
    return `
    <section class="feedback-page" role="main">
        <h2>"No! You go to hell! You go to hell and you die! It's ${ANSWERS[questionNum - 1]} you f##### r#####!!"</h2>

        <button id="js-next-button">Next</button>
  </section>
`;
} 

function iterateQuestion () {
    questionNum++;
}

function iterateCorrectAnswers() {
    correctAnswers++;
} 

function generateResultsPage(correctAnswers) {
    $('#container').html(`
    <section id="final-page">
    <h2>Final Score: ${correctAnswers} correct out of 10</h2><br/>
    <h2>"Timmy!"</h2>
    <button id="js-restart-button">Try Again?</button>
  </section>
  `)
} 

function handleButtonGenerator () { 
    handleStartButton();
    handleSubmitButton();
    handleNextQuestionButton();
    handleRestartButton();
}

handleButtons();
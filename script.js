let currentQuestionIndex = 0;
let quiz = {
    questions: [],
    categories: {},
    results: {}
};

// Функции для работы с тестом
function chooseAnswer(answer) {
    // Записываем ответ пользователя
    quiz.categories[currentQuestionIndex] = answer;

    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.questions.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayQuestion() {
    if (currentQuestionIndex < quiz.questions.length) {
        const question = quiz.questions[currentQuestionIndex];
        if (question) {
            document.getElementById("questionText").innerText = question.text;
            document.getElementById("yesButton").onclick = function() { chooseAnswer("Да"); };
            document.getElementById("noButton").onclick = function() { chooseAnswer("Нет"); };

            // Обновляем номер вопроса и прогресс-бар
            const totalQuestions = quiz.questions.length;
            document.getElementById("questionNumber").innerText = `Вопрос ${currentQuestionIndex + 1} из ${totalQuestions}`;
            const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
            document.getElementById("progressBar").style.width = `${progressPercentage}%`;
        } else {
            console.error("Вопрос не найден для индекса:", currentQuestionIndex);
        }
    } else {
        console.error("Индекс вопроса выходит за пределы массива вопросов:", currentQuestionIndex);
    }
}


function displayResult() {
    let score = 0;
    // Подсчет баллов на основе ответов пользователя
    for (let i = 0; i < quiz.questions.length; i++) {
        if (([1, 2, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 18].includes(i + 1) && quiz.categories[i] === "Нет") ||
            ([3, 9, 10, 13, 14, 19].includes(i + 1) && quiz.categories[i] === "Да")) {
            score++;
        }
    }

    // Отображение результата на основе набранных баллов
    let resultText = "";
    if (score > 15) {
        resultText = `🌟 Истинное Волшебство Характера 🌟

Ваше присутствие — это волшебство, превращающее обыденность в праздник души. Ваша доброжелательность и покладистость озаряют мир, наполняя сердца радостью и уверенностью. Вы — символ гармонии и тонкости в общении, рядом с вами любая неловкость исчезает, словно туман под лучами солнца. 🌈✨

Ваша улыбка — факел, освещающий путь, вдохновляющий на подвиги и наполняющий сердца теплом. Ваша аура притягивает людей, жаждущих света и искренности, делая мир лучше. Ваша жизнь — гимн любви и позитива, звучащий в душах всех, кто вас знает. 💖🎇`;
    } else if (score >= 8) {
        resultText = `✨ Ваша душа — как неизведанная земля, полная загадок и скрытых сокровищ. Да, путь самопознания иногда тернист, и в вашем характере могут встречаться туманные участки. Но не забывайте: каждый недостаток скрывает за собой потенциал к величию! В вас заложены удивительные достоинства, которые ждут своего часа, чтобы засиять. 🌟

Не бойтесь раскрыться миру — ваша уникальность заслуживает внимания. Возможно, вас пугает мысль о потере авторитета, но истинное лидерство начинается с умения быть собой, признавая и принимая свои сильные и слабые стороны. 🚀

Ваша дорога к себе — это путешествие, на котором каждый шаг делает вас сильнее и мудрее. Откройте свои достоинства миру, и вы обнаружите, что ваша светлая сторона способна озарить не только ваш путь, но и пути тех, кто идет рядом. 💫`;
    } else {
        resultText = `🌪 Ваш путь — это буря страстей и эмоций, в которой каждый шаг может быть как вызовом, так и приключением. Ваши близкие знают, что жизнь с вами непредсказуема и полна вихрей. Иногда, кажется, что конфликты и споры следуют за вами, словно тени. Но помните, в каждой тени скрывается свет. 🌈

Ваш характер — это и ваша сила, и ваша слабость. Он делает вас уникальным, неповторимым, но в то же время ставит перед вами испытания. Это не приговор, а скорее призыв к действию. 🚀

Помните, что каждый момент — это возможность для перемен. Возможно, пришло время взглянуть в глаза своим бурям и научиться управлять ими. Ведь даже самый могучий ветер может быть направлен в пользу, а из разбитого корыта можно выстроить мост к новым берегам. 🌉

Ваша жизнь — это ваше полотно, и только вы решаете, какими красками его раскрасить. Пусть каждый шаг к самопознанию будет шагом к гармонии с собой и миром. 💫`;
    }

    document.getElementById("questionContainer").style.display = "none"; // Скрываем контейнер с вопросами
    document.getElementById("resultContainer").style.display = "block"; // Показываем контейнер с результатом
    document.getElementById("resultText").innerText = resultText;

    document.getElementById("questionContainer").style.display = "none"; // Скрываем контейнер с вопросами
    document.getElementById("resultContainer").style.display = "block"; // Показываем контейнер с результатом
    document.getElementById("resultText").innerHTML = resultText; // Используем innerHTML для возможности вставки HTML-кода
    
    // Создаем контейнер для кнопки Телеграм, чтобы выровнять её по центру
    let telegramButtonContainer = document.createElement("div");
    telegramButtonContainer.style.textAlign = "center"; // Выравнивание по центру
    telegramButtonContainer.style.marginTop = "20px"; // Отступ сверху для визуального разделения текста и кнопки

    // Создаем кнопку Телеграм
    let telegramButton = document.createElement("a");
    telegramButton.href = "https://t.me/Psychosthenia"; // Ссылка на ваш канал
    telegramButton.target = "_blank";
    telegramButton.classList.add("telegram-button");
    telegramButton.innerHTML = `<img src="telegram-icon.png" alt="Telegram" style="width: 250px; height: 250px; border-radius: 50%;">`; // Укажите путь к вашей иконке

    // Добавляем кнопку в контейнер для кнопки
    telegramButtonContainer.appendChild(telegramButton);

    // Добавляем контейнер для кнопки в контейнер результатов
    document.getElementById("resultContainer").appendChild(telegramButtonContainer);
}


function calculateResults(answers) {
    let score = 0;
    const negativePointsQuestions = [1, 2, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 18];
    const positivePointsQuestions = [3, 9, 10, 13, 14, 19];

    negativePointsQuestions.forEach(questionNumber => {
        if (answers[questionNumber - 1] === "Нет") {
            score++;
        }
    });

    positivePointsQuestions.forEach(questionNumber => {
        if (answers[questionNumber - 1] === "Да") {
            score++;
        }
    });

    return score;
}

// Загрузка вопросов и результатов
window.onload = function() {
    fetch('questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            quiz.questions = data;
            if (quiz.questions.length > 0) {
                displayQuestion();
            } else {
                throw new Error('No questions loaded');
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке вопросов:", error);
        });
};

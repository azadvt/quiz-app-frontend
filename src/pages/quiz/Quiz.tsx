import React, { useEffect, useState } from 'react'
import styles from './Quiz.module.css'
import { getQuizData, updateQuizData } from '../../api/quiz'

type Option = {
    text: string
    isCorrect: boolean
    id: string
}

type Question = {
    id: string
    questionText: string
    options: Option[]
    explanation: string
    attended: boolean
    userAnswer: string | null
}

type Quiz = {
    id: any
    title: string
    description: string
    questions: Question[]
}

function Quiz() {
    const [quizData, setQuizData] = useState<Quiz | null>(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [attendance, setAttendance] = useState<boolean[]>([])

    useEffect(() => {
        const fetchQuiz = async () => {
            const data = await getQuizData('/quiz/quizzes')

            const formattedData = {
                description: data.data[0].description,
                title: data.data[0].title,
                id: data.data[0]._id,
                questions: data.data[0].questions.map((question: any) => ({
                    ...question,
                    id: question._id,
                    options: question.options.map((option: any) => ({
                        ...option,
                        id: option._id,
                        _id: undefined,
                    })),
                })),
            }

            setQuizData(formattedData)
            setAttendance(new Array(formattedData.questions.length).fill(false))
        }

        fetchQuiz()
    }, [])

    const handleOptionClick = (id: string): void => {
        setSelectedOption(id)
        setShowExplanation(true)

        const updatedAttendance = [...attendance]
        updatedAttendance[currentQuestionIndex] = true
        setAttendance(updatedAttendance)

        const updatedQuizData = {
            questionId: quizData?.questions[currentQuestionIndex]?.id,
            selectedOptionId: id,
        }
        console.log(quizData, 'quizData')

        if (quizData) {
            updateQuizData(
                `/quiz/quizzes/${quizData.id}/questions/${currentQuestionIndex}/answer`,
                updatedQuizData
            )
                .then((response) => {
                    console.log('Quiz updated:', response)
                })
                .catch((error) => {
                    console.error('Error updating quiz:', error)
                })
        }
    }

    const toggleExplanation = (): void => {
        setShowExplanation((prev) => !prev)
    }

    const handleAttendanceClick = (index: number) => {
        setCurrentQuestionIndex(index)
    }

    const nextQuestion = () => {
        if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const currentQuestion = quizData?.questions[currentQuestionIndex]

    const getOptionClass = (optionId: string): string => {
        if (currentQuestion?.userAnswer) {
            if (
                optionId === currentQuestion?.userAnswer &&
                optionId ===
                    currentQuestion?.options.find((option) => option.isCorrect)
                        ?.id
            ) {
                return styles.correct
            }
            if (
                optionId === currentQuestion?.userAnswer &&
                optionId !==
                    currentQuestion?.options.find((option) => option.isCorrect)
                        ?.id
            ) {
                return styles.incorrect
            }
        }

        if (selectedOption === optionId) {
            return optionId ===
                currentQuestion?.options.find((option) => option.isCorrect)?.id
                ? styles.correct
                : styles.incorrect
        }
        return ''
    }

    return (
        <div className={styles.quiz}>
            <h1>{quizData?.title || 'Loading...'}</h1>
            <div className={styles.question}>
                <div className={styles.questionContainer}>
                    <div className={styles.questionHeader}>
                        <h2>Question {currentQuestionIndex + 1}</h2>
                        <p>{currentQuestion?.questionText}</p>
                    </div>

                    <div className={styles.options}>
                        {currentQuestion?.options.map((option) => (
                            <p
                                key={option.id}
                                className={`${styles.option} ${getOptionClass(option.id)}`}
                                onClick={() => handleOptionClick(option.id)}
                            >
                                {option.text}
                            </p>
                        ))}
                    </div>

                    <div className={styles.navigationButtons}>
                        <button type="button" onClick={prevQuestion}>
                            Prev
                        </button>
                        <button type="button" onClick={nextQuestion}>
                            Next
                        </button>
                    </div>

                    <div
                        className={styles.explanation}
                        onClick={toggleExplanation}
                        style={{ cursor: 'pointer' }}
                    >
                        <h4>Explanation</h4>
                        {showExplanation && (
                            <p>{currentQuestion?.explanation}</p>
                        )}
                    </div>
                </div>

                <div className={styles.attendance}>
                    <div className={styles.attendanceHeader}>
                        <p>
                            Question {currentQuestionIndex + 1} of{' '}
                            {quizData?.questions.length}
                        </p>
                    </div>

                    <div className={styles.roundsContainer}>
                        {quizData?.questions.map((question, index) => (
                            <div
                                key={question.id}
                                className={`${styles.round} ${attendance[index] || question.userAnswer ? styles.attended : ''} ${currentQuestionIndex === index ? styles.currentQuestion : ''}`}
                                onClick={() => handleAttendanceClick(index)}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz

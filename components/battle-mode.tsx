"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getQuestions, type Question } from "@/lib/api";

interface BattleModeProps {
  onBackToMenu: () => void;
}

export default function BattleMode({ onBackToMenu }: BattleModeProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getQuestions();
      if (data && data.length > 0) {
        const evenQuestions = data.length % 2 === 0 ? data : data.slice(0, -1);
        setQuestions(evenQuestions);
      } else {
        setError("No se encontraron preguntas");
      }
    } catch (err) {
      console.error(err);
      setError("Error al cargar las preguntas");
    }
    setLoading(false);
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || !questions[currentIndex]) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === questions[currentIndex].correct_answer) {
      if (currentPlayer === 1) {
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setCurrentPlayer(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setError(null);
    loadQuestions();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8">
          <p className="text-xl">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-xl mb-4">
            {error || "No hay preguntas disponibles"}
          </p>
          <div className="space-y-3">
            <Button onClick={loadQuestions} className="w-full">
              Reintentar
            </Button>
            <Button onClick={onBackToMenu} variant="outline" className="w-full">
              Volver al Menú
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const winner =
      player1Score > player2Score ? 1 : player2Score > player1Score ? 2 : null;
    return (
      <div className="min-h-screen bg-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            {winner ? `¡Jugador ${winner} Gana!` : "¡Empate!"}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="font-bold">Jugador 1</div>
              <div className="text-3xl font-bold text-blue-600">
                {player1Score}
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <div className="font-bold">Jugador 2</div>
              <div className="text-3xl font-bold text-purple-600">
                {player2Score}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={resetGame} className="w-full">
              Jugar de Nuevo
            </Button>
            <Button onClick={onBackToMenu} variant="outline" className="w-full">
              Menú
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-xl mb-4">Error: Pregunta no encontrada</p>
          <Button onClick={onBackToMenu} className="w-full">
            Volver al Menú
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 text-white">
          <Button
            onClick={onBackToMenu}
            variant="ghost"
            className="text-white border-white"
          >
            ← Menú
          </Button>
          <div className="text-xl">
            Pregunta {currentIndex + 1} de {questions.length}
          </div>
          <div className="text-xl">Turno: Jugador {currentPlayer}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`bg-white rounded-lg p-4 text-center ${
              currentPlayer === 1 ? "ring-4 ring-blue-400" : ""
            }`}
          >
            <div className="font-bold">Jugador 1</div>
            <div className="text-2xl font-bold text-blue-600">
              {player1Score}
            </div>
          </div>
          <div
            className={`bg-white rounded-lg p-4 text-center ${
              currentPlayer === 2 ? "ring-4 ring-purple-400" : ""
            }`}
          >
            <div className="font-bold">Jugador 2</div>
            <div className="text-2xl font-bold text-purple-600">
              {player2Score}
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div
            className={`inline-block px-6 py-2 rounded-full text-white font-bold ${
              currentPlayer === 1 ? "bg-blue-500" : "bg-purple-500"
            }`}
          >
            Turno del Jugador {currentPlayer}
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.answers?.map((answer, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-lg border-2 font-medium ${
                  showResult && answer === currentQuestion.correct_answer
                    ? "bg-green-500 text-white border-green-500"
                    : showResult &&
                      selectedAnswer === answer &&
                      answer !== currentQuestion.correct_answer
                    ? "bg-red-500 text-white border-red-500"
                    : selectedAnswer === answer
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => handleAnswer(answer)}
                disabled={showResult}
              >
                {String.fromCharCode(65 + index)}. {answer}
              </button>
            )) || <p>No hay respuestas disponibles</p>}
          </div>
        </div>

        {showResult && (
          <div className="text-center">
            <div className="mb-6">
              {selectedAnswer === currentQuestion.correct_answer ? (
                <div className="bg-green-100 text-green-800 rounded-lg p-4 max-w-md mx-auto">
                  ¡Correcto, Jugador {currentPlayer}!
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="bg-red-100 text-red-800 rounded-lg p-4 max-w-md mx-auto">
                    Incorrecto, Jugador {currentPlayer}
                  </div>
                  <div className="bg-blue-100 text-blue-800 rounded-lg p-3 max-w-md mx-auto">
                    Respuesta correcta: {currentQuestion.correct_answer}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 wrap-normal items-center">
              <Button onClick={nextQuestion} size="lg">
                {currentIndex < questions.length - 1
                  ? `Turno Jugador ${currentPlayer === 1 ? 2 : 1}`
                  : "Ver Resultados"}
              </Button>

              <Button
                variant={"destructive"}
                onClick={() => setGameFinished(true)}
                size="lg"
              >
                Finalizar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

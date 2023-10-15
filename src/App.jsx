import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const hiragana = [
    { romaji: "a", hiragana: "あ" },
    { romaji: "i", hiragana: "い" },
    { romaji: "u", hiragana: "う" },
    { romaji: "e", hiragana: "え" },
    { romaji: "o", hiragana: "お" },
    { romaji: "ka", hiragana: "か" },
    { romaji: "ki", hiragana: "き" },
    { romaji: "ku", hiragana: "く" },
    { romaji: "ke", hiragana: "け" },
    { romaji: "ko", hiragana: "こ" },
    { romaji: "sa", hiragana: "さ" },
    { romaji: "shi", hiragana: "し" },
    { romaji: "su", hiragana: "す" },
    { romaji: "se", hiragana: "せ" },
    { romaji: "so", hiragana: "そ" },
    { romaji: "ta", hiragana: "た" },
    { romaji: "chi", hiragana: "ち" },
    { romaji: "tsu", hiragana: "つ" },
    { romaji: "te", hiragana: "て" },
    { romaji: "to", hiragana: "と" },
    { romaji: "na", hiragana: "な" },
    { romaji: "ni", hiragana: "に" },
    { romaji: "nu", hiragana: "ぬ" },
    { romaji: "ne", hiragana: "ね" },
    { romaji: "no", hiragana: "の" },
    { romaji: "ha", hiragana: "は" },
    { romaji: "hi", hiragana: "ひ" },
    { romaji: "fu", hiragana: "ふ" },
    { romaji: "he", hiragana: "へ" },
    { romaji: "ho", hiragana: "ほ" },
    { romaji: "ma", hiragana: "ま" },
    { romaji: "mi", hiragana: "み" },
    { romaji: "mu", hiragana: "む" },
    { romaji: "me", hiragana: "め" },
    { romaji: "mo", hiragana: "も" },
    { romaji: "ya", hiragana: "や" },
    { romaji: "yu", hiragana: "ゆ" },
    { romaji: "yo", hiragana: "よ" },
    { romaji: "ra", hiragana: "ら" },
    { romaji: "ri", hiragana: "り" },
    { romaji: "ru", hiragana: "る" },
    { romaji: "re", hiragana: "れ" },
    { romaji: "ro", hiragana: "ろ" },
    { romaji: "wa", hiragana: "わ" },
    { romaji: "wo", hiragana: "を" },
    { romaji: "n", hiragana: "ん" },
  ];

  // インプットフィールドの値を管理するステート
  const [input, setInput] = useState("");
  // 現在のひらがなのインデックスを管理するステート
  const [current, setCurrent] = useState(0);

  // ストリーク（連続正解回数）を管理するステート
  const [streak, setStreak] = useState(0);
  // 最高ストリーク（最大の連続正解回数）を管理するステート
  const [maxStreak, setMaxStreak] = useState(0);

  // エラーメッセージを管理するステート
  const [error, setError] = useState(false);

  // ランダムなひらがなを設定する関数
  const setRandomHiragana = () => {
    // hiragana 配列からランダムなインデックスを選択
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    // 選択したインデックスを現在のひらがなとして設定
    setCurrent(randomIndex);
  };

  const handleChange = (e) => {
    // インプットフィールドの値が変更されたときに呼び出される関数
    setInput(e.target.value);// インプットの値を更新
  };

  const handleSubmit = (e) => {
    // フォームのサブミット時に呼び出される関数
    e.preventDefault();// デフォルトのフォームの送信動作（ページのリロード）をキャンセル

    if (input.toLowerCase() === hiragana[current].romaji) {
       // 入力が現在のひらがなのローマ字表記と一致する場合
      setStreak(streak + 1);  // ストリークを増やす
      setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak);// 最高ストリークを更新
      setError(false);// エラーメッセージをクリア

      // ローカルストレージにストリークと最高ストリークを保存
      localStorage.setItem("streak", streak + 1);
      localStorage.setItem(
        "maxStreak",
        streak + 1 > maxStreak ? streak + 1 : maxStreak
      );
    } else {
       // 入力が間違っている場合
      const h = hiragana[current].hiragana;
      const r = hiragana[current].romaji;
      setError(`Wrong! The correct answer for ${h} is ${r}`);// エラーメッセージを設定
      setStreak(0);// ストリークをリセット
      localStorage.setItem("streak", 0);// ローカルストレージにストリークをリセット
    }

    setInput("");// インプットをクリア
    setRandomHiragana();// ランダムなひらがなを設定
  };

  useEffect(() => {
    // コンポーネントがマウントされた時、または初回のレンダリング時に実行
    setRandomHiragana();// ランダムなひらがなを設定

     // ローカルストレージからストリークと最高ストリークを読み込んで設定
    setStreak(parseInt(localStorage.getItem("streak")) || 0);
    setMaxStreak(parseInt(localStorage.getItem("maxStreak")) || 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 text-white text-center">
       {/* ヘッダーセクション */}
      <header className="p-6 mb-8">
        <h1 className="text-2xl font-bold uppercase">Hiragana Quiz</h1>
        <div>
          <p>
            {/* ストリークと最高ストリークの表示 */}
            {streak} / {maxStreak}
          </p>
        </div>
      </header>

      <div className="text-9xl font-bold mb-8">
         {/* 現在のひらがなの表示 */}
        <p>{hiragana[current].hiragana}</p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSubmit}>
           {/* インプットフィールド */}
          <input
            type="text"
            onChange={handleChange}
            value={input}
            className="block w-24 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2"
          />
        </form>
      </div>
       {/* エラーメッセージの表示 */}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;

/*
// CSVを読み込んでパースする関数
async function loadCSV(path) {
  const response = await fetch(path);
  const text = await response.text();
  const lines = text.trim().split("\n");

  // 1行目（ヘッダー）をスキップ
  const data = lines.slice(1).map(line => {
    const [word, answer, comment] = line.split(",");
    return { word, answer, comment };
  });

  console.log("CSV読み込み完了:", path, data);
  return data;
}

document.addEventListener("DOMContentLoaded", async () => {

  const wordEl = document.getElementById("word");
  const answerEl = document.getElementById("answer");
  const commentEl = document.getElementById("comment");
  const showBtn = document.getElementById("show-answer");
  const nextBtn = document.getElementById("next-word");
  const subjectSelect = document.getElementById("subject-select");

  let records = [];
  let currentIndex = 0;

  //カードを表示
  function showCard() {
    const item = records[currentIndex];
    if (!item) {
      wordEl.textContent = "データがありません";
      answerEl.textContent = "";
      commentEl.textContent = "";
      return;
    }
/*
    wordEl.textContent = item.word;
    answerEl.textContent = item.answer;
    commentEl.textContent = item.comment;

    answerEl.classList.add("hidden");
    commentEl.classList.add("hidden");
    */
   /*
  }
});

// URLから ?subject=english みたいなのを取得
function getSubjectFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("subject") || "english"; // ない場合は英語に
}

document.addEventListener("DOMContentLoaded", async () => {
  const subject = getSubjectFromURL(); //ここでURLから取得
  document.getElementById("subject-title").textContent =
    subject === "english" ? "英語" :
    subject === "history" ? "歴史" : "理科";

//科目を読み込む関数
  async function loadSubject(subject) {
    const filePath = `./${subject}.csv`;
    records = await loadCSV(filePath);
    currentIndex = 0;
    showCard();
  }


//科目を表示
  showBtn.addEventListener("click", () => {
    answerEl.classList.remove("hidden");
    commentEl.classList.remove("hidden");
  });


  //次のカードへ
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % records.length;
    showCard();
  });

  // ドロップダウンで科目変更
  subjectSelect.addEventListener("change", async (e) => {
    const selectedSubject = e.target.value;
    await loadSubject(selectedSubject);
  });

//初期表示（英語）
  await loadSubject("english")

});
*/


// === CSVを読み込んでパースする関数 ===
async function loadCSV(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("CSVが読み込めませんでした");
    const text = await response.text();

    const lines = text.trim().split("\n");
    const data = lines.slice(1).map(line => {
      const [word, answer, comment] = line.split(",");
      return { word, answer, comment };
    });

    console.log("✅ CSV読み込み完了:", path, data);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// === URLから科目（subject）を取得 ===
function getSubjectFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("subject") || "english"; // デフォルトは英語
}

// === ページ読み込み後の処理 ===
document.addEventListener("DOMContentLoaded", async () => {
  const subject = getSubjectFromURL();
  const filePath = `./${subject}.csv`;

  const wordEl = document.getElementById("word");
  const answerEl = document.getElementById("answer");
  const commentEl = document.getElementById("comment");
  const showBtn = document.getElementById("show-answer");
  const nextBtn = document.getElementById("next-word");
  const titleEl = document.getElementById("subject-title");

  titleEl.textContent =
    subject === "english" ? "英語" :
    subject === "history" ? "歴史" :
    subject === "science" ? "理科" : subject;

  let records = await loadCSV(filePath);
  let currentIndex = 0;

  if (records.length === 0) {
    wordEl.textContent = "データが読み込めませんでした";
    return;
  }

  // カードを表示
  function showCard() {
    const item = records[currentIndex];
    if (!item) return;
    wordEl.textContent = item.word;
    answerEl.textContent = item.answer;
    commentEl.textContent = item.comment;
    answerEl.classList.add("hidden");
    commentEl.classList.add("hidden");
  }

  // 答え表示
  showBtn.addEventListener("click", () => {
    answerEl.classList.remove("hidden");
    commentEl.classList.remove("hidden");
  });

  // 次へ
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % records.length;
    showCard();
  });

  showCard(); // 最初のカードを表示
});

const URL = "http://localhost:3001/api";

export async function getTopFiveScores() {
  const response = await fetch(`${URL}/game/get-top-five`);
  const data = await response.json();
  //console.log(data);
  if (!response.ok) {
  //  console.log("err");
    return;
  }

  return data;
}

export async function getGameDifficulties() {
  const response = await fetch(`${URL}/game/difficulties`);
  const data = await response.json();

  if (!response.ok) {
   // console.log("err");
    return;
  }

  return data;
}

export async function getGameBoard(difficulty) {
  const response = await fetch(`${URL}/game/generate-grid/${difficulty}`);
  const data = await response.json();

  if (!response.ok) {
   // console.log("err");
    return;
  }
  return data;
}

export async function checkIfWordExists(word) {
  const response = await fetch(`${URL}/game/findWord?word=${word}`);
  const data = await response.json();

  if (!response.ok) {
    //console.log("err");
    return;
  }

  return data;
}

export async function login(username, password) {
 // console.log(JSON.stringify({ username, password }));
  const response = await fetch(`${URL}/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    //console.log("err");
    return null;
  }

  return data;
}


export async function insertScoreForUser(userId, gameId, score) {
  const response = await fetch(
    `${URL}/game/insert-score`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, gameId, score }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    //console.log("err");
    return;
  }

  return data;
}

export async function logout() {
  const response = await fetch(`${URL}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
  //  console.log("err");
    return null;
  }

  return data;
}
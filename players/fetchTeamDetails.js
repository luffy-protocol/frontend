const fs = require("fs");

const API_URL = "https://api-football-v1.p.rapidapi.com/v3/players";
const API_KEY = "d77878f019mshb86b56759562ea1p13048ejsneda9faebabc4";
const API_HOST = "api-football-v1.p.rapidapi.com";
const TEAM_ID = "1602";
const SEASON = "2024";

async function fetchAllPages() {
  let currentPage = 1;
  let totalPages = 1;
  let allPlayers = [];

  while (currentPage <= totalPages) {
    const response = await fetch(
      `${API_URL}?team=${TEAM_ID}&season=${SEASON}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    allPlayers = allPlayers.concat(data.response);

    // Update pagination info
    currentPage++;
    totalPages = data.paging.total;
  }

  return allPlayers;
}

async function saveDataToFile(data, filename) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `team/${filename}`,
      JSON.stringify(data, null, 2),
      "utf8",
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

async function main() {
  try {
    const allPlayers = await fetchAllPages();
    await saveDataToFile(
      allPlayers,
      allPlayers[0].statistics[0].team.name + ".json"
    );
    console.log("Data saved to" + allPlayers[0].statistics[0].team.name);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();

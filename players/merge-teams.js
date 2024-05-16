const fs = require("fs");
const path = require("path");

// Directory where your JSON files are stored
const directory = "./teams";

// Initialize an empty array to hold the merged data
const allTeams = [];

// Function to read and merge JSON files
const mergeJsonFiles = () => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      if (path.extname(file) === ".json") {
        const filePath = path.join(directory, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        allTeams.push(...data); // Assuming each file contains an array of player data
      }
    });

    // Write the merged data to a new JSON file
    const outputFilePath = path.join(directory, "all_teams.json");
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(allTeams, null, 2),
      "utf-8"
    );
    console.log(`Merged data written to ${outputFilePath}`);
  });
};

// Execute the merge function
mergeJsonFiles();

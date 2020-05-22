/*
Please use async/await for Javascript
I need JS code which can do the following: the Main.js is the root file and in the same level, there will be folder1, folder2, folder3.
1. Main.js contains two objects: data, result
2. Main.js opens a folder called folder_name1, finds any .js files in the folder, and executes them one by one.
3. Main.js then opens a folder called folder_name2, finds any .js files in the folder, and executes them one by one.
4. Main.js then opens a folder called folder_name3, finds any .js files in the folder, and executes them one by one.
5. Finally, main.js executes a function.
Important notes:

A) The ordering of execution must be 2 -> 3 -> 4 -> 5. Tz (2) is done, it will then execute (3); when all of (3) is done, it will then execute (4); finally when (4) it done it will execute (5).

B) Each of the .js files in each of the folders are simple functions like this:
function my_function (data, result) {
// do something (it'll take sometime, you can use setTimeout() here, so that delay the time, for example.
return result; }
module.exports = my_function;

As you can see, the function is accepting the two objects from main.js, and returning the result object. So your code will open each .js file and execute the single exported function in it.
Your code should be as simple as possible.
*/

/*
https://stackoverflow.com/a/50559862
my referrence in executing js files within javascript rather than in terminal
There's a flaw for this execution

*/

/*
https://stackoverflow.com/a/31661578
First problem is how to traverse the directories dynamically and still need to exclude unnecessary files/directories in doing so
Second after traversing directories, it needs to read all .js files within the said directory
When all the file paths are covered, I made a unique identifier for each key for the my function

*/

const glob = require("glob");
const path = require("path");
const fs = require("fs");

const scriptsFolder = "./"; // add your scripts to folder named scripts
let data = {};
let results = {};

const folders = fs
  .readdirSync(scriptsFolder)
  .sort()
  .filter(
    (folder) =>
      ![
        "Main.js",
        "node_modules",
        "package-lock.json",
        "package.json",
        ".prettierrc",
        ".vscode",
      ].includes(folder)
  );

let mods = {};

folders.forEach((folderBasePath) => {
  mods = {
    ...mods,
    ...glob
      .sync(path.join(folderBasePath, "*.js"))
      .reduce(function (loaded, file) {
        var mod = require(`./${file}`);
        // mod is a function with a name, so use it!
        if (mod instanceof Function) {
          loaded[`${mod.name}_${file}`] = mod;
        } else {
          Object.keys(mod).forEach(function (property) {
            loaded[`${property}_${file}`] = mod.property;
          });
        }

        return loaded;
      }, {}),
  };
});
async function processResults() {
  let promises = Object.keys(mods).map(async (moduleName) => {
    console.log(moduleName);
    let newResult = await mods[moduleName](moduleName, results);
    return newResult;
  });
  return await Promise.all(promises)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

// console.log(processResults());

results = processResults();

console.log("eee", results);

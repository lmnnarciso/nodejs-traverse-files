async function my_function(data, result) {
  result = { ...result, [`${data}`]: "done" };

  return await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Finished folder1file2");
      resolve("Finished folder1file2");
    }, 2000);
  });
}

// my_function(process.argv[2]);

module.exports = my_function;

async function my_function(data, result) {
  result = { ...result, [`${data}`]: "done" };

  return await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Finished folder2file1");
      resolve("Finished folder2file1");
    }, 4000);
  });
}

// my_function(process.argv[2]);

module.exports = my_function;

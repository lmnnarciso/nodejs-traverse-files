function my_function(data, result) {
  result = { ...result, [`${data}`]: "done" };

  return result;
}

// my_function(process.argv[2]);

module.exports = my_function;

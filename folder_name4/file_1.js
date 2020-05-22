function my_function(data, result) {
  result = { ...result, [`${data}`]: "done" };

  return result;
}

module.exports = my_function;

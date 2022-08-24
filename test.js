const doTask = (taskName) => {
  const begin = Date.now();
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const end = Date.now();
      const timeSpent = end - begin + "ms";
      console.log(
        "\x1b[36m",
        "[TASK] FINISHED: " + taskName + " in " + timeSpent,
        "\x1b[0m"
      );
      resolve(true);
    }, Math.random() * 200);
  });
};

async function init() {
  numberOfTasks = 20;
  let concurrencyMax = 4;
  const taskList = [...Array(numberOfTasks)].map(() =>
    [...Array(~~(Math.random() * 10 + 3))]
      .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
      .join("")
  );
  const counter = 0;
  const concurrencyCurrent = 0;
  console.log("[init] Concurrency Algo Testing...");
  console.log("[init] Tasks to process: ", taskList.length);
  console.log("[init] Task list: " + taskList);
  console.log("[init] Maximum Concurrency: ", concurrencyMax, "\n");
  const manageConcurrency = async () => {
    new Promise((resolve, reject) => {
      let currentPos = 0;
      let finishedPos = 0;

      Array(concurrencyMax)
        .fill(0)
        .forEach(() => {
          startTask();
        });

      function handleEndTask() {
        finishedPos++;
        if (currentPos >= taskList.length) {
          if (finishedPos >= taskList.length) {
            resolve();
          }
          return;
        }

        if (currentPos - finishedPos >= concurrencyMax) {
          return;
        }

        startTask();
      }

      function startTask() {
        console.log(
          `[EXE] Concurrency: ${
            currentPos - finishedPos + 1
          } of ${concurrencyMax}`
        );
        console.log(`[EXE] Task count ${currentPos} of ${numberOfTasks}`);
        console.log(
          `\x1b[31m [TASK] STARTING: ${taskList[currentPos]} \x1b[0m`
        );
        doTask(taskList[currentPos]).then(handleEndTask);
        currentPos++;
      }
    });
  };

  concurrencyMax = 4;
  setTimeout(() => {
    concurrencyMax = 2;
    console.log(`***** changing concurrency to ${concurrencyMax} *****`);
  }, 200);

  await manageConcurrency();
}

init();

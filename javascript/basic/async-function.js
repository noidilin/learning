/* Javascript not really stop when encounter `await` keyword
 * the async function is simply poped out call stack to execute other code
 * once the promise has been settled, async function will resume to the place it left
 */
const p1 = new Promise((res, rej) => {
  setTimeout(() => res("P1 Promise Resolved Value."), 1000);
});

const p2 = new Promise((res, rej) => {
  setTimeout(() => res("P2 Promise Resolved Value."), 5000);
});

const p3 = new Promise((res, rej) => {
  setTimeout(() => res("P3 Promise Resolved Value."), 2500);
});

async function handlePromise() {
  console.log("Start function");

  const result1 = await p1;
  console.log(`Result received from p1 after 1 second`);
  console.log(result1);
  console.log(`start Promise P2`);

  const result2 = await p2; // result received after 5 seconds
  console.log(result2);
  
  const result3 = await p3; // result already received after 2.5 second, waiting for P2
  console.log(result3);
}

handlePromise();
console.log(`Pop async function out from call stack when awaiting`);
setTimeout(() => {
  console.log(`Start after P1 await operation, and finished after 1+3 seconds`);
}, 3000);

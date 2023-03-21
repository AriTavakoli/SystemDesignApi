export default async function measureQueryTime(numQueries : Number, randMax : Number, callback : Function) {
  // start the timer
  const startTime = Date.now();

  // measure the time for the specified number of queries
  let totalQueryTime = 0;
  for (let i = 0; i < numQueries; i++) {
    // generate a random product_id
    const rand = Math.floor(Math.random() * randMax) + 1;

    // run the query and measure the time
    const queryStartTime = Date.now();
    callback(rand);
    const question = await AnswersController.getQuery(rand)
    const queryTime = Date.now() - queryStartTime;

    // add the query time to the total
    totalQueryTime += queryTime;

    // print the query time and product ID in color
    // console.log(`Query ${i + 1}: ${queryTime.toString().green} ms  |  productId: ${rand.toString().blue}`);
  }

  console.log();
  console.log('-------------------------------------------------------------------------'.magenta);

  // calculate the average query time
  const avgQueryTime = totalQueryTime / numQueries;
  console.log(`Average query time: ${avgQueryTime.toString().yellow} ms | ${numQueries} queries | ${randMax} max productId`);
  console.log('-------------------------------------------------------------------------'.magenta);


  // calculate the total duration and output it
  const endTime = Date.now();
  const totalDuration = endTime - startTime;
  console.log(`Total duration: ${totalDuration.toString().yellow} ms for ${numQueries} queries`);

  // close the database connection
}

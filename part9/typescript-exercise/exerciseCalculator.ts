interface Values {
  target: number,
  array: number[],
}

interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number,
}


export const calculateExercises = (hours : number[], target: number): result => {
  const trainingDays = hours.filter(h => h > 0).length;
  const sum = hours.reduce((sum, n) => sum + n, 0);
  const average = sum / hours.length;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = 'none';
  if (average < target) {
    rating = 1;
    ratingDescription = 'did not meet hours';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'hours were met';
  } else if (average > target) {
    rating = 3;
    ratingDescription = 'hours exceeded target';
  }

  return {
    periodLength: hours.length,
    trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

const parseArgs = (args: string[]): Values => {
  let array: number[] = [];
  if (isNaN(Number(args[2]))) {
      throw new Error('args must be numbers');
    } 

  for (const arg of args.slice(3)) {
    if (!isNaN(Number(arg))) {
      array = array.concat(Number(arg));
    } else {
      throw new Error('args must be numbers');
    }
  }

  return {
    target: Number(args[2]),
    array: array,
  };
};

try {
  const { target, array } = parseArgs(process.argv);
  console.log(target, array);
  console.log(calculateExercises(array, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
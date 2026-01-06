interface values {
  value1: number,
  value2: number,
}

const calculateBmi = (height: number, weight: number) => {
  const denominator = height / 100;
  const bmi = (weight / (denominator * denominator));
  if (bmi < 18.5) {
    console.log('Underweight');
  } else if (bmi < 25) {
    console.log('Normal weight');
  } else if (bmi < 30) {
    console.log('Overweight');
  }else {
    console.log('Obese');
  }

}

const parseValues = (args: string[]): values => {
  if (args.length < 4) throw new Error('not enough args');
  if (args.length > 4) throw new Error('too many args');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('provided args are not numbers')
  }
}
try {
  const { value1, value2 } = parseValues(process.argv)
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}


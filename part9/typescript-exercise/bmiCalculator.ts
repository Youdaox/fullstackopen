const calculateBmi = (height: number, weight: number) => {
  const denominator = height / 100 
  const bmi = (weight / (denominator * denominator))
  if (bmi < 18.5) {
    console.log('Underweight')
  } else if (bmi < 25) {
    console.log('Normal weight')
  } else if (bmi < 30) {
    console.log('Overweight')
  }else {
    console.log('Obese')
  }

}
calculateBmi(180, 65)

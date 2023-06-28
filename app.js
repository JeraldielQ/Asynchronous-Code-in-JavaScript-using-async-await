// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.


async function getNumberFact(num) {
    const apiurl = "http://numbersapi.com/";
    const response = await fetch(`${apiurl}${num}?json`);
    const fact1 = await response.json();
    console.log(`Fact about number ${num}: ${fact1.text}`);
  }


  // 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

  
const numbers = [90000, 421, 99, 123];
const factContainer = document.getElementById('fact-container');

async function multipleNumsFacts(numbers) {
  for (const number of numbers) {
    const apiUrl = `http://numbersapi.com/${number}?json`;
    try {
      const response = await fetch(apiUrl);
      const facts = await response.json();
      const insideFact = facts.text;
      const factElement = document.createElement('p');
      factElement.textContent = `Fact about ${number}: ${insideFact}`;
      factContainer.appendChild(factElement);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

multipleNumsFacts(numbers);



// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

const number = 7;
const factContaine = document.getElementById('fact-container');

const fetchFact = async () => {
  try {
    for (let i = 0; i < 4; i++) {
      const apiUrl = `http://numbersapi.com/${number}?json`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const fact = data.text;
      const factElement = document.createElement('p');
      factElement.textContent = fact;
      factContaine.appendChild(factElement);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchFact();



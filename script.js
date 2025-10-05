// Extended dataset of destinations
const destinations = [
  {
    name: "Paris",
    country: "France",
    description: "The city of light, known for the Eiffel Tower and art museums.",
    weather: "Sunny, 22°C",
    bestTime: "April to June or October to early November",
    food: "Croissants, baguettes, escargot",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_as_seen_from_the_Tour_Saint-Jacques_2011_02.jpg"
  },
  {
    name: "Tokyo",
    country: "Japan",
    description: "A bustling city blending tradition with futuristic technology.",
    weather: "Cloudy, 18°C",
    bestTime: "March to May or September to November",
    food: "Sushi, ramen, tempura",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Tokyo_Tower_and_around_Skyscrapers.jpg"
  },
  {
    name: "New York",
    country: "USA",
    description: "The city that never sleeps, famous for Times Square and Central Park.",
    weather: "Rainy, 16°C",
    bestTime: "April to June, September to early November",
    food: "Pizza, bagels, hot dogs",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Lower_Manhattan_skyline_-_June_2017_img3.jpg"
  },
  {
    name: "Sydney",
    country: "Australia",
    description: "Known for the Opera House and beautiful beaches.",
    weather: "Sunny, 25°C",
    bestTime: "September to November, March to May",
    food: "Meat pies, barramundi, pavlova",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Sydney_Opera_House_-_Dec_2008.jpg"
  },
  {
    name: "Rome",
    country: "Italy",
    description: "The Eternal City, with ancient ruins like the Colosseum.",
    weather: "Sunny, 27°C",
    bestTime: "April to June, September to October",
    food: "Pasta, gelato, pizza",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg"
  }
  // (You can keep the rest of the destinations from earlier script)
];

// Render destinations
const results = document.getElementById("results");
function displayDestinations(list) {
  results.innerHTML = "";
  list.forEach(dest => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${dest.image}" alt="${dest.name}">
      <div class="card-content">
        <h3>${dest.name}, ${dest.country}</h3>
        <p>${dest.description}</p>
        <p><strong>Weather:</strong> ${dest.weather}</p>
        <p><strong>Best time:</strong> ${dest.bestTime || "All year round"}</p>
        <p><strong>Food:</strong> ${dest.food || "Local specialties"}</p>
      </div>
    `;
    results.appendChild(card);
  });
}
displayDestinations(destinations);

// Search filter
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = destinations.filter(d => 
    d.name.toLowerCase().includes(value) || d.country.toLowerCase().includes(value)
  );
  displayDestinations(filtered);
});

// Chatbot
const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
chatToggle.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Smart TravelBot
function botReply(userText) {
  userText = userText.toLowerCase();

  // Greetings
  if (userText.includes("hello") || userText.includes("hi")) {
    return "Hello traveler! 🌍 Where would you like to go today?";
  }

  // Recommendations
  if (userText.includes("recommend") || userText.includes("suggest")) {
    return "✨ I'd recommend Paris for romance, Tokyo for tech, Sydney for beaches, and Rome for history!";
  }

  // Best time to visit
  for (let d of destinations) {
    if (userText.includes(d.name.toLowerCase()) && userText.includes("best time")) {
      return `🌤️ The best time to visit ${d.name} is ${d.bestTime}.`;
    }
  }

  // Food suggestions
  for (let d of destinations) {
    if (userText.includes(d.name.toLowerCase()) && userText.includes("food")) {
      return `🍴 In ${d.name}, you should try: ${d.food}.`;
    }
  }

  // Weather
  if (userText.includes("weather")) {
    return "You can check the destination cards above 🌦️ for current weather info.";
  }

  // Travel tips
  if (userText.includes("tips") || userText.includes("advice")) {
    return "✈️ Travel tips: Pack light, keep cash and cards, respect local culture, and always keep copies of important documents.";
  }

  // Safety
  if (userText.includes("safe") || userText.includes("safety")) {
    return "🔒 General safety tip: Stay alert, avoid isolated areas at night, and keep your belongings secure.";
  }

  // Default fallback
  return "Hmm 🤔 I'm not sure about that, but I can help you explore destinations or give you travel tips!";
}

// Send chat
sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (text) {
    addMessage("You", text);
    const reply = botReply(text);
    setTimeout(() => addMessage("Bot", reply), 500);
    chatInput.value = "";
  }
});

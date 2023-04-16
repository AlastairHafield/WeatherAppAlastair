let historyList = document.createElement("li");

function newInput() {
  let inputs = document.getElementById("search-input").value.trim();
  console.log(inputs);

  if (inputs === "") {
    return;
  }

  // Get the search history array from local storage
  let searchHistoryJson = localStorage.getItem("searchHistory");
  let searchHistory = searchHistoryJson ? JSON.parse(searchHistoryJson) : [];

  // Add the new input to the beginning of the search history array
  searchHistory.unshift(inputs);

  // If the search history array has more than 10 items, remove the last one
  if (searchHistory.length > 10) {
    searchHistory.pop();
  }

  // Save the updated search history array to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  // Display the updated search history
  displayInput();
}

function clearInput() {
  historyList.innerHTML = "";
}
function displayInput() {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (!searchHistory) {
    return;
  } else {
    let historyDisplay = document.getElementById("history");
    historyDisplay.innerHTML = "";
    for (
      let i = Math.max(0, searchHistory.length - 10);
      i < searchHistory.length;
      i++
    ) {
      let historyList = document.createElement("li");
      historyList.setAttribute("class", "list-group-item");
      historyList.innerHTML = searchHistory[i];

      // add event listener to history list item
      historyList.addEventListener("click", function (event) {
        event.preventDefault();
        let searchInput = document.getElementById("search-input");
        searchInput.value = searchHistory[i];
        handleSearchFormSubmit(event);
      });

      historyDisplay.appendChild(historyList);
    }
  }
}

displayInput();

historyList.addEventListener("click", handleSearchFormSubmit);

searchFormEl.addEventListener("submit", newInput);

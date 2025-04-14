const villagers = ['Abigail', 'Sebastian', 'Leah', 'Elliott'];
const items = [/* optional item autocomplete source */];

let currentPreferences = {};

function setupSearch(inputId, suggestionsId, dataList, onSelect) {
  const input = document.getElementById(inputId);
  const suggestions = document.getElementById(suggestionsId);

  input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    suggestions.innerHTML = '';

    if (val.length > 0) {
      const matches = dataList.filter(item => item.toLowerCase().includes(val));
      matches.forEach(match => {
        const div = document.createElement('div');
        div.textContent = match;
        div.addEventListener('click', () => {
          input.value = match;
          suggestions.innerHTML = '';
          onSelect();
        });
        suggestions.appendChild(div);
      });
    }
  });
}

async function loadVillagerData(villager) {
  try {
    const response = await fetch(`data/${villager}.json`);
    if (!response.ok) throw new Error("Villager data not found.");
    currentPreferences = await response.json();
    updateResult();
  } catch (err) {
    console.error("Error loading villager data:", err);
    currentPreferences = {};
    document.getElementById('result').textContent = "Could not load villager data.";
  }
}

function updateResult() {
  const villager = document.getElementById('villagerInput').value;
  const item = document.getElementById('itemInput').value;
  const result = document.getElementById('result');

  if (villager && item) {
    const pref = currentPreferences[item];
    if (pref) {
      result.textContent = `${villager} ${pref.toLowerCase()} ${item}!`;
    } else {
      result.textContent = `${villager} has no strong feelings about ${item}.`;
    }
  } else {
    result.textContent = '';
  }
}

setupSearch('villagerInput', 'villagerSuggestions', villagers, () => {
  const villager = document.getElementById('villagerInput').value;
  loadVillagerData(villager);
});

setupSearch('itemInput', 'itemSuggestions', items, updateResult);

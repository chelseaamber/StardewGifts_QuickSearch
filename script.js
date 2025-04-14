const villagers = ['Abigail', 'Sebastian', 'Leah', 'Elliott'];
const items = ['Amethyst', 'Beer', 'Salad', 'Lobster'];

const preferences = {
  'Abigail': {
    'Amethyst': 'Loved',
    'Beer': 'Disliked',
  },
  'Sebastian': {
    'Beer': 'Liked',
    'Lobster': 'Disliked',
  },
  'Leah': {
    'Salad': 'Loved',
    'Beer': 'Disliked',
  },
  'Elliott': {
    'Lobster': 'Loved',
    'Salad': 'Neutral',
  }
};

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

function updateResult() {
  const villager = document.getElementById('villagerInput').value;
  const item = document.getElementById('itemInput').value;
  const result = document.getElementById('result');

  if (villager && item) {
    const pref = preferences[villager]?.[item];
    if (pref) {
      result.textContent = `${villager} ${pref.toLowerCase()} ${item}!`;
    } else {
      result.textContent = `${villager} has no strong feelings about ${item}.`;
    }
  } else {
    result.textContent = '';
  }
}

setupSearch('villagerInput', 'villagerSuggestions', villagers, updateResult);
setupSearch('itemInput', 'itemSuggestions', items, updateResult);

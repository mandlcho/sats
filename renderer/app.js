const historyDisplay = document.getElementById('historyDisplay');
const mainDisplay = document.getElementById('mainDisplay');
const keypad = document.querySelector('.keypad');
const calculator = document.getElementById('calculator');
const platformLabel = document.getElementById('platformLabel');

const state = {
  current: '0',
  previous: null,
  operator: null,
  overwrite: false
};

const platformMap = {
  darwin: 'macOS',
  win32: 'Windows',
  linux: 'Linux'
};

const setTheme = () => {
  const platform = window.native?.platform ?? 'browser';
  platformLabel.textContent = platformMap[platform] ?? 'Web preview';
  const theme = window.native?.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.body.dataset.theme = theme;
};

const formatNumber = value => {
  if (value === 'Error') {
    return value;
  }
  const [integerPart, decimalPart] = value.split('.');
  const formattedInt = Number(integerPart).toLocaleString();
  if (decimalPart && decimalPart !== '0') {
    return `${formattedInt}.${decimalPart.slice(0, 8)}`;
  }
  return formattedInt;
};

const updateDisplays = () => {
  mainDisplay.textContent = formatNumber(state.current);
  if (state.operator && state.previous !== null) {
    historyDisplay.textContent = `${state.previous} ${state.operator}`;
  } else {
    historyDisplay.textContent = '0';
  }
};

const clearState = () => {
  state.current = '0';
  state.previous = null;
  state.operator = null;
  state.overwrite = false;
};

const inputDigit = digit => {
  if (state.overwrite) {
    state.current = digit;
    state.overwrite = false;
    return;
  }

  if (state.current === '0') {
    state.current = digit;
  } else {
    state.current += digit;
  }
};

const inputDecimal = () => {
  if (state.overwrite) {
    state.current = '0.';
    state.overwrite = false;
    return;
  }

  if (!state.current.includes('.')) {
    state.current += '.';
  }
};

const togglePlusMinus = () => {
  if (state.current === '0' || state.current === 'Error') {
    return;
  }
  state.current = state.current.startsWith('-') ? state.current.slice(1) : `-${state.current}`;
};

const toPercent = () => {
  const value = parseFloat(state.current);
  state.current = (value / 100).toString();
};

const performCalculation = () => {
  const current = parseFloat(state.current);
  const previous = parseFloat(state.previous);

  if (Number.isNaN(current) || Number.isNaN(previous)) {
    return;
  }

  let result = 0;
  switch (state.operator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '×':
      result = previous * current;
      break;
    case '÷':
      if (current === 0) {
        state.current = 'Error';
        state.previous = null;
        state.operator = null;
        return;
      }
      result = previous / current;
      break;
    default:
      return;
  }

  state.current = result.toString();
  state.previous = null;
  state.operator = null;
  state.overwrite = true;
};

const setOperator = nextOperator => {
  if (state.operator && !state.overwrite) {
    performCalculation();
  }

  state.previous = state.current;
  state.operator = nextOperator;
  state.overwrite = true;
};

const handleButtonClick = ({ target }) => {
  if (target.tagName !== 'BUTTON') {
    return;
  }

  const action = target.dataset.action;
  switch (action) {
    case 'digit':
      inputDigit(target.dataset.value);
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'operator':
      setOperator(target.dataset.value);
      break;
    case 'equals':
      performCalculation();
      break;
    case 'clear':
      clearState();
      break;
    case 'plus-minus':
      togglePlusMinus();
      break;
    case 'percent':
      toPercent();
      break;
    default:
      break;
  }

  updateDisplays();
};

const handleKeyboardInput = event => {
  const { key } = event;
  if (/\d/.test(key)) {
    inputDigit(key);
  } else if (key === '.') {
    inputDecimal();
  } else if (key === '+' || key === '-') {
    setOperator(key);
  } else if (key === '*') {
    setOperator('×');
  } else if (key === '/') {
    setOperator('÷');
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    performCalculation();
  } else if (key === 'Escape') {
    clearState();
  } else if (key === '%') {
    toPercent();
  }
  updateDisplays();
};

setTheme();
updateDisplays();
keypad.addEventListener('click', handleButtonClick);
window.addEventListener('keydown', handleKeyboardInput);

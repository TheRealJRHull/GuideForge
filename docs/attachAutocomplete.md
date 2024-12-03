### **Usage Documentation: `attachAutocomplete` Function**

The `attachAutocomplete` function dynamically creates an autocomplete dropdown for an input field, providing suggestions from a specified array of data. It supports both single and comma-separated list modes.

---

### **Function Signature**
```javascript
function attachAutocomplete(input, dataArray, isList = false)
```

---

### **Parameters**
1. **`input`**:
   - **Type**: `HTMLInputElement`
   - The input field where autocomplete functionality will be applied.

2. **`dataArray`**:
   - **Type**: `Array<String>`
   - An array of strings containing the suggestions for the autocomplete dropdown.

3. **`isList`**:
   - **Type**: `Boolean` (Default: `false`)
   - Determines if the input field supports comma-separated lists of values.
     - `true`: Enables list mode. Allows multiple selections separated by commas.
     - `false`: Enables single-value mode. Only one selection is allowed.

---

### **How It Works**
1. **Event Listener on Input**:
   - Captures user keystrokes in the input field (`input` event).
   - For list mode (`isList = true`), parses the last item after a comma for suggestions.

2. **Filtering Suggestions**:
   - Filters `dataArray` for items starting with the user's input, ignoring case sensitivity.

3. **Suggestion Dropdown**:
   - Displays a list of matching suggestions below the input field.
   - Clicking a suggestion:
     - Replaces the current value in single-value mode.
     - Updates the last item in the comma-separated list and appends a comma in list mode.

4. **Closing Suggestions**:
   - Automatically closes the dropdown when clicking outside the input field or container.

---

### **CSS (Optional)**
Customize the styling of the autocomplete dropdown:
```css
.autocomplete-items {
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.autocomplete-item {
  padding: 8px;
  cursor: pointer;
}

.autocomplete-item:hover {
  background-color: #e9ecef;
}
```

---

### **Usage Examples**

#### **1. List Mode (Comma-Separated Input)**
Enables autocomplete for fields accepting multiple comma-separated names:
```javascript
const horseNames = ['Spirit', 'Lightning', 'Daisy', 'Bella', 'Max'];
const reminderForm = document.getElementById('reminderForm');

attachAutocomplete(reminderForm.horseName, horseNames, true);
```

**Behavior**:
- User types `Dai` → Suggestion: `Daisy`.
- Selecting `Daisy` updates input to `Daisy, `.

---

#### **2. Single-Value Mode**
Enables autocomplete for fields requiring a single selection:
```javascript
const horseNames = ['Spirit', 'Lightning', 'Daisy', 'Bella', 'Max'];
const vitalsForm = document.getElementById('vitalsForm');

attachAutocomplete(vitalsForm.horseName, horseNames, false);
```

**Behavior**:
- User types `Lig` → Suggestion: `Lightning`.
- Selecting `Lightning` updates input to `Lightning`.

---

### **Edge Cases Handled**
1. **Empty Input**:
   - If the user types a comma without text, no suggestions are shown.
2. **Close on Outside Click**:
   - Clicking outside the dropdown closes suggestions.
3. **Clear Suggestions**:
   - Typing text that doesn’t match any suggestions clears the dropdown.

---

### **Key Notes**
- Ensure `dataArray` is populated with relevant suggestions before calling the function.
- Apply unique styles to `.autocomplete-items` for visual differentiation if needed.
- Works seamlessly with multiple input fields by calling `attachAutocomplete` for each field.

---

### **Example Integration in HTML**
```html
<form id="reminderForm">
  <label for="horseName">Horse Names:</label>
  <input type="text" id="horseName" name="horseName" placeholder="Type horse names, separated by commas">
</form>

<form id="vitalsForm">
  <label for="horseName">Horse Name:</label>
  <input type="text" id="vitalsHorseName" name="horseName" placeholder="Type a horse name">
</form>

<script>
  const horseNames = ['Spirit', 'Lightning', 'Daisy', 'Bella', 'Max'];

  attachAutocomplete(document.getElementById('horseName'), horseNames, true);
  attachAutocomplete(document.getElementById('vitalsHorseName'), horseNames, false);
</script>
```

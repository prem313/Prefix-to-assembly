const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Prefix expression evaluation logic
function evaluatePrefix(expression) {
    const stack = [];
    const operators = "+-*/";

    for (let i = expression.length - 1; i >= 0; i--) {
        const char = expression[i];

        if (operators.includes(char)) {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            const result = eval(`${operand1} ${char} ${operand2}`);
            stack.push(result);
        } else {
            stack.push(char);
        }
    }

    return stack[0];
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/calculate", (req, res) => {
    const expression = req.body.expression;
    const result = evaluatePrefix(expression);
    res.json({ result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("calculator-form");
    const expressionInput = document.getElementById("expression");
    const resultOutput = document.getElementById("result");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const expression = expressionInput.value;

        // Send a POST request to the server
        const response = await fetch("/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ expression }),
        });

        if (response.ok) {
            const data = await response.json();
            resultOutput.textContent = `Result: ${data.result}`;
        } else {
            resultOutput.textContent = "Error calculating the result.";
        }
    });
});

const OPEN_API_KEY = "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";

let txtPergunta = document.querySelector("#txtPergunta");
let result = document.querySelector("#resposta");

txtPergunta.addEventListener("keypress", (e) => {
  if (txtPergunta.value && e.key === "Enter") {
    EnviarPergunta();
  }
});

function EnviarPergunta() {
  var pergunta = txtPergunta.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPEN_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: pergunta,
      max_tokens: 2048,
      temperature: 0.7,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (result.value) result.value += "\n";

      if (json.error?.message) {
        result.value += `Erro: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        let text = json.choices[0].text || "Sem resposta";

        result.value += "Chat GPT: " + text;
      }

      result.scrollTop = result.scrollHeight;
    })
    .catch((error) => console.log("Erro: ", error))
    .finally(() => {
      txtPergunta.disabled = false;
      txtPergunta.value = "";
      txtPergunta.focus();
    });

  if (result.value) result.value += "\n\n\n";

  result.value += `Eu: ${pergunta}`;
  txtPergunta.value = "Carregando...";
  txtPergunta.disabled = true;

  result.scrollTop = result.scrollHeight;
}

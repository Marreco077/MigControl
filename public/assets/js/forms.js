export function initializeForms() {
  const form = document.getElementById("formularioContato");
  if (!form) {
    console.warn("Formulário não encontrado no DOM.");
    return;
  }

  const formModalElement = document.getElementById("formModal");
  const confirmModalElement = document.getElementById("confirmModal");
  const confirmModalLabel = document.getElementById("confirmModalLabel");
  const confirmModalMessage = document.getElementById("confirmModalMessage");
  const formModal = new bootstrap.Modal(formModalElement);
  const confirmModal = new bootstrap.Modal(confirmModalElement);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("Submit do formulário disparado!");

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/enviar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        confirmModalLabel.textContent = "Mensagem enviada com sucesso!";
        confirmModalMessage.innerHTML = `
          Suas informações foram enviadas, entraremos em contato via WhatsApp em até 3 dias úteis.<br><br>
          Agradecemos o contato.<br><br>
          Se preferir, fale diretamente com nossos representantes em horário comercial pelo telefone:<br>
          <strong>(31) 99999-9999</strong>
        `;
        form.reset();
      } else {
        confirmModalLabel.textContent = "Erro no envio";
        confirmModalMessage.textContent = result.message || "Falha no envio dos dados. Por favor, tente novamente mais tarde.";
      }

      formModal.hide();
      confirmModal.show();
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      confirmModalLabel.textContent = "Erro inesperado";
      confirmModalMessage.textContent = "Não foi possível enviar sua mensagem. Tente novamente mais tarde.";
      formModal.hide();
      confirmModal.show();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioContato");
  const formModalElement = document.getElementById("formModal");
  const confirmModalElement = document.getElementById("confirmModal");

  const confirmModalLabel = document.getElementById("confirmModalLabel");
  const confirmModalMessage = document.getElementById("confirmModalMessage");

  const formModal = new bootstrap.Modal(formModalElement);
  const confirmModal = new bootstrap.Modal(confirmModalElement);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_t6u7cro", "template_igkiyrd", form)
      .then(() => {
        confirmModalLabel.textContent = "Mensagem enviada com sucesso!";
        confirmModalMessage.innerHTML = `
          Suas informações foram enviadas, entraremos em contato via WhatsApp em até 3 dias úteis.<br><br>
          Agradecemos o contato.<br><br>
          Se preferir, fale diretamente com nossos representantes em horário comercial pelo telefone:<br>
          <strong>(31) 99999-9999</strong>
        `;
        formModal.hide();
        confirmModal.show();
        form.reset();
      })
      .catch((error) => {
        console.error("Erro ao enviar o formulário:", error);
        confirmModalLabel.textContent = "Erro no envio";
        confirmModalMessage.textContent = "Falha no envio dos dados. Por favor, tente novamente mais tarde.";
        formModal.hide();
        confirmModal.show();
      });
  });
});

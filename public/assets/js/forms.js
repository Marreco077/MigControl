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
        Olá!<br/><br/>
        Recebemos suas informações e agradecemos o seu interesse nos produtos e soluções Mig Control.<br/><br/>
        Um de nossos consultores especializados entrará em contato com você em breve, utilizando a opção de contato preferencial 
        que você indicou no formulário. Nosso objetivo é entender suas necessidades e apresentar as melhores soluções para a sua empresa.<br/><br/>
        Fique atento aos nossos canais de comunicação. Caso tenha alguma urgência ou precise de atendimento imediato, 
        você pode entrar em contato diretamente conosco pelo contatos indicados na aba “Contato”, durante nosso horário comercial.<br/><br/>
        Atenciosamente,<br/>
        Equipe Mig Control
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

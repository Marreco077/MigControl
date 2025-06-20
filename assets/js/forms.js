  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formularioContato");
    const formModal = new bootstrap.Modal(document.getElementById("formModal"));
    const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simular envio (substitua por requisição AJAX se necessário)
      setTimeout(() => {
        formModal.hide(); // fecha o modal do formulário
        confirmModal.show(); // abre o de confirmação
        form.reset(); // limpa o formulário
      }, 500);
    });
  });

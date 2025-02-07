<script lang="ts">
  import type { Form, Translations } from "../gas/types";
  import GForm from "./GForm/GForm.svelte";

  let data: Form = {
    title: "Test Translation!",
    description: "This is a test form to check translations",
    items: [
      {
        id: "1",
        title: "Name",
        type: "text",
        required: true,
      },
      {
        id: "2",
        title: "Email",
        type: "text",
        required: true,
      },
      {
        id: "3",
        title: "Phone",
        type: "text",
        required: true,
      },
      {
        id: "4",
        title: "What is your favorite color?",
        type: "multipleChoice",
        choices: ["Red", "Green", "Blue"],
      },
      {
        id: "5",
        title: "How would you rate our service?",
        type: "rating",
        required: true,
        max: 5,
        icon: "STAR",
      },
    ],
  };
  let translations: Translations = {
    es: {
      "Test Translation!": "¡Prueba de Traducción!",
      "This is a test form to check translations":
        "Este es un formulario de prueba para verificar las traducciones",
      Name: "Nombre",
      Email: "Correo Electrónico",
      Phone: "Teléfono",
      "What is your favorite color?": "¿Cuál es tu color favorito?",
      Red: "Rojo es el mejor",
      Green: "Verde",
      Blue: "Azul",
      "How would you rate our service?": "¿Cómo calificaría nuestro servicio?",
    },
    pt: {
      "Test Translation!": "Teste de Tradução!",
      Name: "Nome",
      Email: "E-mail",
      Phone: "Telefone",
      "What is your favorite color?": "Qual é a sua cor favorita?",
      Red: "Vermelho é o melhor",
      Green: "Verde",
      //'Blue' : 'Azul', // Only partial translation to test fallback
      "How would you rate our service?": "Como você avaliaria nosso serviço?",
    },
    km: {}, // empty set to present button, but use Google Translate fallback
  };
</script>

<GForm form={data} postCallback={console.log} {translations} lang="en" />

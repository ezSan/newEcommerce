import React from "react";
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

const Faq = () => {
  const theme = useTheme();
  const faqData = [
    {
      question: "¿Cómo puedo realizar una compra?",
      answer:
        "Para realizar una compra, selecciona los productos que deseas, agrégalos al carrito y sigue las instrucciones en pantalla para completar tu pedido."
    },
    {
      question: "¿Los productos tienen garantía?",
      answer:
        "Todos los productos tienen garantía de 180 días por fallas de fábrica. Lo que no incluye roturas por mal uso de los mismos"
    },
    {
      question: "¿Cuáles son los métodos de pago disponibles?",
      answer:
        "Aceptamos pagos con tarjeta de crédito, debito, transferencias bancarias y criptomonedas. Para los pedidos que sean en la ciudad de Bahia Blanca o Coronel Suárez, se puede abonar en efectivo"
    },
    {
      question: "¿Cómo puedo rastrear mi pedido?",
      answer:
        "Una vez que tu pedido haya sido enviado, recibirás un mensaje con un número de seguimiento y un enlace para rastrear el paquete."
    }
    // Agrega más preguntas y respuestas según sea necesario
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      {faqData.map((faq, index) =>
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </Container>
  );
};

export default Faq;

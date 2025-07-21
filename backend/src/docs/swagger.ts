import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TrueNumber API",
    version: "1.0.0",
    description: "API pour le jeu TrueNumber",
  },
};
const options = {
  swaggerDefinition,
  apis: ["../routes/*.ts"],
};

export default swaggerJSDoc(options);

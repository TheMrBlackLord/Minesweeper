const path = require('path');
const swaggerAutogen = require("swagger-autogen");
const doc = require("./doc.js");

const outputFile = path.resolve(__dirname, "./openAPI.json");
const endpointsFiles = [
   path.resolve(__dirname, "../routes/admin.routes.js"),
   path.resolve(__dirname, "../routes/auth.routes.js"),
   path.resolve(__dirname, "../routes/user.routes.js"),
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);

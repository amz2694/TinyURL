const express = require('express');
const app = express();
const path = require('path');
const PORT = process.PORT || 8080;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('You are now connected to database...'))
  .catch((err) => console.error('Something went wrong', err));

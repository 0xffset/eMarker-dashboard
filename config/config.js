const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "qweq12312312-secret",
   mongoUri: 'mongodb+srv://roleyder:koZ3ZXjqsHBJUaqO@emarker.1nhyz.gcp.mongodb.net/emarker?retryWrites=true&w=majority',
  // mongoUri: process.env.MONGODB_URI ||
  //   process.env.MONGO_HOST ||
  //   'mongodb://' + (process.env.IP || 'localhost') + ':' +
  //   (process.env.MONGO_PORT || '27017') +
  //   '/emarker',
}

module.exports = config

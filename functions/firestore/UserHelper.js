// DATABASE CONNECTED BUSINESS LOGIC

module.exports.createUser = (body) => new Promise(async (resolve, reject) => {
  const {
    name
  } = body;
  try {
    console.log('INIT')
    resolve();
  } catch (error) {
    reject(new Error(error.message));
  }
});

module.exports.fetchUser = (params) => new Promise(async (resolve, reject) => {
    resolve({
        name: 'yolo',
    })
});

module.exports.removeUser = (params) => new Promise(async (resolve, reject) => {
    resolve()
});

module.exports.modifyUser = (params) => new Promise(async (resolve, reject) => {
    resolve()
});
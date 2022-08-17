function newToken (user){
    return this.jwt.sign({ user });
  }

module.exports = {newToken}


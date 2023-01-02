const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400).json("incorrect form submission");
  } 
    const hash = bcrypt.hashSync(password);
    let date = new Date();
    date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: email,
              name: name,
              joined: `{${date}}`,
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  
};

module.exports = {
  handleRegister: handleRegister,
};

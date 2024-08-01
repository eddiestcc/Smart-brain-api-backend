const controlRegister = (req,res,knex,bcrypt) => {
    const {email,name,password} = req.body;
    if (!email || !name || !password) {
      return res.status(400).json('incorrect form submission');
    } 
        const hash = bcrypt.hashSync(password);
        knex.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
            return trx('users')
                .returning('*') 
                .insert({ 
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
                // .catch(console.log(err));
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    // .catch(err => res.status(400).json('Unable to register'));
}

exports.controlRegister = controlRegister;
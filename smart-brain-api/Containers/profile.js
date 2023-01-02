const handleProfile = (req,res,db) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({
      id: id
    }).then(user => {
      console.log(user[0])
    }).catch(err => { res.status((400), 'no such user') })
  
  
  }

  module.exports = {
    handleProfile : handleProfile 
  }
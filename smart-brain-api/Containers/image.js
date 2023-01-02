
const handleImage = (req,res,db) => {
const { id } = req.body;
let found = false;
db.from('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries').then(entries => res.json(entries[0]))
  .catch(err => { res.status(400).json('unable to proess the request') })
}
module.exports ={
    handleImage:handleImage
}
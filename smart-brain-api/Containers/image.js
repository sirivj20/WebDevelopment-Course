const USER_ID = "USER";
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = "PAT";
const APP_ID = "APPID";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

const handleApicall = ( req,res) => {
    console.log(req.body.input);
    const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: req.body.input,
              },
            },
          },
        ],
      });
  
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
        },
        body: raw,
      };
  
      // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
      // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
      // this will default to the latest version_id
      fetch(
        "https://api.clarifai.com/v2/models/" +
          MODEL_ID +
          "/versions/" +
          MODEL_VERSION_ID +
          "/outputs",
        requestOptions
      ) .then((response) => response.json())
      .then((result) => {
        res.json(result);
      })
      .catch(err=>{
        console.log(err);
        res.status(400).json('unable to process the request')})

}
const handleImage = (req,res,db) => {
const { id } = req.body;
let found = false;
db.from('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries').then(entries => res.json(entries[0]))
  .catch(err => { res.status(400).json('unable to proess the request') })
}
module.exports ={
    handleImage:handleImage,
    handleApicall:handleApicall
}